# Zadania: Faza 1 — Fundament

Branch: `feature/faza1-fundament`
Ostatnia aktualizacja: 2026-02-27

---

## Etap 1A: Inicjalizacja projektu

- ✅ **1.1** Inicjalizacja Next.js 16.1.6 (`create-next-app` z TS + Tailwind + App Router + src) — React 19.2, Turbopack
- ✅ **1.2** Instalacja zależności (motion 12.34, react-hook-form 7.71, zod 4.3, lucide-react 0.575, clsx 2.1, tailwind-merge 3.5)
- ✅ **1.3** Utworzenie `.env.example` + aktualizacja `.gitignore` (env, .next, build, DS_Store)

## Etap 1B: Design System i fonty

- ✅ **1.4** Konfiguracja `globals.css` — `@import "tailwindcss"` + `@theme` (6 kolorów + 2 fonty) + `color-scheme: light` + focus/selection styles
- ✅ **1.5** Załadowanie fontów Playfair Display + Inter (`next/font/google` z auto self-hosting, RODO OK)
- ✅ **1.6** Kopiowanie + optymalizacja 6 obrazów do `public/images/` — yoga-konie.png: 1.3MB → 256KB JPG (-80%)

## Etap 1C: Utility files i dane

- ✅ **1.7** `lib/constants.ts` — SITE_CONFIG, ROUTES (9 stron), SOCIAL_LINKS, CONTACT
- ✅ **1.8** `lib/utils.ts` — cn(), formatDate(), formatDateShort(), formatCurrency() (polskie locale)
- ✅ **1.9** `data/navigation.ts` — 5 pozycji menu + 2 legal links, importuje z ROUTES
- ✅ **1.10** `types/` — trip.ts (Trip + 7 subtypów), team.ts, place.ts, forms.ts (3 formularze + honeypot)

## Etap 1D: Komponenty layout

- ✅ **1.11** Zbudowanie `SkipToContent` (ukryty link `fixed z-50`, widoczny na focus/Tab, href="#main-content")
- ✅ **1.12** Zbudowanie `Container` (max-w-7xl, responsive padding, `as` prop do zmiany elementu)
- ✅ **1.13** Zbudowanie `Header` (sticky, logo+nav desktop, hamburger mobile, `aria-label`, `aria-expanded`, semantyczny HTML)
- ✅ **1.14** Zbudowanie `MobileMenu` (client component, motion AnimatePresence, slide-from-right, focus trap, Escape, overlay click, body scroll lock)
- ✅ **1.15** Zbudowanie `Footer` (4-kolumnowy grid: brand/kontakt/social/legal, newsletter placeholder disabled, "Ustawienia cookies" button, dynamiczny copyright)

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
| 1A: Inicjalizacja | 3 | 3 | ✅ Ukończony |
| 1B: Design System | 3 | 3 | ✅ Ukończony |
| 1C: Utils i dane | 4 | 4 | ✅ Ukończony |
| 1D: Komponenty | 5 | 5 | ✅ Ukończony |
| 1E: Layout | 3 | 0 | ⬜ Oczekuje |
| 1F: Weryfikacja | 1 | 0 | ⬜ Oczekuje |
| **Łącznie** | **19** | **15** | **79%** |
