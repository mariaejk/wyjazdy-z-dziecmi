# Wzorce Komponentów

Architektura komponentów Next.js 16 + App Router — Server/Client Components, React 19, Motion, Suspense, Error Boundaries.

---

## Server Components vs Client Components

### Server Components (Domyślne)

Każdy komponent w `app/` jest **Server Component** domyślnie:
```typescript
// app/wyjazdy/[slug]/page.tsx — Server Component (domyślny)
import { trips } from '@/data/trips';
import { notFound } from 'next/navigation';
import { TripHero } from '@/components/sections/TripHero';

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);

    if (!trip) notFound();

    return (
        <article>
            <TripHero trip={trip} />
            {/* kolejne sekcje */}
        </article>
    );
}
```

**Server Components mogą:**
- Być `async` (bezpośrednie `await`)
- Importować dane z `src/data/` bezpośrednio
- Używać `cookies()`, `headers()`
- Importować duże biblioteki (nie idą do bundla klienta)

**Server Components NIE mogą:**
- Używać `useState`, `useEffect`, `useRef`
- Mieć event handlers (`onClick`, `onChange`)
- Używać Browser API (`window`, `document`, `localStorage`)
- Używać `motion` komponentów (animacje wymagają klienta)

### Client Components

Dodaj `'use client'` na początku pliku:
```typescript
// components/ui/BookingButton.tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface BookingButtonProps {
    tripName: string;
    className?: string;
}

export function BookingButton({ tripName, className }: BookingButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href="#booking"
            className={cn(
                "inline-block bg-moss text-white px-8 py-4 rounded-lg font-medium",
                "hover:bg-moss-light transition-colors",
                className
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Zarezerwuj miejsce — {tripName}
        </motion.a>
    );
}
```

### Kiedy 'use client'

| `'use client'` | Server Component |
|-----------------|------------------|
| `useState`, `useEffect`, `useRef` | Statyczne treści |
| Event handlers (`onClick`, `onChange`) | Import danych z `src/data/` |
| Browser API (`window`, `localStorage`) | `cookies()`, `headers()` |
| Animacje (`motion` z `motion/react`) | Metadata, SEO |
| React Hook Form, formularze | Duże importy (nie w bundle) |

### Wzorzec: Server + Client Composition

Server Component renderuje dane, Client Component dodaje interaktywność:
```typescript
// app/page.tsx (Server)
import { trips } from '@/data/trips';
import { TripCardsSection } from '@/components/sections/TripCards';

export default function HomePage() {
    return (
        <>
            {/* Server: statyczny heading */}
            <section className="py-16 bg-parchment-dark">
                <h2 className="font-heading text-3xl text-center">Nadchodzące wyjazdy</h2>
            </section>

            {/* Client: interaktywne karty z animacjami */}
            <TripCardsSection trips={trips} />
        </>
    );
}

// components/sections/TripCards.tsx (Client)
'use client';

import { motion } from 'motion/react';
import type { Trip } from '@/types/trip';

interface TripCardsSectionProps {
    trips: Trip[];
}

export function TripCardsSection({ trips }: TripCardsSectionProps) {
    return (
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto px-4">
            {trips.map((trip, index) => (
                <motion.div
                    key={trip.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <TripCard trip={trip} />
                </motion.div>
            ))}
        </div>
    );
}
```

---

## Podstawowy Wzorzec Komponentu

### Server Component
```typescript
// components/sections/TripHero.tsx — Server Component
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import type { Trip } from '@/types/trip';

interface TripHeroProps {
    trip: Trip;
}

export function TripHero({ trip }: TripHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[400px]">
            <Image
                src={trip.heroImage}
                alt={trip.title}
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-graphite/40" />
            <Container className="relative z-10 flex items-end h-full pb-12">
                <div>
                    <h1 className="font-heading text-4xl md:text-5xl text-white">
                        {trip.title}
                    </h1>
                    <p className="mt-4 text-lg text-white/90">{trip.subtitle}</p>
                </div>
            </Container>
        </section>
    );
}
```

### Client Component (pełny szablon)
```typescript
/**
 * Komponent z interaktywnością — animacje, stan, event handlers
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. PROPS INTERFACE
interface AccordionItemProps {
    /** Tytuł pytania */
    question: string;
    /** Treść odpowiedzi */
    answer: string;
    /** Ref do kontenera (React 19 — zwykły prop) */
    ref?: React.Ref<HTMLDivElement>;
}

// 2. KOMPONENT
export function AccordionItem({
    question,
    answer,
    ref,
}: AccordionItemProps) {
    // 3. HOOKS
    const [isOpen, setIsOpen] = useState(false);

    // 4. HANDLERS
    const handleToggle = () => setIsOpen(prev => !prev);

    // 5. RENDER
    return (
        <div ref={ref} className="border-b border-graphite/10">
            <button
                onClick={handleToggle}
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-graphite">{question}</span>
                <ChevronDown
                    className={cn(
                        "h-5 w-5 text-graphite-light transition-transform",
                        isOpen && "rotate-180"
                    )}
                    strokeWidth={1.5}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-graphite-light">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
```

---

## React 19: Ref jako Prop

