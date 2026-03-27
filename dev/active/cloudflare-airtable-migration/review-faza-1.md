# Code Review — Faza 1: Google Sheets → Airtable

Data: 2026-03-27
Reviewer: code-architecture-reviewer agent

## Pliki sprawdzone

1. `src/lib/airtable.ts` — nowy moduł
2. `src/app/api/booking/route.ts` — zmiana importu
3. `src/app/api/contact/route.ts` — zmiana importu
4. `src/app/api/newsletter/route.ts` — zmiana importu
5. `src/app/api/waitlist/route.ts` — zmiana importu
6. `.env.example` — aktualizacja env vars
7. `package.json` — usunięty google-auth-library

## Problemy

### 🔴 [blocking] (1)

1. **`src/lib/airtable.ts`** — Brak `sanitizeCell()`. Airtable nie wykonuje formuł przez API, ale eksport do Excel/LibreOffice uruchamia formułe z `=`. Pole "Uwagi" w booking to wektor CSV Injection na właściciela.

### 🟠 [important] (3)

1. **4 API routes** — Stale komentarze `// Google Sheets + emails` → powinno być `// Airtable + emails`
2. **`src/lib/airtable.ts`** — `appendBooking` deklaruje `childrenAges: string` ale używa `|| ""` co sugeruje może być undefined. Typ powinien być `childrenAges?: string` lub usunąć `|| ""`.
3. **`.gitignore`** — `.wrangler/` dodany w review fazy 0, OK.

### 🟡 [nit] (0)

Brak.

## Pozytywne

- Airtable API call poprawny (URL, headers, body)
- google-auth-library poprawnie usunięty
- encodeURIComponent na nazwie tabeli
- Graceful degradation zachowane (Promise.allSettled)
- Security: log full error, throw tylko status
- CF Workers compatible (standard fetch + process.env z nodejs_compat)
