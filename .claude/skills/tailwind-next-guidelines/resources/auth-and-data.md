# Dane i API Routes

Wzorce data layer i API routes dla projektu "Wyjazdy z Dziećmi" — hardcoded data + Zod-validated API routes.

---

## Architektura Danych

| Warstwa | Opis | Lokalizacja |
|---------|------|-------------|
| **Hardcoded data** | Treści wyjazdów, nawigacja | `src/data/` |
| **Typy TypeScript** | Interfejsy danych | `src/types/` |
| **API Routes** | Formularze (booking, contact, newsletter) | `src/app/api/` |
| **Treści źródłowe** | Copy z klientki | `docs/tresc_na_strone.md` |

**MVP nie używa CMS, Airtable, Supabase ani bazy danych.** Dane są hardcoded w plikach TypeScript.

---

## Hardcoded Data (`src/data/`)

### Trips
```typescript
// src/data/trips.ts
import type { Trip } from '@/types/trip';

export const trips: Trip[] = [
    {
        slug: 'matka-i-corka',
        title: 'Matka i Córka — Wspólny Rytm',
        subtitle: 'Warsztaty taneczne i twórcze dla mam z córkami',
        shortDescription: 'Wyjątkowy czas tylko dla Was...',
        heroImage: '/images/matka-i-corka-hero.jpg',
        dates: { start: '2025-09-12', end: '2025-09-14' },
        location: {
            name: 'Ośrodek w Bieszczadach',
            region: 'Bieszczady',
        },
        pricing: {
            adult: 1200,
            child: 800,
            includes: ['Noclegi', 'Wyżywienie', 'Warsztaty'],
        },
        targetAudience: 'matki-i-corki',
        isPast: false,
        schedule: [
            {
                day: 1,
                title: 'Piątek — Przyjazd i integracja',
                activities: [
                    { time: '15:00', title: 'Przyjazd, zakwaterowanie' },
                    { time: '17:00', title: 'Krąg otwarcia' },
                    { time: '19:00', title: 'Kolacja' },
                ],
            },
            // ... kolejne dni
        ],
        collaborator: {
            name: 'Anna Kowalska',
            role: 'Instruktorka tańca',
            bio: 'Tancerka i pedagog...',
            image: '/images/collaborators/anna.jpg',
        },
        faq: [
            { question: 'Dla jakiego wieku?', answer: 'Córki w wieku 6-16 lat.' },
        ],
    },
];

// Helper functions
export function getTripBySlug(slug: string): Trip | undefined {
    return trips.find(t => t.slug === slug);
}

export function getUpcomingTrips(): Trip[] {
    return trips.filter(t => !t.isPast);
}

export function getPastTrips(): Trip[] {
    return trips.filter(t => t.isPast);
}
```

### Navigation
```typescript
// src/data/navigation.ts (już istnieje)
export const navigation = [
    { label: 'Strona główna', href: '/' },
    { label: 'Wyjazdy', href: '/#wyjazdy' },
    { label: 'O nas', href: '/#o-nas' },
    { label: 'Opinie', href: '/#opinie' },
    { label: 'Kontakt', href: '/#kontakt' },
];
```

---

## Użycie Danych w Server Components

```typescript
// app/page.tsx — Server Component
import { getUpcomingTrips } from '@/data/trips';
import { TripCardsSection } from '@/components/sections/TripCards';

export default function HomePage() {
    const upcomingTrips = getUpcomingTrips();

    return (
        <>
            <Hero />
            <TripCardsSection trips={upcomingTrips} />
        </>
    );
}
```

```typescript
// app/wyjazdy/[slug]/page.tsx — Server Component
import { trips, getTripBySlug } from '@/data/trips';
import { notFound } from 'next/navigation';

// SSG — generuj strony statycznie
export function generateStaticParams() {
    return trips.map(trip => ({ slug: trip.slug }));
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trip = getTripBySlug(slug);

    if (!trip) notFound();

    return <TripContent trip={trip} />;
}
```

---

## API Routes — Wzorzec

Każdy API route ma:
1. **Zod validation** — walidacja danych wejściowych
2. **Honeypot** — pole `website` ukryte CSS, boty je wypełniają
3. **Rate limiting** — 5 req / 15 min per IP
4. **Komentarz webhook** — przygotowane na przyszłą integrację z n8n

### Booking Route
```typescript
// app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
    name: z.string().min(2, 'Minimum 2 znaki'),
    email: z.string().email('Nieprawidłowy email'),
    phone: z.string().min(9, 'Minimum 9 cyfr'),
    trip: z.string().min(1, 'Wybierz wyjazd'),
    adults: z.number().min(1, 'Minimum 1 dorosły'),
    childrenCount: z.number().min(0),
    childrenAges: z.string().optional(),
    notes: z.string().max(500).optional(),
    rodoConsent: z.literal(true, {
        errorMap: () => ({ message: 'Zgoda RODO jest wymagana' }),
    }),
    marketingConsent: z.boolean().optional(),
    // Honeypot — NIE waliduj, sprawdź osobno
});

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
        return false;
    }

    entry.count++;
    return entry.count > 5;
}

export async function POST(request: NextRequest) {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: 'Zbyt wiele prób. Spróbuj za 15 minut.' },
            { status: 429 }
        );
    }

    // 2. Parse body
    const body = await request.json();

    // 3. Honeypot check — if `website` field is filled, it's a bot
    if (body.website) {
        // Return fake success to not tip off the bot
        return NextResponse.json({ success: true });
    }

    // 4. Zod validation
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    // 5. Process booking
    // TODO: n8n webhook integration
    // await fetch(process.env.N8N_BOOKING_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(parsed.data),
    // });

    return NextResponse.json({ success: true }, { status: 201 });
}
```

### Contact Route
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10).max(2000),
    rodoConsent: z.literal(true),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Honeypot
    if (body.website) {
        return NextResponse.json({ success: true });
    }

    // Rate limiting (same pattern)
    // ...

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // TODO: n8n webhook
    return NextResponse.json({ success: true }, { status: 201 });
}
```

### Newsletter Route
```typescript
// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
    email: z.string().email(),
    marketingConsent: z.literal(true),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (body.website) return NextResponse.json({ success: true });

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // TODO: n8n webhook / mailing list integration
    return NextResponse.json({ success: true }, { status: 201 });
}
```

---

## Wzorzec: API Route Template

Każdy nowy API route powinien mieć:
```typescript
// app/api/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 1. Schema
const schema = z.object({ /* ... */ });

// 2. Rate limiting (shared helper in future)

export async function POST(request: NextRequest) {
    const body = await request.json();

    // 3. Honeypot
    if (body.website) return NextResponse.json({ success: true });

    // 4. Rate limit check

    // 5. Validate
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // 6. Process + webhook placeholder
    return NextResponse.json({ success: true }, { status: 201 });
}
```

---

## Environment Variables

```env
# .env.local (przyszłość — gdy dodamy webhook)
# N8N_BOOKING_WEBHOOK_URL=https://n8n.example.com/webhook/booking
# N8N_CONTACT_WEBHOOK_URL=https://n8n.example.com/webhook/contact
```

**Zasada:** Bez prefixu `NEXT_PUBLIC_` = tylko server-side (API routes).

---

## Zobacz Także

- [forms.md](./forms.md) — Formularze client-side (RHF + Zod)
- [file-organization.md](./file-organization.md) — Struktura src/data/, src/types/
- [typescript-standards.md](./typescript-standards.md) — Zod schemas