W React 19 `forwardRef` jest **deprecated**. Ref to zwykły prop:
```typescript
// React 19 — ref w interfejsie props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function Input({
    label,
    error,
    ref,
    className,
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-graphite">{label}</label>
            )}
            <input
                ref={ref}
                className={cn(
                    "px-4 py-3 border border-graphite/20 rounded-lg bg-white",
                    "focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent",
                    error && "border-red-500",
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-sm text-red-600" role="alert">{error}</span>
            )}
        </div>
    );
}
```

---

## Motion Animations

**WAŻNE:** Używaj `motion/react`, NIE `framer-motion`:
```typescript
// TAK
import { motion, AnimatePresence } from 'motion/react';

// NIE — niezgodne z React 19
import { motion } from 'framer-motion';
```

### Wzorzec: Animowane sekcje (scroll-triggered)
```typescript
'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
```

### prefers-reduced-motion
```typescript
'use client';

import { motion, useReducedMotion } from 'motion/react';

export function AnimatedHero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="font-heading text-4xl md:text-6xl text-graphite"
        >
            Wyjazdy z Dziećmi
        </motion.h1>
    );
}
```

---

## Suspense Boundaries

### loading.tsx (App Router)

Next.js automatycznie owija `page.tsx` w Suspense z `loading.tsx` jako fallback:
```typescript
// app/wyjazdy/loading.tsx
export default function Loading() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="h-8 w-64 bg-graphite/10 rounded animate-pulse" />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-48 bg-graphite/5 rounded-lg animate-pulse" />
                ))}
            </div>
        </div>
    );
}
```

### Ręczne Suspense Boundaries
```typescript
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <>
            <Hero />   {/* Renderuje natychmiast */}

            <Suspense fallback={<SectionSkeleton />}>
                <TripCardsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <TestimonialsSection />
            </Suspense>
        </>
    );
}
```

---

## Error Boundaries

### error.tsx (App Router)
```typescript
// app/wyjazdy/[slug]/error.tsx
'use client'; // error.tsx MUSI być Client Component

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Trip page error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center py-20" role="alert">
            <AlertCircle className="h-12 w-12 text-red-500" strokeWidth={1.5} />
            <h2 className="mt-4 text-lg font-heading font-bold text-graphite">
                Coś poszło nie tak
            </h2>
            <p className="mt-2 text-sm text-graphite-light">{error.message}</p>
            <button
                onClick={reset}
                className="mt-6 bg-moss text-white px-6 py-3 rounded-lg hover:bg-moss-light transition-colors"
            >
                Spróbuj ponownie
            </button>
        </div>
    );
}
```

### not-found.tsx
```typescript
// app/wyjazdy/[slug]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-6xl font-heading font-bold text-graphite-light">404</h1>
            <p className="mt-4 text-lg text-graphite-light">Wyjazd nie został znaleziony</p>
            <Link
                href="/"
                className="mt-6 bg-moss text-white px-6 py-3 rounded-lg hover:bg-moss-light transition-colors"
            >
                Wróć na stronę główną
            </Link>
        </div>
    );
}
```

---

## Separacja Komponentów

### Kiedy Dzielić

| Nowy plik | Ten sam plik |
|-----------|--------------|
| Trudno zrozumieć na pierwszy rzut oka | <50 linii helper |
| Server/Client boundary | Ściśle powiązane |
| Sekcja strony (Hero, FAQ, Pricing) | Nie reużywane |
| Komponent z animacjami motion | Prosty prezentacyjny |

### Wzorzec: Cienki Client, Gruby Server
```typescript
// TAK — logika na serwerze, interaktywność w małym Client Component
// app/wyjazdy/[slug]/page.tsx (Server)
export default async function TripPage({ params }: Props) {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);
    if (!trip) notFound();
    return <TripContent trip={trip} />;   // Dane z serwera
}

// components/sections/TripContent.tsx (Client — tylko animacje)
'use client';
export function TripContent({ trip }: { trip: Trip }) {
    // Tylko motion animacje i interaktywność
}
```

---

## Wzorzec Eksportu

W Next.js App Router preferowane są **default exports** dla stron i layoutów:
```typescript
// page.tsx, layout.tsx, loading.tsx, error.tsx — default export (wymagany)
export default function Page() { ... }
export default function Layout({ children }) { ... }

// Komponenty w components/ — named exports
export function TripCard({ ... }: Props) { ... }
export function Container({ ... }: Props) { ... }
```

---

## Komunikacja Komponentów

### Props Down (Server → Client)
```typescript
// Server Component przekazuje dane jako props
export default function Page() {
    const trips = getTrips();
    return <TripCardsSection trips={trips} />;
}
```

### Events Up (Client → Parent Client)
```typescript
// Child
interface FilterBarProps {
    value: string;
    onChange: (value: string) => void;
}

function FilterBar({ value, onChange }: FilterBarProps) {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="all">Wszystkie</option>
            <option value="upcoming">Nadchodzące</option>
        </select>
    );
}
```

---

## Zobacz Także

- [styling-guide.md](./styling-guide.md) — TailwindCSS v4, design tokens
- [loading-and-error-states.md](./loading-and-error-states.md) — Suspense, loading.tsx, error.tsx
- [performance.md](./performance.md) — Memoizacja, lazy loading
- [forms.md](./forms.md) — React Hook Form + Zod 4
