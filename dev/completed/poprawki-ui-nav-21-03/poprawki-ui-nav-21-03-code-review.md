# Code Review — Końcowy: Poprawki UI + Nawigacja 21.03.2026

Last Updated: 2026-03-21
Branch: `feature/poprawki-ui-nav-21-03`
Commits: 8 (docs init + 4 fazy + 3 zestawy poprawek)
Pliki src/ zmienione: 16

---

## Executive Summary

Branch wdraża 10 zaplanowanych zmian UI/UX w 4 fazach. Wszystkie 10 zmian jest zrealizowanych. Poprawki z review faz 1-3 zostały zastosowane. Build przechodzi bez bledow (27 stron). Kod jest spojny, stosuje wzorce projektu (cn(), motion/react, ScrollAnimation, Server/Client separation). Brak regresji w glownych funkcjonalnosciach.

Znaleziono: 0 blocking, 2 important, 5 nit, 4 suggestion. Branch nadaje sie do merge po uwzglednieniu punktow important lub swiadomym zaakceptowaniu ich jako known issues.

---

## Weryfikacja planu (10/10 zmian)

| # | Zmiana | Status |
|---|--------|--------|
| 1 | TripVideo — odwrocona kolejnosc mobile (flex-col-reverse) | OK |
| 2 | Przycisk "Masz wiecej pytan? Zobacz FAQ" na stronach warsztatow | OK |
| 3 | "Zapisz sie na wyjazd" -> "Zapisz sie na warsztat" (BookingForm + TripPricing) | OK |
| 4 | Usuniecie tagline z footer, grid 4->3 kolumny | OK |
| 5 | Przeniesienie "Polecane przez rodzicow" z hero -> nad OpinionsTeaser i /opinie | OK |
| 6 | Usuniecie gwiazdek z HeroSection | OK |
| 7 | Usuniecie USP pod slideshow z HeroSection | OK |
| 8 | Zmiana H2 hero na "Ty sie regenerujesz..." + oba warianty spojne | OK |
| 9 | Nowy komponent CategoryCards (3 kafelki, responsive, ScrollAnimation) | OK |
| 10 | Przebudowa nawigacji: 2 dropdowny + Blog + Kontakt | OK |

---

## Wazne poprawki (should fix)

### 🟠 [important] Kontakt zduplikowany w nawigacji

**Plik:** `src/data/navigation.ts`, linie 28 i 32

Kontakt pojawia sie dwa razy: raz wewnatrz dropdown "Poznajmy sie" (linia 28) jako child, raz jako top-level samodzielna pozycja (linia 32).

```ts
// Dropdown "Poznajmy sie"
{ label: "Kontakt", href: ROUTES.contact },   // linia 28

// Top-level
{ label: "Kontakt", href: ROUTES.contact },   // linia 32
```

Plan jawnie zaznacza to jako zamierzone ("szybki dostep + discovery w dropdown") i ocenia ryzyko jako niski. Brak bledu React (klucze sa unikalne w kazdej liscie). Jednak w menu mobilnym uzytkownik widzi "Kontakt" w accordion "Poznajmy sie" ORAZ osobny link "Kontakt" pod spodem — moze byc mylace.

Rekomendacja: jesli duplikacja jest celowa, dodaj komentarz w navigation.ts dokumentujacy ta decyzje. Alternatywnie: usun Kontakt z dropdown "Poznajmy sie" (zostaje tylko top-level). Crawlery SEO moga uznac duplikat linku za redundancje.

---

### 🟠 [important] CategoryCards — potencjalny visual rhythm problem

**Plik:** `src/components/home/CategoryCards.tsx`, linia 31

`CategoryCards` uzywa `<SectionWrapper>` bez `variant` — domyslnie "default" (bg-parchment). Sekcja pojawia sie bezposrednio po `HeroSection` (bg-gradient from parchment). Dwie sekcje o tym samym tle moga zlewac sie wizualnie bez wyraznego separatora.

Sekwencja tel na homepage:
```
HeroSection     — bg-gradient-to-br from-parchment via-parchment to-coral/15
CategoryCards   — bg-parchment (default)     <- tu, to samo tlo
TripCalendar    — bg-parchment-dark (alternate)  <- kontrast pojawia sie tu
```

Karty ze zdjeciami maja shadow-lg, wiec granica moze byc wystarczajaca wizualnie. Ale na jasnych ekranach lub przy bardzo podobnych kolorach efekt moze byc niezadowalajacy.

Rekomendacja: zweryfikuj wizualnie na urzadzeniu. Jesli sekcja zlewa sie z hero, zmien na `variant="alternate"`.

---

## Drobne uwagi (nit)

### 🟡 [nit] HeroSection — niespojne padding miedzy wariantem reduced-motion a motion

**Plik:** `src/components/home/HeroSection.tsx`, linie 53 i 113

Wariant reduced-motion: `pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20`
Wariant motion: `py-12 sm:py-16 lg:py-20`

