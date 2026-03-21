# Podsumowanie: Poprawki UI + Nawigacja 21.03.2026

Data ukończenia: 2026-03-21
Branch: `feature/poprawki-ui-nav-21-03`
Commity: 9 (489250c → e9d6288)

## Co zostało dostarczone

10 zmian UI/UX w 4 fazach + 3 rundy code review z poprawkami:

### Nawigacja (zmiany 6, 7, 8)
- Przebudowa z 7 top-level items na 4: **Warsztaty** (dropdown 5 pozycji), **Poznajmy się** (dropdown: O mnie, Galeria, Opinie), **Blog**, **Kontakt**
- Nieklikalne dropdown headers (button zamiast Link)
- Obsługa wielu dropdownów (zamykanie poprzedniego, click-outside, toggle)
- Mobilne accordion z niezależnymi sekcjami

### Hero + Kafelki (zmiany 5, 9, 10)
- Nowy H2: "Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie."
- Usunięty USP pod slideshow (duplikat H2)
- Gwiazdki "Polecane przez rodziców" przeniesione z hero nad opinie (homepage + /opinie)
- Nowy komponent **CategoryCards**: 4 kafelki (Rodzinny czas, Dla Matki i Córki, Dla Singli z Dziećmi, Dla Dorosłych)

### Warsztaty (zmiany 1, 2, 3)
- TripVideo: `flex-col-reverse` na mobile (opis przed wideo)
- Przycisk "Masz więcej pytań? Zobacz FAQ" → `/#faq` (tylko aktywne warsztaty)
- "Zapisz się na wyjazd" → "Zapisz się na warsztat" (BookingForm + TripPricing)

### Footer (zmiana 4)
- Usunięta sekcja "Brand" (nazwa + tagline), grid 4→3 kolumny

## Kluczowe decyzje

1. **Nieklikalne dropdown headers** — `<button>` zamiast `<Link>` z `href=""`. Poprawna semantyka HTML.
2. **Centralny stan dropdownów** — `openDropdown: string | null` w Header, nie w DropdownNavItem. Pozwala zamykać inne dropdowny.
3. **StarRating** jako reusable komponent — eliminacja duplikacji gwiazdek.
4. **CategoryCards jako Server Component** — zero JS, linki + zdjęcia.
5. **FAQ link warunkowy** — `{!trip.isPast && ...}` — nie pokazuje na przeszłych warsztatach.
6. **`id="faq"` na HomeFAQ** — kotwica dla cross-page navigation `/#faq`.

## Główne pliki zmodyfikowane/utworzone

### Nowe
- `src/components/home/CategoryCards.tsx` — kafelki kategorii
- `src/components/shared/StarRating.tsx` — gwiazdki "Polecane przez rodziców"

### Zmodyfikowane
- `src/data/navigation.ts` — nowa struktura nawigacji
- `src/components/layout/Header.tsx` — wielodropdownowy header
- `src/components/layout/MobileMenu.tsx` — accordion z wieloma sekcjami
- `src/components/layout/Footer.tsx` — usunięty tagline
- `src/components/home/HeroSection.tsx` — nowy H2, bez USP/gwiazdek
- `src/components/home/OpinionsTeaser.tsx` — StarRating nad opiniami
- `src/components/home/HomeFAQ.tsx` — id="faq"
- `src/components/trips/TripVideo.tsx` — flex-col-reverse mobile
- `src/components/trips/BookingForm.tsx` — "Zapisz się na warsztat"
- `src/components/trips/TripPricing.tsx` — "Zapisz się na warsztat"
- `src/app/(main)/page.tsx` — CategoryCards pod hero
- `src/app/(main)/opinie/page.tsx` — StarRating
- `src/app/(main)/wyjazdy/[slug]/page.tsx` — FAQ link
- `src/lib/utils.ts` — isNavActive guard na pusty href

## Wyciągnięte wnioski (Lessons Learned)

1. **Race condition w dropdown hover** — timeout 150ms closeDropdown może zamknąć nowo otwarty dropdown. Fix: `setOpenDropdown(prev => prev === label ? null : prev)`.
2. **`isNavActive("")` zwraca true** — `"".startsWith("")` jest zawsze true. Guard `if (!href) return false` konieczny dla nieklikanych dropdown headers.
3. **Nieklikalne nav items = button, nie Link** — Link z `href=""` nawiguje do `/`. Button z dropdown to poprawna semantyka.
4. **Click-outside detection** — `useEffect` z `document.addEventListener("click")` + `navRef.contains()`. Cleanup w return.
5. **StarRating deduplikacja** — identyczny JSX w 2+ miejscach → wydzielić do shared component od razu.
6. **`role="img"` na gwiazdkach** — bez `role` screen readery ignorują `aria-label` na `<div>`.
7. **Hash navigation cross-page** — `/#faq` wymaga `id="faq"` na docelowej sekcji. Łatwe do przeoczenia.
8. **FAQ link warunkowy** — nie pokazuj na past trips (bezcelowy CTA na zakończonym warsztacie).
