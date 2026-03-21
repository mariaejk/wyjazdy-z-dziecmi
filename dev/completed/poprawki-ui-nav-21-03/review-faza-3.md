# Code Review — Faza 3: Strony warsztatów

Last Updated: 2026-03-21
Commit: 3bb6746
Pliki zmienione: 5 (TripVideo.tsx, [slug]/page.tsx, BookingForm.tsx, TripPricing.tsx, zadania.md)

---

## Executive Summary

Faza 3 jest prosta — 4 małe zmiany. Trzy z nich są poprawne (TripPricing, BookingForm, TripVideo flex-col-reverse). Jedna zmiana ma poważny błąd funkcjonalny: FAQ link `href="/#faq"` kieruje do nieistniejącego anchor — `HomeFAQ` nie ma `id="faq"` ani na `SectionWrapper`, ani nigdzie w drzewie DOM. Link zadziała jako `/#` (scroll to top), nie do sekcji FAQ.

Ponadto: cztery nowe importy w `[slug]/page.tsx` są zbędne — `Container`, `SectionWrapper`, `Button`, `ScrollAnimation` były tam już zaimportowane przed tym commitem.

---

## Krytyczne problemy (must fix)

### 🔴 FAQ link wskazuje na nieistniejący anchor

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`, linia 167
**Plik:** `src/components/home/HomeFAQ.tsx`

`Button href="/#faq"` zakłada, że sekcja FAQ na homepage ma `id="faq"`. Tak nie jest.

`HomeFAQ` renderuje `<SectionWrapper variant="alternate">` — bez żadnego `id`. Żaden element w drzewie DOM tej sekcji nie ma `id="faq"`. Po kliknięciu `/#faq` przeglądarka wykona scroll do kotwicy, której nie znajdzie — zachowanie zależy od przeglądarki (najczęściej: brak scrollu lub scroll do góry strony).

Wymagana poprawka w `HomeFAQ.tsx`, linia 56:

```tsx
// PRZED
<SectionWrapper variant="alternate">

// PO
<SectionWrapper variant="alternate" id="faq">
```

`SectionWrapper` prawdopodobnie obsługuje przekazywanie `id` — należy to zweryfikować. Jeśli nie, można owinąć w `<section id="faq">` lub dodać `id` prop do `SectionWrapper`.

---

## Ważne poprawki (should fix)

### 🟠 Zbędne importy — duplikacja

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`, linie 20–23

Diff pokazuje 4 nowe importy dodane w tym commicie:

```tsx
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
```

Ale plik już wcześniej używał `Container` (linie 86–89 breadcrumbs), `SectionWrapper`, i innych. Aby zweryfikować duplikację — diff dodaje te importy jako nowe linie ("+"), co oznacza, że przed tym commitem ich nie było w pliku. Sprawdzić czy nie ma teraz podwójnych deklaracji import (TypeScript/ESLint powinno złapać, ale warto potwierdzić).

Jeśli build `3bb6746` przeszedł bez błędów (3.4 zaliczone), to importy są unikalne i to nie jest problem — diff po prostu pokazuje, że te linie zostały przesunięte / dodane, a nie były wcześniej na tym miejscu. **Weryfikacja: sprawdzić czy w pliku nie ma teraz dwóch linii `import { Container }` itp.**

### 🟠 FAQ link — pokazywany zawsze, nawet dla wyjazdów przeszłych / bez FAQ

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`, linie 162–173

Sekcja FAQ link renderuje się zawsze (bezwarunkowo), w tym:
- na stronach wyjazdów przeszłych (`trip.isPast === true`)
- gdy wyjazd ma własną sekcję FAQ na stronie (`hasFAQ === true`)

Gdy `hasFAQ === true` (co jest przypadkiem dla np. "Yoga i Konie"), użytkownik widzi sekcję TripFAQ (pytania specyficzne dla tego wyjazdu), a tuż pod nią link "Masz więcej pytań? Zobacz FAQ" — co sugeruje, że FAQ jest gdzie indziej. To może być mylące UX-owo.

Rozważyć warunkowe renderowanie:

