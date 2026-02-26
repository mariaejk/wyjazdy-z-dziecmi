# Plan: Faza 1 — Fundament (setup + layout)

Branch: `feature/faza1-fundament`
Ostatnia aktualizacja: 2026-02-26

---

## Podsumowanie wykonawcze

Faza 1 tworzy fundament techniczny projektu "Wyjazdy z Dziećmi" — od inicjalizacji Next.js 15 po działający szkielet strony z nawigacją, fontami, kolorami i responsywnym layoutem. Po jej ukończeniu dev server pokaże pustą stronę z poprawnym Header, MobileMenu, Footer, fontami Playfair Display + Inter, kolorami design systemu i `lang="pl"` na `<html>`.

---

## Analiza obecnego stanu

- Repozytorium git zainicjalizowane z initial commitem
- Dokumentacja gotowa: `dev/plan.md`, `dev/task.md`, `dev/kontekst.md`
- Treści: `docs/tresc_na_strone.md` (pełne dane "Matka i Córka")
- Obrazy: `docs/Images/` — 5 zdjęć + logo (image_5.png = 1.3MB, wymaga optymalizacji)
- Projekt Next.js jeszcze nie utworzony — brak `src/`, `package.json`, `node_modules/`

## Proponowany stan docelowy

Po Fazie 1:
- Działający `npm run dev` z Next.js 15 + TypeScript + Tailwind v4
- Wszystkie zależności zainstalowane (motion, RHF, Zod, Lucide, clsx, tailwind-merge)
- Design system w `globals.css` (@import "tailwindcss" + @theme)
- Fonty self-hosted (Playfair Display + Inter) przez `next/font/local`
- Obrazy zoptymalizowane w `public/images/`
- Komponenty layout: SkipToContent, Container, Header (sticky), MobileMenu (motion), Footer
- Root `layout.tsx` z `lang="pl"`, metadata, SkipToContent + Header + main + Footer
- `loading.tsx` i `error.tsx` (Next.js conventions)
- Utility files: `lib/constants.ts`, `lib/utils.ts`, `data/navigation.ts`
- Typy: `types/trip.ts`, `types/team.ts`, `types/place.ts`, `types/forms.ts`
- `.env.example` z listą zmiennych środowiskowych

---

## Etapy implementacji

### Etap 1A: Inicjalizacja projektu (zadania 1.1–1.3)

Utworzenie projektu Next.js 15, instalacja zależności, `.env.example`.

**Zadania:**

1. **1.1 — Inicjalizacja Next.js 15** (S)
   - `npx create-next-app@latest` z flagami: TypeScript, Tailwind, App Router, src directory
   - Weryfikacja: `npm run dev` uruchamia dev server bez błędów
   - Kryteria akceptacji: strona placeholder widoczna pod localhost:3000

2. **1.2 — Instalacja zależności** (S)
   - `npm install motion react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge`
   - Weryfikacja: `npm ls` pokazuje wszystkie pakiety
   - Kryteria akceptacji: zero peer dependency warnings (lub wyjaśnione)

3. **1.3 — Utworzenie `.env.example`** (S)
   - Plik z 4 zmiennymi: `NEXT_PUBLIC_GA_ID`, `BOOKING_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`, `NEWSLETTER_WEBHOOK_URL`
   - Dodać `.env.local` do `.gitignore`
   - Kryteria akceptacji: plik istnieje, `.env.local` w `.gitignore`

### Etap 1B: Design System i fonty (zadania 1.4–1.6)

Konfiguracja Tailwind v4, fontów i optymalizacja obrazów.

**Zadania:**

4. **1.4 — Konfiguracja `globals.css`** (M)
   - `@import "tailwindcss"` (NIE stare `@tailwind base/components/utilities`)
   - `@theme {}` z kolorami: `--color-parchment: #F9F7F2`, `--color-parchment-dark: #F5F3EE`, `--color-moss: #2D4635`, `--color-graphite: #1A1A1A`
   - `--font-heading: 'Playfair Display', serif` i `--font-body: 'Inter', sans-serif`
   - `color-scheme: light` w globalu
   - Kryteria akceptacji: Tailwind kompiluje się poprawnie, custom kolory dostępne jako klasy (np. `bg-parchment`, `text-moss`)

5. **1.5 — Załadowanie fontów** (M)
   - Pobrać pliki .woff2 Playfair Display (Regular, Bold) i Inter (Regular 400, Medium 500, SemiBold 600)
   - Konfiguracja w `next/font/local` w `layout.tsx`
   - Kryteria akceptacji: fonty ładują się lokalnie (brak requestów do Google Fonts), nagłówki w Playfair, body w Inter

