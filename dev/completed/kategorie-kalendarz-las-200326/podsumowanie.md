# Podsumowanie: Kategorie, kalendarz, wzór lasu

**Data ukończenia:** 2026-03-20
**Branch:** `feature/kategorie-kalendarz-las` → merged to `master`
**Commity:** `761f24d` (implementacja) + `aa292a2` (poprawki po review)

## Co zostało dostarczone

1. **CATEGORY_CONFIG** — Single Source of Truth kolorów kategorii (`category-config.ts`)
2. **Nowe kolory kalendarza** — moss/mustard/lavender/terracotta (4 kolory z różnych części koła barw)
3. **Zakres dat na kartach** — `formatDateRange(start, end)` zamiast samej daty startu
4. **Badge kategorii** na kartach wyjazdów (tinted bg + text)
5. **Sekcje "Nadchodzące wyjazdy"** na 3 stronach kategorii (/wyjazd-z-dziecmi, /matka-z-corka, /dla-doroslych)
6. **Kalendarz TripCalendar** dodany na `/wyjazdy` (wcześniej tylko strona główna)
7. **ForestPattern SVG** — bajkowy (homepage) + realistyczny (/wyjazdy), opacity 6-7%
8. **Refaktor /dla-doroslych** — z hardcoded slug na multi-trip grid
9. **Optymalizacja /wyjazdy** — 1x `getAllTrips()` zamiast 2x

## Poprawki po code review

- **Bug fix:** /single-parents pobierał wyjazdy z kategorii "rodzinny" zamiast "single-parents"
- **A11y:** `aria-label` na linkach kalendarza (WCAG 2.4.4)
- **DRY:** `toCalendarTrips()` + `getCalendarTrips()` + typ `CalendarTrip` wyeksportowany z `trips.ts`
- **Nity:** spójność function declarations, usunięcie duplikacji typu

## Kluczowe decyzje

- Kolory kategorii: moss → mustard → lavender → terracotta (max kontrast)
- ForestPattern: inline SVG z `aria-hidden`, 2 warianty
- `/wyjazdy` optymalizacja: jedno `getAllTrips()` + derivacja 3 list

## Utworzone/zmodyfikowane pliki

### Nowe
- `src/lib/category-config.ts`
- `src/components/shared/ForestPattern.tsx`

### Zmodyfikowane
- `src/components/shared/TripCalendar.tsx` — kolory z CATEGORY_CONFIG, aria-label, CalendarTrip import
- `src/components/home/TripCard.tsx` — badge kategorii, formatDateRange
- `src/components/trips/TripsFilter.tsx` — import CATEGORY_CONFIG
- `src/lib/utils.ts` — formatDateRange()
- `src/data/trips.ts` — CalendarTrip type, toCalendarTrips(), getCalendarTrips()
- `src/app/(main)/page.tsx` — ForestPattern fairytale, getCalendarTrips()
- `src/app/(main)/wyjazdy/page.tsx` — TripCalendar, ForestPattern realistic, toCalendarTrips()
- `src/app/(main)/wyjazd-z-dziecmi/page.tsx` — sekcja nadchodzących
- `src/app/(main)/matka-z-corka/page.tsx` — sekcja nadchodzących
- `src/app/(main)/dla-doroslych/page.tsx` — multi-trip grid
- `src/app/(main)/single-parents/page.tsx` — fix kategorii + tekst przycisku

## Wyciągnięte wnioski

- **CATEGORY_CONFIG jako SSOT** — nigdy nie hardcodować kolorów kategorii w komponentach
- **Kolory kalendarza** muszą być z różnych części koła barw (amber/coral/terracotta za podobne)
- **`formatDateRange`** — polskie nazwy miesięcy w dopełniaczu hardcoded (Intl.DateTimeFormat nie generuje dopełniacza)
- **Strony kategorii** potrzebują sekcji z wyjazdami (async page + getUpcomingTripsByCategory)
- **Optymalizacja fetch** — jedno `getAllTrips()` + `.filter()` zamiast wielu helperów
- **Tinted badges** (bg-moss/15) nie konkurują z CTA, w odróżnieniu od full-color
- **Code review** złapał krytyczny bug (zła kategoria na /single-parents) — zawsze robić review
