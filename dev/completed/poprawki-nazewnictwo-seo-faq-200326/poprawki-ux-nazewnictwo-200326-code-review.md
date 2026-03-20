# Code Review: Poprawki UX + nazewnictwo

Last Updated: 2026-03-20

Committy: `1960c61` (auto-isPast, opinie od najnowszych, kalendarz 2-miesięczny) + `270f680` (poprawki nazewnictwa, wyrównanie kart, czystszy kalendarz)

---

## Statystyki

- 🔴 [blocking]: 2
- 🟠 [important]: 3
- 🟡 [nit]: 5
- 🔵 [suggestion]: 3

---

## 🔴 Problemy blokujące (BLOCKING)

### 1. `formatDateRange` nadal używa `new Date()` zamiast `parseLocalDate()`

**Plik:** `src/lib/utils.ts`, linie 30–31

```ts
const s = new Date(start);
const e = new Date(end);
```

`formatDateRange` jest wywoływana z `trip.date` i `trip.dateEnd` (stringi YYYY-MM-DD) w `TripCard.tsx` linii 43. Przy strefie czasowej UTC+2 (`new Date("2026-04-15")`) zwraca `2026-04-14T22:00:00Z` — czyli dzień wcześniej. Dla dat granicznych (np. 1 maja) wyświetliłoby się "30 kwietnia – 1 maja" zamiast "1–4 maja".

`formatDate` (linia 19) i `formatDateShort` (linia 26) mają ten sam problem, ale są używane rzadziej — warto naprawić jednocześnie.

**Naprawa:**
```ts
export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = typeof start === "string" ? parseLocalDate(start) : start;
  const e = typeof end === "string" ? parseLocalDate(end) : end;
  // reszta bez zmian
}
```

To samo podejście dla `formatDate` i `formatDateShort`.

---

### 2. `isPast` w CMS jest ignorowany ale nadal obecny w schemacie — ryzyko dezorientacji

**Plik:** `keystatic.config.ts`, linia 48–51

```ts
isPast: fields.checkbox({
  label: "Zakończony (ignorowane — obliczane automatycznie z daty końca)",
  defaultValue: false,
}),
```

Pole jest widoczne w CMS, użytkownik (klientka) może je zaznaczyć wierząc, że coś zmienia. Tymczasem `mapTrip()` w `trips.ts` całkowicie ignoruje wartość z CMS i oblicza `isPast` samodzielnie. Nie jest to błąd runtime, ale **dezinformacja w interfejsie CMS** — klientka może spędzić czas próbując zarządzać tym polem.

Bardziej problematyczne: jeśli kiedyś zostanie wywołane `entry.isPast` przez pomyłkę, wróci stara wartość ze starego commitu.

**Naprawa krótkoterminowa:** Zmienić label na "⚠️ To pole nie jest używane — data końca decyduje automatycznie". Docelowo usunąć z schematu (wymaga migracji YAML).

---

## 🟠 Ważne (IMPORTANT)

### 3. `h-full` na `ScrollAnimation` tylko w jednym miejscu — niespójność

**Plik:** `src/app/(main)/wyjazdy/page.tsx`, linia 71

```tsx
<ScrollAnimation key={trip.slug} delay={index * 0.15} className="h-full">
```

Na stronie `/wyjazdy` dodano `className="h-full"` do `ScrollAnimation` owijającego karty zakończonych wyjazdów. Natomiast na stronie głównej (`TripCardsSection.tsx`, linia 23–29) i na stronach kategorii (`wyjazd-z-dziecmi`, `matka-z-corka`, `dla-doroslych`, `single-parents`) — brak `h-full`. `Card` ma teraz `h-full flex-col`, więc równe wysokości kart w gridzie działają tylko jeśli rodzic (`ScrollAnimation`/`motion.div`) też ma `h-full`.

W praktyce: na stronie `/wyjazdy` w sekcji "Zakończone warsztaty" jest 2-kolumnowy grid — karty wyrównają się. Na stronie głównej (`TripCardsSection`) jest 3-kolumnowy grid bez `h-full` na `ScrollAnimation` — karty w tym samym rzędzie mogą mieć nierówne wysokości jeśli mają różny tekst.

**Naprawa:** Dodać `className="h-full"` do `ScrollAnimation` wszędzie tam, gdzie `TripCard` jest w gridzie:
- `TripCardsSection.tsx` linia 23
- `PastTripsSection.tsx` linia 22
- Wszystkie strony kategorii: `wyjazd-z-dziecmi`, `matka-z-corka`, `dla-doroslych`, `single-parents`

---

### 4. Niespójne nazewnictwo w sekcjach trips na stronach kategorii

**Pliki:** `wyjazd-z-dziecmi/page.tsx` linia 158, `matka-z-corka/page.tsx` linia 161, `dla-doroslych/page.tsx` linia 127, `single-parents/page.tsx` linia 127

We wszystkich czterech stronach kategorii sekcja z wyjazdami ma tytuł:
```
title="Nadchodzące wyjazdy"
```

