# Code Review: Faza 1 — Migracja Google Sheets → Airtable

Last Updated: 2026-03-27

---

## Executive Summary

Migracja z `sheets.ts` na `airtable.ts` jest dobrze wykonana. Główna architektura (graceful degradation, Promise.allSettled, error handling) jest zachowana i spójna z poprzednią implementacją. API call do Airtable jest poprawny — URL, headers i body format zgodne ze specyfikacją REST API v0. `google-auth-library` poprawnie usunięty z `package.json`. Znaleziono 1 problem blokujący (brakująca sanitizacja danych), 3 ważne problemy i 4 drobne uwagi.

---

## 🔴 [blocking] Brakująca sanitizacja — odpowiednik `sanitizeCell()`

**Plik:** `src/lib/airtable.ts` — brak funkcji

Poprzedni `sheets.ts` miał funkcję `sanitizeCell()` chroniącą przed formula injection (`=`, `+`, `-`, `@` na początku wartości). Airtable REST API nie wykonuje formuł z rekordów tworzonych przez API — więc klasyczne injection jak w Sheets nie dotyczy Airtable bezpośrednio.

**Jednak** — jest inny wektor: jeśli klient eksportuje tabelę do CSV/Excel i otworzy plik, Excel/LibreOffice wykona formuły w komórkach zaczynających się od `=`. To klasyczny [CSV Injection / Formula Injection (OWASP)](https://owasp.org/www-community/attacks/CSV_Injection) — dotyczy danych wyjściowych, nie Airtable API samego w sobie.

Konkretny scenariusz: użytkownik wpisuje `=HYPERLINK("http://evil.com","klik")` w pole "Uwagi". Właściciel eksportuje bazę do Excel. Formuła wykonuje się. Może być użyte do phishingu.

**Fix — dodaj do `airtable.ts`:**

```typescript
/**
 * Prevents CSV/formula injection when data is exported to Excel or Google Sheets.
 * Prefixes dangerous characters with apostrophe (Excel/Sheets escape character).
 */
function sanitizeCell(value: string): string {
    if (/^[=+\-@]/.test(value)) {
        return `'${value}`;
    }
    return value;
}
```

**Zastosowanie** — wyłącznie na polach tekstowych od użytkownika (`Imie`, `Telefon`, `Wyjazd`, `WiekDzieci`, `Dieta`, `Uwagi`, `Wiadomosc`). Nie stosuj na polach kontrolowanych przez kod (`Data`, `Status`, `ZgodaRODO`, `Marketing`, `Zrodlo`).

```typescript
await appendToTable("Rezerwacje", {
    Data: getTimestamp(),
    Imie: sanitizeCell(data.name),
    Email: data.email,          // email format validation prevents injection
    Telefon: sanitizeCell(data.phone),
    Wyjazd: sanitizeCell(data.trip),
    Dorosli: String(data.adults),
    Dzieci: String(data.children),
    WiekDzieci: sanitizeCell(data.childrenAges || ""),
    Dieta: sanitizeCell(data.dietaryNeeds || ""),
    Uwagi: sanitizeCell(data.notes || ""),
    Status: "Nowy",
    ZgodaRODO: "Tak",
    Marketing: data.consentMarketing ? "Tak" : "Nie",
});
```

---

## 🟠 [important] Stale komentarze "Google Sheets" w 4 API routes

**Pliki:**
- `src/app/api/booking/route.ts` linia 58
- `src/app/api/contact/route.ts` linia 56
- `src/app/api/waitlist/route.ts` linia 56
- `src/app/api/newsletter/route.ts` linia 58

Wszystkie mają komentarz:
```typescript
// Google Sheets + emails (parallel, graceful degradation)
```

Komentarz jest mylący po migracji. Następny developer (lub developer wracający po 6 miesiącach) zobaczy "Google Sheets" i będzie szukać importu `sheets.ts` albo zakwestionuje czy migracja była kompletna.

**Fix:**
```typescript
// Airtable + emails (parallel, graceful degradation)
```

---

## 🟠 [important] Sygnatury opcjonalnych pól w `appendBooking` niezgodne z rzeczywistością

**Plik:** `src/lib/airtable.ts`, linie 48–58

Parametry `childrenAges`, `dietaryNeeds`, `notes` są zadeklarowane jako `string` (wymagane), ale w `appendToTable` są używane z `|| ""` co sugeruje że mogą być `undefined`:

```typescript
WiekDzieci: data.childrenAges || "",   // || "" = może być undefined
Dieta: data.dietaryNeeds || "",
Uwagi: data.notes || "",
```

Jeśli Zod schema ma te pola jako `.optional()` lub `.default("")`, to TypeScript może zgłosić błąd przy przekazaniu `data.childrenAges` (typ `string | undefined`) do parametru `string`. Albo TypeScript nie zgłosi błędu ale `|| ""` jest zbędne.

**Fix — dostosuj sygnaturę do rzeczywistości:**

```typescript
export async function appendBooking(data: {
    name: string;
    email: string;
    phone: string;
    trip: string;
    adults: number;
    children: number;
    childrenAges?: string;
    dietaryNeeds?: string;
    notes?: string;
    consentMarketing: boolean;
})
```

Ewentualnie jeśli Zod `.default("")` gwarantuje `string` (nigdy `undefined`), usuń `|| ""` jako zbędne.

---

## 🟠 [important] Brak `.wrangler/` w `.gitignore`

**Plik:** `.gitignore`

Wrangler 4.x tworzy katalog `.wrangler/` podczas `wrangler dev` dla lokalnej persystencji KV, D1, R2. Po Fazie 3 (KV rate limiter) ten katalog będzie tworzony lokalnie. Bez wpisu w `.gitignore` może zostać przypadkowo skommunikowany.

Sprawdzono: `.wrangler/` nie jest w obecnym `.gitignore`.

**Fix:** Dodaj `.wrangler/` do `.gitignore`.

---

## 🟡 [nit] `errorText` z Airtable API — logowanie jest poprawne, ale warto dodać komentarz

**Plik:** `src/lib/airtable.ts`, linia 38

```typescript
console.error(`[Airtable] API error (${response.status}):`, errorText);
throw new Error(`Airtable API error (${response.status})`);
```

Pełny error idzie do logów (Vercel/CF), do throwed Error trafia tylko status — zgodne z projektem i Security Audit Lessons ("Log full error via console.error, but throw only Error(status)"). Poprawne.

Warto dodać komentarz analogiczny do sheets.ts żeby intencja była jasna:

```typescript
// Log full error for debugging, but don't leak API details in thrown error
console.error(`[Airtable] API error (${response.status}):`, errorText);
```

Ten komentarz jest już obecny na linii 37 — więc nit jest zamknięty. Brak akcji wymagany.

---

## 🟡 [nit] `process.env` w CF Workers — wymaga konfiguracji secrets

**Plik:** `src/lib/airtable.ts`, linie 4–5

`process.env` działa w CF Workers z flagą `nodejs_compat` (ustawioną w `wrangler.jsonc`). Poprawne.

**Jednak** — zmienne środowiskowe w CF Workers muszą być skonfigurowane jako Secrets (`wrangler secret put AIRTABLE_API_KEY`) lub przez CF Dashboard. W `wrangler.jsonc` nie ma bloku `[vars]` ani komentarza dokumentującego wymagane sekrety.

**Rekomendacja:** Dodaj do `wrangler.jsonc` jako komentarz:

```jsonc
// Secrets (nigdy nie dodawaj wartości tutaj — używaj `wrangler secret put`):
// AIRTABLE_API_KEY, AIRTABLE_BASE_ID, RESEND_API_KEY, FROM_EMAIL, OWNER_EMAIL
// TURNSTILE_SECRET_KEY, KEYSTATIC_GITHUB_CLIENT_ID, itd.
// Lub ustaw przez CF Dashboard: Workers & Pages → wyjazdy-z-dziecmi → Settings → Variables
```

---

## 🔵 [suggestion] Brak pola `Zgoda` w `appendNewsletter` — RODO audit trail

**Plik:** `src/lib/airtable.ts`, linia 103

`appendNewsletter` przyjmuje tylko `{ email: string }`. Newsletter route sprawdza `!data.consentRodo && !data.consentNewsletter` — więc jeden z tych consent'ów jest zawsze `true`. Airtable rekord nie rejestruje jednak **który** checkbox był zaznaczony.

Z perspektywy RODO — brak zapisu który typ zgody był udzielony utrudnia audyt compliance. `sheets.ts` też miało hardcoded `ZgodaRODO: "Tak"`, więc jest to regresja neutralna (nie pogorsza).

**Suggestion:** Dodaj opcjonalne pole `Zgoda` do `appendNewsletter`:

```typescript
export async function appendNewsletter(data: {
    email: string;
    consentType?: "rodo" | "newsletter" | "both";
}) {
    await appendToTable("Newsletter", {
        Data: getTimestamp(),
        Email: data.email,
        Status: "Aktywny",
        ZgodaRODO: "Tak",
        Zgoda: data.consentType ?? "rodo",
    });
}
```

---

## Weryfikacja zgodności z CF Workers

Wszystkie blokery CF Workers z poprzedniego sheets.ts są usunięte:

| Bloker | Status |
|--------|--------|
| `google-auth-library` (Node.js crypto) | Usunięty z `package.json` |
| `JWT signing` (Node.js `crypto`) | Nie ma w `airtable.ts` |
| `googleapis` (Node.js http) | Nie było w projekcie, nie ma |
| Raw `fetch()` do Airtable REST | Jest — CF Workers native |
| `process.env` | Jest — działa z `nodejs_compat` |

`airtable.ts` jest w pełni kompatybilny z CF Workers środowiskiem.

---

## Weryfikacja Airtable API Call

- **URL:** `https://api.airtable.com/v0/{baseId}/{tableName}` — poprawny format
- **Method:** POST — poprawny (tworzenie rekordu)
- **Header Authorization:** `Bearer {apiKey}` — poprawny format Personal Access Token
- **Header Content-Type:** `application/json` — wymagany
- **Body:** `{ fields: { ... } }` — poprawny format dla `POST /v0/{baseId}/{tableId}` (create record)
- **`encodeURIComponent(table)`** — poprawne, ważne dla polskich znaków w nazwie tabeli

