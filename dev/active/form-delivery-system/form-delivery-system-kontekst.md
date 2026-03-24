# Kontekst: System dostarczania danych z formularzy

**Branch:** `feature/form-delivery-system`
**Ostatnia aktualizacja:** 2026-03-24

---

## Log zmian

### Faza 1 (2026-03-24)
- Zainstalowano: `google-auth-library`, `resend`, `@react-email/components`, `@marsidev/react-turnstile` (+67 packages)
- Zaktualizowano `.env.example` — dodano 8 zmiennych (Sheets, Resend, Turnstile), usunięto stare webhook URLs
- Utworzono `src/lib/sheets.ts` — GoogleAuth JWT + raw fetch do Sheets API v4, 4 helpery (appendBooking/Contact/Newsletter/Waitlist), graceful error handling
- Utworzono `src/lib/turnstile.ts` — verifyTurnstile(), graceful skip bez klucza
- Utworzono `src/lib/email.ts` — Resend singleton, sendNotificationEmail() + sendConfirmationEmail(), graceful skip bez API key
- Fix: `tsconfig.json` — dodano `docs` do exclude (referencyjny kod w docs/ łapany przez TypeScript compiler)
- Build: PASS (zero errors)

### Faza 2 (2026-03-24)
- Utworzono `src/emails/styles.ts` — shared styles (DRY, importowane jako `* as s`)
- 7 email templates React Email: BookingNotification, BookingConfirmation, ContactNotification, ContactConfirmation, WaitlistNotification, WaitlistConfirmation, NewsletterConfirmation
- Każdy confirmation email zawiera: logo, telefon Marii, klauzulę RODO w stopce (art. 6 ust. 1 lit. b/a)
- Notification emails mają replyTo hint w stopce
- Fix: React Email `<Preview>` i `<Text>` nie akceptują number children — template literals zamiast interpolacji
- Newsletter confirmation: art. 6 ust. 1 lit. a (zgoda), info o możliwości rezygnacji
- Build: PASS (zero errors)

### Faza 3 (2026-03-24)
- Dodano `turnstileToken: z.string().optional()` do 4 Zod schemas
- Zmodyfikowano 4 API routes: booking, contact, newsletter, waitlist
- Każdy route: po honeypot → Turnstile verification → po Zod → Promise.allSettled([Sheets, emails])
- Zachowano: CSRF Origin, rate limit, honeypot, Zod, log()
- Usunięto zakomentowane webhook TODO
- Newsletter: bez notification do Marii (decyzja: za dużo spamu)
- Build: PASS (zero errors)

---

## Powiązane pliki

### Istniejące API routes (MODYFIKUJEMY — dodajemy Sheets + email + Turnstile)
- `src/app/api/booking/route.ts` — POST, CSRF + rate limit + honeypot + Zod
- `src/app/api/contact/route.ts` — POST, ten sam pattern
- `src/app/api/newsletter/route.ts` — POST, ten sam pattern
- `src/app/api/waitlist/route.ts` — POST, ten sam pattern

### Istniejące formularze (MODYFIKUJEMY — dodajemy Turnstile widget)
- `src/components/trips/BookingForm.tsx` — RHF + Zod + fetch + 4-state
- `src/components/contact/ContactForm.tsx` — RHF + Zod + fetch + 4-state
- `src/components/shared/NewsletterForm.tsx` — RHF + Zod + fetch + 4-state
- `src/components/trips/WaitlistForm.tsx` — RHF + Zod + fetch + 4-state

### Istniejące Zod schemas (MODYFIKUJEMY — dodajemy turnstileToken)
- `src/lib/validations/booking.ts` — pola: name, email, phone, trip, adults, children, childrenAges, notes, dietaryNeeds, consentRodo, consentMarketing, website
- `src/lib/validations/contact.ts` — pola: name, email, message, consentRodo, website
- `src/lib/validations/newsletter.ts` — pola: email, consentRodo, website
- `src/lib/validations/waitlist.ts` — pola: name, email, phone, trip, consentRodo, website

### Istniejące helpery (NIE ZMIENIAMY)
- `src/lib/rate-limit.ts` — in-memory Map, 5/15min, MAX_IPS 10k
- `src/lib/logger.ts` — `log()` no-op w production
- `src/lib/analytics.ts` — GA4 tracking
- `src/lib/constants.ts` — SITE_CONFIG, CONTACT, SOCIAL_LINKS, ROUTES

### Istniejące UI components (NIE ZMIENIAMY)
- `src/components/ui/Input.tsx`, `Textarea.tsx`, `Select.tsx`, `Checkbox.tsx`
- `src/components/ui/HoneypotField.tsx`, `Button.tsx`

### NOWE pliki (TWORZYMY)
- `src/lib/sheets.ts` — Google Sheets helper (google-auth-library + fetch)
- `src/lib/turnstile.ts` — Cloudflare Turnstile verification
- `src/lib/email.ts` — Resend email helper
- `src/emails/BookingNotification.tsx` — email do Marii
- `src/emails/BookingConfirmation.tsx` — email do klienta
- `src/emails/ContactNotification.tsx` — email do Marii
- `src/emails/ContactConfirmation.tsx` — email do klienta
- `src/emails/WaitlistNotification.tsx` — email do Marii
- `src/emails/WaitlistConfirmation.tsx` — email do klienta
- `src/emails/NewsletterConfirmation.tsx` — email do klienta
- `.env.example` — template env variables
- `docs/setup-external-services.md` — instrukcja konfiguracji

