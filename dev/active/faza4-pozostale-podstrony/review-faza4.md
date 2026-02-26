# Code Review — Faza 4

## Podsumowanie

Faza 4 jest zaimplementowana solidnie i spójnie z istniejącymi wzorcami projektu. Struktura kodu, TypeScript, bezpieczeństwo API i UX formularzy są na dobrym poziomie. Znaleziono 0 problemów blokujących, 5 ważnych (Important), 6 drobnych (Nit) oraz 5 sugestii. Wszystkie 15 zadań z planu zostało wykonanych.

---

## Pliki sprawdzone

1. `src/data/team.ts`
2. `src/data/places.ts`
3. `src/components/about/PersonBio.tsx`
4. `src/components/about/PlaceCard.tsx`
5. `src/app/o-nas/page.tsx`
6. `src/app/single-parents/page.tsx`
7. `src/lib/validations/contact.ts`
8. `src/components/contact/ContactForm.tsx`
9. `src/app/api/contact/route.ts`
10. `src/components/contact/ContactInfo.tsx`
11. `src/app/kontakt/page.tsx`
12. `src/app/opinie/page.tsx`
13. `src/app/regulamin/page.tsx`
14. `src/app/polityka-prywatnosci/page.tsx`

---

## Problemy

### 🔴 Blocking (krytyczne)

Brak.

---

### 🟠 Important (ważne)

1. **`src/app/o-nas/page.tsx:20-21`** — Dostęp do danych przez indeks tablicy (kruchy wzorzec).
   `teamMembers[0]` / `teamMembers[1]` — jeśli kolejność w `team.ts` się zmieni, strona wyświetli błędne osoby bez błędu kompilacji. Funkcja `getTeamMember()` już istnieje — powinna być użyta.

2. **`src/app/o-nas/page.tsx`** — SEO: brak `<h1>` na stronie. `SectionHeading` renderuje zawsze `<h2>`. Każda strona powinna mieć dokładnie jeden `<h1>`. Strony `opinie`, `regulamin`, `polityka-prywatnosci`, `single-parents` mają prawidłowe `<h1>`.

3. **`src/app/kontakt/page.tsx:29-34`** — Asymetria animacji kolumn. `ContactInfo` ma wewnętrzne `ScrollAnimation` na każdym elemencie. `ContactForm` jest opakowany w zewnętrzny `ScrollAnimation`. Efekt: kolumny wchodzą inaczej. Do weryfikacji czy zamierzone.

4. **`src/lib/validations/contact.ts:15-18`** — `z.literal(true, { error: ... })` — warto zweryfikować w runtime czy komunikat błędu faktycznie się wyświetla w Zod 4. Wzorzec identyczny z `booking.ts`, więc jeśli tam działa — OK.

5. **`src/components/contact/ContactInfo.tsx:10`** — Twarde wartości `"wyjazdyzdziecmi"` i `"@wyjazdyzdziecmi"` zamiast stałych z constants. Ryzyko rozsynchronizowania.

---

### 🟡 Nit (drobne)

1. **`src/data/places.ts`** — Brak eksportu `getPlace()` — niespójność z `team.ts` który eksportuje `getTeamMember()`.

2. **`src/components/about/PersonBio.tsx`** — Brak komentarza `// TODO: add next/image when photos available` — pole `image` w typie jest ignorowane.

3. **`src/components/about/PersonBio.tsx:24`** — Template literal dla className zamiast `cn()`. Cały projekt używa `cn()` z `clsx + tailwind-merge`.

4. **`src/components/contact/ContactInfo.tsx`** — Brak `aria-label` na linkach FB/IG otwierających się w nowej karcie. Powinno mieć `aria-label="Facebook (otwiera się w nowej karcie)"`.

5. **`src/app/single-parents/page.tsx:13`** — `title: "Single Parents"` (angielski) vs reszta stron po polsku. Do weryfikacji z klientem.

6. **`src/app/o-nas/page.tsx:80-85`** — Identyczna struktura CTA (h2 + p + 2 Buttons) powtarza się na o-nas i single-parents. Mogłoby być wydzielone do `CtaSection`.

---

### 🔵 Suggestion (sugestie)

1. **`src/components/ui/SectionHeading.tsx`** — Dodać prop `as?: "h1" | "h2" | "h3"` dla elastyczności hierarchii nagłówków (rozwiązanie problemu h1 na podstronach).

2. **`src/data/team.ts`** — Dodać `slug` do `TeamMember` dla przyszłego routingu.

3. **`src/app/api/contact/route.ts:62-66`** — `console.log` powinien być za guardem `NODE_ENV !== "production"` lub usunięty przed produkcją.

4. **`src/app/regulamin/page.tsx` i `src/app/polityka-prywatnosci/page.tsx`** — Dodać `robots: { index: false, follow: false }` do metadata na stronach placeholder, aby nie indeksowały się w Google.

5. **`src/components/about/PlaceCard.tsx`** — Brak `next/image` mimo `place.image` w typie. Dodać komentarz `// TODO: add place.image when photos available`.

---

## ✅ Dobre praktyki

- Konsekwentne kodowanie polskich znaków: `\u00F3`, `\u017C` w `.ts`, `&mdash;`, `&bdquo;` w JSX
- Wzorzec API route: `contact/route.ts` niemal identyczny z `booking/route.ts` — pełna spójność
- Wzorzec formularza: `ContactForm` poprawnie kopiuje wzorzec z `BookingForm`
- `consentRodo: false as unknown as true` — spójny workaround dla Zod 4 + RHF
- Honeypot: `HoneypotField` + fake 200 w API — poprawnie w obu formularzach
- Stabilne keys: `key={place.name}`, `key={benefit.title}` zamiast `key={index}`
- Server Components domyślnie: tylko `ContactForm` ma `"use client"`
- Semantyczny HTML: `<section>` przez SectionWrapper, hierarchia nagłówków, `role="alert"`
- Responsywność: mobile-first, `sm:grid-cols-2 lg:grid-cols-3`, `flex-col ... lg:flex-row`
- `strokeWidth={1.5}` na wszystkich ikonach Lucide — zgodnie z design system
- `generateMetadata` / `export const metadata` na wszystkich stronach

---

## Statystyki

- Plików sprawdzonych: 14
- 🔴 Blocking: 0
- 🟠 Important: 5
- 🟡 Nit: 6
- 🔵 Suggestion: 5
