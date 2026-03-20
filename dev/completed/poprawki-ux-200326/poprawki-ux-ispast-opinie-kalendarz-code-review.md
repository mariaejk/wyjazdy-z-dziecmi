# Code Review: Poprawki UX (isPast, opinie, kalendarz)

Last Updated: 2026-03-20

## Podsumowanie

Trzy niezależne zmiany o różnym poziomie ryzyka. Kalendarz dwumiesięczny to solidna implementacja z kilkoma istotnymi problemami do poprawki. Zmiana `isPast` na auto-obliczanie rodzi krytyczny bug SSG — strona będzie pokazywać przyszłe wyjazdy jako "zakończone" lub odwrotnie aż do kolejnego buildu. Sortowanie opinii jest poprawne, ale ma jeden edge case.

## Statystyki

- BLOCKING: 2
- IMPORTANT: 3
- NIT: 4
- SUGGESTION: 3

---

## Problemy

### BLOCKING

#### BLOCKING-1: isPast obliczane w build time, nie runtime (SSG + static export)

**Plik:** `src/data/trips.ts`, linia 19

```ts
isPast: new Date(entry.dateEnd) < new Date(),
```

`new Date()` w Server Component / data function wywoływane jest podczas budowania (`npm run build`). W środowisku Next.js App Router ze statycznym renderowaniem (brak `export const dynamic = 'force-dynamic'`, brak ISR `revalidate`) wartość zostanie "zamrożona" w momencie builda.

**Konsekwencja produkcyjna:**
- Wyjazd z `dateEnd: '2026-04-15'` zbudowany 20 marca → `isPast = false` — OK.
- Ten sam build uruchomiony 16 kwietnia → `isPast` nadal `false` w cache HTML. Wyjazd pojawi się w sekcji "Nadchodzące", nie "Zakończone".
- Odwrotnie: jeśli budujemy po dacie końca, przyszłe wyjazdy są oznaczone jako past od razu.

**Sprawdzenie:** `next.config.ts` nie zawiera `output: 'export'` ani globalnego `revalidate`. Strony `/wyjazdy` i `page.tsx` nie mają `export const revalidate`. Są to prawdopodobnie pełne SSG pages (renderowane raz przy buildzie).

**Rozwiązania do wyboru (wybrać jedno):**

Opcja A — ISR z krótkim revalidate (rekomendowana):
```ts
// src/app/(main)/wyjazdy/page.tsx
export const revalidate = 3600; // odświeżaj co 1 godzinę

// src/app/(main)/page.tsx
export const revalidate = 3600;
```
Plusy: działa bez zmian w logice, Vercel automatycznie przebuduje strony. `isPast` będzie aktualne z max 1h opóźnieniem.

Opcja B — Przekaż `now` jako prop z Server Component:
Nie pomaga przy SSG — `new Date()` i tak jest w build time.

Opcja C — Obliczaj `isPast` client-side w TripCard:
```ts
// TripCard.tsx (lub helper)
const isPast = new Date(trip.dateEnd) < new Date();
```
Wymaga zmiany TripCard na Client Component lub stworzenia oddzielnego client wrapper. Skomplikowane i nie warto.

Opcja D — Zachowaj ręczny `isPast` w CMS (powrót do poprzedniego stanu):
Redaktor ręcznie zaznacza "Zakończony" po każdym wyjeździe. Najprostsze, ale wymaga dyscypliny.

**Rekomendacja:** Opcja A (ISR `revalidate = 3600`) — minimalna zmiana kodu, maksymalne korzyści. Przy bazie kilku wyjazdów rocznie opóźnienie 1h jest całkowicie akceptowalne.

---

#### BLOCKING-2: Parsowanie dat bez strefy czasowej — timezone offset bug

**Plik:** `src/data/trips.ts`, linia 19 i `src/components/shared/TripCalendar.tsx`, linie 76-78

```ts
// trips.ts
isPast: new Date(entry.dateEnd) < new Date(),

// TripCalendar.tsx
const start = new Date(trip.date);
const end = new Date(trip.dateEnd);
```

Daty w YAML mają format `'2026-08-23'` (string ISO bez czasu i strefy). `new Date("2026-08-23")` parsuje datę jako **UTC midnight** (00:00 UTC), nie lokalny czas.

