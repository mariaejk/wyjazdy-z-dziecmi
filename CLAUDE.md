# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl. Production-ready. Detailed lessons learned: `docs/lessons-learned.md`.

## Tech Stack

- **Next.js 16.2.1** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19.2** + **Turbopack**
- **Motion 12.34** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form 7.71 + Zod 4.3** — form validation (client + server)
- **Resend + @react-email/components** — transactional emails
- **Airtable REST API** — form data storage (raw fetch, Bearer token, NO SDK)
- **@marsidev/react-turnstile** — Cloudflare Turnstile invisible antyspam
- **Lucide React 0.575** — line icons (strokeWidth 1.5)
- **clsx 2.1 + tailwind-merge 3.5** — className utility `cn()`
- **@opennextjs/cloudflare 1.18.0** — CF Workers adapter (devDependency)
- **wrangler 4.77.0** — CF Workers CLI (devDependency)
- Fonts: **Georgia** (headings, system font via `@theme`) + **Inter** (body) + **Lora** (logo) + **Caveat** (logo script). Inter/Lora/Caveat via `next/font/google`.

## Deployment (migration in progress)

- **Current**: Vercel Hobby (łamie ToS dla komercji)
- **Target**: Cloudflare Workers ($5/mies.) — branch `feature/cloudflare-airtable-migration`
- **Status**: Fazy 0-3 ukończone (kod gotowy), Fazy 4-5 czekają na Airtable + CF dashboard setup
- **Repo**: `https://github.com/mariaejk/wyjazdy-z-dziecmi.git`. Developer (TatianaG-ka) = collaborator.
- **Docs**: `docs/instrukcja-przekazanie-projektu.md`, `docs/setup-external-services.md`, `docs/decyzja-hosting-platforma.md`

## Critical Constraints

- **Motion, not Framer Motion**: Always `import { motion } from 'motion/react'`.
- **Tailwind v4 syntax**: `@import "tailwindcss"` + `@theme {}`. No `@tailwind` directives.
- **All forms need spam protection**: honeypot (`website`, CSS hidden) + rate limiting + Cloudflare Turnstile on every API route.
- **All API routes use `validateRequest()`** from `src/lib/api-security.ts` — shared CSRF, Content-Length, rate limit (KV on CF Workers, in-memory fallback), honeypot.
- **`lang="pl"`** on `<html>` element.
- **Form delivery**: Airtable (data storage) + Resend emails + Turnstile. Config: `docs/setup-external-services.md`.
- **`cn()` always** over template literals (Tailwind merge).
- **Polskie znaki UTF-8** — literal characters in .ts and .tsx. `\u201E`/`\u201D` only for typographic quotes in .ts.
- **`parseLocalDate()`** — always instead of `new Date(dateStr)` for YYYY-MM-DD strings.

## Design System: "Fresh Forest"

```
Background:    #F7F5F0 (kremowa biel)     Alt sections:  #EBE8E0 (jasny len)
CTA Primary:   #2D6A4F (leśna zieleń)     Secondary:     #52796F (szałwia)
Text:          #1A1A1A (głęboka czerń)     Text light:    #4A5568 (szary)
Accents:       #DDB74A (mustard), #95D5B2 (miętowa zieleń)
```

- All buttons `bg-moss` (not terracotta). Rectangular shapes (`rounded-none`, Badge `rounded-sm`).
- Georgia system font (headings, `font-light italic`). SectionHeading: `italicText` + `overline` + `underline` (DecorativeUnderline SVG).
- Section color rhythm: alternate (bg-parchment-dark) → default (bg-parchment) → bg-moss/10. Adjacent sections must differ.
- Spacing: SectionWrapper default `py-8 sm:py-10`. Category pages `py-4/6 sm:py-6/8`.
- Mobile: touch targets 44px (`min-h-11 min-w-11`), `svh` not `vh`, `safe-area-inset-bottom` on fixed elements, inputs `text-base` minimum.