Jeden potencjalny problem: nazwy tabel muszą dokładnie odpowiadać nazwom w Airtable dashboard. Kod używa: `Rezerwacje`, `Kontakty`, `Newsletter`, `ListaOczekujacych`. Muszą być tak samo nazwane w Airtable — bez spacji, polskich znaków, różnych liter.

---

## Next Steps

Po zatwierdzeniu:

1. **[blocking]** Dodaj `sanitizeCell()` do `airtable.ts` i zastosuj na polach od użytkownika w `appendBooking`, `appendContact`, `appendWaitlist`
2. **[important]** Zaktualizuj komentarze "Google Sheets" → "Airtable" w 4 routes
3. **[important]** Dostosuj sygnatury opcjonalnych pól w `appendBooking`
4. **[important]** Dodaj `.wrangler/` do `.gitignore`
5. **[nit]** Dodaj komentarz o secrets do `wrangler.jsonc`
6. **[suggestion]** Rozważ dodanie pola `Zgoda` w `appendNewsletter` dla RODO audit trail

---

---

# Code Review: Faza 0 — Przygotowanie infrastruktury CF Workers

Last Updated: 2026-03-27

Branch: `feature/cloudflare-airtable-migration`
Commit: `53aab12`

---

## Executive Summary

Faza 0 jest w dużej mierze poprawna. Cztery zmienione pliki (open-next.config.ts, wrangler.jsonc, package.json, .gitignore) nie zawierają błędów krytycznych, ale mają kilka istotnych luk, które należy naprawić zanim wejdziemy w Fazy 1–3. Najważniejsza kwestia to brak skryptów build/preview dla CF w package.json — bez nich każdy developer musi pamiętać pełną komendę npx. Druga to brak konfiguracji KV namespace w wrangler.jsonc, który będzie potrzebny już w Fazie 3.