```tsx
{/* Pokaż FAQ link tylko gdy wyjazd nie ma własnego FAQ */}
{!hasFAQ && (
  <SectionWrapper className="py-8 sm:py-12">
    ...
  </SectionWrapper>
)}
```

---

## Drobne uwagi (nice to have)

### 🟡 Accessibility: FAQ link nie identyfikuje dokąd prowadzi

**Plik:** `src/app/(main)/wyjazdy/[slug]/page.tsx`, linia 167

Tekst przycisku "Masz więcej pytań? Zobacz FAQ" jest opisowy — screen reader rozumie kontekst. Nie wymaga `aria-label`. OK.

Jednak link prowadzi na inną stronę (`/` + hash). Zgodnie z wzorcem z CLAUDE.md faza 4 ("aria-label na target="_blank" links"), linki cross-page nie wymagają specjalnego oznaczenia. OK.

### 🟡 TripVideo: `flex-col-reverse` — wpływ na desktop

**Plik:** `src/components/trips/TripVideo.tsx`, linia 28

`flex-col-reverse items-start gap-8 lg:flex-row lg:gap-12`

Na desktop (`lg:`) klasa `flex-row` nadpisuje `flex-col-reverse` — Tailwind stosuje ostatnią klasę wygrywającą (breakpoint override). Kolejność DOM (video pierwszy, opis drugi) jest zachowana na desktop. Na mobile `flex-col-reverse` odwraca: opis na górze, video na dole.

Zachowanie jest poprawne i zgodne z intencją zadania 3.1.

Jedna uwaga: `items-start` na `flex-col-reverse` powoduje wyrównanie do lewej (nie center) na mobile. Czy to zamierzone? Przy bloku o `w-full` nie ma widocznej różnicy, ale semantycznie `items-stretch` lub brak `items-start` mógłby być czytelszy. Nit, nie blokuje.

### 🟡 Pozycja FAQ link — przed BookingForm, nie pod TripFAQ

**Plik:** zadania.md faza 3 vs. implementacja

Zadanie 3.2 mówiło: "Pozycja: pod sekcjami warsztatu, przed BookingForm". Implementacja jest zgodna (po komentarzu `{/* 8. FAQ */}`, przed `{/* 10. Booking Form */}`). OK.

---

## Co jest dobre

### ✅ TripVideo flex-col-reverse

Zmiana jednolinijkowa, precyzyjna. Desktop layout nienaruszone (lg:flex-row override). Poprawna technika Tailwind v4.

### ✅ "Zapisz się na warsztat" — zmienione w obu miejscach

BookingForm.tsx linia 127: `title="Zapisz się na warsztat"` — OK.
TripPricing.tsx linia 141: `"Zapisz się na warsztat"` — OK.
Zmiana spójna z wymogiem CLAUDE.md ("warsztaty" not "wyjazdy" w UI copy).

### ✅ SectionWrapper z py-8 sm:py-12

FAQ link section używa zredukowanego paddingu zgodnie z lessons learned Trip Video (21.03.2026): "SectionWrapper with reduced padding: py-8 sm:py-12".

### ✅ ScrollAnimation + text-center

Poprawny wzorzec animacji dla pojedynczego elementu centered.

---

## Podsumowanie

| # | Priorytet | Problem | Plik |
|---|-----------|---------|------|
| 1 | 🔴 blocking | `id="faq"` brakuje na `HomeFAQ` — link nie działa | HomeFAQ.tsx |
| 2 | 🟠 important | FAQ link renderuje się bezwarunkowo (także przy `hasFAQ` i `isPast`) | [slug]/page.tsx |
| 3 | 🟠 important | Zweryfikować czy importy nie są zduplikowane po mergu | [slug]/page.tsx |
| 4 | 🟡 nit | `items-start` na flex-col-reverse (kosmetyczne) | TripVideo.tsx |

---

## Next Steps

1. Dodać `id="faq"` do `HomeFAQ` (SectionWrapper lub wrapper div) — BLOCKING
2. Rozważyć `{!hasFAQ && ...}` na FAQ link section — IMPORTANT
3. Sprawdzić brak duplikacji importów w [slug]/page.tsx (lint powinien złapać)
4. Przejść do Fazy 4 (Footer) po zaakceptowaniu poprawek
