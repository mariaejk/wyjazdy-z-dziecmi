# Plan: Faza 6 — Usprawnienia konwersyjne i UX

## Kontekst

Cztery niezależne analizy (2x Claude, 2x Gemini — Gemini nie zadziałało z powodu braku API key) + audyt UX/UI zidentyfikowały kluczowe luki w obecnym landing page "Wyjazdy z Dziećmi". Strona jest technicznie kompletna (fazy 1-5), ale brakuje elementów konwersyjnych: CTA w nawigacji, social proof, trust signals, śledzenie zdarzeń GA4, scarcity indicators.

**Źródła analiz (w `dev/gemini/`):**
- `claude_project_description.md` — analiza strategiczna dokumentu projektowego
- `claude_competitive_blueprint.md` — analiza 7 stron konkurencji
- `gemini_project_description.md` — Gemini CLI nie zadziałało (brak API key), zapisany prompt
- `gemini_competitive_blueprint.md` — Gemini CLI nie zadziałało (brak API key), zapisany prompt
- `2026-02-27_analiza-ux-ui-landing-page.md` — audyt UX/UI wszystkich podstron

Plan obejmuje **tylko zmiany, które można zaimplementować bez treści od klientki** (Maria Kordalewska). Elementy wymagające materiałów (prawdziwe opinie, zdjęcia, rozbudowana biografia) są oznaczone jako "czeka na treści".

---

## Etap A: Quick Wins — konwersja i nawigacja (6 zadań)

### A1. CTA "Zarezerwuj" w Header + MobileMenu
- **Pliki:** `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`, `src/data/navigation.ts`
- **Co:** Dodać wyróżniony przycisk `<Button variant="primary" size="sm" asChild>` z tekstem "Zarezerwuj" w headerze (desktop: obok nawigacji, mobile: w MobileMenu nad linkami). Link do `ROUTES.trips` lub do `#rezerwacja` najbliższego wyjazdu.
- **Wzór:** Użyć istniejącego `Button` z `src/components/ui/Button.tsx`. Na desktop: `hidden lg:inline-flex`, na mobile: pełna szerokość w menu.

### A2. CTA w TripHero (anchor do formularza)
- **Pliki:** `src/components/trips/TripHero.tsx`
- **Co:** Dodać przycisk "Zapisz się na wyjazd" z `href="#formularz"` w TripHero. Tylko gdy `!trip.isPast`. Secondary ghost button "Poznaj szczegóły ↓" z anchorem do opisu.
- **Uwaga:** TripHero to najważniejszy element konwersyjny na stronie wyjazdu — bez CTA użytkownik musi scrollować 4 sekcje do pierwszego linku akcji.

### A3. Active state w nawigacji + aria-current
- **Pliki:** `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`
- **Co:** Użyć `usePathname()` z `next/navigation` do porównania aktualnej ścieżki z linkami nawigacji. Dodać `aria-current="page"` + wizualne wyróżnienie (np. `border-b-2 border-moss` lub `text-moss font-medium`).
- **Uwaga:** Header i MobileMenu muszą stać się `"use client"` (lub wydzielić NavLink jako client component).

### A4. Numer telefonu w headerze (desktop)
- **Pliki:** `src/components/layout/Header.tsx`
- **Co:** Dodać `<a href="tel:${CONTACT.phone}">` z ikoną Phone z lucide-react obok nawigacji (desktop only, `hidden lg:flex`). Wartość z `src/lib/constants.ts` → `CONTACT.phone`.

### A5. "Porozmawiaj z Marią" — miękkie CTA
- **Pliki:** `src/components/trips/TripPricing.tsx`
- **Co:** Pod sekcją pricing dodać blok: "Nie jesteś pewna? Zadzwoń do Marii" z linkiem tel: i ikoną Phone. Alternatywny, mniej zobowiązujący CTA obok formularza rezerwacji.

