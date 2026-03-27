Last Updated: 2026-03-27

# Code Review — Faza 3: Workers Compatibility

Pliki: `src/lib/rate-limit.ts`, `src/lib/api-security.ts`, `src/lib/constants.ts`, `src/types/global.d.ts`

---

## Executive Summary

Ogólna jakość implementacji jest wysoka. Dual-deployment pattern jest przemyślany, fallback logika jest poprawna, a API routes nie wymagają żadnych zmian — to jest duże plus. Są jednak dwa blokujące problemy: (1) `getCloudflareContext()` w wersji 1.18.0 **wymaga** `{ async: true }` gdy wywoływana poza synchronicznym kontekstem request handlera, bez tego rzuca w runtime zamiast zwracać gracefully; (2) `KVNamespace` w `global.d.ts` referuje do globalnego typu z `@cloudflare/workers-types`, ale ten pakiet nie jest zainstalowany, co powoduje błąd TypeScript w trakcie budowania na Vercel. Oba wymagają naprawy przed deploy.

---

## Krytyczne Issues (must fix)

### 🔴 [blocking] `getCloudflareContext()` — brakuje `{ async: true }`

**Plik:** `src/lib/api-security.ts`, linia 18

```typescript
const ctx = await getCloudflareContext();
```

**Problem:** Zgodnie z typami w zainstalowanej wersji `@opennextjs/cloudflare@1.18.0` (plik `dist/api/cloudflare-context.d.ts`), funkcja ma dwa przeciążenia:

```typescript
// przeciążenie 1 — synchroniczne (default)
getCloudflareContext(options?: { async: false }): CloudflareContext

// przeciążenie 2 — asynchroniczne
getCloudflareContext(options: { async: true }): Promise<CloudflareContext>
```

Wywołanie `getCloudflareContext()` bez argumentów użyje przeciążenia synchronicznego i zwróci `CloudflareContext`, nie `Promise<CloudflareContext>`. TypeScript przepuści `await` na non-Promise (jest no-op), więc kod skompiluje się, ale **w runtime na CF Workers synchroniczne `getCloudflareContext()` może rzucić błąd jeśli jest wywoływane poza właściwym kontekstem async request pipeline** — zamiast graceful `undefined`. Catch w `getKVBinding` przechwyci to i zwróci `undefined`, więc rate limiting cicho zdegraduje się do in-memory na CF Workers — co jest błędem.

**Naprawa:**
```typescript
const ctx = await getCloudflareContext({ async: true });
return ctx.env?.RATE_LIMIT;
```

---

### 🔴 [blocking] `KVNamespace` w `global.d.ts` — brak zależności typów

**Plik:** `src/types/global.d.ts`, linia 10

```typescript
interface CloudflareEnv {
  RATE_LIMIT?: KVNamespace;
}
```

**Problem:** `KVNamespace` jest globalnym typem z `@cloudflare/workers-types`. Ten pakiet **nie jest** zainstalowany w projekcie (ani w `dependencies`, ani `devDependencies` w `package.json`). Zainstalowany jest tylko `@opennextjs/cloudflare`, który re-eksportuje `KVNamespace` w swoim `CloudflareEnv` interface, ale **nie deklaruje `KVNamespace` jako globalnego typu dostępnego w czystym TypeScript** poza kontekstem Workers runtime.

Efekt: `npm run build` na Vercel (lub lokalnie bez `@cloudflare/workers-types`) zwróci:
```
error TS2304: Cannot find name 'KVNamespace'.
```

**Naprawa — opcja A (zalecana, bezpieczna):** Zainstalować `@cloudflare/workers-types` jako `devDependency`:
```bash
npm install --save-dev @cloudflare/workers-types
```
Następnie w `tsconfig.json` dodać w `compilerOptions.types`:
```json
"types": ["@cloudflare/workers-types"]
```

**Naprawa — opcja B (bez nowego pakietu):** Zamienić `KVNamespace` na lokalny import lub inline type. W `global.d.ts`:
```typescript
// Importuj z lokalnego rate-limit zamiast z globalnych typów CF
type KVBinding = import("../lib/rate-limit").KVBinding;

interface CloudflareEnv {
  RATE_LIMIT?: KVBinding;
}
```
Wymaga wyeksportowania `KVNamespace` interface z `rate-limit.ts` jako `export type KVBinding = KVNamespace`.

Opcja B jest prostsza — nie dodaje nowego pakietu.

---

## Important Improvements (should fix)

### 🟠 `CF_PAGES_URL` — niepoprawna nazwa env var na Cloudflare Pages

**Plik:** `src/lib/constants.ts`, linia 26-28