Dla użytkownika w Polsce (UTC+2 latem):
- `new Date("2026-08-23")` = 23 sierpnia 00:00 UTC = **22 sierpnia 22:00 czasu polskiego**
- Wynik: wyjazd kończący się 23 sierpnia jest traktowany jako zakończony już wieczorem 22 sierpnia w kalendarzu i w isPast

**Przykład konkretny z danymi:**
- `dateEnd: '2025-12-07'` → `new Date('2025-12-07')` = 7 grudnia 00:00 UTC = 6 grudnia 23:00 w Polsce → `isPast` = true już 6 grudnia wieczorem.

**Poprawka — użyj `+T00:00` bez strefy lub parsuj ręcznie:**
```ts
// Helper do bezpiecznego parsowania dat lokalnych
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // lokalna północ
}

// W mapTrip:
isPast: parseLocalDate(entry.dateEnd) < new Date(),

// W TripCalendar:
const start = parseLocalDate(trip.date);
const end = parseLocalDate(trip.dateEnd);
```

Ten bug dotyczy zarówno `isPast` (trips.ts) jak i `isDateInRange`/`isStartDay`/`isEndDay` w kalendarzu. Helper warto wyeksportować z `src/lib/utils.ts`.

---

### IMPORTANT

#### IMPORTANT-1: isPast checkbox w CMS jest "dead UI" — dezorientuje redaktorów

**Plik:** `keystatic.config.ts`, linia 48-51

```ts
isPast: fields.checkbox({
  label: "Zakończony",
  defaultValue: false,
}),
```

Pole istnieje w CMS, jest widoczne, można je zaznaczać — ale w `mapTrip` jest ignorowane (linia 19 `src/data/trips.ts`). Redaktor CMS może zaznaczyć "Zakończony" myśląc, że zmiana będzie widoczna, ale nic się nie stanie.

**Opcje:**
1. Usuń pole z Keystatic schema (jeśli auto-isPast ma zostać)
2. Dodaj komentarz w CMS label: `"Zakończony (IGNOROWANE — obliczane automatycznie z daty końca)"`
3. Wróć do ręcznego pola (jeśli fix BLOCKING-1 nie jest implementowany)

Minimum to opcja 2 — zmień label w keystatic.config.ts na informacyjny.

---

#### IMPORTANT-2: Kalendarz — past trips są klikalne (prowadzą na aktywną stronę wyjazdu)

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 139

```tsx
{trip && !trip.isPast && !isFiltered ? (
  <Link href={`${ROUTES.trips}/${trip.slug}`} ...>
    {day}
  </Link>
) : (
  <span>{day}</span>
)}
```

Logika jest poprawna — past trips renderują `<span>`, nie `<Link>`. To dobrze.

**ALE:** Past trips w kalendarzu nie wyświetlają `PAST_CATEGORY.calendarBg` gdy są filtrowane. Sprawdź linie 132-134:
```tsx
trip && !trip.isPast && !isFiltered && CATEGORY_CONFIG[trip.category].calendarBg,
trip && !trip.isPast && isFiltered && "bg-graphite/5 text-graphite-light",
trip && trip.isPast && PAST_CATEGORY.calendarBg,
```

Przy `activeFilter !== null && trip.isPast`: warunek na linii 133 jest fałszywy (bo `!trip.isPast`), warunek na linii 134 jest prawdziwy. Past trip dostanie `PAST_CATEGORY.calendarBg` niezależnie od filtra — to poprawne zachowanie, ale nie jest udokumentowane. **Nie ma tu błędu**, ale warto dodać komentarz dla czytelności.

**Faktyczny problem:** Past trips mają kolor `PAST_CATEGORY.calendarBg` ale kliknięcie na nie... nie ma efektu (span, nie link). Jednak użytkownik może próbować kliknąć nie wiedząc, że to past trip. Rozważ `cursor-default` na past trip cells lub inny indicator.

---

#### IMPORTANT-3: Brak `aria-live` na zmiany filtra w kalendarzu

**Plik:** `src/components/shared/TripCalendar.tsx`

