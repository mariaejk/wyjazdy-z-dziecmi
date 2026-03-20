# Zadania: Kategorie, kalendarz, wzór lasu

## Faza A: Fundament — kolory kategorii i format dat

- [x] A1. Nowy plik `src/lib/category-config.ts` — Single Source of Truth kolorów
- [x] A2. Zmiana kolorów kalendarza `TripCalendar.tsx` → import z CATEGORY_CONFIG
- [x] A3. `formatDateRange(start, end)` w `utils.ts`
- [x] A4. Zakres dat na kartach `TripCard.tsx` — `formatDateRange` zamiast `formatDate`
- [x] A5. Zmiana tekstu "Zobacz wszystkie wyjazdy" → "Zobacz wszystkie warsztaty" (`single-parents`)

## Faza B: Funkcjonalność — belka kategorii, sekcje wyjazdów, kalendarz

- [x] B1. Badge kategorii na kartach `TripCard.tsx` (tinted bg + text)
- [x] B2. Sekcja "Nadchodzące wyjazdy" na `/wyjazd-z-dziecmi` (async + getUpcomingTripsByCategory)
- [x] B3. Sekcja "Nadchodzące wyjazdy" na `/matka-z-corka` (async + getUpcomingTripsByCategory)
- [x] B4. Sekcja "Nadchodzące wyjazdy" na `/dla-doroslych` (refaktor z single trip na multi-trip)
- [x] B5. Kalendarz `TripCalendar` na `/wyjazdy` + optymalizacja fetch (jedno getAllTrips)
- [x] B6. Aktualizacja `TripsFilter` — import CATEGORY_CONFIG, 4 kategorie

## Faza C: Dekoracje — wzór lasu za kalendarzem

- [x] C1. Komponent `ForestPattern` — fairytale + realistic warianty (inline SVG)
- [x] C2. Integracja: fairytale na stronie głównej, realistic na /wyjazdy

## Do poprawy po review

- [x] 🔴 [blocking] **single-parents/page.tsx:59** — `getUpcomingTripsByCategory("rodzinny")` → `"single-parents"` ✅
- [x] 🟠 [important] **TripCalendar.tsx:164–173** — dodano `aria-label` na linkach kalendarza (WCAG 2.4.4) ✅
- [x] 🟠 [important] **TripCalendar.tsx:81–88** — dodano komentarz dokumentujący założenie (1 wyjazd/dzień) ✅
- [x] 🟠 [important] **page.tsx + wyjazdy/page.tsx** — wyciągnięto do `toCalendarTrips()` + `getCalendarTrips()` w `trips.ts` ✅
- [x] 🟡 [nit] **TripCalendar.tsx** — `isToday` arrow → function declaration, usunięto podwójną pustą linię ✅
- [x] 🟡 [nit] **TripCalendar.tsx** — usunięto duplikację typu `CalendarTrip` → import z `trips.ts` ✅

## Weryfikacja

- [x] `npm run build` — zero błędów (27 stron)
- [ ] Wizualny przegląd na Vercel (deploy pending)
- [x] Code review — 2026-03-20 (raport: review-all.md)
- [x] Poprawki po review — build OK (27 stron, 0 błędów)
- [x] Merge do master — 2026-03-20
