# Przewodnik Stylowania

Wzorce stylowania z TailwindCSS v4 i Next.js 16 — "Natural Minimalism" design system.

---

## TailwindCSS v4 — CSS-First Configuration

### Konfiguracja w CSS (nie w JS)
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
    /* Colors — Natural Minimalism (HEX) */
    --color-parchment: #F9F7F2;
    --color-parchment-dark: #F5F3EE;
    --color-moss: #2D4635;
    --color-moss-light: #3A5A47;
    --color-graphite: #1A1A1A;
    --color-graphite-light: #4A4A4A;
    --color-white: #FFFFFF;

    /* Typography */
    --font-heading: var(--font-playfair);
    --font-body: var(--font-inter);
}
```

### Setup w Next.js 16
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```
```javascript
// postcss.config.mjs
export default {
    plugins: {
        "@tailwindcss/postcss": {},
    },
};
```

**Brak tailwind.config.js** — konfiguracja w CSS (`@theme`).

---

## Design System: Natural Minimalism

### Kolory (HEX)

| Token | Wartość | Użycie | Klasa Tailwind |
|-------|---------|--------|----------------|
| `--color-parchment` | `#F9F7F2` | Tło główne | `bg-parchment` |
| `--color-parchment-dark` | `#F5F3EE` | Sekcje alternate | `bg-parchment-dark` |
| `--color-moss` | `#2D4635` | CTA, akcenty, linki | `bg-moss`, `text-moss` |
| `--color-moss-light` | `#3A5A47` | Hover states | `hover:bg-moss-light` |
| `--color-graphite` | `#1A1A1A` | Tekst główny | `text-graphite` |
| `--color-graphite-light` | `#4A4A4A` | Tekst secondary | `text-graphite-light` |
| `--color-white` | `#FFFFFF` | Tekst na moss | `text-white` |

### Typografia

| Rola | Font | Klasa | Przykład |
|------|------|-------|----------|
| Headings | Playfair Display | `font-heading` | `<h1 className="font-heading text-4xl">` |
| Body | Inter | `font-body` | `<p className="font-body text-base">` |

Fonty zdefiniowane w `layout.tsx` przez `next/font/google` z CSS variables:
```typescript
const playfair = Playfair_Display({ variable: "--font-playfair", ... });
const inter = Inter({ variable: "--font-inter", ... });
```

---

## Podstawy Stylowania

```typescript
// TAK — utility classes z design tokens
<div className="flex flex-col gap-4 p-6 bg-parchment-dark rounded-lg">
    <h2 className="font-heading text-xl text-graphite">Tytuł</h2>
    <p className="text-graphite-light">Opis</p>
</div>

// NIE — inline styles
<div style={{ display: 'flex', backgroundColor: '#F5F3EE' }}>

// NIE — hardcoded colors
<div className="bg-[#F5F3EE]">
```

---

## Funkcja cn()

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

```typescript
// Warunkowe klasy
<div className={cn(
    "p-4 rounded-lg border border-graphite/10",
    isActive && "bg-moss text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
)} />

// Z props className (nadpisywanie z zewnątrz)
interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
    return (
        <div className={cn("p-6 bg-white rounded-lg border border-graphite/10", className)}>
            {children}
        </div>
    );
}
```

---

## CTA Buttons

```typescript
// Główny CTA (moss green)
<a href="#booking" className={cn(
    "inline-block bg-moss text-white px-8 py-4 rounded-lg",
    "font-medium hover:bg-moss-light transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
)}>
    Zarezerwuj miejsce
</a>

// Outline / secondary
<a href="/wyjazdy" className={cn(
    "inline-block border-2 border-moss text-moss px-8 py-4 rounded-lg",
    "font-medium hover:bg-moss hover:text-white transition-colors"
)}>
    Zobacz wyjazdy
</a>
```

---

## Sekcje — Alternate Background Pattern

