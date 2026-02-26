---
name: tailwind-next-guidelines
description: "Frontend Next.js 16 + App Router + React 19 + TypeScript + TailwindCSS v4 + Motion 12. Server/Client Components, formularze (RHF + Zod 4), SSG, Suspense, animacje. Używaj przy tworzeniu komponentów, stron, stylowaniu, formularzach, testach, optymalizacji."
---

# Tailwind Next Guidelines

## Cel

Przewodnik dla **Next.js 16 + App Router** — dostosowany do projektu "Wyjazdy z Dziećmi".

## Stack Projektu

| Pakiet | Wersja | Rola |
|--------|--------|------|
| Next.js | 16.1.6 | App Router, SSG |
| React | 19.2.3 | UI |
| TypeScript | 5.x | Typy |
| Tailwind CSS | v4 | Stylowanie (CSS-first `@theme`) |
| Motion | 12.34 | Animacje (`motion/react`) |
| React Hook Form | 7.71 | Formularze |
| Zod | 4.3 | Walidacja (client + server) |
| @hookform/resolvers | 5.2 | RHF + Zod bridge |
| Lucide React | 0.575 | Ikony (strokeWidth 1.5) |
| clsx + tailwind-merge | 2.1 / 3.5 | `cn()` utility |

**NIE używamy:** Supabase, NextAuth, React Query, shadcn/ui, Sonner, Framer Motion.

## Kiedy Używać Tego Skilla

- Tworzenie nowych komponentów React (Server/Client)
- Stylowanie z TailwindCSS v4
- Formularze z React Hook Form + Zod
- Animacje z `motion/react` (NIE `framer-motion`)
- Routing z App Router (file-based)
- Obsługa błędów i loading states (loading.tsx, error.tsx)
- Optymalizacja wydajności (SSG, next/image, next/font)
- Testowanie z Vitest + React Testing Library

---

## Quick Start Checklist

### Nowy Komponent
- [ ] Domyślnie Server Component (bez `'use client'`)
- [ ] `'use client'` tylko gdy: useState, useEffect, onClick, onChange, Browser API, motion
- [ ] TypeScript interface dla props
- [ ] Funkcja (nie `React.FC`)
- [ ] Ref jako prop (nie forwardRef) — React 19
- [ ] Import aliasy: `@/components`, `@/lib`, `@/data`
- [ ] TailwindCSS utility classes z design tokenami

### Server vs Client Component
- [ ] **Server Component (domyślny):** async, brak stanu/efektów, SEO
- [ ] **Client Component (`'use client'`):** interaktywność, hooks, Browser API, animacje motion
- [ ] Granica: Server Component może renderować Client Component (nie odwrotnie)

### Memoizacja (bez React Compiler)
- [ ] `useCallback` tylko gdy przekazujesz handler do `memo()` child
- [ ] `useMemo` tylko dla drogich obliczeń (>100 elementów)
- [ ] Nie używaj prewencyjnie

### Formularze
- [ ] React Hook Form + Zod 4 (`zodResolver`)
- [ ] Honeypot field (`website`, CSS hidden) — spam protection
- [ ] `aria-invalid` i `aria-describedby` dla a11y
- [ ] RODO consent checkbox (required) + marketing consent (optional)

### Nowa Strona
- [ ] `page.tsx` w odpowiednim folderze `app/`
- [ ] `loading.tsx` dla loading state
- [ ] `error.tsx` dla error boundary
- [ ] `layout.tsx` jeśli współdzielony layout
- [ ] Metadata (`generateMetadata` lub `export const metadata`)

---

## Import Aliasy

| Alias | Ścieżka | Przykład |
|-------|---------|----------|
| `@/` | `src/` | `import { cn } from '@/lib/utils'` |
| `@/components` | `src/components` | `import { Header } from '@/components/layout/Header'` |
| `@/lib` | `src/lib` | `import { SITE_CONFIG } from '@/lib/constants'` |
| `@/data` | `src/data` | `import { navigation } from '@/data/navigation'` |
| `@/types` | `src/types` | `import type { Trip } from '@/types/trip'` |

Zdefiniowane w: `tsconfig.json` (`"@/*": ["./src/*"]`)

---

## Topic Guides

### Wzorce Komponentów
Server Components vs Client Components, `'use client'`, React 19 patterns, Error Boundaries, Suspense.
**[Pełny przewodnik: resources/component-patterns.md](resources/component-patterns.md)**

---

### Stylowanie z TailwindCSS
Tailwind v4 (CSS-first config z `@theme`), HEX design system (Natural Minimalism), `cn()`, motion animations.
**[Pełny przewodnik: resources/styling-guide.md](resources/styling-guide.md)**

---

