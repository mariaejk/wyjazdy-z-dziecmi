# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — a brand organizing family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl.

**Status:** Phase 1-7 + Poprawki klientki + Redesign wizualny 13.03 + Poprawki konwersji 19.03 + Kategorie/kalendarz/las 20.03 + Poprawki UX 20.03 + Poprawki nazewnictwo/SEO/FAQ 20.03 + Poprawki UI 21.03 + Trip Video 21.03 + Poprawki UI+Nav 21.03 + Logo kompas SVG 22.03 + Blog na homepage 22.03 + Inne projekty 22.03 + Poprawki O mnie 22.03 + Poprawki layout/slideshow 22.03 + Poprawki nazwy/CTA/bio 22.03 + Redesign Leśna Zieleń 22.03 + Keystatic Audit 23.03 + Code Review Audit 24.03 + Poprawki UI 24-25.03 + JoinUsNewsletter empty state 25.03 + Poprawki spacing + O nas CTA 25.03 + JoinUsNewsletter bg-moss/10 na category pages 25.03 + Poprawki kolorystyki sekcji + Footer spacing 25.03 + Keystatic CMS Migration 25.03 + Mobile Audit 25.03 COMPLETE. Site is a production-ready sales funnel with CTA buttons, scarcity signals, GA4 event tracking, Microsoft Clarity, loading states, sticky mobile CTA, two-month trip calendar with interactive category filters + auto-navigation on homepage + /wyjazdy (no "Zakończone" in legend), auto-isPast from dateEnd + ISR, waitlist, blog, gallery, category filtering with colored badges, ForestPattern SVG decorations, Forest Green + Sage color scheme (rectangular shapes, no rounded corners), SEO H1 descriptive + H2 emotional (smaller text-xl/2xl/3xl), FAQ accordion (7 questions) with FAQPage schema.org + id="faq" anchor, childCare w CMS, FAQ/social analytics tracking, testimonials sorted newest-first, "warsztaty" naming consistency, StarRating above opinions, compact hero section with editorial decorative lines (not dots), optional trip video (TripVideo component, flex-col-reverse mobile), chronological trip sorting, 4 top-level nav items (Warsztaty dropdown, Poznajmy się dropdown, Blog, Kontakt), CategoryCards (4 image tiles under hero), FAQ link on trip pages, SVG compass logo (Lora + Caveat fonts) with mobile sygnet-only mode, compass favicon, /inne-projekty page (Joga z Marią + Enviar), rectangular photos (rounded-none, PersonBio, AboutTeaser) with border-graphite/10, no rotate on hero slideshow, CategoryCards H2 "Najczęściej wybierane warsztaty", "Single z dziećmi" (not "Samodzielny rodzic"), AboutTeaser 2-column layout, PersonBio hideNameHeading prop, mobile CTA "Sprawdź terminy" in header, PersonBio renderBoldText (**text** → strong), category labels: "Single z dziećmi", "Matka i córka", "Czas bez dzieci", "Rodzinny czas" (not "Warsztaty z dziećmi"), hero benefit cards neutral (bg-parchment-dark/50, text-graphite-light icons), DecorativeUnderline SVG on SectionHeading italicText, footer without tagline, "O nas" (not "O mnie"), CTA hero "Zobacz warsztaty" (not "wyjazdy"), hero H2 "„Świadomy kierunek — warsztaty rozwojowe dla dorosłych i dzieci", nav active page underline (border-b-2 border-moss), "Czas bez dzieci" (not "Dla dorosłych"), JoinUsNewsletter accepts className prop for bg override — default bg-parchment-dark (homepage), bg-moss/10 on single-z-dziecmi + dla-doroslych (visually distinct from preceding variant=alternate section AND footer bg-parchment), FooterNewsletter light block with newsletter consent, consentNewsletter in Zod schema, all buttons bg-moss (not terracotta), /warsztaty-z-dziecmi (renamed from /wyjazd-z-dziecmi with 301 redirect), /single-z-dziecmi (renamed from /single-parents with 301 redirect), /inne-projekty (renamed from /moje-projekty with 301 redirect), TripCardHorizontal on /wyjazdy + all 4 category pages (vertical TripCard only on homepage), Georgia system font via @theme (not next/font), AboutTeaser image maria-sloneczniki.jpg, CategoryCards image matka-corka-category.jpg, minimal section spacing globally (SectionWrapper default py-8 sm:py-10, category pages py-4/6 sm:py-6/8), benefit cards equal height (h-full flex-col flex-1).

## Tech Stack

- **Next.js 16.1.6** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19.2** + **Turbopack**
- **Motion 12.34** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form 7.71 + Zod 4.3** — form validation (client + server)
- **Resend + @react-email/components** — transactional emails (notification + confirmation)
- **google-auth-library** — Google Sheets API (lead storage, lightweight ~5MB, NOT googleapis)
- **@marsidev/react-turnstile** — Cloudflare Turnstile invisible antyspam
- **Lucide React 0.575** — line icons (strokeWidth 1.5)
- **clsx 2.1 + tailwind-merge 3.5** — className utility `cn()`
- **Vercel** — deployment
- Fonts: **Georgia** (headings, system font — no download) + **Inter** (body) + **Lora** (logo main text) + **Caveat** (logo script text). Inter/Lora/Caveat self-hosted via `next/font/google`. Georgia set directly in `@theme` as `--font-heading`.

## Critical Constraints

- **Motion, not Framer Motion**: `framer-motion` breaks with React 19 (default in Next.js 15). Always use `motion` package with `import { motion } from 'motion/react'`.
- **Tailwind v4 syntax**: Use `@import "tailwindcss"` + `@theme {}` block. Old `@tailwind base/components/utilities` directives don't work.
- **All forms need spam protection**: honeypot field (`website`, CSS hidden) + rate limiting (5 req/15min per IP) + Cloudflare Turnstile (invisible) on every API route.
- **Cookie banner must comply with RODO/ePrivacy 2026**: consent categories (necessary/analytics/marketing), 3 equal-weight buttons, changeable via footer link.
- **`lang="pl"`** on `<html>` element in root layout.tsx.
- **Form data delivery**: Google Sheets (lead storage) + Resend emails (notification to owner + confirmation to client). Config: `docs/setup-external-services.md`.

## Design System: "Fresh Forest" (Leśna Zieleń + Szałwia)

```
Background:    #F7F5F0 (kremowa biel)
Alt sections:  #EBE8E0 (jasny len)
CTA Primary:   #2D6A4F (leśna zieleń) — hover: #1B4332
Secondary:     #52796F (szałwia/teal) — hover: #6B9080
Text:          #1A1A1A (głęboka czerń)
Text light:    #4A5568 (neutralny szary)
Accents:       #DDB74A (mustard), #95D5B2 (miętowa zieleń)
```

Mobile-first, generous whitespace, line icons, rectangular shapes (rounded-none everywhere, Badge rounded-sm). Editorial decorative lines in hero. Past trips rendered in full color (no grayscale).

## Project Structure

```
dev/plan.md              — Implementation plan v1.1 (5 phases, 78 tasks)
dev/task.md              — Task checklist with checkboxes
dev/kontekst.md          — Project context and session notes
dev/completed/           — Archived completed phases
dev/active/              — Current active phase docs
docs/                    — PRD, content, UI guidelines, source images
src/app/                 — Next.js pages (layout, page, loading, error), includes /inne-projekty
src/components/layout/   — SkipToContent, Container, Header, MobileMenu, Footer, Logo
src/components/ui/       — Button, SectionWrapper, SectionHeading, Badge, Card, Accordion, Input, Textarea, Select, Checkbox, HoneypotField
src/components/shared/   — ScrollAnimation, StructuredData, NewsletterForm, GoogleAnalytics, ClarityScript
src/components/home/     — HeroSection, HeroSlideshow, TripCard, TripCardsSection, AboutTeaser, OpinionsTeaser, BlogTeaser
src/components/trips/    — TripHero, TripTargetAudience, TripDescription, TripProgram, TripPracticalInfo, TripPricing, TripCollaborator, TripFAQ, TripGallery, BookingForm, StickyBookingCTA, PhoneLink
src/components/about/    — PersonBio, PlaceCard
src/components/contact/  — ContactForm, ContactInfo
src/lib/                 — constants.ts, utils.ts, rate-limit.ts, logger.ts, structured-data.ts, analytics.ts, sheets.ts, email.ts, turnstile.ts
src/lib/validations/     — booking.ts, contact.ts, newsletter.ts, waitlist.ts (Zod schemas, shared client+server)
src/emails/              — React Email templates (BookingNotification/Confirmation, ContactNotification/Confirmation, WaitlistNotification/Confirmation, NewsletterConfirmation, styles.ts)
src/hooks/               — useCookieConsent.ts
src/app/api/booking/     — POST route (Zod + honeypot + rate limit)
src/app/api/contact/     — POST route (Zod + honeypot + rate limit)
src/app/api/newsletter/  — POST route (Zod + honeypot + rate limit)
src/data/                — navigation.ts, trips.ts, team.ts, places.ts (hardcoded data + helpers)
src/types/               — trip.ts, team.ts, place.ts, forms.ts, cookies.ts, global.d.ts
src/components/layout/   — + CookieBanner, CookieSettingsButton
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
- **Logo**: SVG compass component (`src/components/layout/Logo.tsx`) with Lora + Caveat fonts. Mobile: compass sygnet only. Desktop: compass + "Warsztaty z dziećmi" text. Color: `#48351b` (gorzka czekolada).
- **Skip-to-content** link from Phase 1, not deferred to accessibility audit

