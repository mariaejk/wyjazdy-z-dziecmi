# Organizacja Plików

Struktura katalogów dla projektu "Wyjazdy z Dziećmi" — Next.js 16 + App Router.

---

## Struktura Projektu
```
src/
├── app/                        # App Router
│   ├── layout.tsx             # Root layout (html, body, fonts, Header, Footer)
│   ├── page.tsx               # Strona główna (/)
│   ├── loading.tsx            # Global loading state
│   ├── error.tsx              # Global error boundary
│   ├── not-found.tsx          # Global 404
│   ├── globals.css            # TailwindCSS v4 + @theme (design system)
│   ├── wyjazdy/
│   │   └── [slug]/
│   │       ├── page.tsx       # /wyjazdy/matka-i-corka
│   │       ├── loading.tsx    # Trip loading state
│   │       ├── error.tsx      # Trip error boundary
│   │       └── not-found.tsx  # Trip 404
│   └── api/                   # Route Handlers
│       ├── booking/route.ts   # POST /api/booking
│       ├── contact/route.ts   # POST /api/contact
│       └── newsletter/route.ts # POST /api/newsletter
├── components/
│   ├── layout/                # Szkielet strony
│   │   ├── SkipToContent.tsx  # Accessibility skip link
│   │   ├── Container.tsx      # Max-width wrapper
│   │   ├── Header.tsx         # Navigation header
│   │   ├── MobileMenu.tsx     # Drawer menu (Client Component)
│   │   └── Footer.tsx         # Footer with links
│   ├── sections/              # Sekcje stron (Faza 2+)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── TripCards.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTASection.tsx
│   │   └── trip/             # Sekcje podstrony wyjazdu
│   │       ├── TripHero.tsx
│   │       ├── TripDescription.tsx
│   │       ├── TripProgram.tsx
│   │       ├── TripPricing.tsx
│   │       ├── TripFAQ.tsx
│   │       ├── TripGallery.tsx
│   │       └── BookingForm.tsx
│   └── ui/                    # Reużywalne UI (własne, nie shadcn)
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── FormField.tsx
│       └── AnimatedSection.tsx
├── data/                      # Hardcoded content (no CMS)
│   ├── navigation.ts         # Menu items + legal links
│   └── trips.ts              # Trip data (future)
├── lib/                       # Utilities
│   ├── constants.ts           # SITE_CONFIG, ROUTES, CONTACT, SOCIAL_LINKS
│   └── utils.ts               # cn(), formatDate(), formatCurrency()
└── types/                     # TypeScript types
    ├── trip.ts                # Trip, TripScheduleDay, TripPricing
    ├── team.ts                # TeamMember, Collaborator
    ├── place.ts               # Place
    └── forms.ts               # BookingFormData, ContactFormData, NewsletterFormData
```

---

## App Router — Konwencje Plików

### Specjalne Pliki

| Plik | Opis | Wymagany |
|------|------|----------|
| `page.tsx` | UI strony — tworzy route | Tak (dla route) |
| `layout.tsx` | Współdzielony layout (persists between pages) | Root: tak |
| `loading.tsx` | Loading UI (automatyczny Suspense) | Nie |
| `error.tsx` | Error boundary (`'use client'` wymagane) | Nie |
| `not-found.tsx` | 404 UI | Nie |
| `route.ts` | API endpoint (GET, POST, etc.) | Nie |

### Ważne Zasady
```typescript
// page.tsx MUSI mieć default export
export default function Page() { ... }

// layout.tsx MUSI przyjmować children
export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

// error.tsx MUSI być Client Component
'use client';
export default function Error({ error, reset }: { ... }) { ... }

// loading.tsx — Server Component (domyślnie)
export default function Loading() { ... }
```

---

## Dynamic Routes

### Trip Subpages
```
app/wyjazdy/[slug]/page.tsx    → /wyjazdy/matka-i-corka
app/wyjazdy/[slug]/page.tsx    → /wyjazdy/yoga-i-konie
```

### Obsługa Parametrów (Next.js 16)

`params` jest **async** (Promise):
```typescript
// app/wyjazdy/[slug]/page.tsx
interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TripPage({ params }: PageProps) {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);
    if (!trip) notFound();

    return <TripContent trip={trip} />;
}

// generateMetadata też dostaje async params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);
    return {
        title: trip?.title ?? 'Wyjazd',
        description: trip?.shortDescription,
    };
}
```

