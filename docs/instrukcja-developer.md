# Instrukcja developera — wyjazdyzdziecmi.pl

Przewodnik po projekcie dla nowego developera.

---

## Spis treści

1. [Szybki start](#1-szybki-start)
2. [Architektura projektu](#2-architektura-projektu)
3. [Formularze — jak działają](#3-formularze--jak-działają)
4. [Serwisy zewnętrzne](#4-serwisy-zewnętrzne)
5. [CMS (Keystatic)](#5-cms-keystatic)
6. [Gdzie co znaleźć](#6-gdzie-co-znaleźć)
7. [Konwencje i wzorce](#7-konwencje-i-wzorce)
8. [Deploy](#8-deploy)

---

## 1. Szybki start

```bash
git clone https://github.com/TatianaG-ka/wyjazdy-z-dziecmi.git
cd wyjazdy-z-dziecmi
npm install
cp .env.example .env.local   # wypełnij klucze lub zostaw puste (dev mode)
npm run dev                   # http://localhost:3000
```

**Bez kluczy API** formularze działają normalnie — helpery logują `console.warn` i pomijają zewnętrzne serwisy.

---

## 2. Architektura projektu

| Warstwa | Technologia | Dokumentacja |
|---------|------------|--------------|
| Framework | Next.js 16 (App Router, SSG) | `CLAUDE.md` — Tech Stack |
| Styling | Tailwind CSS v4 | `src/app/globals.css` — `@theme {}` |
| Formularze | React Hook Form + Zod 4 | `src/lib/validations/` |
| Animacje | Motion 12 (`motion/react`) | NIE framer-motion |
| CMS | Keystatic | `keystatic.config.ts`, `docs/instrukcja-cms.md` |
| Emaile | Resend + React Email | `src/lib/email.ts`, `src/emails/` |
| Dane leadów | Google Sheets API | `src/lib/sheets.ts` |
| Antyspam | Cloudflare Turnstile | `src/lib/turnstile.ts` |
| Analytics | GA4 + Microsoft Clarity | `src/lib/analytics.ts` |
| Deploy | Vercel | Auto-deploy z master |

---

## 3. Formularze — jak działają

### Flow (end-to-end)

```
Klient wypełnia formularz (RHF + Zod client-side)
    ↓
fetch POST /api/{booking|contact|newsletter|waitlist}
    ↓
API Route:
  1. CSRF Origin check          → src/lib/constants.ts (ALLOWED_ORIGINS)
  2. Rate limiting (5/15min)     → src/lib/rate-limit.ts
  3. JSON parse
  4. Honeypot check              → fake 200 dla botów
  5. Zod validation              → src/lib/validations/*.ts
  6. Turnstile verification      → src/lib/turnstile.ts
  7. Promise.allSettled:
     ├─ Google Sheets append     → src/lib/sheets.ts
     ├─ Email do właścicielki    → src/lib/email.ts + src/emails/*Notification.tsx
     └─ Email do klienta         → src/lib/email.ts + src/emails/*Confirmation.tsx
  8. Return { success: true }
```

### Pliki formularzy

| Formularz | Komponent | API Route | Zod Schema |
|-----------|-----------|-----------|------------|
| Rezerwacja | `src/components/trips/BookingForm.tsx` | `src/app/api/booking/route.ts` | `src/lib/validations/booking.ts` |
| Kontakt | `src/components/contact/ContactForm.tsx` | `src/app/api/contact/route.ts` | `src/lib/validations/contact.ts` |
| Newsletter | `src/components/shared/NewsletterForm.tsx` | `src/app/api/newsletter/route.ts` | `src/lib/validations/newsletter.ts` |
| Waitlist | `src/components/trips/WaitlistForm.tsx` | `src/app/api/waitlist/route.ts` | `src/lib/validations/waitlist.ts` |

### Turnstile (antyspam) — wzorzec w formularzach

```tsx
// State (nie ref.getResponse() — invisible mode wymaga callback)
const [turnstileToken, setTurnstileToken] = useState<string>();
const turnstileRef = useRef<TurnstileInstance>(null);

// Reset po KAŻDYM submit (success + error)
const resetTurnstile = useCallback(() => {
  setTurnstileToken(undefined);
  turnstileRef.current?.reset();
}, []);

// Widget — renderuj tylko gdy klucz istnieje
{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
  <Turnstile
    ref={turnstileRef}
    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
    options={{ size: "invisible" }}
    onSuccess={setTurnstileToken}
    onError={() => setTurnstileToken(undefined)}
    onExpire={() => setTurnstileToken(undefined)}
  />
)}
```

---

## 4. Serwisy zewnętrzne

Szczegółowa instrukcja konfiguracji krok po kroku:
**`docs/setup-external-services.md`**

### Env variables (8 kluczy)

```
# Google Sheets
GOOGLE_SHEETS_CLIENT_EMAIL=       # Service Account email
GOOGLE_SHEETS_PRIVATE_KEY=        # Klucz prywatny z JSON
GOOGLE_SHEETS_SPREADSHEET_ID=     # ID arkusza z URL

# Resend
RESEND_API_KEY=                   # API key z resend.com
FROM_EMAIL=                       # Nadawca (zweryfikowana domena)
OWNER_EMAIL=                      # Email właścicielki

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # Publiczny (frontend)
TURNSTILE_SECRET_KEY=             # Prywatny (backend)
```

### Graceful degradation
- Brak `GOOGLE_SHEETS_*` → dane nie trafiają do Sheets (console.warn)
- Brak `RESEND_API_KEY` → emaile nie wysyłane (console.warn)
- Brak `TURNSTILE_*` → widget nie renderowany, weryfikacja pomijana
- **Formularze ZAWSZE działają** — niezależnie od konfiguracji serwisów

---

## 5. CMS (Keystatic)

| Element | Plik |
|---------|------|
| Konfiguracja | `keystatic.config.ts` |
| Content | `content/` (YAML + Markdoc) |
| Data layer | `src/data/*.ts` |
| Instrukcja użytkownika | `docs/instrukcja-cms.md` |

---

## 6. Gdzie co znaleźć

### Struktura katalogów

```
src/
├── app/
│   ├── (main)/              Strony (layout + pages)
│   │   ├── page.tsx          Homepage
│   │   ├── kontakt/          /kontakt
│   │   ├── wyjazdy/          /wyjazdy + /wyjazdy/[slug]
│   │   ├── blog/             /blog + /blog/[slug]
│   │   ├── o-nas/            /o-nas
│   │   ├── galeria/          /galeria
│   │   ├── opinie/           /opinie
│   │   └── ...               inne podstrony
│   ├── api/                  API Routes (POST formularzy)
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── newsletter/
│   │   └── waitlist/
│   └── globals.css           Tailwind v4 + @theme {}
├── components/
│   ├── layout/               Header, Footer, Logo, CookieBanner
│   ├── ui/                   Input, Button, Card, SectionHeading...
│   ├── home/                 HeroSection, TripCard, AboutTeaser...
│   ├── trips/                BookingForm, WaitlistForm, TripHero...
│   ├── contact/              ContactForm, ContactInfo
│   ├── about/                PersonBio, PlaceCard
│   └── shared/               NewsletterForm, StarRating, TripCalendar
├── emails/                   React Email templates (7 szablonów)
├── lib/
│   ├── constants.ts          SITE_CONFIG, CONTACT, ROUTES, ALLOWED_ORIGINS
│   ├── sheets.ts             Google Sheets helper
│   ├── email.ts              Resend helper
│   ├── turnstile.ts          Cloudflare Turnstile helper
│   ├── rate-limit.ts         In-memory rate limiter
│   ├── analytics.ts          GA4 event tracking
│   ├── validations/          Zod schemas (booking, contact, newsletter, waitlist)
│   └── ...                   utils, logger, structured-data
├── data/                     Keystatic data readers
├── types/                    TypeScript types
└── hooks/                    Custom React hooks
```

### Kluczowe dokumenty

| Dokument | Co zawiera |
|----------|-----------|
| `CLAUDE.md` | Architektura, tech stack, lessons learned (dla AI/developera) |
| `docs/setup-external-services.md` | Konfiguracja Google Sheets, Resend, Turnstile |
| `docs/instrukcja-cms.md` | Instrukcja CMS dla właścicielki |
| `docs/instrukcja-zarzadzanie.md` | Instrukcja zarządzania stroną dla właścicielki |
| `docs/PRD_Wyjazdy_z_Dziecmi.md` | Product Requirements Document |
| `.env.example` | Template zmiennych środowiskowych |
| `dev/active/form-delivery-system/` | Plan, kontekst, zadania, review (formularze) |

---

## 7. Konwencje i wzorce

### Musisz wiedzieć
- **Motion** (nie Framer Motion) — `import { motion } from 'motion/react'`
- **Tailwind v4** — `@import "tailwindcss"` + `@theme {}`
- **`cn()`** zawsze zamiast template literals
- **Polskie znaki UTF-8** literalne w .tsx i .ts
- **`parseLocalDate()`** zamiast `new Date(dateStr)` dla YYYY-MM-DD
- **`rounded-none`** wszędzie (prostokątny design system)
- **"warsztaty"** w UI copy (nie "wyjazdy")

### Formularze — wzorzec
- 4-state machine: `idle | submitting | success | error`
- RHF + Zod + fetch (nie Server Actions)
- Honeypot + rate limit + Turnstile + CSRF Origin
- `Promise.allSettled` dla Sheets + email (graceful degradation)

### Pełna lista konwencji
Patrz: `CLAUDE.md` — sekcje "Critical Constraints" + "Lessons Learned"

---

## 8. Deploy

```bash
npm run build    # Musi przejść bez błędów
npm run lint     # Sprawdź nowe błędy
git push         # Vercel auto-deploy z master
```

### Vercel
- Auto-deploy z brancha `master`
- Preview deploy z feature branches
- Environment Variables: Settings → Environment Variables
- Logi: Deployments → kliknij deploy → Functions tab
