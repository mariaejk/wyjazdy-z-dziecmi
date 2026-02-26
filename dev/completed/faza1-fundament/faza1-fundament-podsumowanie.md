# Podsumowanie: Faza 1 — Fundament

**Data ukończenia:** 2026-02-27
**Branch:** `feature/faza1-fundament`
**Commity:** 6 (od `6bf007a` do `8bf68a2`)
**Werdykt code review:** APPROVE (0 blocking, 5 important, 5 nit)

---

## Co zostało dostarczone

Kompletny fundament techniczny landing page "Wyjazdy z Dziećmi":
- Działający projekt Next.js 16.1.6 + TypeScript + Tailwind CSS v4
- Design system (6 kolorów, 2 fonty self-hosted, globals.css z @theme)
- Komponenty layout: SkipToContent, Container, Header (sticky + nav), MobileMenu (motion, focus trap), Footer (4-col grid)
- Root layout z `<html lang="pl">`, OG metadata, loading.tsx, error.tsx
- Utility files: constants, utils (cn, formatDate, formatCurrency), navigation, typy TypeScript
- 6 zoptymalizowanych obrazów w public/images/
- `npm run build` PASS, `npm run lint` 0 errors

## Kluczowe decyzje

| # | Decyzja | Powód |
|---|---------|-------|
| 1 | Next.js **16** zamiast 15 | @latest daje v16, App Router API identyczne, kompatybilne wstecz |
| 2 | `next/font/google` zamiast `next/font/local` | Auto self-hosting, zero requestów do Google w runtime, RODO OK |
| 3 | Header solid od razu (nie transparent→solid on scroll) | Prostsze na MVP, mniej JS |
| 4 | MobileMenu slide from right | Hamburger jest po prawej, intuicyjne UX |
| 5 | Footer newsletter disabled z "Wkrótce dostępne" | Jasna komunikacja, implementacja w Fazie 5 |
| 6 | Container z polymorphic `as` prop | Pozwala na `<section>`, `<article>` bez dodatkowych wrapperów |
| 7 | image_5.png → yoga-konie.jpg przez sharp-cli | 1.3MB → 256KB (-80%) |

## Utworzone/zmodyfikowane pliki

### Nowe pliki (src/)
```
src/app/globals.css
src/app/layout.tsx
src/app/page.tsx
src/app/loading.tsx
src/app/error.tsx
src/components/layout/SkipToContent.tsx
src/components/layout/Container.tsx
src/components/layout/Header.tsx
src/components/layout/MobileMenu.tsx
src/components/layout/Footer.tsx
src/components/layout/index.ts
src/lib/constants.ts
src/lib/utils.ts
src/data/navigation.ts
src/types/trip.ts
src/types/team.ts
src/types/place.ts
src/types/forms.ts
```

### Pliki konfiguracyjne
```
package.json, tsconfig.json, next.config.ts, .env.example, .gitignore
```

### Obrazy (public/images/)
```
hero.jpg, galeria-1.jpg, kacze-bagno.jpg, matka-corka.jpg, yoga-konie.jpg, logo.jpeg
```

## Wyciągnięte wnioski

1. **Tailwind v4 wymaga nowej składni** — `@import "tailwindcss"` + `@theme {}`, stare dyrektywy `@tailwind` nie działają
2. **`motion` (nie `framer-motion`)** — import z `motion/react`, API identyczne, jedyna różnica to ścieżka importu
3. **`next/font/google` = self-hosting** — Next.js automatycznie pobiera fonty i serwuje z własnej domeny, zero privacy issues
4. **Focus trap wymaga ręcznej implementacji** — brak gotowego rozwiązania w motion, trzeba ręcznie obsłużyć Tab/Shift+Tab cycling
5. **`prefers-reduced-motion` łatwo przeoczyć** — trzeba dodać do globals.css i hook w komponentach z animacjami (do poprawy)
6. **React 19: named imports zamiast `React.ReactNode`** — spójność z nowym modelem (React nie jest importowany dla JSX)

## Poprawki z code review (do zrobienia)

5 important + 5 nit — zapisane w `faza1-fundament-zadania.md` sekcja "Do poprawy po review". Priorytet:
1. `prefers-reduced-motion` (WCAG 2.3.3)
2. Named imports React typów
3. Newsletter disabled styling
4. Newsletter `<form>` wrapper
5. `TripTargetAudience` typ