6. **1.6 — Optymalizacja i kopiowanie obrazów** (M)
   - Skopiować z `docs/Images/` do `public/images/`
   - **PRIORYTET:** `image_5.png` (1.3MB) → resize do max 1200px szerokości
   - Nadać semantyczne nazwy: `hero.jpg`, `galeria-1.jpg`, `kacze-bagno.jpg`, `matka-corka.jpg`, `yoga-konie.jpg`, `logo.jpeg`
   - Kryteria akceptacji: żaden obraz > 500KB, poprawne nazwy plików

### Etap 1C: Utility files i dane (zadania 1.7–1.10)

Pliki pomocnicze, stałe, nawigacja i definicje typów.

**Zadania:**

7. **1.7 — `lib/constants.ts`** (S)
   - Kolory design systemu, dane kontaktowe (email, telefon, social linki), routes (URL-e stron)
   - Kryteria akceptacji: eksportuje obiekty SITE_CONFIG, ROUTES, SOCIAL_LINKS, CONTACT

8. **1.8 — `lib/utils.ts`** (S)
   - Helper `cn()` łączący `clsx` + `tailwind-merge`
   - Opcjonalnie: `formatDate()` i `formatCurrency()` (polskie locale)
   - Kryteria akceptacji: `cn('p-4', 'p-2')` zwraca `'p-2'` (tailwind-merge działa)

9. **1.9 — `data/navigation.ts`** (S)
   - Tablica pozycji menu: O nas, Wyjazdy, Single Parents, Opinie, Kontakt
   - Każda pozycja: `{ label, href, description? }`
   - Kryteria akceptacji: tablica z 5 elementami, href-y prowadzą do poprawnych URL

10. **1.10 — Typy w `types/`** (M)
    - `types/trip.ts` — Trip, TripScheduleDay, TripPricing, TripFAQ, TripGalleryImage, TripCollaborator, TripTargetAudience
    - `types/team.ts` — TeamMember
    - `types/place.ts` — Place
    - `types/forms.ts` — BookingFormData, ContactFormData, NewsletterFormData
    - Kryteria akceptacji: wszystkie typy eksportowane, brak błędów TypeScript

### Etap 1D: Komponenty layout (zadania 1.11–1.15)

Budowanie komponentów szkieletu strony.

**Zadania:**

11. **1.11 — `SkipToContent`** (S)
    - Ukryty link "Przejdź do treści", widoczny na focus (Tab)
    - `href="#main-content"` → przenosi fokus na `<main id="main-content">`
    - Kryteria akceptacji: Tab na stronie najpierw pokazuje skip link, kliknięcie przenosi do main

12. **1.12 — `Container`** (S)
    - Wrapper: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
    - Prop `className` do rozszerzania
    - Kryteria akceptacji: treść ma max-width i padding na każdym breakpoincie

13. **1.13 — `Header`** (L)
    - Sticky top, przezroczysty → biały/parchment po scroll (opcja)
    - Logo (next/image, link do `/`) + nawigacja desktop (z `data/navigation.ts`) + hamburger mobile
    - Semantyczny HTML: `<header>`, `<nav>`, `role="navigation"`, `aria-label`
    - Kryteria akceptacji: header widoczny, sticky, logo klikalny, nav items linkują, hamburger widoczny < 768px

14. **1.14 — `MobileMenu`** (L)
    - Client component (`"use client"`)
    - Animowany panel (motion — `import { motion, AnimatePresence } from 'motion/react'`)
    - Overlay + slide-in z lewej lub top
    - `aria-expanded`, focus trap, zamknięcie na Escape
    - Kryteria akceptacji: otwiera/zamyka się płynnie, focus jest trapped, Escape zamyka, overlay kliknięty zamyka

15. **1.15 — `Footer`** (M)
    - 3–4 kolumny: kontakt (email, tel), social (FB, IG), legal (regulamin, polityka prywatności), "Ustawienia cookies" link (placeholder)
    - Newsletter placeholder (pole email, disabled — implementacja w Fazie 5)
    - Copyright z dynamicznym rokiem
    - Kryteria akceptacji: footer widoczny na każdej stronie, linki prowadzą do poprawnych URL, rok dynamiczny

### Etap 1E: Root layout i error states (zadania 1.16–1.18)

Złożenie layoutu i konwencje Next.js.

**Zadania:**

16. **1.16 — Root `layout.tsx`** (M)
    - `<html lang="pl">` — KRYTYCZNE
    - Fonty (Playfair + Inter) jako CSS variables
    - `<body>` z `className={cn(inter.variable, playfair.variable, 'font-body bg-parchment text-graphite')}`
    - SkipToContent + Header + `<main id="main-content">` + Footer
    - Default metadata: tytuł, opis, OG image
    - Kryteria akceptacji: `document.documentElement.lang === 'pl'`, fonty działają, layout renderuje Header+main+Footer

