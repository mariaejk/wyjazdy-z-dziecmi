# Code Review: Form Delivery System — Faza 1

**Last Updated: 2026-03-24**
**Branch:** `feature/form-delivery-system`
**Reviewer:** Claude Code (Sonnet 4.6)
**Scope:** Zadania 1.1–1.6 (infrastruktura: zależności npm + 3 helpery backendowe)

---

## Executive Summary

Faza 1 jest **zasadniczo dobrze zaimplementowana** i w pełni zgodna z planem. Wszystkie 6 zadań (1.1–1.6) zrealizowane. Helpery są zwięzłe, stosują graceful degradation, mają poprawne typy TypeScript, i przestrzegają wzorców projektu.

Znaleziono **2 błędy blokujące** (mogą powodować ciche błędy w produkcji lub błędy kompilacji), **3 ważne poprawki** i **5 drobnych sugestii**.

---

## Krytyczne problemy — 🔴 Blocking (must fix before Faza 2)

### 🔴 1. `sheets.ts` — brak sprawdzenia kluczy Google Auth przed `appendToSheet`

**Plik:** `src/lib/sheets.ts`, linie 6–14 i 16–45

**Problem:** Funkcja `appendToSheet` sprawdza tylko `GOOGLE_SHEETS_SPREADSHEET_ID`, ale NIE sprawdza `GOOGLE_SHEETS_CLIENT_EMAIL` ani `GOOGLE_SHEETS_PRIVATE_KEY`. Jeśli ID arkusza jest ustawione, a klucze auth nie są — `GoogleAuth` zostanie wywołany z `client_email: undefined` i `private_key: undefined`. Biblioteka `google-auth-library` może się zachować nieprzewidywalnie: albo rzuci błąd (który zostanie złapany przez `try/catch` w helperach), albo będzie próbować użyć Application Default Credentials ze środowiska — a tego na Vercel nie ma.

Aktualna logika:

```ts
// appendToSheet — sprawdza tylko SPREADSHEET_ID
if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn("[Sheets] GOOGLE_SHEETS_SPREADSHEET_ID not set — skipping");
    return;
}
// Ale potem:
const auth = getAuth();  // credentials mogą być undefined
```

**Skutek:** Na Vercel z ustawionym tylko `SPREADSHEET_ID` (bez kluczy) — cold start może rzucić niejasny błąd zamiast czytelnego `console.warn`.

**Poprawka:**

```ts
async function appendToSheet(sheet: string, values: string[]) {
    if (
        !process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
        !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
        !process.env.GOOGLE_SHEETS_PRIVATE_KEY
    ) {
        console.warn("[Sheets] Google Sheets credentials not configured — skipping");
        return;
    }
    // ... reszta bez zmian
}
```

---

### 🔴 2. `email.ts` — `resend` singleton inicjalizowany bez klucza, `ReactNode` jako typ `react`

**Plik:** `src/lib/email.ts`, linie 1–4 i 11–16

**Problem A — Singleton bez klucza:**

```ts
const resend = new Resend(process.env.RESEND_API_KEY);  // może być undefined
```

`Resend` konstruktor jest wywoływany na poziomie modułu (czas ładowania), zanim `sendEmail` sprawdzi `if (!process.env.RESEND_API_KEY)`. Przekazanie `undefined` do konstruktora Resend SDK może spowodować błąd już podczas importu modułu lub wyprodukować instancję w złym stanie. Sprawdzenie w `sendEmail` jest spóźnione.

**Problem B — Typ `react: ReactNode`:**

```ts
import type { ReactNode } from "react";
// ...
type SendEmailOptions = {
    react: ReactNode;
    // ...
};
```

Resend SDK przyjmuje `react` prop jako `React.ReactElement` (renderowany element), nie `ReactNode`. `ReactNode` obejmuje `string`, `null`, `undefined`, `boolean`, `ReactPortal` itd., których Resend nie obsłuży. Powinno być `React.ReactElement`.

