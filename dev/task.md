# Zadania — Landing Page "Wyjazdy z Dziećmi"

**Status:** W trakcie realizacji
**Ostatnia aktualizacja:** 2026-02-26
**Wersja:** 1.1 (po review)

---

## Faza 1: Fundament (setup + layout)

- [ ] 1.1 Inicjalizacja projektu Next.js 15 (`create-next-app` z TypeScript + Tailwind + App Router)
- [ ] 1.2 Instalacja zależności (**`motion`**, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`)
- [ ] 1.3 Utworzenie `.env.example` z listą zmiennych (`NEXT_PUBLIC_GA_ID`, `BOOKING_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, `NEWSLETTER_WEBHOOK_URL`)
- [ ] 1.4 Konfiguracja `globals.css` — `@import "tailwindcss"` + `@theme` (kolory, fonty) + `color-scheme: light`
- [ ] 1.5 Załadowanie fontów Playfair Display + Inter (`next/font/local`, self-hosted)
- [ ] 1.6 Skopiowanie i optymalizacja obrazów do `public/images/` (priorytet: `image_5.png` 1.3MB)
- [ ] 1.7 Utworzenie `lib/constants.ts` (kolory, kontakt, social linki, routes)
- [ ] 1.8 Utworzenie `lib/utils.ts` (helper `cn()`, formatDate, formatCurrency)
- [ ] 1.9 Utworzenie `data/navigation.ts` (pozycje menu)
- [ ] 1.10 Utworzenie `types/` — trip.ts, team.ts, place.ts, forms.ts
- [ ] 1.11 Zbudowanie komponentu `SkipToContent` (link skip-to-content, widoczny na focus)
- [ ] 1.12 Zbudowanie komponentu `Container`
- [ ] 1.13 Zbudowanie komponentu `Header` (sticky, logo + nav)
- [ ] 1.14 Zbudowanie komponentu `MobileMenu` (hamburger, animowany motion, client component)
- [ ] 1.15 Zbudowanie komponentu `Footer` (kontakt, newsletter placeholder, legal linki, link "Ustawienia cookies")
- [ ] 1.16 Zbudowanie root `layout.tsx` (fonty, **`lang="pl"`**, metadata, SkipToContent + Header + Footer wrapper)
- [ ] 1.17 Utworzenie `loading.tsx` (global loading state, Next.js convention)
- [ ] 1.18 Utworzenie `error.tsx` (global error boundary, Next.js convention)
- [ ] 1.19 Weryfikacja: `npm run dev` działa, nawigacja widoczna, fonty + kolory poprawne, `lang="pl"` na `<html>`, skip-to-content działa

---

## Faza 2: Strona główna

- [ ] 2.1 Utworzenie `data/trips.ts` — dane wyjazdu "Matka i Córka" (z `targetAudience`, `faq`, `gallery`) + placeholder "Yoga i Konie"
- [ ] 2.2 Zbudowanie `Button` (warianty: primary, secondary, outline, ghost; rozmiary: sm, md, lg)
- [ ] 2.3 Zbudowanie `SectionWrapper` (spacing, warianty: default/alternate)
- [ ] 2.4 Zbudowanie `SectionHeading` (H2 w Playfair Display z opcjonalnym subtitle)
- [ ] 2.5 Zbudowanie `Badge` (warianty: date, status, location)
- [ ] 2.6 Zbudowanie `Card` (zaokrąglone rogi, cień, obsługa `isPast` → grayscale)
- [ ] 2.7 Zbudowanie `ScrollAnimation` (**Motion** — `motion/react`, fade-in/slide-up, prefers-reduced-motion)
- [ ] 2.8 Zbudowanie `HeroSection` (nazwa marki + tagline + 3 korzyści z ikonami + CTA)
- [ ] 2.9 Zbudowanie `TripCard` (obrazek, tytuł, data, lokalizacja, krótki opis, CTA)
- [ ] 2.10 Zbudowanie `TripCardsSection` (grid kafelków, aktualne + minione w grayscale)
- [ ] 2.11 Zbudowanie `AboutTeaser` (krótki bio Marii + link do /o-nas)
- [ ] 2.12 Zbudowanie `OpinionsTeaser` (placeholder "Dołącz do rodzin..." + CTA)
- [ ] 2.13 Złożenie strony głównej `app/page.tsx` z wszystkich sekcji
- [ ] 2.14 Weryfikacja: strona główna renderuje się poprawnie na mobile + desktop