Gdy użytkownik kliknie filtr kategorii, wizualnie zmienia się zawartość kalendarza. Screen reader nie dostaje żadnej informacji o tej zmianie.

**Propozycja:**
```tsx
<div
  className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6"
  aria-live="polite"
  aria-atomic="false"
>
```

Lub alternatywnie — status message:
```tsx
<div className="sr-only" aria-live="polite">
  {activeFilter ? `Filtrowanie: ${CATEGORY_CONFIG[activeFilter].label}` : "Wszystkie kategorie"}
</div>
```

---

### NIT

#### NIT-1: Header kalendarza — niezgrabne wyświetlanie przy przełomie roku

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 194

```tsx
{MONTH_NAMES[currentMonth]} – {MONTH_NAMES[next.month]} {next.year !== currentYear ? `${currentYear}/${next.year}` : currentYear}
```

Wyświetli: "Grudzień – Styczeń 2026/2027" — ale rok 2026 dotyczy Grudnia, 2027 dotyczy Stycznia. Format `2026/2027` jest niejednoznaczny.

Lepszy format: "Grudzień 2026 – Styczeń 2027"

```tsx
{next.year !== currentYear
  ? `${MONTH_NAMES[currentMonth]} ${currentYear} – ${MONTH_NAMES[next.month]} ${next.year}`
  : `${MONTH_NAMES[currentMonth]} – ${MONTH_NAMES[next.month]} ${currentYear}`
}
```

---

#### NIT-2: Sortowanie opinii — `localeCompare` na datach ISO jest OK, ale nieoczywiste

**Plik:** `src/data/testimonials.ts`, linia 24

```ts
return b.date.localeCompare(a.date);
```

Daty ISO 8601 (`YYYY-MM-DD`) sortują się poprawnie leksykograficznie — `localeCompare` zadziała prawidłowo dla tego formatu. Nie ma tu błędu, ale dla przyszłych maintainerów może być nieoczywiste.

Alternatywa czytelniejsza intencyjnie:
```ts
return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
```
Lub po prostu komentarz: `// ISO dates sort correctly as strings`.

---

#### NIT-3: `MonthGrid` renderuje niezdefiniowane `key` dla pustych komórek

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 118

```tsx
<div key={`empty-${i}`} className="aspect-square" />
```

`i` jest indeksem w `cells` tablicy (łączącej `null` i liczby). Dla miesiąca z firstDay=3, będzie `empty-0`, `empty-1`, `empty-2`. To jest prawidłowe. Ale jeśli kiedykolwiek zmieni się struktura cells (np. trailing empty cells zostaną dodane), klucze mogą nie być unikalne. Lepiej użyć `key={`empty-${month}-${i}`}`.

---

#### NIT-4: Keystatic — brak kategorii `single-parents` i `dla-doroslych` w trips schema

**Plik:** `keystatic.config.ts`, linie 33-37

```ts
category: fields.select({
  options: [
    { label: "Rodzinny", value: "rodzinny" },
    { label: "Matka z córką", value: "matka-corka" },
  ],
```

Brak opcji `single-parents` i `dla-doroslych`. Redaktor CMS nie może przypisać wyjazdu do tych kategorii przez UI — musiałby edytować YAML ręcznie.

Uzupełnij:
```ts
{ label: "Single parents", value: "single-parents" },
{ label: "Dla dorosłych", value: "dla-doroslych" },
```

---

### SUGGESTION

#### SUGGESTION-1: Wydziel `parseLocalDate` do `src/lib/utils.ts`

Parsing dat bez timezone będzie potrzebny w wielu miejscach (trips.ts, TripCalendar.tsx, potencjalnie earlyBirdDeadline). Scentralizowany helper uniknie duplikacji i gwarantuje spójność.

```ts
// src/lib/utils.ts
/** Parses YYYY-MM-DD string as local midnight, avoiding UTC offset issues. */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
```

---

#### SUGGESTION-2: `getFeaturedTestimonials` — dokumentacja zachowania kolejności

**Plik:** `src/data/testimonials.ts`, linia 28-35

```ts
export async function getFeaturedTestimonials(ids: string[]): Promise<Testimonial[]> {
  const all = await getTestimonials(); // już posortowane od najnowszych
  return ids
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is Testimonial => t !== undefined);
}
```

