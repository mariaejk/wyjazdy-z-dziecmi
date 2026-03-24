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

## Faza 2: Email templates (React Email)

- [ ] 2.1 `src/emails/BookingNotification.tsx` — do Marii (dane rezerwacji)
- [ ] 2.2 `src/emails/BookingConfirmation.tsx` — do klienta (potwierdzenie rezerwacji)
- [ ] 2.3 `src/emails/ContactNotification.tsx` — do Marii (nowe zapytanie)
- [ ] 2.4 `src/emails/ContactConfirmation.tsx` — do klienta (potwierdzenie kontaktu)
- [ ] 2.5 `src/emails/WaitlistNotification.tsx` — do Marii (lista oczekujących)
- [ ] 2.6 `src/emails/WaitlistConfirmation.tsx` — do klienta (potwierdzenie waitlist)
- [ ] 2.7 `src/emails/NewsletterConfirmation.tsx` — do klienta (potwierdzenie zapisu)

## Faza 3: Modyfikacja API routes

- [ ] 3.1 Dodać `turnstileToken` (opcjonalne) do 4 Zod schemas
- [ ] 3.2 Modyfikacja `api/booking/route.ts` — Turnstile + Sheets + emails
- [ ] 3.3 Modyfikacja `api/contact/route.ts` — Turnstile + Sheets + emails
- [ ] 3.4 Modyfikacja `api/newsletter/route.ts` — Turnstile + Sheets + email
- [ ] 3.5 Modyfikacja `api/waitlist/route.ts` — Turnstile + Sheets + emails

## Faza 4: Frontend — Turnstile widget

- [ ] 4.1 Dodać Turnstile do `BookingForm.tsx`
- [ ] 4.2 Dodać Turnstile do `ContactForm.tsx`
- [ ] 4.3 Dodać Turnstile do `NewsletterForm.tsx`
- [ ] 4.4 Dodać Turnstile do `WaitlistForm.tsx`

## Faza 5: Dokumentacja + finalizacja

- [ ] 5.1 Instrukcja konfiguracji serwisów: `docs/setup-external-services.md`
- [ ] 5.2 Aktualizacja CLAUDE.md
- [ ] 5.3 `npm run build` — zero błędów
- [ ] 5.4 `npm run lint` — zero błędów
