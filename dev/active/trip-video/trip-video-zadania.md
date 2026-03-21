# Zadania: Wideo promocyjne na stronie warsztatu

**Branch:** `feature/trip-video`
**Ostatnia aktualizacja:** 2026-03-21

## Faza 1: Infrastruktura danych [S]

- [x] 1.1 Dodać `videoUrl?: string` do typu `Trip` w `src/types/trip.ts`
- [x] 1.2 Dodać pole `videoUrl` (text, opcjonalne) w Keystatic schema `keystatic.config.ts`
- [x] 1.3 Zmapować `videoUrl` w `mapTrip()` w `src/data/trips.ts` (`entry.videoUrl || undefined`)

## Faza 2: Plik wideo + komponent [M]

- [ ] 2.1 Utworzyć `public/videos/` i skopiować `warsztaty z konmy.mp4` → `public/videos/warsztaty-z-konmi.mp4`
- [ ] 2.2 Utworzyć `src/components/trips/TripVideo.tsx` (Server Component):
  - SectionWrapper dla spacingu
  - ScrollAnimation variant="fadeUp"
  - Natywny `<video controls playsInline preload="metadata">`
  - `aspect-video max-w-4xl mx-auto rounded-2xl shadow-xl`
  - Fallback text

## Faza 3: Integracja [S]

- [ ] 3.1 Import + warunkowe renderowanie `TripVideo` w `[slug]/page.tsx` (między Hero a "Dla kogo?")
- [ ] 3.2 Dodać `videoUrl: /videos/warsztaty-z-konmi.mp4` w YAML warsztatu w CMS

## Faza 4: Weryfikacja [S]

- [ ] 4.1 `npm run build` — zero błędów
- [ ] 4.2 Weryfikacja wizualna (mobile + desktop)
- [ ] 4.3 Sprawdzenie że inne warsztaty (bez videoUrl) nie mają zmian
