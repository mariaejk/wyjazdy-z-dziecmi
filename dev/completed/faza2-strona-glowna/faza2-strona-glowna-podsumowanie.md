# Podsumowanie: Faza 2 — Strona Główna

> **Data ukończenia:** 2026-02-26
> **Branch:** `feature/faza2-strona-glowna`
> **Zadania:** 42/42 ✅ (36 implementacja + 6 poprawek z review)
> **Code review:** APPROVE WITH COMMENTS (0 blocking, 4 important naprawione)

---

## Co zostało dostarczone

Kompletna strona główna landing page'a z 4 sekcjami:

1. **HeroSection** — pełnoekranowy hero z `hero.jpg`, tytułem, podtytułem, 3 korzyściami (Lucide icons), CTA scrollujące do sekcji wyjazdów
2. **TripCardsSection** — grid kafelków wyjazdów (2 kolumny na desktop), dane z `trips.ts`, staggered scroll animations
3. **AboutTeaser** — sekcja "O nas" z bio Marii, alternate background, CTA do `/o-nas`
4. **OpinionsTeaser** — placeholder opinii z CTA zachęcającym do udziału

Plus zestaw reużywalnych komponentów i infrastruktura danych.

---

## Utworzone pliki (13)

### Dane
- `src/data/trips.ts` — dane wyjazdów (Matka i Córka: kompletne, Yoga i Konie: placeholder) + helpery (getTripBySlug, getAllTrips, getUpcomingTrips, getPastTrips)

### UI Primitives (`src/components/ui/`)
- `Button.tsx` — primary/secondary/ghost, sm/md/lg, discriminated union (link vs button), aria-label/target/rel na linkach
- `SectionWrapper.tsx` — wrapper sekcji z alternate bg (parchment/parchment-dark), responsive padding
- `SectionHeading.tsx` — nagłówek h2 + opcjonalny podtytuł, center/left align
- `Badge.tsx` — tag (default/outline)
- `Card.tsx` — karta z obrazem (next/image fill), hover scale+shadow, grayscale prop, multiline cn()

### Shared (`src/components/shared/`)
- `ScrollAnimation.tsx` — animacja scroll (motion/react), 5 wariantów, early return dla reduced-motion

### Home sections (`src/components/home/`)
- `HeroSection.tsx` — client component, motion fade-up on load, early return dla reduced-motion
- `TripCard.tsx` — kafelek wyjazdu (Card + Badge + ikony Calendar/MapPin)
- `TripCardsSection.tsx` — grid + staggered ScrollAnimation
- `AboutTeaser.tsx` — bio Marii z "nauczycielka jogi", ikona Users
- `OpinionsTeaser.tsx` — placeholder z ikoną Quote

### Zmodyfikowane
- `src/app/page.tsx` — zamieniony placeholder na 4 sekcje

---

## Kluczowe decyzje architektoniczne

1. **Wzorzec reduced-motion:** Early return z czystym HTML (bez motion) — spójny w HeroSection i ScrollAnimation. WCAG 2.3.3.
2. **Button discriminated union:** `ButtonAsLink | ButtonAsButton` z `never` — czyste rozdzielenie typów, link-variant akceptuje aria-label/target/rel.
3. **Server Components domyślnie:** TripCardsSection, AboutTeaser, OpinionsTeaser, TripCard to SC. ScrollAnimation jest client boundary. Tylko HeroSection wymaga "use client" (direct motion).
4. **Hero CTA:** `href="#wyjazdy"` (scroll do sekcji) zamiast `/wyjazdy` (404) — do zmiany gdy podstrona powstanie w Fazie 3.
5. **Dane hardcoded:** `trips.ts` z helperami — gotowe na przyszły CMS, ale bez nadmiarowej abstrakcji.
6. **Polskie cudzysłowy:** `\u201E`/`\u201D` w JS stringach, `&bdquo;`/`&rdquo;` w JSX. Uniknięcie parse errors.
7. **Organizacja komponentów:** `ui/` (reużywalne), `home/` (strona główna), `shared/` (cross-page).

---

## Wyciągnięte wnioski (lessons learned)

### Pułapki
- **Unicode quotes w JS:** Polskie cudzysłowy `„"` (U+201E/U+201D) powodują parse error w stringach. Zawsze escape'ować.
- **Motion variants typing:** `Record<string, ...>` nie pasuje do motion props. Rozwiązanie: `as const` assertion.
- **Niespójny reduced-motion:** Łatwo zapomnieć o spójnym wzorcu. Ustalony standard: early return z czystym HTML.

### Wzorce do reużycia
- **Staggered animations:** `delay={index * 0.15}` na mapowanych elementach — naturalny efekt kaskadowy.
- **Card sizes z calc:** `sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 33vw"` — optymalne dla next/image.
- **Responsive padding:** 3-stopniowe breakpointy `p-4 sm:p-5 lg:p-6` zamiast 2-stopniowych.
- **grayscale prop:** Przygotowany na `isPast` bez martwego kodu — prop Boolean na Card.

### Sugestie z review (do rozważenia w Fazie 3)
- `longDescription` jako tablica paragrafów zamiast `\n\n` w stringu
- Fallback "brak wyjazdów" w TripCardsSection
- `min-h` na opisie TripCard dla równych wysokości kart
- `aria-disabled` obok `disabled` na Button

---

## Metryki

| Metryka | Wynik |
|---------|-------|
| Build | PASS (0 errors) |
| Lint | PASS (0 errors, 3 warnings w config files) |
| TypeScript | Strict, 0 `any` |
| Code review | APPROVE (0 blocking) |
| Pliki źródłowe | 13 nowych/zmodyfikowanych |
| Etapy | 7 (2A–2F + review poprawki) |
| Zadania | 42/42 ✅ |
