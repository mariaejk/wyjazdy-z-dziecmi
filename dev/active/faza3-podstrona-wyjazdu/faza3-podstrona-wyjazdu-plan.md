# Faza 3: Podstrona wyjazdu + formularz zapisu

> **Branch:** `feature/faza3-podstrona-wyjazdu`
> **Ostatnia aktualizacja:** 2026-02-26

---

## Podsumowanie wykonawcze

Faza 3 buduje kluczowy element lejka sprzedażowego: podstronę szczegółów wyjazdu (`/wyjazdy/[slug]`) z pełnym programem, cennikiem, FAQ, galerią i formularzem zapisu. Dodatkowo powstaje strona listy wyjazdów (`/wyjazdy`). To najważniejsza faza z perspektywy konwersji — formularz zapisu to główne CTA całej strony.

## Analiza obecnego stanu

### Co mamy (po Fazie 2):
- **Typy:** `Trip`, `TripScheduleDay`, `TripPricing`, `TripFAQ`, `TripGalleryImage`, `TripCollaborator`, `TripTargetAudience` — kompletne w `src/types/trip.ts`
- **Dane:** `src/data/trips.ts` — pełne dane "Matka i Córka" (schedule, pricing, FAQ, gallery, collaborator, targetAudience), placeholder "Yoga i Konie"
- **Typy formularzy:** `BookingFormData`, `ContactFormData`, `NewsletterFormData` w `src/types/forms.ts`
- **Komponenty UI:** Button (discriminated union), Card, Badge, SectionWrapper, SectionHeading, ScrollAnimation, Container
- **Layout:** Header, MobileMenu, Footer, SkipToContent — w pełni działające
- **Helpery:** `getTripBySlug()`, `getAllTrips()`, `getUpcomingTrips()`, `getPastTrips()`, `formatDate()`, `formatCurrency()`, `cn()`
- **Obrazy:** `hero.jpg`, `matka-corka.jpg`, `yoga-konie.jpg`, `kacze-bagno.jpg`, `galeria-1.jpg`, `logo.jpeg`

### Czego brakuje:
- Brak `src/app/wyjazdy/` — żadna strona wyjazdów
- Brak `src/components/trips/` — żaden komponent podstrony wyjazdu
- Brak form UI primitives (`Input`, `Textarea`, `Select`, `Checkbox`, `HoneypotField`)
- Brak `Accordion` (potrzebny do TripFAQ i TripDescription)
- Brak `lib/rate-limit.ts`
- Brak API routes (`api/booking/`)

## Stan docelowy

Działająca podstrona `/wyjazdy/matka-i-corka` z 10 sekcjami (wg PRD 6.3), formularzem zapisu z walidacją Zod, ochroną honeypot + rate limiting, oraz strona listy `/wyjazdy`.

---

## Fazy wdrożenia

### Etap 3A: Komponenty sekcji wyjazdu (7 komponentów)

Budowa komponentów wyświetlających dane wyjazdu. Wszystkie jako Server Components (oprócz tych z interakcją).

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3A.1 | **TripHero** — full-width image z overlay (tytuł, data, lokalizacja, badge) | M | Badge, formatDate |
| 3A.2 | **TripTargetAudience** — "Dla kogo jest ten wyjazd?" z ikonami Lucide | S | SectionWrapper, SectionHeading, ScrollAnimation |
| 3A.3 | **TripDescription** — shortDescription + longDescription z expand/collapse | M | SectionWrapper, potrzebuje Accordion |
| 3A.4 | **Accordion** — reużywalny UI komponent z animacją open/close | M | `"use client"`, motion/react, ChevronDown |
| 3A.5 | **TripProgram** — timeline dzień po dniu, godziny + aktywności | M | SectionWrapper, SectionHeading, ScrollAnimation |
| 3A.6 | **TripPracticalInfo** — ikony (zakwaterowanie, wyżywienie, dojazd) | S | SectionWrapper, SectionHeading, Lucide icons |
| 3A.7 | **TripPricing** — tabela cen + info o zaliczce | M | SectionWrapper, SectionHeading, formatCurrency |

### Etap 3B: Accordion, Collaborator, FAQ, Gallery (4 komponenty)

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3B.1 | **TripCollaborator** — bio prowadzącego z opcjonalnym zdjęciem | S | SectionWrapper, ScrollAnimation |
| 3B.2 | **TripFAQ** — lista pytań w Accordion | M | SectionWrapper, SectionHeading, Accordion |
| 3B.3 | **TripGallery** — siatka zdjęć (1 główne + dodatkowe), next/image | M | SectionWrapper, SectionHeading |
| 3B.4 | Obsługa "Yoga i Konie" placeholder — brak schedule/pricing/FAQ → graceful fallback | S | Warunki w [slug]/page.tsx |

