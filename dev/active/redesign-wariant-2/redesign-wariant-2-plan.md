# Plan: Redesign Wariant 2 — Photography-First TCW Style

Branch: `feature/redesign-wariant-2`
Ostatnia aktualizacja: 2026-03-23

## Cel
Stworzyć wariant 2 redesignu wzorowanego na The Common Wanderer (TCW) — photography-first z full-bleed hero i image breakerami. Do porównania z wariantem 1 (centered editorial).

## Fazy

### Faza 1: Fundamenty [DONE]
- Cormorant Garamond font (300/400/600/700 + italic)
- Paleta: #FAF9F6 cream, #222222 charcoal, #6C7A63 olive moss, #8B857B taupe
- SectionHeading: italicText + overline props, font-light
- Button: charcoal bg, text-[11px] uppercase tracking-[0.2em]

### Faza 2: Hero Full-Bleed [DONE]
- HeroSection: h-[70vh] sm:h-[80vh], overlay gradient, text na dole
- HeroSlideshow: absolute inset-0, fill, sizes="100vw"
- Scroll indicator: animated ChevronDown

### Faza 3: Image Breakers [DONE]
- ImageBreaker component (src, alt, aspectRatio, overlayText)
- 3 breakery na homepage: po CategoryCards, po TripCards, po Opinions

### Faza 4: Sekcje Editorial [DONE]
- Italic headings na wszystkich sekcjach
- CategoryCards: aspect 3/2, italic H3
- TripCard: italic H3
- AboutTeaser: overline + italic H2, bez border na zdjęciu
- OpinionsTeaser: italic heading
- BlogTeaser: overline + italic heading
- HomeFAQ: italic heading

### Faza 5: Header/Footer/Card [DONE]
- Header: text-[13px] uppercase tracking-[0.12em]
- Footer: brand tagline (italic heading) + italic section headings
- Card: border bez shadow
- ForestPattern usunięty z homepage

### Faza 6: Build + Test [DONE]
- Build: 0 errors, compiled in 14.6s
- Lint: 0 errors (only pre-existing warnings)
