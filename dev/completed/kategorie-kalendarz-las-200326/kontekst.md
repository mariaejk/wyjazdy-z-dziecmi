# Kontekst: Kategorie, kalendarz, wzór lasu (20.03.2026)

## Decyzje

### Kolory kategorii (zatwierdzone przez klientkę)
- **rodzinny**: moss (#5C713B) — zielony, bez zmian
- **matka-corka**: mustard (#DDB74A) — ciepłe złoto, zastąpiło amber-500
- **single-parents**: lavender (#C4B5D4) — fioletowy, max odróżnienie od ciepłych
- **dla-doroslych**: terracotta (#D9734E) — pomarańcz, teraz wyróżniony
- **zakończone**: parchment-dark (#EADCC8) — cieplejszy szary

Efekt: 4 kolory na różnych częściach koła barw (zielony → złoty → fioletowy → pomarańczowy).

### ForestPattern
- Bajkowy (strona główna): zaokrąglone drzewka (koła na pniach) + krzaczki
- Realistyczny (/wyjazdy): sylwetki sosen/jodeł (trójkąty, warstwy)
- Opacity 6-7% — subtelne, nie konkuruje z treścią
- Oba warianty implementowane razem (zatwierdzone)

### Refaktor /dla-doroslych
- Było: `getTripBySlug("yoga-i-konie")` — hardcoded slug jednego wyjazdu
- Jest: `getUpcomingTripsByCategory("dla-doroslych")` — multi-trip grid

### Optymalizacja /wyjazdy
- Było: `getUpcomingTrips()` + `getPastTrips()` = 2x `getAllTrips()`
- Jest: 1x `getAllTrips()` + `.filter()` + `.map()` dla kalendarza

### SectionWrapper alternation
- Dodanie sekcji "Nadchodzące wyjazdy" na stronach kategorii wymagało dostosowania wariantów (default/alternate) aby zachować wizualny rytm

## Sesja 20.03.2026

- Cała implementacja w jednym commicie (761f24d)
- Build OK, 27 stron, zero błędów
- Branch: `feature/kategorie-kalendarz-las`
- Usunięto nieużywany import `Suspense` z single-parents
- Usunięto import `formatDate` z TripCard (zastąpiony `formatDateRange`)
- Code review przeprowadzony (raport: `review-all.md`)
- Znaleziony bug krytyczny: /single-parents pobiera wyjazdy z kategorii "rodzinny" zamiast "single-parents"
- 3 problemy ważne: a11y kalendarza, kolizja wyjazdów na dzień, duplikacja calendarTrips
- 4 nity kosmetyczne
