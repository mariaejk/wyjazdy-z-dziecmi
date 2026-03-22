# Plan: Landing Page "Wyjazdy z Dziećmi"

> **Wersja:** 1.1 (po review) | **Ostatnia aktualizacja:** 2026-02-26

## Context

Maria Kordalewska organizuje rodzinne wyjazdy warsztatowe w naturze. Rezerwacje odbywają się ręcznie (FB, email, wiadomości prywatne). Potrzebna jest profesjonalna strona-lejek sprzedażowy, która zautomatyzuje pozyskiwanie klientów. Treści pierwszego wyjazdu ("Matka i Córka") są gotowe. Domena `www.wyjazdyzdziecmi.pl` kupiona.

---

## Decyzje z wywiadu

| Decyzja | Wybór |
|---------|-------|
| Technologia | Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript, Vercel |
| Treści | 1-2 wyjazdy hardcoded (bez Airtable/n8n na MVP) |
| Formularz | Rozszerzony: imię, email, telefon, wyjazd, liczba dorosłych, liczba dzieci + wiek, uwagi + RODO + zgoda marketingowa |
| Hero | Kompaktowe intro (nazwa + 3 korzyści) → od razu kafelki wyjazdów |
| Nawigacja | Każda pozycja = osobna podstrona, sticky header |
| Animacje | Subtelne scroll animations (fade-in, slide-up), **Motion** (pakiet `motion`, import z `motion/react`) |
| Single Parents | Osobna podstrona, struktura zaprojektowana przez AI |
| Opinie | Placeholder z CTA (brak opinii na start) |
| O nas | Maria (bio + zdjęcie) → "Współpracują z nami" (Kamila, Kacze Bagno, Sasek) |
| Newsletter | W stopce od razu |
| Social media | Facebook + Instagram |
| Zdjęcia | Ogólne z docs/Images/ |
| Ochrona formularzy | Honeypot + rate limiting na API routes |
| Cookie banner | RODO/ePrivacy 2026: kategorie zgód, 3 przyciski o równej wadze, zmiana decyzji w stopce |

---

## Stos technologiczny

- **Next.js 15** (App Router, SSG) — SEO, wydajność, przyszłościowość
- **Tailwind CSS v4** — mobile-first, design tokens w CSS, `@import "tailwindcss"` (nowa dyrektywa)
- **TypeScript** — bezpieczeństwo typów
- **Motion** (`motion/react`) — scroll animations z `prefers-reduced-motion` (kompatybilny z React 19)
- **React Hook Form + Zod** — walidacja formularzy
- **Lucide React** — cienkie liniowe ikony (styl igły kompasu z logo)
- **Vercel** — hosting, CDN, preview deploys
- **next/font/local** — self-hosted Playfair Display + Inter (RODO-friendly)

> **UWAGA:** Pakiet `framer-motion` jest niekompatybilny z React 19 (domyślnym w Next.js 15). Zamiast niego używamy pakietu `motion` z importem `motion/react`. API jest identyczne.

---

## Design System: "Naturalny Minimalizm"

```css
/* globals.css — Tailwind v4 @import + @theme */
@import "tailwindcss";

@theme {
  --color-parchment: #F9F7F2;       /* tło główne */
  --color-parchment-dark: #F5F3EE;  /* tła sekcji alternate */
  --color-moss: #2D4635;            /* CTA, akcenty */
  --color-graphite: #1A1A1A;        /* tekst */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

/* Deklaracje globalne */
color-scheme: light;
```

- Mobile-first, thumb-friendly
- Dużo whitespace
- Ikony liniowe (strokeWidth 1.5)
- Minione wyjazdy: `grayscale(100%)`
- `color-scheme: light` w CSS

---

## Mapa strony (7 podstron + 2 legal)

| Strona | URL | Opis |
|--------|-----|------|
| Strona główna | `/` | Hero intro → kafelki wyjazdów → O nas teaser → Opinie placeholder |
| O nas | `/o-nas` | Maria bio → Współpracują z nami → Miejsca |
| Wyjazdy | `/wyjazdy` | Lista kafelków (aktualne + minione w grayscale) |
| Szczegóły wyjazdu | `/wyjazdy/[slug]` | Hero → "Dla kogo?" → opis → program → cennik → FAQ → galeria → formularz zapisu |
| Single Parents | `/single-parents` | Empatyczny przekaz → korzyści → wyjazdy → CTA |
| Opinie | `/opinie` | Placeholder "Dołącz do rodzin..." + CTA |
| Kontakt | `/kontakt` | Info kontaktowe + formularz |
| Regulamin | `/regulamin` | Tekst prawny |
| Polityka prywatności | `/polityka-prywatnosci` | RODO |

