# Plan: Redesign wizualny + poprawki klientki 13.03

**Branch:** `feature/redesign-wizualny-13-03`
**Ostatnia aktualizacja:** 2026-03-13

## Kontekst

Strona wyjazdyzdziecmi.pl wygląda blado i pusto — za mało kolorów, zbyt monotonna paleta (#F9F7F2 + #2D4635). Klientka chce cieplejszą kolorystykę inspirowaną paniodrelaksu.pl, plus 13 konkretnych poprawek wizualnych i funkcjonalnych. Wybrana paleta: **Terakota + Oliwka** (Palette A z analizy Gemini).

## Cele

1. Wdrożyć ciepłą paletę kolorów (terakota + oliwka) zamiast obecnej bladej
2. Zrealizować 13 poprawek klientki z docs/poprawki/poprawki_13.03/
3. Poprawić CTA — wyraźniejsze, cieplejsze przyciski
4. Utrzymać WCAG AA, zero błędów buildu

---

## Faza 1: Fundament — Paleta kolorów (globals.css)

**Plik:** `src/app/globals.css`

Zmienić `@theme` block:
```
--color-parchment:       #F9F7F2 → #F4EFE6  (ciepły piasek)
--color-parchment-dark:  #F5F3EE → #EADCC8  (karmel — wyraźny kontrast)
--color-moss:            #2D4635 → #5C713B  (ciepła oliwka)
--color-moss-light:      #3A5A47 → #7A8F53  (jaśniejsza oliwka)
--color-graphite:        #1A1A1A → #2C241B  (espresso)
--color-graphite-light:  #4A4A4A → #5A4F44  (ciepły szary)
NOWY: --color-terracotta:       #D9734E  (CTA primary)
NOWY: --color-terracotta-dark:  #B85331  (CTA hover)
NOWY: --color-mustard:          #DDB74A  (detale/akcenty)
NOWY: --color-coral:            #E2856E  (ciepły secondary)
```

Dodatkowo:
- `:focus-visible` outline → `var(--color-terracotta)`
- `::selection` background → `var(--color-terracotta)`

---

## Faza 2: Komponenty UI (Button, Card, SectionWrapper, SkipToContent)

### 2a. Button.tsx — CTA na terakotę
- Primary variant: `bg-moss` → `bg-terracotta`, hover → `bg-terracotta-dark`, ring → `ring-terracotta`
- Secondary/Ghost: zostają `moss` (oliwka) — hierarchia wizualna

### 2b. Card.tsx — usunięcie grayscale (poprawka #12)
- Usunąć prop `grayscale`, destructuring, className usage
- Focus ring: `ring-moss` → `ring-terracotta`

### 2c. SectionWrapper.tsx — nowy wariant "highlight"
- Typ: `"default" | "alternate" | "highlight"`
- `highlight` → `bg-coral/10` lub `bg-sage/10`

### 2d. SkipToContent.tsx — ukrycie (poprawka #7)
- `sr-only focus:not-sr-only focus:fixed ...` — widoczny TYLKO na focus

---

## Faza 3: Layout — Header, Footer, Menu, CookieBanner

### 3a. Navigation — nowe 10 pozycji (poprawka #4)
**Plik:** `src/data/navigation.ts`

```
1. O nas              → /o-nas
2. Wszystkie warsztaty → /wyjazdy
3. Warsztaty z dziećmi → /wyjazd-z-dziecmi
4. Matka i córka       → /matka-z-corka
5. Single parents      → /single-parents (redirect 301 → /wyjazd-z-dziecmi)
6. Dla dorosłych       → /dla-doroslych (placeholder NOWA)
7. Galeria             → /galeria
8. Opinie              → /opinie
9. Kontakt             → /kontakt
10. Blog               → /blog
```

### 3b. Nowa strona placeholder
- `src/app/(main)/dla-doroslych/page.tsx` — z `robots: { index: false }`

### 3c. Nowy ROUTE w constants.ts
- `adultOnly: "/dla-doroslych"`

### 3d. Header.tsx — tagline (poprawka #5)
- Zastąpić "Wyjazdy z Dziećmi" → **"Warsztaty wyjazdowe dla dorosłych i dzieci"**

### 3e. CookieBanner.tsx
- Przyciski primary: `bg-moss` → `bg-terracotta`
- Borders/text: `moss` → `terracotta`
- Checkboxy: `text-moss` → `text-terracotta`

### 3f. MobileMenu.tsx — CTA button colors

---

## Faza 4: Strona główna — Hero, karty, sekcje, kalendarz

### 4a. HeroSection.tsx (poprawki #6, #13)
- **Usunąć badge "Wyjazdy 2026"**
- **Gradient tła** → `from-parchment via-parchment to-coral/15`
- **Akcent "Dziećmi"** → `text-terracotta`
- **CTA button** — usunąć hardcoded `bg-sage-dark`, zostawić `variant="primary"`
- **Hero slideshow**: nowy `HeroSlideshow.tsx` — Motion AnimatePresence, 3-5 zdjęć, auto co 5s

### 4b. TripCard.tsx (poprawka #12)
- Usunąć `grayscale={trip.isPast}`

### 4c. TripCardsSection.tsx (poprawka #8)
- `grid-cols-2` → single column + `max-w-2xl mx-auto`

### 4d. Nagłówki sekcji (poprawki #9, #10, #11)
- AboutTeaser: `"O mnie"` → `"Poznaj twórczynię warsztatów"`
- OpinionsTeaser: `"Opinie"` → `"Opinie uczestników"`
- PastTripsSection: `"Minione wyjazdy"` → `"Zrealizowane warsztaty"`

### 4e. Reorder sekcji (page.tsx)
```
HeroSection → USP → TripCards → AboutTeaser → OpinionsTeaser → Calendar → PastTrips
```

---

## Faza 5: Sweep weryfikacyjny

Auto-update (bez zmian ręcznych): Input, Textarea, Select, Checkbox, Accordion, PersonBio, PlaceCard, ContactInfo, ContactForm, BookingForm, WaitlistForm, TripHero, TripPricing, PhoneLink, TestimonialCard, NewsletterForm, Footer

Sprawdzić ręcznie: loading.tsx, error.tsx, not-found.tsx, CookieSettingsButton.tsx, TripCalendar.tsx, StickyBookingCTA.tsx

---

## Ryzyka

1. **Kontrast terakota** (#D9734E na białym) ~3.2:1 → OK dla 16px+ bold. Backup: #C86842
2. **10 pozycji menu** — może nie zmieścić się na desktop → rozważyć dropdown
3. **Hero slideshow** — wiele dużych obrazów → `priority` tylko na 1., lazy na reszcie
4. **Placeholder /dla-doroslych** — noindex, ale link w menu działa
