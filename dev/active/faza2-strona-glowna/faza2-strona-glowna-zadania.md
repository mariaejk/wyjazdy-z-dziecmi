# Zadania: Faza 2 — Strona Główna

> **Branch:** `feature/faza2-strona-glowna`
> **Ostatnia aktualizacja:** 2026-02-26

---

## Etap 2A: Dane wyjazdów [M]

- [x] **2A.1** Utworzyć `src/data/trips.ts` z eksportem `trips: Trip[]`
- [x] **2A.2** Wypełnić dane "Matka i Córka — Wspólny Rytm" (slug, title, subtitle, date, location, descriptions, schedule 3 dni, pricing 3 opcje, deposit 450, collaborator Ilona, targetAudience 4 punkty, FAQ 5 pytań, gallery)
- [x] **2A.3** Dodać placeholder "Yoga i Konie" (minimalne dane, isPast: false)
- [x] **2A.4** Wyeksportować helpery: `getTripBySlug(slug)`, `getAllTrips()`, `getUpcomingTrips()`, `getPastTrips()`
- [x] **2A.5** Sprawdzić zgodność z typem `Trip` (`npm run build`)

---

## Etap 2B: UI Primitives [L]

- [x] **2B.1** `src/components/ui/Button.tsx` — warianty: primary/secondary/ghost, rozmiary: sm/md/lg, props: href (→ Link), icon, disabled, className
- [x] **2B.2** `src/components/ui/SectionWrapper.tsx` — props: variant (default/alternate), id, className, children; padding-y responsive
- [x] **2B.3** `src/components/ui/SectionHeading.tsx` — props: title (h2), subtitle (p), align (center/left), className
- [x] **2B.4** `src/components/ui/Badge.tsx` — props: variant (default/outline), children, className
- [x] **2B.5** `src/components/ui/Card.tsx` — props: image (src, alt), children, href, className; hover effect (scale + shadow)
- [x] **2B.6** Sprawdzić `npm run build` po dodaniu wszystkich UI components

---

## Etap 2C: ScrollAnimation [M]

- [x] **2C.1** `src/components/shared/ScrollAnimation.tsx` — "use client", import z `motion/react`
- [x] **2C.2** Warianty animacji: fadeIn, fadeUp, fadeLeft, fadeRight, scaleIn
- [x] **2C.3** Props: variant, delay, duration, threshold, once (default true), className
- [x] **2C.4** Respektowanie `prefers-reduced-motion` (hook `useReducedMotion()` z motion/react)
- [x] **2C.5** Test na dev server — build PASS, lint PASS

---

## Etap 2D: Sekcje strony głównej [XL]

- [x] **2D.1** `src/components/home/HeroSection.tsx` — hero.jpg z overlay, tytuł, podtytuł, 3 korzyści (Lucide icons: Leaf, Heart, Sparkles), CTA "Zobacz wyjazdy"
- [x] **2D.2** HeroSection: responsywność (mobile: mniejsze fonty, desktop: overlay na obrazie z gradientem)
- [x] **2D.3** HeroSection: hero.jpg z `priority` (LCP), `sizes="100vw"`, min-h-[85vh]
- [x] **2D.4** `src/components/home/TripCard.tsx` — Card wrapper, Badge (data + Calendar icon), MapPin lokalizacja, line-clamp-3, grayscale dla isPast
- [x] **2D.5** `src/components/home/TripCardsSection.tsx` — SectionWrapper + SectionHeading + grid 1/2 cols + ScrollAnimation staggered delay 0.15s
- [x] **2D.6** `src/components/home/AboutTeaser.tsx` — alternate bg, Users icon, Maria bio, CTA secondary "Poznaj nas bliżej" → /o-nas
- [x] **2D.7** `src/components/home/OpinionsTeaser.tsx` — Quote icon, placeholder tekst, CTA "Weź udział w wyjeździe" → /wyjazdy
- [x] **2D.8** Build PASS + Lint PASS (testy responsywności wizualne do 2F)

---

## Etap 2E: Złożenie strony głównej [S]

- [x] **2E.1** Zaktualizować `src/app/page.tsx` — import sekcji, ułożenie: Hero → TripCards → AboutTeaser → OpinionsTeaser
- [x] **2E.2** Footer newsletter — już poprawiony w Fazie 1 (cursor-not-allowed, opacity-60, form wrapper)
- [x] **2E.3** `npm run build` — PASS (0 errors)
- [x] **2E.4** `npm run lint` — PASS (0 errors)

---

## Etap 2F: Weryfikacja końcowa [S]

- [ ] **2F.1** Build: `npm run build` — PASS
- [ ] **2F.2** Lint: `npm run lint` — PASS
- [ ] **2F.3** Responsywność: 320px, 375px, 768px, 1024px, 1440px — PASS
- [ ] **2F.4** Scroll animations: odpalają się przy scroll — PASS
- [ ] **2F.5** `prefers-reduced-motion`: animacje wyłączone — PASS
- [ ] **2F.6** Nawigacja: Header + CTA buttons prowadzą poprawnie — PASS
- [ ] **2F.7** Obrazy: hero priority, reszta lazy, next/image optymalizuje — PASS
- [ ] **2F.8** Commit: `feat(faza2-strona-glowna): etap 2F — weryfikacja końcowa`

---

## Podsumowanie

| Etap | Zadań | Status |
|------|-------|--------|
| 2A: Dane wyjazdów | 5 | ✅ Done |
| 2B: UI Primitives | 6 | ✅ Done |
| 2C: ScrollAnimation | 5 | ✅ Done |
| 2D: Sekcje strony głównej | 8 | ✅ Done |
| 2E: Złożenie page.tsx | 4 | ✅ Done |
| 2F: Weryfikacja | 8 | ⬜ Pending |
| **Łącznie** | **36** | |