**Menu:** O nas | Wyjazdy | Single Parents | Opinie | Kontakt

---

## Struktura projektu

```
.env.example                   # Lista zmiennych środowiskowych (GA4 ID, webhook URLs)
src/
├── app/
│   ├── layout.tsx              # Root: fonty, metadata, lang="pl", Header, Footer, CookieBanner, SkipToContent, GA4
│   ├── page.tsx                # Strona główna
│   ├── globals.css             # Tailwind v4 @import + @theme + color-scheme: light
│   ├── loading.tsx             # Global loading state (Next.js convention)
│   ├── error.tsx               # Global error boundary (Next.js convention)
│   ├── not-found.tsx           # Custom 404
│   ├── sitemap.ts              # SEO sitemap
│   ├── robots.ts               # SEO robots
│   ├── o-nas/page.tsx
│   ├── wyjazdy/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── single-parents/page.tsx
│   ├── opinie/page.tsx
│   ├── kontakt/page.tsx
│   ├── regulamin/page.tsx
│   ├── polityka-prywatnosci/page.tsx
│   └── api/
│       ├── booking/route.ts    # POST formularz zapisu (+ honeypot + rate limiting)
│       ├── newsletter/route.ts # POST newsletter (+ honeypot + rate limiting)
│       └── contact/route.ts    # POST kontakt (+ honeypot + rate limiting)
├── components/
│   ├── layout/    → Header, MobileMenu, Footer, CookieBanner, SkipToContent
│   ├── ui/        → Button, Card, SectionWrapper, SectionHeading, Input, Textarea, Select, Checkbox, Badge, Accordion, Icon, Container, HoneypotField
│   ├── home/      → HeroSection, TripCardsSection, AboutTeaser, OpinionsTeaser
│   ├── trips/     → TripCard, TripHero, TripDescription, TripTargetAudience, TripProgram, TripPracticalInfo, TripPricing, TripCollaborator, TripFAQ, TripGallery, BookingForm
│   ├── about/     → PersonBio, PlaceCard
│   ├── contact/   → ContactForm, ContactInfo
│   └── shared/    → NewsletterForm, ScrollAnimation, GoogleAnalytics, StructuredData
├── data/          → trips.ts, team.ts, places.ts, navigation.ts
├── types/         → trip.ts, team.ts, place.ts, forms.ts
├── hooks/         → useScrollAnimation.ts, useMediaQuery.ts, useCookieConsent.ts
└── lib/           → utils.ts, metadata.ts, constants.ts, rate-limit.ts
```

**~78 plików łącznie** (wzrost z ~70 po dodaniu nowych komponentów)

---

## Fazy implementacji

### Faza 1: Fundament (setup + layout)
1. `npx create-next-app@latest` z TypeScript + Tailwind + App Router
2. Zainstaluj: **`motion`**, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`
3. Utwórz `.env.example` z listą zmiennych: `NEXT_PUBLIC_GA_ID`, `BOOKING_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, `NEWSLETTER_WEBHOOK_URL`
4. Skonfiguruj `globals.css` z design tokens (`@import "tailwindcss"` + `@theme`) + `color-scheme: light`
5. Załaduj fonty (Playfair Display + Inter) przez `next/font/local`
6. Skopiuj i zoptymalizuj obrazy do `public/images/` (priorytet: `image_5.png` 1.3MB → konwersja/resize)
7. Utwórz `lib/constants.ts`, `lib/utils.ts`, `data/navigation.ts`
8. Zbuduj: `SkipToContent`, `Header`, `MobileMenu`, `Footer`, `Container`
9. Zbuduj root `layout.tsx` z **`lang="pl"`**, SkipToContent, Header, Footer
10. Utwórz `loading.tsx` i `error.tsx` (Next.js App Router conventions)

**Rezultat:** Działający dev server z nawigacją, poprawnymi fontami, kolorami, `lang="pl"`, skip-to-content.

