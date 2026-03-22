# Code Review: Faza 1 — Fundament

Last Updated: 2026-02-26

---

## Podsumowanie

Faza 1 jest zaimplementowana solidnie i konsekwentnie. Fundamenty techniczne (Tailwind v4, motion/react, TypeScript strict, semantyczny HTML, ARIA) są poprawne i zgodne z planem. Kod jest czytelny, dobrze zorganizowany i nie zawiera żadnych krytycznych błędów blokujących merge. Zidentyfikowano kilka ważnych poprawek do rozważenia (głównie dostępność i drobne TypeScript) oraz kilka sugestii na przyszłość.

---

## Pliki sprawdzone

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
package.json
tsconfig.json
next.config.ts
.env.example
.gitignore
public/images/* (6 plików)
```

---

## Problemy

### Blokujące (🔴 Blocking)

Brak. Żaden problem nie blokuje merge brancha.

---

### Ważne (🟠 Important)

**1. `src/app/globals.css` linia 21 — `scroll-behavior: smooth` bez `prefers-reduced-motion`**

Płynne scrollowanie bez respektowania ustawień systemowych narusza WCAG 2.1 (kryterium 2.3.3 — Animation from Interactions). Użytkownicy z chorobą lokomocyjną lub vestibular disorders mają włączone `prefers-reduced-motion: reduce` w systemie operacyjnym.

Poprawka:
```css
html {
  color-scheme: light;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Analogicznie, animacje w `MobileMenu.tsx` (slide + fade) nie mają `prefers-reduced-motion` fallbacku — w `motion/react` można użyć hooka `useReducedMotion()`.

---

**2. `src/components/layout/Footer.tsx` linia 121–135 — disabled `<input>` i `<button>` bez `aria-disabled` i wizualnego wskaźnika `cursor-not-allowed`**

Atrybut `disabled` usuwa element z accessibility tree (nie jest czytany przez screen reader jako "niedostępny, wkrótce dostępne"). Dla lepszej UX placeholder powinien mieć `cursor-not-allowed` i opcjonalnie `aria-disabled="true"` zamiast natywnego `disabled` — lub zostać opisany przez `aria-describedby` informujący o przyczynie niedostępności.

Aktualnie:
```tsx
<input type="email" disabled ... />
<button type="button" disabled ...>Zapisz</button>
```

Sugerowana poprawka (minimum):
```tsx
<input
  type="email"
  disabled
  className="... cursor-not-allowed opacity-60"
  aria-label="Adres email do newslettera (wkrótce dostępne)"
/>
<button type="button" disabled className="... cursor-not-allowed opacity-60">
  Zapisz
</button>
```

---

**3. `src/app/layout.tsx` linia 44 — `React.ReactNode` bez importu React**

W React 19 z JSX transform nie ma potrzeby importowania React, jednak używanie `React.ReactNode` jako typ wymaga dostępu do namespace `React`. Działa to dzięki temu, że TypeScript widzi React przez `@types/react`, ale pattern jest niespójny — albo należy importować `import type { ReactNode } from 'react'` i używać `ReactNode` bezpośrednio, albo konsekwentnie używać `React.ReactNode` z `import React`.

Analogicznie `Container.tsx` linia 4 (`React.ReactNode`) i linia 6 (`React.ElementType`) — te same typy bez importu React.

Sugerowana poprawka dla `layout.tsx`:
```tsx
// Opcja A (zalecana dla React 19):
import type { ReactNode } from "react";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
```

Sugerowana poprawka dla `Container.tsx`:
```tsx
import type { ReactNode, ElementType } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};
```

---

**4. `src/components/layout/Footer.tsx` — brak `<form>` wrappera dla newsletter placeholder**

Choć pole jest wyłączone (`disabled`), semantycznie input email powinien być wewnątrz elementu `<form>`. Przeglądarka i screen reader rozpoznają wtedy kontekst formularza. To ważne szczególnie przy włączaniu go w Fazie 5 — nie będzie potrzeby refaktoryzacji struktury HTML.

---

**5. `src/types/trip.ts` — brak `TripTargetAudience` jako osobnego typu (z planu zadanie 1.10)**

Plan w `faza1-fundament-plan.md` (zadanie 1.10) wymienia `TripTargetAudience` jako osobny typ do zdefiniowania. Zamiast tego `targetAudience` w `Trip` jest zdefiniowane inline jako `string[]`. Nie jest to błąd architekturalny — `string[]` jest prostsze i wystarczające — ale odbiega od specyfikacji planu. Warto to odnotować lub zaktualizować plan.

---

### Drobnostki (🟡 Nit)

**6. `src/components/layout/MobileMenu.tsx` linia 88 — szerokość menu `w-72` (288px) może być zbyt wąska na małych telefonach (320px) — pozostawia tylko 32px na overlay**

Nie jest to błąd, ale warto sprawdzić wizualnie na urządzeniu 320px. Alternatywnie: `w-4/5` lub `max-w-xs` (320px).

---

**7. `src/components/layout/MobileMenu.tsx` linia 49 — focus na close button w `setTimeout` nie jest potrzebny, ale bez niego mogą pojawić się race conditions przy szybkich animacjach**

Aktualnie `closeButtonRef.current?.focus()` jest wywoływane synchronicznie w `useEffect`, co może odpalić zanim element DOM jest w pełni wyrenderowany przez motion. Bezpieczniejszy pattern:
```ts
const id = setTimeout(() => closeButtonRef.current?.focus(), 50);
return () => clearTimeout(id);
```

---

**8. `src/app/error.tsx` — brak logowania `error` do serwisu (prop `error` przyjęty w typie, ale nie używany)**

`error` jest w destrukturyzacji pominięty. W produkcji warto go logować (np. `console.error(error)` lub do Sentry). Na razie jest to MVP więc `[nit]`, ale dobrze mieć placeholder.

Poprawka:
```tsx
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // W produkcji: reportuj błąd do serwisu monitoringu
  // useEffect(() => { logErrorToService(error); }, [error]);
```

---

**9. `src/app/globals.css` — `--color-white: #FFFFFF` w @theme jest nadmiarowy**

Tailwind v4 już definiuje `white`. Dodatkowa zmienna `--color-white` nie jest zła, ale jest używana tylko w `::selection` — można tam użyć `white` bezpośrednio.

---

**10. `src/components/layout/Header.tsx` — `"use client"` wymuszony przez `useState`, co uniemożliwia RSC optymalizacje dla statycznych elementów (nav)**

To jest świadoma decyzja architekturalna (hamburger wymaga state), ale można rozważyć wydzielenie hamburger+MobileMenu do osobnego client component, pozostawiając `Header` jako Server Component z renderowaniem nawigacji po stronie serwera. Jednak dla Fazy 1 obecna implementacja jest akceptowalna.

---

### Sugestie (🔵 Suggestions)

**11. `src/app/layout.tsx` — brak `twitter` metadata (Twitter/X Cards)**

Warto dodać dla pełnego SEO:
```ts
twitter: {
  card: "summary_large_image",
  title: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
  description: "Warsztaty rozwojowe dla rodzin w otoczeniu natury.",
  images: ["/images/hero.jpg"],
},
```

---

**12. `src/app/layout.tsx` — brak `robots` i `keywords` w metadata**

Dla projektu produkcyjnego warto dodać:
```ts
robots: {
  index: true,
  follow: true,
},
keywords: ["wyjazdy z dziećmi", "warsztaty rodzinne", "joga z dziećmi", "ceramika", "taniec"],
```

---

**13. `public/images/matka-corka.jpg` (2000x1600px, 306KB) i `galeria-1.jpg` (1920x1280px, 255KB) — obrazy nie zostały zresizowane**

Plan wymagał resize do max 1200px szerokości. `matka-corka.jpg` ma 2000px szerokości i `galeria-1.jpg` 1920px. Mimo że `next/image` auto-optymalizuje przy renderowaniu, warto zresizować pliki źródłowe, żeby zmniejszyć transfer w `public/` i cache Vercela. `yoga-konie.jpg` i `hero.jpg` są poprawnie zresizowane (1200px).

---

**14. `src/types/` — brak barrel `index.ts` dla typów**

Importowanie typów jest wygodniejsze przez barrel:
```ts
// src/types/index.ts
export type { Trip, TripPricing, TripFAQ, TripScheduleDay, TripGalleryImage, TripCollaborator, TripScheduleActivity } from './trip';
export type { TeamMember } from './team';
export type { Place } from './place';
export type { BookingFormData, ContactFormData, NewsletterFormData } from './forms';
```
Umożliwia `import type { Trip, TeamMember } from '@/types'` zamiast dwóch importów z różnych ścieżek.

---

**15. `src/lib/constants.ts` — brak `ROUTES` dla trips subpage template**

Plan wymienia podstrony wyjazdów (np. `/wyjazdy/matka-i-corka`). Warto już teraz dodać helper do generowania slug-URL:
```ts
export const tripPath = (slug: string) => `${ROUTES.trips}/${slug}` as const;
```

---

**16. `next.config.ts` — pusty config, warto dodać `images.formats` dla WebP/AVIF**

```ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```
Next.js auto-konwertuje JPEG na WebP/AVIF przy serwowaniu przez `next/image`, ale jawna konfiguracja jest lepsza niż domyślna.

---

## Dobre praktyki (dostrzeżone)

- **Tailwind v4 poprawnie**: `@import "tailwindcss"` + `@theme {}` — bez starych dyrektyw. Klasy niestandardowe (`text-moss`, `bg-parchment`) działają automatycznie z CSS variables zdefiniowanymi w `@theme`.

- **motion/react, nie framer-motion**: `MobileMenu.tsx` importuje `from 'motion/react'` — zgodnie z wymogami dla React 19. Brak jakiegokolwiek importu z `framer-motion`.

- **TypeScript strict**: `tsconfig.json` ma `"strict": true`. Typy są konsekwentne (brak `any`, brak `as unknown`).

- **Semantyczny HTML i ARIA**: `<header>`, `<nav>`, `<main>`, `<footer>` z poprawnymi atrybutami. `aria-label` na nawigacjach, `aria-expanded` na hamburgerze, `aria-controls` łączący hamburger z menu, `aria-modal="true"` i `role="dialog"` na panelu mobile, `aria-hidden="true"` na overlay.

- **SkipToContent**: Poprawna implementacja z `fixed z-50 -translate-y-full focus:translate-y-0` — widoczny po naciśnięciu Tab, przenosi do `<main id="main-content">`.

- **Focus trap w MobileMenu**: Kompletna implementacja — blokada Tab/Shift+Tab, zamknięcie na Escape, focus na close button przy otwarciu, lock body scroll.

- **`cn()` utility**: Prawidłowe połączenie `clsx` + `tailwind-merge`. Używany w Container — gotowy do szerszego użycia w kolejnych fazach.

- **Lucide strokeWidth={1.5}**: Konsekwentnie we wszystkich ikonach (Menu, X, Mail, Phone, Facebook, Instagram) — zgodnie z design systemem.

- **`lang="pl"` na `<html>`**: Krytyczny wymóg RODO/dostępności spełniony.

- **Dynamiczny copyright**: `new Date().getFullYear()` w Footer — poprawne i proste rozwiązanie. (Uwaga: Footer jest Server Component, więc rok jest renderowany po stronie serwera i nie stworzy hydration mismatch.)

- **Honeypot w formularzach**: Pole `website?: string` w każdym z 3 typów formularzy — gotowe pod spam protection w Fazach 3–5.

- **Obrazy zoptymalizowane**: Wszystkie pliki < 500KB. `logo.jpeg` tylko 38KB. `yoga-konie.jpg` zoptymalizowany z 1.3MB do 260KB.

- **Barrel export**: `src/components/layout/index.ts` eksportuje wszystkie komponenty — clean API.

- **`priority` na logo**: `next/image` z `priority` prop na logo w Header — poprawne dla LCP optymalizacji.

- **Relacja `rel="noopener noreferrer"`**: Linki do social media mają oba atrybuty — bezpieczeństwo + prywatność.

- **Commit history**: 6 commitów z czytelnymi prefix-ami (`feat(faza1-fundament):`), opisującymi etapy 1A–1F. Idealny granular history dla code review.

---

## Statystyki

- Plików sprawdzonych: 23
- 🔴 Blocking: 0
- 🟠 Important: 5
- 🟡 Nit: 5
- 🔵 Suggestions: 6

---

## Werdykt: APPROVE (z uwagami do rozważenia)

Kod jest gotowy do merge na `main`. Faza 1 spełnia wszystkie kryteria akceptacji z planu. Brak problemów blokujących. Przed lub w trakcie Fazy 2 warto zaadresować punkty 🟠 Important — szczególnie `prefers-reduced-motion` (dostępność) i typy React (`ReactNode` bez importu). Pozostałe to dobre praktyki do wdrożenia oportunistycznie.

**Priorytet poprawek:**
1. `globals.css` — dodać `@media (prefers-reduced-motion: reduce)` [🟠 #1]
2. `MobileMenu.tsx` — dodać `useReducedMotion()` z `motion/react` [🟠 #1]
3. `Container.tsx` + `layout.tsx` — zamienić `React.ReactNode/ElementType` na named imports [🟠 #3]
4. `Footer.tsx` — dodać `cursor-not-allowed opacity-60` na disabled elementach [🟠 #2]
5. `Footer.tsx` — owinąć newsletter w `<form>` [🟠 #4]