## Project Structure

```
src/app/                 — Next.js pages (layout, page, loading, error)
src/components/layout/   — Header, MobileMenu, Footer, Logo, CookieBanner
src/components/ui/       — Button, SectionWrapper, SectionHeading, Badge, Card, Accordion, Input, Textarea, Select, Checkbox, HoneypotField
src/components/shared/   — ScrollAnimation, StructuredData, NewsletterForm, JoinUsNewsletter, FooterNewsletter, BenefitCards, StarRating
src/components/home/     — HeroSection, HeroSlideshow, TripCard, TripCardsSection, AboutTeaser, OpinionsTeaser, BlogTeaser
src/components/trips/    — TripHero, TripDescription, TripProgram, TripPricing, BookingForm, StickyBookingCTA
src/components/about/    — PersonBio, PlaceCard
src/components/contact/  — ContactForm, ContactInfo
src/lib/                 — constants.ts, utils.ts, api-security.ts, rate-limit.ts, category-config.ts, airtable.ts, email.ts, turnstile.ts
src/lib/validations/     — booking.ts, contact.ts, newsletter.ts, waitlist.ts (Zod schemas)
src/emails/              — React Email templates
src/data/                — navigation.ts, trips.ts, team.ts, blog.ts (Keystatic CMS readers)
src/types/               — trip.ts, team.ts, place.ts, cookies.ts, global.d.ts
content/                 — Keystatic CMS data (YAML + Markdoc)
open-next.config.ts      — OpenNext CF Workers adapter config
wrangler.jsonc           — CF Workers deployment config
```

## Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build (Next.js, must pass with zero errors)
npm run build:cf   # Cloudflare Workers build (via @opennextjs/cloudflare)
npm run preview    # Local CF Workers preview (wrangler dev)
npm run deploy     # Build + deploy to CF Workers
npm run lint       # ESLint
```

## Key Architecture Decisions

- **Keystatic CMS**: Collections: trips, team, blog, gallery, testimonials, projects. Singletons: homepage, places, faq, categoryBenefits. Admin at `/keystatic` (GitHub OAuth in production).
- **Blog reader**: Keystatic reader API (`reader.collections.blog.list/read`). `resolveLinkedFiles: true` returns `{ node: Node }` — Markdoc AST transformed via `Markdoc.transform()`. `React.cache()` wrappery. `BlogPostWithContent` exported type.
- **Airtable** (form data): Raw `fetch()` to REST API with Bearer token. 4 tables: Rezerwacje, Kontakty, Newsletter, ListaOczekujacych. `sanitizeFields()` for CSV injection prevention. NO SDK (0KB overhead).
- **Rate limiting**: Async, KV-based on CF Workers + in-memory fallback (Vercel/dev). `KVBinding` exported from `rate-limit.ts`. Graceful degradation (KV error → fallback).
- **CF Workers adapter**: `@opennextjs/cloudflare` with `cloudflare-node` wrapper, `edge` converter, `dummy` incremental cache (ISR disabled). `getCloudflareContext({ async: true })` for KV bindings.
- **Dual deployment**: Code works on both Vercel and CF Workers. `ALLOWED_ORIGINS` includes `CF_PAGES_URL` and `VERCEL_PROJECT_PRODUCTION_URL`.
- **`CATEGORY_CONFIG`** in `category-config.ts` — Single Source of Truth for category colors.
- **Auto-isPast** from `dateEnd` via `parseLocalDate()`. `revalidate=3600` on trip pages (SSG on CF Workers with dummy cache).
- **Form types**: Use `z.infer<typeof schema>` only. No separate type definitions.
- **`React.cache()`** on all CMS readers for request deduplication.
- **`isSafeSlug()`** + **`warnInvalidSlug()`** in blog reader — path traversal guard + CMS slug validation.

## Content Sources

All copy from `docs/tresc_na_strone.md` and `docs/TODO POPRAWIC landing page 2.03.2026.docx`.