### Organizacja Plików i Routing
```
src/
  app/                    # App Router
    layout.tsx           # Root layout (html, body, fonts)
    page.tsx             # Strona główna
    loading.tsx          # Global loading
    error.tsx            # Global error boundary
    globals.css          # TailwindCSS + @theme
    api/                 # Route Handlers
      booking/route.ts
      contact/route.ts
      newsletter/route.ts
    wyjazdy/[slug]/      # Trip subpages
  components/
    layout/              # Header, Footer, MobileMenu, Container, SkipToContent
    sections/            # Hero, About, TripCards, Testimonials, CTA
    ui/                  # Button, Input, FormField (own components)
  data/                  # Hardcoded content (trips.ts, navigation.ts)
  lib/                   # constants.ts, utils.ts
  types/                 # trip.ts, team.ts, place.ts, forms.ts
```
App Router conventions, metadata, API routes.
**[Pełny przewodnik: resources/file-organization.md](resources/file-organization.md)**

---

### Formularze
React Hook Form + Zod 4, Server Actions, honeypot spam protection, RODO consent.
**[Pełny przewodnik: resources/forms.md](resources/forms.md)**

---

### Stany Ładowania i Błędów

**loading.tsx dla automatycznego Suspense:**
```typescript
// app/wyjazdy/loading.tsx
export default function Loading() {
    return <TripPageSkeleton />;
}
```

**error.tsx dla Error Boundary:**
```typescript
// app/wyjazdy/error.tsx
'use client';

export default function Error({ error, reset }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="p-6 text-center">
            <p className="text-graphite-light">{error.message}</p>
            <button onClick={reset} className="mt-4 bg-moss text-white px-6 py-2 rounded-lg">
                Spróbuj ponownie
            </button>
        </div>
    );
}
```

**[Pełny przewodnik: resources/loading-and-error-states.md](resources/loading-and-error-states.md)**

---

### Data i API Routes
Hardcoded data w `src/data/`, API routes z Zod validation + honeypot + rate limiting.
**[Pełny przewodnik: resources/auth-and-data.md](resources/auth-and-data.md)**

---

### Testowanie
Vitest + React Testing Library + MSW v2. Testy Server/Client Components, formularzy, a11y.
**[Pełny przewodnik: resources/testing.md](resources/testing.md)**

---

### Wydajność
next/image, next/font (Playfair Display + Inter), SSG, Suspense streaming, motion lazy loading.
**[Pełny przewodnik: resources/performance.md](resources/performance.md)**

---

### TypeScript Standards
Strict mode, `moduleResolution: "bundler"`, inline type imports, Zod 4 runtime validation.
**[Pełny przewodnik: resources/typescript-standards.md](resources/typescript-standards.md)**

---

## Główne Zasady

1. **Server Components domyślnie** — `'use client'` tylko gdy potrzebna interaktywność
2. **Hardcoded data** — treści w `src/data/`, nie CMS/API w MVP
3. **API routes z ochroną** — Zod validation + honeypot + rate limiting (5 req/15min)
4. **React Hook Form + Zod 4** — nie useState dla każdego pola
5. **Motion, NIE Framer Motion** — `import { motion } from 'motion/react'`
6. **Memoizacja warunkowa** — useCallback/useMemo tylko gdy potrzebne
7. **Suspense + loading.tsx** — automatyczne loading states z App Router
8. **error.tsx dla Error Boundaries** — per-route error handling
9. **Tailwind v4** — konfiguracja w CSS (`@theme`), HEX design tokens
10. **TypeScript strict** — no `any`, Zod dla runtime validation
11. **next/image + next/font** — automatyczna optymalizacja
12. **RODO compliance** — cookie banner, consent categories, `lang="pl"`
13. **Vitest + RTL dla testów** — behavioral testing
14. **Lucide React** — ikony z `strokeWidth={1.5}`

---

## Design System: Natural Minimalism

```css
--color-parchment:      #F9F7F2   /* tło główne */
--color-parchment-dark:  #F5F3EE   /* sekcje alternate */
--color-moss:           #2D4635   /* CTA, akcenty */
--color-moss-light:     #3A5A47   /* hover states */
--color-graphite:       #1A1A1A   /* tekst główny */
--color-graphite-light: #4A4A4A   /* tekst secondary */
--color-white:          #FFFFFF   /* tekst na moss */
```

Fonty: **Playfair Display** (headings) + **Inter** (body), self-hosted via `next/font/google`.

---

## Navigation Guide

| Potrzebujesz... | Przeczytaj |
|-----------------|------------|
| Stworzyć komponent (Server/Client) | [component-patterns.md](resources/component-patterns.md) |
| Stylować z Tailwind v4 | [styling-guide.md](resources/styling-guide.md) |
| Organizować pliki, App Router | [file-organization.md](resources/file-organization.md) |
| Formularze (RHF + Zod 4) | [forms.md](resources/forms.md) |
| Obsłużyć loading/błędy | [loading-and-error-states.md](resources/loading-and-error-states.md) |
| Data + API routes | [auth-and-data.md](resources/auth-and-data.md) |
| Testować (Vitest + RTL) | [testing.md](resources/testing.md) |
| Optymalizować | [performance.md](resources/performance.md) |
| TypeScript patterns | [typescript-standards.md](resources/typescript-standards.md) |