### Etap 3C: Form UI primitives (5 komponentów)

Reużywalne komponenty formularzy, kompatybilne z React Hook Form.

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3C.1 | **Input** — text/email/tel/number, label, error, `forwardRef` | M | cn(), "use client" (jeśli z RHF register) |
| 3C.2 | **Textarea** — label, error, resize control | S | cn() |
| 3C.3 | **Select** — dropdown, label, error, opcje | M | cn() |
| 3C.4 | **Checkbox** — z label, error, link w label (RODO) | S | cn() |
| 3C.5 | **HoneypotField** — ukryte pole `website`, CSS `sr-only`/`hidden`, aria-hidden | S | — |

### Etap 3D: BookingForm + API route

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3D.1 | **Zod schema** — `bookingFormSchema` z walidacją (Zod 4.3 syntax) | M | zod |
| 3D.2 | **BookingForm** — `"use client"`, RHF + Zod resolver, wszystkie pola, stany idle/submitting/success/error | XL | Input, Textarea, Select, Checkbox, HoneypotField, react-hook-form, @hookform/resolvers |
| 3D.3 | **lib/rate-limit.ts** — in-memory sliding window (5 req/15min per IP) | M | — |
| 3D.4 | **api/booking/route.ts** — POST handler: Zod re-walidacja, honeypot check, rate limiting, JSON response, zakomentowany webhook | L | rate-limit.ts, zod |

### Etap 3E: Strony (assembly)

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3E.1 | **wyjazdy/[slug]/page.tsx** — `generateStaticParams()`, `generateMetadata()`, 10 sekcji wg PRD order | L | Wszystkie Trip* + BookingForm |
| 3E.2 | **wyjazdy/page.tsx** — lista kafelków (upcoming + past w grayscale) | M | TripCard (z home/), SectionWrapper, SectionHeading |
| 3E.3 | **Aktualizacja Hero CTA** — zmiana `#wyjazdy` na `/wyjazdy` w HeroSection | S | — |

### Etap 3F: Weryfikacja i testy

| # | Zadanie | Rozmiar | Zależności |
|---|---------|---------|------------|
| 3F.1 | **Build test** — `npm run build` zero errors | S | Wszystkie etapy |
| 3F.2 | **Test responsywności** — 320px, 375px, 768px, 1024px, 1440px | M | DevTools |
| 3F.3 | **Test formularza** — happy path + walidacja + honeypot + rate limiting | M | API route musi działać |
| 3F.4 | **Test reduced-motion** — każdy komponent z motion poprawnie fallbackuje | S | — |
| 3F.5 | **Test nawigacji** — TripCard link → podstrona, "Zapisz się" CTA z homepage | S | — |
| 3F.6 | **Lint check** — `npm run lint` zero warnings | S | — |

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Accordion animation z motion w React 19 | Średnie | Średni | `AnimatePresence` + `motion.div` z `layout` — przetestowane wzorce z `motion/react` |
| Form UI z React Hook Form + Zod 4 | Niskie | Wysoki | Typy formularzy już zdefiniowane, RHF 7.71 + @hookform/resolvers 5.2 zainstalowane |
| Rate limiting w dev (in-memory) | Niskie | Niski | Map w pamięci, resetuje się przy hot-reload — OK dla MVP |
| Brak zdjęć galerii (tylko 3 w public/) | Średnie | Niski | Gallery gracefully handles małą liczbę zdjęć, responsive grid |
| `longDescription` jako string z `\n\n` | Niskie | Niski | Split by `\n\n` i map do `<p>` — sugestia z review |

## Mierniki sukcesu

1. `npm run build` — zero errors
2. `npm run lint` — zero warnings
3. `/wyjazdy/matka-i-corka` renderuje 10 sekcji w poprawnej kolejności
4. `/wyjazdy/yoga-i-konie` renderuje gracefully (bez pustych sekcji)
5. `/wyjazdy` wyświetla 2 kafelki z linkami
6. BookingForm: walidacja działa client-side i server-side
7. API `/api/booking`: honeypot odrzuca, rate limiting działa po 5 req
8. Reduced-motion: żadna animacja nie gra
9. Responsywność: layout nie łamie się 320px–1440px
10. Lighthouse Accessibility >95

## Szacunki czasowe

| Etap | Liczba zadań | Rozmiar łączny |
|------|-------------|----------------|
| 3A: Sekcje wyjazdu | 7 | L |
| 3B: FAQ + Gallery + Collaborator | 4 | M |
| 3C: Form UI primitives | 5 | M |
| 3D: BookingForm + API | 4 | XL |
| 3E: Assembly stron | 3 | L |
| 3F: Weryfikacja | 6 | M |
| **Razem** | **29 zadań** | — |