### A6. Footer — "Social" → "Znajdź nas"
- **Pliki:** `src/components/layout/Footer.tsx`
- **Co:** Zmienić nagłówek "Social" na "Znajdź nas". Drobna zmiana, ale spójność językowa (cała strona po polsku).

---

## Etap B: Rozszerzenie danych i scarcity (4 zadania)

### B1. Rozszerzyć typ Trip o spots + early-bird
- **Pliki:** `src/types/trip.ts`
- **Co:** Dodać opcjonalne pola:
  ```ts
  spotsTotal?: number;
  spotsLeft?: number;
  earlyBirdDeadline?: string; // ISO date
  earlyBirdPrice?: number;    // cena early-bird
  ```

### B2. Dodać dane spots/early-bird do trips.ts
- **Pliki:** `src/data/trips.ts`
- **Co:** Uzupełnić "Matka i Córka" o `spotsTotal: 12`, `spotsLeft: 5` (przykładowe wartości — Maria potwierdzi). "Yoga i Konie" zostawić bez (placeholder).

### B3. Badge "Ostatnie miejsca!" / "Komplet" na TripCard
- **Pliki:** `src/components/home/TripCard.tsx`
- **Co:** Gdy `spotsLeft <= 3` → badge "Ostatnie miejsca!" (czerwony/amber). Gdy `spotsLeft === 0` lub `isPast` → badge "Komplet uczestników". Użyć istniejącego `Badge` z `src/components/ui/Badge.tsx`.

### B4. Wyświetlić dostępność w TripPricing
- **Pliki:** `src/components/trips/TripPricing.tsx`
- **Co:** Dodać "Zostało X z Y miejsc" w sekcji cenowej. Progress bar wizualny (opcjonalnie). Early-bird: "Zarezerwuj do [data] — cena od [X] zł" gdy `earlyBirdDeadline` jest w przyszłości.

---

## Etap C: SEO i analityka (3 zadania)

### C1. FAQPage Schema.org na stronach wyjazdów
- **Pliki:** `src/lib/structured-data.ts` (już istnieje `getFAQSchema`), `src/app/wyjazdy/[slug]/page.tsx`
- **Co:** Upewnić się, że `getFAQSchema()` jest wywoływane na stronie wyjazdu i renderowane jako `<StructuredData>`. Sprawdzić czy jest już podłączone — jeśli tak, to skip.

### C2. Śledzenie zdarzeń GA4
- **Pliki:** Nowy `src/lib/analytics.ts`, modyfikacje formularzy
- **Co:** Stworzyć helper `trackEvent(eventName, params)` z guardem na cookie consent. Dodać eventy:
  - `form_submit_booking` — BookingForm success
  - `form_submit_contact` — ContactForm success
  - `form_submit_newsletter` — NewsletterForm success
  - `cta_click_book` — kliknięcie głównego CTA "Zarezerwuj"
  - `cta_click_phone` — kliknięcie numeru telefonu
- **Wzór:** `window.gtag('event', name, params)` z typem `declare global { interface Window { gtag: ... } }`

### C3. Microsoft Clarity (heatmaps)
- **Pliki:** `src/components/shared/GoogleAnalytics.tsx` lub nowy `ClarityScript.tsx`
- **Co:** Dodać skrypt Microsoft Clarity (darmowy) za cookie consent (kategoria analytics). Ładować conditionaly analogicznie do GA4.

---

## Etap D: UX fixes (5 zadań)

### D1. Ukryć "Wiek dzieci" gdy dzieci = 0
- **Pliki:** `src/components/trips/BookingForm.tsx`
- **Co:** Warunkowe renderowanie pola "Wiek dzieci" — `{childrenCount > 0 && <Input ... />}`. Watch na `children_count` z react-hook-form.

### D2. Button active state + loading
- **Pliki:** `src/components/ui/Button.tsx`
- **Co:** Dodać `active:scale-[0.98]` w styles. Opcjonalnie: `loading` prop z spinnerem zamiast "...".

