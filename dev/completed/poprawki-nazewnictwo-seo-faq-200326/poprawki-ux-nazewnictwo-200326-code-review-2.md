# Code Review: Poprawki po review #1 + nowe funkcje (FAQ, H1, homepage)

Last Updated: 2026-03-20

Committy objęte reviewem (po poprzednim review):
- `47b3efc` — fix: poprawki po review — parseLocalDate, ISR [slug], h-full karty, nazewnictwo
- `270f680` — fix: poprawki nazewnictwa, wyrównanie kart, czystszy kalendarz (uwzględniony częściowo w `47b3efc`)
- `8965439` — feat: SEO H1, FAQ akordeon, usunięcie zakończonych z głównej, poprawki copy

---

## Statystyki

- [blocking]: 0
- [important]: 3
- [nit]: 4
- [suggestion]: 2

---

## Weryfikacja poprawek z poprzedniego review

Wszystkie 2 blocking issues z poprzedniego review zostały naprawione:

- `parseLocalDate` przez `toDate()` helper — NAPRAWIONE w `src/lib/utils.ts`
- `revalidate = 3600` na `/wyjazdy/[slug]/page.tsx` — NAPRAWIONE
- `h-full` na `ScrollAnimation` w gridach z kartami — NAPRAWIONE w `TripCardsSection`, `PastTripsSection`, 4 stronach kategorii
- "Nadchodzące wyjazdy" -> "Nadchodzące warsztaty" na stronach kategorii — NAPRAWIONE

---

## Ważne (IMPORTANT)

### 1. HomeFAQ używa unicode escapes zamiast literalnych polskich znaków — niezgodność z CLAUDE.md

**Plik:** `src/components/home/HomeFAQ.tsx`, linie 12–53

Cały plik używa wyłącznie unicode escapes zamiast literalnych UTF-8:
```ts
title: "Czy menu na wyjazdach uwzgl\u0119dnia alergie..."
// zamiast:
title: "Czy menu na wyjazdach uwzględnia alergie..."
```

CLAUDE.md (Phase 2 Lessons Learned) mówi jasno:

> Polskie znaki — UTF-8 everywhere: Używaj prawdziwych polskich znaków (ą, ć, ę, ł, ń, ó, ś, ż, ź) we WSZYSTKICH plikach (.ts i .tsx). Unicode escapes \uXXXX NIE działają w kontekście JSX (wyświetlają się dosłownie).

Uwaga: `\uXXXX` w string literals (nie w JSX) działa poprawnie w JavaScript i renderuje się normalnie — to nie jest bug runtime. Jednak:
1. Narusza ustaloną konwencję projektu (utrudnia czytanie i review)
2. W starszych wersjach edytorów lub przy pewnych konfiguracjach może wyświetlić literal escape
3. CLAUDE.md był aktualizowany właśnie dlatego, że problem się pojawił wcześniej — lepiej trzymać się zasady konsekwentnie

Pliki `.ts` historycznie używały escapes, `.tsx` — literałów. Ten plik jest `.tsx`, więc zasada jest jasna: literalne UTF-8.

**Naprawa:** Zastąpić wszystkie `\uXXXX` i `\uXXXX` literalnymi polskimi znakami UTF-8 w całym `HomeFAQ.tsx`. Edytory z UTF-8 (VS Code domyślnie) obsłużą to bez problemu.

---

### 2. HomeFAQ brakuje FAQPage schema.org — utracona szansa SEO

**Plik:** `src/components/home/HomeFAQ.tsx` i `src/app/(main)/page.tsx`

`getFAQSchema()` i `StructuredData` są już zaimplementowane i używane na stronach tripów (`/wyjazdy/[slug]/page.tsx`, linia 89). Na stronie głównej dodano sekcję FAQ z 7 pytaniami, ale bez odpowiadającego schema.org `FAQPage`.

FAQPage na głównej stronie to silny sygnał SEO — Google często wyświetla pytania bezpośrednio w wynikach wyszukiwania (rich snippets). Zignorowanie tego przy dodawaniu FAQ to missed opportunity.

Aktualna `getFAQSchema()` w `src/lib/structured-data.ts` (linia 60) przyjmuje `{ question: string; answer: string }[]` — ale `faqItems` w `HomeFAQ.tsx` ma pola `id`, `title`, `content` (nie `question`/`answer`). Typy nie pasują bezpośrednio.

**Naprawa:** Dwie opcje:
- Opcja A (rekomendowana): Zmienić `faqItems` w `HomeFAQ.tsx` by używały pól `question`/`answer` zamiast `title`/`content`, dodać `getFAQSchema(faqItems)` do `page.tsx`.
- Opcja B: Dodać osobny export `homeFaqItems` z polami `question`/`answer` tylko dla structured data, zachowując `title`/`content` dla `Accordion`.

Uwaga: `HomeFAQ` jest `"use client"` — structured data musi być dodane w serwerowej `page.tsx`, nie w komponencie. Wymaga to eksportu danych FAQ z osobnego pliku (np. `src/data/faq.ts`) lub przeniesienia ich do `page.tsx`.

---

