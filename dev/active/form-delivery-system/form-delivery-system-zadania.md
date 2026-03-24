# Zadania: System dostarczania danych z formularzy

**Branch:** `feature/form-delivery-system`
**Ostatnia aktualizacja:** 2026-03-24

---

## Faza 1: Infrastruktura — zależności + helpery

- [x] 1.1 `npm install google-auth-library resend @react-email/components @marsidev/react-turnstile` ✅
- [x] 1.2 Zaktualizować `.env.example` z 8 zmiennymi (Sheets, Resend, Turnstile) ✅
- [x] 1.3 Utworzyć `src/lib/sheets.ts` — Google Sheets helper (GoogleAuth + raw fetch) ✅
- [x] 1.4 Utworzyć `src/lib/turnstile.ts` — weryfikacja tokenu Cloudflare ✅
- [x] 1.5 Utworzyć `src/lib/email.ts` — Resend helper (sendNotificationEmail + sendConfirmationEmail) ✅
- [x] 1.6 Fix: tsconfig.json exclude `docs/` (referencyjny kod łapany przez TS) ✅

## Do poprawy po review fazy 1

- [x] 🔴 **sheets.ts:17-20** — dodać guard na CLIENT_EMAIL + PRIVATE_KEY ✅
- [x] 🔴 **email.ts:4** — lazy init Resend via getResendClient() ✅
- [x] 🔴 **email.ts:1** — ReactElement zamiast ReactNode ✅
- [x] 🟠 **turnstile.ts:4** — guard empty string token ✅
- [x] 🟠 **sheets.ts** — sanitizeCell() przeciw CSV/formula injection ✅
- [x] 🟠 **email.ts:9** — OWNER_EMAIL fallback z CONTACT.email (constants.ts) ✅
- [x] 🟡 **sheets.ts:128** — "Lista oczekujących" zamiast "Waitlist" ✅

## Faza 2: Email templates (React Email)

- [x] 2.0 `src/emails/styles.ts` — shared styles (DRY) ✅
- [x] 2.1 `src/emails/BookingNotification.tsx` — do Marii (dane rezerwacji) ✅
- [x] 2.2 `src/emails/BookingConfirmation.tsx` — do klienta (potwierdzenie rezerwacji) ✅
- [x] 2.3 `src/emails/ContactNotification.tsx` — do Marii (nowe zapytanie) ✅
- [x] 2.4 `src/emails/ContactConfirmation.tsx` — do klienta (potwierdzenie kontaktu) ✅
- [x] 2.5 `src/emails/WaitlistNotification.tsx` — do Marii (lista oczekujących) ✅
- [x] 2.6 `src/emails/WaitlistConfirmation.tsx` — do klienta (potwierdzenie waitlist) ✅
- [x] 2.7 `src/emails/NewsletterConfirmation.tsx` — do klienta (potwierdzenie zapisu) ✅

## Do poprawy po review fazy 2

- [x] 🔴 **Confirmation emails** — dodany klikalny `<Link>` do wyjazdyzdziecmi.pl ✅
- [x] 🟠 **3 templates** — import CONTACT.phone + SITE_CONFIG.url + SITE_CONFIG.name ✅
- [x] 🟠 **WaitlistConfirmation** — pełna klauzula RODO z celem przetwarzania ✅
- [x] 🟡 **Html** — `lang="pl"` we wszystkich 7 templates ✅
- [x] 🟡 **NewsletterConfirmation** — link do strony + info o rezygnacji w stopce ✅

## Faza 3: Modyfikacja API routes

- [x] 3.1 Dodać `turnstileToken` (opcjonalne) do 4 Zod schemas ✅
- [x] 3.2 Modyfikacja `api/booking/route.ts` — Turnstile + Sheets + emails ✅
- [x] 3.3 Modyfikacja `api/contact/route.ts` — Turnstile + Sheets + emails ✅
- [x] 3.4 Modyfikacja `api/newsletter/route.ts` — Turnstile + Sheets + email (bez notyfikacji do Marii) ✅
- [x] 3.5 Modyfikacja `api/waitlist/route.ts` — Turnstile + Sheets + emails ✅

## Do poprawy po review fazy 3

- [x] 🔴 **Zod schemas** — `turnstileToken: z.string().min(1).optional()` ✅
- [x] 🟠 **booking schema** — pola już akceptują "" (defaultValues pattern z CLAUDE.md) — OK ✅
- [x] 🟡 **booking route** — usunięto `dietaryNeeds` z `log()` (RODO art. 9) ✅
- [x] 🟡 **ALLOWED_ORIGINS** — wyekstrahowane do `constants.ts`, zaimportowane w 4 routes ✅

## Faza 4: Frontend — Turnstile widget

- [x] 4.1 Dodać Turnstile do `BookingForm.tsx` ✅
- [x] 4.2 Dodać Turnstile do `ContactForm.tsx` ✅
- [x] 4.3 Dodać Turnstile do `NewsletterForm.tsx` ✅
- [x] 4.4 Dodać Turnstile do `WaitlistForm.tsx` ✅

## Do poprawy po review fazy 4

- [x] 🔴 **BF-1** — onSuccess callback + useState zamiast getResponse() ✅
- [x] 🔴 **BF-2** — resetTurnstile() we wszystkich ścieżkach (429, !ok, catch, success) ✅
- [x] 🟠 **BI-1** — pominięte (invisible mode auto-executes, submit nie musi czekać) ✅
- [x] 🟠 **BI-2** — onError + onExpire → setTurnstileToken(undefined) ✅
- [x] 🔵 **BS-2** — API routes: reject gdy TURNSTILE_SECRET_KEY set ale brak tokenu ✅

## Faza 5: Dokumentacja + finalizacja

- [ ] 5.1 Instrukcja konfiguracji serwisów: `docs/setup-external-services.md`
- [ ] 5.2 Aktualizacja CLAUDE.md
- [ ] 5.3 `npm run build` — zero błędów
- [ ] 5.4 `npm run lint` — zero błędów