### Faza 2: Strona główna
1. Utwórz `types/trip.ts`, `data/trips.ts` (Matka i Córka + placeholder Yoga i Konie)
2. Zbuduj UI primitives: `Button`, `SectionWrapper`, `SectionHeading`, `Badge`, `Card`
3. Zbuduj `ScrollAnimation` (**Motion** — `motion/react`, intersection observer)
4. Zbuduj: `HeroSection`, `TripCard`, `TripCardsSection`, `AboutTeaser`, `OpinionsTeaser`
5. Złóż stronę główną `app/page.tsx`

**Rezultat:** Pełna strona główna z hero, kafelkami wyjazdów, teaserem "O nas", placeholderem opinii.

### Faza 3: Podstrona wyjazdu + formularz
1. Zbuduj: `TripHero`, `TripTargetAudience` ("Dla kogo jest ten wyjazd?"), `TripDescription`, `Accordion`, `TripProgram`, `TripPracticalInfo`, `TripPricing`, `TripCollaborator`
2. Zbuduj `TripFAQ` (najczęstsze pytania, komponent Accordion)
3. Zbuduj `TripGallery` (1 główne zdjęcie + 2–3 dodatkowe, lightbox opcjonalny)
4. Zbuduj form UI: `Input`, `Textarea`, `Select`, `Checkbox`, `HoneypotField`
5. Zbuduj `BookingForm` (React Hook Form + Zod, client component) — pola: imię, email, telefon, wyjazd, **liczba dorosłych**, **liczba dzieci + wiek**, uwagi, **zgoda RODO**, **zgoda marketingowa (oddzielna, opcjonalna)**, honeypot
6. Utwórz `lib/rate-limit.ts` (in-memory rate limiting, np. sliding window per IP)
7. Utwórz API route `api/booking/route.ts` (walidacja Zod + honeypot check + rate limiting, log, hook na n8n)
8. Złóż `wyjazdy/[slug]/page.tsx` z `generateStaticParams()` + `generateMetadata()` — kolejność sekcji: Hero → Dla kogo? → Opis → Program → Info praktyczne → Cennik → Współpraca → FAQ → Galeria → Formularz
9. Zbuduj `wyjazdy/page.tsx` (lista kafelków)

**Rezultat:** Działająca podstrona "Matka i Córka" z pełnym programem, cennikiem, FAQ, galerią i formularzem zapisu.

### Faza 4: Pozostałe podstrony
1. Utwórz `data/team.ts`, `data/places.ts`
2. Zbuduj: `PersonBio`, `PlaceCard`
3. Złóż `/o-nas` (Maria → Kamila → Kacze Bagno → Sasek)
4. Złóż `/single-parents` (AI-generated content, empatyczny przekaz, korzyści, CTA)
5. Zbuduj `ContactInfo`, `ContactForm` (+ honeypot + zgoda RODO) + API route (+ rate limiting)
6. Złóż `/kontakt`, `/opinie`
7. Utwórz `/regulamin`, `/polityka-prywatnosci` (placeholder)

**Rezultat:** Wszystkie 7+ podstron gotowe i nawigowalne.

### Faza 5: Polish, SEO, compliance
1. `NewsletterForm` w stopce (+ honeypot) + API route (+ rate limiting)
2. `CookieBanner` z pełną zgodnością RODO/ePrivacy 2026:
   - Kategorie zgód: **niezbędne** (zawsze aktywne), **analityczne**, **marketingowe**
   - 3 przyciski o równej wadze wizualnej: "Zaakceptuj wszystkie" | "Tylko niezbędne" | "Dostosuj"
   - Panel szczegółowy z toggles per kategoria
   - Możliwość zmiany decyzji: link "Ustawienia cookies" w stopce
   - Persistence w localStorage z wersjonowaniem
3. `GoogleAnalytics` (ładuje się dopiero po zgodzie na kategorię "analityczne")
4. SEO metadata na każdej stronie (`generateMetadata()`)
5. Structured Data JSON-LD (Organization, Event, BreadcrumbList)
6. `sitemap.ts`, `robots.ts`
7. Favikony z logo
8. Audit dostępności (alt texty, labels, fokus, kontrast)
9. Security headers w `next.config.ts` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, **Content-Security-Policy**)
10. Testy responsywne: 320px, 375px, 768px, 1024px, 1440px

**Rezultat:** Strona gotowa do produkcji.

---

## Formularze — strategia MVP

