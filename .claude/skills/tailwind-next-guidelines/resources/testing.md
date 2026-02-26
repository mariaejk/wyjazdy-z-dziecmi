# Testowanie

Vitest + React Testing Library — testy komponentów, formularzy, a11y w Next.js 16.

---

## Stack Testowy

| Narzędzie | Rola |
|-----------|------|
| **Vitest** | Test runner (natywny ESM, szybki) |
| **React Testing Library** | Testowanie komponentów React |
| **@testing-library/user-event** | Symulacja interakcji |
| **MSW v2** | Mockowanie API routes (opcjonalnie) |

---

## Setup

### Instalacja
```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

### src/test/setup.ts
```typescript
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => cleanup());
```

### package.json
```json
{
    "scripts": {
        "test": "vitest",
        "test:coverage": "vitest run --coverage"
    }
}
```

---

## Testowanie Server Components (jako zwykłe funkcje)

Server Components to async functions — testuj ich output:
```typescript
import { render, screen } from '@testing-library/react';
import TripPage from '@/app/wyjazdy/[slug]/page';

// Mock danych
vi.mock('@/data/trips', () => ({
    trips: [
        {
            slug: 'matka-i-corka',
            title: 'Matka i Córka — Wspólny Rytm',
            // ... minimalne dane do testu
        },
    ],
}));

test('renderuje stronę wyjazdu', async () => {
    const page = await TripPage({ params: Promise.resolve({ slug: 'matka-i-corka' }) });
    render(page);
    expect(screen.getByText(/Matka i Córka/)).toBeInTheDocument();
});
```

---

## Testowanie Client Components

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionItem } from '@/components/ui/AccordionItem';

describe('AccordionItem', () => {
    it('pokazuje odpowiedź po kliknięciu', async () => {
        const user = userEvent.setup();

        render(
            <AccordionItem
                question="Dla jakiego wieku?"
                answer="Córki w wieku 6-16 lat."
            />
        );

        // Początkowo odpowiedź ukryta
        expect(screen.queryByText(/6-16 lat/)).not.toBeInTheDocument();

        // Klik w pytanie
        await user.click(screen.getByRole('button', { name: /dla jakiego wieku/i }));

        // Odpowiedź widoczna
        expect(screen.getByText(/6-16 lat/)).toBeInTheDocument();
    });

    it('ma prawidłowy aria-expanded', async () => {
        const user = userEvent.setup();

        render(
            <AccordionItem question="Pytanie" answer="Odpowiedź" />
        );

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'false');

        await user.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });
});
```

---

## Testowanie Formularzy

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from '@/components/sections/trip/BookingForm';

const mockTrip = {
    slug: 'matka-i-corka',
    title: 'Matka i Córka — Wspólny Rytm',
    // ... minimalne dane
};

describe('BookingForm', () => {
    it('wyświetla błędy walidacji przy pustym submit', async () => {
        const user = userEvent.setup();
        render(<BookingForm trip={mockTrip} />);

        await user.click(screen.getByRole('button', { name: /wyślij/i }));

        await waitFor(() => {
            expect(screen.getByText(/minimum 2 znaki/i)).toBeInTheDocument();
        });
    });

    it('wysyła poprawne dane', async () => {
        const user = userEvent.setup();

        // Mock fetch
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        });

        render(<BookingForm trip={mockTrip} />);

        await user.type(screen.getByLabelText(/imię/i), 'Anna Kowalska');
        await user.type(screen.getByLabelText(/email/i), 'anna@example.com');
        await user.type(screen.getByLabelText(/telefon/i), '123456789');
        await user.type(screen.getByLabelText(/wiek dzieci/i), '8, 12');
        await user.click(screen.getByLabelText(/zgoda na przetwarzanie/i));
        await user.click(screen.getByRole('button', { name: /wyślij/i }));

        await waitFor(() => {
            expect(screen.getByText(/dziękujemy/i)).toBeInTheDocument();
        });
    });

    it('nie ma w DOM honeypot widocznego dla użytkownika', () => {
        render(<BookingForm trip={mockTrip} />);

        const honeypot = document.querySelector('[name="website"]');
        expect(honeypot).toBeInTheDocument();
        expect(honeypot?.closest('div')).toHaveAttribute('aria-hidden', 'true');
    });
});
```

---

## Testowanie Utilities

```typescript
import { cn, formatDate, formatCurrency } from '@/lib/utils';

describe('cn', () => {
    it('łączy klasy', () => {
        expect(cn('p-4', 'bg-moss')).toBe('p-4 bg-moss');
    });

    it('obsługuje warunkowe klasy', () => {
        expect(cn('p-4', false && 'hidden')).toBe('p-4');
        expect(cn('p-4', true && 'hidden')).toBe('p-4 hidden');
    });

    it('merguje konflikty Tailwind', () => {
        expect(cn('p-4', 'p-6')).toBe('p-6');
    });
});

describe('formatCurrency', () => {
    it('formatuje polską walutę', () => {
        expect(formatCurrency(1200)).toMatch(/1[\s\u00a0]?200/); // "1 200 zł" lub "1200 zł"
    });
});
```

---

## A11y Testing

```bash
npm install -D jest-axe @types/jest-axe
```

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('formularz nie ma naruszeń a11y', async () => {
    const { container } = render(<BookingForm trip={mockTrip} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('nawigacja nie ma naruszeń a11y', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
```

---

## Dobre Praktyki

### 1. Testuj zachowanie, nie implementację
```typescript
// NIE
expect(component.state.isOpen).toBe(true);

// TAK
expect(screen.getByRole('region')).toBeVisible();
```

### 2. Używaj ról zamiast test ID
```typescript
// NIE
screen.getByTestId('submit-button');

// TAK
screen.getByRole('button', { name: /wyślij/i });
```

### 3. Arrange-Act-Assert
```typescript
test('toggle accordion', async () => {
    const user = userEvent.setup();
    render(<AccordionItem question="Q" answer="A" />);   // Arrange

    await user.click(screen.getByRole('button'));          // Act

    expect(screen.getByText('A')).toBeInTheDocument();     // Assert
});
```

---

## Co Testować vs Nie

| Testuj | Nie testuj |
|--------|------------|
| Formularze (walidacja, submit, a11y) | CSS/Styling |
| Interaktywność (accordion, menu) | Statyczne Server Components |
| Utilities (cn, formatDate) | Motion animacje |
| Edge cases, error states | Typy TypeScript |
| A11y (axe) | Implementacje bibliotek |

---

## Mock Motion

Motion components mogą sprawiać problemy w testach:
```typescript
// src/test/setup.ts
vi.mock('motion/react', () => ({
    motion: {
        div: 'div',
        section: 'section',
        button: 'button',
        a: 'a',
        h1: 'h1',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
}));
```

---

## Zobacz Także

- [component-patterns.md](./component-patterns.md) — Error Boundaries
- [forms.md](./forms.md) — React Hook Form + Zod
- [loading-and-error-states.md](./loading-and-error-states.md) — Loading patterns
