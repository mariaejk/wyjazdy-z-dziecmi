# Design System — wyjazdyzdziecmi.pl

Dokumentacja wizualna strony. Dla klientki (podejmowanie decyzji o kolorach/czcionkach) i developera (implementacja).

---

## 1. Czcionki

| Rola | Czcionka | Styl | Gdzie używana |
|------|----------|------|---------------|
| **Nagłówki** | Georgia | font-light, italic | H1, H2, SectionHeading, tytuły kart, tytuły sekcji |
| **Tekst** | Inter | normal 400/500/600 | Paragrafy, formularze, przyciski, menu, stopka |
| **Logo (tekst)** | Lora | normal 400/500 | Logo kompas — "Warsztaty z dziećmi" |
| **Logo (akcent)** | Caveat | 500/600 | Akcentowy tekst w SectionHeading (`italicText`) |

Georgia to czcionka systemowa (pre-installed na wszystkich urządzeniach) — zero pobierania, zero requestów. Inter, Lora i Caveat self-hosted przez `next/font/google` — RODO OK.

**Zmienne CSS:**
```css
--font-heading: Georgia, "Times New Roman", serif;  /* Georgia — system font */
--font-body: var(--font-inter);                      /* Inter */
--font-lora: var(--font-lora);                       /* Lora — logo */
--font-caveat: var(--font-caveat);                   /* Caveat — akcenty */
```

**Klasy Tailwind:**
- `font-heading` — nagłówki (Georgia)
- `font-body` — tekst (Inter, domyślny na body)
- `font-[family-name:var(--font-lora)]` — Lora w logo
- `font-[family-name:var(--font-caveat)]` — Caveat w akcentach

---

## 2. Paleta kolorów

### Kolory główne

| Nazwa | HEX | Zmienna CSS | Klasa Tailwind | Użycie |
|-------|-----|-------------|----------------|--------|
| Kremowa biel | `#FAF9F6` | `--color-parchment` | `bg-parchment` | Tło strony |
| Jasny len | `#F2EFE9` | `--color-parchment-dark` | `bg-parchment-dark` | Tło sekcji alternate |
| Mech (moss) | `#6C7A63` | `--color-moss` | `bg-moss`, `text-moss` | **Przyciski, CTA, akcenty** |
| Mech jasny | `#8A9680` | `--color-moss-light` | `bg-moss-light` | Hover przycisków |
| Grafit | `#222222` | `--color-graphite` | `bg-graphite`, `text-graphite` | Tekst główny |
| Grafit jasny | `#555555` | `--color-graphite-light` | `text-graphite-light` | Tekst drugorzędny |

### Kolory akcentowe

| Nazwa | HEX | Zmienna CSS | Użycie |
|-------|-----|-------------|--------|
| Leśna zieleń | `#2D6A4F` | `--color-terracotta` | Kalendarz kategoria "dla dorosłych" |
| Ciemna zieleń | `#1B4332` | `--color-terracotta-dark` | — |
| Musztarda | `#DDB74A` | `--color-mustard` | Kalendarz kategoria "matka-córka" |
| Mięta | `#95D5B2` | `--color-coral` | — |
| Taupe | `#8B857B` | `--color-taupe` | — |
| Szałwia | `#7BA187` | `--color-sage` | — |
| Lawenda | `#C4B5D4` | `--color-lavender` | Kalendarz kategoria "single-parents" |

### Kolory kategorii (kalendarz + badge)

| Kategoria | Kolor kalendarza | Badge |
|-----------|-----------------|-------|
| Warsztaty z dziećmi | moss (zielony) | `bg-moss/15 text-moss` |
| Matka i córka | mustard (złoty) | `bg-mustard/20 text-amber-700` |
| Single z dziećmi | lavender (fioletowy) | `bg-lavender/20 text-purple-700` |
| Czas bez dzieci | terracotta (ciemnozielony) | `bg-terracotta/15 text-terracotta-dark` |

---

## 3. Przyciski

Wszystkie przyciski mają kolor **moss** (`#6C7A63`).

