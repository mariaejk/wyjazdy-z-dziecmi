# Faza 3: Podstrona wyjazdu + formularz — Podsumowanie

> **Data ukończenia:** 2026-02-26
> **Branch:** `feature/faza3-podstrona-wyjazdu`
> **Zakres:** 29 zadań w 6 etapach (3A–3F)

---

## Co zostało dostarczone

### Nowe strony
- `/wyjazdy` — lista wyjazdów (upcoming + past w grayscale), fallback "brak wyjazdów"
- `/wyjazdy/[slug]` — podstrona wyjazdu z 10 sekcjami wg PRD 6.3, SSG via `generateStaticParams()`
- `/api/booking` — POST endpoint z walidacją Zod, honeypot, rate limiting

### Nowe komponenty (10 w `src/components/trips/`)
- `TripHero.tsx` — full-width image hero z overlay, date/location badges
- `TripTargetAudience.tsx` — "Dla kogo?" z Heart icons, staggered animation
- `TripDescription.tsx` — short + long description (split by `\n\n`)
- `TripProgram.tsx` — timeline per dzień z Clock icons
- `TripPracticalInfo.tsx` — Home/UtensilsCrossed/Car icons
- `TripPricing.tsx` — tabela cen z formatCurrency(), CTA scroll do formularza
- `TripCollaborator.tsx` — bio prowadzącego z opcjonalnym image
- `TripFAQ.tsx` — FAQ → Accordion mapping (client component)
- `TripGallery.tsx` — responsive grid, isMain większe, ukrywa się przy ≤1 zdjęciu
- `BookingForm.tsx` — RHF + zodResolver, 10 pól, stany idle/submitting/success/error

### Nowe komponenty UI (6 w `src/components/ui/`)
- `Accordion.tsx` — AnimatePresence, aria-expanded, reduced-motion instant toggle
- `Input.tsx` — forwardRef, label, error, RHF kompatybilny
- `Textarea.tsx` — forwardRef, resize-y
- `Select.tsx` — forwardRef, dropdown z placeholder
- `Checkbox.tsx` — forwardRef, ReactNode label (link RODO)
- `HoneypotField.tsx` — sr-only, tabIndex={-1}, aria-hidden

### Nowe lib
- `src/lib/validations/booking.ts` — Zod 4.3 schema (shared client+server)
- `src/lib/rate-limit.ts` — sliding window Map, 5 req/15min per IP

### Modyfikacje istniejących plików
- `src/components/home/HeroSection.tsx` — CTA `#wyjazdy` → `/wyjazdy`

---

## Kluczowe decyzje

1. **Zod 4 bez `.optional().default()`** — powoduje mismatch typów input/output z RHF resolver. Rozwiązanie: pola non-optional z defaultValues w useForm.
2. **Server Components domyślnie** — tylko Accordion, BookingForm, TripFAQ jako `"use client"`. ScrollAnimation jako client boundary.
3. **Placeholder handling** — warunki w `[slug]/page.tsx`: `hasSchedule`, `hasPricing`, `hasFAQ`, `hasCollaborator` (name !== "Wkrótce"). Yoga i Konie nie pokazuje pustych sekcji.
4. **Rate limit in-memory** — MVP, resetuje się przy deploy/hot-reload. OK na start.
5. **Honeypot fake 200** — bot dostaje `{ success: true }` bez faktycznego zapisu.
6. **TripGallery ukrywa się przy ≤1 zdjęciu** — nie ma sensu pokazywać galerii z jednym zdjęciem (to samo co hero).
7. **longDescription split by `\n\n`** — pragmatyczne rozwiązanie, tablica paragrafów jako future improvement.

---

## Utworzone/zmodyfikowane pliki

### Nowe pliki (22)
```
src/components/trips/
├── BookingForm.tsx
├── TripCollaborator.tsx
├── TripDescription.tsx
├── TripFAQ.tsx
├── TripGallery.tsx
├── TripHero.tsx
├── TripPracticalInfo.tsx
├── TripPricing.tsx
├── TripProgram.tsx
└── TripTargetAudience.tsx

src/components/ui/
├── Accordion.tsx
├── Checkbox.tsx
├── HoneypotField.tsx
├── Input.tsx
├── Select.tsx
└── Textarea.tsx

src/lib/
├── rate-limit.ts
└── validations/
    └── booking.ts

src/app/
├── api/booking/route.ts
└── wyjazdy/
    ├── page.tsx
    └── [slug]/page.tsx
```

### Zmodyfikowane pliki (1)
```
src/components/home/HeroSection.tsx  — CTA href update
```

---

## Wyciągnięte wnioski (Lessons Learned)

### 1. Zod 4 + RHF type mismatch
- **Problem:** `z.string().optional().default("")` generuje typ output `string`, ale input `string | undefined`. RHF resolver inferuje input, useForm oczekuje output → TypeScript error.
- **Rozwiązanie:** Użyj non-optional fields w schemacie, ustaw defaultValues w `useForm()`.
- **Reguła:** W Zod 4 z RHF, unikaj `.optional().default()` — stosuj proste typy + defaultValues.

### 2. Conditional section rendering
- **Wzorzec:** Booleanowe flagi (`hasSchedule`, `hasPricing`, etc.) w page.tsx, warunki `{hasX && <X />}`.
- **Lepsze niż:** Renderowanie pustych komponentów i ukrywanie CSS.

### 3. Accordion reduced-motion
- **Wzorzec:** Ternary w JSX — `prefersReducedMotion ? (isOpen && <div>...</div>) : (<AnimatePresence>...</AnimatePresence>)`.
- **Spójne z:** ScrollAnimation early return pattern z Fazy 2.

### 4. Form primitives pattern
- **Wzorzec:** `forwardRef` + `id = id ?? props.name` + `aria-invalid` + `aria-describedby` + `error` role="alert".
- **Reużywalność:** Te same Input/Textarea/Select/Checkbox użyte będą w ContactForm i NewsletterForm (Faza 4/5).

---

## Weryfikacja końcowa

| Test | Status |
|------|--------|
| `npm run build` — zero errors | ✅ |
| `npm run lint` — zero errors (3 warnings w `.claude/hooks/`) | ✅ |
| `/wyjazdy/matka-i-corka` — 10 sekcji w kolejności PRD | ✅ |
| `/wyjazdy/yoga-i-konie` — bez pustych sekcji | ✅ |
| SSG: oba slugi pre-renderowane | ✅ |
| API `/api/booking` — route zarejestrowana | ✅ |
| HeroSection CTA → `/wyjazdy` | ✅ |