Tymczasem na `/wyjazdy` i w `TripCardsSection.tsx` (strona główna) tytuł to:
```
title="Nadchodzące warsztaty"
```

Commit `270f680` zaktualizował `TripCardsSection` i `/wyjazdy` ale pominął 4 strony kategorii. Niekonsekwencja: te same events są "warsztaty" na stronie głównej i "wyjazdy" na stronach kategorii.

**Decyzja do podjęcia:** Jeśli projekt stosuje "warsztaty" (co wynika z committu nazewnictwa) — zaktualizować tytuły na stronach kategorii do "Nadchodzące warsztaty". Jeśli "wyjazdy" jest celowo inne na stronach kategorii — udokumentować wyjątek.

---

### 5. Strona `/wyjazdy/[slug]` nie ma `revalidate = 3600`

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`

Strony dynamiczne tripów wyświetlają `isPast` (linia 98: `isPast={trip.isPast}`) i warunkowo pokazują `BookingForm`/`WaitlistForm`/`StickyBookingCTA` (linie 143–151). Bez `revalidate`, Next.js SSG wygeneruje strony statycznie raz — gdy wymagany wyjazd dobiegnie końca, strona będzie nadal pokazywać "Zarezerwuj miejsce" dopóki ręcznie nie nastąpi redeploy lub ISR.

Wszystkie inne strony zależne od `isPast` mają już `revalidate = 3600`. Pominięcie `[slug]/page.tsx` to luka w spójności.

**Naprawa:** Dodać `export const revalidate = 3600;` do `src/app/(main)/wyjazdy/[slug]/page.tsx`.

---

## 🟡 Uwagi drobne (NIT)

### 6. `TripCalendar` — strzałka wstecz na lewym miesiącu może cofnąć poniżej bieżącego miesiąca

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 194–197

```ts
function goToPrevMonth() {
  const prev = getPrevMonth(currentYear, currentMonth);
  setCurrentYear(prev.year);
  setCurrentMonth(prev.month);
}
```

Brak dolnego ograniczenia. Użytkownik może klikać w lewo w nieskończoność i trafić do minionych miesięcy. Przy aktualnych danych (tylko przyszłe warsztaty) to nie psuje UX, ale może dezorientować — kalendarz pokazuje "Marzec 2025" bez żadnych wpisów.

**Sugestia:** Zablokować `onPrev` gdy lewy miesiąc to bieżący miesiąc:
```ts
const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === now.getMonth();
// w MonthGrid: onPrev={isCurrentMonth ? undefined : goToPrevMonth}
```

---

### 7. Klucz `key={`empty-${month}-${i}`}` w kalendarzu może się powtórzyć między miesiącami

**Plik:** `src/components/shared/TripCalendar.tsx`, linia 146

```tsx
return <div key={`empty-${month}-${i}`} className="aspect-square" />;
```

W 2-miesięcznym widoku oba `MonthGrid` są w tym samym drzewie React. Klucze `empty-3-0`, `empty-3-1` w marcu i `empty-4-0`, `empty-4-1` w kwietniu są unikalne bo mają różny `month` — to poprawne. Jednakże gdyby ktoś użył `MonthGrid` z tym samym `month` (np. w testach albo w przyszłej refaktoryzacji na 3-miesięczny widok), klucze by się powtórzyły. Lepiej: `empty-${year}-${month}-${i}`.

---

### 8. Brak `revalidate` na `/opinie/page.tsx`

**Plik:** `src/app/(main)/opinie/page.tsx`

Strona opinii nie zależy od `isPast` więc brak `revalidate` jest poprawny z perspektywy auto-isPast. Jednak po dodaniu nowej opinii do CMS (nowy YAML) strona nie odświeży się automatycznie — tylko przy redeploy. Nie jest to błąd w kontekście tych commitów, ale warto pamiętać jeśli w przyszłości klientka będzie dodawać opinie samodzielnie przez CMS.

Nie blokuje — informacja dla przyszłości.

---

### 9. `PastTripsSection.tsx` — brak `h-full` na `ScrollAnimation` (spójność z issue #3)

**Plik:** `src/components/home/PastTripsSection.tsx`, linia 22

```tsx
<ScrollAnimation key={trip.slug} delay={index * 0.15}>
  <TripCard trip={trip} />
