# Plan: Faza 2 — Strona Główna

> **Branch:** `feature/faza2-strona-glowna`
> **Ostatnia aktualizacja:** 2026-02-26

---

## Podsumowanie wykonawcze

Faza 2 buduje pełną stronę główną landing page'a "Wyjazdy z Dziećmi". Obejmuje: dane wyjazdów, zestaw UI primitives (Button, SectionWrapper, SectionHeading, Badge, Card), komponent animacji scroll, oraz 4 sekcje strony głównej (Hero, Kafelki wyjazdów, Teaser "O nas", Teaser opinii). Rezultat: użytkownik widzi kompletną stronę główną z nawigacją do przyszłych podstron.

---

## Analiza obecnego stanu

### Co jest gotowe (Faza 1):
- **Infrastruktura:** Next.js 16, Tailwind v4, TypeScript, Motion 12, RHF+Zod — zainstalowane
- **Design system:** globals.css z kolorami (parchment, moss, graphite), fontami (Playfair + Inter)
- **Layout:** Header, MobileMenu, Footer, SkipToContent, Container — działające
- **Routing:** root layout.tsx z `lang="pl"`, loading.tsx, error.tsx
- **Typy:** `types/trip.ts` — kompletny typ `Trip` ze schedule, pricing, FAQ, gallery, collaborator, targetAudience
- **Dane:** tylko `data/navigation.ts` — brak `data/trips.ts`
- **Stała konfiguracja:** constants.ts (SITE_CONFIG, CONTACT, SOCIAL_LINKS, ROUTES), utils.ts (cn, formatDate, formatCurrency)
- **Obrazy:** 6 plików w public/images/ (hero.jpg, logo.jpeg, matka-corka.jpg, yoga-konie.jpg, kacze-bagno.jpg, galeria-1.jpg)
- **Strona główna:** placeholder z nagłówkiem "Strona w budowie"

### Poprawki z code review Fazy 1 (do włączenia):
1. `prefers-reduced-motion` — już naprawione w globals.css
2. Named imports — już naprawione (ReactNode, ElementType)
3. Footer newsletter styling — do poprawy (cursor-not-allowed, form wrapper)
4. Typ `TripTargetAudience` — już dodany w types/trip.ts
5. MobileMenu `w-72` → `w-4/5 max-w-xs` — do weryfikacji

---

## Proponowany stan docelowy

Strona główna (`/`) z 4 sekcjami w kolejności:

1. **HeroSection** — pełnoekranowy hero z tłem, nazwą projektu, 3 korzyściami, CTA
2. **TripCardsSection** — kafelki aktualnych wyjazdów (Matka i Córka + Yoga i Konie placeholder)
3. **AboutTeaser** — krótkie intro "O nas" z CTA do `/o-nas`
4. **OpinionsTeaser** — placeholder opinii z CTA zachęcającym do udziału

Wszystko z animacjami scroll (fade-in, slide-up), w pełni responsywne (320px–1440px).

---

## Etapy implementacji

### Etap 2A: Dane wyjazdów
**Cel:** Wypełnić `data/trips.ts` danymi z `docs/tresc_na_strone.md`

**Zadania:**
1. Utworzyć `src/data/trips.ts` z pełnymi danymi wyjazdu "Matka i Córka"
2. Dodać placeholder wyjazdu "Yoga i Konie" (isPast: false, minimalne dane)
3. Wyeksportować helper `getTripBySlug()` i `getAllTrips()`

**Kryteria akceptacji:**
- Dane zgodne z typem `Trip` z types/trip.ts
- Wszystkie pola wypełnione dla "Matka i Córka" (schedule, pricing, FAQ, gallery, collaborator, targetAudience)
- `npm run build` przechodzi bez błędów typów

**Nakład:** M | **Zależności:** brak

---

### Etap 2B: UI Primitives
**Cel:** Zbudować reużywalne komponenty UI potrzebne na stronie głównej i dalszych podstronach

