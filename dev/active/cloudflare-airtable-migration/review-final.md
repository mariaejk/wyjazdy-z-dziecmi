# Code Review — Finalny (wszystkie zmiany vs master)

Data: 2026-03-27
Reviewer: code-architecture-reviewer agent
Zakres: 13 commitów, 19 plików kodu, branch feature/cloudflare-airtable-migration

## Problemy

### 🔴 [blocking] (1)

1. **`src/lib/airtable.ts`** — Graceful degradation broken. Każda `append*` ma wewnętrzny `try/catch` który łapie błąd i zwraca `undefined` → `Promise.allSettled` widzi `fulfilled`. `allFailed` nigdy nie jest true z powodu Airtable. Gdy Airtable down + email OK → user widzi success, lead cicho tracony. **Fix:** Usunąć try/catch z publicznych append* — niech `appendToTable` throw propaguje do allSettled w route.ts.

### 🟠 [important] (4)

1. **`src/lib/constants.ts`** — `CF_PAGES_URL` preview deployment URLs (jak VERCEL_URL). Dodać komentarz wyjaśniający.
2. **ISR silent ignore** — Na CF Workers `revalidate=3600` jest cicho ignorowane (dummy cache). Auto-isPast nie działa bez rebuildu. Klient musi wiedzieć o ręcznym redeployu/cron rebuild.
3. **`.dev.vars.example`** — Hardcoded `mariaejk` zamiast `[OWNER]` placeholder (konwencja z docs).
4. **`src/lib/rate-limit.ts`** — KV read-modify-write race condition przy concurrent requests. Akceptowalne dla niskiego ruchu, ale brak komentarza.

### 🟡 [nit] (0)

Brak.

## Pozytywne

- **Dual deployment** — kod działa na Vercel i CF Workers bez zmian. Elegancki dynamic import pattern.
- **Zero regresji na Vercel** — master branch nie dotknięty, in-memory fallback zachowany.
- **Usunięte dependencies** faktycznie usunięte — grep potwierdza brak referencji.
- **Security** bez regresji — sanitizeFields, CSRF, rate limiting, honeypot zachowane.
- **Bundle 4.3MB compressed** — dużo poniżej 10MB limitu.
- **Architektura** — KVBinding jako single exported type, getCloudflareContext({ async: true }), graceful KV fallback.

## Ogólna ocena

**Branch architektonicznie solidny.** 1 blocking bug (przeniesiony z sheets.ts) do naprawienia. 4 important to komentarze/dokumentacja. Po naprawie blocking — gotowy do merge (po Fazie 4-5 setup).
