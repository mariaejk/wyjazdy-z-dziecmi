# Formularze

React Hook Form 7.71 + Zod 4.3 + honeypot + RODO consent — wzorce formularzy dla projektu "Wyjazdy z Dziećmi".

---

## Stack Formularzy

| Pakiet | Wersja | Rola |
|--------|--------|------|
| react-hook-form | 7.71 | Zarządzanie stanem formularza |
| zod | 4.3 | Walidacja (client + server) |
| @hookform/resolvers | 5.2 | Bridge RHF ↔ Zod |

---

## Trzy Formularze w Projekcie

| Formularz | Route | Pola |
|-----------|-------|------|
| **Booking** | `POST /api/booking` | name, email, phone, trip, adults, childrenCount, childrenAges, notes, rodoConsent, marketingConsent |
| **Contact** | `POST /api/contact` | name, email, message, rodoConsent |
| **Newsletter** | `POST /api/newsletter` | email, marketingConsent |

Każdy formularz ma: honeypot field + Zod validation + rate limiting na API route.

---

## Booking Form — Pełny Wzorzec

### Schema (Zod 4.3)
```typescript
// lib/schemas/booking.ts
import { z } from 'zod';

export const bookingSchema = z.object({
    name: z.string().min(2, 'Minimum 2 znaki'),
    email: z.string().email('Nieprawidłowy email'),
    phone: z.string().min(9, 'Minimum 9 cyfr'),
    trip: z.string().min(1, 'Wybierz wyjazd'),
    adults: z.coerce.number().min(1, 'Minimum 1 dorosły').max(10),
    childrenCount: z.coerce.number().min(1, 'Minimum 1 dziecko').max(10),
    childrenAges: z.string().min(1, 'Podaj wiek dzieci'),
    notes: z.string().max(500).optional(),
    rodoConsent: z.literal(true, {
        errorMap: () => ({ message: 'Zgoda na przetwarzanie danych jest wymagana' }),
    }),
    marketingConsent: z.boolean().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
```

### Komponent Formularza
```typescript
// components/sections/trip/BookingForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { bookingSchema, type BookingFormData } from '@/lib/schemas/booking';
import type { Trip } from '@/types/trip';

interface BookingFormProps {
    trip: Trip;
}

export function BookingForm({ trip }: BookingFormProps) {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            trip: trip.title,
            adults: 1,
            childrenCount: 1,
            rodoConsent: false as unknown as true, // Will fail validation if unchecked
            marketingConsent: false,
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Błąd wysyłania');
            }

            setSubmitStatus('success');
            reset();
        } catch {
            setSubmitStatus('error');
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="p-8 bg-moss/5 rounded-lg text-center">
                <h3 className="font-heading text-xl text-moss">Dziękujemy za zgłoszenie!</h3>
                <p className="mt-2 text-graphite-light">
                    Skontaktujemy się z Tobą w ciągu 48 godzin.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Honeypot — ukryte pole, boty je wypełniają */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Nie wypełniaj tego pola</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Imię */}
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-graphite">
                    Imię i nazwisko *
                </label>
                <input
                    id="name"
                    {...register('name')}
                    className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-moss",
                        errors.name ? "border-red-500" : "border-graphite/20"
                    )}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                    <p id="name-error" role="alert" className="text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-graphite">
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-moss",
                        errors.email ? "border-red-500" : "border-graphite/20"
                    )}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                    <p id="email-error" role="alert" className="text-sm text-red-600">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Telefon */}
            <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-graphite">
                    Telefon *
                </label>
                <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={cn(
                        "w-full px-4 py-3 border rounded-lg bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-moss",
                        errors.phone ? "border-red-500" : "border-graphite/20"
                    )}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                    <p id="phone-error" role="alert" className="text-sm text-red-600">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            {/* Liczba dorosłych i dzieci — w jednym rzędzie */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="adults" className="text-sm font-medium text-graphite">
                        Dorośli *
                    </label>
                    <input
                        id="adults"
                        type="number"
                        min={1}
                        max={10}
                        {...register('adults')}
                        className="w-full px-4 py-3 border border-graphite/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-moss"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="childrenCount" className="text-sm font-medium text-graphite">
                        Dzieci *
                    </label>
                    <input
                        id="childrenCount"
                        type="number"
                        min={1}
                        max={10}
                        {...register('childrenCount')}
                        className="w-full px-4 py-3 border border-graphite/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-moss"
                    />
                </div>
            </div>

            {/* Wiek dzieci */}
            <div className="space-y-1">
                <label htmlFor="childrenAges" className="text-sm font-medium text-graphite">
                    Wiek dzieci *
                </label>
                <input
                    id="childrenAges"
                    {...register('childrenAges')}
                    placeholder="np. 5, 8, 12"
                    className="w-full px-4 py-3 border border-graphite/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-moss"
                    aria-invalid={!!errors.childrenAges}
                />
            </div>

            {/* RODO Consent (wymagane) */}
            <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('rodoConsent')}
                        className="mt-1 h-4 w-4 rounded border-graphite/30 text-moss focus:ring-moss"
                    />
                    <span className="text-sm text-graphite-light">
                        * Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                        realizacji rezerwacji zgodnie z{' '}
                        <a href="/polityka-prywatnosci" className="text-moss underline">
                            Polityką Prywatności
                        </a>.
                    </span>
                </label>
                {errors.rodoConsent && (
                    <p role="alert" className="text-sm text-red-600">
                        {errors.rodoConsent.message}
                    </p>
                )}
            </div>

            {/* Marketing Consent (opcjonalne) */}
            <label className="flex items-start gap-3 cursor-pointer">
                <input
                    type="checkbox"
                    {...register('marketingConsent')}
                    className="mt-1 h-4 w-4 rounded border-graphite/30 text-moss focus:ring-moss"
                />
                <span className="text-sm text-graphite-light">
                    Chcę otrzymywać informacje o nadchodzących wyjazdach.
                </span>
            </label>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                    "w-full flex items-center justify-center gap-2",
                    "bg-moss text-white px-8 py-4 rounded-lg font-medium",
                    "hover:bg-moss-light transition-colors",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                        Wysyłanie...
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5" strokeWidth={1.5} />
                        Wyślij zgłoszenie
                    </>
                )}
            </button>

            {submitStatus === 'error' && (
                <p role="alert" className="text-sm text-red-600 text-center">
                    Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio.
                </p>
            )}
        </form>
    );
}
```

