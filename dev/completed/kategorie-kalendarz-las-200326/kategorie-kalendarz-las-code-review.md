# Code Review: Kategorie, kalendarz, wzór lasu

Last Updated: 2026-03-20

---

## Podsumowanie

Implementacja jest generalnie solidna — wzorce projektu są respektowane, architektura spójna, TypeScript czysty. Jeden błąd krytyczny (zła kategoria w `single-parents/page.tsx`) wymaga natychmiastowej poprawki. Kilka problemów ważnych dotyczy dostępności kalendarza i duplikacji kodu.

---

## Statystyki

- Plików sprawdzonych: 12
- Blocking: 1
- Important: 4
- Nit: 4
- Suggestion: 2

---

## Problemy

### Blocking

**[B1] `single-parents/page.tsx:59` — zła kategoria wyjazdu**

```ts
const trips = await getUpcomingTripsByCategory("rodzinny"); // BUG
```

Strona Single Parents pobiera wyjazdy z kategorii `"rodzinny"` zamiast `"single-parents"`. Skutek: na stronie /single-parents pojawiają się wyjazdy rodzinne z dziećmi, nie dedykowane single parents. To błąd logiki biznesowej widoczny dla użytkownika.

Poprawka:
```ts
const trips = await getUpcomingTripsByCategory("single-parents");
```

---

### Important

**[I1] `TripCalendar.tsx:164–173` — linki kalendarza bez dostępnego tekstu**

Każdy dzień wyjazdu renderuje `<Link>` z samą cyfrą dnia jako treścią. Screen reader odczyta "15" zamiast nazwy wyjazdu. Wymaganie: WCAG 2.4.6 (Headings and Labels) oraz 2.4.4 (Link Purpose).

```tsx
<Link
  href={`${ROUTES.trips}/${trip.slug}`}
  className="flex h-full w-full items-center justify-center hover:opacity-80"
  title={trip.title}  // title nie wystarczy — nie jest czytany przez wszystkie czytniki
>
  {day}
</Link>
```

Poprawka — dodać `aria-label`:
```tsx
<Link
  href={`${ROUTES.trips}/${trip.slug}`}
  className="flex h-full w-full items-center justify-center hover:opacity-80"
  aria-label={`${trip.title} — ${day}`}
>
  {day}
</Link>
```

**[I2] `TripCalendar.tsx:81–88` — `getTripForDay` zwraca tylko pierwszy wyjazd w dniu**

```ts
return trips.find((trip) => { ... }); // find, nie filter
```

Jeśli dwa wyjazdy nakładają się na ten sam dzień (np. jeden kończy się tego dnia, drugi zaczyna), kalendarz pokaże tylko pierwszy. W obecnym stanie danych to nie jest problem, ale przy rozbudowie oferty (kilka wyjazdów w tym samym tygodniu) komórka będzie pokazywać zły kolor lub link. Warto dodać komentarz `// zakładamy że wyjazdy się nie nakładają` albo obsłużyć nakładanie się.

**[I3] `ForestPattern.tsx` — brak `role="img"` nie jest problemem (aria-hidden OK), ale komponent nie jest Server Component przez klasę Tailwind z `currentColor`**

Ważniejszy problem: `className="text-moss"` i `className="text-moss-light"` są używane na elementach SVG (`<g>`) przez Tailwind, ale Tailwind generuje klasy `text-*` jako `color` CSS. Wewnątrz SVG `fill="currentColor"` dziedziczy `color` z rodzica. To poprawne — ale wymaga, żeby Tailwind wiedział o tych klasach w czasie build (JIT). Jeśli `text-moss-light` nie pojawia się nigdzie indziej w projekcie, może być niebezpiecznie pomijany przez purger.

Sprawdź czy `text-moss-light` jest w safelist lub używany w innym miejscu. Jeśli nie — dodaj do CSS lub safelist:
```css
/* globals.css */
@source safe-list: ["text-moss-light"];
```

**[I4] `page.tsx` (strona główna) — duża duplikacja kodu mapowania `calendarTrips`**

Identyczny blok mapowania `calendarTrips` pojawia się w dwóch miejscach:

- `src/app/(main)/page.tsx:16–23`
- `src/app/(main)/wyjazdy/page.tsx:26–33`

```ts
const calendarTrips = allTrips.map((t) => ({
  slug: t.slug,
  title: t.title,
  date: t.date,
  dateEnd: t.dateEnd,
  category: t.category,
  isPast: t.isPast,
}));
```

Ten mapping powinien być w `src/data/trips.ts` jako helper `getCalendarTrips()` lub typ `CalendarTrip` powinien być eksportowany z `TripCalendar.tsx` i używany w helperze. Obecna duplikacja nie jest blokerem, ale przy trzecim użyciu stanie się długiem technicznym.

---

### Nit

**[N1] `TripCard.tsx:40–41` — kolejność klas `mb-3` na początku vs na końcu**

```tsx
<div className="flex flex-wrap items-center gap-2 mb-3">
```

