# Code Review: Kategorie, kalendarz, wzór lasu

**Data:** 2026-03-20
**Branch:** `feature/kategorie-kalendarz-las`
**Commit:** 761f24d

## Podsumowanie

Implementacja solidna — wzorce projektu respektowane, TypeScript czysty, architektura spójna. Jeden błąd krytyczny wymaga natychmiastowej poprawki (zła kategoria na /single-parents). Kilka problemów ważnych dotyczy dostępności kalendarza i duplikacji kodu.

## Statystyki

- Plików sprawdzonych: 12
- 🔴 [blocking]: 1
- 🟠 [important]: 3
- 🟡 [nit]: 4
- 🔵 [suggestion]: 2

---

## Problemy

### 🔴 Blocking

- **`src/app/(main)/single-parents/page.tsx:59`** — Strona `/single-parents` pobiera `getUpcomingTripsByCategory("rodzinny")` zamiast `"single-parents"`. Użytkownik widzi wyjazdy rodzinne zamiast dedykowanych single parents. Błąd logiki biznesowej widoczny produkcyjnie.

### 🟠 Important

- **`src/components/shared/TripCalendar.tsx:164–173`** — Linki kalendarza bez dostępnego tekstu. Link renderuje tylko cyfrę dnia. WCAG 2.4.4 wymaga opisowego celu linku. Poprawka: `aria-label={`${trip.title} — ${day}`}`.

- **`src/components/shared/TripCalendar.tsx:81–88`** — `getTripForDay` zwraca `Array.find()` = tylko pierwszy pasujący wyjazd. Gdy dwa wyjazdy nakładają się na dany dzień, kalendarz pokaże błędny kolor/link. Dodać komentarz dokumentujący założenie lub obsłużyć kolizję.

- **Duplikacja `calendarTrips` mapping** — Identyczny blok `allTrips.map(t => ({ slug, title, date, dateEnd, category, isPast }))` w `page.tsx` i `wyjazdy/page.tsx`. Wyciągnąć do helpera `getCalendarTrips()` w `src/data/trips.ts`.

### 🟡 Nit

- **`TripCard.tsx:40`** — `mb-3` na końcu klasy zamiast na początku (spacing → layout).
- **`TripCalendar.tsx:100`** — `isToday` jako arrow function, reszta helperów jako `function` — niespójność stylu.
- **`TripCalendar.tsx:28`** — podwójna pusta linia między stałą a funkcją.
- **`TripsFilter.tsx:26`** — zbędne nawiasy wokół wyrażenia w ternary.

### 🔵 Suggestions

- **Helper `getCalendarTrips()`** w `src/data/trips.ts` — eliminuje duplikację i centralizuje mapowanie danych kalendarza.
- **Komentarz JSDoc** na `ForestPattern` props — warianty `fairytale` vs `realistic` z opisem kiedy używać.

---

## Dobre praktyki ✅

- `CATEGORY_CONFIG` jako Single Source of Truth — wzorcowo
- `CategoryKey = Trip["category"]` eliminuje duplikację union type
- `Object.keys(CATEGORY_CONFIG)` w walidacji URL kategorii
- `aria-hidden` + `pointer-events-none` na SVG dekoracji
- `Suspense` wokół `TripsFilter` z `useSearchParams`
- Optymalizacja jednego `getAllTrips()` z derivacją trzech list na `/wyjazdy`
- Polskie znaki UTF-8 konsekwentnie
- ForestPattern — dwa warianty inline SVG, czysta implementacja