## Phase 1 Lessons Learned

- **`next/font/google` = self-hosting**: Next.js auto-downloads fonts and serves from own domain. Zero Google requests at runtime. RODO compliant.
- **Focus trap needs manual implementation**: No built-in solution in motion — handle Tab/Shift+Tab cycling, Escape, body scroll lock manually.
- **`prefers-reduced-motion`**: Must be added to globals.css AND motion components. Standard pattern: early return with plain HTML (no motion elements). Fixed in Phase 2.
- **React 19 imports**: Use `import type { ReactNode } from "react"` — not `React.ReactNode`. Fixed in Phase 2.

## Phase 2 Lessons Learned

- **Reduced-motion pattern**: Always use early return with plain HTML (no motion.* elements) when `useReducedMotion()` is true. Consistent across ScrollAnimation and HeroSection.
- **Polskie znaki — UTF-8 everywhere**: Używaj prawdziwych polskich znaków (ą, ć, ę, ł, ń, ó, ś, ż, ź) we WSZYSTKICH plikach (.ts i .tsx). Unicode escapes `\uXXXX` NIE działają w kontekście JSX (wyświetlają się dosłownie). Polskie cudzysłowy typograficzne `„"` — używaj prawdziwych znaków UTF-8 w `.ts` i `.tsx`.
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

## Phase 4 Lessons Learned

- **Data access via helpers, not array indices**: `getTeamMember("Maria Kordalewska")` instead of `teamMembers[0]`. Indices are brittle — reordering breaks silently.
- **`<h1>` on every subpage**: `SectionHeading` always renders `<h2>`. Subpages need manual `<h1>` inline. Future: add `as` prop to `SectionHeading`.
- **Extract values from URL constants**: `extractHandle(SOCIAL_LINKS.facebook, "facebook.com/")` instead of hardcoded `"wyjazdyzdziecmi"`. Resilient to URL changes.
- **`aria-label` on `target="_blank"` links**: Screen readers don't announce new tab. Add `aria-label="X (otwiera się w nowej karcie)"`.
- **`robots: { index: false }` on placeholder pages**: Pages without content shouldn't be indexed. Remove after adding full content.
- **`cn()` over template literals**: Project consistently uses `cn()` from clsx + tailwind-merge. Template literals bypass merge and can cause class conflicts.
- **Contact form pattern**: Identical to BookingForm but simpler (3 fields vs 8). Same 4-state machine (idle/submitting/success/error), same Zod + RHF + honeypot pattern.

## Phase 5 Lessons Learned

- **`useSyncExternalStore` for localStorage**: React 19 lint rules flag `setState` inside effects. Use `useSyncExternalStore` with custom events for same-tab reactivity when reading from localStorage.
- **Cookie banner visibility**: Derive from consent state + footer trigger flag. Don't sync `showBanner` to `isVisible` in useEffect — compute `isVisible = showBanner || openedFromFooter`.
- **CSP needs `'unsafe-inline'` + `'unsafe-eval'`**: Next.js uses inline scripts. Without these, pages break.
- **StructuredData in `<head>`**: Place `<StructuredData>` inside `<head>` in layout.tsx for Organization schema. Page-level schemas go in page components.
- **SectionHeading `as` prop**: `as?: "h1" | "h2" | "h3"` with default `"h2"`. Now subpages can use `<SectionHeading as="h1">` instead of inline `<h1>`.
- **Logger pattern**: `log(label, data)` with `NODE_ENV !== "production"` guard. Applied to all API routes.
- **Newsletter form compact layout**: Email + button in one row, RODO checkbox below. Inline validation, same 4-state machine as ContactForm.
- **Sentinel value for SSR hydration**: `getServerSnapshot()` must return a distinct value (e.g. `"__ssr__"`) — not `null` (same as "no data in localStorage"). Otherwise `isLoaded` can't distinguish SSR from client.
- **Schema.org EventStatus**: `isPast` ≠ cancelled. Past events = `EventScheduled`. `EventCancelled` only for truly cancelled events.
- **Focus management in `role="dialog"`**: When toggling panel content, move focus to first focusable element via `useEffect` + `querySelector`.
- **Placeholder pages out of sitemap**: Pages with `robots: { index: false }` must NOT appear in sitemap.xml — contradictory signals to crawlers.

## Phase 6 Lessons Learned

- **Unicode escapes consistently**: Mixing literal Polish chars with unicode escapes in the same `.ts` file is easy to miss. Always use escapes in `.ts`, check in review.
- **Single Source of Truth for bios**: Don't duplicate person bio in `team.ts` and `trips.ts`. Import via `getTeamMember()` helper to keep one source.
- **Neutral section titles**: "Prowadząca" assumes gender/role. Use configurable `sectionTitle` prop with neutral default like "Współpraca".
- **SectionWrapper variant consistency**: When heading and content are in separate `SectionWrapper`s, they must share the same `variant` — otherwise visual "jump" in background color.
- **Semantic HTML for testimonials**: `<blockquote>` + `<footer>` + `<cite>` is the correct pattern for quotes/testimonials.
- **Lead magnet > newsletter**: "Pobierz poradnik" converts better than "Zapisz się na newsletter" — offer value exchange.
- **`TestimonialCard` pattern**: Follows `PlaceCard` structure — `ScrollAnimation` wrapper, staggered delay via `index` prop, semantic HTML inside.
- **`getFeaturedTestimonials(ids)` with type guard**: Filter by ID array + `.filter(Boolean)` for safe featured selection.

## Phase 7 Lessons Learned

- **`inert` for hidden interactive elements**: `aria-hidden` doesn't block keyboard focus. Use `el.setAttribute("inert", "")` via ref to fully remove hidden content from tab order. WCAG 2.1.1 requirement.
- **`getElementById` over `querySelector`**: `querySelector("section")` is fragile — breaks if DOM order changes. Always use stable IDs (`id="hero"`) for IntersectionObserver targets.
- **Extract client boundaries narrowly**: Don't add `"use client"` to a whole component for one `onClick`. Extract the interactive part (e.g. `PhoneLink.tsx`) as a separate Client Component. Keeps parent as Server Component.
- **`isNavActive()` in utils.ts**: Navigation active state logic shared between Header and MobileMenu. Exact match for `/`, `startsWith` for subpages. Single source of truth.
- **`cn()` always over template literals**: Project convention. Template literals bypass tailwind-merge and can cause class conflicts. Even for conditional classes like `isVisible ? "translate-y-0" : "translate-y-full"`.
- **Button `loading` prop pattern**: `loading` replaces `icon` slot with `Loader2` spinner. `isDisabled = disabled || loading`. Only on `ButtonAsButton` — links don't have loading state.
- **`spotsLeft !== 0` not `!spotsLeft`**: `undefined !== 0` is `true`, so trips without scarcity data still show BookingForm. `!spotsLeft` would hide form when `spotsLeft` is `undefined` (falsy). Use strict comparison.
- **`declare global` in dedicated file**: Put `window.gtag` types in `src/types/global.d.ts`, not scattered in component files. Avoids implicit dependencies.
- **Scarcity badge thresholds**: `spotsLeft <= 3` = amber "Ostatnie miejsca!", `spotsLeft === 0` = red "Komplet", `> 3` = no badge. Simple, effective urgency signals.
- **StickyBookingCTA z-index layering**: `z-30` below header (`z-40`) and cookie banner (`z-50`). Use `transition-transform` with `useReducedMotion` guard.

## Poprawki Klientki 03.03.2026 Lessons Learned

- **`contentBlocks` pattern**: `{ type: "text" | "image", text?, src?, alt? }[]` in trip data. Replaces Gallery component — images interleaved with text blocks for richer layout.
- **Trip categories with URL filter**: `?kategoria=matka-corka` + `useSearchParams()` — simpler than separate pages per category.
- **React "adjust state during render"**: `if (pathname !== prevPathname) { setPrevPathname(pathname); reset(); }` — replaces `useEffect` anti-pattern, eliminates extra commit+paint cycle.
- **`role="region"` + `aria-label`**: Interactive components like calendars need both attributes for screen reader identification.
- **spotsTotal/spotsLeft pairs**: Always provide both — even if conditional rendering doesn't require both, data should be complete and consistent.
- **WaitlistForm when spotsLeft === 0**: Show waitlist form instead of hiding sold-out trips. Better UX and lead capture.

## Redesign 13.03.2026 Lessons Learned

