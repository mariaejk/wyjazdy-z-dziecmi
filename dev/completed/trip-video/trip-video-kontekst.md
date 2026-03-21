# Kontekst: Wideo promocyjne na stronie warsztatu

**Branch:** `feature/trip-video`
**Ostatnia aktualizacja:** 2026-03-21

## Powiązane pliki

### Do modyfikacji
- `src/types/trip.ts` — dodanie `videoUrl?: string` do typu `Trip`
- `keystatic.config.ts` — dodanie pola `videoUrl` w schema trips
- `src/data/trips.ts` — mapowanie `videoUrl` w `mapTrip()`
- `src/app/(main)/wyjazdy/[slug]/page.tsx` — warunkowe renderowanie `<TripVideo>`

### Do utworzenia
- `src/components/trips/TripVideo.tsx` — komponent wideo
- `public/videos/warsztaty-z-konmi.mp4` — plik wideo (kopia z docs)

### Do aktualizacji (CMS content)
- `content/trips/rodzinny-tydzien-z-konmi-i-joga.yaml` — dodanie `videoUrl`

### Źródła
- `docs/poprawki/poprawki_20.03/warsztaty z konmy.mp4` — oryginalny plik (8.6MB)
- `dev/gemini/2026-03-21_wideo-w-szczegolach-warsztatu.md` — analiza Gemini

## Decyzje techniczne

1. **Server Component** — `<video>` z `controls` nie wymaga JS po stronie klienta. Ewentualne analytics tracking (play event) wymaga osobnego client wrappera.

2. **`preload="metadata"` zamiast poster** — przeglądarka automatycznie wyciągnie pierwszą klatkę. `trip.image` to ścieżka CMS (np. `/images/trips/konie.jpg`), nie publiczny URL — nie nadaje się bezpośrednio jako poster.

3. **SectionWrapper + ScrollAnimation** — spójność ze wszystkimi innymi sekcjami na stronie warsztatu. Gemini pominął te wrappery.

4. **Pole w CMS (nie hardcode)** — klientka może chcieć dodać wideo do innych warsztatów w przyszłości. Opcjonalne pole `videoUrl` w Keystatic to minimalna inwestycja.

5. **`public/videos/`** — Vercel serwuje pliki z `public/` przez CDN. 8.6MB mieści się w limitach. Przy wielu plikach wideo w przyszłości → migracja do Vercel Blob.

## Zależności

- Brak zależności od zewnętrznych pakietów
- Wymaga aktualnego brancha `fix/poprawki-ui-21-03-v2` (zmergowanego do master) lub opartego na nim