**Poprawka:**

```ts
import type { ReactElement } from "react";

// Lazy singleton — tworzymy instancję dopiero gdy potrzebna
function getResendClient(): Resend {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY not set");
    return new Resend(key);
}

type SendEmailOptions = {
    to: string;
    subject: string;
    react: ReactElement;  // nie ReactNode
    replyTo?: string;
};

async function sendEmail(options: SendEmailOptions) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("[Email] RESEND_API_KEY not set — skipping");
        return;
    }
    const resend = getResendClient();
    // ... reszta bez zmian
}
```

Alternatywnie zachowaj singleton, ale dodaj guard `|| ""` i sprawdzaj w konstruktorze:

```ts
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
```

---

## Ważne poprawki — 🟠 Important (should fix before production)

### 🟠 3. `sheets.ts` — `appendToSheet` rzuca błąd, ale helpery go łapią lokalnie — ryzyko ukrycia problemów w Faza 3

**Plik:** `src/lib/sheets.ts`, linie 40–45 i 64–83

**Problem:** Wzorzec `appendToSheet` rzuca błąd (`throw new Error(...)`), a każdy helper (`appendBooking`, `appendContact` itd.) łapie go lokalnie i loguje `console.error`. To jest **poprawna graceful degradation**, ale w Fazie 3 plan zakłada `Promise.allSettled([appendBooking(), sendBookingEmails()])`. Wtedy zarówno `appendBooking` jak i `sendBookingEmails` zawsze zwrócą "fulfilled" (bo łapią błędy w sobie), więc `Promise.allSettled` nie da informacji co się nie udało.

W praktyce oznacza to: jeśli Sheets nie działa i email nie działa — route zwróci `{ success: true }` użytkownikowi, mimo że dane nigdzie nie trafiły.

**Rekomendacja:** Przed Fazą 3 zdecyduj o strategii błędów i udokumentuj ją w kodzie. Opcje:
- Helpery zwracają `{ ok: boolean; error?: string }` zamiast `void`
- `Promise.allSettled` sprawdza `reason` każdego wyniku i loguje łącznie
- Albo zostaw jak jest, ale dodaj komentarz wyjaśniający świadomą decyzję

---

### 🟠 4. `turnstile.ts` — brak walidacji pustego tokenu (empty string)

**Plik:** `src/lib/turnstile.ts`, linia 4

```ts
export async function verifyTurnstile(token: string): Promise<boolean>
```

**Problem:** Jeśli caller przekaże pusty string `""` (np. widget nie zdążył się załadować po stronie frontend), funkcja wykona request do Cloudflare API z `response: ""`. Cloudflare prawdopodobnie zwróci `{ success: false }`, ale to zbędny sieciowy round-trip. Dodatkowo, w Fazie 3 jeśli `turnstileToken` jest opcjonalne w Zod schema, caller może przekazać `""`.

**Poprawka:**

```ts
export async function verifyTurnstile(token: string): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        console.warn("[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification");
        return true;
    }

    // Guard: empty token — traktuj jak brak tokenu
    if (!token.trim()) {
        console.warn("[Turnstile] Empty token received");
        return false;
    }

    // ... reszta bez zmian
}
```

---

### 🟠 5. `sheets.ts` — brak sanityzacji danych przed zapisem do Sheets

**Plik:** `src/lib/sheets.ts`, linie 52–83

**Problem:** Dane trafiają bezpośrednio z formularza do Sheets bez zabezpieczenia przed **CSV/formula injection**. Google Sheets interpretuje komórki zaczynające się od `=`, `+`, `-`, `@` jako formuły. Złośliwy użytkownik może wpisać w pole "Imię" wartość `=HYPERLINK("http://evil.com","click me")` i formuła zostanie wykonana po otwarciu arkusza przez Marię.

