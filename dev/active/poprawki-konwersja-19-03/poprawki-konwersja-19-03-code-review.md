# Code Review: poprawki-konwersja-19-03

**Last Updated: 2026-03-19**
**Branch:** `feature/poprawki-konwersja-19-03`
**Reviewer:** Claude Sonnet 4.6
**Build status:** Passed (27 stron — per kontekst zadania)

---

## Executive Summary

Wszystkie 18 zadań z planu zostały zaimplementowane. Kod jest ogólnie dobrej jakości i zgodny z wzorcami projektu. Znaleziono 1 problem blokujący (side effect w setState), 2 ważne uwagi (SEO title za długi, aria-label małymi literami w SocialLink) oraz kilka drobnych niuansów. Żadna zmiana nie narusza krytycznych constraints z CLAUDE.md.

---

## Checklist zgodności z planem

| Element | Status | Uwagi |
|---------|--------|-------|
| H1 hero — oba warianty identyczne | PASS | Tekst i span terracotta identyczne w obu |
| Gwiazdki NAD przyciskiem CTA — oba warianty | PASS | Poprawnie przestawione |
| CTA copy spójność (Header/Menu/Sticky/Form) | PASS | Wszystkie 4 miejsca zaktualizowane |
| dietaryNeeds w Zod schema | PASS | max(500) |
| dietaryNeeds w defaultValues | PASS | `""` |
| dietaryNeeds w API route log | PASS | Dodano do log() |
| childCare w Trip type | PASS | `childCare?: string` |
| childCare w keystatic.config | PASS | fields.text multiline |
| childCare w mapTrip() | PASS | `\|\| undefined` pattern |
| childCare w TripPracticalInfo type | PASS | |
| childCare w infoItems[] | PASS | Baby icon |
| childCare w content YAML (4 pliki) | PASS | Wszystkie 4 wyjazdy |
| Shield import w BookingForm | PASS | |
| Reassurance text nad przyciskiem | PASS | |
| Phone icon na mobile w Header (lg:hidden) | PASS | |
| USP text zmieniony w page.tsx | PASS | |
| SEO meta tagi layout.tsx | PARTIAL | Title 66 znaków — powyżej rekomendacji 60 |
| SEO meta tagi wyjazdy/page.tsx | PASS | 48 znaków |
| analytics.faqClick | PASS | |
| analytics.socialClick | PASS | |
| Accordion onToggle callback | PASS | |
| SocialLink client component | PASS | |
| Footer używa SocialLink | PASS | |

---

## Krytyczne problemy (must fix)

### [blocking] Side effect wewnątrz setState updater function — Accordion.tsx:25-32

**Plik:** `src/components/ui/Accordion.tsx`, linie 25-32

**Problem:** `onToggle` jest wywoływany wewnątrz funkcji przekazywanej do `setOpenId`. W React Strict Mode i w React 19 funkcja setState updater może być wywoływana **wielokrotnie** (React może odpalić ją 2x w celu wykrycia side effects). Oznacza to, że `analytics.faqClick()` — wywołanie do GA4 — może zostać wysłane dwukrotnie.

```tsx
// OBECNY KOD — PROBLEMATYCZNY
const toggle = (id: string) => {
  setOpenId((prev) => {
    const newId = prev === id ? null : id;
    if (newId !== null && onToggle) {         // <-- side effect w setState!
      const item = items.find((i) => i.id === newId);
      if (item) onToggle(newId, item.title);  // <-- podwójny GA4 hit w Strict Mode
    }
    return newId;
  });
};
```

**Poprawka — side effect poza setState:**
```tsx
const toggle = (id: string) => {
  const newId = openId === id ? null : id;
  setOpenId(newId);
  if (newId !== null && onToggle) {
    const item = items.find((i) => i.id === newId);
    if (item) onToggle(newId, item.title);
  }
};
```

Ta wersja używa wartości `openId` z closures (co jest bezpieczne — toggle jest wywoływany tylko przez user event, nie ma race condition przy single-user interaction), wywołuje `setOpenId` z wartością (nie funkcją updater), i odpala side effect po setState.

**Dlaczego blokujące:** Fałszywe eventy analytics zaburzają dane konwersji — jeden klik FAQ = dwa GA4 eventy. Niszczy wiarygodność danych.

---

## Ważne uwagi (should fix)

### [important] SEO title w layout.tsx przekracza rekomendację 60 znaków