---

## Krytyczne problemy (blocking)

### 1. Brak skryptów CF build w package.json

**Plik:** `package.json`, linijki 5–9

Obecny stan:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Brakuje:
```json
"build:cf": "opennextjs-cloudflare build",
"preview": "opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare deploy"
```

**Dlaczego blokuje:** Bez `build:cf` każdy developer (i każdy CI/CD pipeline) musi pamiętać pełną komendę `npx @opennextjs/cloudflare build`. Faza 4 (deploy) nie może działać bez udokumentowanego skryptu. Kontekst zawiera `kontekst.md` zad. 3.9 "Aktualizacja package.json scripts (build:cf, preview)" — ale to zadanie w Fazie 3, nie Fazie 0. Powinno być tu, bo `wrangler.jsonc` wskazuje na `.open-next/worker.js`, który powstaje tylko po `build:cf`. Osoba robiąca `npm run build` (Next.js) nie wygeneruje poprawnych artefaktów CF.

---

## Ważne problemy (important)

### 2. Brak KV namespace binding w wrangler.jsonc

**Plik:** `wrangler.jsonc`, cały plik

Obecny plik ma 10 linijek i nie deklaruje żadnych bindings poza `ASSETS`. Plan migracji (Faza 3, zad. 3.8) zakłada KV namespace `RATE_LIMIT`, ale wrangler.jsonc jest dodawany do repozytorium już teraz. Jeśli Faza 3 doda binding bez review, będzie to nieudokumentowana zmiana.