---

## Faza 3: Podstrona wyjazdu + formularz

- [ ] 3.1 Zbudowanie `TripHero` (full-width image z overlay: tytuł, data, lokalizacja)
- [ ] 3.2 Zbudowanie `TripTargetAudience` ("Dla kogo jest ten wyjazd?" — 3-5 punktów z ikonami)
- [ ] 3.3 Zbudowanie `Accordion` (expandable content, client component)
- [ ] 3.4 Zbudowanie `TripDescription` (opis + "Więcej" w Accordion)
- [ ] 3.5 Zbudowanie `TripProgram` (timeline dzień po dniu z godzinami)
- [ ] 3.6 Zbudowanie `TripPracticalInfo` (ikony: zakwaterowanie, wyżywienie, dojazd)
- [ ] 3.7 Zbudowanie `TripPricing` (tabela cen + informacja o zaliczce)
- [ ] 3.8 Zbudowanie `TripCollaborator` (bio prowadzącego — Ilona)
- [ ] 3.9 Zbudowanie `TripFAQ` (najczęstsze pytania, komponent Accordion)
- [ ] 3.10 Zbudowanie `TripGallery` (1 główne zdjęcie + 2-3 dodatkowe z next/image)
- [ ] 3.11 Zbudowanie komponentów formularza: `Input`, `Textarea`, `Select`, `Checkbox`, `HoneypotField`
- [ ] 3.12 Zbudowanie `BookingForm` (React Hook Form + Zod, pola: imię, email, telefon, wyjazd, **liczba dorosłych**, **liczba dzieci + wiek**, uwagi, zgoda RODO, **zgoda marketingowa**, honeypot)
- [ ] 3.13 Utworzenie `lib/rate-limit.ts` (in-memory sliding window, 5 req / 15 min per IP)
- [ ] 3.14 Utworzenie API route `api/booking/route.ts` (walidacja Zod + honeypot + rate limiting, log, hook na n8n)
- [ ] 3.15 Złożenie `wyjazdy/[slug]/page.tsx` (`generateStaticParams` + `generateMetadata`) — sekcje: Hero → Dla kogo? → Opis → Program → Info → Cennik → Współpraca → FAQ → Galeria → Formularz
- [ ] 3.16 Zbudowanie `wyjazdy/page.tsx` (lista kafelków wyjazdów)
- [ ] 3.17 Weryfikacja: podstrona "Matka i Córka" działa, formularz waliduje i wysyła, honeypot odrzuca boty, rate limiting blokuje spam

---

## Faza 4: Pozostałe podstrony

- [ ] 4.1 Utworzenie `data/team.ts` (bio Marii, Kamili, Ilony)
- [ ] 4.2 Utworzenie `data/places.ts` (Kacze Bagno, Sasek)
- [ ] 4.3 Zbudowanie `PersonBio` (zdjęcie + imię + rola + opis, reusable)
- [ ] 4.4 Zbudowanie `PlaceCard` (zdjęcie + nazwa + opis miejsca)
- [ ] 4.5 Złożenie `/o-nas` (Maria bio → Współpracują z nami → Miejsca)
- [ ] 4.6 Złożenie `/single-parents` (empatyczny przekaz, korzyści, wyjazdy, CTA)
- [ ] 4.7 Zbudowanie `ContactInfo` (email, telefon, FB, Instagram)
- [ ] 4.8 Zbudowanie `ContactForm` (React Hook Form + Zod + honeypot + zgoda RODO, client component)
- [ ] 4.9 Utworzenie API route `api/contact/route.ts` (+ honeypot + rate limiting)
- [ ] 4.10 Złożenie `/kontakt` (ContactInfo + ContactForm)
- [ ] 4.11 Złożenie `/opinie` (placeholder hero + CTA)
- [ ] 4.12 Utworzenie `/regulamin` (placeholder tekst prawny)
- [ ] 4.13 Utworzenie `/polityka-prywatnosci` (placeholder RODO)
- [ ] 4.14 Weryfikacja: wszystkie podstrony nawigowalne, linki działają