```typescript
...(process.env.CF_PAGES_URL
  ? [`https://${process.env.CF_PAGES_URL}`]
  : []),
```

**Problem:** Cloudflare Pages automatycznie ustawia env var o nazwie **`CF_PAGES_URL`** tylko w build environment (podczas budowania), nie w runtime Workers. W runtime deploymentu na CF Pages dostępne są: `CF_PAGES_BRANCH`, `CF_PAGES_COMMIT_SHA`, ale **nie** `CF_PAGES_URL` w runtime env. Potwierdzenie: brak `CF_PAGES_URL` w oficjalnej dokumentacji CF Pages system bindings dla runtime.

Dla projektu wdrożonego przez `@opennextjs/cloudflare` (Workers, nie Pages) ta zmienna nie będzie ustawiona w runtime, więc ta linia jest no-op — nie szkodzi, ale jest myląca w komentarzu.

**Naprawa:** Zmienić komentarz żeby nie sugerować że to jest "auto-set":
```typescript
// CF Workers: ustaw CF_PAGES_URL ręcznie w Cloudflare Dashboard → Workers & Pages → Settings → Variables
// jeśli site ma custom preview URL
...(process.env.CF_PAGES_URL
  ? [`https://${process.env.CF_PAGES_URL}`]
  : []),
```
Alternatywnie: usunąć tę linię całkowicie, bo deploy idzie na `wyjazdyzdziecmi.pl` (production URL jest już w pierwszych dwóch wpisach). Preview deployments na CF Workers nie mają ustalonego URL pattern z env var — byłoby potrzebne `*.workers.dev` wildcard matching.

---

### 🟠 `kv as Parameters<typeof rateLimit>[1]` — unsafe cast przez `unknown`

**Plik:** `src/lib/api-security.ts`, linia 53

```typescript
const kv = await getKVBinding();
const { success } = await rateLimit(ip, kv as Parameters<typeof rateLimit>[1]);
```

**Problem:** `getKVBinding()` zwraca `Promise<unknown | undefined>`. Cast przez `as Parameters<typeof rateLimit>[1]` (czyli `as KVNamespace | undefined`) jest unsafe — TypeScript nie sprawdza czy `unknown` faktycznie implementuje `KVNamespace` interface. Jeśli CF zwróci coś innego niż oczekiwany KV binding (np. zmienił się kształt obiektu), kod crashnie w runtime z `TypeError: kv.get is not a function` zamiast gracefully fallback.

**Naprawa:** Zmienić zwracany typ `getKVBinding()` lub dodać type guard:

```typescript
// Opcja A: zmień return type funkcji
async function getKVBinding(): Promise<import("./rate-limit").KVBinding | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const kv = ctx.env?.RATE_LIMIT;
    return kv; // RATE_LIMIT jest typed jako KVNamespace w CloudflareEnv
  } catch {
    return undefined;
  }
}

// Wtedy cast nie jest potrzebny:
const kv = await getKVBinding();
const { success } = await rateLimit(ip, kv);
```

Wymaga naprawy problemu z `@cloudflare/workers-types` opisanego wyżej (żeby `KVNamespace` był dostępny w CloudflareEnv). Po naprawie obu kwestii cast staje się zbędny.

---

### 🟠 `KVNamespace` interface w `rate-limit.ts` — potencjalny konflikt z `@cloudflare/workers-types`

**Plik:** `src/lib/rate-limit.ts`, linia 40-43

```typescript
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}
```

**Problem:** Jeśli zostanie zainstalowany `@cloudflare/workers-types` (naprawa błędu krytycznego), globalny `KVNamespace` z tego pakietu ma **dużo więcej metod** (`getWithMetadata`, `list`, `delete`, `put` z dodatkowymi opcjami). Dwa deklaracje `KVNamespace` w tym samym scope mogą powodować `TS2403: Subsequent variable declarations must have the same type`.

Lokalny interface jest bezpieczny jako subset (TypeScript structural typing), ale dwie deklaracje o tej samej nazwie w tym samym scope mogą kolizjonować.

**Naprawa:** Zmienić nazwę lokalnego interface na niekonfliktową:
```typescript
// Zmień z KVNamespace na lokalną nazwę
interface KVBinding {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}
export type { KVBinding };
```

Potem używaj `KVBinding` wszędzie w tym pliku i eksportuj dla `global.d.ts`.

---

## Minor Suggestions (nice to have)

### 🟡 `expirationTtl: 900` — magic number, dodaj komentarz

**Plik:** `src/lib/rate-limit.ts`, linia 59

```typescript
await kv.put(key, JSON.stringify(valid), { expirationTtl: 900 });
```

`WINDOW_MS` jest zdefiniowany jako `15 * 60 * 1000` (ms), ale KV `expirationTtl` jest w sekundach. Wartość `900` jest poprawna (900s = 15min), ale nie ma komentarza łączącego te dwie stałe. Jeśli ktoś zmieni `WINDOW_MS`, łatwo zapomni zaktualizować `expirationTtl`.

**Naprawa:**
```typescript
const WINDOW_SECONDS = WINDOW_MS / 1000; // używane przez KV expirationTtl

