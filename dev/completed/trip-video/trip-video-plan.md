# Plan: Wideo promocyjne na stronie warsztatu

**Branch:** `feature/trip-video`
**Ostatnia aktualizacja:** 2026-03-21

## Podsumowanie wykonawcze

Dodanie opcjonalnego wideo promocyjnego na stronach szczegółów warsztatów. Pierwszy use case: film "warsztaty z końmi" na stronie "Rodzinny tydzień z końmi i jogą" (sierpień 2026). Wideo pojawi się tuż pod Hero, żeby rodzic zobaczył je prawie od razu po wejściu.

## Źródła

- Analiza Gemini: `dev/gemini/2026-03-21_wideo-w-szczegolach-warsztatu.md`
- Review Claude: korekty dot. poster, SectionWrapper, analytics, hosting

## Obecny stan

- Strona warsztatu: Hero → "Dla kogo?" → Opis → Program → Info → Cennik → Współpraca → FAQ → Formularz
- Brak jakiejkolwiek obsługi wideo w projekcie
- Plik wideo: `docs/poprawki/poprawki_20.03/warsztaty z konmy.mp4` (8.6MB)
- Typ `Trip` nie ma pola `videoUrl`

## Stan docelowy

- Opcjonalne pole `videoUrl` w Trip type + Keystatic CMS
- Komponent `TripVideo` z natywnym `<video>` HTML5
- Wideo widoczne tuż pod Hero (above-the-fold lub tuż poniżej)
- Plik wideo w `public/videos/`
- Analytics tracking: play event w GA4

## Decyzje techniczne

| Decyzja | Wybór | Dlaczego |
|---------|-------|----------|
| Lokalizacja | Pod Hero, przed "Dla kogo?" | Natychmiast widoczne po scrollu |
| Hosting wideo | `public/videos/` | 8.6MB — OK dla Vercel, jeden plik |
| Poster | Pominięty (`preload="metadata"`) | Przeglądarka wyciągnie 1. klatkę, trip.image to ścieżka CMS nie URL |
| Autoplay | Nie | UX — dźwięk bez zgody to antypattern |
| Pole w CMS | Tak (opcjonalne `videoUrl`) | Skalowalność — klientka może dodawać wideo do innych warsztatów |
| Komponent | Server Component | `<video>` z `controls` nie wymaga JS; analytics via osobny client wrapper |
| Spójność | `SectionWrapper` + `ScrollAnimation` | Jak reszta sekcji na stronie warsztatu |

---

## Fazy implementacji

### Faza 1: Infrastruktura danych (S)

1. Dodanie pola `videoUrl?: string` do typu `Trip` w `src/types/trip.ts`
2. Dodanie pola `videoUrl` w Keystatic schema (`keystatic.config.ts`)
3. Mapowanie `videoUrl` w `mapTrip()` w `src/data/trips.ts`

**Kryterium akceptacji:** `trip.videoUrl` dostępne w page.tsx, build przechodzi

### Faza 2: Plik wideo + komponent (M)

1. Skopiowanie `docs/poprawki/poprawki_20.03/warsztaty z konmy.mp4` → `public/videos/warsztaty-z-konmi.mp4`
2. Utworzenie `src/components/trips/TripVideo.tsx`:
   - `SectionWrapper` dla spójnego spacingu
   - `ScrollAnimation variant="fadeUp"` dla animacji
   - Natywny `<video>` z `controls`, `playsInline`, `preload="metadata"`
   - `aspect-video`, `max-w-4xl`, `rounded-2xl`, `shadow-xl`
   - Fallback text dla przeglądarek bez wsparcia
3. Opcjonalnie: client wrapper `TripVideoTracker` dla analytics (play event)

**Kryterium akceptacji:** Komponent renderuje wideo, responsywny, bez autoplay

### Faza 3: Integracja na stronie warsztatu (S)

1. Import `TripVideo` w `src/app/(main)/wyjazdy/[slug]/page.tsx`
2. Renderowanie warunkowe `{trip.videoUrl && <TripVideo ... />}` między Hero a "Dla kogo?"
3. Ustawienie `videoUrl` w CMS dla warsztatu "Rodzinny tydzień z końmi i jogą"

**Kryterium akceptacji:** Wideo widoczne na stronie warsztatu, inne warsztaty bez zmian

### Faza 4: Weryfikacja i build (S)

1. `npm run build` — zero błędów
2. Test mobilny (aspect-ratio, playsInline)
3. Test desktopowy (max-w-4xl, controls)
4. Sprawdzenie LCP — wideo nie powinno blokować hero image

**Kryterium akceptacji:** Build OK, wideo nie wpływa negatywnie na wydajność

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|---------------------|-------|-----------|
| Duży plik wideo spowalnia stronę | Niskie (8.6MB + preload=metadata) | Średni | `preload="metadata"` — ładuje tylko 1. klatkę |
| Vercel limit na static files | Niskie (100MB limit, 8.6MB plik) | Wysoki | Monitoring; w przyszłości Vercel Blob |
| Brak poster = czarny ekran | Średnie | Niski | `preload="metadata"` pokazuje 1. klatkę |
| iOS fullscreen wymuszenie | Niskie | Niski | `playsInline` zapobiega |

## Mierniki sukcesu

- Wideo renderuje się poprawnie na mobile i desktop
- Build przechodzi bez błędów
- Wideo nie wpływa na LCP (lazy loaded poniżej fold)
- Klientka może dodawać wideo do innych warsztatów przez CMS