Padding gorny rozni sie (pt-8 vs py-12, czyli 2rem vs 3rem). Rozbieznosc istniala juz przed tym branchem (nie jest wniesiona przez ten branch), ale warto odnotowac — roznica wizualna dotyczy tylko uzytkownikow z `prefers-reduced-motion`.

---

### 🟡 [nit] OpinionsTeaser — SectionHeading bez subtitle

**Plik:** `src/components/home/OpinionsTeaser.tsx`, linia 19-21

`<SectionHeading title="Opinie uczestnikow" />` nie ma `subtitle`. Wiekszosc innych sekcji ma subtitle. Niespojnosc stylistyczna — nie blad, ale warto rozwazyc dodanie np. "Co mowia uczestnicy naszych warsztatow" (tak jak na podstronie /opinie).

---

### 🟡 [nit] StarRating — hardcoded ocena

**Plik:** `src/components/shared/StarRating.tsx`, linia 8

Tekst i aria-label sa zakodowane na stale jako "5 z 5 gwiazdek". Dla aktualnego use case (zawsze 5/5) akceptowalne. Jesli komponent bedzie uzyty z inna ocena w przyszlosci, wymagana bedzie refaktoryzacja (dodanie props `count` i `max`).

---

### 🟡 [nit] CategoryCards — brak 4. kategorii "Dla doroslych"

**Plik:** `src/components/home/CategoryCards.tsx`

Plan zakladal 3 kafelki — jest 3. "Dla doroslych" swiadomie pominiete (jest placeholder page, noindex). Odnotowac na przyszlosc: gdy `/dla-doroslych` dostanie pelna tresc i zdjecia, mozna dodac 4. kafelek.

---

### 🟡 [nit] Footer — import SITE_CONFIG uzywany tylko w copyright

**Plik:** `src/components/layout/Footer.tsx`, linia 8 i 100

Po usunieciu sekcji brand jedynym uryciem SITE_CONFIG jest copyright `{SITE_CONFIG.name}`. Import jest nadal uzasadniony i poprawny. Punkt informacyjny — brak akcji.

---

## Sugestie (suggestion)

### 🔵 [suggestion] MobileMenu — accordion nie resetuje sie przy ponownym otwarciu menu

**Plik:** `src/components/layout/MobileMenu.tsx`

`expandedItem` state jest w `MobileNavLinks`. Gdy menu zostaje zamkniete i ponownie otwarte, expandedItem zachowuje poprzedni stan — accordion "Warsztaty" lub "Poznajmy sie" pozostaje otwarty. Uzytkownik moze sie spodziewac stanu zwiniectego przy kazdym otwarciu menu.

Mozliwe rozwiazanie: przekazac `isOpen` jako prop do `MobileNavLinks` i wywolac `setExpandedItem(null)` w useEffect przy `isOpen === false`.

---

### 🔵 [suggestion] Header — click-outside listener tworzony/niszczony przy kazdym hover

**Plik:** `src/components/layout/Header.tsx`, linia 119-128

`useEffect` z `document.addEventListener` jest zalezny od `openDropdown` — przy kazdej zmianie stanu (hover wejscie/wyjscie) listener jest usuwany i dodawany na nowo. Dla typowego uzycia to nie problem, ale przy bardzo szybkim hover moze powodowac nadmiarowe operacje.

Alternatywa: listener zawsze aktywny (bez warunku `if (!openDropdown) return`), warunkowo ignorujacy klikniecia gdy dropdown jest zamkniety.

---

### 🔵 [suggestion] TripVideo — aria-label mogloby byc bardziej opisowe

**Plik:** `src/components/trips/TripVideo.tsx`, linia 39

`aria-label="Film promocyjny z warsztatow"` nie zawiera tytulu warsztatu. Lepiej: dynamiczny `aria-label` na podstawie przekazanego tytulu. Wymagalby dodatkowego prop `tripTitle?: string`. Akceptowalne jako future improvement.

---

