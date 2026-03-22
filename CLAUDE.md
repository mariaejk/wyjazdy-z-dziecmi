# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / sales funnel for "Wyjazdy z Dziećmi" — a brand organizing family workshop retreats in nature (yoga, dance, ceramics, horses). Client: Maria Kordalewska. Domain: wyjazdyzdziecmi.pl.

**Status:** Phase 1-7 + Poprawki klientki + Redesign wizualny 13.03 + Poprawki konwersji 19.03 + Kategorie/kalendarz/las 20.03 + Poprawki UX 20.03 + Poprawki nazewnictwo/SEO/FAQ 20.03 + Poprawki UI 21.03 + Trip Video 21.03 + Poprawki UI+Nav 21.03 + Logo kompas SVG 22.03 + Blog na homepage 22.03 COMPLETE. Site is a production-ready sales funnel with CTA buttons, scarcity signals, GA4 event tracking, Microsoft Clarity, loading states, sticky mobile CTA, two-month trip calendar with interactive category filters + auto-navigation on homepage + /wyjazdy, auto-isPast from dateEnd + ISR, waitlist, blog, gallery, category filtering with colored badges, ForestPattern SVG decorations, warm Terakota+Oliwka color scheme, SEO H1 descriptive + H2 emotional, FAQ accordion (7 questions) with FAQPage schema.org + id="faq" anchor, childCare w CMS, FAQ/social analytics tracking, testimonials sorted newest-first, "warsztaty" naming consistency, StarRating above opinions, compact hero section, optional trip video (TripVideo component, flex-col-reverse mobile), chronological trip sorting, 4 top-level nav items (Warsztaty dropdown, Poznajmy się dropdown, Blog, Kontakt), CategoryCards (4 image tiles under hero), FAQ link on trip pages, SVG compass logo (Lora + Caveat fonts) with mobile sygnet-only mode, compass favicon.

## Tech Stack

- **Next.js 16.1.6** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19.2** + **Turbopack**
- **Motion 12.34** (`motion/react`) — NOT `framer-motion` (incompatible with React 19)
- **React Hook Form 7.71 + Zod 4.3** — form validation (client + server)
- **Lucide React 0.575** — line icons (strokeWidth 1.5)
- **clsx 2.1 + tailwind-merge 3.5** — className utility `cn()`
- **Vercel** — deployment
- Fonts: **Playfair Display** (headings) + **Inter** (body) + **Lora** (logo main text) + **Caveat** (logo script text), self-hosted via `next/font/google` (auto self-hosting, RODO OK)

## Critical Constraints

- **Motion, not Framer Motion**: `framer-motion` breaks with React 19 (default in Next.js 15). Always use `motion` package with `import { motion } from 'motion/react'`.
- **Tailwind v4 syntax**: Use `@import "tailwindcss"` + `@theme {}` block. Old `@tailwind base/components/utilities` directives don't work.
- **All forms need spam protection**: honeypot field (`website`, CSS hidden) + rate limiting (5 req/15min per IP) on every API route.
- **Cookie banner must comply with RODO/ePrivacy 2026**: consent categories (necessary/analytics/marketing), 3 equal-weight buttons, changeable via footer link.
- **`lang="pl"`** on `<html>` element in root layout.tsx.
- **No automatic email confirmation** in MVP — don't promise it in microcopy.

## Design System: "Warm Natural" (Terakota + Oliwka)

```
Background:    #F4EFE6 (ciepły piasek)
Alt sections:  #EADCC8 (karmel)
CTA Primary:   #D9734E (terakota) — hover: #B85331
Secondary:     #5C713B (ciepła oliwka) — hover: #7A8F53
Text:          #2C241B (espresso)
Text light:    #5A4F44 (ciepły szary)
Accents:       #DDB74A (mustard), #E2856E (coral)
```

Mobile-first, generous whitespace, line icons. Past trips rendered in full color (no grayscale).

## Project Structure

```
dev/plan.md              — Implementation plan v1.1 (5 phases, 78 tasks)
dev/task.md              — Task checklist with checkboxes
dev/kontekst.md          — Project context and session notes
dev/completed/           — Archived completed phases
dev/active/              — Current active phase docs
docs/                    — PRD, content, UI guidelines, source images
src/app/                 — Next.js pages (layout, page, loading, error)
src/components/layout/   — SkipToContent, Container, Header, MobileMenu, Footer, Logo
src/components/ui/       — Button, SectionWrapper, SectionHeading, Badge, Card, Accordion, Input, Textarea, Select, Checkbox, HoneypotField
src/components/shared/   — ScrollAnimation, StructuredData, NewsletterForm, GoogleAnalytics, ClarityScript
src/components/home/     — HeroSection, HeroSlideshow, TripCard, TripCardsSection, AboutTeaser, OpinionsTeaser, BlogTeaser
src/components/trips/    — TripHero, TripTargetAudience, TripDescription, TripProgram, TripPracticalInfo, TripPricing, TripCollaborator, TripFAQ, TripGallery, BookingForm, StickyBookingCTA, PhoneLink
src/components/about/    — PersonBio, PlaceCard
src/components/contact/  — ContactForm, ContactInfo
src/lib/                 — constants.ts, utils.ts, rate-limit.ts, logger.ts, structured-data.ts, analytics.ts
src/lib/validations/     — booking.ts, contact.ts, newsletter.ts (Zod schemas, shared client+server)
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
- **`SectionWrapper` with reduced padding**: `className="py-8 sm:py-12"` overrides default `py-16 sm:py-20 lg:py-24` for tighter spacing when section should be visually close to previous one.
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

- **`BlogTeaser` Server Component on homepage**: Fetches `getLatestBlogPosts(3)` and renders cards with title, date, subtitle. Placed between OpinionsTeaser and HomeFAQ. Returns `null` when no posts exist.
- **`getLatestBlogPosts(limit)` helper**: Sorts by `publishedDate` descending, slices to limit. Single function for homepage teaser — avoids fetching all posts and filtering in component.
- **Blog content structure**: Each post = directory in `content/blog/{slug}/` with `index.json` (title, subtitle, publishedDate) + `content.mdoc` (Markdoc body). Keystatic reads both automatically.
- **SEO link juice from homepage**: Blog teaser on homepage passes authority to individual blog posts via internal links. New posts are discovered faster by crawlers because homepage is most-crawled page.
- **Blog post Markdoc formatting**: Use H2 headings and bullet lists for structure. No emoji in content — consistency with site tone. Subtitle field = SEO-friendly summary for listings.

## Content Sources

All copy comes from `docs/tresc_na_strone.md` and `docs/TODO POPRAWIC landing page 2.03.2026.docx`. Both trips have complete content. "Yoga i Konie" pricing: 900/700 zł (warsztaty + joga). `/single-parents` is a placeholder page (noindex). `/dla-doroslych` is a placeholder page (noindex).
