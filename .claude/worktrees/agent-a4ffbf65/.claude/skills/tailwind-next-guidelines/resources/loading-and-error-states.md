# Stany Ładowania i Błędów

Wzorce dla Next.js 16 + App Router — Suspense, loading.tsx, error.tsx, skeletony.

---

## Wybór Wzorca

| Scenariusz | Wzorzec |
|------------|---------|
| Cała strona loading | `loading.tsx` (automatyczny Suspense) |
| Sekcja strony loading | `<Suspense>` z fallback |
| Formularz wysyłanie | `isSubmitting` z React Hook Form |
| Nieoczekiwane błędy | `error.tsx` (automatyczny Error Boundary) |
| 404 | `not-found.tsx` + `notFound()` |
| Feedback po submit | Inline message (nie toast — brak Sonner) |

---

## loading.tsx — Automatyczny Suspense

```typescript
// app/wyjazdy/[slug]/loading.tsx
export default function Loading() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            {/* Hero skeleton */}
            <div className="h-[40vh] bg-graphite/5 rounded-lg animate-pulse" />

            {/* Content skeleton */}
            <div className="mt-8 space-y-4">
                <div className="h-8 w-64 bg-graphite/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-graphite/5 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-graphite/5 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-graphite/5 rounded animate-pulse" />
            </div>
        </div>
    );
}
```

---

## Streaming z Suspense (Granularny)

```typescript
// app/page.tsx
import { Suspense } from 'react';

export default function HomePage() {
    return (
        <>
            <Hero />  {/* Renderuje natychmiast */}

            <Suspense fallback={<SectionSkeleton title="Nadchodzące wyjazdy" />}>
                <TripCardsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton title="Opinie" />}>
                <TestimonialsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton title="Kontakt" />}>
                <CTASection />
            </Suspense>
        </>
    );
}
```

---

## error.tsx — Automatyczny Error Boundary

```typescript
// app/wyjazdy/[slug]/error.tsx
'use client'; // WYMAGANE

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

### global-error.tsx
```typescript
// app/global-error.tsx — dla błędów w root layout
'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="pl">
            <body className="bg-parchment text-graphite">
                <div className="flex min-h-dvh items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Wystąpił błąd</h2>
                        <button
                            onClick={reset}
                            className="mt-4 bg-moss text-white px-6 py-3 rounded-lg"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
```

---

## not-found.tsx

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
            <h1 className="text-6xl font-heading font-bold text-graphite-light">404</h1>
            <p className="mt-4 text-lg text-graphite-light">
                Strona nie została znaleziona
            </p>
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

### Programowy notFound()
```typescript
import { notFound } from 'next/navigation';

export default async function TripPage({ params }: Props) {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);
    if (!trip) notFound();
    return <TripContent trip={trip} />;
}
```

---

## Formularz — Stany Submit

Bez Sonner/toastów — inline feedback:
```typescript
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

// Po udanym submit
if (submitStatus === 'success') {
    return (
        <div className="p-8 bg-moss/5 rounded-lg text-center" role="status">
            <h3 className="font-heading text-xl text-moss">Dziękujemy!</h3>
            <p className="mt-2 text-graphite-light">
                Skontaktujemy się z Tobą w ciągu 48 godzin.
            </p>
        </div>
    );
}

// Przycisk submit z loading
<button type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
        <><Loader2 className="h-5 w-5 animate-spin" /> Wysyłanie...</>
    ) : (
        <><Send className="h-5 w-5" /> Wyślij</>
    )}
</button>

// Błąd po submit
{submitStatus === 'error' && (
    <p role="alert" className="text-sm text-red-600 text-center">
        Wystąpił błąd. Spróbuj ponownie.
    </p>
)}
```

---

## Skeleton Components

Skeletony używają `animate-pulse` (Tailwind built-in):
```typescript
function TripCardSkeleton() {
    return (
        <div className="rounded-lg border border-graphite/10 overflow-hidden">
            <div className="h-48 bg-graphite/5 animate-pulse" />
            <div className="p-4 space-y-3">
                <div className="h-6 w-3/4 bg-graphite/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-graphite/5 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-graphite/5 rounded animate-pulse" />
            </div>
        </div>
    );
}

function SectionSkeleton({ title }: { title?: string }) {
    return (
        <section className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
                {title && (
                    <div className="h-8 w-64 bg-graphite/10 rounded animate-pulse mb-8" />
                )}
                <div className="grid gap-8 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <TripCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
```

---

## Empty States

```typescript
function EmptyState({ title, description }: { title: string; description?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-lg font-heading font-medium text-graphite">{title}</h3>
            {description && (
                <p className="mt-2 text-sm text-graphite-light max-w-sm">{description}</p>
            )}
        </div>
    );
}
```

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Error Boundaries, Suspense
- [performance.md](./performance.md) — Streaming, SSG
- [forms.md](./forms.md) — Submit states w formularzach
