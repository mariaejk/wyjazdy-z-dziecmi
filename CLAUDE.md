# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — a brand organizing family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl.

**Status:** Phase 1 (Fundament) + Phase 2 (Homepage) + Phase 3 (Trip Subpages + Booking Form) COMPLETE. Ready for Phase 4.

## Tech Stack

- **Next.js 16.1.6** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19.2** + **Turbopack**
- **Motion 12.34** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form 7.71 + Zod 4.3** — form validation (client + server)
- **Lucide React 0.575** — line icons (strokeWidth 1.5)
- **clsx 2.1 + tailwind-merge 3.5** — className utility `cn()`
- **Vercel** — deployment
- Fonts: **Playfair Display** (headings) + **Inter** (body), self-hosted via `next/font/google` (auto self-hosting, RODO OK)

## Critical Constraints

- **Motion, not Framer Motion**: `framer-motion` breaks with React 19 (default in Next.js 15). Always use `motion` package with `import { motion } from 'motion/react'`.
- **Tailwind v4 syntax**: Use `@import "tailwindcss"` + `@theme {}` block. Old `@tailwind base/components/utilities` directives don't work.
- **All forms need spam protection**: honeypot field (`website`, CSS hidden) + rate limiting (5 req/15min per IP) on every API route.
- **Cookie banner must comply with RODO/ePrivacy 2026**: consent categories (necessary/analytics/marketing), 3 equal-weight buttons, changeable via footer link.
- **`lang="pl"`** on `<html>` element in root layout.tsx.
- **No automatic email confirmation** in MVP — don't promise it in microcopy.

## Design System: "Natural Minimalism"

```
Background:    #F9F7F2 (warm parchment)
Alt sections:  #F5F3EE
CTA/Accents:   #2D4635 (moss green)
Text:          #1A1A1A (dark graphite)
```

Mobile-first, generous whitespace, line icons. Past trips rendered with `grayscale(100%)`.

## Project Structure

```
dev/plan.md              — Implementation plan v1.1 (5 phases, 78 tasks)
dev/task.md              — Task checklist with checkboxes
dev/kontekst.md          — Project context and session notes
dev/completed/           — Archived completed phases
dev/active/              — Current active phase docs
docs/                    — PRD, content, UI guidelines, source images
src/app/                 — Next.js pages (layout, page, loading, error)
src/components/layout/   — SkipToContent, Container, Header, MobileMenu, Footer
src/components/ui/       — Button, SectionWrapper, SectionHeading, Badge, Card, Accordion, Input, Textarea, Select, Checkbox, HoneypotField
src/components/shared/   — ScrollAnimation (motion/react, cross-page)
src/components/home/     — HeroSection, TripCard, TripCardsSection, AboutTeaser, OpinionsTeaser
src/components/trips/    — TripHero, TripTargetAudience, TripDescription, TripProgram, TripPracticalInfo, TripPricing, TripCollaborator, TripFAQ, TripGallery, BookingForm
src/lib/                 — constants.ts, utils.ts, rate-limit.ts
src/lib/validations/     — booking.ts (Zod schema, shared client+server)
src/app/api/booking/     — POST route (Zod + honeypot + rate limit)
src/data/                — navigation.ts, trips.ts (hardcoded trip data + helpers)
src/types/               — trip.ts, team.ts, place.ts, forms.ts
public/images/           — 6 optimized images (hero, logo, etc.)
```

## Build & Dev Commands (after Phase 1 setup)

```bash
npm run dev        # Development server
npm run build      # Production build (must pass with zero errors)
npm run lint       # ESLint
```

## Key Architecture Decisions

- **Hardcoded content** — trips data lives in `src/data/trips.ts` (no CMS/Airtable in MVP)
- **Trip subpage template** follows PRD section 6.3 order: Hero → "Dla kogo?" → Description → Program → Practical Info → Pricing → Collaborator → FAQ → Gallery → Booking Form
- **API routes** at `api/booking/`, `api/contact/`, `api/newsletter/` — each with Zod validation + honeypot + rate limiting + commented webhook URL for future n8n integration
- **Booking form fields**: name, email, phone, trip (dropdown), adults count, children count + ages, notes, RODO consent (required), marketing consent (optional)
- **Logo**: use as raster JPG via `next/image` (SVG conversion is non-trivial, needs vector file from client)
- **Skip-to-content** link from Phase 1, not deferred to accessibility audit

## Phase 1 Lessons Learned

- **`next/font/google` = self-hosting**: Next.js auto-downloads fonts and serves from own domain. Zero Google requests at runtime. RODO compliant.
- **Focus trap needs manual implementation**: No built-in solution in motion — handle Tab/Shift+Tab cycling, Escape, body scroll lock manually.
- **`prefers-reduced-motion`**: Must be added to globals.css AND motion components. Standard pattern: early return with plain HTML (no motion elements). Fixed in Phase 2.
- **React 19 imports**: Use `import type { ReactNode } from "react"` — not `React.ReactNode`. Fixed in Phase 2.

## Phase 2 Lessons Learned

- **Reduced-motion pattern**: Always use early return with plain HTML (no motion.* elements) when `useReducedMotion()` is true. Consistent across ScrollAnimation and HeroSection.
- **Polish quotes in JS strings**: `„"` (U+201E/U+201D) cause parse errors. Use unicode escapes `\u201E`/`\u201D` in .ts files, HTML entities `&bdquo;`/`&rdquo;` in JSX.
- **Motion variants typing**: `Record<string, ...>` doesn't match motion props. Use `as const` assertion on variant objects.
- **Button discriminated union**: `ButtonAsLink | ButtonAsButton` with `never` for clean type separation. Link variant accepts `aria-label`, `target`, `rel`.
- **Server Components by default**: Section wrappers (TripCardsSection, AboutTeaser) are SC. Only components using motion hooks directly need `"use client"`. ScrollAnimation acts as client boundary.
- **Staggered animations**: `delay={index * 0.15}` on mapped elements gives natural cascade effect.
- **Card image sizes with calc**: `sizes="(max-width: 640px) calc(100vw - 2rem), ..."` for optimal next/image delivery.

## Phase 3 Lessons Learned

- **Zod 4 + RHF type mismatch**: `z.string().optional().default("")` creates input/output type divergence. RHF resolver infers input type, `useForm<T>` expects output → TS error. Fix: use non-optional fields + `defaultValues` in `useForm()`.
- **Conditional section rendering**: Boolean flags (`hasSchedule`, `hasPricing`, etc.) in page.tsx with `{hasX && <X />}`. Better than rendering empty components and hiding with CSS.
- **Accordion reduced-motion**: Ternary in JSX — `prefersReducedMotion ? (isOpen && <div>) : (<AnimatePresence>)`. Consistent with ScrollAnimation early return pattern.
- **Form primitives pattern**: `forwardRef` + `id = id ?? props.name` + `aria-invalid` + `aria-describedby` + error `role="alert"`. Reusable across all forms (booking, contact, newsletter).
- **Honeypot fake 200**: Return `{ success: true }` for bots (non-empty `website` field) — don't reveal detection.
- **Gallery hide on ≤1 image**: No point showing gallery with single image (same as hero).

## Content Sources

All copy comes from `docs/tresc_na_strone.md`. The first trip "Matka i Córka — Wspólny Rytm" has complete content (description, schedule, pricing, collaborator bio). Second trip "Yoga i Konie" is placeholder only.