- **CTA hierarchy**: Primary (terracotta) for main actions, Secondary (moss/olive) for lower-priority. Don't use same color for both.
- **HeroSlideshow component**: Separate `"use client"` component with `AnimatePresence mode="wait"`, `priority` only on first image. Auto-advance with `setInterval` + cleanup in `useEffect`.
- **Nav breakpoint with dropdown**: "O nas" has hover dropdown (Galeria, Opinie, Kontakt, Blog) on desktop, accordion on mobile. Reduces top-level items from 10 to 7. Hamburger shows on screens < lg.
- **Redirect vs placeholder**: When a menu item needs its own page, replace 301 redirect with a placeholder page (`robots: { index: false }`). Redirects cause duplicate links in navigation.
- **Trip cards 3-column grid**: `sm:grid-cols-2 lg:grid-cols-3` for upcoming trips. Removed `max-w-2xl` constraint.
- **USP before hero**: "Jedyne w Polsce..." text moved above HeroSection slideshow, directly under header.
- **Hero H1**: Changed from "Wyjazdy z Dziećmi" to "Warsztaty wyjazdowe dla dorosłych i dzieci". Logo text shortened to "Warsztaty wyjazdowe".
- **Grayscale removal**: Remove `grayscale` prop from Card type AND usage in TripCard in same commit to avoid build errors.

## Poprawki Konwersji 19.03.2026 Lessons Learned

- **React 19 Strict Mode + setState updater**: NEVER call side effects (analytics, API calls) inside `setState(prev => ...)` — updater function may fire 2x in Strict Mode. Pattern: `const newVal = ...; setState(newVal); sideEffect(newVal);`
- **Parallel worktrees need merge planning**: When implementing phases in parallel worktrees, ensure phases don't modify the same files. Files touched by >1 phase (HeroSection, Header, BookingForm) required manual merging.
- **SEO title triple update**: When changing meta title, always update ALL 3: `title.default`, `openGraph.title`, `twitter.title`. Easy to forget OG/Twitter.
- **SocialLink pattern**: Pass `platform="Facebook"` (display name with capital), normalize to lowercase inside `analytics.socialClick()`. Keeps aria-label correct and GA4 events consistent.
- **Reassurance text above CTA**: "Nie płacisz z góry" with Shield icon reduces friction. Pattern: `<p className="flex items-center gap-2 text-sm text-graphite-light">` + icon `text-moss`.
- **childCare field**: Optional `childCare?: string` in Trip type + Keystatic CMS (text, multiline) + `|| undefined` in mapper. Renders in TripPracticalInfo only when filled. Baby icon from lucide-react.
- **Hero H1 updated**: Changed from "Warsztaty wyjazdowe dla dorosłych i dzieci" to "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo." — empathetic, benefit-oriented.
- **CTA copy hierarchy**: "Zobacz wyjazdy" (Hero, passive) → "Sprawdź terminy" (Header/Menu, exploratory) → "Zarezerwuj miejsce" (Form/Sticky, action). Escalating commitment level.

## Kategorie/Kalendarz/Las 20.03.2026 Lessons Learned