To jest znany atak **CSV Injection** (OWASP), istotny szczególnie gdy Sheets jest używany jako CRM przez osobę nieobeznną technicznie.

**Poprawka — helper sanityzujący:**

```ts
function sanitizeCell(value: string): string {
    // Blokuj formula injection — prefix niebezpiecznych znaków apostrfem
    if (/^[=+\-@\t\r]/.test(value)) {
        return `'${value}`;
    }
    return value;
}

// Użycie w appendToSheet:
body: JSON.stringify({
    values: [values.map(sanitizeCell)],
}),
```

Apostrof na początku komórki jest ignorowany przez Sheets jako escape character — wymusza interpretację jako tekst.

---

## Drobne sugestie — 🟡 Nit / 🔵 Suggestion

### 🟡 6. `email.ts` — hardcoded fallback email w stałej `OWNER_EMAIL`

**Plik:** `src/lib/email.ts`, linia 9

```ts
const OWNER_EMAIL = process.env.OWNER_EMAIL || "wyjazdyzdziecmi@gmail.com";
```

Prawdziwy email klientki jest zakodowany w source code. Przy zmianie emaila trzeba zmienić kod, nie tylko `.env`. Ponieważ `OWNER_EMAIL` jest w `.env.example` z wypełnioną wartością, fallback jest zbędny — jeśli nie ustawiony, lepiej `console.warn` i skip.

Porównaj z `FROM_EMAIL` — tam fallback `onboarding@resend.dev` ma sens (Resend test address). Tutaj nie ma.

---

### 🟡 7. `sheets.ts` — zakładka "Waitlist" zamiast polskiej nazwy

**Plik:** `src/lib/sheets.ts`, linia 128

```ts
await appendToSheet("Waitlist", [...])
```

Pozostałe zakładki mają polskie nazwy: `"Rezerwacje"`, `"Kontakty"`, `"Newsletter"`. `"Waitlist"` jest niespójna. Klientka pracuje z arkuszem — sugerowana nazwa: `"Lista oczekujących"`.

---

### 🟡 8. `tsconfig.json` — exclude `docs/` może nie działać na Vercel

**Plik:** `tsconfig.json`, linia 33

```json
"exclude": ["node_modules", "docs"]
```

Poprawka z zadania 1.6 jest słuszna. Warto jednak wiedzieć: `exclude` w tsconfig działa dla `tsc` i Next.js build, ale **nie** zapobiega importowaniu plików z `docs/` przez inny kod. Jeśli kiedykolwiek plik z `docs/` zostanie zaimportowany bezpośrednio, zostanie skompilowany niezależnie od `exclude`. To edge case — obecne rozwiązanie jest wystarczające dla opisanego problemu.

---

### 🔵 9. `email.ts` — brakuje eksportu stałej `OWNER_EMAIL` dla email templates

**Plik:** `src/lib/email.ts`

W Fazie 2 szablony email (np. `BookingNotification.tsx`) będą potrzebować adresu Marii do wyświetlenia (np. "Odpowiedź wyślij na: ..."). Obecnie `OWNER_EMAIL` jest prywatną stałą modułu. Warto albo ją wyeksportować, albo dodać helper `getOwnerEmail()`, albo zaimportować z `src/lib/constants.ts` (gdzie jest `CONTACT.email`).

Sprawdź: `src/lib/constants.ts` już zawiera `CONTACT.email = "wyjazdyzdziecmi@gmail.com"`. Rozważ importowanie stamtąd zamiast duplikowania w `email.ts`.

---

### 🔵 10. `package.json` — wersja `eslint-config-next` niezgodna z Next.js

**Plik:** `package.json`, linia 38

```json
"eslint-config-next": "16.1.6"
```

Projekt używa `"next": "^16.2.1"`, ale `eslint-config-next` jest przypięty do `16.1.6`. To preistniejący problem (nie Faza 1), ale warto zaktualizować do `"^16.2.1"` dla spójności. Minor — może powodować ostrzeżenia przy `npm install`.

---

## Ocena zgodności z planem (zadania 1.1–1.6)

| Zadanie | Opis | Status | Uwagi |
|---------|------|--------|-------|
| 1.1 | Instalacja zależności npm | ✅ Zrealizowane | `google-auth-library`, `resend`, `@react-email/components`, `@marsidev/react-turnstile` w `package.json` |
| 1.2 | `.env.example` z 8 zmiennymi | ✅ Zrealizowane | Wszystkie 8 zmiennych obecne, dobra dokumentacja inline |
| 1.3 | `sheets.ts` — Google Sheets helper | ✅ Zrealizowane z uwagami | 4 helpery obecne, arch poprawna — patrz 🔴1 i 🟠5 |
| 1.4 | `turnstile.ts` — weryfikacja tokenu | ✅ Zrealizowane z uwagami | Patrz 🟠4 (empty token) |
| 1.5 | `email.ts` — Resend helper | ✅ Zrealizowane z uwagami | Patrz 🔴2 (singleton + ReactNode) |
| 1.6 | `tsconfig.json` — exclude docs/ | ✅ Zrealizowane | |

---

## Ocena zgodności z CLAUDE.md

- **Graceful error handling**: ✅ Wszystkie helpery logują `console.error` i nie rzucają do callerów
- **Graceful skip w dev**: ✅ Wszystkie 3 helpery sprawdzają brak kluczy
- **TypeScript strict**: ⚠️ Problem z `ReactNode` vs `ReactElement` (🔴2)
- **Naming conventions**: ✅ camelCase, poprawne eksporty
- **console.warn vs console.error**: ✅ warn dla braku kluczy, error dla błędów API
- **Vercel compatibility**: ⚠️ Singleton problem przy cold start (🔴2)
- **Security**: ⚠️ Brak sanityzacji CSV injection (🟠5)

---

## Architecture Considerations

**Google Auth cold start:** `getAuth()` tworzy nową instancję `GoogleAuth` przy każdym wywołaniu `appendToSheet`. Na Vercel serverless każde wywołanie API route może być nową instancją funkcji. To **poprawne zachowanie** — nie ma shared state między invocations. Koszt jest akceptowalny (brak persistent HTTP connection pool, ale `google-auth-library` cachuje tokeny wewnętrznie w ramach jednej instancji).

**`appendToSheet` jest prywatna (`function`, nie `export`):** Dobra decyzja — wymusza używanie typowanych helperów publicznych. Zachowaj ten wzorzec.

**Brak `"use server"` directive:** Poprawnie — `sheets.ts`, `email.ts`, `turnstile.ts` to helpery importowane przez API routes (które są Server Components z natury). `"use server"` jest potrzebne tylko dla Server Actions, nie dla API routes.

---

## Next Steps

Przed przejściem do Fazy 2 (szablony email), zaproponowane kolejności poprawek:

1. **🔴 Fix 1** — `sheets.ts`: dodaj guard na `CLIENT_EMAIL` + `PRIVATE_KEY`
2. **🔴 Fix 2A** — `email.ts`: zamień singleton na lazy init (lub conditional `?? null`)
3. **🔴 Fix 2B** — `email.ts`: zmień `ReactNode` na `ReactElement`
4. **🟠 Fix 4** — `turnstile.ts`: guard empty string
5. **🟠 Fix 5** — `sheets.ts`: dodaj `sanitizeCell()` helper
6. **🟠 Fix 3** — przemyśl strategię błędów przed Fazą 3 (dokumentacja lub zmiana sygnatury)
7. **🟡 Fix 6** — `email.ts`: usuń hardcoded fallback `OWNER_EMAIL`
8. **🟡 Fix 7** — `sheets.ts`: zmień `"Waitlist"` na `"Lista oczekujących"`

Faza 2 (szablony email) może się rozpocząć równolegle po naprawieniu 🔴1 i 🔴2.
