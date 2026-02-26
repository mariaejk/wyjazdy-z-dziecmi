# Faza 3: Kontekst i zależności

> **Branch:** `feature/faza3-podstrona-wyjazdu`
> **Ostatnia aktualizacja:** 2026-02-26

---

## Powiązane pliki (istniejące)

### Dane i typy
- `src/types/trip.ts` — Trip + wszystkie sub-typy (schedule, pricing, FAQ, gallery, collaborator, targetAudience)
- `src/types/forms.ts` — BookingFormData, ContactFormData, NewsletterFormData
- `src/data/trips.ts` — dane 2 wyjazdów + helpery (getTripBySlug, getAllTrips, getUpcomingTrips, getPastTrips)

### Komponenty do reużycia
- `src/components/ui/Button.tsx` — primary/secondary/ghost, link/button discriminated union
- `src/components/ui/Card.tsx` — z image, href, grayscale
- `src/components/ui/Badge.tsx` — default/outline
- `src/components/ui/SectionWrapper.tsx` — default/alternate background
- `src/components/ui/SectionHeading.tsx` — h2 + subtitle, center/left align
- `src/components/shared/ScrollAnimation.tsx` — fadeIn/fadeUp/fadeLeft/fadeRight/scaleIn, reduced-motion
- `src/components/home/TripCard.tsx` — reużywalny na stronie /wyjazdy

### Layout
- `src/app/layout.tsx` — root layout z Header, Footer, fonts
- `src/components/layout/Container.tsx` — max-width wrapper

### Utilities
- `src/lib/utils.ts` — cn(), formatDate(), formatDateShort(), formatCurrency()
- `src/lib/constants.ts` — SITE_CONFIG, ROUTES, CONTACT, SOCIAL_LINKS

### Obrazy dostępne
- `public/images/matka-corka.jpg` — hero/karta "Matka i Córka"
- `public/images/yoga-konie.jpg` — karta "Yoga i Konie"
- `public/images/kacze-bagno.jpg` — Kacze Bagno (gallery)
- `public/images/galeria-1.jpg` — gallery
- `public/images/hero.jpg` — hero strony głównej
- `public/images/logo.jpeg` — logo

## Pliki do utworzenia

### Komponenty trips/ (nowy katalog)
```
src/components/trips/
├── TripHero.tsx            — 3A.1
├── TripTargetAudience.tsx  — 3A.2
├── TripDescription.tsx     — 3A.3
├── TripProgram.tsx         — 3A.5
├── TripPracticalInfo.tsx   — 3A.6
├── TripPricing.tsx         — 3A.7
├── TripCollaborator.tsx    — 3B.1
├── TripFAQ.tsx             — 3B.2
├── TripGallery.tsx         — 3B.3
└── BookingForm.tsx         — 3D.2
```

### Komponenty UI (rozbudowa istniejącego katalogu)
```
src/components/ui/
├── Accordion.tsx           — 3A.4
├── Input.tsx               — 3C.1
├── Textarea.tsx            — 3C.2
├── Select.tsx              — 3C.3
├── Checkbox.tsx            — 3C.4
└── HoneypotField.tsx       — 3C.5
```

### Strony
```
src/app/wyjazdy/
├── page.tsx                — 3E.2 (lista wyjazdów)
└── [slug]/
    └── page.tsx            — 3E.1 (szczegóły wyjazdu)
```

### Lib
```
src/lib/
├── rate-limit.ts           — 3D.3
└── validations/
    └── booking.ts          — 3D.1 (Zod schema, shared client+server)
```

### API
```
src/app/api/
└── booking/
    └── route.ts            — 3D.4
```

## Decyzje techniczne

### 1. Server Components vs Client Components
- **Server Components (domyślnie):** TripHero, TripTargetAudience, TripProgram, TripPracticalInfo, TripPricing, TripCollaborator, TripGallery, strony /wyjazdy i /wyjazdy/[slug]
- **Client Components (`"use client"`):** Accordion (interakcja open/close), BookingForm (RHF), TripDescription (jeśli accordion expand), TripFAQ (zawiera Accordion)
- **Wzorzec:** ScrollAnimation jako client boundary opakowujący server-rendered content

