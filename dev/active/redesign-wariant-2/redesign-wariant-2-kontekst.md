# Kontekst: Redesign Wariant 2

Branch: `feature/redesign-wariant-2`
Ostatnia aktualizacja: 2026-03-23

## Powiązane pliki (18 zmodyfikowanych)
- `src/app/globals.css` — paleta kolorów, font-heading
- `src/app/(main)/layout.tsx` — import Cormorant Garamond
- `src/app/(main)/page.tsx` — kolejność sekcji, image breakers, usunięty ForestPattern
- `src/components/ui/SectionHeading.tsx` — italicText + overline props
- `src/components/ui/Button.tsx` — charcoal + uppercase
- `src/components/ui/Card.tsx` — border bez shadow
- `src/components/home/HeroSection.tsx` — full-bleed overlay
- `src/components/home/HeroSlideshow.tsx` — absolute fill mode
- `src/components/home/CategoryCards.tsx` — italic heading, aspect 3/2
- `src/components/home/TripCardsSection.tsx` — italic heading
- `src/components/home/TripCard.tsx` — italic H3
- `src/components/home/AboutTeaser.tsx` — overline + italic, bez border
- `src/components/home/OpinionsTeaser.tsx` — italic heading
- `src/components/home/BlogTeaser.tsx` — overline + italic heading
- `src/components/home/HomeFAQ.tsx` — italic heading
- `src/components/layout/Header.tsx` — editorial nav text
- `src/components/layout/Footer.tsx` — brand tagline + italic headings
- `src/components/shared/ImageBreaker.tsx` — NOWY komponent

## Decyzje techniczne
- Font Cormorant Garamond (jak W1) — wizualnie najbliższy TCW
- Full-bleed hero to główny wyróżnik vs W1
- 3 image breakery używają istniejących zdjęć (kacze-bagno, przeszly-1, matki-corki-1)
- Kalendarz zachowany na homepage (decyzja klientki)
- ForestPattern usunięty (nie pasuje do TCW aesthetic)

## Zależności
- Wariant 1: `feature/redesign-typografia-kolory-22-03` — do porównania
- Master branch — baza obu wariantów
