# Final Code Review — feature/cloudflare-airtable-migration vs master

Last Updated: 2026-03-27

## Executive Summary

13 commitów w 4 fazach. Migracja jest **prawie gotowa do merge**. Architektura jest solidna —
dual-deployment działa poprawnie, usunięte zależności (google-auth-library, js-yaml) nie są nigdzie
importowane, interfejsy append* są w pełni kompatybilne z 4 API routes bez dodatkowych zmian.

Znaleziono **1 krytyczny błąd logiczny** (graceful degradation pozornie działa, ale w praktyce nie),
**4 ważne problemy** i **5 drobnych uwag**.

---

## Krytyczne (🔴 blocking)

### 1. appendBooking/appendContact/appendWaitlist/appendNewsletter połykają błędy — allFailed NIGDY nie jest true

**Plik:** `src/lib/airtable.ts` (linie 77-96, 104-116, 121-130, 140-151)
**Plik:** `src/app/api/booking/route.ts` (linia 102)

Każda z publicznych funkcji `append*` ma wewnętrzne `try/catch` który loguje błąd i **zwraca
undefined bez rzucenia**. W API routes `Promise.allSettled([appendBooking(...), sendEmail(...)])` —
`appendBooking` zawsze rozwiązuje się jako `fulfilled` (z wartością `undefined`), nawet gdy Airtable
zwróci 500.

Konsekwencja: `allFailed` jest `true` TYLKO gdy email też zawiedzie. Gdy Airtable jest down ale
email działa — `allFailed = false`, user dostaje `{ success: true }`, lead jest **cicho tracony**
bez żadnego sygnału dla developera poza `console.error` z `appendBooking failed`.

Ta sama logika istniała w starym `sheets.ts` — to regresja którą można by naprawić przy okazji.

**Opcje naprawy:**

Opcja A (minimalna zmiana): usuń try/catch z `append*` — niech błąd propaguje do `Promise.allSettled`.
Dodaj try/catch w `appendToTable` tylko na poziomie logowania, potem re-throw:
```ts
// W appendToTable — throw jest już OK (linia 39)
// W appendBooking — usuń try/catch, niech rzuca dalej
export async function appendBooking(data: {...}) {
  await appendToTable("Rezerwacje", { ... });
  // bez try/catch — błąd propaguje do Promise.allSettled w route.ts
}
```

Opcja B (zachowuje obecną strukturę): zmień `allFailed` na sprawdzanie partial failure:
```ts
const airtableFailed = results[0].status === "rejected";
if (airtableFailed) {
  console.error("[Booking] Airtable delivery failed — lead may be lost!", { trip: data.trip });
}
const allFailed = results.every((r) => r.status === "rejected");
```

**Rekomendacja:** Opcja A — czystsza, spójna z intencją `Promise.allSettled`.

---

## Ważne (🟠 important)

### 2. CF_PAGES_URL może być URL preview deployment (taki sam problem jak VERCEL_URL)

**Plik:** `src/lib/constants.ts` (linie 25-28)

`CF_PAGES_URL` jest ustawiany automatycznie przez Cloudflare Pages na **każdy** deploy — w tym preview
deploymenty (pattern: `<branch>.<project>.pages.dev`). To ten sam problem co `VERCEL_URL` który
poprzednia wersja słusznie zastąpiła przez `VERCEL_PROJECT_PRODUCTION_URL`.

Na CF Workers (nie CF Pages) `CF_PAGES_URL` nie jest ustawiane wcale — więc blok jest bezpieczny w
tym przypadku. Ale jeśli w przyszłości projekt byłby deployowany przez CF Pages zamiast CF Workers
przez Wrangler, problem wróci.

