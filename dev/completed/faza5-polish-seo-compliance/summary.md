# Faza 5: Polish, SEO, Compliance — UKOŃCZONA

## Data: 2026-02-26

## Zrealizowane zadania (29/31)

### Etap 1: SEO Foundation (7/7)
- [x] 1.1 `sitemap.ts` — MetadataRoute.Sitemap, wszystkie publiczne strony + tripy
- [x] 1.2 `robots.ts` — Allow /, Disallow /api/, sitemap URL
- [x] 1.3 Twitter Card metadata — layout.tsx + wyjazdy/[slug]/page.tsx
- [x] 1.4 Structured Data — Organization — StructuredData component + getOrganizationSchema()
- [x] 1.5 Structured Data — Event + FAQPage — getEventSchema(), getFAQSchema()
- [x] 1.6 Structured Data — BreadcrumbList — na 6 podstronach
- [x] 1.7 Custom 404 — not-found.tsx z Container + Link

### Etap 2: Newsletter Form + API (4/4)
- [x] 2.1 Zod schema newsletter — email + consentRodo + website
- [x] 2.2 API route newsletter — rate limit + honeypot + Zod
- [x] 2.3 NewsletterForm component — RHF + 4-state machine + kompaktowy layout
- [x] 2.4 Integracja w Footer — zastąpiono placeholder

### Etap 3: Cookie Banner + Consent (5/5)
- [x] 3.1 Typy cookie consent — ConsentCategory, CookieConsent, stałe
- [x] 3.2 useCookieConsent hook — useSyncExternalStore (SSR-safe)
- [x] 3.3 CookieBanner component — 3 przyciski równej wagi, panel szczegółowy
- [x] 3.4 Integracja w layout
- [x] 3.5 CookieSettingsButton w Footer

### Etap 4: Google Analytics (3/3)
- [x] 4.1 GoogleAnalytics component — warunkowe ładowanie po zgodzie
- [x] 4.2 Integracja w layout
- [x] 4.3 CSP dla GA — domeny w next.config.ts

### Etap 5: Security + Polish (5/5)
- [x] 5.1 Security headers — X-Frame-Options, CSP, HSTS, etc.
- [x] 5.2 Manifest + icons metadata
- [x] 5.3 Logger z production guard
- [x] 5.4 aria-label na linkach social w Footer
- [x] 5.5 SectionHeading prop `as`

### Etap 6: Build verification (3/5)
- [x] 6.5 npm run build + npm run lint — zero błędów
- [ ] 6.1-6.4 Audyty (a11y, kontrast, responsive, Lighthouse) — wymagają ręcznego testowania

## Nowe pliki (15)
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/not-found.tsx`
- `src/app/manifest.ts`
- `src/app/api/newsletter/route.ts`
- `src/lib/structured-data.ts`
- `src/lib/validations/newsletter.ts`
- `src/lib/logger.ts`
- `src/components/shared/StructuredData.tsx`
- `src/components/shared/GoogleAnalytics.tsx`
- `src/components/shared/NewsletterForm.tsx`
- `src/components/layout/CookieBanner.tsx`
- `src/components/layout/CookieSettingsButton.tsx`
- `src/hooks/useCookieConsent.ts`
- `src/types/cookies.ts`

## Zmodyfikowane pliki
- `src/app/layout.tsx` — twitter, icons, StructuredData, CookieBanner, GoogleAnalytics
- `src/app/wyjazdy/[slug]/page.tsx` — twitter, Event+FAQ+Breadcrumb JSON-LD
- `src/app/o-nas/page.tsx` — breadcrumb
- `src/app/wyjazdy/page.tsx` — breadcrumb
- `src/app/kontakt/page.tsx` — breadcrumb
- `src/app/opinie/page.tsx` — breadcrumb
- `src/app/single-parents/page.tsx` — breadcrumb
- `src/components/layout/Footer.tsx` — NewsletterForm, CookieSettingsButton, aria-labels
- `src/components/ui/SectionHeading.tsx` — as prop
- `src/app/api/booking/route.ts` — logger
- `src/app/api/contact/route.ts` — logger
- `next.config.ts` — security headers + CSP

## Code Review (10/12 naprawione)

Review wykrył 3 🔴 blocking, 5 🟠 important, 4 🟡 nit. Naprawiono 10/12:
- 🔴 `isLoaded` bug → sentinel value w `useSyncExternalStore`
- 🔴 Brakujące ikony → zakomentowane z TODO
- 🔴 `EventCancelled` → `EventScheduled` dla minionych wyjazdów
- 🟠 Template literals → `cn()` w CookieBanner
- 🟠 Focus management w dialogu cookie (panelRef)
- 🟠 Escape zamyka banner otwarty z footer
- 🟠 Placeholder strony usunięte z sitemap
- 🟡 Wcięcia, komentarz przy type cast

Pominięte (celowo): `lastModified` w sitemap (brak danych), waga wizualna przycisków RODO (do konsultacji z prawnikiem).

Pełny raport: `faza5-code-review.md`, checklist: `do-poprawy.md`

## Lessons learned
- **useSyncExternalStore > useState+useEffect** for localStorage: React 19 lint rules flag setState in effects. useSyncExternalStore properly syncs external state (localStorage) with React.
- **Sentinel value for SSR hydration**: `getServerSnapshot()` returns `"__ssr__"` (unique string), `getSnapshot()` returns `""` or JSON. `isLoaded = raw !== SERVER_SENTINEL` correctly distinguishes SSR from client.
- **Cookie banner visibility**: Derive from consent state + footer trigger, don't sync with useState in useEffect. `isVisible = showBanner || openedFromFooter`.
- **Focus management in role="dialog"**: When toggling panel content, move focus to first focusable element via `useEffect` + `querySelector`.
- **Schema.org EventStatus**: `isPast` ≠ cancelled. Past events that happened = `EventScheduled` (default). `EventCancelled` only for truly cancelled events.
- **CSP needs 'unsafe-inline' + 'unsafe-eval'**: Next.js uses inline scripts and eval in dev/prod. Without these, the page breaks.
- **StructuredData in `<head>`**: Use `<head>` element in layout.tsx for Organization schema. Page-level schemas go in page components.
- **Placeholder pages out of sitemap**: Pages with `robots: { index: false }` should NOT appear in sitemap.xml — contradictory signals to crawlers.

## Otwarte kwestie do przyszłości
- [ ] Wygenerować ikony (icon-192.png, icon-512.png, apple-touch-icon.png) z logo klientki
- [ ] Skonsultować wagę wizualną przycisków cookie banner z prawnikiem ds. RODO
- [ ] Ręczne audyty: a11y klawiatura, kontrast kolorów, responsive 5 breakpoints, Lighthouse
- [ ] Dodać `lastModified` do sitemap gdy pojawią się daty modyfikacji treści
