# Review Faza 7 — Poprawki

## Do poprawy po review fazy 7

- [x] 🔴 [blocking] **StickyBookingCTA.tsx:51** — `aria-hidden` nie blokuje fokusa; dodano `inert` via ref
- [x] 🟠 [important] **Header.tsx:16 + MobileMenu.tsx:18** — `isActive()` zduplikowana; wyekstrahowano `isNavActive()` do `utils.ts`
- [x] 🟠 [important] **MobileMenu.tsx:140** — `onClick` na `<div>`; zastąpiono `Link` z `onClick={onClose}`
- [x] 🟠 [important] **StickyBookingCTA.tsx:12** — `querySelector("section")`; zmieniono na `getElementById("hero")` + dodano `id="hero"` do TripHero
- [x] 🟠 [important] **TripPricing.tsx:1** — `"use client"` usunięte; wyekstrahowano `PhoneLink.tsx`
- [x] 🟠 [important] **trip.ts:62-63** — `earlyBird` pola; dodano TODO komentarz
- [x] 🟠 [important] **StickyBookingCTA.tsx:48 + TripPricing.tsx:82** — template literals; zmieniono na `cn()`
- [x] 🟠 [important] **GoogleAnalytics.tsx → global.d.ts** — przeniesiono `declare global` do `src/types/global.d.ts`
- [x] 🟠 [important] **.env.example** — dodano `NEXT_PUBLIC_CLARITY_ID`
- [x] 🟡 [nit] **page.tsx:137-142** — soldOut ukrywa BookingForm/StickyBookingCTA (`spotsLeft !== 0`)
- [x] 🟡 [nit] **analytics.ts:41** — usunięto nieużywane `ctaClick()`
- [x] 🟡 [nit] **TripCard.tsx:71** — "Więcej" → "Szczegóły"
- [x] 🟡 [nit] **StickyBookingCTA.tsx** — dodano `useReducedMotion` dla `transition-transform`
- [ ] 🟡 [nit] **TripPricing.tsx:83** — progress bar kierunek (zajętość vs dostępność) — design decision, zostawione as-is
