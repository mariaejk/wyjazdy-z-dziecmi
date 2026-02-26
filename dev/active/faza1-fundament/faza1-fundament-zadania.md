# Zadania: Faza 1 — Fundament

Branch: `feature/faza1-fundament`
Ostatnia aktualizacja: 2026-02-26

---

## Etap 1A: Inicjalizacja projektu

- ⬜ **1.1** Inicjalizacja Next.js 15 (`create-next-app` z TS + Tailwind + App Router + src)
- ⬜ **1.2** Instalacja zależności (`motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwind-merge`)
- ⬜ **1.3** Utworzenie `.env.example` (GA4 ID, webhook URLs)

## Etap 1B: Design System i fonty

- ⬜ **1.4** Konfiguracja `globals.css` — `@import "tailwindcss"` + `@theme` (kolory, fonty) + `color-scheme: light`
- ⬜ **1.5** Załadowanie fontów Playfair Display + Inter (`next/font/local`, self-hosted .woff2)
- ⬜ **1.6** Kopiowanie i optymalizacja obrazów do `public/images/` (priorytet: `image_5.png` 1.3MB)

## Etap 1C: Utility files i dane

- ⬜ **1.7** Utworzenie `lib/constants.ts` (SITE_CONFIG, ROUTES, SOCIAL_LINKS, CONTACT)
- ⬜ **1.8** Utworzenie `lib/utils.ts` (cn(), formatDate, formatCurrency)
- ⬜ **1.9** Utworzenie `data/navigation.ts` (5 pozycji menu: O nas, Wyjazdy, Single Parents, Opinie, Kontakt)
- ⬜ **1.10** Utworzenie typów w `types/` (trip.ts, team.ts, place.ts, forms.ts)

## Etap 1D: Komponenty layout

- ⬜ **1.11** Zbudowanie `SkipToContent` (ukryty link, widoczny na Tab, href="#main-content")
- ⬜ **1.12** Zbudowanie `Container` (max-w-7xl, responsive padding)
- ⬜ **1.13** Zbudowanie `Header` (sticky, logo + nav desktop + hamburger mobile, semantyczny HTML)
- ⬜ **1.14** Zbudowanie `MobileMenu` (client component, motion AnimatePresence, focus trap, Escape)
- ⬜ **1.15** Zbudowanie `Footer` (kontakt, social, legal, "Ustawienia cookies" placeholder, newsletter placeholder, copyright)

## Etap 1E: Root layout i error states

- ⬜ **1.16** Root `layout.tsx` (`<html lang="pl">`, fonty CSS vars, SkipToContent + Header + main + Footer, metadata)
- ⬜ **1.17** `loading.tsx` (spinner/skeleton w kolorach design systemu)
- ⬜ **1.18** `error.tsx` (client component, komunikat + reset button)

## Etap 1F: Weryfikacja

- ⬜ **1.19** Weryfikacja końcowa:
  - ⬜ `npm run dev` — zero błędów
  - ⬜ Header widoczny, sticky, nawigacja działa
  - ⬜ MobileMenu otwiera/zamyka (animacja, focus trap, Escape)
  - ⬜ Footer widoczny z linkami
  - ⬜ Fonty: Playfair (nagłówki) + Inter (body)
  - ⬜ Kolory: tło #F9F7F2, akcenty #2D4635, tekst #1A1A1A
  - ⬜ `<html lang="pl">` w źródle
  - ⬜ SkipToContent widoczny na Tab
  - ⬜ `npm run build` przechodzi bez błędów
  - ⬜ Responsywność 320px–1440px

---

## Podsumowanie postępów

| Etap | Zadania | Ukończone | Status |
|------|---------|-----------|--------|
| 1A: Inicjalizacja | 3 | 0 | ⬜ Oczekuje |
| 1B: Design System | 3 | 0 | ⬜ Oczekuje |
| 1C: Utils i dane | 4 | 0 | ⬜ Oczekuje |
| 1D: Komponenty | 5 | 0 | ⬜ Oczekuje |
| 1E: Layout | 3 | 0 | ⬜ Oczekuje |
| 1F: Weryfikacja | 1 | 0 | ⬜ Oczekuje |
| **Łącznie** | **19** | **0** | **0%** |
