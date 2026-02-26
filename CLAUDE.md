# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — a brand organizing family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl.

**Status:** Pre-implementation. Plan v1.1 finalized, ready for Phase 1.

## Tech Stack

- **Next.js 15** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **Motion** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form + Zod** — form validation (client + server)
- **Lucide React** — line icons (strokeWidth 1.5)
- **Vercel** — deployment
- Fonts: **Playfair Display** (headings) + **Inter** (body), self-hosted via `next/font/local`

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
dev/plan.md        — Implementation plan v1.1 (5 phases, 78 tasks)
dev/task.md        — Task checklist with checkboxes
dev/kontekst.md    — Project context and session notes
docs/              — PRD, content, UI guidelines, source images
docs/Images/       — logo.jpeg + 5 photos (image_5.png is 1.3MB — needs optimization priority)
src/               — Next.js app (to be created in Phase 1)
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

## Content Sources

All copy comes from `docs/tresc_na_strone.md`. The first trip "Matka i Córka — Wspólny Rytm" has complete content (description, schedule, pricing, collaborator bio). Second trip "Yoga i Konie" is placeholder only.