Sugestia — dodaj od razu szkielet przyszłych bindingów jako komentarze (JSONC je obsługuje):

```jsonc
{
  "name": "wyjazdy-z-dziecmi",
  "compatibility_date": "2025-05-05",
  "compatibility_flags": ["nodejs_compat"],
  "main": ".open-next/worker.js",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
  // Faza 3: KV rate limiter
  // "kv_namespaces": [
  //   { "binding": "RATE_LIMIT", "id": "REPLACE_WITH_ID", "preview_id": "REPLACE_WITH_PREVIEW_ID" }
  // ]
}
```

Nie jest to blokujące, bo KV jest potrzebne dopiero w Fazie 3 — ale teraz jest dobry moment by udokumentować planowaną strukturę pliku.

### 3. `eslint-config-next` ma nieprawidłową wersję w devDependencies

**Plik:** `package.json`, linia 39

```json
"eslint-config-next": "16.1.6",
```

Projekt używa `next: "^16.2.1"`. `eslint-config-next` jest pinowane na `16.1.6` (stała wersja bez `^`). To jest istniejący problem, nie wprowadzony w tej fazie — ale warto go naprawić przy okazji edycji package.json: `"eslint-config-next": "^16.2.1"` lub po prostu `"^16"`.

Skutek: przy aktualizacji Next.js lint może wymagać manualnego pinowania. Niska priorytet ale dobry moment na poprawkę.

### 4. Ostrzeżenie WSL nie jest zalogowane ani udokumentowane w pliku konfiguracyjnym

**Kontekst:** `cloudflare-airtable-migration-kontekst.md`, linia 12

Kontekst notuje: _"OpenNext is not fully compatible with Windows. Use WSL."_ — ale ta informacja jest tylko w dokumentacji projektu. Nie ma żadnego guardu ani komentarza w `open-next.config.ts` ani `wrangler.jsonc` ostrzegającego następnego developera.

Sugestia — dodaj komentarz na górze `open-next.config.ts`:

```typescript
/**
 * OpenNext Cloudflare adapter configuration.
 *
 * UWAGA: Build na Windows może dawać ostrzeżenia o kompatybilności.
 * Produkcyjny build powinien być uruchamiany w środowisku Linux/WSL lub CI.
 * Ref: https://opennext.js.org/cloudflare
 */
```

To nie blokuje build, ale zapobiega pytaniom typu "dlaczego build daje ostrzeżenia u mnie".

---

## Drobne sugestie (nit)

### 5. `wrangler.jsonc` nie ma pola `$schema`

**Plik:** `wrangler.jsonc`, linia 1

