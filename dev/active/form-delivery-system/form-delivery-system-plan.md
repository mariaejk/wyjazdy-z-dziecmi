# Plan: System dostarczania danych z formularzy

**Branch:** `feature/form-delivery-system`
**Ostatnia aktualizacja:** 2026-03-24

---

## Podsumowanie wykonawcze

Wdrożenie systemu dostarczania danych z 4 formularzy (booking, contact, newsletter, waitlist) do Google Sheets + emaile przez Resend + antyspam Cloudflare Turnstile. Zachowujemy istniejące API routes z CSRF/rate limit/honeypot. Nie migrujemy na Server Actions.

**Problem:** Dane z formularzy nie trafiają nigdzie w produkcji — `log()` jest no-op, webhook zakomentowany.

**Rozwiązanie:** Google Sheets (baza leadów) + Resend (email notification + confirmation) + Turnstile (antyspam).

---

## Faza 1: Infrastruktura — zależności + helpery (backend)

### 1.1 Instalacja zależności npm
- `google-auth-library` — JWT auth do Google Sheets API (lekka, NIE `googleapis`)
- `resend` — wysyłka emaili
- `@react-email/components` — szablony emaili jako React components
- `@marsidev/react-turnstile` — widget Cloudflare Turnstile

**Nakład:** S
**Kryterium akceptacji:** `npm install` bez błędów, `npm run build` przechodzi.

### 1.2 Plik `.env.example` z wymaganymi zmiennymi
Env variables (8):
```
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
RESEND_API_KEY=
FROM_EMAIL=
OWNER_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

**Nakład:** S
**Kryterium akceptacji:** `.env.example` w repo, `.env.local` w `.gitignore`.

### 1.3 Helper: `src/lib/sheets.ts` — Google Sheets via raw fetch
- JWT auth via `google-auth-library` (GoogleAuth → getAccessToken)
- Raw `fetch` do `https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{range}:append`
- Funkcje: `appendToSheet(sheet: string, values: string[])`
- 4 publiczne helpery: `appendBooking()`, `appendContact()`, `appendNewsletter()`, `appendWaitlist()`
- Timestamp w formacie polskim (Europe/Warsaw)
- Graceful error handling — nie rzuca, loguje `console.error`

**Nakład:** M
**Zależności:** 1.1
**Kryterium akceptacji:** Helper kompiluje się, typy poprawne.

### 1.4 Helper: `src/lib/turnstile.ts` — weryfikacja tokenu server-side
- `verifyTurnstile(token: string): Promise<boolean>`
- POST do `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- Graceful: zwraca `true` jeśli brak klucza (dev mode bez Turnstile)

**Nakład:** S
**Kryterium akceptacji:** Helper kompiluje się, zwraca boolean.

### 1.5 Helper: `src/lib/email.ts` — wysyłka emaili via Resend
- Singleton `Resend` instance
- Konfiguracja: `FROM_EMAIL`, `OWNER_EMAIL` z env
- Funkcja `sendEmail(options)` z error handling
- Graceful: skip jeśli brak `RESEND_API_KEY` (dev mode)

**Nakład:** S
**Zależności:** 1.1
**Kryterium akceptacji:** Helper kompiluje się, typy poprawne.

---

## Faza 2: Email templates (React Email)

### 2.1 `src/emails/BookingNotification.tsx` — DO MARII
- Szablon: nowa rezerwacja (imię, email, telefon, wyjazd, dorośli, dzieci, wiek dzieci, dieta, uwagi)
- Highlight box z nazwą warsztatu
- replyTo = email klienta
- Timestamp
- Style: czytelny, profesjonalny

**Nakład:** M
**Zależności:** 1.1
**Kryterium akceptacji:** Kompiluje się, renderuje poprawny HTML.

### 2.2 `src/emails/BookingConfirmation.tsx` — DO KLIENTA
- Potwierdzenie rezerwacji: nazwa warsztatu, liczba osób
- "Co dalej?" — kontakt w 48h, informacje o płatności
- Telefon Marii: +48 503 098 906
- Link do strony: wyjazdyzdziecmi.pl
- Klauzula RODO w stopce
- Branding: "Wyjazdy z Dziećmi"

**Nakład:** M
**Zależności:** 1.1
**Kryterium akceptacji:** Kompiluje się, zawiera wymagane elementy.

### 2.3 `src/emails/ContactNotification.tsx` — DO MARII
- Nowe zapytanie: imię, email, treść wiadomości
- replyTo = email klienta
- Timestamp

**Nakład:** S
**Zależności:** 1.1

### 2.4 `src/emails/ContactConfirmation.tsx` — DO KLIENTA
- "Dziękujemy za wiadomość, odpowiemy w ciągu 24h"
- Telefon Marii, link do strony
- Klauzula RODO w stopce

**Nakład:** S
**Zależności:** 1.1

### 2.5 `src/emails/WaitlistNotification.tsx` — DO MARII
- Nowy wpis na listę oczekujących: imię, email, telefon, wyjazd
- replyTo = email klienta

**Nakład:** S
**Zależności:** 1.1

### 2.6 `src/emails/WaitlistConfirmation.tsx` — DO KLIENTA
- "Zapisaliśmy Cię na listę oczekujących, damy znać gdy zwolni się miejsce"
- Telefon Marii

**Nakład:** S
**Zależności:** 1.1

### 2.7 `src/emails/NewsletterConfirmation.tsx` — DO KLIENTA
- "Dziękujemy za zapis! Poradnik PDF wyślemy wkrótce."
- Prosty, krótki szablon

**Nakład:** S
**Zależności:** 1.1

---

