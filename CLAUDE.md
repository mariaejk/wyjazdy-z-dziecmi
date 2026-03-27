# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl. Production-ready. Detailed lessons learned: `docs/lessons-learned.md`.

## Tech Stack

- **Next.js 16.1.6** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19.2** + **Turbopack**
- **Motion 12.34** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form 7.71 + Zod 4.3** — form validation (client + server)
- **Resend + @react-email/components** — transactional emails
- **google-auth-library** — Google Sheets API (NOT `googleapis` — 82MB, cold start)
- **@marsidev/react-turnstile** — Cloudflare Turnstile invisible antyspam
- **Lucide React 0.575** — line icons (strokeWidth 1.5)
- **clsx 2.1 + tailwind-merge 3.5** — className utility `cn()`
- **Vercel** — deployment
- Fonts: **Georgia** (headings, system font via `@theme`) + **Inter** (body) + **Lora** (logo) + **Caveat** (logo script). Inter/Lora/Caveat via `next/font/google`.

## Critical Constraints

- **Motion, not Framer Motion**: Always `import { motion } from 'motion/react'`.
- **Tailwind v4 syntax**: `@import "tailwindcss"` + `@theme {}`. No `@tailwind` directives.
- **All forms need spam protection**: honeypot (`website`, CSS hidden) + rate limiting + Cloudflare Turnstile on every API route.
- **All API routes use `validateRequest()`** from `src/lib/api-security.ts` — shared CSRF, Content-Length, rate limit, honeypot.
- **`lang="pl"`** on `<html>` element.
- **Form delivery**: Google Sheets + Resend emails + Turnstile. Config: `docs/setup-external-services.md`.
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
src/lib/                 — constants.ts, utils.ts, api-security.ts, rate-limit.ts, category-config.ts, sheets.ts, email.ts, turnstile.ts
src/lib/validations/     — booking.ts, contact.ts, newsletter.ts, waitlist.ts (Zod schemas)
src/emails/              — React Email templates
src/data/                — navigation.ts, trips.ts, team.ts, blog.ts (CMS readers)
src/types/               — trip.ts, team.ts, place.ts, cookies.ts, global.d.ts
content/                 — Keystatic CMS data (YAML + Markdoc)
```

## Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build (must pass with zero errors)
npm run lint       # ESLint
```

## Key Architecture Decisions

- **Keystatic CMS**: Collections: trips, team, blog, gallery, testimonials, projects. Singletons: homepage, places, faq, categoryBenefits. Admin at `/keystatic` (GitHub OAuth on Vercel, blocked in production without GitHub mode).
- **Blog reader**: Direct `fs.readdir` + `js-yaml` + `Markdoc` (NOT Keystatic reader — bug). Each post = `content/blog/{slug}/index.yaml` + `content.mdoc`.
- **`CATEGORY_CONFIG`** in `category-config.ts` — Single Source of Truth for category colors.
- **Auto-isPast** from `dateEnd` via `parseLocalDate()`. ISR `revalidate=3600` on all trip-dependent pages.
- **Form types**: Use `z.infer<typeof schema>` only. No separate type definitions.
- **`React.cache()`** on all CMS readers for request deduplication.
- **`isSafeSlug()`** in `src/data/blog.ts` — path traversal guard on URL params used in `path.join()`.
- **ICON_MAP pattern**: CMS stores icon name as string, code maps via `Record<string, LucideIcon>`.

## Content Sources

All copy from `docs/tresc_na_strone.md` and `docs/TODO POPRAWIC landing page 2.03.2026.docx`.

## Deployment & Handover

- **Hosting**: Vercel (Pro $20/month for commercial use). Hostinger = DNS only.
- **Repo**: `https://github.com/mariaejk/wyjazdy-z-dziecmi.git`. Developer (TatianaG-ka) = collaborator.
- **Docs**: `docs/instrukcja-przekazanie-projektu.md` (master checklist), `docs/setup-external-services.md`, `docs/instrukcja-cms.md`, `docs/instrukcja-developer.md`.
- **Post-handover**: `git pull` → code changes → `git push` → Vercel auto-deploys. Client edits content via `/keystatic`.
- **Hosting comparison**: `docs/decyzja-hosting-platforma.md` (Vercel/Coolify/CF Workers/Netlify/Railway).