**Plik:** `src/app/layout.tsx`, linia 6

**Aktualny tytuł:** `"Wyjazdy z Dziećmi — Warsztaty w naturze, czas dla siebie i dziecka"` — **66 znaków**

Plan wymagał `< 60 znaków`. Google obcina tytuły powyżej ~60 znaków (≈600px pikseli) w SERP. Tytuł zostanie przycięty do np. `"Wyjazdy z Dziećmi — Warsztaty w naturze, czas dla sieb..."`.

**Propozycja skrótu (57 znaków):**
```
"Wyjazdy z Dziećmi — czas dla siebie i dziecka w naturze"
```
lub (55 znaków):
```
"Wyjazdy z Dziećmi — warsztaty w naturze dla rodzin"
```

**Uwaga:** Tytuł OG/Twitter (też 66 znaków) może zostać bez zmian — tam limit jest luźniejszy (Facebook ~88 znaków, Twitter ~70 znaków). Problem dotyczy tylko tagu `<title>` (default).

### [important] aria-label w SocialLink — małe litery zamiast nazwy własnej

**Plik:** `src/components/layout/SocialLink.tsx`, linia 18

```tsx
aria-label={`${platform} (otwiera się w nowej karcie)`}
// przy platform="facebook" => "facebook (otwiera się w nowej karcie)"
// przy platform="instagram" => "instagram (otwiera się w nowej karcie)"
```

Oryginalne `<a>` w Footer miało poprawnie: `"Facebook (otwiera się w nowej karcie)"` — wielka litera, bo to nazwa własna marki. Obecna implementacja używa wartości `platform` dosłownie (`"facebook"` małymi literami), co obniża jakość dla screen readerów.

**Poprawka:**
```tsx
aria-label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} (otwiera się w nowej karcie)`}
```
lub prościej, traktując platform jako display name i przekazując kapitalizowaną wartość z Footer:
```tsx
// Footer.tsx
<SocialLink href={SOCIAL_LINKS.facebook} platform="Facebook" ...>
<SocialLink href={SOCIAL_LINKS.instagram} platform="Instagram" ...>
```
Ta druga opcja jest czystsza — `platform` jako display name, a `analytics.socialClick` dostaje `"Facebook"` zamiast `"facebook"`. Jeśli GA4 ma zbierać lowercase dla spójności eventów, można normalizować wewnątrz `socialClick()`:
```ts
socialClick(platform: string) {
  trackEvent({ action: "social_click", category: "engagement", label: platform.toLowerCase() });
}
```

---

## Drobne uwagi (nit)

### [nit] Wszystkie 4 YAML-e mają identyczną treść childCare

**Pliki:** `content/trips/matka-i-corka.yaml`, `rodzinny-konie-joga-2026.yaml`, `zlot-kaczek-2026.yaml`, `zlot-kaczek-swieta-2025.yaml`

Każdy wyjazd ma dokładnie ten sam tekst:
> "Podczas bloków warsztatowych dla dorosłych, dziećmi opiekują się doświadczone animatorki. Program dla dzieci obejmuje zabawy na świeżym powietrzu, tworzenie i ruch."

To poprawne jako placeholder — plan to przewidywał ("dokumentacja dla klientki"). Warto dodać notatkę w `docs/instrukcja-cms.md` że klientka powinna dostosować ten tekst do każdego wyjazdu indywidualnie, bo różne miejsca mogą mieć różne programy dla dzieci.

### [nit] USP tekst — długa linia bez łamania

**Plik:** `src/app/(main)/page.tsx`, linia 32

```tsx
Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie.
```

Linia ma ~90 znaków (powyżej typowego soft limit 80). Czysto formatacyjnie — brak wpływu na działanie. Dla spójności z resztą kodu (inne długie stringi są dzielone na 2-3 linie) można rozważyć podział na linie w JSX. Nie jest wymagane.

### [nit] dietaryNeeds pole — brak `id` prop w Input

**Plik:** `src/components/trips/BookingForm.tsx`, linia 199-204

```tsx
<Input
  label="Alergie / wymagania dietetyczne"
  placeholder="np. bezglutenowo, alergia na orzechy"
  {...register("dietaryNeeds")}
  error={errors.dietaryNeeds?.message}