## Faza 3: Modyfikacja API routes

### 3.1 Dodanie `turnstileToken` do Zod schemas
- Dodać opcjonalne pole `turnstileToken: z.string().optional()` do 4 schematów
- Opcjonalne — aby formularze działały bez Turnstile w dev mode

**Nakład:** S
**Kryterium akceptacji:** Schematy kompilują się, istniejące formularze dalej działają.

### 3.2 Modyfikacja `src/app/api/booking/route.ts`
- Po honeypot: weryfikacja Turnstile (jeśli token obecny)
- Po walidacji: `Promise.allSettled([appendBooking(), sendBookingEmails()])`
- `sendBookingEmails()` = notification do Marii + confirmation do klienta
- Zachować: CSRF, rate limit, honeypot, Zod, log()
- Usunąć zakomentowany webhook

**Nakład:** M
**Zależności:** 1.3, 1.4, 1.5, 2.1, 2.2
**Kryterium akceptacji:** Route kompiluje się, zwraca sukces, dane trafiają do Sheets + email.

### 3.3 Modyfikacja `src/app/api/contact/route.ts`
- Analogicznie do 3.2: Turnstile → Sheets + emails

**Nakład:** M
**Zależności:** 1.3, 1.4, 1.5, 2.3, 2.4

### 3.4 Modyfikacja `src/app/api/newsletter/route.ts`
- Turnstile → Sheets (zakładka "Newsletter")
- Email confirmation do klienta (poradnik PDF)
- BEZ notification do Marii (za dużo spamu)
- Opcjonalnie: `resend.contacts.create()` do listy kontaktów Resend

**Nakład:** M
**Zależności:** 1.3, 1.4, 1.5, 2.7

### 3.5 Modyfikacja `src/app/api/waitlist/route.ts`
- Turnstile → Sheets (zakładka "Waitlist") + emails

**Nakład:** M
**Zależności:** 1.3, 1.4, 1.5, 2.5, 2.6

---

## Faza 4: Frontend — Turnstile widget w formularzach

### 4.1 Dodanie Turnstile do BookingForm
- Import `Turnstile` z `@marsidev/react-turnstile`
- Invisible widget (size: "invisible")
- Ref do resetu po submit
- Dodanie `turnstileToken` do body POST

**Nakład:** S
**Zależności:** 1.1, 3.1
**Kryterium akceptacji:** Widget renderuje się, token wysyłany z formularzem.

### 4.2 Dodanie Turnstile do ContactForm
**Nakład:** S — analogicznie do 4.1

### 4.3 Dodanie Turnstile do NewsletterForm
**Nakład:** S — analogicznie do 4.1

### 4.4 Dodanie Turnstile do WaitlistForm
**Nakład:** S — analogicznie do 4.1

---

## Faza 5: Dokumentacja + konfiguracja

### 5.1 Instrukcja konfiguracji serwisów zewnętrznych
- `docs/setup-external-services.md`
- Google Cloud Console: projekt, Sheets API, Service Account, klucz JSON, udostępnienie arkusza
- Resend: konto, API key, weryfikacja domeny (DNS records)
- Cloudflare Turnstile: Site Key + Secret Key
- Google Sheets: struktura arkusza (4 zakładki z nagłówkami)

**Nakład:** M

### 5.2 Aktualizacja CLAUDE.md
- Dodanie nowych zależności do sekcji Tech Stack
- Dodanie env variables do dokumentacji
- Usunięcie "No automatic email confirmation in MVP"
- Dodanie lessons learned

**Nakład:** S

### 5.3 Build + test
- `npm run build` — zero błędów
- `npm run lint` — zero błędów
- Test manualny: submit formularza w dev mode (bez kluczy — graceful skip)

**Nakład:** S
**Kryterium akceptacji:** Build przechodzi, formularze działają w dev (bez zewnętrznych serwisów).

---

## Ocena ryzyka

| Ryzyko | Prawdop. | Wpływ | Mitygacja |
|--------|----------|-------|-----------|
| Google Sheets API niedostępne | Niskie | Średni | `Promise.allSettled` — email nadal dojdzie |
| Resend awaria | Niskie | Wysoki | Dane w Sheets, `console.error` w logach Vercel |
| Turnstile false positive | Średnie | Wysoki | Invisible mode, graceful skip w dev |
| Private key w env | — | Krytyczny | Nigdy w repo, tylko Vercel env vars |
| React Email bundle size | Niskie | Niski | Szablony server-side only, nie wpływają na client bundle |
| `google-auth-library` cold start | Niskie | Niski | ~5MB vs 82MB googleapis |

## Mierniki sukcesu

1. ✅ Submit BookingForm → wiersz w Sheets + 2 emaile (Maria + klient)
2. ✅ Submit ContactForm → wiersz w Sheets + 2 emaile
3. ✅ Submit NewsletterForm → wiersz w Sheets + 1 email (klient)
4. ✅ Submit WaitlistForm → wiersz w Sheets + 2 emaile
5. ✅ Honeypot → fake 200, brak zapisu
6. ✅ Rate limit → 429 po 5 próbach
7. ✅ Turnstile → blokada botów
8. ✅ `npm run build` → zero błędów
9. ✅ Formularze działają w dev bez kluczy (graceful skip)

## Szacunki czasowe

| Faza | Opis | Nakład |
|------|------|--------|
| Faza 1 | Zależności + helpery | M |
| Faza 2 | Email templates (7) | L |
| Faza 3 | Modyfikacja API routes (4) | L |
| Faza 4 | Turnstile w formularzach (4) | M |
| Faza 5 | Dokumentacja + test | M |
| **Razem** | | **XL** |