Zachowanie jest poprawne i sprytne: `ids.map(...find...)` zachowuje kolejność zdefiniowaną przez tablicę `ids` (redaktor CMS decyduje o kolejności wyróżnionych opinii), nie przez datę. Ale `getTestimonials()` jest teraz posortowane, więc `all.find()` przeszuka posortowaną kolekcję — wynik zależy od kolejności `ids`, nie od dat. To jest pożądane zachowanie.

Warto dodać komentarz:
```ts
// Preserves the order of ids (editorial order), not sort order from getTestimonials().
```

---

#### SUGGESTION-3: Nawigacja wstecz poniżej bieżącego miesiąca

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 166-170

Przycisk "Poprzedni miesiąc" pozwala cofać się bez limitu — można nawigować do przeszłości. Można rozważyć zablokowanie przycisku dla miesięcy wcześniejszych niż bieżący (lub poprzedni miesiąc, by widać było zakończone wyjazdy):

```tsx
const isPrevDisabled = currentYear < now.getFullYear() ||
  (currentYear === now.getFullYear() && currentMonth <= now.getMonth());

<button
  onClick={goToPrevMonth}
  disabled={isPrevDisabled}
  aria-disabled={isPrevDisabled}
  className={cn(
    "rounded-md p-1.5 ...",
    isPrevDisabled && "opacity-40 cursor-not-allowed"
  )}
  aria-label="Poprzedni miesiąc"
>
```

To jest sugestia UX, nie błąd.

---

## Dobre praktyki

- `CATEGORY_CONFIG` jako Single Source of Truth — spójne z wzorcem projektu, poprawnie importowane w kalendarzu i legendzie.
- `MonthGrid` wydzielony jako osobna funkcja wewnętrzna — dobra separacja odpowiedzialności, nie wymaga osobnego pliku bo jest specyficzny dla TripCalendar.
- `aria-pressed` na przyciskach filtra — poprawny ARIA pattern dla toggle buttons.
- `aria-label` na nawigacji kalendarza i legendzie — zgodne z wzorcem projektu.
- `role="region"` + `aria-label` na głównym kontenerze kalendarza — poprawne, zgodne z wymogami a11y z CLAUDE.md.
- `cn()` używane konsekwentnie — zgodnie ze standardem projektu.
- `isDateInRange` normalizuje daty do midnight przed porównaniem — dobry pomysł (choć nadal dotyczy UTC, patrz BLOCKING-2).
- `toCalendarTrips()` jako lightweight mapper — optymalizacja przesyłanych danych do Client Component.
- `getNextMonth` / `getPrevMonth` jako pure functions — testowalność, czystość.
- Sortowanie opinii: edge cases obsłużone (brak daty u jednej/obu stron) — poprawna logika.
- `getFeaturedTestimonials` korzysta z `getTestimonials()` zamiast duplikować reader logic — Single Source of Truth.
- Warianty `ForestPattern` (`fairytale` na homepage, `realistic` na /wyjazdy) — spójne z zamierzeniem designu z CLAUDE.md.
- `/wyjazdy` page: jeden `getAllTrips()` call, trzy derivations — optymalizacja zgodna z "Optimize data fetching on listing pages" z lessons learned.

---

## Priorytety naprawy

1. **BLOCKING-1** (ISR revalidate) — bez tego cała logika auto-isPast jest bezużyteczna lub szkodliwa w produkcji
2. **BLOCKING-2** (parseLocalDate) — timezone bug wpływa na isPast i wyświetlanie w kalendarzu
3. **IMPORTANT-1** (dead UI w CMS) — dezorientuje redaktorów, wymaga 5 minut pracy
4. **NIT-4** (brak kategorii w Keystatic) — funkcjonalna luka, łatwa do naprawy
5. **NIT-1** (header kalendarza przy przełomie roku) — kosmetyczne, ale widoczne

## Następne kroki

Przed implementacją fixes — zatwierdzić, które opcje są wybrane:
- Dla BLOCKING-1: ISR revalidate vs. powrót do ręcznego isPast?
- Dla IMPORTANT-1: usunąć pole z CMS czy zostawić z informacyjnym labelem?
