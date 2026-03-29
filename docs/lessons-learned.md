# Lessons Learned

Historical lessons from each development phase. Reference when debugging similar issues.

## Phase 1

- **`next/font/google` = self-hosting**: Next.js auto-downloads fonts and serves from own domain. Zero Google requests at runtime. RODO compliant.
- **Focus trap needs manual implementation**: No built-in solution in motion — handle Tab/Shift+Tab cycling, Escape, body scroll lock manually.
- **`prefers-reduced-motion`**: Must be added to globals.css AND motion components. Standard pattern: early return with plain HTML (no motion elements). Fixed in Phase 2.
- **React 19 imports**: Use `import type { ReactNode } from "react"` — not `React.ReactNode`. Fixed in Phase 2.

## Phase 2

- **Reduced-motion pattern**: Always use early return with plain HTML (no motion.* elements) when `useReducedMotion()` is true. Consistent across ScrollAnimation and HeroSection.
- **Polskie znaki — UTF-8 everywhere**: Używaj prawdziwych polskich znaków (ą, ć, ę, ł, ń, ó, ś, ż, ź) we WSZYSTKICH plikach (.ts i .tsx). Unicode escapes `\uXXXX` NIE działają w kontekście JSX (wyświetlają się dosłownie). Polskie cudzysłowy typograficzne `„"` — używaj prawdziwych znaków UTF-8 w `.ts` i `.tsx`.
- **Motion variants typing**: `Record<string, ...>` doesn't match motion props. Use `as const` assertion on variant objects.
- **Button discriminated union**: `ButtonAsLink | ButtonAsButton` with `never` for clean type separation. Link variant accepts `aria-label`, `target`, `rel`.
- **Server Components by default**: Section wrappers (TripCardsSection, AboutTeaser) are SC. Only components using motion hooks directly need `"use client"`. ScrollAnimation acts as client boundary.
- **Staggered animations**: `delay={index * 0.15}` on mapped elements gives natural cascade effect.
- **Card image sizes with calc**: `sizes="(max-width: 640px) calc(100vw - 2rem), ..."` for optimal next/image delivery.

## Phase 3

- **Zod 4 + RHF type mismatch**: `z.string().optional().default("")` creates input/output type divergence. RHF resolver infers input type, `useForm<T>` expects output → TS error. Fix: use non-optional fields + `defaultValues` in `useForm()`.
- **Conditional section rendering**: Boolean flags (`hasSchedule`, `hasPricing`, etc.) in page.tsx with `{hasX && <X />}`. Better than rendering empty components and hiding with CSS.
- **Accordion reduced-motion**: Ternary in JSX — `prefersReducedMotion ? (isOpen && <div>) : (<AnimatePresence>)`. Consistent with ScrollAnimation early return pattern.
- **Form primitives pattern**: `forwardRef` + `id = id ?? props.name` + `aria-invalid` + `aria-describedby` + error `role="alert"`. Reusable across all forms (booking, contact, newsletter).
- **Honeypot fake 200**: Return `{ success: true }` for bots (non-empty `website` field) — don't reveal detection.
- **Gallery hide on ≤1 image**: No point showing gallery with single image (same as hero).

## Phase 4

- **Data access via helpers, not array indices**: `getTeamMember("Maria Kordalewska")` instead of `teamMembers[0]`. Indices are brittle — reordering breaks silently.
- **`<h1>` on every subpage**: `SectionHeading` always renders `<h2>`. Subpages need manual `<h1>` inline. Future: add `as` prop to `SectionHeading`.
- **Extract values from URL constants**: `extractHandle(SOCIAL_LINKS.facebook, "facebook.com/")` instead of hardcoded `"wyjazdyzdziecmi"`. Resilient to URL changes.
- **`aria-label` on `target="_blank"` links**: Screen readers don't announce new tab. Add `aria-label="X (otwiera się w nowej karcie)"`.
- **`robots: { index: false }` on placeholder pages**: Pages without content shouldn't be indexed. Remove after adding full content.
- **`cn()` over template literals**: Project consistently uses `cn()` from clsx + tailwind-merge. Template literals bypass merge and can cause class conflicts.
- **Contact form pattern**: Identical to BookingForm but simpler (3 fields vs 8). Same 4-state machine (idle/submitting/success/error), same Zod + RHF + honeypot pattern.

## Phase 5

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

## Phase 6