Wszystkie 3 formularze: **React Hook Form + Zod** (client) → **fetch POST** → **Next.js API Route** (server-side re-walidacja Zod + honeypot + rate limiting) → **log + JSON response**.

Każdy API route zawiera zakomentowany `WEBHOOK_URL` dla przyszłej integracji z n8n.

### Ochrona przed spamem (wszystkie formularze)
- **Honeypot field:** ukryte pole `website` (CSS `display: none`), odrzucenie jeśli wypełnione
- **Rate limiting:** in-memory sliding window, 5 requestów / 15 min per IP
- Walidacja Zod po stronie klienta I serwera

### Formularz zapisu (BookingForm)
```
Pola:
  - imię (text, wymagane)
  - email (wymagane)
  - telefon (wymagane)
  - wyjazd (dropdown, wymagane)
  - liczba dorosłych (number, min 1, wymagane)
  - liczba dzieci + wiek dzieci (number + text, wymagane)
  - uwagi (textarea, opcjonalne)
  - zgoda RODO (checkbox, wymagane)
  - zgoda marketingowa (checkbox, opcjonalne — "Chcę otrzymywać informacje o przyszłych wyjazdach")
  - [honeypot: website, hidden]

Microcopy: "Twoje zgłoszenie zostanie przesłane do organizatora. Skontaktujemy się z Tobą w ciągu 24h."
Stany: idle → submitting → success / error
```

> **UWAGA:** Usunięto microcopy "otrzymasz potwierdzenie na e-mail" — w MVP email potwierdzenia nie jest wysyłany automatycznie.

### Newsletter (w stopce)
```
Pola: email, zgoda RODO, [honeypot: website, hidden]
```

### Kontakt
```
Pola: imię, email, wiadomość, zgoda RODO, [honeypot: website, hidden]
```

---

## Podstrona wyjazdu — pełna struktura (wg PRD sekcja 6.3)

Kolejność sekcji na `/wyjazdy/[slug]`:

1. **TripHero** — full-width image z overlay: tytuł, data, lokalizacja
2. **TripTargetAudience** — "Dla kogo jest ten wyjazd?" (3–5 punktów z ikonami)
3. **TripDescription** — opis wyjazdu z "Więcej" w Accordion
4. **TripProgram** — timeline dzień po dniu z godzinami
5. **TripPracticalInfo** — ikony: zakwaterowanie, wyżywienie, dojazd
6. **TripPricing** — tabela cen + informacja o zaliczce
7. **TripCollaborator** — bio prowadzącego (Ilona)
8. **TripFAQ** — najczęstsze pytania (Accordion)
9. **TripGallery** — 1 główne zdjęcie + 2–3 dodatkowe
10. **BookingForm** — formularz zapisu

### Dane FAQ (do `data/trips.ts`)
```typescript
faq: [
  { question: "Czy mogę przyjechać z dzieckiem młodszym niż 5 lat?", answer: "..." },
  { question: "Jak dojechać do Kaczego Bagna?", answer: "..." },
  { question: "Czy wyżywienie jest wliczone w cenę?", answer: "Tak, pełne wyżywienie..." },
  { question: "Czy mogę wpłacić zaliczkę przelewem?", answer: "Tak, zaliczka 450 zł..." },
  { question: "Co zabrać ze sobą?", answer: "..." },
]
```

### Dane "Dla kogo?" (do `data/trips.ts`)
```typescript
targetAudience: [
  "Mamy, które chcą świadomie budować relację z córką",
  "Córki 5+, które lubią ruch, taniec i tworzenie",
  "Kobiety szukające wytchnienia od codziennego pośpiechu",
  "Pary mama-córka, które chcą się poznać na nowo",
]
```

---

## Obrazy — strategia

| Plik źródłowy | Użycie | Optymalizacja |
|---------------|--------|---------------|
| `logo.jpeg` | Header, OG image | Użyj jako JPG w header (via next/image), JPG 1200x630 (OG). SVG tylko jeśli klient dostarczy wektorowy plik |
| `image_1.jpg` | Hero / tło sekcji | Resize 1920px, priority (LCP) |
| `image_2.jpg` | Galeria / dekoracja | Resize 800px, lazy |
| `image_3.jpg` | Kacze Bagno / O nas | Resize 1200px, lazy |
| `image_4.jpg` | Karta wyjazdu "Matka i Córka" | 1200px (hero) + 600px (karta) |
| `image_5.png` | Karta wyjazdu "Yoga i Konie" | **PRIORYTET:** 1.3MB → konwersja na WebP + resize 1200px max |

