# Optymalizacja Wydajności

Next.js 16 + SSG + App Router — next/image, next/font, Suspense, motion lazy loading.

---

## Zasada: Nie Optymalizuj Przedwcześnie

Next.js jest szybki domyślnie dzięki Server Components, SSG, automatycznej optymalizacji.

**Mierz najpierw (Lighthouse, Core Web Vitals), optymalizuj potem.**

---

## Server Components = Domyślna Optymalizacja

Server Components nie wysyłają JS do klienta — to największa optymalizacja:
```typescript
// 0 KB JS w bundle — domyślnie!
import { trips } from '@/data/trips';

export default function TripListPage() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            {trips.map(trip => (
                <TripCard key={trip.slug} trip={trip} />
            ))}
        </div>
    );
}
```

**Zasada:** Im mniej `'use client'`, tym szybsza aplikacja.

---

## SSG — Static Site Generation

Nasz projekt to landing page — idealny kandydat na SSG:
```typescript
// app/wyjazdy/[slug]/page.tsx
import { trips } from '@/data/trips';

// Generuj statyczne strony w build time
export function generateStaticParams() {
    return trips.map(trip => ({ slug: trip.slug }));
}

export default async function TripPage({ params }: Props) {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);
    if (!trip) notFound();
    return <TripContent trip={trip} />;
}
```

Wszystkie strony generowane w build time → zero requestów do serwera przy odwiedzinach.

---

## next/image — Optymalizacja Obrazów

```typescript
import Image from 'next/image';

// Statyczny import (automatyczny width/height, blur placeholder)
import heroImage from '@/public/images/hero.jpg';

<Image
    src={heroImage}
    alt="Rodzina na łące podczas warsztatów"
    priority          // Preload dla above-the-fold (hero)
    placeholder="blur" // Blur placeholder z import
/>

// Dynamiczny src z danymi
<Image
    src={trip.heroImage}
    alt={trip.title}
    width={800}
    height={600}
    loading="lazy"    // Domyślne (oprócz priority)
    className="rounded-lg object-cover"
/>

// Fill mode (kontener musi mieć position relative + wymiary)
<div className="relative h-[60vh]">
    <Image
        src={trip.heroImage}
        alt={trip.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
    />
</div>
```

**Korzyści:** automatyczny AVIF/WebP, resize, lazy loading, brak CLS.

### sizes Attribute

Podawaj `sizes` dla obrazów z `fill` lub responsywnych:
```typescript
// Hero — pełna szerokość
<Image fill sizes="100vw" ... />

// Karta w gridzie 2-kolumnowym
<Image fill sizes="(max-width: 768px) 100vw, 50vw" ... />

// Mały avatar
<Image width={48} height={48} ... />  // Nie potrzebuje sizes
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
```

**Korzyści:**
- Zero layout shift (CLS = 0)
- Self-hosted (zero requestów do Google — **RODO compliant**)
- Automatyczny preload

---

## Past Trips — Grayscale Filter

```typescript
<div className={cn(
    "relative overflow-hidden rounded-lg",
    trip.isPast && "grayscale"
)}>
    <Image src={trip.image} alt={trip.title} fill className="object-cover" />
</div>
```

CSS `grayscale` jest wydajny (GPU-accelerated).

---

## Suspense — Streaming

Dla sekcji z ciężkim renderowaniem:
```typescript
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <>
            <Hero />  {/* Renderuje natychmiast */}

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

## Motion — Lazy Loading

Animacje motion dodają JS do bundla. Minimalizuj ich użycie:

```typescript
// TAK — motion tylko dla sekcji, które tego potrzebują
'use client';
import { motion } from 'motion/react';

// NIE — motion na każdym elemencie
```

### Wzorzec: AnimatedSection wrapper
```typescript
// Jeden Client Component owijający Server Content
'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function AnimatedSection({ children, delay = 0 }: {
    children: ReactNode;
    delay?: number;
}) {
    const shouldReduce = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: shouldReduce ? 0 : 0.5, delay }}
        >
            {children}
        </motion.div>
    );
}
```

---

## Memoizacja (bez React Compiler)

Projekt nie używa React Compiler — ręczna memoizacja gdy potrzebna:

```typescript
// useMemo — drogie obliczenia (>100 elementów)
const filtered = useMemo(() =>
    items.filter(i => i.category === category).sort((a, b) => a.name.localeCompare(b.name)),
    [items, category]
);

// useCallback — handler przekazywany do memo() child
const MemoizedCard = memo(TripCard);
const handleSelect = useCallback((slug: string) => {
    router.push(`/wyjazdy/${slug}`);
}, [router]);

// React.memo — komponent listy renderowany wiele razy
const TripCard = memo<TripCardProps>(({ trip }) => { ... });
```

**Zasada:** Nie memoizuj prewencyjnie. Tylko gdy profiler pokazuje problem.

---

## Web Vitals

| Metryka | Cel | Nasza strategia |
|---------|-----|-----------------|
| **LCP** | <2.5s | Server Components + `priority` na hero image + next/font |
| **INP** | <200ms | Mniej `'use client'`, motion z `viewport: { once: true }` |
| **CLS** | <0.1 | next/image (auto dimensions) + next/font (no FOUT) |

---

## Czego Unikać

- `'use client'` na komponentach bez interaktywności
- Nadmiar animacji motion (każda to JS w bundle)
- Obrazy bez `next/image` (brak optymalizacji)
- `useEffect` do fetch danych (używaj Server Components)
- Duże zależności w Client Components

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Server Components, Suspense
- [loading-and-error-states.md](./loading-and-error-states.md) — Streaming, loading states
- [styling-guide.md](./styling-guide.md) — next/font, design tokens
