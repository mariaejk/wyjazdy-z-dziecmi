# Poprawki klientki — 03.03.2026

Dokument źródłowy: `docs/poprawki/poprawki_03.03.26.docx` (HTML: `poprawki_03.03.26.html`)
Screenshoty: `docs/poprawki/1.png` — `docs/poprawki/29.png`
Dodatkowe dane: `DODTAKOWE-WYJAZDY-RODZINNE.md`, `ARCHIWALNY-WYJAZD.md`, `blog.md`

## Checklist poprawek

### Polskie znaki (przerwalinowo w wielu sekcjach)
- [x] 1. Ogólne — polskie znaki w komponentach .tsx (literal UTF-8)
- [x] 4. Przycisk "Szczegóły" w TripCard
- [x] 5. Sekcja "O mnie" — wszystkie podzsekcje
- [x] 9. "Zapisz się" na podstronach wyjazdów
- [x] 12. Sekcja cennika (TripPricing)
- [x] 14. Etykieta "Dorośli" w BookingForm
- [x] 22. Strona Kontakt
- [x] 23. Strona Opinie + przycisk
- [x] 25-29. "O mnie" — misja, współpracownicy, miejsca, tytuły

### Zmiany treści
- [x] 2. "zrodził się" → "powstał" (HeroSection, AboutTeaser)
- [x] 7. Newsletter — nowy tekst pod "Pobierz PDF", placeholder, RODO link
- [x] 11. Inkluzywny język — babcie, ciocie, koleżanki (nie tylko matki)
- [x] 25. "Zobacz wyjazdy" → "Znajdź swój wyjazd" (HeroSection)
- [x] 26. "Wybierz wyjazd" → "Wybierz swój wyjazd" (wyjazdy/page.tsx)
- [x] 20. USP "Jedyne w Polsce..." na stronie głównej

### Zmiany UI/UX
- [x] 3. Logo większe (80px) + klikalny tekst "Wyjazdy z Dziećmi" obok logo
- [x] 8. Usunąć "Poznaj szczegóły" na podstronie wyjazdu (TripHero)
- [x] 13. Usunąć Galerię, wstawić zdjęcia między bloki tekstu (contentBlocks)
- [x] 24. Walidacja newslettera — reset przy nawigacji (usePathname + reset)
- [x] 27. "Co zawiera cena / Czego nie zawiera" (priceIncludes/priceExcludes)

### Nowe strony i sekcje
- [x] 8. Zakładka Blog w nawigacji + strona /blog
- [x] 15. Strona "Wyjazd z dziećmi" (zamiast "Single Parents")
- [x] 16. Strona "Matka z córką" + filtrowanie wyjazdów po kategorii
- [x] 17. Sekcja "Minione wyjazdy" na stronie głównej (PastTripsSection)
- [x] 19. Strona /galeria z masonry grid
- [x] 21. Kalendarz wyjazdów (TripCalendar) — na głównej i /wyjazdy

### Nowe dane wyjazdów
- [x] 18a. Zlot Kaczek III edycja (20-23.08.2026) — trips.ts
- [x] 18b. Rodzinny tydzień z końmi i jogą (1-7.08.2026) — trips.ts
- [x] 18c. W Kręgu Uważności (29-31.05.2026) — trips.ts
- [x] 18d. Archiwalny Zlot Kaczek Świąteczny (5-7.12.2025) — trips.ts
- [x] 21. Link do Kaczego Bagna w "O mnie" (places.ts)
- [x] 28. Joga i Konie — harmonogram/treść zaktualizowane
- [x] 20. Kategorie wyjazdów z filtrowaniem (?kategoria=matka-corka itp.)

### UKOŃCZONE (wcześniej brakujące)
- [x] 6. Zdjęcie maria_2.jpg — skopiowane do public/images/maria-2.jpg, zmienione w team.ts
- [x] 28b. Cennik "Joga i Konie" — wpisane ceny z FB eventu (900/700 zł warsztaty + priceIncludes/priceExcludes)
- [x] Waitlist — WaitlistForm + /api/waitlist (Zod + honeypot + rate limit + GA4 tracking)

## Pliki źródłowe do dokończenia

### maria_2.jpg
- Źródło: `docs/Images/maria_2.jpg`
- Cel: `public/images/maria-2.jpg`
- Zmienić: `src/data/team.ts` → `image: "/images/maria-2.jpg"`

### Cennik Joga i Konie (z DODTAKOWE-WYJAZDY-RODZINNE.md)
- nocleg: od 100 zł/os (płatny w pensjonacie)
- wyżywienie: 140 zł/dzień (70 zł dzieci do 10 lat, 0 zł dzieci do 3 lat)
- warsztaty + joga + opieka: 900 zł dorosły, 700 zł dziecko
- jazda konna: dodatkowo płatna
- Strona pensjonatu: https://sasek.pl/cennik

### Waitlist
- Kiedy: spotsLeft === 0
- Formularz: imię, email, telefon, wyjazd (hidden), honeypot, RODO
- API: /api/waitlist (Zod + honeypot + rate limit)
- UX: "Ten wyjazd jest już pełny. Zapisz się na listę oczekujących, a poinformujemy Cię, gdy zwolni się miejsce."