**Zadania:**
1. `src/components/ui/Button.tsx` — warianty: primary (moss bg), secondary (outline), ghost; rozmiary: sm, md, lg; obsługa `asChild` lub `href` (Link); ikona opcjonalna
2. `src/components/ui/SectionWrapper.tsx` — wrapper sekcji z alternate bg (parchment/parchment-dark), padding, opcjonalny id do nawigacji
3. `src/components/ui/SectionHeading.tsx` — nagłówek sekcji (h2) z opcjonalnym podtytułem, font-heading, wyrównanie center/left
4. `src/components/ui/Badge.tsx` — mały tag (np. "Marzec 2026", "Nowy"), warianty: default, outline
5. `src/components/ui/Card.tsx` — karta z obrazem, treścią, hover effect; używana jako kafelek wyjazdu

**Kryteria akceptacji:**
- Wszystkie komponenty w pełni typowane (TypeScript)
- Używają `cn()` do composable className
- Mobile-first, responsywne
- Zgodne z design system (kolory, fonty, spacing z globals.css)
- Każdy komponent ma domyślne i opcjonalne propsy (nie więcej niż potrzeba)

**Nakład:** L | **Zależności:** brak

---

### Etap 2C: ScrollAnimation
**Cel:** Komponent animacji scroll z biblioteką Motion

**Zadania:**
1. `src/components/shared/ScrollAnimation.tsx` — wrapper animujący children przy wejściu w viewport
   - Warianty: fadeIn, fadeUp, fadeLeft, fadeRight, scaleIn
   - Konfigurowalny delay, duration, threshold
   - Automatyczne wyłączenie przy `prefers-reduced-motion: reduce`
   - Użycie `motion` z `motion/react` (NIE framer-motion)
   - Client component (`"use client"`)

**Kryteria akceptacji:**
- Import z `motion/react` (nie `framer-motion`)
- Respektuje `prefers-reduced-motion` (sprawdzenie via `useReducedMotion()` lub media query)
- Animacja odpala się raz (nie przy każdym scroll)
- Płynna animacja (60fps), bez layout shifts

**Nakład:** M | **Zależności:** brak

---

### Etap 2D: Sekcje strony głównej
**Cel:** 4 sekcje składające się na stronę główną

**Zadania:**

1. **`src/components/home/HeroSection.tsx`**
   - Pełnoekranowy hero z hero.jpg jako tło (next/image, priority)
   - Overlay z tekstem: "WYJAZDY Z DZIEĆMI" (font-heading)
   - Podtytuł: "Projekt, który zrodził się z potrzeby..."
   - 3 korzyści z ikonami (Lucide: Leaf, Heart, Sparkles) — zastąpienie emoji
   - CTA Button: "Zobacz wyjazdy" → scrolluje do sekcji wyjazdów lub `/wyjazdy`
   - Animacja: fade-in tekstu po załadowaniu
   - Mobile: tekst poniżej obrazu lub overlay z mniejszym fontem

2. **`src/components/home/TripCard.tsx`**
   - Karta pojedynczego wyjazdu (obraz, tytuł, data, lokalizacja, krótki opis, CTA)
   - Używa Badge (data), Card (wrapper)
   - Link do `/wyjazdy/[slug]`
   - Miniony wyjazd: `grayscale(100%)` na obrazie
   - Hover: subtelny scale + shadow

3. **`src/components/home/TripCardsSection.tsx`**
   - SectionWrapper + SectionHeading ("Nadchodzące wyjazdy")
   - Grid kafelków (1 kolumna mobile, 2 kolumny tablet+)
   - Dane z `data/trips.ts`
   - ScrollAnimation na każdym kafelku (staggered delay)

4. **`src/components/home/AboutTeaser.tsx`**
   - SectionWrapper (alternate bg)
   - Krótki tekst o Marii + zdjęcie (opcjonalne, jeśli dostępne)
   - CTA: "Poznaj nas bliżej" → `/o-nas`