```typescript
// Naprzemienne tło sekcji
<section className="py-16 md:py-24 bg-parchment">
    {/* Sekcja 1 */}
</section>

<section className="py-16 md:py-24 bg-parchment-dark">
    {/* Sekcja 2 — ciemniejsze tło */}
</section>

<section className="py-16 md:py-24 bg-parchment">
    {/* Sekcja 3 */}
</section>
```

---

## Past Trips — Grayscale

Minione wyjazdy renderowane z `grayscale(100%)`:
```typescript
<div className={cn(
    "relative overflow-hidden rounded-lg",
    trip.isPast && "grayscale"
)}>
    <Image src={trip.image} alt={trip.title} fill className="object-cover" />
    {trip.isPast && (
        <div className="absolute inset-0 bg-graphite/20 flex items-center justify-center">
            <span className="text-white font-medium bg-graphite/60 px-4 py-2 rounded">
                Zakończony
            </span>
        </div>
    )}
</div>
```

---

## Responsywność (Mobile-First)

| Breakpoint | Min-width | Użycie |
|------------|-----------|--------|
| (default)  | 0px | Mobile |
| `sm:`      | 640px | |
| `md:`      | 768px | Tablet |
| `lg:`      | 1024px | Desktop |
| `xl:`      | 1280px | |

```typescript
// Mobile-first: stack → row
<div className="flex flex-col gap-4 md:flex-row md:gap-8" />

// Tekst skalowany
<h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-graphite" />

// Padding skalowany
<section className="px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24" />
```

### Container Component
```typescript
// components/layout/Container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("mx-auto max-w-6xl px-4 md:px-6", className)}>
            {children}
        </div>
    );
}
```

---

## Dynamic Viewport Units

```typescript
<div className="min-h-dvh" />  // Rozwiązuje 100vh na mobile (Safari toolbar)
```

---

## next/font — Optymalizacja Fontów

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: ['400', '700'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: ['400', '500', '600'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pl">
            <body className={`${playfair.variable} ${inter.variable} font-body bg-parchment text-graphite antialiased`}>
                {children}
            </body>
        </html>
    );
}
```

**RODO:** `next/font/google` automatycznie pobiera fonty i serwuje z własnej domeny. Zero requestów do Google w runtime.

---

## Animacje z Motion

```typescript
'use client';

import { motion } from 'motion/react';

// Fade in on scroll
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
/>

// Hover effect na karcie
<motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="bg-white rounded-lg p-6 shadow-sm"
/>
```

### prefers-reduced-motion

Oprócz CSS w `globals.css`, obsłuż w motion:
```typescript
import { useReducedMotion } from 'motion/react';

const shouldReduce = useReducedMotion();
// Jeśli true → wyłącz animacje lub użyj natychmiastowych przejść
```

---

## Ikony — Lucide React

```typescript
import { Heart, MapPin, Calendar, Users } from 'lucide-react';

// Zawsze strokeWidth={1.5} dla spójności
<Heart className="h-5 w-5 text-moss" strokeWidth={1.5} />
<MapPin className="h-4 w-4 text-graphite-light" strokeWidth={1.5} />
```

---

## Globalne Style (globals.css)

```css
/* Już zaimplementowane w projekcie */
html { color-scheme: light; scroll-behavior: smooth; }
body { background-color: var(--color-parchment); color: var(--color-graphite); }
:focus-visible { outline: 2px solid var(--color-moss); outline-offset: 2px; }
::selection { background-color: var(--color-moss); color: var(--color-white); }

@media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## Czego Unikać

- Inline styles (`style={{ padding: '16px' }}`)
- Hardcoded colors (`bg-[#1a73e8]`) — używaj design tokens
- `tailwind.config.js` w v4 (użyj `@theme` w CSS)
- `@apply` w komponentach (OK dla global styles)
- `framer-motion` (niezgodne z React 19 — używaj `motion/react`)
- Dark mode (nie w designie tego projektu)
- shadcn/ui (nie zainstalowane — budujemy własne komponenty)

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Struktura komponentów
- [performance.md](./performance.md) — next/image, next/font