### 2. Accordion — implementacja
- `"use client"` z `motion/react` (`AnimatePresence`, `motion.div`)
- Props: `items: { title: string; content: ReactNode }[]`, `allowMultiple?: boolean`
- Reduced-motion: instant show/hide (no animation), still functional
- `aria-expanded`, `aria-controls`, `role="button"` na trigger

### 3. Form UI primitives — wzorzec
- Każdy komponent akceptuje `React.forwardRef` (wymagane przez RHF `register()`)
- Props: `label`, `error` (string z RHF), `helperText`, plus natywne HTML attrs via `...rest`
- Styling: border-graphite-light, focus:border-moss, error:border-red-500

### 4. BookingForm — architektura
- `"use client"` komponent
- `useForm<BookingFormData>()` z `zodResolver(bookingFormSchema)`
- Trip dropdown: `getAllTrips()` przekazane jako prop (server component parent fetch)
- Stany: idle → submitting (disabled, spinner) → success (zielony komunikat) → error (czerwony)
- Honeypot: pole `website` ukryte CSS, nie wysyłane jeśli puste, odrzucenie server-side

### 5. Zod schema — shared
- Plik `src/lib/validations/booking.ts` importowany przez BookingForm (client) i API route (server)
- Zod 4.3 syntax: `z.string().min(1)`, `z.coerce.number().min(1)`, `z.boolean().refine(v => v === true)`

### 6. Rate limiting
- In-memory Map: `Map<string, number[]>` (IP → timestamps)
- Sliding window: 5 requests / 15 minutes
- Cleanup: usuwaj timestamps starsze niż 15 min przy każdym request
- Zwraca `{ success: boolean, remaining: number }`
- Header IP: `x-forwarded-for` || `x-real-ip` (Vercel)

### 7. SSG z generateStaticParams
- `generateStaticParams()` → `getAllTrips().map(t => ({ slug: t.slug }))`
- `generateMetadata()` → tytuł, opis, OG image z danych wyjazdu
- `notFound()` jeśli slug nie znaleziony w getTripBySlug

### 8. longDescription rendering
- Split `longDescription` by `\n\n` → map do `<p>` tagów
- Każdy `<p>` z `className="mb-4 last:mb-0"`
- Sugestia z review Fazy 2: docelowo tablica paragrafów, ale na teraz string jest OK

### 9. Placeholder handling (Yoga i Konie)
- Brak schedule → nie renderuj TripProgram
- Brak pricing → nie renderuj TripPricing
- Brak FAQ → nie renderuj TripFAQ
- Komunikat: "Szczegóły wkrótce" w sekcjach fallback

## Zależności (zainstalowane pakiety)

Wszystkie potrzebne pakiety **już zainstalowane** w Fazie 1:
- `react-hook-form` 7.71
- `@hookform/resolvers` 5.2
- `zod` 4.3
- `motion` 12.34
- `lucide-react` 0.575
- `clsx` 2.1 + `tailwind-merge` 3.5

**Nie trzeba instalować nic nowego.**

## Wzorce z Fazy 2 do kontynuacji

1. **Reduced-motion:** Early return z czystym HTML (bez `motion.*`). Dotyczy: Accordion, TripDescription (jeśli animated expand)
2. **Server Components domyślnie:** ScrollAnimation jako client boundary
3. **Staggered animations:** `delay={index * 0.15}` na listach
4. **Polskie cudzysłowy:** `\u201E`/`\u201D` w .ts, `&bdquo;`/`&rdquo;` w JSX
5. **Button variant:** primary (CTA), secondary (alternative), ghost (tertiary)
6. **Lucide icons:** strokeWidth={1.5}, h-5 w-5 (default), h-4 w-4 (small)