Rozwiązanie: Dodaj komentarz wyjaśniający, że ten fallback jest bezpieczny TYLKO dla CF Workers
(Wrangler deploy), NIE dla CF Pages:
```ts
// CF Workers (Wrangler deploy): CF_PAGES_URL is set to production domain.
// NOTE: If deploying via CF Pages instead of Wrangler, this would include
// preview URLs — use a custom env var like CF_PRODUCTION_URL instead.
...(process.env.CF_PAGES_URL ? [`https://${process.env.CF_PAGES_URL}`] : []),
```

### 3. ISR `revalidate = 3600` jest zignorowane na CF Workers (incrementalCache: "dummy")

**Plik:** `open-next.config.ts` (linia 15)
**Dotyczy:** `src/app/(main)/page.tsx`, `/wyjazdy/page.tsx`, 4 category pages, `/wyjazdy/[slug]/page.tsx`

`incrementalCache: "dummy"` wyłącza ISR — wszystkie strony są pre-renderowane raz przy buildzie i
nigdy nie są odświeżane. `export const revalidate = 3600` w 7 plikach jest **cicho ignorowane**.

Konsekwencja: `auto-isPast` (obliczane z `dateEnd`) nigdy się nie zaktualizuje na CF Workers —
zakończone warsztaty będą widoczne jako aktywne do następnego ręcznego deploy. Na Vercel działa
poprawnie.

To jest **znana świadoma decyzja** (udokumentowana w `open-next.config.ts` i `lessons-learned.md`),
ale wymaga aktywnego działania ze strony klienta: ręczny redeploy gdy warsztat się kończy, LUB
upgrade do Durable Objects ($5/month).

Wymagane działanie: dodaj to do `docs/instrukcja-zarzadzanie.md` jako jawne ostrzeżenie — klient
musi wiedzieć, że zakończone warsztaty wymagają ręcznego redeployu gdy używa CF Workers.

### 4. `.dev.vars.example` zawiera hardcoded GitHub username klientki

**Plik:** `.dev.vars.example` (linie 17-18)

```
NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER=mariaejk
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=wyjazdy-z-dziecmi
```

CLAUDE.md i wszystkie docs używają `[OWNER]` placeholder. Ten plik jest wyjątkiem.
`.dev.vars.example` jest commitowany do repo (nie w `.gitignore`) — jest widoczny publicznie.
Nie jest to security issue (to są `NEXT_PUBLIC_` wartości — publiczne by założeniu), ale niespójne
z projektem.

Poprawka: zastąp `mariaejk` przez `[OWNER]`, `wyjazdy-z-dziecmi` przez `[REPO]`.

### 5. KV race condition przy równoczesnych requestach do tego samego IP

**Plik:** `src/lib/rate-limit.ts` (linie 49-59)

Przy równoczesnych requestach z tego samego IP na CF Workers (plausible przy form submit + retry):

```
Req A: kv.get("rate:x") → [t1, t2, t3]  — valid: 3
Req B: kv.get("rate:x") → [t1, t2, t3]  — valid: 3  (czyta tę samą wartość!)
Req A: kv.put("rate:x", [t1,t2,t3,tA])  — count: 4
Req B: kv.put("rate:x", [t1,t2,t3,tB])  — count: 4  (nadpisuje A!)
```

Przy 2 równoczesnych requestach przekraczających limit oba mogą przejść. Przy normalnym ruchu
na niskiej skali landing page to jest akceptowalne (Turnstile jest primary defense). Ale warto
udokumentować.

Poprawka: Dodaj komentarz w kodzie:
```ts
// Note: KV read-modify-write has a race condition with concurrent requests.
// Acceptable for low-traffic landing page — Turnstile is the primary spam defense.
// For higher scale, use CF Durable Objects with atomic operations.
```

---

## Drobne uwagi (🟡 nit)

### 6. `appendNewsletter` zapisuje `ZgodaRODO: "Tak"` bezwarunkowo bez sprawdzania consent

**Plik:** `src/lib/airtable.ts` (linia 126)

Wywołanie `appendNewsletter({ email })` w `/api/newsletter/route.ts` nie przekazuje informacji
o faktycznej zgodzie użytkownika. Pole `ZgodaRODO` jest hardcoded na `"Tak"` niezależnie od tego
czy `consentRodo` był `true` czy `undefined` (JoinUsNewsletter passive consent).

RODO guard w API route sprawdza `!consentRodo && !consentNewsletter` przed wywołaniem — więc co
najmniej jedna zgoda istnieje. Ale w Airtable nie ma rozróżnienia między "RODO + newsletter" a
"tylko newsletter (passive)". Minimalny risk dla RODO, ale informacyjnie niepełne.

Sugestia: przekaż `consentNewsletter` do `appendNewsletter`:
```ts
appendNewsletter({ email: data.email, consentNewsletter: !!data.consentNewsletter })
// W airtable.ts: Marketing: data.consentNewsletter ? "Tak" : "Nie"
```

### 7. `wrangler.jsonc` ma KV namespace skomentowany — nie będzie działał nawet po odkomentowaniu bez ID

**Plik:** `wrangler.jsonc` (linie 12-16)

Komentarz mówi "Uncomment after creating KV namespace in CF dashboard". Ale `"id": "<your-kv-namespace-id>"`
jest placeholder. Developer/klient musi ręcznie zastąpić. To jest OK jako TODO, ale warto dodać
też `preview_id` dla `wrangler dev`:
```jsonc
"kv_namespaces": [
  {
    "binding": "RATE_LIMIT",
    "id": "<production-kv-namespace-id>",
    "preview_id": "<preview-kv-namespace-id>"
  }
]
```

### 8. `getLatestBlogPosts` nie jest opakowany w `cache()`

**Plik:** `src/data/blog.ts` (linie 55-59)

`getAllBlogPosts` jest `cache()` — OK. `getLatestBlogPosts` wywołuje `getAllBlogPosts()` (zdeduplikowane),
ale sama nie jest `cache()`. Przy dwóch wywołaniach `getLatestBlogPosts(3)` i `getLatestBlogPosts(1)`
na tej samej stronie — `getAllBlogPosts` jest zdeduplikowany, ale `slice` wykona się dwa razy.
Minimalny koszt, ale niespójne ze wzorcem.

### 9. `sanitizeCell` w `airtable.ts` nie obsługuje newline (`\n`) w środku stringa

**Plik:** `src/lib/airtable.ts` (linia 50)

Regex `/^[=+\-@\t\r]/` sprawdza tylko POCZĄTEK stringa. Pola `Wiadomosc` (message) i `Uwagi` (notes)
mogą zawierać `\n` — to nie jest zagrożenie formula injection (formulas muszą zaczynać się na
początku), więc nie jest blocking. Ale `\t` w środku tekstu też nie jest wyłapany — choć to też
nie jest podatność.

Obecna implementacja jest wystarczająca dla CSV injection prevention. Bez zmian.

### 10. `open-next.config.ts` — `edgeExternals: ["node:crypto"]` może być niepotrzebne

**Plik:** `open-next.config.ts` (linia 20)

`node:crypto` jest listowane w `edgeExternals` co oznacza że jest traktowane jako external w
edge bundlze. CF Workers ma wbudowane Web Crypto API i `nodejs_compat` flag daje dostęp do
`node:crypto` polyfill. Bez wiedzy która zależność wymaga `node:crypto` trudno ocenić czy to
jest konieczne czy defensywne dodanie.

Jeśli build i `wrangler dev` działają bez tego — można rozważyć usunięcie. Jeśli jest tu jako
fix dla konkretnego błędu runtime — warto to udokumentować w komentarzu.

---

## Weryfikacja interfejsów (pozytywne)

Sprawdzono szczegółowo:

**sheets.ts vs airtable.ts sygnatury** — IDENTYCZNE. Stary `appendBooking` w sheets.ts miał:
`childrenAges: string` (non-optional), `dietaryNeeds: string` (non-optional), `notes: string`
(non-optional). Nowy `appendBooking` w airtable.ts ma te pola jako `string | undefined` (optional).
To jest **ulepszona** sygnatura — bardziej zgodna z Zod schema gdzie te pola są `z.string().optional()`.
API routes przekazują `data.childrenAges` (może być undefined) — typowo bezpieczne.

**Brak importów google-auth-library / js-yaml / sheets** — potwierdzono przez grep. Żaden plik
w `src/` nie importuje tych usuniętych zależności.

**Brak `fs` / `path` imports w src/** — potwierdzono. Blog reader migracja zakończona poprawnie.

**Middleware** — `src/middleware.ts` nie wymaga zmian dla CF Workers (jest już edge-compatible,
tylko NextResponse.next()).

**Turnstile** — `verifyTurnstile` używa `fetch()` (Web API) — w pełni kompatybilne z CF Workers.

**Email (`src/lib/email.ts`)** — Resend SDK używa `fetch()` pod spodem — kompatybilne z CF Workers.

**`React.cache()` w `blog.ts`** — poprawne. `getAllBlogPosts` i `getBlogPost` są deduplikowane.

**ISR `revalidate`** — NA CF Workers jest ignorowane (dummy cache). Na Vercel działa poprawnie.
Dual deployment nie jest zepsuty — Vercel kod nadal korzysta z ISR normalnie.

---

## Architektura — ocena ogólna

Podejście dual-deployment (ten sam kod na Vercel i CF Workers) jest elegancko rozwiązane przez:

1. Dynamic import `getCloudflareContext` w try/catch — zwraca undefined na Vercel, nie crashuje
2. `rateLimit(ip, kv?)` — opcjonalny kv parameter, in-memory fallback gdy undefined
3. Airtable REST API — działa wszędzie gdzie jest `fetch()` (natywnie na CF Workers, polyfill na Vercel/Node)
4. Keystatic reader — `createReader(process.cwd(), config)` działa w build-time na obydwu platformach

Jedyna "dziura" w dual-deployment to ISR (omówione w pkt. 3), ale jest świadomie udokumentowana.

---

## Ocena ryzyka regresji dla master/Vercel

**Brak ryzyka regresji** na istniejącym Vercel deployment. Zmiany są:
- `src/lib/airtable.ts` — nowy plik, nie modyfikuje nic istniejącego
- `src/lib/sheets.ts` — usunięty, zastąpiony przez airtable.ts (clean swap)
- `src/lib/rate-limit.ts` — `rateLimit()` nadal eksportowana, nadal działa synchronicznie przez
  in-memory fallback gdy `kv` jest undefined (na Vercel kv zawsze będzie undefined)
- `src/lib/api-security.ts` — `rateLimit(ip)` → `await rateLimit(ip, kv)`. Funkcja jest teraz async
  ale Vercel Node.js obsługuje async bez problemu. KV binding zwróci undefined na Vercel.
- `src/data/blog.ts` — Keystatic reader zamiast fs+yaml. Działa w build-time na Vercel.
- `src/lib/constants.ts` — `CF_PAGES_URL` nie będzie ustawione na Vercel, nie wpływa na ALLOWED_ORIGINS.
- `src/types/global.d.ts` — tylko typy, zero runtime impact.

**Jedno pytanie do weryfikacji**: czy `@opennextjs/cloudflare` jako devDependency nie jest
importowane w runtime przez `api-security.ts` (dynamic import)? Dynamic import jest wykonywany
runtime — jeśli paczka jest w devDependencies, może być niedostępna na Vercel Production build.

Sprawdzenie: Vercel instaluje devDependencies podczas build (jeśli `NODE_ENV=production`
jest ustawione dopiero przy `next start`, nie przy `next build`). W praktyce Next.js na Vercel
wbudowuje zależności statycznie. Dynamic import z try/catch wraca `undefined` gracefully jeśli
moduł nie istnieje. To powinno działać, ale **warto przetestować `npm run build` na branchu**.

---

## Następne kroki (priorytet)

1. **🔴 MUST FIX**: Napraw graceful degradation — usuń try/catch z `append*` functions lub zmień
   logikę `allFailed` na partial failure detection. Bez tej poprawki lost leads będą cicho logowane
   tylko do `console.error` bez powiadomienia użytkownika.

2. **🟠 SHOULD DO**: Uruchom `npm run build` na branchu i `npm run build:cf` w WSL (lub środowisko
   Linux) — verify zero TypeScript errors i poprawny bundle size.

3. **🟠 SHOULD DO**: Dodaj do `docs/instrukcja-zarzadzanie.md` sekcję o ograniczeniach ISR na
   CF Workers — ręczny redeploy po zakończeniu warsztatu.

4. **🟡 NICE TO HAVE**: Zmień placeholder `mariaejk` → `[OWNER]` w `.dev.vars.example`.

5. **🟡 NICE TO HAVE**: Dodaj race condition comment do `rateLimitKV`.

---

## Decyzja merge

Po naprawieniu punktu 1 (🔴 blocking) — **branch jest gotowy do merge**. Architektura jest czysta,
dual-deployment jest poprawnie zaprojektowany, security nie ma regresji, usunięte zależności są
faktycznie usunięte.