---

## Honeypot Pattern

Każdy formularz zawiera ukryte pole `website`:
```typescript
{/* Honeypot — ukryte CSS, boty wypełniają */}
<div className="absolute -left-[9999px]" aria-hidden="true">
    <label htmlFor="website">Nie wypełniaj</label>
    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

Na serwerze (API route):
```typescript
if (body.website) {
    return NextResponse.json({ success: true }); // Fake success
}
```

---

## Zod 4.3 Schemas — Wzorce

```typescript
// Stringi
z.string().min(1, 'Wymagane')
z.string().email('Nieprawidłowy email')
z.string().min(9, 'Minimum 9 cyfr')    // telefon
z.string().max(500).optional()           // notatki

// Liczby z coerce (z input[type=number])
z.coerce.number().min(1).max(10)

// Boolean literal (wymagany checkbox)
z.literal(true, {
    errorMap: () => ({ message: 'Zgoda jest wymagana' }),
})

// Opcjonalny boolean
z.boolean().optional()

// Enum
z.enum(['matka-i-corka', 'yoga-i-konie'])
```

---

## Dostępność (A11y) Formularzy

```typescript
<input
    id="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
    aria-required="true"
/>
{errors.email && (
    <p id="email-error" role="alert" className="text-sm text-red-600">
        {errors.email.message}
    </p>
)}
```

**Checklist a11y:**
- `<label htmlFor="...">` powiązany z `id` inputa
- `aria-invalid` gdy błąd walidacji
- `aria-describedby` wskazujący na komunikat błędu
- `aria-required` dla wymaganych pól
- `role="alert"` na komunikatach błędów (czytniki ekranu)
- `noValidate` na `<form>` (własna walidacja zamiast browser)

---

## Ważne: Brak Email Confirmation w MVP

Nie obiecuj automatycznej konfirmacji emailem w microcopy. Zamiast:
- "Wysłaliśmy potwierdzenie na Twój email"

Pisz:
- "Skontaktujemy się z Tobą w ciągu 48 godzin"

---

## Zobacz Także

- [auth-and-data.md](./auth-and-data.md) — API routes z Zod + honeypot + rate limiting
- [component-patterns.md](./component-patterns.md) — Client Components
- [typescript-standards.md](./typescript-standards.md) — Zod schemas