### D3. Cena na TripCard
- **Pliki:** `src/components/home/TripCard.tsx`
- **Co:** Wyświetlić "od X zł" na karcie wyjazdu (najniższa cena z `trip.pricing`). Rodziny są price-sensitive — pre-kwalifikacja zmniejsza bounce.

### D4. Sticky CTA na mobile
- **Pliki:** Nowy `src/components/shared/StickyBookingCTA.tsx`, `src/app/layout.tsx`
- **Co:** Client component z `useScroll` lub `IntersectionObserver`. Po scrollu poniżej hero na mobile → sticky bar na dole: "Zarezerwuj • od X zł". Chowa się przy scrollu w dół, pokazuje w górę. `z-30` (pod header `z-40`).

### D5. Usunąć OpinionsTeaser z homepage
- **Pliki:** `src/components/home/OpinionsTeaser.tsx`, `src/app/page.tsx`
- **Co:** Usunąć pustą sekcję OpinionsTeaser ze strony głównej. Pusta sekcja opinii szkodzi konwersji — sygnalizuje "nikt tu jeszcze nie był". Komponent zostawić w repo (przyda się gdy Maria dostarczy opinie), ale usunąć z `page.tsx`.

---

## Pliki kluczowe (do modyfikacji)

| Plik | Etapy |
|------|-------|
| `src/components/layout/Header.tsx` | A1, A3, A4 |
| `src/components/layout/MobileMenu.tsx` | A1, A3 |
| `src/components/layout/Footer.tsx` | A6 |
| `src/components/trips/TripHero.tsx` | A2 |
| `src/components/trips/TripPricing.tsx` | A5, B4 |
| `src/components/trips/BookingForm.tsx` | D1 |
| `src/components/home/TripCard.tsx` | B3, D3 |
| `src/components/home/OpinionsTeaser.tsx` | D5 |
| `src/components/ui/Button.tsx` | D2 |
| `src/types/trip.ts` | B1 |
| `src/data/trips.ts` | B2 |
| `src/lib/structured-data.ts` | C1 |
| `src/lib/analytics.ts` | C2 (nowy) |
| `src/components/shared/GoogleAnalytics.tsx` | C3 |
| `src/components/shared/StickyBookingCTA.tsx` | D4 (nowy) |
| `src/app/page.tsx` | D5 |
| `src/app/wyjazdy/[slug]/page.tsx` | C1 |

## Istniejące utilities do reużycia

- `cn()` — `src/lib/utils.ts` (clsx + tailwind-merge)
- `Button` — `src/components/ui/Button.tsx` (discriminated union, asChild for links)
- `Badge` — `src/components/ui/Badge.tsx`
- `CONTACT`, `ROUTES`, `SOCIAL_LINKS` — `src/lib/constants.ts`
- `mainNavigation` — `src/data/navigation.ts`
- `ScrollAnimation` — `src/components/shared/ScrollAnimation.tsx`
- `StructuredData` — `src/components/shared/StructuredData.tsx`
- `useCookieConsent` — `src/hooks/useCookieConsent.ts`

---

## Weryfikacja

Po każdym etapie:
1. `npm run build` — zero errors
2. `npm run dev` — wizualna weryfikacja desktop + mobile (375px)
3. Keyboard navigation — Tab przez cały site
4. Sprawdzić `aria-current`, focus rings, nowe elementy

Po wszystkich etapach:
5. Lighthouse — performance >= 90, accessibility >= 95
6. Sprawdzić Schema.org walidatorem (Google Rich Results Test)

---

## Czego NIE implementujemy teraz (czeka na treści/decyzję)

- Blog/sekcja porad — wymaga artykułów
- Lead magnet PDF — wymaga napisania contentu
- Prawdziwe opinie — wymaga cytatów od uczestniczek
- Rozbudowana historia Marii — wymaga tekstu od Marii
- Galeria prawdziwych zdjęć — wymaga zdjęć od Marii
- Trust numbers — wymaga danych od Marii (ile rodzin, ile wyjazdów)
- Integracja płatności — osobny projekt
- System voucherów — osobny projekt
- Chatbot RAG — przedwczesny
