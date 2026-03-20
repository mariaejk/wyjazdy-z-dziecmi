# Podsumowanie: Poprawki klientki 03.03.2026

**Data ukończenia:** 2026-03-03
**Commit:** `92330bf` (poprawki) + post-review fixes
**Pliki zmienione:** 68 | +1725 / -237 linii
**Zadania:** 33/33 ukończone + 6 poprawek z code review

---

## Co zostało dostarczone

### Nowe strony (4)
- `/blog` — artykuł "Jak przygotować dziecko na wyjazd warsztatowy" + NewsletterForm
- `/galeria` — masonry grid z 17 zdjęciami
- `/matka-z-corka` — dedykowana landing page z CTA do filtrowanych wyjazdów
- `/wyjazd-z-dziecmi` — zastępuje `/single-parents` (redirect 301)

### Nowe komponenty (5)
- `TripCalendar` — interaktywny kalendarz wyjazdów (na głównej i /wyjazdy)
- `PastTripsSection` — archiwalne wyjazdy z badge "Zakończony"
- `WaitlistForm` — lista oczekujących (gdy spotsLeft === 0)
- Galeria z masonry grid
- ContentBlocks — zdjęcia przeplatane z tekstem na podstronach wyjazdów

### Nowe API routes (1)
- `/api/waitlist` — Zod + honeypot + rate limit + GA4 tracking

### Nowe dane wyjazdów (4)
- Zlot Kaczek III edycja (20-23.08.2026)
- Rodzinny tydzień z końmi i jogą (1-7.08.2026)
- W Kręgu Uważności (29-31.05.2026)
- Archiwalny Zlot Kaczek Świąteczny (5-7.12.2025, isPast: true)

### Zmiany UI/UX
- Logo większe (80px) + klikalny tekst obok
- Kategorie wyjazdów z filtrowaniem (?kategoria=matka-corka)
- contentBlocks zamiast Gallery — zdjęcia między blokami tekstu
- USP "Jedyne w Polsce..." na stronie głównej
- Inkluzywny język (babcie, ciocie, koleżanki)
- priceIncludes/priceExcludes na podstronach wyjazdów

---

## Poprawki z Code Review

Po głównym commicie przeprowadzono code review (0 blocking, 3 important, 4 nit, 3 suggestion). Naprawiono:

1. **NewsletterForm.tsx** — `useEffect` z setState zamieniony na React "adjust state during render" pattern (eliminuje dodatkowy commit+paint cycle)
2. **TripCalendar.tsx** — dodano `aria-label="Kalendarz wyjazdów"` + `role="region"` (dostępność)
3. **waitlist.ts + route.ts** — unicode escapes → literalne UTF-8 (spójność z resztą walidacji)
4. **trips.ts** — uzupełniono brakujące `spotsLeft` (zlot-kaczek-2026) i `spotsTotal` (zlot-kaczek-swieta-2025)
5. **blog/page.tsx** — `\u201E`/`\u201D` → `„"`, `&mdash;` → `—` (spójność kodowania)
6. **WaitlistForm.tsx** — dodano komentarz wyjaśniający cast `as unknown as true`

---

## Kluczowe decyzje

- **contentBlocks zamiast Gallery** — zdjęcia przeplatane z tekstem lepiej oddają charakter wyjazdów
- **Trip categories z filtrowaniem** — parametr URL `?kategoria=X` zamiast osobnych stron
- **WaitlistForm** — formularz listy oczekujących zamiast ukrywania wyprzedanych wyjazdów
- **TripCalendar** — wizualny kalendarz na stronie głównej i /wyjazdy z kolorami kategorii
- **PastTripsSection** — archiwalne wyjazdy z badge "Zakończony — komplet" jako social proof
- **React "adjust state during render"** — lepszy niż useEffect do resetowania stanu przy nawigacji

---

## Wyciągnięte wnioski (Lessons Learned)

- **`contentBlocks` pattern**: Tablica `{ type: "text" | "image", text?, src?, alt? }` w danych wyjazdów. Elastyczny układ bez komponentu Gallery.
- **Kategorie z filtrem URL**: `?kategoria=matka-corka` + `useSearchParams()` — prostsza architektura niż osobne strony per kategoria.
- **React "adjust state during render"**: `if (pathname !== prevPathname) { setPrevPathname(pathname); reset(); }` — eliminuje useEffect anti-pattern i dodatkowy cykl renderowania.
- **`role="region"` + `aria-label`**: Interaktywne komponenty jak kalendarz potrzebują obu atrybutów dla czytników ekranu.
- **Spójność kodowania**: W `.tsx` używaj literalnych polskich znaków i cudzysłowów (`„"`). Unicode escapes (`\u201E`) są trudniejsze do czytania i niespójne.
- **spotsTotal/spotsLeft pary**: Zawsze podawaj oba — nawet jeśli kod warunkowy nie wymaga obu, dane powinny być kompletne.

---

## Główne pliki utworzone/zmodyfikowane

### Nowe pliki
- `src/components/shared/TripCalendar.tsx`
- `src/components/home/PastTripsSection.tsx`
- `src/components/trips/WaitlistForm.tsx`
- `src/app/blog/page.tsx`
- `src/app/galeria/page.tsx`
- `src/app/matka-z-corka/page.tsx`
- `src/app/wyjazd-z-dziecmi/page.tsx`
- `src/app/api/waitlist/route.ts`
- `src/lib/validations/waitlist.ts`

### Zmodyfikowane pliki (główne)
- `src/data/trips.ts` — 4 nowe wyjazdy, contentBlocks, priceIncludes/priceExcludes
- `src/data/navigation.ts` — nowe strony w nawigacji
- `src/components/layout/Header.tsx` — logo 80px, klikalny tekst
- `src/components/home/HeroSection.tsx` — nowe USP, zmiana copy
- `src/components/shared/NewsletterForm.tsx` — refaktor useState
- `src/types/trip.ts` — nowe opcjonalne pola (contentBlocks, priceIncludes, priceExcludes, earlyBirdDeadline)