### Referencyjny kod (KONSULTACJA, nie kopiowanie)
- `docs/poprawki/poprawki_24.03/code_rezerwacja_warsztatu/` — Server Actions pattern
- `docs/poprawki/poprawki_24.03/form_submission_flow_nextjs.svg` — diagram flow

### Analizy (kontekst decyzji)
- `dev/gemini/2026-03-24_ocena-podejscia-formularze-rezerwacja.md`
- `dev/gemini/2026-03-24_proces-formularzy-rezerwacja.md`

---

## Decyzje techniczne

### 1. API Routes (zachowujemy) vs Server Actions (odrzucone)
**Decyzja:** Zachowujemy istniejące API routes.
**Dlaczego:** 4 działające routes z CSRF Origin validation, rate limiting, honeypot — przetestowane, audytowane (24.03). Migracja = ryzyko regresji, zero realnego zysku. Zgodność Claude + Gemini.

### 2. `google-auth-library` + raw fetch (nie `googleapis`)
**Decyzja:** Lekka paczka (~5MB) + direct fetch do Sheets API v4.
**Dlaczego:** `googleapis` = 82MB, cold start na Vercel. Zgodność Claude + Gemini.

### 3. React Email templates (nie raw HTML)
**Decyzja:** Używamy `@react-email/components`.
**Dlaczego:** Gemini rekomenduje jako "złoty standard". 7 szablonów uzasadnia framework. Czytelniejsze niż HTML stringi. Server-side only — zero wpływu na client bundle.

### 4. Turnstile (dodajemy)
**Decyzja:** Invisible Turnstile jako dodatkowa warstwa obok honeypot + rate limit.
**Dlaczego:** Darmowy, zero UX impact (invisible mode), ochrona przed zaawansowanymi botami. Graceful skip w dev.

### 5. Sonner (NIE dodajemy)
**Decyzja:** Zachowujemy inline success/error pattern.
**Dlaczego:** Obecny 4-state machine (idle/submitting/success/error) jest lepszym UX dla formularzy konwersji. Toast znika — inline jest trwały. Zgodność Claude + Gemini.

### 6. Newsletter — Double Opt-In
**Decyzja:** Na razie single opt-in z email confirmation.
**Dlaczego:** Double opt-in wymaga dodatkowej infrastruktury (link potwierdzający, endpoint weryfikacji). Dodamy w przyszłości. Email confirmation spełnia RODO (Art. 6 ust. 1 lit. b).

### 7. Promise.allSettled (graceful degradation)
**Decyzja:** Sheets + email uruchamiane równolegle przez `Promise.allSettled`.
**Dlaczego:** Jeśli jedno zawiedzie, drugie działa. Klient zawsze widzi sukces. Błędy logowane w console.error (logi Vercel). Zachowujemy `log()` dla dev.

### 8. Nazwy pól — zachowujemy istniejące
**Decyzja:** Nasze schemas: `trip` (nie `tripName`), `consentRodo` (nie `consent`), `adults` (nie `numberOfAdults`).
**Dlaczego:** Zmiana nazw = breaking change w formularzach. Referencyjny kod ma inne nazwy, ale nasze są już ustalone.

---

## Zależności zewnętrzne (do skonfigurowania przez użytkownika)

### Google Cloud Console
1. Nowy projekt
2. Włączyć Google Sheets API
3. Utworzyć Service Account + klucz JSON
4. Udostępnić arkusz Service Accountowi (Edytor)

### Google Sheets
Arkusz z 4 zakładkami:
- **Rezerwacje**: Data | Imię | Email | Telefon | Wyjazd | Dorośli | Dzieci | Wiek dzieci | Dieta | Uwagi | Status | Zgoda RODO
- **Kontakty**: Data | Imię | Email | Wiadomość | Status | Zgoda RODO | Źródło
- **Waitlist**: Data | Imię | Email | Telefon | Wyjazd | Status | Zgoda RODO
- **Newsletter**: Data | Email | Status | Zgoda RODO

### Resend
1. Konto na resend.com
2. API Key
3. Weryfikacja domeny wyjazdyzdziecmi.pl (DNS: SPF, DKIM, DMARC)

### Cloudflare Turnstile
1. Konto Cloudflare (darmowe)
2. Turnstile → Add Site → Managed widget
3. Site Key (publiczny) + Secret Key (prywatny)

---

## Dane kontaktowe (do szablonów email)
- Firma: "Wyjazdy z Dziećmi"
- Strona: wyjazdyzdziecmi.pl
- Email: wyjazdyzdziecmi@gmail.com
- Telefon: +48 503 098 906
- Facebook: facebook.com/wyjazdyzdziecmi
- Instagram: instagram.com/wyjazdyzdziecmi
