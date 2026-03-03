# Code Review — Faza 7: Konwersja, UX i Analityka

Last Updated: 2026-03-03

Branch: `feature/faza7-konwersja-ux-analityka`

---

## Executive Summary

Faza 7 obejmuje 9 etapow (A-I). Zmiany sa **unstaged** (nie sa jeszcze commitowane). Build produkcyjny przechodzi bez bledow. ESLint nie zglosil zadnych bledow w kodzie projektu (ostrzezenia tylko w plikach `.claude/hooks/`, ktore sa poza zakresem review).

**Ogolna ocena implementacji: dobra.** Wiekszosc etapow zrealizowana poprawnie i zgodnie z konwencjami projektu. Znaleziono kilka problemow wymagajacych poprawek — jeden blokujacy (dostepnosc StickyBookingCTA), kilka waznych i kilka drobnych.

**Podsumowanie etapow:**
- Etap A (typy + dane scarcity): ZREALIZOWANY — drobne uwagi
- Etap B (Button loading): ZREALIZOWANY poprawnie
- Etap C (Header CTA + active state): ZREALIZOWANY — uwagi
- Etap D (TripCard scarcity + 2 przyciski): ZREALIZOWANY — uwagi
- Etap E (TripHero isPast + CTA): ZREALIZOWANY poprawnie
- Etap F (TripPricing progress bar + soft CTA): ZREALIZOWANY — uwagi
- Etap G (BookingForm warunkowe "Wiek dzieci"): ZREALIZOWANY poprawnie
- Etap H (StickyBookingCTA): ZREALIZOWANY — blad dostepnosci
- Etap I (analytics.ts, ClarityScript, GA4 events, CSP): ZREALIZOWANY — uwagi

---

## Critical Issues (blokujace — muszą być naprawione)

### BLAD-01 — StickyBookingCTA: `aria-hidden` bez `inert` — fokus osiagalny mimo ukrycia
- Klasyfikacja: blokujace
- Plik: `src/components/trips/StickyBookingCTA.tsx`, linia 51-55
- Problem: Komponent uzywa `aria-hidden={!isVisible}` do ukrycia contentu, ale ukryty div wciaz zawiera interaktywny element `<Button>` (czyli `<a href>`). `aria-hidden` usuwa element z drzewa dostepnosci czytnikow ekranu, ale NIE blokuje fokusa klawiatury. Uzytkownik nawigujacy Tab-em moze natrafic na ukryty link. Jest to naruszenie WCAG 2.1 kryterium 2.1.1.
- Sugerowana poprawka:

```tsx
// Opcja 1 — dodaj tabIndex={-1} na przycisku gdy niewidoczny (wymaga przekazania propu)
// Opcja 2 — uzyj atrybutu inert na kontenerze (najlepsze rozwiazanie, wsparcie 96%+)
<div
  className={`fixed bottom-0 ...`}
  aria-hidden={!isVisible}
  // Dodaj:
  {...(!isVisible ? { inert: "" } : {})}
>
```

Lub prościej, zeby nie walczyc z TS typami dla atrybutu `inert`:

```tsx
<div
  ref={containerRef}
  className={`fixed bottom-0 ...`}
  aria-hidden={!isVisible}
>
  <Button
    href="#formularz"
    className="w-full"
    tabIndex={isVisible ? 0 : -1}
  >
    Zapisz się na wyjazd
  </Button>
</div>
```

Uwaga: `Button` jako link (`href`) renderuje `<Link>`, ktory nie przyjmuje `tabIndex` w biezacym typie. Najprostszym rozwiazaniem jest dodanie atrybutu `inert` przez ref lub przez warunek w `div`.

---

## Important Improvements (wazne — powinny byc naprawione)

