# Plan: Rozbudowa stron kategorii, zakres dat, belki kategorii, kalendarz i wzór lasu

## Kontekst

Klientka chce 7 zmian poprawiających nawigację i czytelność wyjazdów:
1. Strony kategorii (Warsztaty z dziećmi, Matka i córka, Dla dorosłych) nie pokazują nadchodzących wyjazdów — trzeba dodać sekcję jak na Single Parents
2. Przycisk "Zobacz wszystkie wyjazdy" → "Zobacz wszystkie warsztaty" (Single Parents)
3. Na kartach wyjazdów widoczna tylko data startu — brak daty zakończenia
4. Brak wizualnego oznaczenia kategorii na kartach — trudno odróżnić typy wyjazdów w /wyjazdy
5. Kalendarz jest tylko na stronie głównej — powinien być też w /wyjazdy
6. Kolory w kalendarzu za podobne (amber vs coral vs terracotta) — trzeba bardziej wyraziste
7. Dekoracyjny wzór lasu za kalendarzem — bajkowy na głównej, realistyczny na /wyjazdy

**Branch:** `feature/kategorie-kalendarz-las`

---

## Faza A: Fundament — kolory kategorii i format dat (Tasks 6, 3, 2)

### A1. Nowy plik: `src/lib/category-config.ts` — Single Source of Truth [S]

Współdzielony config kategorii używany przez TripCalendar, TripCard, TripsFilter, legendę.

```ts
export const CATEGORY_CONFIG = {
  rodzinny:        { label: "Warsztaty z dziećmi", ... bg-moss },
  "matka-corka":   { label: "Matka i córka",       ... bg-mustard },
  "single-parents":{ label: "Single parents",      ... bg-lavender },
  "dla-doroslych": { label: "Dla dorosłych",       ... bg-terracotta },
};
```

**Nowe kolory kalendarza (Task 6):**
| Kategoria | Stary kolor | Nowy kolor | Powód |
|-----------|-------------|------------|-------|
| rodzinny | `bg-moss` (#5C713B) | `bg-moss` — bez zmian | zielony, dobrze wyróżniony |
| matka-corka | `bg-amber-500` | `bg-mustard` (#DDB74A) | ciepłe złoto, jest już w palecie |
| single-parents | `bg-terracotta` (#D9734E) | `bg-lavender` (#C4B5D4) | fioletowy — max odróżnienie od ciepłych |
| dla-doroslych | `bg-coral` (#E2856E) | `bg-terracotta` (#D9734E) | pomarańcz, teraz wyróżniony bo amber/coral zniknęły |
| Zakończone | `bg-graphite/10` | `bg-parchment-dark` (#EADCC8) | cieplejszy szary, spójny z paletą |

### A2. Zmiana kolorów kalendarza — `src/components/shared/TripCalendar.tsx` [S]
### A3. Format zakresu dat — `src/lib/utils.ts` [S]
### A4. Zakres dat na kartach — `src/components/home/TripCard.tsx` [S]
### A5. Zmiana tekstu przycisku — `src/app/(main)/single-parents/page.tsx` [S]

---

## Faza B: Funkcjonalność — belka kategorii, sekcje wyjazdów, kalendarz (Tasks 4, 1, 5)

### B1. Belka kategorii na kartach — `src/components/home/TripCard.tsx` [S]
### B2. Sekcja "Nadchodzące wyjazdy" na `/wyjazd-z-dziecmi` [M]
### B3. Sekcja "Nadchodzące wyjazdy" na `/matka-z-corka` [M]
### B4. Sekcja "Nadchodzące wyjazdy" na `/dla-doroslych` [M]
### B5. Kalendarz na `/wyjazdy` [M]
### B6. Aktualizacja TripsFilter — `src/components/trips/TripsFilter.tsx` [S]

---

## Faza C: Dekoracje — wzór lasu za kalendarzem (Task 7)

### C1. Komponent `ForestPattern` — `src/components/shared/ForestPattern.tsx` [L]
Warianty: `fairytale` (zaokrąglone drzewka) i `realistic` (sylwetki sosen)

### C2. Integracja na obu stronach jednocześnie [S]

---

## Status: ZAIMPLEMENTOWANE (commit 761f24d)

Wszystkie 3 fazy zaimplementowane w jednym commicie. Build OK (27 stron, 0 błędów).
Code review nie przeprowadzony.