### 🔵 [suggestion] [slug]/page.tsx — FAQ link tylko na warsztatach z FAQ

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`, linia 163-175

FAQ link jest renderowany dla wszystkich aktywnych warsztatow (`!trip.isPast`), niezaleznie od tego czy warsztat ma wlasne FAQ (`hasFAQ`). Logicznie: jesli warsztat ma wlasne sekcje FAQ, link "Masz wiecej pytan? Zobacz FAQ na stronie glownej" jest mniej potrzebny. Mozna rozwazyc `{!trip.isPast && !hasFAQ && ...}` lub zachowac obecny stan jako zawsze-widoczny fallback.

---

## Ocena jakosci implementacji

### Nawigacja (Header + MobileMenu) — DOBRA

- Items z `children` -> `<button>` (nieklikalne), bez `children` -> `<Link>`. Empty `href: ""` nigdy nie trafia do `<Link>`.
- `isNavActive("")` zwraca `false` (guard w utils.ts linia 65). Brak false-positive active state dla dropdown rodzicow.
- Race condition fix: `onClose` uzywa `setOpenDropdown(prev => prev === item.label ? null : prev)`.
- Toggle przy click: `onClick={() => (isOpen ? onClose() : onOpen())}` — poprawne.
- Click-outside: `useEffect` + `navRef.current.contains()` — standardowy pattern.
- ARIA: `aria-expanded`, `aria-haspopup="menu"`, `role="menu"`, `role="menuitem"`, `role="none"`, `aria-current="page"` — poprawna implementacja menu pattern.
- Focus trap w MobileMenu zachowany przez `handleKeyDown` (Tab cycling + Escape).
- `useReducedMotion` w MobileMenu z `duration: 0`.

### HeroSection — DOBRA

- Zmiana H2 zastosowana w OBU wariantach (linie 72-75 i 145-153). Spojnosc zachowana.
- Stary tekst "Zatrzymaj sie. Odetchnij. Spotkaj swoje dziecko na nowo." calkowicie usuniety.
- USP pod slideshow usuniety w obu wariantach.
- Import `Star` z lucide usuniety razem z gwiazdkami — brak unused import.

### CategoryCards — DOBRA

- Server Component (brak `"use client"`) — poprawne.
- `role="region" aria-label="Kategorie warsztatow"` na kontenerze.
- `sizes` z `calc((100vw - 5rem) / 3)` — prawidlowy wzorzec.
- Staggered delay `index * 0.12` — spojne z projektem.
- `className="h-full"` na ScrollAnimation — zgodne z lessons learned (card alignment w grid).
- Obrazy istnieja w `public/images/`: hero.jpg, matki-corki-1.jpg, przeszly-1.jpg — zweryfikowane.

### StarRating — DOBRA

- Wydzielony jako shared komponent — eliminacja duplikacji (feedback z review fazy 2).
- `role="img"` + `aria-label` — poprawny accessibility pattern.
- Server Component.

### TripVideo — DOBRA

- `flex-col-reverse` — opis pierwszy na mobile, wideo pod spodem.
- `lg:flex-row` — desktop bez zmian.

### FAQ link na stronach warsztatow — DOBRA

- `HomeFAQ.tsx` ma `id="faq"` na `SectionWrapper` (linia 56) — fix z review fazy 3 zastosowany.
- `href="/#faq"` — absolute path, dziala miedzy podstronami.
- `{!trip.isPast && ...}` — warunkowy render, fix z review fazy 3 zastosowany.

### BookingForm + TripPricing — DOBRA

- "Zapisz sie na wyjazd" -> "Zapisz sie na warsztat" w obu plikach.
- `StickyBookingCTA` zawiera "Zarezerwuj miejsce" — nie wymaga zmiany.

### Footer — DOBRA

- Sekcja brand usunieta, grid 4->3 kolumny.
- `SITE_CONFIG` import zachowany i uzywany w copyright.

### TypeScript — DOBRA

- `NavItem.href: string` — empty string `""` jest poprawnym `string`.
- Brak widocznych `any`, brak duplikatow importow.
- `"use client"` tylko tam gdzie potrzebne.

### Wzorce projektu — DOBRA

- `cn()` uzywane wszedzie.
- `motion/react` (nie `framer-motion`) w MobileMenu.
- `import type` dla typow.
- Polskie znaki UTF-8 w JSX/TSX. HomeFAQ.tsx uzywa `\u201E` i `\u201D` dla typograficznych cudzysłowow w JS string literals — zgodnie z lessons learned.

---

## Podsumowanie faz i poprawek

| Faza | Poprawki z review | Stan |
|------|-------------------|------|
| Faza 1: Nawigacja | race condition, toggle, click-outside, isNavActive guard, aria-haspopup | OK — wszystkie zastosowane |
| Faza 2: Hero + kafelki | StarRating shared component, role/aria na gwiazdkach, CategoryCards region + sizes | OK — wszystkie zastosowane |
| Faza 3: Warsztaty | id="faq" na HomeFAQ, warunkowy FAQ link (!isPast) | OK — obie zastosowane |
| Faza 4: Footer | brak poprawek wymaganych | OK |

Nota: "zbedne importy" zgloszne w review fazy 3 to byl falszywy alarm — Container, SectionWrapper, Button, ScrollAnimation nie byly w masterze przed tym branchem. Sa to legitymne nowe importy wymagane przez sekcje FAQ link.

---

## Decyzja merge

Branch jest gotowy do merge po weryfikacji wizualnej (zadanie 5.3).

Dwa punkty "important":
1. **Duplikacja Kontaktu w nav** — zamierzona wg planu, warto dodac komentarz w navigation.ts.
2. **CategoryCards visual rhythm** — wymaga weryfikacji wizualnej na urzadzeniu; jesli hero i kategorie zlewaja sie, zmienic na `variant="alternate"`.

Po przeprowadzeniu review wizualnego (punkt 5.3 w zadaniach) i akceptacji powyzszych punktow — merge do master.
