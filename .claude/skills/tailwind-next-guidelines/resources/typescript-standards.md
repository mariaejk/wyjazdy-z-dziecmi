# Standardy TypeScript

Wytyczne TypeScript 5.x i Next.js 16 — konfiguracja, typy, nowoczesne wzorce.

---

## Konfiguracja tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2017",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "react-jsx",
        "incremental": true,
        "plugins": [{ "name": "next" }],
        "paths": {
            "@/*": ["./src/*"]
        }
    },
    "include": [
        "next-env.d.ts",
        "**/*.ts",
        "**/*.tsx",
        ".next/types/**/*.ts",
        ".next/dev/types/**/*.ts",
        "**/*.mts"
    ],
    "exclude": ["node_modules"]
}
```

**Kluczowe flagi:**
- `moduleResolution: "bundler"` — standard dla Next.js
- `jsx: "react-jsx"` — Next.js transformacja JSX
- `strict: true` — pełna kontrola typów

---

## Type Imports

```typescript
// TAK — named imports z type keyword
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import type { Trip } from '@/types/trip';

// TAK — mieszane (values + types)
import { useState, type ReactNode } from 'react';
import { notFound } from 'next/navigation';

// TAK — gdy tylko typy z modułu
import type { BookingFormData } from '@/types/forms';

// NIE — import wartości zamiast typów
import { ReactNode } from 'react'; // ReactNode to typ, nie wartość
```

---

## Interfejsy Props

```typescript
interface TripCardProps {
    /** Dane wyjazdu */
    trip: Trip;
    /** Czy miniony (grayscale) */
    isPast?: boolean;
    /** Callback po kliknięciu */
    onSelect?: (slug: string) => void;
    /** Dodatkowe klasy CSS */
    className?: string;
    /** Children */
    children?: ReactNode;
}

export function TripCard({
    trip,
    isPast = false,
    onSelect,
    className,
    children,
}: TripCardProps) {
    // ...
}
```

---

## Next.js 16 — Typy Specyficzne

### Page Props (params jest Promise)
```typescript
// app/wyjazdy/[slug]/page.tsx
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TripPage({ params }: PageProps) {
    const { slug } = await params;
    // ...
}
```

### Layout Props
```typescript
interface LayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
    return <html lang="pl"><body>{children}</body></html>;
}
```

### Metadata
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wyjazdy',
    description: 'Nadchodzące wyjazdy warsztatowe',
};

// Dynamiczna
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const trip = getTripBySlug(slug);
    return { title: trip?.title };
}
```

### Route Handler Types
```typescript
// app/api/booking/route.ts
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    // ...
    return NextResponse.json({ success: true }, { status: 201 });
}
```

---

## Typy Projektu

### Trip Types (`src/types/trip.ts`)
```typescript
export interface Trip {
    slug: string;
    title: string;
    subtitle: string;
    shortDescription: string;
    heroImage: string;
    dates: TripDates;
    location: TripLocation;
    pricing: TripPricing;
    targetAudience: string;
    isPast: boolean;
    schedule: TripScheduleDay[];
    collaborator?: Collaborator;
    faq: FAQ[];
    gallery?: string[];
}

export interface TripDates {
    start: string;  // ISO date
    end: string;    // ISO date
}

export interface TripLocation {
    name: string;
    region: string;
}

export interface TripPricing {
    adult: number;
    child: number;
    includes: string[];
}

export interface TripScheduleDay {
    day: number;
    title: string;
    activities: TripActivity[];
}

export interface TripActivity {
    time: string;
    title: string;
    description?: string;
}

export interface FAQ {
    question: string;
    answer: string;
}
```

### Form Types (`src/types/forms.ts`)
```typescript
export interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    trip: string;
    adults: number;
    childrenCount: number;
    childrenAges: string;
    notes?: string;
    rodoConsent: true;
    marketingConsent?: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    rodoConsent: true;
}

export interface NewsletterFormData {
    email: string;
    marketingConsent: true;
}
```

---

## Kiedy Explicit Types, Kiedy Inferowanie

```typescript
// Pozwól inferować
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const upcomingTrips = trips.filter(t => !t.isPast);

// Explicit gdy null/undefined
const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

// Explicit dla pustych tablic
const [items, setItems] = useState<Trip[]>([]);

// Explicit return types dla helper functions
function getTripBySlug(slug: string): Trip | undefined {
    return trips.find(t => t.slug === slug);
}
```

---

## satisfies Operator

```typescript
import { ROUTES } from '@/lib/constants';

// ROUTES.HOME jest typu "/" (literal), nie string
const ROUTES = {
    HOME: '/',
    TRIPS: '/#wyjazdy',
    ABOUT: '/#o-nas',
    CONTACT: '/#kontakt',
} satisfies Record<string, string>;
```

---

## as const

```typescript
const TRIP_AUDIENCES = ['rodziny', 'matki-i-corki', 'yoga'] as const;
type TripAudience = typeof TRIP_AUDIENCES[number];
// "rodziny" | "matki-i-corki" | "yoga"
```

---

## Runtime Validation z Zod 4.3

```typescript
import { z } from 'zod';

const BookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    adults: z.coerce.number().min(1).max(10),
    rodoConsent: z.literal(true),
});

type BookingData = z.infer<typeof BookingSchema>;

// Safe parse (API routes)
const result = BookingSchema.safeParse(body);
if (result.success) {
    // result.data jest typu BookingData
} else {
    // result.error.flatten().fieldErrors
}
```

---

## Unikaj

```typescript
// NIE — any
function process(data: any) { ... }
// TAK — unknown
function process(data: unknown) { ... }

// NIE — non-null assertion
const trip = getTripBySlug(slug)!;
// TAK — explicit check
const trip = getTripBySlug(slug);
if (!trip) notFound();

// NIE — type assertion bez walidacji
const data = response as BookingFormData;
// TAK — runtime validation
const data = BookingSchema.parse(response);
```

---

## React Event Types

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
```

---

## Utility Types

```typescript
Partial<Trip>           // Wszystkie opcjonalne
Required<Trip>          // Wszystkie wymagane
Pick<Trip, 'slug' | 'title'>  // Tylko slug i title
Omit<Trip, 'schedule'>  // Bez schedule
Record<string, string>  // Object type
```

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Wzorce React 19
- [forms.md](./forms.md) — Zod 4 schemas
- [auth-and-data.md](./auth-and-data.md) — API route types