- **Unicode escapes consistently**: Mixing literal Polish chars with unicode escapes in the same `.ts` file is easy to miss. Always use escapes in `.ts`, check in review.
- **Single Source of Truth for bios**: Don't duplicate person bio in `team.ts` and `trips.ts`. Import via `getTeamMember()` helper to keep one source.
- **Neutral section titles**: "Prowadząca" assumes gender/role. Use configurable `sectionTitle` prop with neutral default like "Współpraca".
- **SectionWrapper variant consistency**: When heading and content are in separate `SectionWrapper`s, they must share the same `variant` — otherwise visual "jump" in background color.
- **Semantic HTML for testimonials**: `<blockquote>` + `<footer>` + `<cite>` is the correct pattern for quotes/testimonials.
- **Lead magnet > newsletter**: "Pobierz poradnik" converts better than "Zapisz się na newsletter" — offer value exchange.
- **`TestimonialCard` pattern**: Follows `PlaceCard` structure — `ScrollAnimation` wrapper, staggered delay via `index` prop, semantic HTML inside.
- **`getFeaturedTestimonials(ids)` with type guard**: Filter by ID array + `.filter(Boolean)` for safe featured selection.

## Phase 7

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

## Poprawki Klientki 03.03.2026

- **`contentBlocks` pattern**: `{ type: "text" | "image", text?, src?, alt? }[]` in trip data. Replaces Gallery component — images interleaved with text blocks for richer layout.
- **Trip categories with URL filter**: `?kategoria=matka-corka` + `useSearchParams()` — simpler than separate pages per category.
- **React "adjust state during render"**: `if (pathname !== prevPathname) { setPrevPathname(pathname); reset(); }` — replaces `useEffect` anti-pattern, eliminates extra commit+paint cycle.
- **`role="region"` + `aria-label`**: Interactive components like calendars need both attributes for screen reader identification.
- **spotsTotal/spotsLeft pairs**: Always provide both — even if conditional rendering doesn't require both, data should be complete and consistent.
- **WaitlistForm when spotsLeft === 0**: Show waitlist form instead of hiding sold-out trips. Better UX and lead capture.

## Redesign 13.03.2026

- **CTA hierarchy**: Primary (terracotta) for main actions, Secondary (moss/olive) for lower-priority. Don't use same color for both.
- **HeroSlideshow component**: Separate `"use client"` component with `AnimatePresence mode="wait"`, `priority` only on first image. Auto-advance with `setInterval` + cleanup in `useEffect`.
- **Nav breakpoint with dropdown**: "O nas" has hover dropdown (Galeria, Opinie, Kontakt, Blog) on desktop, accordion on mobile. Reduces top-level items from 10 to 7. Hamburger shows on screens < lg.
- **Redirect vs placeholder**: When a menu item needs its own page, replace 301 redirect with a placeholder page (`robots: { index: false }`). Redirects cause duplicate links in navigation.
- **Trip cards 3-column grid**: `sm:grid-cols-2 lg:grid-cols-3` for upcoming trips. Removed `max-w-2xl` constraint.
- **USP before hero**: "Jedyne w Polsce..." text moved above HeroSection slideshow, directly under header.
- **Hero H1**: Changed from "Wyjazdy z Dziećmi" to "Warsztaty wyjazdowe dla dorosłych i dzieci". Logo text shortened to "Warsztaty wyjazdowe".
- **Grayscale removal**: Remove `grayscale` prop from Card type AND usage in TripCard in same commit to avoid build errors.

## Poprawki Konwersji 19.03.2026

- **React 19 Strict Mode + setState updater**: NEVER call side effects (analytics, API calls) inside `setState(prev => ...)` — updater function may fire 2x in Strict Mode. Pattern: `const newVal = ...; setState(newVal); sideEffect(newVal);`
- **Parallel worktrees need merge planning**: When implementing phases in parallel worktrees, ensure phases don't modify the same files. Files touched by >1 phase (HeroSection, Header, BookingForm) required manual merging.
- **SEO title triple update**: When changing meta title, always update ALL 3: `title.default`, `openGraph.title`, `twitter.title`. Easy to forget OG/Twitter.
- **SocialLink pattern**: Pass `platform="Facebook"` (display name with capital), normalize to lowercase inside `analytics.socialClick()`. Keeps aria-label correct and GA4 events consistent.
- **Reassurance text above CTA**: "Nie płacisz z góry" with Shield icon reduces friction. Pattern: `<p className="flex items-center gap-2 text-sm text-graphite-light">` + icon `text-moss`.
- **childCare field**: Optional `childCare?: string` in Trip type + Keystatic CMS (text, multiline) + `|| undefined` in mapper. Renders in TripPracticalInfo only when filled. Baby icon from lucide-react.
- **Hero H1 updated**: Changed from "Warsztaty wyjazdowe dla dorosłych i dzieci" to "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo." — empathetic, benefit-oriented.
- **CTA copy hierarchy**: "Zobacz wyjazdy" (Hero, passive) → "Sprawdź terminy" (Header/Menu, exploratory) → "Zarezerwuj miejsce" (Form/Sticky, action). Escalating commitment level.

