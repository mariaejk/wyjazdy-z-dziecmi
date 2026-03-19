# Code Review: Poprawki konwersji 19.03 — Pełny Review

**Last Updated: 2026-03-19**
**Branch:** `feature/poprawki-konwersja-19-03`
**Commit:** `33ca759`
**Reviewer:** Claude Sonnet 4.6
**Review iteracja:** 2 (po naprawach z iteracji 1)

---

## Executive Summary

Wszystkie 21 zadań z 3-fazowego planu zostały zaimplementowane. Trzy problemy znalezione w poprzednim review (blocking side effect w Accordion, SEO title za długi, aria-label kapitalizacja) zostały **poprawnie naprawione**. Kod jest gotowy do merge.

Nowy pełny przegląd nie znalazł żadnych nowych problemów blokujących. Znaleziono 1 ważną uwagę (OG title wciąż 66 znaków — powyżej planu), 2 drobnostki i 2 sugestie. ESLint zwraca 0 błędów i 17 ostrzeżeń — wszystkie pre-istniejące, żadne nie zostały wprowadzone przez ten branch.

**Rekomendacja: APPROVE po decyzji o OG title (do zaakceptowania lub skrócenia).**

---

## Weryfikacja napraw z iteracji 1

| Problem (iteracja 1) | Status | Weryfikacja |
|----------------------|--------|-------------|
| [blocking] Side effect w setState w Accordion.tsx | NAPRAWIONY | `toggle()` teraz używa `const newId = openId === id ? null : id` poza setState, `onToggle` wywoływany po `setOpenId(newId)` — linie 24-30 |
| [important] SEO title 66 znaków (meta title default) | NAPRAWIONY | `"Wyjazdy z Dziećmi — czas dla siebie i dziecka w naturze"` = **55 znaków** |
| [important] aria-label kapitalizacja w SocialLink | NAPRAWIONY | Footer używa `platform="Facebook"` i `platform="Instagram"` — linie 61 i 71 |

---

## Faza 1: Krytyczne

### Checklist zgodności z planem

