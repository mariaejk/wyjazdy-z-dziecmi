# Zadania: Redesign wizualny + poprawki klientki

**Branch:** `feature/redesign-wizualny-13-03`
**Ostatnia aktualizacja:** 2026-03-13

---

## Faza 1: Paleta kolorów [S]

- [ ] 1.1 Zmienić kolory w `@theme` block w globals.css (parchment, moss, graphite)
- [ ] 1.2 Dodać nowe tokeny: terracotta, terracotta-dark, mustard, coral
- [ ] 1.3 Zmienić `:focus-visible` outline na terracotta
- [ ] 1.4 Zmienić `::selection` background na terracotta
- [ ] 1.5 `npm run build` — zero błędów

## Faza 2: Komponenty UI [M]

- [ ] 2.1 Button.tsx — primary variant na terracotta
- [ ] 2.2 Card.tsx — usunąć prop `grayscale` + zmienić focus ring
- [ ] 2.3 SectionWrapper.tsx — dodać variant "highlight"
- [ ] 2.4 SkipToContent.tsx — zmienić na sr-only + focus visible
- [ ] 2.5 `npm run build` — zero błędów

## Faza 3: Layout [M]

- [ ] 3.1 constants.ts — dodać ROUTE `adultOnly: "/dla-doroslych"`
- [ ] 3.2 navigation.ts — 10 pozycji menu (nowa lista)
- [ ] 3.3 Utworzyć `src/app/(main)/dla-doroslych/page.tsx` placeholder (noindex)
- [ ] 3.4 Header.tsx — zastąpić "Wyjazdy z Dziećmi" na "Warsztaty wyjazdowe dla dorosłych i dzieci"
- [ ] 3.5 CookieBanner.tsx — moss → terracotta (buttony, checkboxy)
- [ ] 3.6 MobileMenu.tsx — CTA button colors
- [ ] 3.7 `npm run build` — zero błędów

## Faza 4: Strona główna [L]

- [ ] 4.1 HeroSection.tsx — usunąć badge "Wyjazdy 2026"
- [ ] 4.2 HeroSection.tsx — zmienić gradient tła
- [ ] 4.3 HeroSection.tsx — akcent "Dziećmi" → text-terracotta
- [ ] 4.4 HeroSection.tsx — CTA button: usunąć hardcoded sage-dark, użyć variant="primary"
- [ ] 4.5 Utworzyć HeroSlideshow.tsx — slideshow 3-5 zdjęć, Motion AnimatePresence
- [ ] 4.6 HeroSection.tsx — zintegrować HeroSlideshow zamiast statycznego Image
- [ ] 4.7 TripCard.tsx — usunąć `grayscale={trip.isPast}`
- [ ] 4.8 TripCardsSection.tsx — single column + max-w-2xl mx-auto
- [ ] 4.9 AboutTeaser.tsx — nagłówek "Poznaj twórczynię warsztatów"
- [ ] 4.10 OpinionsTeaser.tsx — nagłówek "Opinie uczestników"
- [ ] 4.11 PastTripsSection.tsx — nagłówek "Zrealizowane warsztaty"
- [ ] 4.12 page.tsx — przesunąć kalendarz po OpinionsTeaser
- [ ] 4.13 `npm run build` — zero błędów

## Faza 5: Sweep weryfikacyjny [S]

- [ ] 5.1 Sprawdzić loading.tsx — spinner color
- [ ] 5.2 Sprawdzić error.tsx, not-found.tsx — button colors
- [ ] 5.3 Sprawdzić CookieSettingsButton.tsx — moss references
- [ ] 5.4 Sprawdzić TripCalendar.tsx — category colors
- [ ] 5.5 Sprawdzić StickyBookingCTA.tsx
- [ ] 5.6 `npm run build` — finalne zero błędów
- [ ] 5.7 Weryfikacja wizualna: CTA terrakotowe, tło ciepłe, grayscale usunięty
- [ ] 5.8 Weryfikacja WCAG: kontrast AA, focus ring, skip-to-content