### WAZNE-01 — `isActive()` zduplikowana w Header i MobileMenu
- Klasyfikacja: wazne
- Plik: `src/components/layout/Header.tsx` linia 16-19, `src/components/layout/MobileMenu.tsx` linia 18-21
- Problem: Identyczna funkcja `isActive(href, pathname)` zdefiniowana dwukrotnie. Narusza zasade DRY (Don't Repeat Yourself). Jesli logika sie zmieni (np. support dla trailing slash), trzeba pamietac o poprawie w obu miejscach.
- Sugerowana poprawka: Przenieść funkcje do `src/lib/utils.ts` lub do nowego pliku `src/lib/navigation.ts`:

```ts
// src/lib/utils.ts (lub navigation.ts)
export function isNavActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
```

Potem importowac w obu komponentach.

---

### WAZNE-02 — `onClick` na `<div>` w MobileMenu (CTA wrapper)
- Klasyfikacja: wazne
- Plik: `src/components/layout/MobileMenu.tsx`, linia 140
- Problem: `<div className="mt-6 px-3" onClick={onClose}>` — div z handlerem onClick nie jest dostepny klawiaturo. Klikniecie przycisku "Zarezerwuj" zamknie menu tylko myszka (przez propagacje), ale focus trap i nawigacja klawiatury nie wywola `onClose` przez interakcje z elementem div. To niepotrzebne — `Button` (ktory renderuje `<Link>`) sluzy do nawigacji, a po nawigacji Next.js Router i tak zmieni strone.
- Sugerowana poprawka: Usunac wrapper div z onClick i przekazac `onClose` bezposrednio do `Button` jako prop, albo uzyc `onClick` na elemencie interaktywnym. W praktyce po kliknieci linku menu i tak sie zamknie przez logike Focus trapu lub mozna dodac `onClick` wprost na Button poprzez rozszerzenie props Button:

```tsx
// Usun wrapper div z onClick:
<Button
  href={ROUTES.trips}
  className="w-full"
  // Button jako Link nie ma onClick — warto to rozwazyc inaczej
>
  Zarezerwuj
</Button>
```

Najkrotszym rozwiazaniem jest zastapienie `Button` natywnym `<Link>` w tym miejscu i przekazanie `onClick={onClose}`.

---

### WAZNE-03 — `StickyBookingCTA` uzywa `document.querySelector("section")` — kruchy selektor
- Klasyfikacja: wazne
- Plik: `src/components/trips/StickyBookingCTA.tsx`, linia 12
- Problem: `document.querySelector("section")` pobiera **pierwszy element `<section>` w DOM**. Jest to zaleznosc od struktury HTML strony. Jesli inna sekcja pojawi sie przed hero (np. breadcrumb, skip-link wrapper itp.), selektor zwroci zly element. Rowniez TripHero renderuje `<section>` bez id — brak stabilnego punktu zakotwiczenia.
- Sugerowana poprawka: Dodac `id="hero"` do `<section>` w TripHero i uzywac `document.getElementById("hero")`:

```tsx
// TripHero.tsx:
<section id="hero" className="relative flex min-h-[60vh] ...">

// StickyBookingCTA.tsx:
const heroEl = document.getElementById("hero");
```

---

### WAZNE-04 — `TripPricing` zamieniony na "use client" bez faktycznej koniecznosci
- Klasyfikacja: wazne
- Plik: `src/components/trips/TripPricing.tsx`, linia 1
- Problem: Komponent zostal oznaczony `"use client"` poniewaz importuje `analytics` i uzywa `onClick`. Jednak z punktu widzenia architektury Next.js App Router, dodanie `"use client"` powoduje, ze CALY komponent i jego poddrzewo wychodzi z boundary SSR. TripPricing renderuje duzo statycznej tresci (tabela cennikowa, deposits, przyciski). Lepszym wzorcem byloby wyekstrahowanie tylko interaktywnej czesci (link telefoniczny z analytics) do osobnego Client Component.
- Sugerowana poprawka:

```tsx
// src/components/trips/PhoneLink.tsx
"use client";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { analytics } from "@/lib/analytics";

export function PhoneLink() {
  return (
    <a
      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
      className="inline-flex items-center gap-1.5 text-sm text-graphite-light transition-colors hover:text-moss"
      onClick={() => analytics.phoneClick()}
    >
      <Phone className="h-4 w-4" strokeWidth={1.5} />
      <span>Zadzwoń: {CONTACT.phoneDisplay}</span>
    </a>
  );
}
```

Dla projektu tej skali (SSG) jest to minor impact na performance, ale narusza ustalone konwencje Server Components by default.

---

### WAZNE-05 — `earlyBirdDeadline` i `earlyBirdPrice` sa w typach ale nigdzie nie uzywane
- Klasyfikacja: wazne
- Plik: `src/types/trip.ts`, linie 62-63
- Problem: Dwa pola zdefiniowane w typie (zgodnie z planem Etap A), ale nie ma zadnej implementacji uzywajacej tych pol — brak komponentu early bird badge/info, brak ich renderowania. Nieuzywane pola w typie to "martwy kod" — moga mylic kolejnych deweloperow sugerujac ze funkcjonalnosc jest gotowa.
- Sugerowana poprawka: Albo zaimplementowac early bird badge (np. w TripCard i TripPricing), albo zostawic komentarz `// TODO: Early bird — zaimplementowac w fazie X`, albo usunac pola z typu i dodac je dopiero gdy beda uzywane. Preferowane: zostawic z komentarzem TODO jesli jest to planowane.

---

### WAZNE-06 — Template literaly zamiast `cn()` w StickyBookingCTA i TripPricing
- Klasyfikacja: wazne
- Plik: `src/components/trips/StickyBookingCTA.tsx` linia 48-50, `src/components/trips/TripPricing.tsx` linia 82
- Problem: Projekt konsekwentnie uzywa `cn()` z clsx + tailwind-merge do laczenia klas. Uzywanie template literalow omija tailwind-merge i moze powodowac konflikty klas. Dotyczy:
  - `StickyBookingCTA.tsx:48`: `className={\`fixed bottom-0 ... ${isVisible ? "translate-y-0" : "translate-y-full"}\`}`
  - `TripPricing.tsx:82`: `className={\`h-full rounded-full ... ${isLow ? "bg-amber-500" : "bg-moss"}\`}`
- Sugerowana poprawka:

```tsx
// StickyBookingCTA.tsx
className={cn(
  "fixed bottom-0 left-0 right-0 z-30 border-t border-parchment-dark bg-parchment/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 md:hidden",
  isVisible ? "translate-y-0" : "translate-y-full",
)}

// TripPricing.tsx
className={cn(
  "h-full rounded-full transition-all duration-500",
  isLow ? "bg-amber-500" : "bg-moss",
)}
```

---

### WAZNE-07 — `analytics.ts` uzywa `window.gtag` bez globalnego deklarowania typu w tym pliku
- Klasyfikacja: wazne
- Plik: `src/lib/analytics.ts`, linie 9, 11
- Problem: `window.gtag` jest typowane poprzez `declare global` w `src/components/shared/GoogleAnalytics.tsx`. Plik `analytics.ts` nie ma dostępu do tej deklaracji przez import — działa to tylko dlatego, że TypeScript traktuje `declare global` jako globalny ambient declaration widoczny w projekcie. Jest to niejawna zaleznosc — jezeli GoogleAnalytics.tsx zostanie usuniete lub zmienione, analytics.ts straci typowanie. Lepiej przenieść deklaracje global do dedicated pliku typow.
- Sugerowana poprawka: Stworzyc `src/types/global.d.ts`:

```ts
// src/types/global.d.ts
interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
  [key: `ga-disable-${string}`]: boolean;
}
```

I usunac `declare global { ... }` z `GoogleAnalytics.tsx`.

---

### WAZNE-08 — `NEXT_PUBLIC_CLARITY_ID` nie ma wpisu w `.env.example`
- Klasyfikacja: wazne
- Plik: `.env.example`, `src/components/shared/ClarityScript.tsx`
- Problem: `ClarityScript` uzywa `process.env.NEXT_PUBLIC_CLARITY_ID`, ale ta zmienna nie jest zdokumentowana w `.env.example`. Nowy developer (lub przyszly wdrozeniowiec) nie bedzie wiedzial, ze ta zmienna istnieje. `NEXT_PUBLIC_GA_ID` jest w pliku, Clarity nie.
- Sugerowana poprawka:

```
# .env.example — dodac:
# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=
```

---

## Minor Suggestions (drobne — nice to have)

### DROBNE-01 — Scarcity dla `spotsLeft === 0` nie ukrywa StickyBookingCTA i BookingForm
- Klasyfikacja: drobne
- Plik: `src/app/wyjazdy/[slug]/page.tsx`, linie 137-142
- Problem: `StickyBookingCTA` i `BookingForm` sa pokazywane gdy `!trip.isPast`, ale NIE uwzgledniaja `trip.spotsLeft === 0`. Jezeli wyjazd jest "Komplet", formularz rezerwacji nadal jest widoczny. W TripCard jest to obsluzone (`isSoldOut` -> disabled button), ale na stronie szczegolowej brakuje tego zachowania.
- Sugerowana poprawka:

```tsx
{!trip.isPast && trip.spotsLeft !== 0 && (
  <BookingForm trips={upcomingTrips} preselectedTrip={trip.slug} />
)}
{!trip.isPast && trip.spotsLeft !== 0 && <StickyBookingCTA />}
```

Lub jesli `spotsLeft === undefined` tez powinno pokazywac formularz (wyjazd bez scarcity), warunek bedzie:

```tsx
{!trip.isPast && trip.spotsLeft !== 0 && ...}
```

To jest `undefined !== 0` = `true`, wiec wyjazdy bez `spotsLeft` beda pokazywac formularz. Zachowanie poprawne.

---

### DROBNE-02 — Progress bar TripPricing pokazuje "zajete" miejsca zamiast "dostepnych"
- Klasyfikacja: drobne
- Plik: `src/components/trips/TripPricing.tsx`, linia 83
- Problem: `width: ((spotsTotal - spotsLeft) / spotsTotal) * 100 + "%"` — pasek pokazuje ZAJETOSC (ile juz zajete). Tekst mowi "Zostało X z Y miejsc" — co jest spójne. Ale wizualnie: uzytkownik widzi pasek wypelniony w ~58% (5 z 12 wolnych = 7 zajete) co moze byc dezorientujace jesli oczekuje "ilosc wolnych miejsc". To design decision, nie blad — jednak warto potwierdzic z klientem. Alternatywnie pasek moze pokazywac % WOLNYCH miejsc.

---

### DROBNE-03 — `Button` nie przekazuje `icon` podczas `loading` — tekst "Wysylanie..." jest bez spinera
- Klasyfikacja: drobne
- Plik: `src/components/ui/Button.tsx`, linie 94-98; `src/components/trips/BookingForm.tsx`, linia 247
- Problem: Gdy `loading=true`, spinner zastepuje ikone (icon prop). Jednak w `BookingForm` tekst to `"Wysylanie..."` (przekazany jako children) — spinner + text = OK. Problem jest inny: ikona `<Send>` jest przekazywana przez `icon` prop, ale gdy `loading=true` icon jest ukryty i zastapiony spinnerem. To jest poprawne zachowanie — ale warto sprawdzic czy spinner i "Wysylanie..." tekstowo maja odpowiedni porzadek. Aktualnie: [Spinner] [Wysylanie...] — logiczne. Brak problemu. To tylko informacja.

---

### DROBNE-04 — TripCard: "Wiecej" bez "»" lub strzalki — mniej wyraziste CTA
- Klasyfikacja: drobne
- Plik: `src/components/home/TripCard.tsx`, linia 71
- Problem: Przycisk `"Więcej"` zastapil poprzedni link `"Dowiedz się więcej →"`. Nowy button ma wariant `secondary` co jest poprawne, ale tekst "Więcej" jest bardzo krotki — mniej opisowy. Lepsze byloby `"Dowiedz się więcej"` lub `"Szczegóły wyjazdu"` dla wiekszej jasnosci.

---

### DROBNE-05 — `ClarityScript` nie ma `nonce` CSP
- Klasyfikacja: drobne
- Plik: `src/components/shared/ClarityScript.tsx`, linia 14
- Problem: CSP w `next.config.ts` uzywa `'unsafe-inline'` dla skryptow, wiec nie jest to blad krytyczny. Ale gdyby w przyszlosci CSP byl zaostrzony do nonce-based, skrypt Clarity moze wymagac dodatkowej konfiguracji. Porownaj z `GoogleAnalytics.tsx` — tam tez nie ma nonce. Spójnosc jest zachowana.

---

### DROBNE-06 — Brak reduced-motion dla `transition-transform` w `StickyBookingCTA`
- Klasyfikacja: drobne
- Plik: `src/components/trips/StickyBookingCTA.tsx`
- Problem: Komponent uzywa `transition-transform duration-300` dla animacji wejscia/wyjscia sticky baru. Nie respektuje `prefers-reduced-motion`. Projekt ma ugruntowany wzorzec obslugi reduced-motion (CLAUDE.md: "prefers-reduced-motion must be added to globals.css AND motion components"). Dla tego komponentu animacja jest tylko wejsciem/wyjsciem — mniejszy impact niz duze animacje sekcji, ale pattern powinien byc spójny.
- Sugerowana poprawka:

```tsx
import { useReducedMotion } from "motion/react";

export function StickyBookingCTA() {
  const prefersReducedMotion = useReducedMotion();
  // ...
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 border-t border-parchment-dark bg-parchment/95 px-4 py-3 backdrop-blur-sm md:hidden",
        !prefersReducedMotion && "transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!isVisible}
    >
```

---

### DROBNE-07 — `analytics.ctaClick()` zdefiniowane ale nigdzie nie wywolywane
- Klasyfikacja: drobne
- Plik: `src/lib/analytics.ts`, linia 41-47
- Problem: Metoda `ctaClick(label)` jest zdefiniowana ale nie jest uzywana w zadnym komponencie. Albo jest planowana do dodania (i zostala stworzona "na zapas"), albo jest martwym kodem. Nie jest blednym — ale warto wiedziec.

---

### DROBNE-08 — TripCard: scarcity badge tylko dla `spotsLeft <= 3`, nie dla innych wartosci
- Klasyfikacja: drobne
- Plik: `src/components/home/TripCard.tsx`, linia 13-22
- Problem: `getScarcityBadge` zwraca null gdy `spotsLeft > 3`. Znaczy to, ze dla wyjazdu z `spotsLeft = 12` badge nie bedzie pokazany w ogole — co jest poprawne (nie ma scarcity). Ale nie ma sredniego stanu "jest miejsc sporo" — tylko Komplet i "Ostatnie miejsca!". To jest design decision — ok. Informacja dla kontekstu.

---

## Architecture Considerations

### Architektura-01 — `isActive` jako pure helper powinna byc w `/lib/`
Obie implementacje `isActive` w `Header.tsx` i `MobileMenu.tsx` sa identyczne. Zgodnie z konwencja projektu, helpery laza do `src/lib/utils.ts` lub `src/lib/navigation.ts`. Nie dotyczy to tylko DRY — to kwestia utrzymywania jednego zrodla prawdy (Phase 4 Lessons Learned: "Data access via helpers, not array indices").

### Architektura-02 — StickyBookingCTA jako "smart" komponent
Komponent `StickyBookingCTA` zawiera logike IntersectionObserver. To jest poprawne podejscie dla klienta, ale warto zauwazyc ze `document.querySelector("section")` jest slabym miejscem. Gdyby ten komponent byl uzywany na stronach innych niz trip page, moze wybrac zly element. Rozwazyc dodanie opcjonalnego `heroId?: string` prop lub uzycie stabilnego ID.

### Architektura-03 — earlyBird fields bez implementacji
Zgodnie z planem Fazy 7 Etap A, typ powinien zawierac `earlyBirdDeadline` i `earlyBirdPrice`. Sa w typie, ale nie ma zadnego UI. Jesli jest to zaplanowane na pozniej — ok. Jesli nie — nalezy usunac.

### Architektura-04 — Progressbar scarcity tylko w TripPricing, nie w TripHero
Dostepnosc miejsc jest pokazana w sekcji "Twoja inwestycja" (dol strony). Uzytkownik wchodzacy na strone wyjazdu nie widzi scarcity az do przewiniecia. Warto rozwazyc dodanie scarcity badge rowniez do TripHero (blisko poczatku strony) — np. podobny badge jak w TripCard.

---

## Co zostalo zrobione dobrze

- Build produkcyjny przechodzi bez bledow (0 errors TypeScript, 0 lint errors w kodzie projektu)
- Button discriminated union poprawnie rozszerzony: `loading?: never` w `ButtonAsLink`, `loading?: boolean` w `ButtonAsButton`
- `isDisabled = disabled || loading` — poprawna logika laczniego wylacznania
- `aria-current="page"` na aktywnych linkach nawigacji — poprawna semantyka
- `aria-valuenow/min/max/label` na progress barze dostepnosci — dobra dostepnosc
- Unicode escapes konsekwentnie w plikach `.tsx` (CLAUDE.md Phase 6 Lesson) — z jednym wyjatkiem w TripCard (polskie znaki w template literal przy Badge) — ale po sprawdzeniu to JSX, nie `.ts`
- `formatCurrency(minPrice)` uzyty poprawnie (nie hardcoded format)
- `CONTACT.phone.replace(/\s/g, "")` dla tel: href — poprawny wzorzec
- `CONTACT.phoneDisplay` uzyte z stałych — nie hardcoded
- Honeypot, rate limit, Zod — zachowane we wszystkich API routes (brak nowych)
- `ClarityScript` respektuje cookie consent przez `useCookieConsent()` — RODO compliant
- `ClarityScript` sprawdza `isLoaded` przed renderowaniem — brak flash
- `analytics.bookingSubmit()` wywolywany PO sukcesie formularza (nie przed) — poprawna kolejnosc
- CSP rozszerzony o clarity.ms we wszystkich potrzebnych dyrektywach (script-src, img-src, connect-src)
- `getMinPrice()` uzywa `Math.min(...array)` — poprawne, nie arr[0]
- `watch("children")` z RHF do warunkowego wyswietlenia "Wiek dzieci" — poprawny wzorzec
- `preselectedTrip ?? ""` — bezpieczne defaultValue

---

## Statystyki

| Kategoria | Liczba |
|-----------|--------|
| Blokujace (blocking) | 1 |
| Wazne (important) | 8 |
| Drobne (nit/suggestion) | 8 |
| **Lacznie** | **17** |

---

## Next Steps

Przed mergem do `master` nalezy:

1. WYMAGANE: Naprawic BLAD-01 (StickyBookingCTA dostepnosc — fokus przy ukryciu)
2. WYMAGANE: Naprawic WAZNE-08 (dodac NEXT_PUBLIC_CLARITY_ID do .env.example)
3. ZALECANE: Naprawic WAZNE-02 (onClick na div w MobileMenu)
4. ZALECANE: Naprawic WAZNE-06 (template literals -> cn())
5. ZALECANE: Naprawic WAZNE-03 (querySelector -> getElementById z id="hero")
6. ROZWAZYC: Naprawic WAZNE-01 (wyekstrahowac isActive do utils)
7. ROZWAZYC: Naprawic WAZNE-04 (TripPricing "use client" — wyekstrahowac PhoneLink)
8. INFORMACJA: WAZNE-07 (global.d.ts) — nie blokujace, ale porządkujace architekture
