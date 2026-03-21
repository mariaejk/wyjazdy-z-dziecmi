# Plan: Poprawki UI + Nawigacja 21.03.2026

Branch: `feature/poprawki-ui-nav-21-03`
Ostatnia aktualizacja: 2026-03-21

## Podsumowanie

10 zmian UI/UX dotyczących nawigacji, hero sekcji, footer, opinii i stron warsztatów. Zmiany pogrupowane w 4 fazy wg zależności i plików, które dotykają.

## Fazy wdrożenia

### Faza 1: Nawigacja (zmiany 6, 7, 8) — PRIORYTET WYSOKI
**Pliki:** `src/data/navigation.ts`, `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`

Przebudowa nawigacji z jednego dropdown "O nas" na dwa dropdowny + samodzielne pozycje:

**Obecna struktura:**
```
Wszystkie warsztaty | Warsztaty z dziećmi | Matka i córka | Single parents | Dla dorosłych | O nas▼ (Galeria, Opinie, Kontakt, Blog)
```

**Nowa struktura:**
```
Warsztaty▼ (Wszystkie warsztaty, Warsztaty z dziećmi, Matka i córka, Single parents, Dla dorosłych) | Poznajmy się▼ (O mnie, Galeria, Opinie, Kontakt) | Blog | Kontakt
```

**Zadania:**
1. **[S] Zmiana `navigation.ts`** — przebudowa tablicy `mainNavigation`:
   - "Warsztaty" (nieklikalne, `href: "#"`) z children: 5 pozycji
   - "Poznajmy się" (nieklikalne, `href: "#"`) z children: O mnie → `/o-nas`, Galeria, Opinie, Kontakt
   - "Blog" → `/blog` (samodzielna pozycja)
   - "Kontakt" → `/kontakt` (samodzielna pozycja)
   - Kryterium: 4 top-level items, 2 z dropdown, 2 bez

2. **[M] Aktualizacja `Header.tsx`** — obsługa wielu dropdownów:
   - Obecny kod obsługuje JEDEN dropdown (`DropdownNavItem`). Trzeba wspierać wiele.
   - "Warsztaty" i "Poznajmy się" — nieklikalne (nie nawigują, tylko otwierają dropdown)
   - Sprawdzić `isNavActive()` — musi działać dla zagnieżdżonych children
   - Kryterium: oba dropdowny otwierają się na hover, zamykają z delay 150ms

3. **[M] Aktualizacja `MobileMenu.tsx`** — accordion dla obu dropdownów:
   - Obecny accordion obsługuje jeden submenu. Trzeba wspierać wiele.
   - "Warsztaty" i "Poznajmy się" — accordion headers (nieklikalne)
   - "Blog" i "Kontakt" — zwykłe linki
   - Kryterium: oba accordion sections otwierają/zamykają niezależnie

**Ryzyko:** Header/MobileMenu to złożone komponenty z focus trap i animacjami. Testy manualne na mobile konieczne.

---

### Faza 2: Hero + Kafelki kategorii (zmiany 9, 10, 5) — PRIORYTET WYSOKI
**Pliki:** `src/components/home/HeroSection.tsx`, nowy `src/components/home/CategoryCards.tsx`, `src/app/(main)/page.tsx`, `src/app/(main)/opinie/page.tsx`

**Zadania:**
4. **[S] Zmiana H2 w HeroSection** (zmiana 10):
   - Obecne H2: "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko **na nowo**."
   - Nowe H2: "Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie."
   - Usunąć USP pod slideshow (bo to ten sam tekst teraz)
   - **UWAGA:** Zmienić w OBU wariantach — motion I reduced-motion
   - Kryterium: H2 zmieniony, USP usunięty, oba warianty spójne

5. **[S] Usunięcie "Polecane przez rodziców" z Hero** (zmiana 5):
   - Usunąć gwiazdki + tekst z HeroSection
   - Kryterium: brak gwiazdek i tekstu w hero

6. **[S] Dodanie "Polecane przez rodziców" nad opiniami** (zmiana 5 cd.):
   - Dodać gwiazdki + tekst NAD `OpinionsTeaser` na homepage
   - Dodać gwiazdki + tekst NAD listą opinii na `/opinie`
   - Kryterium: gwiazdki widoczne nad opiniami w obu miejscach