### generateStaticParams (SSG)
```typescript
// app/wyjazdy/[slug]/page.tsx
import { trips } from '@/data/trips';

export function generateStaticParams() {
    return trips.map(trip => ({ slug: trip.slug }));
}
```

---

## Root Layout

```typescript
// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin", "latin-ext"],
    display: "swap",
    weight: ["400", "700"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "latin-ext"],
    display: "swap",
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: {
        default: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
        template: "%s | Wyjazdy z Dziećmi",
    },
    description: "Warsztaty rozwojowe dla rodzin w otoczeniu natury.",
    metadataBase: new URL("https://www.wyjazdyzdziecmi.pl"),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="pl">
            <body className={`${playfair.variable} ${inter.variable} font-body bg-parchment text-graphite antialiased`}>
                <SkipToContent />
                <Header />
                <main id="main-content" className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
```

---

## Metadata i SEO

### Static Metadata
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakt',
    description: 'Skontaktuj się z nami',
};
```

### Dynamic Metadata (trip subpages)
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const trip = trips.find(t => t.slug === slug);

    return {
        title: trip?.title,
        description: trip?.shortDescription,
        openGraph: {
            images: [trip?.heroImage ?? '/images/hero.jpg'],
        },
    };
}
```

---

## Katalog components/

### layout/ — Szkielet strony
```
components/layout/
├── SkipToContent.tsx    # <a href="#main-content"> — accessibility
├── Container.tsx        # max-w-6xl mx-auto px-4
├── Header.tsx           # Logo + nav + MobileMenu trigger
├── MobileMenu.tsx       # 'use client' — drawer z animacjami motion
└── Footer.tsx           # Linki, kontakt, newsletter placeholder
```

### sections/ — Sekcje stron
```
components/sections/
├── Hero.tsx             # Hero z CTA
├── About.tsx            # O wyjazdach
├── TripCards.tsx        # Karty wyjazdów (animowane)
├── Testimonials.tsx     # Opinie klientów
├── CTASection.tsx       # Final CTA
└── trip/                # Sekcje podstrony wyjazdu
    ├── TripHero.tsx
    ├── TripDescription.tsx
    └── ...
```

### ui/ — Reużywalne komponenty
```
components/ui/
├── Button.tsx           # CTA button z wariantami
├── Input.tsx            # Form input z error state
├── FormField.tsx        # Label + Input + error wrapper
└── AnimatedSection.tsx  # motion.div z whileInView
```

---

## API Routes (Route Handlers)

```typescript
// app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(9),
    trip: z.string(),
    adults: z.number().min(1),
    children: z.number().min(0),
    // ... reszta pól
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
        return NextResponse.json({ success: true }); // Fake success for bots
    }

    // Rate limiting (5 req/15min per IP)
    // ... implementacja

    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // TODO: webhook do n8n
    return NextResponse.json({ success: true }, { status: 201 });
}
```

---

## Data Layer — Hardcoded Content

```typescript
// src/data/trips.ts
import type { Trip } from '@/types/trip';

export const trips: Trip[] = [
    {
        slug: 'matka-i-corka',
        title: 'Matka i Córka — Wspólny Rytm',
        // ... pełne dane z docs/tresc_na_strone.md
    },
    {
        slug: 'yoga-i-konie',
        title: 'Yoga i Konie',
        // ... placeholder
    },
];
```

**Dlaczego hardcoded:** MVP bez CMS/Airtable. Treści w `docs/tresc_na_strone.md` → dane w `src/data/`.

---

## Konwencje Nazewnictwa

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Strony App Router | `page.tsx`, `layout.tsx` | lowercase (wymagane) |
| Komponenty | PascalCase | `TripCard.tsx` |
| Foldery komponentów | lowercase | `layout/`, `sections/`, `ui/` |
| Hooki | camelCase + `use` | `useMediaQuery.ts` |
| Dane | camelCase | `trips.ts`, `navigation.ts` |
| Utilities | camelCase | `utils.ts`, `constants.ts` |
| Typy | camelCase | `trip.ts`, `forms.ts` |

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Server vs Client Components
- [typescript-standards.md](./typescript-standards.md) — Typy
- [loading-and-error-states.md](./loading-and-error-states.md) — loading.tsx, error.tsx