### 3. TripCardsSection — brak empty state gdy `upcomingTrips` jest pusta

**Plik:** `src/components/home/TripCardsSection.tsx`, linie 11–45

```tsx
const upcomingTrips = await getUpcomingTrips();
const displayTrips = upcomingTrips.slice(0, 3);
```

`slice(0, 3)` na pustej tablicy zwraca `[]` — to poprawne i nie crasha. Jednak `displayTrips.map(...)` wyrenderuje pustą `<div className="grid ...">` i sekcja "Nadchodzące warsztaty" pokaże się z pustą zawartością: tytuł sekcji + pusty grid + przycisk "Zobacz wszystkie warsztaty".

Na stronie głównej wygląda to kiepsko — przez cały sezon zimowy (bez nadchodzących tripów) renderuje się sekcja-widmo.

`TripsFilter.tsx` (linia 40–45) ma już wzorzec empty state: renderuje informację o braku wyjazdów gdy `filtered.length === 0`. `PastTripsSection.tsx` (linia 11) zwraca `null` gdy brak danych. `TripCardsSection` powinien zachowywać się spójnie.

**Naprawa:** Dodać obsługę pustej tablicy, np.:
```tsx
if (displayTrips.length === 0) {
  return null; // lub: return <EmptyTripsSection />;
}
```

Ewentualnie ukryć całą sekcję gdy brak wyjazdów, z myślą o przyszłej ekspansji oferty.

---

## Uwagi drobne (NIT)

### 4. H1 semantyczny w sekcji hero — rozmiar wizualny wprowadza w błąd

**Plik:** `src/components/home/HeroSection.tsx`, linie 67–73 i 149–156

```tsx
<h1 className="text-sm font-semibold uppercase tracking-wider text-moss">
  Rodzinne wyjazdy warsztatowe w naturze
</h1>
<h2 className="mt-2 font-heading text-4xl font-bold text-graphite ...">
  Zatrzymaj się. Odetchnij. ...
</h2>
```

Decyzja architektoniczna jest sensowna (H1 SEO-friendly, H2 emocjonalny i duży wizualnie). Jednak dla screenreaderów i narzędzi SEO kolejność `h1 → h2` jest czytelna i poprawna. Problem jest wyłącznie wizualny: `h1` wygląda jak badge, `h2` wygląda jak główny tytuł strony — dla użytkownika widzącego to odwrotność oczekiwań.

To świadoma decyzja zbalansowania SEO vs emocjonalnego kopii — nie jest to błąd. Warto jednak udokumentować intentię w komentarzu kodu:
```tsx
{/* H1: SEO-descriptive, small visual — swap with H2 is intentional */}
```

Oba warianty (motion i reduced-motion) są spójne — to pozytyw.

---

### 5. `TripCard` bez `href` na `Card` — cały link to przyciski w środku

**Plik:** `src/components/home/TripCard.tsx`, linie 37–39

```tsx
<Card
  image={{ src: trip.image, alt: trip.title }}
>
```

`Card` nie dostaje `href` prop, więc cały komponent nie jest klikalny. Link jest tylko przez przyciski "Szczegóły" i "Zarezerwuj" wewnątrz karty. To spójne z poprzednim kodem — nie jest to nowy problem wprowadzony w tych commitach. Jednak warto zauważyć: `Card` ma logikę `hover:shadow-lg` i `group-hover:scale-105` na obrazku tylko gdy `href` jest przekazany — bez niego hover nie działa.

Nie jest to regresja w tym PR, ale przy okazji refaktoryzacji warto rozważyć czy karty wyjazdów powinny mieć `href={tripUrl}` na całości (co dałoby interaktywność na hover i klikanie wszędzie po karcie).

---

### 6. `subtitle` w TripCardsSection nie zmienił się na "warsztaty"

**Plik:** `src/components/home/TripCardsSection.tsx`, linia 20

```tsx
subtitle="Wybierz wyjazd dla siebie i swojego dziecka"
```

Tytuł sekcji zmieniono na "Nadchodzące warsztaty" (poprawnie), ale `subtitle` nadal używa "wyjazd" zamiast "warsztat". Commit `270f680` i `47b3efc` skupiły się na tytułach głównych, pomijając subtitles.

Podobnie w `TripsFilter.tsx` linia 27:
```tsx
: "Wybierz swój wyjazd i dołącz do nas!";
```

Jeśli konsekwentne nazewnictwo "warsztaty" jest przyjętą konwencją (co sugerują commity), te stringi powinny być zaktualizowane.

---

### 7. `toDate()` jest nieksportowany — nie można użyć w testach ani innych modułach

**Plik:** `src/lib/utils.ts`, linia 14

```ts
function toDate(d: string | Date): Date {
```

`toDate` jest private helper — to poprawny wzorzec (nie powinien być częścią publicznego API modułu). Jednak jeśli ktoś chce napisać test jednostkowy dla `formatDateRange` lub użyć tej konwersji w innym miejscu, będzie musiał powielić logikę lub zmodyfikować `utils.ts`.