7. **[M] Nowy komponent `CategoryCards`** (zmiana 9):
   - 3 duże, klikalne kafelki ze zdjęciami:
     - "Wyjazdy z Dziećmi" → `/wyjazd-z-dziecmi`
     - "Dla Matki i Córki" → `/matka-z-corka`
     - "Dla Singli z Dziećmi" → `/single-parents`
   - Estetyczne boksy ze zdjęciami, warm natural style
   - Responsive: 1 kolumna mobile, 3 kolumny desktop
   - Zdjęcia z `public/images/` (istniejące hero images)
   - `ScrollAnimation` z staggered delay
   - Kryterium: 3 karty klikalne, widoczne pod hero, responsive

8. **[S] Integracja `CategoryCards` na homepage** (zmiana 9 cd.):
   - Umieścić pod HeroSection, przed kalendarzem
   - Kryterium: karty widoczne między hero a kalendarzem

---

### Faza 3: Strony warsztatów (zmiany 1, 2, 3) — PRIORYTET ŚREDNI
**Pliki:** `src/components/trips/TripVideo.tsx`, `src/app/(main)/wyjazdy/[slug]/page.tsx`, `src/components/trips/BookingForm.tsx`

**Zadania:**
9. **[S] TripVideo — odwrócona kolejność na mobile** (zmiana 1):
   - Obecny układ: video (lg:w-2/5) | opis (lg:w-3/5), `flex-col lg:flex-row`
   - Na mobile (flex-col) wideo jest pierwsze
   - Zmiana: `flex-col-reverse lg:flex-row` — opis pierwszy na mobile, wideo pod spodem
   - Kryterium: mobile = opis na górze, wideo pod; desktop = bez zmian

10. **[S] Przycisk FAQ na każdej stronie warsztatu** (zmiana 2):
    - Dodać link/przycisk pod sekcją FAQ warsztatu (lub pod BookingForm)
    - Tekst: "Masz więcej pytań? Zobacz FAQ" (lub podobny)
    - Link: `/#faq` (homepage sekcja FAQ)
    - Wariant: secondary button
    - Kryterium: przycisk widoczny na każdym warsztacie, linkuje do FAQ homepage

11. **[S] Zmiana "Zapisz się na wyjazd" → "Zapisz się na warsztat"** (zmiana 3):
    - W `BookingForm.tsx` zmienić nagłówek sekcji
    - Sprawdzić czy tekst nie pojawia się w innych miejscach
    - Kryterium: nagłówek zmieniony

---

### Faza 4: Footer (zmiana 4) — PRIORYTET NISKI
**Pliki:** `src/components/layout/Footer.tsx`

**Zadania:**
12. **[S] Usunięcie tagline z footer** (zmiana 4):
    - Usunąć "Wyjazdy z Dziećmi" + "Rodzinne wyjazdy warsztatowe w naturze."
    - Zostawić resztę footer (kontakt, social, legal, newsletter)
    - Kryterium: brak nazwy marki i tagline w footer

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Header dropdown — dwa dropdowny otwarte jednocześnie | Średnie | Niski | Zamykaj poprzedni dropdown przy otwarciu nowego |
| MobileMenu — dwa accordiony — UX confusion | Niskie | Niski | Niezależne otwieranie/zamykanie, jasne labels |
| CategoryCards — brak dobrych zdjęć dla kategorii | Średnie | Średni | Użyj istniejących hero images z tripów |
| Nawigacja "Kontakt" zduplikowany (w dropdown + osobna pozycja) | Pewne | Niski | Zamierzone — szybki dostęp + discovery w dropdown |
| "Polecane przez rodziców" — accessibility gwiazdek | Niskie | Niski | `aria-label="5 z 5 gwiazdek"` |

## Mierniki sukcesu

1. Build przechodzi bez błędów
2. Nawigacja desktop: 4 top-level items, 2 dropdowny działają
3. Nawigacja mobile: 2 accordion sections + 2 linki
4. Hero: nowy H2, brak USP pod slideshow, brak gwiazdek
5. CategoryCards: 3 klikalne kafelki pod hero
6. Opinie: gwiazdki nad sekcją na homepage i /opinie
7. Warsztaty: FAQ link, zmieniony nagłówek formularza, mobile video order
8. Footer: brak tagline

## Szacunki czasowe

| Faza | Nakład | Złożoność |
|------|--------|-----------|
| Faza 1: Nawigacja | M | Średnia — refaktor istniejącej logiki dropdown |
| Faza 2: Hero + kafelki | M | Średnia — nowy komponent + przeniesienie elementów |
| Faza 3: Warsztaty | S | Niska — proste zmiany tekstu i kolejności |
| Faza 4: Footer | S | Niska — usunięcie tekstu |
