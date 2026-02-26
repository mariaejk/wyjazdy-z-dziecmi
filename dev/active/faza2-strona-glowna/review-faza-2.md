# Code Review: Faza 2 — Strona Glowna

> **Data:** 2026-02-26
> **Branch:** `feature/faza2-strona-glowna`
> **Reviewer:** Claude Code (subagent)

## Podsumowanie

**Decyzja:** APPROVE WITH COMMENTS
**Plikow sprawdzonych:** 13 (zrodlowych) + 3 (dokumentacja dev/)
**Problemow:** 🔴 0 | 🟠 4 | 🟡 5 | 🔵 4

---

## Problemy

### 🔴 Blocking

Brak.

---

### 🟠 Important

**1. `src/components/home/HeroSection.tsx:53-96` — Niespojnosc wzorca `prefers-reduced-motion`**

Gdy `prefersReducedMotion === true`, `fadeUp` jest pustym obiektem `{}`, ale nadal tworzy elementy `motion.*` zamiast zwyklych elementow DOM. Roznica w stosunku do podejscia w `ScrollAnimation.tsx`, ktory kompletnie omija motion i renderuje czysty `<div>`. Niespojnosc wzorca.

Propozycja: Wczesny return z czystym HTML (bez motion) jak w ScrollAnimation.

**2. `src/components/home/AboutTeaser.tsx:28-30` — Skrocony bio Marii pomija "nauczycielka jogi"**

Zrodlo w `docs/tresc_na_strone.md` mowi: "nauczycielka jogi i mama Laury". Teaser pomija "nauczycielka jogi" — kluczowa kompetencja dla marki organizujacej wyjazdy z joga.

Propozycja: Dodac "nauczycielka jogi" do tekstu.

**3. `src/components/home/HeroSection.tsx:93` — CTA "Zobacz wyjazdy" prowadzi do `/wyjazdy` (404)**

Podstrona `/wyjazdy` nie istnieje jeszcze (Faza 3). Sekcja `TripCardsSection` ma `id="wyjazdy"`, wiec CTA mogloby scrollowac do sekcji na tej samej stronie.

Propozycja: Zmienic na `href="#wyjazdy"` do czasu istnienia podstrony.

**4. `src/components/ui/Button.tsx:16-21` — Link-variant nie akceptuje dodatkowych atrybutow**

Typ `ButtonAsLink` akceptuje tylko `href`, ale nie pozwala na `aria-label`, `target`, `rel`.

Propozycja: Rozszerzyc typ o opcjonalne atrybuty linka.

---

### 🟡 Nit

**1. `src/components/home/HeroSection.tsx:56-57` — `transition` prop zbedny gdy `fadeUp` jest pusty**

**2. `src/components/home/HeroSection.tsx:78` — Dynamiczny komponent `<benefit.icon>` mniej czytelny** (ale poprawny pattern)

**3. `src/components/shared/ScrollAnimation.tsx:65` — Zbedne `cn()` z jednym argumentem** (`cn(className)` === `className`)

**4. `src/data/trips.ts:15` — `longDescription` jako string z `\n\n`** — rozwazyc tablice paragrafow na Faze 3

**5. `src/components/ui/Card.tsx:53` — Dlugi single-line className** — uzyc `cn()` z multiline

---

### 🔵 Suggestions

**1. `src/components/home/TripCardsSection.tsx` — Brak stanu "brak wyjazdow"** — dodac fallback tekst

**2. `src/components/home/TripCard.tsx:38` — `line-clamp-3` moze dawac rozne wysokosci kart** — rozwazyc `min-h` na opisie

**3. `src/components/ui/Button.tsx` — Rozwazyc `aria-disabled`** obok `disabled` dla lepszej dostepnosci

**4. `src/components/home/HeroSection.tsx:36` — `min-h-[85vh]` to "magiczna" wartosc** — dodac komentarz

---

## Dobre praktyki ✅

1. **Wzorcowy `useReducedMotion()` w ScrollAnimation.tsx** — wczesny return do czystego `<div>`, calkowite ominiecie motion. WCAG 2.3.3.
2. **Discriminated union w Button.tsx** — eleganckie `ButtonAsLink | ButtonAsButton` z `never`.
3. **Kompozycja UI primitives** — SectionWrapper, SectionHeading, Card, Badge. Kazdy robi jedna rzecz dobrze.
4. **Staggered scroll animations** — `delay={index * 0.15}` daje naturalny efekt kaskadowy.
5. **Server Components tam, gdzie to mozliwe** — TripCardsSection, AboutTeaser, OpinionsTeaser, TripCard to SC. Minimalizuje JS.
6. **Image optimization** — hero.jpg z `priority`, karty z `fill` + `sizes` z `calc()`.
7. **Kompletne dane trips.ts** — wierne odwzorowanie `docs/tresc_na_strone.md`.
8. **HTML entities dla polskich cudzyslowow** — `&bdquo;`/`&rdquo;` i `\u201E`/`\u201D`.
9. **Helperki danych** — getTripBySlug, getAllTrips, getUpcomingTrips, getPastTrips.
10. **`grayscale` prop gotowy na przyszlosc** — isPast bez martwego kodu.

---

## Zgodnosc z planem

| Kryterium | Status |
|-----------|--------|
| HeroSection z hero.jpg, tytul, podtytul, 3 korzysci, CTA | ✅ |
| Hero image `priority` (LCP) | ✅ |
| TripCard z Badge, lokalizacja, opis, grayscale | ✅ |
| TripCardsSection z grid + staggered scroll | ✅ |
| AboutTeaser z alternate bg, Maria bio, CTA | ✅ (bio do uzupelnienia) |
| OpinionsTeaser z placeholder i CTA | ✅ |
| page.tsx: Hero → TripCards → About → Opinions | ✅ |
| ScrollAnimation z motion/react (NIE framer-motion) | ✅ |
| `prefers-reduced-motion` | ✅ (HeroSection do poprawy spojnosci) |
| Responsywnosc 320px–1440px | ✅ |
| TypeScript — brak `any` | ✅ |
| Named imports React 19 | ✅ |
| Design system kolory | ✅ |
| `npm run build` — PASS | ✅ |
| `npm run lint` — PASS | ✅ |
| Dane trips.ts zgodne z tresc_na_strone.md | ✅ |
| UI Primitives reuzywalne | ✅ |