W tym projekcie testy nie są używane (brak `*.test.ts` w repozytorium), więc to nie jest aktualny problem. Gdyby testy zostały wprowadzone w przyszłości — `parseLocalDate` jest już eksportowany i wystarczy go użyć bezpośrednio.

Informacja na przyszłość — nie wymaga działania teraz.

---

## Sugestie (SUGGESTION)

### S1. `page.tsx` — brak `revalidate` na stronach kategorii z ISR

**Pliki:** `src/app/(main)/matka-z-corka/page.tsx`, `src/app/(main)/wyjazd-z-dziecmi/page.tsx`, `src/app/(main)/dla-doroslych/page.tsx`, `src/app/(main)/single-parents/page.tsx`

Wszystkie cztery strony kategorii mają `revalidate = 3600` — to poprawne, gdyż wyświetlają wyniki `getUpcomingTripsByCategory()` zależne od `isPast`. Weryfikacja: tak, są już naprawione w commicie `47b3efc`.

---

### S2. Duplikacja struktury `getUpcomingTrips()` — rozważyć cache

`TripCardsSection` wywołuje `getUpcomingTrips()` → `getAllTrips()`, a `page.tsx` wywołuje `getCalendarTrips()` → `getAllTrips()`. Na stronie głównej `getAllTrips()` jest wywoływane dwukrotnie (raz przez `TripCardsSection`, raz przez `page.tsx`). Next.js `fetch` cache nie zadziała dla Keystatic (lokalny filesystem), więc nie ma automatycznej dedulikacji.

W praktyce: dwa osobne odczyty plików YAML przy każdym render — małe obciążenie przy obecnej skali (kilka tripów). Przy skalowaniu do dziesiątek tripów lub wolniejszego storage warto rozważyć przekazanie `trips` jako prop do `TripCardsSection` zamiast osobnego fetchu, podobnie jak to zrobiono na `/wyjazdy/page.tsx` z `getAllTrips()` → derive `upcomingTrips`, `pastTrips`, `calendarTrips`.

Nie jest to aktualny problem wydajnościowy — wzmianka na przyszłość.

---

## Dobre praktyki ✅

- **Wszystkie blocking issues z poprzedniego review naprawione** — `parseLocalDate` via `toDate()` helper, `revalidate=3600` na `[slug]/page.tsx`, `h-full` na wszystkich gridach kart, nazewnictwo "warsztaty" na tytułach sekcji.
- **`toDate()` private helper** — eleganckie rozwiązanie DRY zamiast powielania ternary w każdej funkcji formatowania. `string | Date` union type obsługuje oba wywołania.
- **H1/H2 split w HeroSection** — obydwa warianty (motion i reduced-motion) są spójne strukturalnie. Wzorzec early-return dla `prefersReducedMotion` zachowany.
- **`analytics.faqClick(title)` zamiast `faqClick()`** — poprawne użycie obiektu `analytics`, nie named export. Zgodne z CLAUDE.md Poprawki Konwersji lessions learned.
- **`onToggle` tylko przy otwieraniu** — `if (newId !== null && onToggle)` — tracking tylko otwarcia, nie zamknięcia. GA4-friendly (nie zaśmieca eventami).
- **`PastTripsSection` usunięty z homepage ale komponent zachowany** — `PastTripsSection.tsx` nadal istnieje (używany potencjalnie na `/wyjazdy` lub na przyszłość). Import usunięty z `page.tsx`. Brak dead imports.
- **`slice(0, 3)` na `upcomingTrips`** — bezpieczne, nie crasha gdy mniej niż 3. Przycisk "Zobacz wszystkie warsztaty" zawsze widoczny — dobre dla konwersji.
- **Spójność `ScrollAnimation` wrappera w `HomeFAQ`** — jeden `ScrollAnimation` dla `SectionHeading`, drugi dla całego `Accordion` z `delay={0.15}`. Nie staggeruje poszczególnych pytań (słusznie — to mogłoby być irytujące przy 7 pytaniach).
- **`Accordion` z `onToggle` prop** — komponent UI jest reusable i analytics-agnostic. `HomeFAQ` podpina tracking z zewnątrz. Prawidłowe separation of concerns.
- **`opinie/page.tsx` — "Co mówią uczestnicy naszych warsztatów"** — spójne nazewnictwo "warsztaty". Zmiana z poprzedniego copy.

---

## Podsumowanie

Trzy [important] wymagają decyzji/naprawy:

1. **HomeFAQ unicode escapes** — narusza konwencję projektu (`.tsx` = literalne UTF-8). Wymaga zamiany escapes na literały, jest to praca mechaniczna bez ryzyka.
2. **Brak FAQPage schema.org na głównej** — missed SEO opportunity przy dodaniu sekcji FAQ. Wymaga refaktoryzacji danych FAQ do osobnego modułu i dodania `StructuredData` w `page.tsx`.
3. **TripCardsSection empty state** — brak widoku gdy brak nadchodzących tripów. Może zostawić "sekcję-widmo" na stronie głównej w czasie poza sezonem.

Żaden z nich nie jest blocking — strona działa poprawnie. Decyzja o kolejności napraw należy do właściciela projektu.
