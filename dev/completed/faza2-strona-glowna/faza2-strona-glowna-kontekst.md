# Kontekst: Faza 2 — Strona Główna

> **Branch:** `feature/faza2-strona-glowna`
> **Ostatnia aktualizacja:** 2026-02-26 (etap 2F — FAZA 2 UKONCZONA)

---

## Powiązane pliki

### Istniejące (do odczytu/modyfikacji):
| Plik | Rola |
|------|------|
| `src/app/page.tsx` | Strona główna — obecnie placeholder, docelowo złożenie sekcji |
| `src/app/layout.tsx` | Root layout z Header, Footer, fontami |
| `src/app/globals.css` | Design system: kolory, fonty, focus, selection, reduced-motion |
| `src/types/trip.ts` | Typ `Trip` i powiązane typy (schedule, pricing, FAQ, gallery, etc.) |
| `src/lib/constants.ts` | SITE_CONFIG, ROUTES, CONTACT, SOCIAL_LINKS |
| `src/lib/utils.ts` | cn(), formatDate(), formatDateShort(), formatCurrency() |
| `src/components/layout/Container.tsx` | Wrapper max-w-7xl z padding |
| `docs/tresc_na_strone.md` | Treści: hero, wyjazd "Matka i Córka", O nas, miejsca |

### Do utworzenia:
| Plik | Rola |
|------|------|
| `src/data/trips.ts` | Dane wyjazdów (Matka i Córka + Yoga i Konie placeholder) |
| `src/components/ui/Button.tsx` | Przycisk CTA z wariantami |
| `src/components/ui/SectionWrapper.tsx` | Wrapper sekcji z alternate bg |
| `src/components/ui/SectionHeading.tsx` | Nagłówek h2 sekcji |
| `src/components/ui/Badge.tsx` | Tag/etykieta (data, status) |
| `src/components/ui/Card.tsx` | Karta z obrazem i treścią |
| `src/components/shared/ScrollAnimation.tsx` | Animacja scroll (motion/react) |
| `src/components/home/HeroSection.tsx` | Hero pełnoekranowy |
| `src/components/home/TripCard.tsx` | Kafelek wyjazdu |
| `src/components/home/TripCardsSection.tsx` | Sekcja z gridem kafelków |
| `src/components/home/AboutTeaser.tsx` | Teaser "O nas" |
| `src/components/home/OpinionsTeaser.tsx` | Placeholder opinii |

---

## Decyzje techniczne

### 1. Motion — import i prefers-reduced-motion
```tsx
// ZAWSZE tak:
import { motion } from "motion/react";

// NIGDY:
// import { motion } from "framer-motion"; ← crash z React 19
```
- `prefers-reduced-motion`: sprawdzać via hook `useReducedMotion()` z motion/react LUB via CSS media query
- globals.css już ma `@media (prefers-reduced-motion: reduce)` z `animation-duration: 0.01ms`

### 2. Button — asChild vs href
- Dla linków wewnętrznych: Button z `href` prop renderuje `<Link>`
- Dla akcji: Button bez href renderuje `<button>`
- Nie używamy `asChild` pattern (zbyt złożony na MVP) — prosta prop `href`

### 3. Hero image strategy
- `hero.jpg` jako tło z overlay (nie CSS background — next/image dla optymalizacji)
- `priority` prop dla LCP
- `sizes="100vw"` (pełna szerokość)
- Overlay: ciemny gradient od dołu dla czytelności tekstu

### 4. TripCard — link do nieistniejącej podstrony
- Link do `/wyjazdy/matka-i-corka` — podstrona powstanie w Fazie 3
- Next.js pokaże 404, to OK na etapie dev
- Alternatywa: `scroll-to` do sekcji na stronie głównej (ale gorsze UX docelowo)

### 5. Ikony w Hero
- Zamiast emoji (🌿💛✨) użyjemy Lucide icons: `Leaf`, `Heart`, `Sparkles`
- `strokeWidth={1.5}` — zgodne z design system

### 6. Minione wyjazdy
- `isPast: true` w danych → `grayscale(100%)` na obrazie karty
- Na razie oba wyjazdy są aktualne (isPast: false)
- Logika gotowa na przyszłość

### 7. Numeracja plików — konwencja
- UI components: `src/components/ui/` (reużywalne)
- Home-specific: `src/components/home/` (tylko strona główna)
- Shared: `src/components/shared/` (cross-page, np. ScrollAnimation)

---

## Zależności

### Zewnętrzne (już zainstalowane):
- `motion` 12.34 — animacje scroll
- `lucide-react` 0.575 — ikony
- `clsx` 2.1 + `tailwind-merge` 3.5 — cn()
- `next` 16.1.6 — Image, Link, App Router

### Wewnętrzne (między etapami):
```
2A (dane) ──┐
2B (UI)  ───┼──→ 2D (sekcje) ──→ 2E (page.tsx) ──→ 2F (weryfikacja)
2C (scroll) ┘
```
- Etapy 2A, 2B, 2C są niezależne — mogą być robione równolegle
- Etap 2D wymaga wszystkich trzech
- Etap 2E wymaga 2D
- Etap 2F wymaga 2E

