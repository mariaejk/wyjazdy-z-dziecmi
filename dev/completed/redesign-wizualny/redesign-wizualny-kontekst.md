# Kontekst: Redesign wizualny + poprawki klientki

**Branch:** `feature/redesign-wizualny-13-03`
**Ostatnia aktualizacja:** 2026-03-13

## Źródła wymagań

- `docs/poprawki/poprawki_13.03/poprawki_13.03.md` — 13 punktów poprawek klientki
- `dev/gemini/2026-03-13_analiza-wizualna-cta-kolorystyka.md` — analiza Gemini (Paleta A wybrana)
- `dev/gemini/2026-03-13_analiza-wizualna-landing-page.md` — wcześniejsza analiza wizualna

## Decyzje podjęte z klientką

| Temat | Decyzja |
|-------|---------|
| Paleta kolorów | Paleta A: Terakota (#D9734E) + Oliwka (#5C713B) |
| Zakres | Wszystko razem (kolory + 13 poprawek) |
| Menu | 10 pozycji: O nas, Wszystkie warsztaty, Warsztaty z dziećmi, Matka i córka, Single parents, Dla dorosłych, Galeria, Opinie, Kontakt, Blog |
| Tagline | Zastąpić "Wyjazdy z Dziećmi" → "Warsztaty wyjazdowe dla dorosłych i dzieci" |
| Nagłówek opinii | "Opinie uczestników" (nie "Opinie rodzin") |
| Nowe strony | /dla-doroslych jako placeholder (noindex), /single-parents już ma redirect 301 |

## Powiązane pliki — kolory i design system

| Plik | Co zmienić |
|------|-----------|
| `src/app/globals.css` | @theme block — wszystkie kolory + focus + selection |
| `src/components/ui/Button.tsx` | primary variant → terracotta |
| `src/components/ui/Card.tsx` | usunąć grayscale prop |
| `src/components/ui/SectionWrapper.tsx` | dodać "highlight" variant |
| `src/components/ui/Badge.tsx` | bez zmian (moss/oliwka OK dla info) |
| `src/components/layout/SkipToContent.tsx` | sr-only + focus styles |

## Powiązane pliki — layout

| Plik | Co zmienić |
|------|-----------|
| `src/data/navigation.ts` | 10 pozycji menu |
| `src/lib/constants.ts` | nowy ROUTE: adultOnly |
| `src/components/layout/Header.tsx` | tagline zamiast nazwy |
| `src/components/layout/MobileMenu.tsx` | CTA button color |
| `src/components/layout/CookieBanner.tsx` | button/checkbox colors → terracotta |

## Powiązane pliki — strona główna

| Plik | Co zmienić |
|------|-----------|
| `src/components/home/HeroSection.tsx` | badge removal, gradient, CTA, slideshow |
| `src/components/home/HeroSlideshow.tsx` | NOWY — slideshow component |
| `src/components/home/TripCard.tsx` | usunąć grayscale prop |
| `src/components/home/TripCardsSection.tsx` | single column layout |
| `src/components/home/AboutTeaser.tsx` | nagłówek zmiana |
| `src/components/home/OpinionsTeaser.tsx` | nagłówek zmiana |
| `src/components/home/PastTripsSection.tsx` | nagłówek zmiana |
| `src/app/(main)/page.tsx` | reorder sekcji, calendar niżej |

## Powiązane pliki — nowe strony

| Plik | Co zmienić |
|------|-----------|
| `src/app/(main)/dla-doroslych/page.tsx` | NOWY — placeholder |

## Zależności techniczne

- Motion (`motion/react`) — NIE framer-motion
- Tailwind v4 — @theme block auto-generuje utility classes
- Zmiana kolorów w @theme automatycznie propaguje do wszystkich komponentów używających `moss`, `parchment`, `graphite`
- Nowe tokeny (`terracotta`, `terracotta-dark`, `mustard`, `coral`) muszą być zdefiniowane PRZED użyciem w komponentach

## Kontrast WCAG AA

| Para | Ratio | Status |
|------|-------|--------|
| #2C241B na #F4EFE6 | ~12.5:1 | PASS |
| #5A4F44 na #F4EFE6 | ~5.3:1 | PASS |
| #FFFFFF na #D9734E | ~3.2:1 | PASS (large text 16px+) |
| #FFFFFF na #5C713B | ~4.7:1 | PASS |
| #FFFFFF na #B85331 | ~4.1:1 | PASS |