| Wariant | Wygląd | Klasy | Użycie |
|---------|--------|-------|--------|
| **Primary** | Wypełniony zielony | `bg-moss text-white hover:bg-moss-light` | Główne CTA: Zarezerwuj, Zapisz się |
| **Secondary** | Obramowanie zielone | `border-moss text-moss hover:bg-moss hover:text-white` | Drugorzędne: Zobacz szczegóły, Napisz do nas |
| **Ghost** | Podkreślony tekst | `text-moss underline` | Linki tekstowe |

**Styl tekstu przycisków:** `text-[11px] uppercase tracking-[0.2em]` — małe litery, duży rozstrzał.

**Kształt:** `rounded-none` (prostokątne, bez zaokrągleń).

---

## 4. Kształty i style

- **Prostokątne kształty** — `rounded-none` wszędzie
- **Wyjątek:** Badge ma `rounded-sm`
- **Borders:** `border-graphite/8` lub `border-graphite/10` (bardzo subtelne)
- **Cienie:** minimalne, tylko na kartach (`shadow-sm` → `shadow-md` na hover)

---

## 5. Nagłówki — styl editorial

Nagłówki sekcji używają komponentu `SectionHeading` z propami:

| Prop | Opis | Przykład |
|------|------|---------|
| `title` | Tekst główny | "Najczęściej wybierane" |
| `italicText` | Akcentowy tekst (italic) | "warsztaty" |
| `underline` | Dekoracyjne podkreślenie SVG | `true` |
| `overline` | Mały tekst nad nagłówkiem | "Z bloga" |
| `subtitle` | Tekst pod nagłówkiem | "Wybierz warsztat..." |

**Styl nagłówków:** `font-heading font-light` (nie bold). Italic accent w `text-graphite-light`.

**Dekoracyjne podkreślenie:** SVG krzywa linia pod `italicText`, kolor `text-graphite-light/40`.

---

## 6. Sekcje i spacing

| Element | Padding domyślny | Padding zmniejszony |
|---------|-----------------|---------------------|
| SectionWrapper | `py-16 sm:py-20 lg:py-24` | `py-10 sm:py-12` lub `py-10 sm:py-14` |
| SectionHeading margin | `mb-8 sm:mb-10 lg:mb-12` | — |

Sekcje alternate (co druga): `bg-parchment-dark` zamiast `bg-parchment`.

---

## 7. Nawigacja

- 4 pozycje top-level: Warsztaty▼, Poznajmy się▼, Blog, Kontakt
- **Active page:** podkreślenie `border-b-2 border-moss` (nie tło)
- **Dropdown:** hover na desktop, accordion na mobile
- **Mobile CTA:** "Sprawdź terminy" w headerze

---

## 8. Karty warsztatów

| Miejsce | Layout | Komponent |
|---------|--------|-----------|
| Strona główna | Pionowy (zdjęcie góra, tekst dół), grid 3-kol | `TripCard` |
| /wyjazdy | Horyzontalny (zdjęcie lewa, tekst prawa), lista | `TripCardHorizontal` |
| Strony kategorii | Pionowy, grid 1-kol | `TripCard` |

---

## 9. Pliki źródłowe

| Co | Gdzie |
|----|-------|
| Kolory, czcionki CSS | `src/app/globals.css` → `@theme {}` |
| Czcionki load | `src/app/(main)/layout.tsx` |
| Komponent Button | `src/components/ui/Button.tsx` |
| Komponent SectionHeading | `src/components/ui/SectionHeading.tsx` |
| Komponent Card | `src/components/ui/Card.tsx` |
| Kolory kategorii | `src/lib/category-config.ts` |
| Logo | `src/components/layout/Logo.tsx` |

---

## 10. Zasady dla developera

1. **Nigdy nie używaj `rounded-*`** (poza Badge `rounded-sm`)
2. **Przyciski zawsze `bg-moss`** — nie terracotta, nie graphite
3. **Nagłówki `font-light`** — nie bold (styl editorial)
4. **`cn()` zamiast template literals** — tailwind-merge zapobiega konfliktom
5. **Czcionki self-hosted** — nie dodawaj `<link>` do Google Fonts
6. **Polskie znaki UTF-8** — literalne znaki, nie `\uXXXX`
