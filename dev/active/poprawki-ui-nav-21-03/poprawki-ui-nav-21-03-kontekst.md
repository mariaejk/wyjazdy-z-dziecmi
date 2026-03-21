# Kontekst: Poprawki UI + Nawigacja 21.03.2026

Branch: `feature/poprawki-ui-nav-21-03`
Ostatnia aktualizacja: 2026-03-21

## Kluczowe pliki

### Nawigacja
- `src/data/navigation.ts` — dane nawigacji (NavItem[], mainNavigation, footerLegalLinks)
- `src/components/layout/Header.tsx` — desktop nav z DropdownNavItem, sticky, CTA
- `src/components/layout/MobileMenu.tsx` — mobile slide-in panel, accordion submenu, focus trap
- `src/lib/constants.ts` — ROUTES object z wszystkimi ścieżkami
- `src/lib/utils.ts` — `isNavActive()` helper

### Hero + Homepage
- `src/components/home/HeroSection.tsx` — hero z slideshow, H1/H2, benefits, gwiazdki, USP, CTA
- `src/components/home/HeroSlideshow.tsx` — 4 slides, auto-advance 5s
- `src/app/(main)/page.tsx` — homepage layout (HeroSection → Calendar → TripCards → About → Opinions → FAQ)
- `src/components/home/OpinionsTeaser.tsx` — featured testimonials (3 karty)

### Warsztaty
- `src/components/trips/TripVideo.tsx` — video + opis side-by-side (lg:2/5+3/5)
- `src/components/trips/BookingForm.tsx` — formularz rezerwacji ("Zapisz się na wyjazd")
- `src/app/(main)/wyjazdy/[slug]/page.tsx` — template strony warsztatu

### Footer
- `src/components/layout/Footer.tsx` — 4 kolumny + newsletter + copyright

### Opinie
- `src/app/(main)/opinie/page.tsx` — strona opinii (grid 2-kolumnowy)

## Decyzje techniczne

1. **Dwa dropdowny w Header** — istniejący `DropdownNavItem` obsługuje jeden dropdown. Refaktor: każdy nav item z `children` renderuje dropdown. Trzeba zarządzać stanem wielu dropdownów (zamykaj poprzedni przy otwarciu nowego).

2. **Nieklikalne dropdown headers** — "Warsztaty" i "Poznajmy się" nie powinny nawigować (`href: "#"` lub `href: ""`). W Header: `<button>` zamiast `<Link>` dla items z children. W MobileMenu: accordion header bez linku.

3. **CategoryCards** — nowy Server Component. Zdjęcia z istniejących tripów lub dedykowane. 3 karty w gridzie `sm:grid-cols-3`. Każda karta: zdjęcie + overlay z nazwą + link do kategorii. Styl: warm natural, rounded-2xl, shadow.

4. **"Polecane przez rodziców" relokacja** — wyciągnąć z HeroSection do standalone mini-komponentu. Renderować w `page.tsx` przed OpinionsTeaser i w `/opinie/page.tsx` przed grid.

5. **Kontakt w dwóch miejscach** — w dropdown "Poznajmy się" i jako osobna pozycja top-level. Zamierzone: dropdown daje discovery, top-level daje szybki dostęp.

## Zależności

- Faza 1 (nawigacja) jest niezależna od reszty
- Faza 2 (hero + kafelki) jest niezależna od nawigacji
- Faza 3 (warsztaty) jest niezależna
- Faza 4 (footer) jest niezależna
- Wszystkie fazy mogą być implementowane równolegle, ale warto robić sekwencyjnie dla łatwiejszego review

## Uwagi

- Header.tsx i MobileMenu.tsx to `"use client"` — zawierają hooks i eventy
- HeroSection.tsx to `"use client"` — zawiera motion hooks
- CategoryCards powinien być Server Component (linki, zdjęcia, bez interaktywności)
- Zmiana H2 w hero musi być w OBU wariantach (motion + reduced-motion)
- USP pod slideshow to ten sam tekst co nowy H2 — usunąć żeby nie dublować
