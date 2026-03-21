# Zadania: Poprawki UI + Nawigacja 21.03.2026

Branch: `feature/poprawki-ui-nav-21-03`
Ostatnia aktualizacja: 2026-03-21

## Faza 1: Nawigacja (zmiany 6, 7, 8) ✅

- [x] 1.1 Przebudowa `navigation.ts` — nowa struktura 4 top-level items
  - [x] "Warsztaty" dropdown: Wszystkie warsztaty, Warsztaty z dziećmi, Matka i córka, Single parents, Dla dorosłych
  - [x] "Poznajmy się" dropdown: O mnie, Galeria, Opinie, Kontakt
  - [x] "Blog" samodzielna pozycja
  - [x] "Kontakt" samodzielna pozycja
- [x] 1.2 Aktualizacja `Header.tsx` — obsługa wielu dropdownów
  - [x] DropdownNavItem dla każdego item z children
  - [x] Nieklikalne headers (button zamiast Link)
  - [x] Zamykanie poprzedniego dropdown przy otwarciu nowego (stan `openDropdown` w Header)
  - [x] Active state działa dla zagnieżdżonych children
- [x] 1.3 Aktualizacja `MobileMenu.tsx` — accordion dla obu dropdownów
  - [x] Dwa niezależne accordion sections
  - [x] Nieklikalne headers (button zamiast Link)
  - [x] Blog i Kontakt jako zwykłe linki
- [x] 1.4 Build check — OK (27 stron, 0 błędów)
- [x] 1.5 Commit fazy 1 — `489250c`

## Do poprawy po review fazy 1

- [x] 🔴 [blocking] **Header.tsx:onClose** — race condition przy rapid hover → fix: `setOpenDropdown(prev => ...)`
- [x] 🔴 [blocking] **Header.tsx:onClick** — brak toggle → fix: `isOpen ? onClose() : onOpen()`
- [x] 🟠 [important] **Header.tsx** — click-outside detection → fix: `useEffect` + document click listener
- [x] 🟠 [important] **utils.ts:isNavActive** — guard `if (!href) return false`
- [x] 🟠 [important] **Header.tsx:aria-haspopup** → `"menu"`

## Faza 2: Hero + Kafelki kategorii (zmiany 5, 9, 10) ✅

- [x] 2.1 Zmiana H2 w `HeroSection.tsx`
  - [x] Nowy tekst: "Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie."
  - [x] Zmiana w wariancie motion
  - [x] Zmiana w wariancie reduced-motion
- [x] 2.2 Usunięcie USP pod slideshow w `HeroSection.tsx`
- [x] 2.3 Usunięcie "Polecane przez rodziców" + gwiazdek z `HeroSection.tsx`
- [x] 2.4 Dodanie gwiazdek + "Polecane przez rodziców" w `OpinionsTeaser.tsx`
- [x] 2.5 Dodanie gwiazdek + "Polecane przez rodziców" w `/opinie/page.tsx`
- [x] 2.6 Nowy komponent `CategoryCards.tsx`
  - [x] 3 karty ze zdjęciami: Wyjazdy z Dziećmi, Dla Matki i Córki, Dla Singli z Dziećmi
  - [x] Responsive grid (1 col mobile, 3 col desktop)
  - [x] ScrollAnimation z staggered delay
  - [x] Linki do kategorii
- [x] 2.7 Integracja `CategoryCards` w `page.tsx` (pod hero, przed kalendarzem)
- [x] 2.8 Build check — OK
- [x] 2.9 Commit fazy 2 — `1b043e1`

## Do poprawy po review fazy 2

- [x] 🟠 [important] Duplikacja gwiazdek → nowy `StarRating` w `shared/`
- [x] 🟠 [important] Gwiazdki `role="img"` + `aria-label` w `StarRating`
- [x] 🟡 [nit] CategoryCards: `role="region" aria-label="Kategorie warsztatów"`
- [x] 🟡 [nit] CategoryCards: `sizes` poprawiony na `calc`

## Faza 3: Strony warsztatów (zmiany 1, 2, 3) ✅

- [x] 3.1 Odwrócenie kolejności mobile w `TripVideo.tsx` (`flex-col-reverse`)
- [x] 3.2 Przycisk FAQ w `[slug]/page.tsx` — link do `/#faq`
  - [x] Tekst: "Masz więcej pytań? Zobacz FAQ"
  - [x] Wariant: secondary button
  - [x] Pozycja: pod sekcjami warsztatu, przed BookingForm
- [x] 3.3 Zmiana nagłówka w `BookingForm.tsx` + `TripPricing.tsx`: "Zapisz się na wyjazd" → "Zapisz się na warsztat"
- [x] 3.4 Build check — OK
- [x] 3.5 Commit fazy 3 — `3bb6746`

## Do poprawy po review fazy 3

- [x] 🔴 [blocking] **HomeFAQ.tsx** — dodane `id="faq"` na SectionWrapper
- [x] 🟠 [important] **[slug]/page.tsx** — FAQ link warunkowy: `{!trip.isPast && ...}`

## Faza 4: Footer (zmiana 4) ✅

- [x] 4.1 Usunięcie "Wyjazdy z Dziećmi" + tagline z `Footer.tsx`
- [x] 4.2 Grid zmieniony z lg:grid-cols-4 na lg:grid-cols-3
- [x] 4.3 Build check — OK
- [x] 4.4 Commit fazy 4

## Finalizacja

- [x] 5.1 Build check — OK (27 stron, 0 błędów)
- [x] 5.2 Lint check — 0 errors, 16 warnings (istniejące)
- [ ] 5.3 Review wizualny wszystkich zmian
- [ ] 5.4 Merge do master (po akceptacji)