17. **1.17 — `loading.tsx`** (S)
    - Prosty loading spinner lub skeleton
    - Design spójny z design systemem (kolory moss/parchment)
    - Kryteria akceptacji: plik istnieje w `app/`, eksportuje domyślny komponent

18. **1.18 — `error.tsx`** (S)
    - Client component (`"use client"`)
    - Przyjazny komunikat błędu + przycisk "Spróbuj ponownie"
    - Kryteria akceptacji: `error.tsx` jest client componentem, ma `reset()` callback

### Etap 1F: Weryfikacja (zadanie 1.19)

19. **1.19 — Weryfikacja końcowa Fazy 1** (M)
    - `npm run dev` — zero błędów w konsoli
    - Header widoczny z nawigacją
    - MobileMenu otwiera/zamyka się
    - Footer widoczny
    - Fonty: nagłówki w Playfair, body w Inter
    - Kolory: tło #F9F7F2, tekst #1A1A1A
    - `<html lang="pl">` w źródle strony
    - SkipToContent widoczny na Tab
    - `npm run build` przechodzi bez błędów
    - Kryteria akceptacji: WSZYSTKIE powyższe punkty spełnione

---

## Zależności między zadaniami

```
1.1 → 1.2 → 1.4 → 1.5
                  ↘
1.3 (równolegle z 1.2)  1.6 (równolegle z 1.4)
                  ↘
1.7, 1.8 (po 1.1)
1.9 (po 1.7)
1.10 (po 1.1)
                  ↓
1.11, 1.12 (po 1.4, 1.8)
1.13 (po 1.9, 1.11, 1.12)
1.14 (po 1.13) — wymaga Header
1.15 (po 1.12)
                  ↓
1.16 (po 1.5, 1.11, 1.13, 1.15) — łączy wszystko
1.17, 1.18 (po 1.16)
                  ↓
1.19 (po WSZYSTKICH)
```

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Tailwind v4 breaking changes | Średnie | Wysoki | Sprawdzić oficjalną dokumentację v4, użyć `@import "tailwindcss"` + `@theme` |
| `motion` API differences vs `framer-motion` | Niskie | Średni | API jest identyczne, ale importy z `motion/react` (nie `framer-motion`) |
| `next/font/local` — problem z plikami .woff2 | Niskie | Niski | Fonty dostępne na Google Fonts CDN → pobrać .woff2 z fontsource lub google-webfonts-helper |
| `image_5.png` 1.3MB — konwersja | Niskie | Niski | Sharp/Next.js `next/image` auto-optymalizuje, ale lepiej zresizować przed deploy |
| MobileMenu focus trap | Średnie | Średni | Użyć prostego rozwiązania z `useEffect` + `document.addEventListener('keydown')` |

---

## Mierniki sukcesu

- [ ] `npm run dev` uruchamia się bez błędów
- [ ] `npm run build` przechodzi czysto
- [ ] `<html lang="pl">` w DOM
- [ ] Fonty: Playfair Display (nagłówki), Inter (body) — widoczne w DevTools
- [ ] Kolory: `#F9F7F2` tło, `#2D4635` akcenty, `#1A1A1A` tekst
- [ ] Header sticky z nawigacją desktop i hamburgerem mobile
- [ ] MobileMenu animowany, focus trapped, Escape zamyka
- [ ] Footer z kontaktem, social, legal, "Ustawienia cookies"
- [ ] SkipToContent widoczny na Tab, przenosi do `<main>`
- [ ] `loading.tsx` i `error.tsx` istnieją
- [ ] Responsywność: 320px–1440px bez overflow

---

## Szacunki nakładu pracy

| Etap | Zadania | Nakład | Opis |
|------|---------|--------|------|
| 1A | 1.1–1.3 | S | Inicjalizacja, instalacja, .env |
| 1B | 1.4–1.6 | M | CSS, fonty, obrazy |
| 1C | 1.7–1.10 | M | Utils, dane, typy |
| 1D | 1.11–1.15 | L | 5 komponentów layout |
| 1E | 1.16–1.18 | M | Root layout, loading, error |
| 1F | 1.19 | S | Weryfikacja |
| **Łącznie** | **19** | **L** | |

---

## Wymagane zasoby

- Node.js 18+ zainstalowany
- npm (dostarczany z Node)
- Pliki fontów .woff2 (Playfair Display, Inter) — do pobrania
- Narzędzie do optymalizacji obrazów (sharp / squoosh / lub ręczny resize)