// ...w rateLimitKV:
await kv.put(key, JSON.stringify(valid), { expirationTtl: WINDOW_SECONDS });
```

---

### 🟡 Eviction w `rateLimitInMemory` — nie usuwa najstarszych (hot path issue)

**Plik:** `src/lib/rate-limit.ts`, linia 15-24

Obecna eviction logika iteruje wszystkie wpisy szukając takich gdzie **wszystkie** timestamps wygasły. W skrajnym przypadku (10,000 aktywnych IPs) `EVICTION_BATCH=1000` iteruje tysiąc wpisów nie usuwając żadnego, bo każdy ma co najmniej jeden świeży timestamp.

Na Vercel (in-memory fallback) każda instancja ma krótki lifecycle (sekundy/minuty przy zimnym starcie) więc w praktyce problem nie wystąpi. Na Coolify (long-running process) mógłby. Warto dodać komentarz dokumentujący to ograniczenie.

---

### 🟡 `request.headers.get("x-real-ip")` — nieużywany fallback na CF Workers

**Plik:** `src/lib/api-security.ts`, linia 48-50

Na CF Workers `x-forwarded-for` jest zawsze obecny (CF dodaje go). `x-real-ip` jest konwencją Nginx/Vercel, nie CF. Kod jest bezpieczny (używa `x-forwarded-for`), ale komentarz mógłby dokumentować to zachowanie. Niski priorytet.

---

## Architecture Considerations

### Dual-deployment pattern jest poprawny

`validateRequest()` jest już `async` z poprzednich wersji (rate-limit, body parsing). Dodanie `await getKVBinding()` w środku nie zmienia sygnatury ani nie wymaga zmian w 4 API routes. To jest właściwe podejście — zero zmian w route handlers, cała logika adaptacji w `api-security.ts`.

### Dynamic import pattern jest właściwy

`await import("@opennextjs/cloudflare")` w `try/catch` to standardowy sposób na conditional dependency na CF Workers. `catch` przechwytuje `ModuleNotFoundError` (Node.js) i `Cannot find module` (różne runtimes). Wzorzec jest idiomatyczny.

### `getCloudflareContext({ async: true })` — kwestia wersjonowania

Opcja `{ async: true }` istnieje od `@opennextjs/cloudflare@1.x`. Projekt ma `^1.18.0` więc jest dostępna. Przy upgrade do 2.x API może się zmienić (breaking change) — warto to udokumentować w `CLAUDE.md` gdy upgrade nastąpi.

### KV rate limiting na CF Workers — spójność między instancjami

KV Workers jest globally consistent (eventually consistent z ~60s lag między regionami dla writes). Dla rate limitera 5req/15min jest to akceptowalne — drobne rozbieżności między regionami w oknie 60s nie tworzą materialnego security gap. Zapis (`put`) i odczyt (`get`) w ramach tego samego request w tym samym regionie jest spójny. Architektura jest poprawna.

### ISR na CF Workers (nie w scope tego review)

Projekt używa ISR (`revalidate=3600`). `@opennextjs/cloudflare` obsługuje ISR przez KV cache (`NEXT_INC_CACHE_KV`) — osobny binding, nie `RATE_LIMIT`. Faza 3 tego nie dotyka, co jest właściwe.

---

## Next Steps

**Przed deploy — wymagane:**

1. Napraw `getCloudflareContext({ async: true })` w `api-security.ts`
2. Rozwiąż `KVNamespace` type dostępność (opcja A: `npm install --save-dev @cloudflare/workers-types` + `tsconfig.json` update; opcja B: eksportuj `KVBinding` z `rate-limit.ts`)
3. Usuń `kv as Parameters<typeof rateLimit>[1]` cast po naprawie typów

**Zalecane przed deploy:**

4. Przenieś `expirationTtl: 900` na stałą `WINDOW_SECONDS`
5. Zaktualizuj komentarz przy `CF_PAGES_URL` lub usuń tę linię

**Opcjonalne:**

6. Rename `KVNamespace` → `KVBinding` w `rate-limit.ts` (prewencja konfliktu z `@cloudflare/workers-types`)