Wszystkie przez `next/image` z `sizes` prop. Hero images: `priority`. Reszta: lazy loading.

> **UWAGA:** Konwersja logo JPEG → SVG jest nietrywialna (wymaga trace lub dostarczenia wektorowego pliku przez klienta). Na MVP używamy logo jako raster (JPG) z `next/image`.

---

## Pliki źródłowe (treści)

- `docs/tresc_na_strone.md` — pełne treści: hero, O nas (Maria, Kamila, Kacze Bagno, Sasek), wyjazd "Matka i Córka" (opis, program, cennik, bio Ilony)
- `docs/PRD_Wyjazdy_z_Dziecmi.md` — wymagania, persony, KPI, architektura informacji
- `docs/UI_przyklad.md` — wytyczne designu
- `docs/Images/` — logo + 5 zdjęć

---

## Changelog (review v1.1)

Zmiany wprowadzone na podstawie review planu:

### Krytyczne (3)
1. **Framer Motion → Motion** — zamieniono `framer-motion` na pakiet `motion` (import: `motion/react`), kompatybilny z React 19
2. **Ochrona formularzy** — dodano honeypot field + rate limiting na wszystkie 3 API routes
3. **Cookie banner RODO/ePrivacy 2026** — kategorie zgód (niezbędne/analityczne/marketingowe), 3 przyciski o równej wadze, zmiana decyzji w stopce

### Ważne (7)
1. **Pola formularza** — dodano "liczba dorosłych" i "liczba dzieci + wiek" do BookingForm
2. **FAQ** — dodano sekcję `TripFAQ` na podstronie wyjazdu (PRD 6.3.7)
3. **Galeria** — dodano sekcję `TripGallery` na podstronie wyjazdu (PRD 6.3.8)
4. **"Dla kogo?"** — dodano sekcję `TripTargetAudience` na podstronie wyjazdu (PRD 6.3.2)
5. **`.env.example`** — dodano do Fazy 1
6. **`lang="pl"`** — przeniesiono do Fazy 1 (layout.tsx), nie czekamy do Fazy 5
7. **`loading.tsx` / `error.tsx`** — dodano do Fazy 1 (Next.js App Router conventions)

### Mniejsze poprawki
- `@import "tailwindcss"` zamiast starych dyrektyw `@tailwind`
- Poprawiono microcopy formularza (usunięto wzmiankę o automatycznym emailu)
- Logo JPEG: używamy jako raster na MVP (konwersja SVG nietrywialna)
- `image_5.png` 1.3MB: oznaczono jako priorytet optymalizacji
- Dodano `color-scheme: light` do globals.css
- Dodano CSP header do security headers (Faza 5)
- Dodano `SkipToContent` od Fazy 1
- Dodano oddzielną zgodę marketingową do BookingForm (PRD 8.1)

---

## Weryfikacja (po zakończeniu)

1. **Dev server:** `npm run dev` — wszystkie strony renderują się poprawnie
2. **Formularze:** wypełnij i wyślij każdy formularz — sprawdź success/error state + logi w konsoli
3. **Honeypot:** wypełnij ukryte pole — formularz powinien cicho "udać" wysłanie (bez zapisu)
4. **Rate limiting:** wyślij 6+ requestów — 6. powinien zwrócić 429
5. **Responsywność:** testuj na 320px, 375px, 768px, 1024px, 1440px (DevTools)
6. **Lighthouse:** Performance >90, Accessibility >95, SEO >95, Best Practices >90
7. **Nawigacja:** każdy link w menu prowadzi do poprawnej strony
8. **Animacje:** scroll animations działają, `prefers-reduced-motion` je wyłącza
9. **Cookie banner:** pojawia się z 3 przyciskami, kategorie działają, GA4 ładuje po zgodzie analitycznej, zmiana decyzji w stopce działa
10. **Obrazy:** `next/image` serwuje WebP/AVIF, hero ma `priority`, reszta lazy
11. **SEO:** sprawdź `/sitemap.xml`, `/robots.txt`, OG tagi, `lang="pl"` na `<html>`
12. **Skip-to-content:** link widoczny po Tab, przenosi fokus na `<main>`
13. **Build:** `npm run build` przechodzi bez błędów