5. **`src/components/home/OpinionsTeaser.tsx`**
   - SectionWrapper
   - Placeholder: "Dołącz do rodzin, które już z nami podróżowały"
   - Ikona cytatu lub dekoracja
   - CTA: "Weź udział w wyjeździe" → `/wyjazdy`

**Kryteria akceptacji:**
- Hero image ma `priority` (LCP optimization)
- Wszystkie linki działają (nawet jeśli podstrony jeszcze nie istnieją)
- Responsywność: 320px, 375px, 768px, 1024px, 1440px
- Animacje scroll na TripCards, AboutTeaser, OpinionsTeaser
- Minione wyjazdy w grayscale

**Nakład:** XL | **Zależności:** 2A (dane), 2B (UI primitives), 2C (ScrollAnimation)

---

### Etap 2E: Złożenie strony głównej
**Cel:** Zamienić placeholder w `app/page.tsx` na kompletną stronę

**Zadania:**
1. Zaktualizować `src/app/page.tsx` — import i ułożenie sekcji: Hero → TripCards → AboutTeaser → OpinionsTeaser
2. Opcjonalnie: drobne poprawki z code review Fazy 1 (Footer newsletter, MobileMenu width)

**Kryteria akceptacji:**
- `npm run dev` — strona główna renderuje się poprawnie
- `npm run build` — zero błędów
- `npm run lint` — zero błędów
- Wszystkie sekcje widoczne i responsywne
- Nawigacja z Header do sekcji/podstron działa

**Nakład:** S | **Zależności:** 2D (sekcje)

---

### Etap 2F: Weryfikacja końcowa
**Cel:** Upewnić się, że wszystko działa przed review

**Zadania:**
1. Build check: `npm run build` — zero błędów
2. Lint check: `npm run lint` — zero błędów
3. Test responsywny: DevTools 320px, 375px, 768px, 1024px, 1440px
4. Test animacji: scroll animations odpalają się poprawnie
5. Test `prefers-reduced-motion`: animacje wyłączone
6. Test nawigacji: Header linki + CTA buttons prowadzą we właściwe miejsca
7. Test obrazów: hero.jpg ma priority, reszta lazy, next/image serwuje optymalizowane formaty

**Kryteria akceptacji:**
- Wszystkie 7 punktów PASS
- Gotowe do code review

**Nakład:** S | **Zależności:** 2E

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Motion API niezgodne z React 19 | Niskie (sprawdzone w Fazie 1) | Wysoki | Testy na dev server, fallback do CSS animations |
| Hero image zbyt ciężki (LCP) | Średnie | Średni | `priority` + `sizes` prop + opcjonalny resize |
| Brak zdjęcia Marii dla AboutTeaser | Wysokie | Niski | Wariant bez zdjęcia (tekst + ikona) |
| Tailwind v4 class conflicts | Niskie | Niski | Testowanie na dev server |
| Overflow tekstu na mobile 320px | Średnie | Średni | Test na każdym breakpoincie, `break-words` |

---

## Mierniki sukcesu

1. Strona główna renderuje 4 sekcje: Hero, Trips, About, Opinions
2. `npm run build` przechodzi bez błędów
3. Lighthouse Performance >85 na desktop
4. Responsywność OK na 5 breakpointach (320, 375, 768, 1024, 1440)
5. Animacje scroll płynne (60fps) i respektują `prefers-reduced-motion`
6. Code review: 0 blocking issues

---

## Szacunki czasowe

| Etap | Nakład | Szacunek |
|------|--------|----------|
| 2A: Dane wyjazdów | M | ~20 min |
| 2B: UI Primitives | L | ~45 min |
| 2C: ScrollAnimation | M | ~20 min |
| 2D: Sekcje strony głównej | XL | ~60 min |
| 2E: Złożenie page.tsx | S | ~10 min |
| 2F: Weryfikacja | S | ~15 min |
| **Łącznie** | | **~2.5h** |