---

## Treści z docs/tresc_na_strone.md

### Hero:
- Tytuł: "WYJAZDY Z DZIEĆMI"
- Podtytuł: "Projekt, który zrodził się z potrzeby spędzania jakościowego czasu z dziećmi."
- Korzyści:
  1. Miejsca w otoczeniu natury, które przynoszą spokój i ukojenie
  2. Warsztaty rozwojowe, które zapraszają w podróż wgłąb siebie
  3. Mnóstwo niebanalnych atrakcji, lepszych od niejednej bajki!

### Wyjazd "Matka i Córka — Wspólny Rytm":
- Slug: `matka-i-corka`
- Termin: 6–8 marca
- Miejsce: Kacze Bagno
- Współpraca: Ilona Bekier-Ekwa
- Ceny: dorosły pokój 1400, dorosły sala 1100, dziecko <8 750 zł
- Zaliczka: 450 zł
- Pełny program 3 dni (piątek–niedziela)
- Opis: kompletny (krótki + długi)

### Wyjazd "Yoga i Konie":
- Slug: `yoga-i-konie`
- Treść do uzupełnienia — placeholder

### O nas (teaser):
- Maria Kordalewska — wieloletnia organizatorka...
- Skrócona wersja na stronę główną, pełna na /o-nas

---

## Notatki z sesji

### Etapy 2A+2B+2C (2026-02-26)
- **Unicode quotes bug:** Polskie cudzysłowy `„"` (U+201E/U+201D) w stringach JS powodowały parse error. Rozwiązanie: unicode escapes `\u201E`/`\u201D` w trips.ts.
- **Motion types:** `Record<string, { hidden: object; visible: object }>` nie pasuje do motion props. Fix: `as const` na obiekcie variants.
- **useReducedMotion:** Eksportowane z `motion/react` — działa OK z React 19.
- **Button:** Discriminated union `ButtonAsLink | ButtonAsButton` zamiast jednego typu — czyste rozdzielenie props.
- **Card:** `grayscale` prop gotowy na przyszłe minione wyjazdy (isPast).
- **Build + Lint:** PASS (0 errors).

### Etap 2D (2026-02-26)
- **HeroSection:** Client component z motion/react (fade-up on load, nie scroll). `useReducedMotion()` — skip animacji. Gradient overlay `from-black/70 via-black/40 to-black/20`. Min-h `85vh`.
- **TripCard:** Kompozycja Card + Badge + ikony (Calendar, MapPin). `line-clamp-3` na opisie. `group-hover:underline` na CTA. Grayscale gotowe (isPast).
- **TripCardsSection:** Grid `sm:grid-cols-2`, staggered ScrollAnimation z delay `index * 0.15`.
- **AboutTeaser:** Ikona Users zamiast zdjęcia Marii (brak zdjęcia). HTML entities `&bdquo;` / `&rdquo;` dla polskich cudzysłowów.
- **OpinionsTeaser:** Ikona Quote. Placeholder tekst z zachętą. CTA do /wyjazdy.
- **Decyzja:** Komponenty `TripCardsSection`, `AboutTeaser`, `OpinionsTeaser` to Server Components (ScrollAnimation jest client boundary). Tylko `HeroSection` jest "use client" (direct motion usage for initial animation).
- **Build + Lint:** PASS (0 errors).

### Etap 2E (2026-02-26)
- **page.tsx:** Zamieniono placeholder na 4 sekcje: `<HeroSection />` → `<TripCardsSection />` → `<AboutTeaser />` → `<OpinionsTeaser />`. Fragment (`<>...</>`) zamiast wrapper div.
- **Footer newsletter:** Poprawki z code review Fazy 1 już zastosowane (form wrapper, cursor-not-allowed, opacity-60).
- **Build + Lint:** PASS (0 errors). Dev server kompiluje stronę poprawnie.

### Etap 2F (2026-02-26)
- **Responsive fixes:** TripCardsSection gap-6 sm:gap-8 (było gap-8). Card sizes z `calc(100vw - 2rem)`. Card padding p-4 sm:p-5 lg:p-6 (3 breakpoints). SectionHeading mb-8 sm:mb-10 lg:mb-12.
- **Weryfikacja:** Wszystkie 7 punktów PASS (build, lint, responsive, animations, reduced-motion, navigation, images).
- **FAZA 2 UKONCZONA** — 36/36 zadań wykonanych. Gotowe do code review.

### Code Review (2026-02-26)
- **Decyzja:** APPROVE WITH COMMENTS (0 blocking, 4 important, 5 nit, 4 suggestion)
- **Raport:** `dev/active/faza2-strona-glowna/review-faza-2.md`
- **Kluczowe do poprawy:** HeroSection reduced-motion (niespojnosc), AboutTeaser bio (brak "nauczycielka jogi"), CTA href (#wyjazdy zamiast /wyjazdy), Button typ rozszerzenie.