---

## Faza 5: Polish, SEO, compliance

- [ ] 5.1 Zbudowanie `NewsletterForm` w stopce (email + RODO + honeypot, client component)
- [ ] 5.2 Utworzenie API route `api/newsletter/route.ts` (+ honeypot + rate limiting)
- [ ] 5.3 Zbudowanie `CookieBanner` — pełna zgodność RODO/ePrivacy 2026:
  - Kategorie zgód: niezbędne (zawsze aktywne), analityczne, marketingowe
  - 3 przyciski o równej wadze: "Zaakceptuj wszystkie" | "Tylko niezbędne" | "Dostosuj"
  - Panel szczegółowy z toggles per kategoria
  - Zmiana decyzji: link "Ustawienia cookies" w Footer
  - localStorage persistence z wersjonowaniem
- [ ] 5.4 Zbudowanie `GoogleAnalytics` (ładuje GA4 dopiero po zgodzie na kategorię "analityczne")
- [ ] 5.5 SEO metadata na każdej stronie (`generateMetadata()` z polskimi tytułami/opisami)
- [ ] 5.6 `StructuredData` — JSON-LD: Organization, Event (per wyjazd), BreadcrumbList
- [ ] 5.7 Utworzenie `sitemap.ts` i `robots.ts`
- [ ] 5.8 Generowanie favikon z logo (ico, 16x16, 32x32, apple-touch-icon)
- [ ] 5.9 Custom 404 (`not-found.tsx`)
- [ ] 5.10 Audit dostępności (alt texty, labels, fokus, kontrast)
- [ ] 5.11 Security headers w `next.config.ts` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, **Content-Security-Policy**)
- [ ] 5.12 Testy responsywne: 320px, 375px, 768px, 1024px, 1440px
- [ ] 5.13 `npm run build` — zero błędów
- [ ] 5.14 Lighthouse audit: Performance >90, Accessibility >95, SEO >95

---

## Podsumowanie

| Faza | Zadania | Status |
|------|---------|--------|
| Faza 1: Fundament | 19 | Oczekuje |
| Faza 2: Strona główna | 14 | Oczekuje |
| Faza 3: Wyjazd + formularz | 17 | Oczekuje |
| Faza 4: Pozostałe podstrony | 14 | Oczekuje |
| Faza 5: SEO + compliance | 14 | Oczekuje |
| **Razem** | **78** | |

---

## Changelog (v1.1 — review)

### Nowe zadania dodane po review:
- 1.3 `.env.example`
- 1.11 `SkipToContent`
- 1.17 `loading.tsx`
- 1.18 `error.tsx`
- 3.2 `TripTargetAudience` ("Dla kogo?")
- 3.9 `TripFAQ`
- 3.10 `TripGallery`
- 3.13 `lib/rate-limit.ts`

### Zadania zmodyfikowane:
- 1.2: `framer-motion` → `motion`
- 1.4: dodano `@import "tailwindcss"` + `color-scheme: light`
- 1.6: dodano priorytet optymalizacji `image_5.png`
- 1.15: dodano link "Ustawienia cookies" w Footer
- 1.16: dodano `lang="pl"`
- 2.1: dodano `targetAudience`, `faq`, `gallery` do danych wyjazdu
- 2.7: Framer Motion → Motion
- 3.11: dodano `HoneypotField`
- 3.12: dodano pola (liczba dorosłych, dzieci + wiek, zgoda marketingowa, honeypot)
- 3.14: dodano honeypot + rate limiting
- 4.8: dodano honeypot + RODO
- 4.9: dodano honeypot + rate limiting
- 5.1: dodano honeypot
- 5.2: dodano honeypot + rate limiting
- 5.3: przebudowano CookieBanner (kategorie, 3 przyciski, zmiana decyzji)
- 5.11: dodano CSP header