Brak `$schema` oznacza brak autouzupełniania w VS Code. Dodanie jednej linii daje darmową walidację:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "wyjazdy-z-dziecmi",
  ...
}
```

Alternatywnie: `"$schema": "https://unpkg.com/wrangler/config-schema.json"` dla URL-based schema.

### 6. `name` w wrangler.jsonc a rzeczywista nazwa projektu CF

**Plik:** `wrangler.jsonc`, linia 2

```jsonc
"name": "wyjazdy-z-dziecmi"
```

Nazwa musi dokładnie odpowiadać nazwie projektu w Cloudflare Dashboard (zadanie 0.4 w planie: "Setup CF Pages/Workers projekt" — jeszcze niewykonane). Jeśli w dashboardzie zostanie użyta inna konwencja (np. `wyjazdyzdziecmi` bez myślników), deploy Fazy 4 zakończy się błędem. Zanotuj w kontekście, żeby podczas 0.4 użyć dokładnie `wyjazdy-z-dziecmi` jako nazwy projektu.

### 7. Brak `.dev.vars.example` w repozytorium

`.dev.vars` jest poprawnie w `.gitignore` — nie powinien być commitowany (zawiera sekrety). Ale nie ma `.dev.vars.example` z listą wymaganych zmiennych środowiskowych dla CF Workers. Developerzy klonujący repo nie wiedzą co wpisać do `.dev.vars`.

Sugestia — dodaj `.dev.vars.example`:

```
# Cloudflare Workers local secrets (copy to .dev.vars, never commit .dev.vars)
RESEND_API_KEY=
FROM_EMAIL=
OWNER_EMAIL=
TURNSTILE_SECRET_KEY=
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

---

## Analiza pliku open-next.config.ts (linia po linii)

**Linia 6: `wrapper: "cloudflare-node"`** — poprawny wybór dla Workers z `nodejs_compat`. Alternatywa `cloudflare-edge` dla middleware (linia 18) też jest właściwa — middleware działa w Edge runtime.

**Linia 7: `converter: "edge"`** — poprawny. Edge converter obsługuje `Request`/`Response` Web API natywne dla Workers.

**Linia 8: `proxyExternalRequest: "fetch"`** — poprawny. Workers nie mają `http` module, `fetch` to jedyna opcja.

**Linia 9: `incrementalCache: "dummy"`** — prawidłowy świadomy wybór. ISR wymaga R2 + Durable Objects (paid). Dummy = strony są pre-renderowane przy buildzie (SSG). Zgodnie z planem: "SSG + CF Cache Rules jeśli ISR nie wspierane". Brak komentarza w kodzie tłumaczącego dlaczego dummy — warto dodać.

**Linia 10: `tagCache: "dummy"`** — konsekwentne z incrementalCache: "dummy". Poprawne.

**Linia 11: `queue: "direct"`** — poprawny. Direct queue = synchroniczne wywołania (bez kolejki ISR). Właściwe dla projektu bez ISR.

**Linia 14: `edgeExternals: ["node:crypto"]`** — to jest zewnętrzna konfiguracja poza `default.override`. Poprawna lokalizacja. `node:crypto` jest potrzebne jeśli używasz Node.js crypto API przez `nodejs_compat` flag.

**Linia 15–22: `middleware: { external: true }`** — ustawienie `external: true` oznacza że middleware działa jako osobna Edge Function zamiast być bundlowany z main workerem. Jest to opcja rekomendowana przez @opennextjs/cloudflare dla Next.js middleware (np. redirect logic). Poprawne.

**Podsumowanie open-next.config.ts:** Konfiguracja jest wzorcowa dla projektu bez ISR na Workers. Jedyna sugestia to dodanie komentarzy do `incrementalCache: "dummy"` i `tagCache: "dummy"` wyjaśniających świadomą decyzję.

---

## Analiza wrangler.jsonc (linia po linii)

**Linia 3: `"compatibility_date": "2025-05-05"`** — powyżej wymaganego minimum (2025-03-17 dla FinalizationRegistry support). Data 2025-05-05 jest też powyżej daty kiedy wyszedł `nodejs_compat` w stabilnej formie. Poprawne.

**Linia 4: `"compatibility_flags": ["nodejs_compat"]`** — wymagany dla `google-auth-library` (jeszcze) i przyszłego kodu korzystającego z Node.js built-ins. Poprawny.

**Linia 5: `"main": ".open-next/worker.js"`** — zgadza się z output path `@opennextjs/cloudflare`. Poprawne.

**Linie 6–9: `assets`** — `binding: "ASSETS"` to nazwa konwencjonalna, wymagana przez adapter OpenNext. Directory `.open-next/assets` jest poprawna.