/>
```

Pattern projektu (z CLAUDE.md Phase 3): `forwardRef` + `id = id ?? props.name`. Komponent `Input` sam przypisuje `id` z `name` gdy nie podano `id` — więc funkcjonalnie jest OK. Wzorzec jest przestrzegany.

---

## Sugestie (opcjonalne)

### [suggestion] Accordion onToggle — typ callback można zoptymalizować

**Plik:** `src/components/ui/Accordion.tsx`, linia 17

```tsx
onToggle?: (id: string, title: string) => void;
```

Przekazywanie `id` jako pierwszy parametr jest zbędne — `TripFAQ.tsx` używa tylko `title`:
```tsx
onToggle={(_id, title) => analytics.faqClick(title)}
```

Można uprościć sygnaturę do `(title: string) => void` i usunąć `_id`. Ale może być przydatne w innych kontekstach. Zostaw jak jest jeśli planujesz reużywać Accordion z ID-based logic.

### [suggestion] Phone icon w Header — kolejność HTML vs plan

**Plik:** `src/components/layout/Header.tsx`, linie 183-192

Plan mówił: "Dodać PRZED hamburgerem". Implementacja jest zgodna — phone jest przed hamburgerem w HTML. Wizualnie ikona telefonu pojawi się po lewej stronie hamburgera (HTML order = visual order w flex). Jeśli projekt chce telefon bliżej prawej krawędzi niż hamburger (telefon jest mniej ważny niż hamburger), kolejność jest OK. Jeśli ma być na końcu (hamburger ostatni), można zamienić.

---

## Dobre wzorce — docenione

### [good] SocialLink jako wąsko wydzielony Client Component

Wzorzec z CLAUDE.md Phase 7: "Extract client boundaries narrowly". `SocialLink.tsx` to minimal `"use client"` — tylko `onClick` handler. Footer pozostaje Server Component. Idealnie.

### [good] dietaryNeeds w defaultValues i schema — konsekwentny pattern Zod 4 + RHF

Pole dodane jako `z.string().max(500)` (nie optional) + `defaultValues: { dietaryNeeds: "" }`. Dokładnie wzorzec z CLAUDE.md Phase 3: "non-optional fields + defaultValues in useForm()". Brak type divergence.

### [good] childCare mapper — `|| undefined` pattern

```ts
childCare: entry.practicalInfo.childCare || undefined,
```
Spójny z istniejącym `transport: entry.practicalInfo.transport || undefined`. Zapewnia że puste string z CMS nie powoduje renderowania pustej sekcji.

### [good] onToggle wywołuje się tylko przy otwieraniu (newId !== null)

```tsx
if (newId !== null && onToggle) { ... }
```
Zamknięcie accordion NIE triggeruje analytics. Poprawne — chcemy śledzić kliknięcie pytania, nie zamknięcie. Intentional i sensowne.

### [good] Gwiazdki NAD CTA — delay timing w animated variant

W animated wariancie gwiazdki mają `delay: 0.85` a CTA `delay: 1.0`. Naturalna kaskada: tekst → benefit cards → gwiazdki → CTA. Social proof pojawia się tuż przed przyciskiem — świetne dla konwersji.

---

## Architektura — obserwacje

**Brak nowych zależności** — zgodnie z planem. Wszystkie zmiany korzystają z istniejących bibliotek.

**TripFAQ miał już `"use client"`** — analytics import nie wymagał dodatkowej zmiany granicy klienta. Dobra obserwacja przy implementacji.

**Keystatic schema** — pole dodano w odpowiednim miejscu w `practicalInfo` nested object. Kolejność pól w CMS będzie: zakwaterowanie, jedzenie, dojazd, opieka nad dziećmi — logiczna.

**API route** — `dietaryNeeds` dodano tylko do `log()`, co jest prawidłowe. `safeParse()` już akceptuje nowe pole ponieważ schema jest shared (Zod). Brak redundancji.

---

## Kolejne kroki

Wymagają decyzji i zatwierdzenia przed implementacją:

1. **[blocking] Naprawić `toggle()` w Accordion.tsx** — przenieść `onToggle` wywołanie poza setState updater (patrz sekcja blokujących)
2. **[important] Skrócić title w layout.tsx** do max 60 znaków lub zaakceptować 66 jako kompromis
3. **[important] Poprawić aria-label w SocialLink** — kapitalizacja nazwy platformy
4. **[opcjonalne] Dodać notatkę w instrukcja-cms.md** o indywidualnych tekstach childCare dla każdego wyjazdu
