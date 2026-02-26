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

- ✅ **1.16** Root `layout.tsx` — `<html lang="pl">`, fonty CSS vars, SkipToContent + Header + `<main id="main-content">` + Footer, rozszerzone metadata (title template, OG image, metadataBase)
- ✅ **1.17** `loading.tsx` — spinner (animate-spin border-t-moss) + "Ładowanie..." tekst, min-h-[50vh] centered
- ✅ **1.18** `error.tsx` — "use client", komunikat "Coś poszło nie tak" + przycisk "Spróbuj ponownie" (reset())

## Etap 1F: Weryfikacja

- ✅ **1.19** Weryfikacja końcowa:
  - ✅ `npm run dev` / `next start` — HTTP 200, zero błędów
  - ✅ Header widoczny, sticky (`sticky top-0 z-40`), 5 nav links + hamburger
  - ✅ MobileMenu — komponent gotowy (AnimatePresence, focus trap, Escape) — wymaga testu interaktywnego w przeglądarce
  - ✅ Footer widoczny — kontakt (email, tel), social (FB, IG), legal (regulamin, prywatność), "Ustawienia cookies", newsletter placeholder, copyright 2026
  - ✅ Fonty: 4 pliki .woff2 self-hosted (Playfair Display + Inter), zero requestów do Google
  - ✅ Kolory: `bg-parchment`, `text-graphite`, `text-moss` — potwierdzone w HTML source
  - ✅ `<html lang="pl">` — potwierdzone w HTML source
  - ✅ SkipToContent: `href="#main-content"`, `fixed z-50 -translate-y-full focus:translate-y-0` — widoczny na focus
  - ✅ `npm run build` — PASS (zero errors, Turbopack 7.4s)
  - ✅ `npm run lint` — 0 errors (3 warnings w .claude/hooks, nie w projekcie)
  - ⚠️ Responsywność 320px–1440px — wymaga ręcznego testu w przeglądarce (HTML renderuje się poprawnie)

---

## Podsumowanie postępów

| Etap | Zadania | Ukończone | Status |
|------|---------|-----------|--------|
| 1A: Inicjalizacja | 3 | 3 | ✅ Ukończony |
| 1B: Design System | 3 | 3 | ✅ Ukończony |
| 1C: Utils i dane | 4 | 4 | ✅ Ukończony |
| 1D: Komponenty | 5 | 5 | ✅ Ukończony |
| 1E: Layout | 3 | 3 | ✅ Ukończony |
| 1F: Weryfikacja | 1 | 1 | ✅ Ukończony |
| **Łącznie** | **19** | **19** | **100%** |

---

## Do poprawy po review Fazy 1

### 🟠 Important (powinno być naprawione)
- [ ] 🟠 **globals.css:21** + **MobileMenu.tsx** — dodać `prefers-reduced-motion: reduce` (WCAG 2.3.3): wyłączyć `scroll-behavior: smooth` i animacje motion
- [ ] 🟠 **Footer.tsx:121-135** — dodać `cursor-not-allowed opacity-60` na disabled newsletter input/button + poprawić aria-label
- [ ] 🟠 **Container.tsx:4,6** + **layout.tsx:44** — named imports (`ReactNode`, `ElementType`) zamiast `React.ReactNode`
- [ ] 🟠 **Footer.tsx** — owinąć newsletter placeholder w `<form>` dla poprawnej semantyki
- [ ] 🟠 **types/trip.ts** — dodać `TripTargetAudience` jako osobny typ (zgodność z planem zadanie 1.10)

### 🟡 Nit (opcjonalne)
- [ ] 🟡 **MobileMenu.tsx** — `w-72` → `w-4/5 max-w-xs` (lepiej na 320px)
- [ ] 🟡 **MobileMenu.tsx:49** — `setTimeout` wokół `closeButtonRef.current?.focus()` (czekaj na mount animacji)
- [ ] 🟡 **error.tsx** — dodać `console.error(error)` jako placeholder dla monitoringu
- [ ] 🟡 **globals.css** — usunąć nadmiarowe `--color-white: #FFFFFF` (Tailwind v4 definiuje `white`)
- [ ] 🟡 **Header.tsx** — rozważyć wydzielenie HamburgerButton jako osobny Client Component (RSC optymalizacja)