## Kategorie/Kalendarz/Las 20.03.2026

- **`CATEGORY_CONFIG` as Single Source of Truth**: All category colors (calendar, legend, card badges) come from `src/lib/category-config.ts`. Never hardcode category colors in components — import from config.
- **Calendar color contrast**: Use colors from different parts of the color wheel: green (moss) → gold (mustard) → purple (lavender) → orange (terracotta). Amber/coral/terracotta were too similar before.
- **`formatDateRange(start, end)`**: Same month → `"15–18 kwietnia 2026"`, different months → `"28 marca – 1 kwietnia 2026"`. Polish genitive month names hardcoded (Intl.DateTimeFormat doesn't output genitive reliably).
- **Category pages need trips section**: All category landing pages should show upcoming trips from their category. Pattern: `async` page + `getUpcomingTripsByCategory(cat)` + conditional render `{trips.length > 0 && ...}`.
- **Optimize data fetching on listing pages**: `/wyjazdy` uses one `getAllTrips()` call and derives `upcomingTrips`, `pastTrips`, and `calendarTrips` from it.
- **ForestPattern SVG**: Inline SVG with `aria-hidden="true"`, `pointer-events-none`. Start at 6-7% opacity. Two variants: `fairytale` (rounded circles) for homepage, `realistic` (triangle pines) for /wyjazdy.
- **SectionWrapper variant alternation**: When inserting a new section, adjust `variant` props to maintain visual rhythm (default/alternate/default).
- **Tinted badges vs full-color calendar**: Card category badges use light tinted background (`bg-moss/15 text-moss`) to not compete with CTA buttons. Calendar cells use full saturated colors.
- **TripsFilter category validation**: Use `Object.keys(CATEGORY_CONFIG)` + `.includes()` instead of hardcoded category list.

## Poprawki UX 20.03.2026

- **Auto-isPast from dateEnd**: `isPast` is computed via `parseLocalDate(entry.dateEnd) < new Date()` in `mapTrip()`. CMS checkbox `isPast` is ignored. Requires ISR (`revalidate = 3600`).
- **`parseLocalDate(dateStr)`**: Parses `YYYY-MM-DD` as local midnight via `new Date(year, month - 1, day)`. Avoids UTC offset bug. Use everywhere instead of `new Date(dateStr)` for date-only strings.
- **ISR on trip-dependent pages**: `export const revalidate = 3600` on homepage, /wyjazdy, and all 4 category pages.
- **Two-month calendar**: `MonthGrid` sub-component renders one month; `TripCalendar` renders two side-by-side (`sm:grid-cols-2`).
- **Interactive legend filters**: Legend items are `<button>` with `aria-pressed`. Click toggles filter — non-matching trips get dimmed.
- **Testimonials date field**: Optional `date?: string` (YYYY-MM-DD). `getTestimonials()` sorts newest first. `getFeaturedTestimonials(ids)` preserves editorial order.

## Poprawki nazewnictwo/SEO/FAQ 20.03.2026

- **"warsztaty" not "wyjazdy" in UI copy**: All user-facing text uses "warsztaty" consistently. "wyjazdy" only in internal code.
- **SEO H1/H2 inversion**: H1 = descriptive keyword-rich overline, H2 = emotional headline. Both motion and reduced-motion variants must stay in sync.
- **FAQ on homepage**: `HomeFAQ` client component with `faqData` for schema.org reuse. `Accordion` is analytics-agnostic — tracking injected via `onToggle`.
- **FAQPage schema.org**: `getFAQSchema(faqData)` + `<StructuredData>` in `page.tsx`. Uses same `faqData` export — single source of truth.
- **Calendar filter auto-navigation**: `toggleFilter()` finds first upcoming trip in category and sets `currentYear`/`currentMonth` to that trip's month.
- **Card h-full + flex-col + mt-auto**: `Card` component uses `h-full flex-col`, content div uses `flex-1 flex-col`. TripCard buttons use `mt-auto pt-4`.
- **Empty state pattern**: `TripCardsSection` returns `null` when no upcoming trips.
- **Polish typographic quotes in JS strings**: `„"` (U+201E, U+201D) inside double-quoted JS strings cause parse errors. Use `\u201E` and `\u201D` escapes.
- **`toDate()` private helper in utils.ts**: Converts `string | Date` to `Date` using `parseLocalDate` for strings.

## Poprawki UI + Trip Video 21.03.2026

- **`<video>` as Server Component**: Native HTML5 `<video>` with `controls` doesn't need `"use client"`.
- **`preload="metadata"` over poster**: Browser extracts first frame automatically.
- **`playsInline` required for iOS**: Without it, iOS Safari forces fullscreen on play.
- **Video in `public/videos/`**: Vercel serves static files from `public/` via CDN. 8.6MB is fine.
- **`aria-label` on `<video>`**: Screen readers can't identify video content without it.
- **Optional CMS field pattern**: `videoUrl: fields.text()` in Keystatic + `entry.videoUrl || undefined` in mapper + `videoUrl?: string` in type.
- **`SectionWrapper` with reduced padding**: default is now `py-8 sm:py-10`. Category pages use `py-4 sm:py-6` (headers) or `py-6 sm:py-8` (content).
- **`getAllTrips()` sort**: Sorting in the data layer means all consumers automatically get chronological order.
- **Testimonial equal heights**: `blockquote` needs `h-full flex flex-col` + `flex-1` on quote text + `ScrollAnimation className="h-full"`.

## Poprawki UI + Nawigacja 21.03.2026

- **Multiple dropdowns — central state**: `openDropdown: string | null` in Header, not in each DropdownNavItem.
- **Non-clickable nav items = button, not Link**: `<Link href="">` navigates to `/`. Use `<button>` for dropdown headers.
- **`isNavActive("")` guard**: `"".startsWith("")` is always `true`. Add `if (!href) return false`.
- **Click-outside detection for dropdowns**: `useEffect` with `document.addEventListener("click")` + `navRef.contains()`.
- **StarRating as shared component**: `src/components/shared/StarRating.tsx` with `role="img"` + `aria-label`.
- **Hash navigation cross-page**: `/#faq` requires `id="faq"` on the target `SectionWrapper`.
- **Conditional CTA on past trips**: Don't show action buttons on `isPast` trips.

## Logo SVG + Favicon 22.03.2026

- **CSS Art → SVG component**: Convert to `<svg>` for clean scaling, Tailwind color control via `currentColor`.
- **Logo fonts separate from page fonts**: Logo uses Lora + Caveat. Page uses Georgia + Inter.
- **`font-[family-name:var(--font-lora)]`**: Tailwind v4 syntax for referencing CSS variable fonts.
- **Mobile logo = sygnet only**: `hidden md:flex` on text part.
- **SVG favicon in App Router**: Place `icon.svg` in `src/app/` — Next.js auto-detects.
- **Logo `aria-label` on Link, `aria-hidden` on SVG**.

## Blog na homepage 22.03.2026

- **`BlogTeaser` Server Component on homepage**: Grid `sm:grid-cols-2 lg:grid-cols-3`. Returns `null` when no posts.
- **Blog reader — NOT Keystatic reader**: Keystatic `createReader` bug. Fix: direct `fs.readdir` + `js-yaml` + `Markdoc.parse/transform`.
- **Blog content structure**: Each post = `content/blog/{slug}/` with `index.yaml` + `content.mdoc`.
- **Blog post `image` field**: Optional `image?: string`. Path in `public/images/blog/`.

## Redesign Leśna Zieleń 22.03.2026

- **Turbopack CSS cache**: After changing `@theme {}` colors, `rm -rf .next` + restart required.
- **Rectangular design system**: `rounded-none` everywhere. Exception: `Badge` uses `rounded-sm`.
- **Color variable names preserved**: `--color-terracotta` now holds green `#2D6A4F`. Renaming would break 100+ usages.

## Keystatic Audit 23.03.2026

- **CMS select must match TypeScript union**: Always keep CMS field options in sync with TypeScript union types.
- **Blog `image` field missing from CMS schema**: When adding optional fields to content YAML, always add to `keystatic.config.ts` too.
- **Explicit `js-yaml` dependency**: Was transitive only. Fix: `npm install js-yaml` + `@types/js-yaml`.
- **Keystatic consistency audit checklist**: Check 5 layers: (1) `keystatic.config.ts`, (2) `content/` YAML, (3) `src/data/*.ts` readers, (4) `src/types/*.ts`, (5) `package.json`.

## Code Review Audit 24.03.2026

- **CSRF Origin validation on API routes**: All POST routes must verify `Origin` header against `ALLOWED_ORIGINS`.
- **Vercel IP extraction — last, not first**: Use `.split(",").at(-1)!.trim()`. First entry is user-controllable.
- **StructuredData XSS prevention**: Apply `.replace(/</g, "\\u003c")` before `dangerouslySetInnerHTML`.
- **Rate limiter needs size cap**: `MAX_IPS` constant (10,000) + evict expired entries.
- **`parseLocalDate` must validate input**: Guard: `if (parts.length !== 3 || parts.some(isNaN)) throw Error`.
- **No duplicate type sources for forms**: Use only `z.infer<typeof schema>`.
- **Past trips must not claim InStock**: Guard `if (trip.pricing.length > 0 && !trip.isPast)` before emitting `offers`.
- **Breadcrumb schema needs absolute URLs**: Prepend `SITE_CONFIG.url` to relative paths.
- **Blog `BLOG_DIR` must use `process.cwd()`**: Relative paths resolve differently on Vercel.
- **`getBlogPost` needs try/catch**: `fs.readFile` throws uncaught ENOENT → 500 error.
- **HTML entities forbidden in .tsx**: Use literal UTF-8 characters.
- **Dead CSS removal**: `grep` class names before keeping CSS.

## Form Delivery System 24.03.2026

- **`google-auth-library` not `googleapis`**: `googleapis` = 82MB, cold start on Vercel. `google-auth-library` (~5MB) + raw `fetch` sufficient.
- **Turnstile invisible mode requires `onSuccess` callback**: `getResponse()` returns `undefined` in invisible mode.
- **Turnstile reset on ALL error paths**: Token is single-use. After 429, `!ok`, or `catch` — `reset()` required.
- **Server-side token enforcement**: When `TURNSTILE_SECRET_KEY` is set but no token arrives, reject.
- **`turnstileToken: z.string().min(1).optional()`**: Without `.min(1)`, empty `""` bypasses verification.
- **CSV/formula injection in Google Sheets**: Apply `sanitizeCell()` — prefix `=`, `+`, `-`, `@` with apostrophe.
- **Resend lazy init, not singleton**: Use `getResendClient()` that creates instance only when needed.
- **React Email `<Text>` rejects number children**: Use template literals.
- **Email templates import from `constants.ts`**: Single Source of Truth.
- **RODO in email footers**: Transactional = art. 6 ust. 1 lit. b. Newsletter = art. 6 ust. 1 lit. a.
- **`ALLOWED_ORIGINS` in constants.ts**: Extract from 4 API routes. DRY.
- **Don't log health data**: `dietaryNeeds` is RODO art. 9 special category.
- **`Promise.allSettled` for graceful degradation**: Sheets + email run in parallel.
- **`tsconfig.json` exclude `docs/`**: Reference code in `docs/` with `"use server"` directives gets picked up.

## Poprawki UI 24.03.2026

- **DecorativeUnderline SVG pattern**: Hand-drawn curved line under accent text. `underline` boolean prop on SectionHeading.
- **Label changes need 4 sync points**: (1) `category-config.ts`, (2) `keystatic.config.ts`, (3) `navigation.ts`, (4) component hardcoded text.
- **Navigation label = page meta title**: When changing nav item, also update page's `metadata.title`, breadcrumb, heading.
- **Nav active underline vs bg highlight**: `border-b-2 border-moss` is cleaner than `bg-moss/10`.
- **Empty state = opportunity**: Show `JoinUsNewsletter` with newsletter signup instead of `null`.
- **FooterNewsletter as separate component**: Don't bloat existing `NewsletterForm`.
- **`consentNewsletter` optional in schema**: `.optional()` in Zod so existing `NewsletterForm` doesn't require it.
- **All buttons bg-moss, not terracotta**: Update Button.tsx variants AND grep for hardcoded terracotta.
- **URL rename needs 4 updates**: (1) directory, (2) `ROUTES`, (3) sitemap.ts, (4) redirect in `next.config.ts`.
- **Reduced spacing pattern**: SectionWrapper default `py-8 sm:py-10`. Category pages `py-4 sm:py-6` or `py-6 sm:py-8`.
- **System fonts in Tailwind v4 `@theme`**: Set directly in `@theme { --font-heading: Georgia, serif; }`. Do NOT use `next/font`.
- **TripCardHorizontal on category pages**: Horizontal layout on /wyjazdy + 4 category pages. Vertical only on homepage.
- **Consistent bottom CTA pattern**: "Szukasz czegoś dostępnego teraz?" + "Zobacz wszystkie warsztaty".

## JoinUsNewsletter Empty State 25.03.2026

- **Empty state cognitive overload**: Original had too many competing elements. Single clear path needed.
- **Uproszczony empty state pattern**: Nagłówek + jeden checkbox zgody + "Powiadom mnie" + sekcja z jednym CTA.
- **Lokalny schemat Zod**: Stwórz lokalny schemat (`passiveNewsletterSchema`) zamiast rozszerzać główny.
- **API schema bardziej permisywne niż UI schema**: API akceptuje opcjonalne pola, UI ma własne schematy.
- **JoinUsNewsletter className prop**: Domyślny `bg-moss/10`. Na category pages sprawdź kolory sąsiednich sekcji.

## Poprawki kolorystyki sekcji + Footer 25.03.2026

- **Schemat kolorów sekcji**: Hero/intro = alternate, sekcja główna = default, trips/CTA = `bg-moss/10`.
- **Footer padding = SectionWrapper default**: `py-8 sm:py-10`.
- **Sąsiednie sekcje nie mogą mieć identycznego tła**: Minimum 3 różne kolory dla 3 sąsiednich sekcji.

## Keystatic CMS Migration 25.03.2026

- **`shortBio` field for teasers**: `AboutTeaser` uses `shortBio ?? bio` (graceful fallback).
- **FAQ singleton vs homepage hardcode**: CMS singleton `faq` feeds 3 consumers: UI, schema.org, analytics.
- **Projects collection for `/inne-projekty`**: Each project = slug YAML. Adding = new YAML file, zero code changes.
- **Benefit cards icon mapping pattern**: CMS stores icon name as string, code maps via `ICON_MAP: Record<string, LucideIcon>`.
- **Shared `BenefitCards` component**: Eliminates 4x duplication across category pages.
- **What should stay hardcoded**: Hero H1/H2, CategoryCards, navigation, contact labels, category intro texts.
- **CMS migration checklist**: 5 layers: keystatic schema, content YAML, data reader, types, component.

## Keystatic UX + Security 25.03.2026

- **`columns` in collection config**: Shows extra fields in CMS list view.
- **`ui.navigation` groups**: Organize sidebar into logical sections.
- **`entryLayout: "content"`**: Makes blog editing feel like a real editor.
- **Disable admin UI in production**: Guard with env var check. Apply to both layout.tsx and API route.
- **`React.cache()` on all readers**: Deduplicates filesystem reads within single request.
- **Slug validation in readers**: Add `warnInvalidSlug(slug, collection)`.
- **GitHub mode for client access**: GitHub App + 5 env vars on Vercel.

## Full Code Review 25.03.2026

- **CSP must include Turnstile domains**: `challenges.cloudflare.com` in `script-src`, `connect-src`, AND `frame-src`.
- **RODO consent guard on API level**: `if (!consentRodo && !consentNewsletter) return 400`.
- **Don't leak Google API error details**: Log full error, throw only status.
- **React 19: `ref` as regular prop**: `forwardRef` is deprecated. Migrate to `ref?: Ref<T>` in props.
- **HoneypotField needs dynamic `id`**: Use `id={props.id ?? props.name ?? "website"}`.
- **Schema.org `offers.availability`**: `InStock`/`LimitedAvailability`/`SoldOut`. No offers for past trips.
- **Turnstile `remoteip` parameter**: Pass client IP for stronger replay protection.
- **Zod: always `.max()` on string fields**: Prevent overflow.
- **Phone regex must require digits**: Add `.regex(/\d/)`.
- **DRY across card components**: Extract shared helpers to `trip-card-utils.tsx`.
- **Safe CMS lookups**: Never use `!` non-null assertion. Use conditional render.
- **Blog OG/Twitter image**: `generateMetadata` must include images for social sharing.
- **Sitemap: past trips = yearly, low priority**: `changeFrequency: "yearly"`, `priority: 0.4`.

## Security Audit 25.03.2026

- **Blog slug path traversal**: Guard with `isSafeSlug()`: reject `/`, `\`, `..`, leading `.`.
- **CSRF: require Origin in production**: `if (!origin) return 403` in production.
- **Shared `validateRequest()` helper**: `src/lib/api-security.ts`. DRY security enforcement.
- **Content-Length check before JSON parse**: Reject > 50KB before `request.json()`.
- **`VERCEL_PROJECT_PRODUCTION_URL`**: Not `VERCEL_URL` (preview deployments expand CSRF surface).
- **PII in production `console.error`**: Log only `trip`/`timestamp`, not `name`/`email`.
- **Return 500 on total delivery failure**: Don't return `{ success: true }` when both fail.
- **Rate limiter is per-instance on Vercel**: Acknowledged limitation. Turnstile is primary defense.

## UX/UI Audit 25.03.2026

- **Placeholder contrast WCAG 1.4.3**: Remove `/60` opacity — use `placeholder:text-graphite-light` directly.
- **Hover color contrast**: Must pass 4.5:1 WCAG AA — not just default states.
- **`svh` over `vh` on mobile hero**: iOS Safari's address bar makes `vh` unreliable.
- **Touch targets 44x44px (WCAG 2.5.8)**: Add `min-h-11 min-w-11` to all interactive icon buttons.
- **Loading text accessibility**: Use `<span aria-label="Wysyłanie">…</span>`.
- **`tel:` href must strip spaces**: `.replace(/\s/g, "")` in `href`.
- **Use `Button` component in error/404 pages**: Raw elements miss focus-visible, active:scale.

## Mobile Audit 25.03.2026

- **Touch targets on ALL interactive elements**: Calendar nav, legend buttons, Button sm — all need 44px minimum.
- **MobileMenu needs `overflow-y-auto`**: Without it, expanded sections push CTA below viewport.
- **`svh` on ALL viewport-height elements**: Use `svh` consistently everywhere.
- **`safe-area-inset-bottom` on fixed bottom elements**: `pb-[env(safe-area-inset-bottom,12px)]`.
- **Input font size >= 16px**: Always `text-base` minimum. Never `text-sm` on form inputs.
- **`inputMode="numeric"` over `type="number"`**: Shows numeric keyboard without side effects.
- **`autoComplete` attributes on form fields**: Reduces completion time ~30%.
- **`priority` deprecated in Next.js 16**: Use `loading="eager" fetchPriority="high"` on LCP images.
- **CookieBanner checkbox labels need `items-start`**: Not `items-center`.
- **Grid breakpoint consistency**: All grids use `sm:grid-cols-2` (640px).

## Deployment & Handover 26.03.2026

- **GitHub Transfer > push to new repo**: Preserves all history, branches, issues. Old URLs redirect.
- **Don't hardcode GitHub username in docs**: Use `[OWNER]` placeholder.
- **Vercel Hobby is non-commercial**: Client's commercial site requires Pro ($20/month).
- **Vercel = hosting, Hostinger = DNS only**: No hosting package needed on Hostinger.
- **Coolify minimum 8GB RAM for Next.js**: KVM 1 (4GB) crashes during build.
- **`git pull` before every work session**: Client CMS edits create commits on same repo.
- **Netlify new accounts (post 04.09.2025)**: Credit-based pricing, ~20 deploys/month. CMS commits burn limit.
- **Hostinger shared hosting ≠ Node.js**: Only static export possible (loses forms).
- **Repo transferred to client**: `https://github.com/mariaejk/wyjazdy-z-dziecmi.git`.
- **Railway Hobby also prohibits commercial use**: Zero advantage over Vercel at any tier.
- **Full hosting decision documented**: `docs/decyzja-hosting-platforma.md`.

## Cloudflare Workers + Airtable Migration 27.03.2026

- **@opennextjs/cloudflare 1.18.0** supports Next.js 16.1.6+ (`^16.1.5` peer dep). `@cloudflare/next-on-pages` is fully deprecated (last update 09.2025, no Next.js 16 support).
- **wrangler 4.65+** required (peer dep). Current: 4.77.0.
- **Bundle size limit**: 10 MiB **compressed** on paid plan, NOT 25MB uncompressed. This project: 4.3MB compressed — OK.
- **`open-next.config.ts` required**: Full config with wrapper/converter/proxy/cache/queue/edgeExternals. `{}` or `{ default: {} }` throws validation error.
- **`compatibility_date: "2025-05-05"`** minimum for FinalizationRegistry. `nodejs_compat` flag required.
- **ISR requires Durable Objects** ($5/month paid plan) + R2 bucket. Without them: use `incrementalCache: "dummy"` — pages pre-rendered at build time only.
- **`fs.readdir` confirmed not working** on Workers runtime (GitHub issue #734). Blog reader migrated to Keystatic reader API.
- **Keystatic `resolveLinkedFiles: true`** returns `{ node: Node }` for markdoc contentField. Without it, `entry.content` is a lazy loader — `.node` returns `undefined` silently. Always add runtime guard.
- **`getCloudflareContext({ async: true })`** — without `{ async: true }`, TypeScript picks synchronous overload, `await` becomes no-op, KV never works.
- **Dynamic import for CF bindings**: `await import("@opennextjs/cloudflare")` in try/catch — returns `undefined` on Vercel/dev. Enables dual deployment.
- **KVBinding type locally defined** in `rate-limit.ts` — avoids dependency on `@cloudflare/workers-types`. Exported and imported in `api-security.ts`.
- **Airtable REST API** simpler than Google Sheets: `fetch(url, { headers: { Authorization: "Bearer ${token}" }, body: JSON.stringify({ fields }) })`. No SDK needed. Named fields instead of positional arrays — safer.
- **Airtable still needs `sanitizeCell()`** — CSV injection when client exports to Excel/LibreOffice. `=`, `+`, `-`, `@` prefix with apostrophe.
- **Airtable Free tier**: 1,000 API calls/month + 1,000 records/base (changed Jan 2025). Low traffic landing page = OK.
- **OpenNext Windows warning**: "not fully compatible with Windows, use WSL". Build passes but runtime may have issues. Document in config.
- **`CF_PAGES_URL`** auto-set by CF Pages — add to `ALLOWED_ORIGINS`. Keep Vercel fallback during transition.
- **`warnInvalidSlug()`** must be called in all CMS readers — blog was missing it after migration.
- **ISR silently ignored on CF Workers**: `revalidate=3600` exports are kept for Vercel compatibility but do nothing with `incrementalCache: "dummy"`. Auto-isPast (trip dateEnd check) only updates on rebuild. Set up daily CF Cron Trigger or GitHub Actions cron for production.
- **`append*` functions must NOT catch errors**: Errors must propagate to `Promise.allSettled` in routes for `allFailed` detection. Internal try/catch makes Airtable failures invisible — leads silently lost.
- **4 instrukcje do aktualizacji po deploy**: `instrukcja-zarzadzanie.md` (6x Google Sheets), `setup-external-services.md` (12x), `instrukcja-developer.md` (8x), `instrukcja-przekazanie-projektu.md` (51x). Aktualizować DOPIERO po deploy na CF Workers — do tego momentu Vercel + Sheets są aktualne.
- **Dual deployment transition**: Kod na branchu `feature/cloudflare-airtable-migration` działa zarówno na Vercel jak i CF Workers. Instrukcje aktualizować dopiero po DNS cutover, nie przed.

## Vercel + Keystatic GitHub OAuth Setup 29.03.2026

- **Vercel "Redeploy" nie odczytuje nowych env vars**: "Redeploy of X" kopiuje stary build. Trzeba nowy push do repo albo "Redeploy" BEZ cache. Nawet wtedy — sprawdź czy build trwa sensownie (>1 min), nie 38 sekund.
- **Vercel może mieć 2 projekty dla tego samego repo**: Nowy projekt dostaje suffix (np. `-one`). Domena `wyjazdy-z-dziecmi.vercel.app` ≠ `wyjazdy-z-dziecmi-one.vercel.app`. Zawsze sprawdź **Settings → Domains** by znać aktualny URL.
- **GitHub App Callback URL musi dokładnie pasować**: `redirect_uri` mismatch = "Be careful!" error. Po zmianie domeny zaktualizuj Callback URL w GitHub App.
- **GitHub App "User-to-server token expiration" wymagane przez Keystatic**: Bez tego GitHub nie zwraca `refresh_token` i `expires_in` — Keystatic parsowanie failuje z "Authorization failed".
- **GitHub token endpoint zwraca 200 nawet na błędy**: `tokenRes.ok` jest `true`, ale body zawiera `{ error: "bad_verification_code" }`. Keystatic failuje na `tokenDataResultType.create()` w catch bloku.
- **Jawne przekazanie env vars do `makeRouteHandler()`**: Zamiast polegać na wewnętrznym `process.env` w Keystatic, przekaż `clientId`, `clientSecret`, `secret` jawnie w route.ts.
- **Debug OAuth flow**: Stwórz osobny endpoint z `?action=login` (redirect do GitHub) i `?action=callback` (wymiana code→token). Pozwala przetestować client_id + secret bez Keystatic.
- **Wiele GitHub Apps = chaos**: Każda nowa App ma inny client_id/secret. Trzymaj się jednej i zweryfikuj że env vars na Vercel pasują do AKTUALNEJ App (nie starej).
- **`KEYSTATIC_SECRET` = losowy hex 64 znaki**: Wygeneruj: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Do szyfrowania refresh_token cookie.