- **`CATEGORY_CONFIG` as Single Source of Truth**: All category colors (calendar, legend, card badges) come from `src/lib/category-config.ts`. Never hardcode category colors in components — import from config.
- **Calendar color contrast**: Use colors from different parts of the color wheel: green (moss) → gold (mustard) → purple (lavender) → orange (terracotta). Amber/coral/terracotta were too similar before.
- **`formatDateRange(start, end)`**: Same month → `"15–18 kwietnia 2026"`, different months → `"28 marca – 1 kwietnia 2026"`. Polish genitive month names hardcoded (Intl.DateTimeFormat doesn't output genitive reliably).
- **Category pages need trips section**: All category landing pages (`/wyjazd-z-dziecmi`, `/matka-z-corka`, `/dla-doroslych`, `/single-parents`) should show upcoming trips from their category. Pattern: `async` page + `getUpcomingTripsByCategory(cat)` + conditional render `{trips.length > 0 && ...}`.
- **Optimize data fetching on listing pages**: `/wyjazdy` uses one `getAllTrips()` call and derives `upcomingTrips`, `pastTrips`, and `calendarTrips` from it — instead of separate `getUpcomingTrips()` + `getPastTrips()`.
- **ForestPattern SVG**: Inline SVG with `aria-hidden="true"`, `pointer-events-none`. Start at 6-7% opacity. Two variants: `fairytale` (rounded circles) for homepage, `realistic` (triangle pines) for /wyjazdy.
- **SectionWrapper variant alternation**: When inserting a new section (e.g., trips between content and CTA), adjust `variant` props to maintain visual rhythm (default/alternate/default).
- **Tinted badges vs full-color calendar**: Card category badges use light tinted background (`bg-moss/15 text-moss`) to not compete with CTA buttons. Calendar cells use full saturated colors.
- **TripsFilter category validation**: Use `Object.keys(CATEGORY_CONFIG)` + `.includes()` instead of hardcoded category list. Automatically supports new categories.

## Poprawki UX 20.03.2026 Lessons Learned

- **Auto-isPast from dateEnd**: `isPast` is computed via `parseLocalDate(entry.dateEnd) < new Date()` in `mapTrip()`. CMS checkbox `isPast` is ignored (label updated to inform editors). Requires ISR (`revalidate = 3600`) on all pages that filter by `isPast`.
- **`parseLocalDate(dateStr)`**: Parses `YYYY-MM-DD` as local midnight via `new Date(year, month - 1, day)`. Avoids UTC offset bug where `new Date("2026-08-23")` = UTC midnight = previous day evening in CET/CEST. Use everywhere instead of `new Date(dateStr)` for date-only strings.
- **ISR on trip-dependent pages**: `export const revalidate = 3600` on homepage, /wyjazdy, and all 4 category pages. Without ISR, auto-isPast only updates on rebuild.
- **Two-month calendar**: `MonthGrid` sub-component renders one month; `TripCalendar` renders two side-by-side (`sm:grid-cols-2`). Single column on mobile. Container widened from `max-w-md` to `max-w-3xl`.
- **Interactive legend filters**: Legend items are `<button>` with `aria-pressed`. Click toggles filter — non-matching trips get `bg-graphite/5` (dimmed). Click again to clear. Past category is not filterable (static `<div>`).
- **Testimonials date field**: Optional `date?: string` (YYYY-MM-DD) in CMS + type. `getTestimonials()` sorts newest first. `getFeaturedTestimonials(ids)` preserves editorial order from `ids` array — intentionally not date-sorted.

## Poprawki nazewnictwo/SEO/FAQ 20.03.2026 Lessons Learned

- **"warsztaty" not "wyjazdy" in UI copy**: All user-facing section titles, subtitles, buttons, and meta titles use "warsztaty" consistently. "wyjazdy" only in internal code (variable names, routes, slugs).
- **SEO H1/H2 inversion**: H1 = descriptive keyword-rich overline ("Rodzinne wyjazdy warsztatowe w naturze"), H2 = emotional headline. Both motion and reduced-motion variants must stay in sync. Documented with comment in HeroSection.
- **FAQ on homepage**: `HomeFAQ` client component with `faqData` exported for schema.org reuse. `Accordion` is analytics-agnostic — tracking injected via `onToggle`. FAQ data uses `question`/`answer` fields, mapped to `id`/`title`/`content` for Accordion.
- **FAQPage schema.org**: `getFAQSchema(faqData)` + `<StructuredData>` in `page.tsx`. Uses same `faqData` export — single source of truth for FAQ content.
- **Calendar filter auto-navigation**: `toggleFilter()` finds first upcoming trip in category via `trips.find()` and sets `currentYear`/`currentMonth` to that trip's month. Without this, filter dims trips but user sees empty calendar if trips are in different months.
- **Card h-full + flex-col + mt-auto**: `Card` component uses `h-full flex-col`, content div uses `flex-1 flex-col`. TripCard buttons use `mt-auto pt-4` to pin to bottom. All `ScrollAnimation` wrappers in grids need `className="h-full"`.
- **Empty state pattern**: `TripCardsSection` returns `null` when no upcoming trips (same as `PastTripsSection`). Prevents rendering empty section with just title and button.
- **Polish typographic quotes in JS strings**: `„"` (U+201E, U+201D) inside double-quoted JS strings cause parse errors. Use `\u201E` and `\u201D` escapes for these specific characters only. All other Polish characters use literal UTF-8.
- **`toDate()` private helper in utils.ts**: Converts `string | Date` to `Date` using `parseLocalDate` for strings. Used internally by `formatDate`, `formatDateShort`, `formatDateRange` — ensures consistent timezone handling.

## Content Sources

## Poprawki UI + Trip Video 21.03.2026 Lessons Learned

- **`<video>` as Server Component**: Native HTML5 `<video>` with `controls` doesn't need `"use client"` — zero JS added to bundle. Only add client boundary if you need analytics events (play/pause tracking).
- **`preload="metadata"` over poster**: Browser extracts first frame automatically. Avoids the problem of CMS image paths not being valid public URLs for `poster` attribute.
- **`playsInline` required for iOS**: Without it, iOS Safari forces fullscreen on play. Always add for inline video playback.
- **Video in `public/videos/`**: Vercel serves static files from `public/` via CDN. 8.6MB is fine. For multiple videos in the future, consider Vercel Blob or Cloudflare R2.
- **`aria-label` on `<video>`**: Screen readers can't identify video content without it. Always add descriptive `aria-label`.
- **Optional CMS field pattern**: `videoUrl: fields.text({ label: "..." })` in Keystatic + `entry.videoUrl || undefined` in mapper + `videoUrl?: string` in type. Same pattern as `earlyBirdDeadline`, `childCare`.
- **`SectionWrapper` with reduced padding**: default is now `py-8 sm:py-10`. Category pages use explicit `py-4 sm:py-6` (headers) or `py-6 sm:py-8` (content sections). Old default was `py-16 sm:py-20 lg:py-24`.
- **`getAllTrips()` sort**: Sorting in the data layer (`getAllTrips`) means all consumers automatically get chronological order — homepage, /wyjazdy, category pages. Single source of truth for sort order.
- **Testimonial equal heights**: `blockquote` needs `h-full flex flex-col` + `flex-1` on quote text + `ScrollAnimation className="h-full"` for grid alignment.
- **Navigation order matters**: Moving "O nas" to last position in `mainNavigation` array changes both desktop nav and mobile menu simultaneously — single source of truth.

## Poprawki UI + Nawigacja 21.03.2026 Lessons Learned

- **Multiple dropdowns — central state**: `openDropdown: string | null` in Header, not in each DropdownNavItem. Allows closing other dropdowns when opening a new one. Key pattern: `onClose={() => setOpenDropdown(prev => prev === item.label ? null : prev)}` to avoid race conditions with hover timeouts.
- **Non-clickable nav items = button, not Link**: `<Link href="">` navigates to `/`. Use `<button>` for dropdown headers that only open menus. Correct HTML semantics.
- **`isNavActive("")` guard**: `"".startsWith("")` is always `true`. Add `if (!href) return false` as first line in `isNavActive()` for non-clickable dropdown headers with empty href.
- **Click-outside detection for dropdowns**: `useEffect` with `document.addEventListener("click")` + `navRef.contains()`. Only attach when dropdown is open. Cleanup in return.
- **StarRating as shared component**: When identical JSX appears in 2+ places, extract immediately. `src/components/shared/StarRating.tsx` with `role="img"` + `aria-label` for screen readers.
- **`role="img"` on decorative star ratings**: Without `role`, screen readers may ignore `aria-label` on a `<div>`. Always pair `role="img"` with `aria-label` for icon-based ratings.
- **Hash navigation cross-page**: `/#faq` requires `id="faq"` on the target `SectionWrapper`. Easy to forget — always verify the anchor exists on the destination page.
- **Conditional CTA on past trips**: Don't show action buttons (FAQ link, booking) on `isPast` trips — they're irrelevant and confusing.
- **Navigation structure**: 4 top-level items: Warsztaty (dropdown), Poznajmy się (dropdown), Blog, Kontakt. Desktop: hover dropdowns. Mobile: accordion sections with independent expand/collapse.
- **CategoryCards**: Server Component, 4 clickable image cards (Rodzinny czas, Dla Matki i Córki, Dla Singli z Dziećmi, Dla Dorosłych). Grid: sm:2col, lg:4col. Placed under hero, before calendar.
- **Hero H2**: "Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie." — replaces previous H2 and USP (same text, no duplication).
- **Footer simplified**: Brand section (name + tagline) removed. Grid 4→3 columns (Contact, Social, Legal).

## Logo SVG + Favicon 22.03.2026 Lessons Learned

- **CSS Art → SVG component**: Don't embed CSS-drawn icons (absolute positioning, border hacks) into React. Convert to `<svg>` for clean scaling, Tailwind color control via `currentColor`, and zero layout issues.
- **Logo fonts separate from page fonts**: Logo uses Lora (serif) + Caveat (handwriting). Page uses Playfair Display + Inter. All 4 loaded via `next/font/google` with CSS variables (`--font-lora`, `--font-caveat`).
- **`font-[family-name:var(--font-lora)]`**: Tailwind v4 syntax for referencing CSS variable fonts. Works with `next/font/google` variable approach.
- **Mobile logo = sygnet only**: `hidden md:flex` on text part. Compass icon always visible. Saves space on narrow screens, improves recognition.
- **SVG favicon in App Router**: Place `icon.svg` in `src/app/` — Next.js auto-detects and serves it. Update `metadata.icons` to `"/icon.svg"`. Simpler than generating multiple PNG sizes.
- **Logo `aria-label` on Link, `aria-hidden` on SVG**: The wrapping `<Link>` gets `aria-label="Wyjazdy z Dziećmi — strona główna"`. The decorative SVG gets `aria-hidden="true"`. Text in logo is visible but supplementary.
- **Logo sizing in header**: `size={44}` fits within `h-16 sm:h-20` header with natural padding from flexbox. No need for explicit padding on the logo itself.

## Blog na homepage 22.03.2026 Lessons Learned

- **`BlogTeaser` Server Component on homepage**: Grid `sm:grid-cols-2 lg:grid-cols-3` with hero images. Fetches `getLatestBlogPosts(3)`. Placed between OpinionsTeaser and HomeFAQ. Returns `null` when no posts exist.
- **Blog page `/blog`**: Same grid layout as BlogTeaser — consistent card design with images, formatted dates, hover effects.
- **Blog reader — NOT Keystatic reader**: Keystatic `createReader` with `format: { contentField }` has a bug — `listCollection` uses `getDataFileExtension(formatInfo)` which returns `.mdoc` (content extension) instead of `.yaml` (data extension), so it looks for `*.mdoc` files instead of directories with `index.yaml`. Fix: direct `fs.readdir` + `js-yaml` + `Markdoc.parse/transform` in `src/data/blog.ts`.
- **Blog content structure**: Each post = directory in `content/blog/{slug}/` with `index.yaml` (title, subtitle, publishedDate, image?) + `content.mdoc` (Markdoc body).
- **Blog post `image` field**: Optional `image?: string` in BlogPost type + `index.yaml`. Path to image in `public/images/blog/`. Used in cards on homepage and /blog page.
- **SEO link juice from homepage**: Blog teaser on homepage passes authority to individual blog posts via internal links. New posts are discovered faster by crawlers because homepage is most-crawled page.
- **Blog post Markdoc formatting**: Use H2 headings and bullet lists for structure. No emoji in content — consistency with site tone. Subtitle field = SEO-friendly summary for listings.

## Content Sources

All copy comes from `docs/tresc_na_strone.md` and `docs/TODO POPRAWIC landing page 2.03.2026.docx`. Both trips have complete content. "Yoga i Konie" pricing: 900/700 zł (warsztaty + joga). `/single-z-dziecmi` is a placeholder page (noindex). `/dla-doroslych` is a placeholder page (noindex).

## Redesign Leśna Zieleń 22.03.2026 Lessons Learned

- **Turbopack CSS cache**: After changing `@theme {}` colors in `globals.css`, compiled CSS in `.next/dev/` keeps old values. Fix: `rm -rf .next` + restart `npm run dev`. `Ctrl+Shift+R` alone is NOT enough.
- **Parallel worktree overlap**: Agent 1 (core UI) covered ~40 files including files assigned to agents 2 and 3. Merge strategy: use broadest agent as base, cherry-pick unique changes from others (editorial hero from agent 2).
- **Editorial decorative elements**: Replace `rounded-full` floating dots with thin `h-px`/`w-px` lines for magazine feel. Less playful, more refined.
- **Neutral benefit cards**: Remove per-card `bgClass`/`iconClass`, use uniform `bg-parchment-dark/50` + `text-graphite-light` for clean, non-distracting hero.
- **Rectangular design system**: `rounded-none` everywhere. Exception: `Badge` uses `rounded-sm` — fully sharp corners look wrong on tiny elements. No other exceptions.
- **Color variable names preserved**: `--color-terracotta` now holds green `#2D6A4F`. Renaming would break 100+ Tailwind class usages. The semantic disconnect (name vs color) is acceptable — all existing `bg-terracotta`, `text-terracotta` classes automatically pick up the new green.

## Keystatic Audit 23.03.2026 Lessons Learned

- **CMS select must match TypeScript union**: `keystatic.config.ts` category select had only 2 options ("rodzinny", "matka-corka") but TypeScript type and code supported 4. CMS users couldn't set "single-parents" or "dla-doroslych". Fix: always keep CMS field options in sync with TypeScript union types.
- **Blog `image` field missing from CMS schema**: Field existed in YAML files and data reader but was invisible in `/keystatic` admin panel. Fix: add `image: fields.text()` to blog collection schema. Pattern: when adding optional fields to content YAML, always add to `keystatic.config.ts` too.
- **Explicit `js-yaml` dependency**: Blog reader used `js-yaml` (workaround for Keystatic reader bug) but it wasn't in `package.json` — worked only as transitive dependency. Fix: `npm install js-yaml` + `@types/js-yaml` as explicit dependencies. Remove `@ts-expect-error` after adding types.
- **`Place` type had unused `image?: string`**: CMS and data layer use `images: string[]` (plural). Type had both singular and plural. Fix: remove unused singular `image` field from type. Always verify types match actual CMS schema.
- **`BookingFormData` type incomplete**: `dietaryNeeds` existed in Zod schema, form UI, and API route but was missing from the `forms.ts` type. Fix: keep all type definitions in sync when adding new form fields.
- **Keystatic consistency audit checklist**: When reviewing Keystatic setup, check 5 layers: (1) `keystatic.config.ts` schema, (2) `content/` YAML files, (3) `src/data/*.ts` readers/mappers, (4) `src/types/*.ts` TypeScript types, (5) `package.json` dependencies.

## Code Review Audit 24.03.2026 Lessons Learned

- **CSRF Origin validation on API routes**: All POST routes must verify `Origin` header against `ALLOWED_ORIGINS` array. Pattern: `const origin = request.headers.get("origin"); if (origin && !ALLOWED_ORIGINS.includes(origin)) return 403`. Allow `localhost:3000` only in development via `process.env.NODE_ENV`.
- **Vercel IP extraction — last, not first**: Vercel appends real client IP as the **last** entry in `x-forwarded-for`. Use `.split(",").at(-1)!.trim()` instead of `.split(",")[0]`. First entry is user-controllable (spoofable).
- **StructuredData XSS prevention**: `JSON.stringify` does not escape `</script>`. Always apply `.replace(/</g, "\\u003c")` before `dangerouslySetInnerHTML` in `<script type="application/ld+json">`.
- **Rate limiter needs size cap**: In-memory `Map` grows unbounded. Add `MAX_IPS` constant (10,000) and evict expired entries when map reaches capacity. Note: per-instance on Vercel (not shared across serverless functions).
- **`parseLocalDate` must validate input**: Empty string or malformed date produces `NaN` Date that silently propagates. Guard: `if (parts.length !== 3 || parts.some(isNaN)) throw Error`. Invalid dates defaulting to `isPast: false` means broken trips stay visible forever.
- **No duplicate type sources for forms**: `forms.ts` manually defined types diverged from Zod schemas. Deleted — use only `z.infer<typeof schema>` (e.g. `BookingFormValues`). Single source of truth for form shapes.
- **Past trips must not claim InStock**: `getEventSchema` must guard `if (trip.pricing.length > 0 && !trip.isPast)` before emitting `offers` block. Google Rich Results flags `InStock` on past events.
- **Breadcrumb schema needs absolute URLs**: `getBreadcrumbSchema` must prepend `SITE_CONFIG.url` to relative paths. Google requires full absolute URLs in `item` field.
- **Blog `BLOG_DIR` must use `process.cwd()`**: Relative paths (`"content/blog"`) resolve against cwd which may differ on Vercel. Always use `path.join(process.cwd(), "content/blog")`.
- **`getBlogPost` needs try/catch**: If `index.yaml` exists but `content.mdoc` doesn't, `fs.readFile` throws uncaught ENOENT → 500 error. Wrap in try/catch, return `undefined`.
- **HTML entities forbidden in .tsx**: `&bdquo;`, `&rdquo;`, `&mdash;`, `&ndash;` must be literal UTF-8 characters (`„`, `"`, `—`, `–`). Same rule as unicode escapes `\u201E` — only allowed in `.ts`, not `.tsx`.
- **Dead CSS removal**: After design system changes, verify old animations/keyframes are still referenced. `animate-float-*` survived 2 redesigns unused. `grep` class names before keeping CSS.
- **Form submissions not delivered in production**: All 4 API routes have commented-out n8n webhook calls. `log()` is no-op in production. Must configure webhook or email service before launch. **RESOLVED** in Form Delivery System (24.03.2026) — Google Sheets + Resend emails.

## Form Delivery System 24.03.2026 Lessons Learned

- **`google-auth-library` not `googleapis`**: `googleapis` = 82MB, cold start on Vercel. `google-auth-library` (~5MB) + raw `fetch` to Sheets API v4 is sufficient for `values.append`.
- **Turnstile invisible mode requires `onSuccess` callback**: `getResponse()` returns `undefined` in invisible mode because the challenge executes asynchronously. Use `onSuccess={setToken}` + `useState` pattern, NOT `ref.current?.getResponse()`.
- **Turnstile reset on ALL error paths**: Token is single-use. After 429, `!ok`, or `catch` — `reset()` is required, otherwise next submit will be rejected by Cloudflare.
- **Server-side token enforcement**: When `TURNSTILE_SECRET_KEY` is set but no token arrives, reject the request (defense in depth). Without this, bots can skip Turnstile by not including the token field.
- **`turnstileToken: z.string().min(1).optional()`**: Without `.min(1)`, empty string `""` passes Zod but is falsy in `if (data.turnstileToken)`, bypassing verification entirely.
- **CSV/formula injection in Google Sheets**: User input starting with `=`, `+`, `-`, `@` is executed as formula. Apply `sanitizeCell()` — prefix dangerous chars with apostrophe `'`. Apostrophe is Google Sheets' escape character.
- **Resend lazy init, not singleton**: `new Resend(undefined)` at module level can fail on import. Use `getResendClient()` that creates instance only when needed.
- **React Email `<Text>` rejects number children**: `{props.adults}` (number) inside `<Text>` causes type error. Use template literals: `` {`${props.adults} dorosłych`} ``.
- **React Email `<Html lang="pl">`**: Add `lang` attribute for accessibility in email clients that support it.
- **Email templates import from `constants.ts`**: Phone, URL, site name — Single Source of Truth. Never hardcode `+48 503 098 906` in templates.
- **Confirmation emails need `<Link>`**: Plain text URLs are not clickable in HTML email. Always use `<Link href="...">` from `@react-email/components`.
- **RODO in email footers**: Transactional = art. 6 ust. 1 lit. b (contract). Newsletter = art. 6 ust. 1 lit. a (consent) + info about opt-out.
- **`ALLOWED_ORIGINS` in constants.ts**: Extract from 4 API routes to single source. DRY.
- **Don't log health data**: `dietaryNeeds` is RODO art. 9 special category — remove from dev logs.
- **`Promise.allSettled` for graceful degradation**: Sheets + email run in parallel. If one fails, the other still works. User always sees success. Errors logged via `console.error` (Vercel logs).
- **`tsconfig.json` exclude `docs/`**: Reference code in `docs/` with `"use server"` directives gets picked up by TypeScript compiler. Exclude the whole directory.

## Poprawki UI 24.03.2026 Lessons Learned

- **DecorativeUnderline SVG pattern**: Hand-drawn curved line under accent text. Implemented as inline `<svg>` with `<path>` using cubic bezier curves. In SectionHeading: `underline` boolean prop wraps `italicText` in `<span className="relative inline-block">` + SVG below. For hero (white on dark): use `stroke="rgba(255,255,255,0.35)"` instead of `currentColor`.
- **Label changes need 4 sync points**: When renaming a category label (e.g. "Samodzielny rodzic" → "Single z dziećmi"), update: (1) `category-config.ts` label, (2) `keystatic.config.ts` select option label, (3) `navigation.ts` menu item, (4) component hardcoded text (CategoryCards). All 4 must stay in sync.
- **Navigation label = page meta title**: When changing nav item "O mnie" → "O nas", also update the target page's `metadata.title`, breadcrumb schema name, and any visible `<h1>`/heading text on that page.
- **Calendar legend is separate from calendar rendering**: Removing "Zakończone" from legend (TripCalendar lines 268-271) doesn't affect how past trips render in calendar cells — they still get `PAST_CATEGORY.calendarBg` styling. Legend and rendering are independent.
- **ImageBreaker removal — check import**: After removing one ImageBreaker usage, verify the import is still needed (other usages may remain). Don't remove imports that are still referenced.
- **Nav active underline vs bg highlight**: `border-b-2 border-moss` is cleaner than `bg-moss/10` for active page indication. Matches editorial style. Apply to both top-level Links and DropdownNavItem button labels (via `cn()` on inner `<span>`).
- **Empty state = opportunity, not void**: When `TripCardsSection` has no upcoming trips, don't return `null`. Show a `JoinUsNewsletter` dark section with newsletter signup + CTAs. Converts "nothing to show" into lead capture.
- **FooterNewsletter as separate component**: Don't bloat existing `NewsletterForm` with dark variant logic. Create `FooterNewsletter.tsx` as independent client component with its own form state — avoids prop drilling and keeps PDF download form simple.
- **`consentNewsletter` optional in schema**: Make it `.optional()` in Zod so existing `NewsletterForm` (PDF download) doesn't require it. Only `JoinUsNewsletter` and `FooterNewsletter` include the checkbox. Backward-compatible.
- **All buttons bg-moss, not terracotta**: When changing button color globally, update Button.tsx variants AND grep for hardcoded terracotta references in: MobileMenu, CookieBanner, SkipToContent, Card, error.tsx, not-found.tsx. Category-config terracotta (calendar color) stays — it's not a button.
- **JoinUsNewsletter/FooterNewsletter light theme**: Client rejected dark bg-graphite. Changed to bg-parchment-dark with standard light form styling (border-graphite/20, bg-white inputs, text-graphite, bg-moss button). Matches rest of site.
- **URL rename needs 4 updates**: (1) Rename directory in `src/app/(main)/`, (2) Update `ROUTES` in constants.ts, (3) Update sitemap.ts, (4) Add 301 redirect in `next.config.ts`. Clean `.next/` cache after rename — stale type validator references old path.
- **Reduced spacing pattern**: SectionWrapper default is `py-8 sm:py-10`. Category pages use `py-4 sm:py-6` (intro headers) or `py-6 sm:py-8` (content sections). CategoryCards uses `py-6 sm:py-8`. Minimal spacing throughout — consistent with design reference (paniodrelaksu.pl).
- **Benefit cards equal height**: `ScrollAnimation className="h-full"` + card `flex h-full flex-col` + description `flex-1`. Ensures all cards in grid row have same height regardless of content length.
- **System fonts in Tailwind v4 `@theme`**: For system fonts (Georgia, Arial, etc.), set directly in `@theme { --font-heading: Georgia, serif; }`. Do NOT use `next/font` or inline `style` prop — `@theme` generates CSS on `:root` which takes precedence over inline styles on child elements.
- **`next/font` variable vs `@theme` precedence**: `next/font` sets `--font-xxx` via a CSS class on the wrapper div. Tailwind v4 `@theme` references that variable on `:root`. For Google Fonts this works (inheritance). For system fonts, skip `next/font` entirely and hardcode in `@theme`.
- **TripCardHorizontal on category pages**: All category pages (/warsztaty-z-dziecmi, /matka-z-corka, /single-z-dziecmi, /dla-doroslych) and /wyjazdy use horizontal layout. Only homepage TripCardsSection keeps vertical TripCard grid.
- **Consistent bottom CTA pattern**: All pages end with "Szukasz czegoś dostępnego teraz?" + "Zobacz wszystkie warsztaty" button — not custom "Dołącz do mnie" / "Sprawdź wyjazdy" copy. Consistent across /o-nas and category empty states.

## JoinUsNewsletter Empty State 25.03.2026 Lessons Learned

- **Empty state cognitive overload**: Original JoinUsNewsletter had 2 checkboxes + 2 CTA buttons + email field = too many competing elements. When a user lands on a category page with no workshops, they need a single clear path, not a form with legal text walls.
- **Uproszczony empty state pattern**: Kontekstowy nagłówek ("Planujemy nowe terminy!") + jeden checkbox zgody + przycisk "Powiadom mnie" + sekcja "Szukasz czegoś teraz?" z jednym CTA oddzielonym linią. Usuwa "Napisz do nas" — kontakt jest w stopce/menu.
- **Lokalny schemat Zod dla uproszczonego formularza**: Gdy komponent używa uproszczonego podzbioru pól, stwórz lokalny schemat (`passiveNewsletterSchema`) zamiast rozszerzać główny. Unika type hackowania (`false as unknown as true`) i jest czytelniejszy.
- **API schema bardziej permisywne niż UI schema**: API route może akceptować opcjonalne pola (`consentRodo.optional()`), podczas gdy komponenty UI mogą mieć własne bardziej rygorystyczne schematy. Pozwala na różne warianty UI (jeden checkbox vs dwa) korzystające z tego samego endpointu.
- **`newsletterSchema.extend({ field: schema.shape.field.optional() })`**: Wzorzec rozszerzenia istniejącego schematu Zod z nadpisaniem jednego pola na optional. Unika duplikacji całego schematu w API route.
- **"Powiadom mnie" zamiast "Zapisz się"**: Benefit-driven copy dla empty state. "Powiadom mnie" jasno komunikuje cel (powiadomienie o nowych terminach), podczas gdy "Zapisz się" jest ogólny i nie wskazuje co użytkownik zyska.
- **JoinUsNewsletter spacing = SectionWrapper default**: `JoinUsNewsletter` używa własnego `<section>` (nie SectionWrapper). Padding musi ręcznie zgadzać się z resztą strony — `py-8 sm:py-10`. Nie `py-14 sm:py-16` — to tworzy wizualną niespójność z sekcjami powyżej.
- **JoinUsNewsletter className prop dla różnych kontekstów**: Domyślny `bg-parchment-dark` pasuje na homepage (następuje po białej/default sekcji). Na category pages (single-z-dziecmi, dla-doroslych) poprzednia sekcja ma `variant="alternate"` (bg-parchment-dark) — taki sam kolor zlewa się wizualnie. Dodatkowo footer też używa `bg-parchment`. Rozwiązanie: `className` prop na `JoinUsNewsletter` + `bg-moss/10` na tych stronach. Sprawdzaj kolory sąsiednich sekcji i footera przed doborem tła.

## Poprawki kolorystyki sekcji + Footer spacing 25.03.2026 Lessons Learned

- **Spójny schemat kolorów sekcji na stronach kategorii**: Hero/intro = `variant="alternate"` (bg-parchment-dark), sekcja główna = default (bg-parchment), sekcja trips/CTA = `className="bg-moss/10"`. Ten wzorzec stosowany na /wyjazdy, /single-z-dziecmi, /dla-doroslych. Daje czytelny rytm wizualny bez monotonii.
- **Footer padding = SectionWrapper default**: `py-8 sm:py-10` zamiast starego `py-16 sm:py-20`. Spójne z resztą strony. Footer nie powinien wyróżniać się zwiększonym paddingiem.
- **JoinUsNewsletter domyślny bg = bg-moss/10**: Zmieniony z `bg-parchment-dark`. Delikatna zieleń działa na wszystkich stronach i nie zlewa się ani z bg-parchment-dark poprzedniej sekcji, ani z bg-parchment footera.
- **Sąsiednie sekcje nie mogą mieć identycznego tła**: Przy zmianie koloru sekcji zawsze sprawdź co jest powyżej i poniżej. bg-parchment-dark (alternate) obok bg-parchment-dark (alternate) = niewidoczny podział. Używaj co najmniej 3 różnych kolorów dla 3 sąsiednich sekcji.

## Keystatic CMS Migration 25.03.2026 Lessons Learned

- **`shortBio` field for teasers**: Full CMS bio and homepage teaser are different texts. Don't force-fit one into the other. Add `shortBio` to team schema — `AboutTeaser` uses `shortBio ?? bio` (graceful fallback). Team members without `shortBio` still work.
- **FAQ singleton vs homepage hardcode**: FAQ data needs 3 consumers: Accordion UI, schema.org FAQPage, and analytics tracking. Moving to CMS singleton `faq` keeps all 3 fed from one source. `HomeFAQ` becomes a client component accepting `faqData` prop (for analytics `onToggle`), `page.tsx` fetches and passes data + generates schema.
- **Projects collection for `/inne-projekty`**: Each project = slug YAML with title, tagline, description (multi-paragraph), media (image OR video), order, links[]. Page renders dynamically with alternating `variant` per project. Adding new project = new YAML file, zero code changes.
- **Benefit cards icon mapping pattern**: CMS stores icon name as string (`"Heart"`, `"Shield"`), code maps via `ICON_MAP: Record<string, LucideIcon>`. Select dropdown in CMS (10 Lucide icons). Fallback: `ICON_MAP[name] ?? Heart`. Don't store React components in YAML — store identifiers and resolve at render.
- **Shared `BenefitCards` component eliminates 4× duplication**: All 4 category pages had identical benefit card rendering code (grid, ScrollAnimation, icon box, equal heights). Extract to `src/components/shared/BenefitCards.tsx` — single source for layout, each page just calls `getBenefitsByCategory(cat)`.
- **`categoryBenefits` singleton structure**: Array of `{category, subtitle, items[]}` — one entry per category. Reader filters by `category` string. CMS shows dropdown label per category. Better than 4 separate singletons (less clutter in admin).
- **Polish typographic quotes break JS strings**: `„"` (U+201E/U+201D) inside double-quoted `.ts` strings cause `Unterminated string constant`. In keystatic.config.ts labels: use plain quotes or remove them entirely. YAML multiline text is safe (no JS parsing).
- **What should stay hardcoded**: Hero H1/H2 (SEO + schema.org coupling), CategoryCards (route-dependent), navigation (code-dependent), contact labels (in constants.ts), category page intro H1/paragraphs (layout-coupled, rarely change). CMS is for content editors change independently of developers.
- **CMS migration audit checklist**: When migrating hardcoded data to CMS, verify 5 layers: (1) keystatic.config.ts schema, (2) content/*.yaml data files, (3) src/data/*.ts reader, (4) src/types/*.ts if needed, (5) component consuming the data. Build must pass after each migration.

## Keystatic UX + Security 25.03.2026 Lessons Learned

- **`columns` in collection config**: Shows extra fields in CMS list view without opening entries. Pattern: `columns: ["date", "category", "location"]`. No schema change needed — just a UI hint. Use on trips, blog, testimonials, projects.
- **`ui.navigation` groups**: Organize sidebar into logical sections instead of flat list. Groups defined as `{ "Wyjazdy": ["trips"], "Strona": ["homepage", "faq"] }`. Greatly improves admin UX when 10+ collections/singletons.
- **`entryLayout: "content"`**: Makes blog editing feel like a real editor (content front-and-center, metadata in sidebar). Requires `format: { contentField: "content" }` on same collection. Only works with markdoc/mdx collections.
- **Disable admin UI in production**: `/keystatic` is publicly accessible by default on Vercel. Guard with `const showAdminUI = process.env.NODE_ENV !== "production" || Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER)`. Apply to both layout.tsx (notFound()) and API route handler (404 response). When GitHub mode is enabled, OAuth protects it; otherwise block entirely.
- **`React.cache()` on all readers**: Multiple Server Components calling same reader on same page cause redundant filesystem reads. Wrap exported async functions: `export const getAllTrips = cache(async () => { ... })`. Import from `"react"`. Deduplicates within single request.
- **`cache()` + arrow function type annotation**: `cache(async (param): Promise<T> { ... })` fails — parser reads `: Promise<T>` as expression, not return type. Fix: wrap in extra parens: `cache(async (param): Promise<T> => { ... })` or remove return type and let TS infer.
- **Slug validation in readers**: Keystatic doesn't validate slugs on save (known bug #1211). CMS editors can create slugs with spaces/uppercase/special chars. Add `warnInvalidSlug(slug, collection)` in readers that iterate slugs. Pattern: `/^[a-z0-9][a-z0-9-]*[a-z0-9]$/` test, `console.warn` on failure.
- **`fields.pathReference` vs `fields.text` for images**: `pathReference` gives file picker UI for existing files, but changes stored value format. Don't migrate existing `fields.text` image paths — breaking change for minimal gain. Use `pathReference` only for new collections.
- **`fields.conditional` for optional fields**: Cleaner UI (show/hide field groups based on discriminant), but changes YAML structure from flat `key: value` to `key: { discriminant, value }`. Don't migrate existing optional `fields.text` — breaking change. Use for new schemas only.
- **GitHub mode for client access**: Client needs GitHub account + collaborator access to repo. Developer creates GitHub App (one-time) with Callback URL `https://domain/api/keystatic/github/oauth/callback`, Contents permission Read & write. 5 env vars on Vercel: `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`, `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`. After redeploy, client logs in via GitHub OAuth on `/keystatic`. Adding more editors = just add as collaborator (no config changes).
- **Production admin UI guard**: `/keystatic` returns 404 when GitHub mode env vars are not set. This prevents public access to local-mode CMS on Vercel. Guard in both `layout.tsx` (notFound) and API route handler (404 JSON).

## Full Code Review 25.03.2026 Lessons Learned

- **CSP must include Turnstile domains**: `challenges.cloudflare.com` needed in `script-src`, `connect-src`, AND `frame-src`. Without all three, Turnstile is silently disabled in production — forms lose spam protection with no visible error.
- **RODO consent guard on API level**: When `consentRodo` is optional at API level (for simplified JoinUsNewsletter form), add explicit guard: `if (!consentRodo && !consentNewsletter) return 400`. Without it, raw API calls can create records with hardcoded "Tak" consent and no actual user agreement.
- **Don't leak Google API error details**: `response.text()` from Sheets API contains spreadsheet ID, project ID, service account info. Log full error via `console.error`, but throw only `Error("Google Sheets API error (status)")` — no body.
- **React 19: `ref` as regular prop**: `forwardRef` is deprecated in React 19.2. Migrate to `ref?: Ref<T>` in props type + destructure in function signature. No `displayName` needed. Applied to Input, Textarea, Select, Checkbox, HoneypotField.
- **HoneypotField needs dynamic `id`**: When multiple forms render on the same page (FooterNewsletter + NewsletterForm), hardcoded `id="website"` creates duplicate IDs (WCAG 4.1.1 violation). Use `id={props.id ?? props.name ?? "website"}`.
- **Schema.org `offers.availability` must reflect stock**: `InStock` for available, `LimitedAvailability` when `spotsLeft <= 3`, `SoldOut` when `spotsLeft === 0`. No offers block for past trips. Google Rich Results flags mismatches.
- **Turnstile `remoteip` parameter**: Pass client IP to Cloudflare's `/siteverify` endpoint for stronger token replay protection. Pattern: `verifyTurnstile(token, ip)` in all 4 API routes.
- **Rate limiter eviction batching**: Don't iterate entire `requestMap` on every request when `MAX_IPS` is hit. Cap at `EVICTION_BATCH = 1000` per pass to avoid O(n) blocking on hot paths.
- **Zod: always `.max()` on string fields**: Even dropdown-populated fields like `trip` need `.max(200)` — user can bypass UI and send raw API requests with oversized values that overflow email subjects and Sheets cells.
- **Phone regex must require digits**: `/^[+\d\s()-]+$/` allows strings like `()---` with zero actual digits. Add `.regex(/\d/)` as second validation.
- **DRY across card components**: When two components (TripCard, TripCardHorizontal) share identical helper functions (`getScarcityBadge`, `getMinPrice`), extract to shared file (`trip-card-utils.tsx`) immediately — they will drift apart otherwise.
- **`next/image sizes` must match CSS grid breakpoints**: CategoryCards grid is 1-col below 640px but `sizes` declared `50vw` — browser serves half-resolution images on mobile. Match: `(max-width: 640px) calc(100vw - 2rem)`.
- **`aria-labelledby` on dialog with visible heading**: When a `role="dialog"` has a visible `<h2>`, use `aria-labelledby` pointing to the heading's `id`. Switch between `aria-label` (no heading) and `aria-labelledby` (heading visible) based on panel state.
- **Safe CMS lookups**: Never use `!` non-null assertion on CMS data (`getTeamMember("name")!`). A renamed CMS entry causes runtime crash. Use conditional render: `{member && <Component member={member} />}`.
- **Blog OG/Twitter image**: `generateMetadata` must include `openGraph.images` and `twitter.images` when post has an image — otherwise social sharing cards show no preview.
- **Sitemap: past trips = yearly, low priority**: Past trips don't change — use `changeFrequency: "yearly"` and `priority: 0.4`, not `"weekly"` and `0.8`.
- **Placeholder pages noindex**: Pages documented as "placeholder (noindex)" must actually have `robots: { index: false }` in metadata export. Easy to document but forget to implement.
- **Button discriminated union: link has no `onClick`**: `ButtonAsLink` sets `onClick?: never`. MobileMenu CTA needs `onClick={onClose}` for menu dismissal — wrap Button in a `<div onClick={onClose}>` instead.
- **`false as unknown as true` needs comment**: RHF/Zod type mismatch workaround (Zod `literal(true)` output ≠ `boolean` input for defaultValues) is not self-evident. Add `// RHF/Zod type mismatch — Zod literal(true) output ≠ boolean input` comment on every occurrence.
- **Email templates: literal UTF-8 in .tsx**: Project convention requires literal Polish chars in `.tsx`. Replace `\u201E`/`\u201D` unicode escapes with `„`/`"` in email template JSX expressions.

## Security Audit 25.03.2026 Lessons Learned

- **Blog slug path traversal**: `path.join(BLOG_DIR, slug)` with unsanitized URL param allows `../../` traversal. Guard with `isSafeSlug()`: reject `/`, `\`, `..`, leading `.`. Apply to both `getBlogPost()` and `readBlogMeta()`.
- **CSRF: require Origin in production**: `if (origin && ...)` skips check when Origin header is absent. Non-browser clients (curl, bots) omit Origin by default. Fix: `if (!origin) return 403` in production. Dev mode stays permissive for testing.
- **Shared `validateRequest()` helper**: Origin check, Content-Length, rate limit, JSON parse, honeypot — identical in all 4 API routes. Extract to `src/lib/api-security.ts` returning `{ ok: true, ip, body } | { ok: false, response }`. DRY and single point of security enforcement.
- **Content-Length check before JSON parse**: Without limit, attacker sends 100MB body → memory pressure on serverless function. Guard: reject `Content-Length > 50KB` before `request.json()`. Vercel has 4.5MB default but explicit check is defense in depth.
- **`VERCEL_URL` vs `VERCEL_PROJECT_PRODUCTION_URL`**: `VERCEL_URL` includes preview deployment URLs (predictable pattern). Every preview deployment becomes a valid CSRF origin. Use `VERCEL_PROJECT_PRODUCTION_URL` — only the production URL.
- **Keystatic routes need HSTS + X-Frame-Options**: Admin panel had relaxed CSP (needed for GitHub OAuth) but also dropped HSTS and clickjacking protection. These headers don't conflict with OAuth — always include them.
- **PII in production `console.error`**: `console.error` runs in production (unlike `log()` helper). On total delivery failure, was logging `name`, `email` to Vercel logs. Fix: log only `trip`/`timestamp` — enough to debug without RODO exposure.
- **Return 500 on total delivery failure**: Returning `{ success: true }` when both Sheets and email fail misleads user — they think submission was received but lead is lost. Return 500 with "spróbuj ponownie lub skontaktuj się telefonicznie".
- **Rate limiter is per-instance on Vercel**: In-memory `Map` is not shared across serverless function instances. Acknowledged limitation — Turnstile is the primary spam defense, rate limiter is secondary. For higher scale, use Vercel KV (Redis).

## UX/UI Audit 25.03.2026 Lessons Learned

- **Placeholder contrast WCAG 1.4.3**: `placeholder:text-graphite-light/60` = 2.85:1 contrast. Remove `/60` opacity — use `placeholder:text-graphite-light` directly (#555 on white = 7.5:1). Never apply opacity to placeholder text colors.
- **Hover color contrast**: `moss-light` (#8A9680) on parchment was 2.95:1. Darkened to #5A6853 (5.2:1). Hover states must also pass 4.5:1 WCAG AA — not just default states.
- **`svh` over `vh` on mobile hero**: iOS Safari's address bar shrinks/grows, making `vh` unreliable. CTA button can be hidden below fold. Use `h-[70svh]` (small viewport height) to ensure content fits within visible area.
- **Touch targets 44×44px (WCAG 2.5.8)**: Icon-only buttons (phone, hamburger, close) with `p-2` = ~36px. Add `min-h-11 min-w-11` (44px) to all interactive icon buttons. Padding alone is not enough when icon is small.
- **Loading text accessibility**: `"..."` as loading indicator is meaningless to screen readers. Use `<span aria-label="Wysyłanie">…</span>` so assistive technology announces the state.
- **`tel:` href must strip spaces**: `CONTACT.phone` contains spaces for display formatting. `tel:+48 503 098 906` is technically valid but inconsistent across devices. Always `.replace(/\s/g, "")` in `href`.
- **Use `Button` component in error/404 pages**: Raw `<Link>` or `<button>` with inline styles miss `focus-visible:ring`, `active:scale`, and design system consistency. Always use the project's `Button` component.
- **Category badge text ≠ category color**: Badge `badgeText` uses `text-amber-700`/`text-purple-700` (dark, passing contrast) — NOT `text-mustard`/`text-lavender` (light, failing). Calendar cells use these colors as backgrounds with `text-graphite` foreground. When auditing contrast, check actual class usage, not raw color values.

## Mobile Audit 25.03.2026 Lessons Learned

- **Touch targets on ALL interactive elements**: Calendar nav buttons (`p-1` = ~24px), legend filter buttons (`py-1.5` = ~28px), Button `sm` size (`py-2.5` = ~31px) — all below 44px WCAG 2.5.8 minimum. Fix: `min-h-11 min-w-11` on icon buttons, `min-h-[44px]` on Button sm, increased padding on legend buttons. Always verify touch targets on new interactive elements.
- **MobileMenu needs `overflow-y-auto`**: Without it, expanded accordion sections on short/landscape screens push CTA below viewport with no way to scroll. Always add `overflow-y-auto` on full-height fixed panels.
- **`svh` on ALL viewport-height elements**: `TripHero` used `min-h-[60vh]` while `HeroSection` already used `svh`. iOS Safari's dynamic address bar makes `vh` unreliable. Use `svh` consistently everywhere.
- **`safe-area-inset-bottom` on fixed bottom elements**: `StickyBookingCTA` without `pb-[env(safe-area-inset-bottom,12px)]` gets hidden behind iPhone home bar. Apply to ALL `fixed bottom-0` elements.
- **Input font size ≥ 16px prevents iOS auto-zoom**: iOS Safari auto-zooms inputs with `font-size < 16px`. Always use `text-base` (16px) minimum on `<input>`, `<textarea>`, `<select>`. Never use `text-sm` on form inputs.
- **`inputMode="numeric"` over `type="number"` for counts**: `type="number"` adds spinner arrows and allows `e`. `inputMode="numeric"` on `type="text"` shows numeric keyboard on mobile without side effects.
- **`autoComplete` attributes on form fields**: Reduces form completion time ~30%. Always add `autoComplete="name"`, `autoComplete="email"`, `autoComplete="tel"` on corresponding fields.
- **`priority` deprecated in Next.js 16**: Replace `priority` with `loading="eager" fetchPriority="high"` on LCP images. Non-LCP images: `loading="lazy"` or omit. Only one image per page should be eager-loaded.
- **CookieBanner checkbox labels need `items-start`**: `items-center` misaligns checkbox with first line of multi-line label text. Use `items-start` on all checkbox label wrappers.
- **Grid breakpoint consistency**: All grids in the project use `sm:grid-cols-2` (640px). Don't accidentally use `md:grid-cols-2` (768px) — creates inconsistent gap at 640-767px.

## Deployment & Handover Documentation

Project has complete documentation for handover to client:

- `docs/instrukcja-przekazanie-projektu.md` — Master handover checklist (7 phases: code → Vercel → services → domain → CMS → testing → client onboarding)
- `docs/instrukcja-domena-vercel.md` — Domain DNS setup (Hostinger → Vercel)
- `docs/setup-external-services.md` — Google Sheets, Resend, Turnstile, Keystatic GitHub mode
- `docs/instrukcja-cms.md` — CMS guide for client (Keystatic)
- `docs/instrukcja-zarzadzanie.md` — Site management guide for client (forms, Sheets, emails)
- `docs/instrukcja-developer.md` — Developer onboarding guide

**Hosting:** Vercel (Pro $20/month for commercial use). Domain on Hostinger (DNS only, no hosting needed). Vercel = hosting + CDN + CI/CD + SSL. Hostinger = domain registrar + DNS records pointing to Vercel.

**Vercel Hobby ToS restriction**: Free tier is personal use only. Client's commercial site requires Pro plan ($20/month).

**Alternative: Coolify on Hostinger VPS** ($7/month KVM 2, 8GB RAM minimum). ISR works on single instance. Needs Cloudflare free tier for CDN. More DevOps burden. Research documented in conversation 26.03.2026.

**Repo ownership:** Code to be transferred from `TatianaG-ka` (developer) to client's GitHub account via Settings → Danger Zone → Transfer ownership. After transfer developer remains collaborator with write access. All docs use `[OWNER]` placeholder for GitHub username.

**Post-handover workflow:** Developer does `git pull` (fetch CMS changes) → makes code fixes → `git push origin master` → Vercel auto-deploys in ~2 min. Client edits content via `/keystatic` (auto-commits to same repo). Both work on same repo, no sync needed beyond `git pull`.

## Deployment & Handover 26.03.2026 Lessons Learned

- **GitHub Transfer > push to new repo**: Transfer (Settings → Danger Zone → Transfer ownership) preserves all history, branches, issues AND automatically makes original owner a collaborator. Old URLs redirect. Cleaner than creating new repo + pushing.
- **Don't hardcode GitHub username in docs**: Use `[OWNER]` placeholder in all documentation (setup guides, clone URLs, env vars). Username changes on transfer — hardcoded values become instantly wrong.
- **Vercel Hobby is non-commercial**: ToS explicitly prohibits deployments "used for the purpose of financial gain." Client's production sales funnel requires Pro ($20/month). Not enforced aggressively but they can shut down without notice.
- **Vercel = hosting, Hostinger = DNS only**: Common confusion — client thinks they need hosting on Hostinger because domain is there. Hostinger only provides DNS records pointing to Vercel. No hosting package needed.
- **Coolify minimum 8GB RAM for Next.js**: KVM 1 (4GB) crashes during `npm run build` — Next.js build spikes to 3-4GB + Coolify overhead. GitHub Issues #6656 and #7173 confirm. Workaround: build via GitHub Actions, push pre-built Docker image.
- **`git pull` before every work session**: After handover, client makes CMS edits that create commits on same repo. Always pull before starting code changes to avoid merge conflicts.
- **Resend DNS records don't conflict with Vercel**: SPF, DKIM, DMARC (TXT records) are independent from Vercel's A and CNAME records. Can be set up simultaneously on Hostinger DNS.
- **Netlify new accounts (post 04.09.2025) have credit-based pricing**: ~20 production deploys/month from 300 credits pool (15 credits/deploy). Each Keystatic CMS commit triggers a deploy — daily edits burn through limit in ~3 weeks. Legacy accounts (pre-09.2025) have much better limits (100GB bandwidth, 300 build min). Do NOT create new Netlify account for this project.
- **Netlify cold starts ~3+ sec vs Vercel ~1 sec**: Serverless functions on Netlify are significantly slower to cold start. For low-traffic site with form submissions, users hit cold starts frequently. Functions default to US East region — extra latency for Polish users.
- **Hostinger shared hosting ≠ Node.js**: Hosting included with domain purchase is shared PHP/Apache hosting. Cannot run `next start`, API routes, ISR, or any server-side Next.js features. Only static export possible (loses all forms).
- **Repo transferred to client**: Remote URL changed to `https://github.com/mariaejk/wyjazdy-z-dziecmi.git`. Developer (TatianaG-ka) is collaborator with write access.
- **Coolify maintenance is ~10 min/month**: Regular: Coolify UI update + `apt upgrade` (5-10 min). Occasional: `docker system prune` (co 2-3 mies.), container restart, SSL renewal. Worst case: Coolify update breaks Docker compatibility (1-2h debug, raz na kilka miesięcy). Backups not needed — code + CMS content on GitHub.
- **Coolify vs Vercel maintenance tradeoff**: Coolify saves ~50 zł/mies. vs Vercel Pro but costs ~10 min/month routine + risk of occasional multi-hour debug. Vercel = 0 min. Decision depends on client's budget vs developer's time value.