</ScrollAnimation>
```

Grid 2-kolumnowy (`sm:grid-cols-2`). Bez `h-full` na `ScrollAnimation` karty o różnej wysokości tekstu nie wyrównają się pionowo. Ten sam problem co w #3 — pominięty przy refaktoryzacji `Card.tsx`.

---

### 10. `testimonials.ts` — sort przez `localeCompare` na datach YYYY-MM-DD

**Plik:** `src/data/testimonials.ts`, linia 24

```ts
return b.date.localeCompare(a.date);
```

`localeCompare` na stringach YYYY-MM-DD działa poprawnie (format jest leksykograficznie sortowalny), ale intencja jest nieoczywista dla przyszłego maintainera. Bezpieczniej i czytelniej:

```ts
return b.date > a.date ? 1 : -1;
```

Lub jawnie: `return new Date(b.date).getTime() - new Date(a.date).getTime()` — tu UTC offset nie ma znaczenia bo porównujemy tylko kolejność dat, a nie wyświetlamy je.

---

## 🔵 Sugestie (SUGGESTION)

### S1. `formatDate` i `formatDateShort` — brak `parseLocalDate` dla string input

**Plik:** `src/lib/utils.ts`, linie 19 i 26

Podobnie jak `formatDateRange` (issue #1) — obie funkcje wywołują `new Date(date)` kiedy `date` jest stringiem YYYY-MM-DD. Nie są wywoływane z trip dates w aktualnym kodzie (szybkie Grep nie pokazał takich wywołań), ale skoro `parseLocalDate` istnieje, warto zunifikować wzorzec prewencyjnie. Sugerowana naprawa taka sama jak w #1.

### S2. Dodać komentarz JSDoc do `parseLocalDate` o tym, dlaczego `new Date(str)` jest problematyczne

**Plik:** `src/lib/utils.ts`, linia 8

Aktualny komentarz jest dobry (`Parses YYYY-MM-DD as local midnight (avoids UTC offset issues)`), ale można go rozbudować o przykład problemu żeby kolejny deweloper rozumiał "dlaczego nie `new Date(str)`":

```ts
/**
 * Parses a YYYY-MM-DD string as local midnight, avoiding UTC offset issues.
 * `new Date("2026-04-15")` returns 2026-04-14T22:00:00 in UTC+2 timezone,
 * causing off-by-one day errors in comparisons and display.
 */
```

### S3. Strony kategorii nie mają `StructuredData` BreadcrumbSchema — niekonsekwencja

**Pliki:** `dla-doroslych/page.tsx` i `single-parents/page.tsx`

`wyjazd-z-dziecmi/page.tsx` (linia 66) i `matka-z-corka/page.tsx` (linia 66) mają `StructuredData` z breadcrumb. `dla-doroslych/page.tsx` i `single-parents/page.tsx` nie importują nawet `SITE_CONFIG` ani `getBreadcrumbSchema`. Dla stron z `robots: { index: false }` to nie szkodzi SEO, ale po zmianie na indexable w przyszłości brakujący schema byłby pominięty.

---

## Dobre praktyki ✅

- **`parseLocalDate` w `trips.ts` i `TripCalendar.tsx`** — poprawne i konsekwentne użycie wszędzie gdzie parsujemy `trip.date`/`trip.dateEnd` jako YYYY-MM-DD stringi. Dobry refactor.
- **`CATEGORY_CONFIG` jako SSOT** — kalendarz, legenda i filtry korzystają z tego samego configu. Żadnych hardcodowanych kolorów kategorii w komponentach.
- **`getAllTrips()` raz na `/wyjazdy`** — jedna asynchroniczna operacja, trzy tablice pochodne (`upcomingTrips`, `pastTrips`, `calendarTrips`). Wzorcowe.
- **`toCalendarTrips()` helper** — lekki typ `CalendarTrip` przekazywany do Client Component zamiast pełnego `Trip`. Minimalizuje bundle po stronie klienta.
- **`isPast` obliczany z daty, nie hardcodowany** — eliminacja manualnego zarządzania polem w CMS dla klientki. Dobre UX dla admina CMS.
- **`aria-pressed` na filtrach legendy** — poprawna semantyka ARIA dla toggle buttons.
- **`aria-label` i `role="region"` na `TripCalendar`** — zgodnie z lekcjami z Poprawki Klientki 03.03.
- **Sortowanie testimoniali przez `localeCompare` na YYYY-MM-DD** — działa poprawnie (format jest leksykograficznie posortowany), opinii bez daty trafiają na koniec.
- **`Card` z `h-full flex-col` + `mt-auto` na przyciskach** — prawidłowy wzorzec wyrównania przycisków do dołu karty w siatce.
- **`getNextMonth` / `getPrevMonth`** — czyste, pure functions bez mutacji stanu. Testy jednostkowe byłyby trywialne.
- **`keystatic.config.ts` label wyjaśniający ignorowanie `isPast`** — dobra komunikacja dla klientki w CMS.

---

## Podsumowanie krytyczne

Dwa problemy wymagają naprawy przed mergem na master:

1. **`formatDateRange` (i `formatDate`, `formatDateShort`) używa `new Date(string)` zamiast `parseLocalDate()`** — ryzyko wyświetlenia błędnej daty dla dat granicznych w strefie UTC+2.
2. **Brak `revalidate = 3600` na `/wyjazdy/[slug]/page.tsx`** — strony indywidualnych wyjazdów nie odświeżą się automatycznie po tym jak wyjazd się zakończy, pokazując formularz rezerwacji zamiast listy oczekujących.

Pozostałe to kwestie spójności (`h-full` na `ScrollAnimation`, nazewnictwo "wyjazdy" vs "warsztaty" na stronach kategorii) i drobne nity.