W projekcie konwencja Tailwind to klasy układu przed spacingiem. Lepiej: `"mb-3 flex flex-wrap items-center gap-2"`. Drobnostka, ale projekt jest generalnie konsekwentny.

**[N2] `TripCalendar.tsx:100–102` — `isToday` jako arrow function, pozostałe jako `function`**

```ts
const isToday = (day: number) => { ... }; // arrow
function getTripForDay(...) { ... }        // function declaration
```

Niespójność stylu w obrębie jednego komponentu. Wszystkie helperowe funkcje wewnątrz komponentu powinny używać jednego stylu. Preferowany w projekcie wygląda na `function` declaration (jak `goToPrevMonth`, `goToNextMonth`, `getTripForDay`, `isStartDay`, `isEndDay`).

**[N3] `TripCalendar.tsx:28` — podwójna pusta linia**

```ts
const DAY_NAMES = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];
                                                          // <- pusta linia
                                                          // <- pusta linia (nadmiarowa)
function getDaysInMonth(...) {
```

**[N4] `TripsFilter.tsx:26` — zbędne nawiasy**

```ts
const subtitle = validCategory
  ? (CATEGORY_CONFIG[validCategory].label)  // nawiasy niepotrzebne
  : "Wybierz swój wyjazd i dołącz do nas!";
```

---

### Suggestion

**[S1] `formatDateRange` — brak obsługi błędnego wejścia**

Jeśli `trip.dateEnd` jest pustym stringiem lub `undefined` (edge case przy nowych wpisach w CMS), `new Date("")` daje `Invalid Date` i funkcja zwróci `"NaN NaN undefined NaN"`. Warto dodać guard:

```ts
export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return String(start);
  // ... reszta
}
```

**[S2] `TripCalendar.tsx` — brak obsługi klawiatury dla nawigacji kalendarza (keyboard trap)**

Przyciski `goToPrevMonth`/`goToNextMonth` działają na kliknięcie, ale użytkownik klawiatury przechodzący przez komórki kalendarza nie ma łatwego sposobu na zmianę miesiąca bez wychodzenia z komponentu. Nie jest to bloker (przyciski są focusowalne), ale UX klawiatury mógłby być lepszy — np. obsługa strzałek lewo/prawo na poziomie `role="region"`.

---

## Dobre praktyki

- `CATEGORY_CONFIG` jako Single Source of Truth — wzorcowo zaimplementowane. Kolory kalendarza, legendy i badge kart wszystkie płyną z jednego pliku. Brak hardkodowania kolorów w komponentach.
- `CategoryKey = Trip["category"]` — eleganckie wyprowadzenie typu z istniejącej definicji. Brak duplikacji union type.
- `PAST_CATEGORY` jako oddzielny export — dobra decyzja, żeby nie wciskać "zakończone" do `CATEGORY_CONFIG` (nie jest to prawdziwa kategoria wyjazdu).
- `Object.keys(CATEGORY_CONFIG) as CategoryKey[]` w `TripsFilter` — automatyczna walidacja kategorii URL bez hardkodowania listy. Zgodnie z lessons learned.
- `aria-hidden="true"` na obu wariantach SVG, `pointer-events-none` na wrapperze — poprawna implementacja dekoracji.
- `preserveAspectRatio="none"` na SVG — właściwe dla pełnoszerokościowego wzoru tła.
- `getAllTrips()` raz z derivacją `upcomingTrips`/`pastTrips`/`calendarTrips` w `wyjazdy/page.tsx` — optymalizacja z lessons learned, brak zbędnych wywołań.
- Warunkowe renderowanie `{trips.length > 0 && ...}` na stronach kategorii — czyste, bez pustych sekcji.
- `Suspense fallback={null}` wokół `TripsFilter` (który używa `useSearchParams`) — poprawna obsługa zgodnie z Next.js App Router wymogami.
- `role="region"` + `aria-label="Kalendarz wyjazdów"` na kalendarzu — dobra implementacja dostępności kontenera.
- Spójny CTA "Zobacz wszystkie warsztaty" na wszystkich 4 stronach kategorii — zgodny z briefem.
- Obydwa warianty ForestPattern mają odmienne rozmiary (`h-24/sm:h-32` fairytale vs `h-28/sm:h-36` realistic) — świadoma decyzja projektowa pasująca do charakteru wzorów.

---

## Następne kroki

1. **Natychmiast**: poprawić `single-parents/page.tsx:59` — zmienić `"rodzinny"` na `"single-parents"`.
2. **Przed mergem**: dodać `aria-label` do linków kalendarza (I1).
3. **Przed mergem**: zweryfikować czy `text-moss-light` jest w Tailwind JIT safelist lub używany gdzie indziej (I3).
4. **Jako refactor**: wyciągnąć mapping `calendarTrips` do helpera w `trips.ts` (I4).
5. **Opcjonalnie**: ujednolicić styl funkcji w `TripCalendar.tsx` (N2), drobne nity N1/N3/N4.