**Czego brakuje:**
- `$schema` (nit #5)
- `kv_namespaces` dla Fazy 3 (przynajmniej jako komentarz — important #2)
- `vars` section dla non-secret env vars (np. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) — rozważ w Fazie 3

---

## Analiza package.json

**Nowe devDependencies:**
- `@opennextjs/cloudflare: "^1.18.0"` — poprawna wersja. `^` pozwala na minor/patch updates. Akceptowalne, ale przy problemach można pinować do `"1.18.0"`.
- `wrangler: "^4.77.0"` — poprawna wersja (wymagane 4.65+). Umieszczone w `devDependencies` — poprawnie, bo wrangler to narzędzie deweloperskie, nie runtime dependency.

**Istniejące zależności do usunięcia w kolejnych fazach (plan jest):**
- `google-auth-library` (Faza 1) — zanotowane
- `js-yaml` + `@types/js-yaml` (Faza 2) — zanotowane

**Problem:** Brak skryptów `build:cf`, `preview`, `deploy` — patrz blocking #1.

---

## Analiza .gitignore

```
.open-next/
.dev.vars
```

**`.open-next/`** — poprawne. Build artefakty CF Workers nie powinny być commitowane.

**`.dev.vars`** — poprawne. Lokalne sekrety (będą tu Airtable API key, Resend key itd.) muszą być poza repo.

**Czego może brakować:**
- `wrangler-state/` — Wrangler 4.x tworzy katalog `.wrangler/` lub `wrangler-state/` dla persystencji lokalnego KV, D1, R2 w `wrangler dev`. Warto sprawdzić czy jest już w gitignore.

Sprawdzono — `.wrangler/` nie jest w obecnym `.gitignore`. Może nie być potrzebne jeśli nie używasz lokalnego KV/D1 (a projekt na razie nie używa), ale po Fazie 3 (KV rate limiter) stanie się potrzebne.

---

## Rozważania architektoniczne

### ISR → SSG: skutki dla projektu

Wyłączenie ISR (`incrementalCache: "dummy"`) oznacza że strony z `export const revalidate = 3600` (homepage, /wyjazdy, 4 category pages) będą generowane raz przy buildzie i nie będą automatycznie odświeżane. W konsekwencji:

1. **`auto-isPast`** przestaje działać automatycznie — wycieczki nie zmienią się na "zakończone" bez nowego buildu.
2. **Nowe posty blogowe** pojawią się dopiero po następnym buildzie.
3. **Nowe wypowiedzi/wyjazdy dodane przez klienta przez CMS** pojawią się dopiero po następnym buildzie.

Plan migracji zakłada "SSG + CF Cache Rules + daily rebuild cron" — to dobry kierunek, ale warto go sformalizować w Fazie 3/4. Zadanie 3.7 ("Usunięcie revalidate, dodanie CF Cache Rules") jest zaplanowane, ale brakuje zadania "Setup GitHub Actions cron dla daily rebuild".

Sugestia: dodaj zadanie 3.7a: "Dodanie GitHub Actions cron workflow dla automatycznego dziennego rebuildu (wywołuje `npx opennextjs-cloudflare deploy`)".

### Bundle 4.4MB vs limit 10MB Workers

Obecne 4.4MB to dobry wynik, ale bundle breakdown z kontekstu wskazuje `next (15MB)` — to prawdopodobnie nieskompresowany rozmiar frameworka przed tree-shaking. Warto w Fazie 4 uruchomić `wrangler deploy --dry-run` i sprawdzić czy kompresowany rozmiar nie przekroczył 10MB po dodaniu Airtable client i zmianach Fazy 1–3.

---

## Next Steps

Przed przejściem do Fazy 1 należy:

1. **[blocking]** Dodać skrypty `build:cf`, `preview`, `deploy` do `package.json` scripts
2. **[important]** Dodać komentarze z placeholders dla KV bindings do `wrangler.jsonc`
3. **[nit]** Dodać `$schema` do `wrangler.jsonc`
4. **[nit]** Dodać `.dev.vars.example` do repozytorium
5. **[nit]** Dodać `.wrangler/` do `.gitignore` (przygotowanie na Fazę 3 + KV)
6. **[nit]** Dodać komentarze do `open-next.config.ts` (ISR disabled, WSL warning)

Faza 1 (Airtable) i Faza 2 (blog) mogą być implementowane równolegle — są niezależne od siebie.