| Zadanie | Plik | Status |
|---------|------|--------|
| H1 emocjonalny — wariant reduced-motion | HeroSection.tsx:68-69 | PASS |
| H1 emocjonalny — wariant animated | HeroSection.tsx:152-153 | PASS |
| Oba H1 identyczne | — | PASS — teksty identyczne w obu wariantach |
| Subtitle nowy — wariant reduced-motion | HeroSection.tsx:71-74 | PASS |
| Subtitle nowy — wariant animated | HeroSection.tsx:163-165 | PASS |
| Gwiazdki NAD CTA — reduced-motion | HeroSection.tsx:94-109 | PASS |
| Gwiazdki NAD CTA — animated | HeroSection.tsx:194-220 | PASS |
| CTA Header "Sprawdź terminy" | Header.tsx:179 | PASS |
| CTA MobileMenu "Sprawdź terminy" | MobileMenu.tsx:205 | PASS |
| CTA StickyBookingCTA "Zarezerwuj miejsce" | StickyBookingCTA.tsx:71 | PASS |
| CTA BookingForm button "Zarezerwuj miejsce" | BookingForm.tsx:264 | PASS |
| dietaryNeeds w Zod schema | booking.ts:35-37 | PASS |
| dietaryNeeds w defaultValues | BookingForm.tsx:53 | PASS |
| dietaryNeeds Input w formularzu | BookingForm.tsx:202-207 | PASS |
| Textarea uwagi — placeholder zaktualizowany | BookingForm.tsx:211 | PASS |
| dietaryNeeds w API log() | route.ts:69 | PASS |
| childCare w Trip type | trip.ts:62 | PASS |
| childCare w keystatic.config | keystatic.config.ts:113-116 | PASS |
| childCare w mapTrip() z `|| undefined` | trips.ts:41 | PASS |
| childCare w TripPracticalInfo type | TripPracticalInfo.tsx:11 | PASS |
| childCare w infoItems[] z Baby icon | TripPracticalInfo.tsx:22 | PASS |
| childCare w 4 plikach YAML | content/trips/*.yaml | PASS — wszystkie 4 |
| Shield import | BookingForm.tsx:6 | PASS |
| Reassurance text | BookingForm.tsx:251-254 | PASS |

### Problemy znalezione

Brak nowych problemów blokujących w Fazie 1.

### Dobre wzorce

✅ H1 spójność między wariantami — "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo." jest identyczne w obu wariantach (reduced-motion i animated). Brak ryzyka rozbieżności.

✅ dietaryNeeds — wzorzec Zod 4 + RHF — `z.string().max(500)` (nie optional) + `defaultValues: { dietaryNeeds: "" }`. Zgodnie z CLAUDE.md Phase 3: "non-optional fields + defaultValues". Brak type divergence między input/output Zod.

✅ childCare mapper — `|| undefined` pattern — `entry.practicalInfo.childCare || undefined` spójny z istniejącym `transport`. Pusty string z CMS nie renderuje pustej sekcji.

✅ Baby icon tematycznie właściwy — `Baby` z lucide-react pasuje semantycznie do "Opieka nad dziećmi", spójny `strokeWidth={1.5}`.

✅ Reassurance poza success state — Shield/reassurance jest tylko w formie (linia 251), NIE w `status === "success"` branch (linie 104-121). Poprawne.

✅ Gwiazdki NAD CTA — delay kaskada — animated wariant: gwiazdki `delay: 0.85`, CTA `delay: 1.0`. Social proof pojawia się tuż przed przyciskiem — celowe i dobre dla konwersji.

---

## Faza 2: Średni priorytet

### Checklist

| Zadanie | Plik | Status |
|---------|------|--------|
| Phone icon mobile w Header | Header.tsx:183-191 | PASS |
| `lg:hidden` na mobile phone | Header.tsx:186 | PASS |
| `tel:` href z replace spaces | Header.tsx:185 | PASS |
| analytics.phoneClick() na mobile | Header.tsx:188 | PASS |
| Reassurance Shield nad submit | BookingForm.tsx:251-254 | PASS |
| USP copy empatyczny | page.tsx:32 | PASS |
| SEO layout.tsx title | layout.tsx:6 | PASS (55 znaków) |
| SEO layout.tsx description | layout.tsx:9-11 | PASS (148 znaków) |
| SEO wyjazdy/page.tsx title | wyjazdy/page.tsx:15 | PASS (48 znaków) |
| Gwiazdki PRZED CTA | HeroSection.tsx | PASS (oba warianty) |

### Problemy znalezione

🟠 [important] OG title i Twitter title: 66 znaków (plan wymagał <60)

Plik: `src/app/layout.tsx`, linie 16 i 23

```ts
title: "Wyjazdy z Dziećmi — Warsztaty w naturze, czas dla siebie i dziecka",
//     ^--- 66 znaków
```

Plan w zadaniu 2.4 wymaga: "Tytuły < 60 znaków". Poprzedni review zidentyfikował ten problem. Default meta title (`title.default`) został poprawiony do 55 znaków, ale `openGraph.title` i `twitter.title` nadal mają 66 znaków. Google i media społecznościowe zazwyczaj obcinają OG title po ~55-60 znakach. Proponowane opcje:

```ts
// Opcja A (47 znaków):
"Wyjazdy z Dziećmi — czas dla siebie i dziecka"

// Opcja B (41 znaków):
"Wyjazdy z Dziećmi — Warsztaty w naturze"
```

Nie jest blocking (SEO nadal działa z 66 znakami, tylko lekkie obcięcie w social share), ale jest niezgodne z kryterium akceptacji z planu.

🟡 [nit] USP — linia ~88 znaków bez podziału

Plik: `src/app/(main)/page.tsx`, linia 32

```tsx
Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie.
```

Linia ma 88 znaków (powyżej soft limit 80). Brak wpływu na działanie. Czysto kosmetyczne.

### Dobre wzorce

✅ Mobile phone — dwa niezależne `<a>` zamiast jednego — Desktop phone (z tekstem, `lg:inline-flex`) i mobile phone (tylko ikona, `lg:hidden`) to oddzielne elementy. Semantycznie poprawne, brak potrzeby `display:none` na jednym elemencie.

✅ `tel:` href z `.replace(/\s/g, "")` na obu linkach — `CONTACT.phone` = `"+48 503 098 906"`. Po replace: `"+48503098906"` — poprawny format `tel:`. Identyczna logika na obu phone linkach (desktop linia 167, mobile linia 185).

✅ SEO description 148 znaków — W granicach <155 znaków wymaganych przez plan. Zawiera frazy emocjonalne ("zmęczonych rodziców", "radosnych dzieci", "regenerację").

✅ OG image alt — `alt: "Wyjazdy z Dziećmi"` w images[0] — obecny, poprawny.

---

## Faza 3: Analityka

### Checklist

| Zadanie | Plik | Status |
|---------|------|--------|
| analytics.faqClick(question) | analytics.ts:56-62 | PASS |
| analytics.socialClick(platform) | analytics.ts:64-70 | PASS |
| Accordion onToggle prop | Accordion.tsx:17 | PASS |
| TripFAQ przekazuje onToggle | TripFAQ.tsx:31 | PASS |
| onToggle tylko przy otwieraniu | Accordion.tsx:27 (newId !== null) | PASS |
| SocialLink "use client" | SocialLink.tsx:1 | PASS |
| Footer używa SocialLink | Footer.tsx:59-78 | PASS |
| socialClick z platform.toLowerCase() | SocialLink.tsx:20 | PASS |

### Problemy znalezione

🟡 [nit] Accordion.onToggle sygnatura — `id` parametr nieużywany

Plik: `src/components/ui/Accordion.tsx`, linia 17 + `src/components/trips/TripFAQ.tsx`, linia 31

```tsx
// Accordion type:
onToggle?: (id: string, title: string) => void;

// TripFAQ usage:
onToggle={(_id, title) => analytics.faqClick(title)}
//         ^--- underscore prefix = nieużywany
```

`_id` wskazuje że `id` nie jest potrzebne w callbacku. Sygnaturę można uprościć do `(title: string) => void` i usunąć `_id`. Zostawienie `id` zachowuje elastyczność dla przyszłych użytkowników Accordion z ID-based logic. Decyzja projektowa — obie opcje są poprawne.

### Dobre wzorce

✅ Accordion side effect POZA setState — naprawiony. `toggle()` czyta `openId` z closure (bezpieczne — to event handler, nie concurrent update), wywołuje `setOpenId(newId)` z wartością, potem side effect. Nie ma ryzyka podwójnego GA4 hitu w React Strict Mode.

✅ SocialLink — wąsko wydzielony Client Component — zgodnie z CLAUDE.md Phase 7: "Extract client boundaries narrowly". `SocialLink.tsx` to minimalny `"use client"` wrapper. Footer pozostaje Server Component importującym Client Component — poprawna architektura Next.js App Router.

✅ faqClick — tylko przy otwieraniu — `if (newId !== null && onToggle)` — zamknięcie akordeonu nie triggeruje analytics. Celowe i poprawne.

✅ platform.toLowerCase() — GA4 dostaje `"facebook"` i `"instagram"` (lowercase) jako label, `"Facebook"` i `"Instagram"` (PascalCase) jako aria-label. Separacja prezentacji od danych analitycznych.

---

## Cross-cutting concerns

### Spójność CTA

Sprawdzono wszystkie 5 miejsc:

| Komponent | Przed | Po | Status |
|-----------|-------|-----|--------|
| Header.tsx:179 | "Zarezerwuj" | "Sprawdź terminy" | PASS |
| MobileMenu.tsx:205 | "Zarezerwuj" | "Sprawdź terminy" | PASS |
| StickyBookingCTA.tsx:71 | "Zapisz się na wyjazd" | "Zarezerwuj miejsce" | PASS |
| BookingForm.tsx:264 | "Wyślij zgłoszenie" | "Zarezerwuj miejsce" | PASS |
| HeroSection.tsx (oba warianty) | "Znajdź swój wyjazd" | "Zobacz wyjazdy" | PASS |

Żadne CTA nie mówi już "Zarezerwuj" bez kontekstu.

### Bezpieczeństwo

✅ Honeypot check w API route nie zmieniony — nadal na pozycji przed Zod validation.
✅ Rate limiting nie zmieniony — nadal 5 req/15min per IP.
✅ Nowe pole `dietaryNeeds` przechodzi przez Zod (max 500 znaków) przed logowaniem.
✅ `dietaryNeeds` jest w `log()` ale NIE w TODO webhook body — spójne z istniejącym podejściem.

### Accessibility

✅ Nowy mobile phone link ma prawidłowe `aria-label` z numerem telefonu.
✅ `childCare` w `infoItems` używa `Baby` z `strokeWidth={1.5}` — spójne z resztą ikon.
✅ Shield w reassurance ma `shrink-0` — nie zmniejszy się na wąskich ekranach.
✅ SocialLink zachowuje `target="_blank"` + `rel="noopener noreferrer"` + informacyjny aria-label.

### ESLint

0 błędów, 17 ostrzeżeń. Żadne ostrzeżenie nie zostało wprowadzone przez ten branch:
- `single-parents/page.tsx:2` — Suspense unused (pre-istniejące)
- `BookingForm.tsx:60` — React Compiler incompatible library (`watch()`) (pre-istniejące — `watch` istniał na masterze przed tym branchem)

### Architektura

Brak nowych zależności — zgodnie z planem.

Client boundary chain poprawna:
- `analytics.ts` — brak `"use client"` (safe — `window.gtag` guard-owany przez `typeof window === "undefined"`)
- `Accordion.tsx` — `"use client"` (useState, useReducedMotion)
- `TripFAQ.tsx` — `"use client"` (pre-istniejące na master, importuje Accordion który wymaga "use client")
- `SocialLink.tsx` — `"use client"` (nowe, minimalne, tylko onClick)
- `Footer.tsx` — brak `"use client"` (SC importujący SocialLink — poprawne w Next.js App Router)

YAML data dla past event — `zlot-kaczek-swieta-2025.yaml` (`isPast: true`) otrzymał `childCare`. Poprawne — `TripPracticalInfo` renderuje się także dla past trips (strona archiwalna). Dane użyteczne.

---

## Statystyki

- Plików sprawdzonych: 27 (wszystkie zmienione w branchu)
- Review iteracja: 2 (po naprawach z iteracji 1)
- 🔴 [blocking]: 0 (3 z iteracji 1 naprawione)
- 🟠 [important]: 1 (OG title 66 znaków — przekracza kryterium planu)
- 🟡 [nit]: 2 (USP linia 88 znaków; Accordion.onToggle nieużywany `id` parametr)
- 🔵 [suggestion]: 0
- ✅ [good]: 15

---

## Kolejne kroki

### Wymagają decyzji przed merge:

1. **[important] OG/Twitter title: 66 znaków** — `src/app/layout.tsx` linie 16 i 23
   - Opcja A: `"Wyjazdy z Dziećmi — czas dla siebie i dziecka"` (47 znaków)
   - Opcja B: Zaakceptować 66 znaków jako kompromis

### Opcjonalne (można zrobić w osobnym PR):

2. [nit] USP string podział na linie — `src/app/(main)/page.tsx` linia 32
3. [nit] Accordion.onToggle sygnatura — rozważyć uproszczenie do `(title: string) => void`

### Po merge:

4. Zaktualizować `docs/instrukcja-cms.md` — dodać notatkę o polu "Opieka nad dziećmi" (unikalne teksty dla każdego wyjazdu)
