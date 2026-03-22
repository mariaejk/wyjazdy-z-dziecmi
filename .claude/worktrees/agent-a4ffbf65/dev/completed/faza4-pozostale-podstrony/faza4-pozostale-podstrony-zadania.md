# Faza 4 — Pozostałe podstrony — Zadania

## Etap 4A: Dane (2 zadania)
- [x] 1. `src/data/team.ts` — Maria + Kamila (TeamMember)
- [x] 2. `src/data/places.ts` — Kacze Bagno + Sasek (Place)

## Etap 4B: Komponenty about (2 zadania)
- [x] 3. `src/components/about/PersonBio.tsx` — SC, fallback ikona User
- [x] 4. `src/components/about/PlaceCard.tsx` — SC, Badge na features

## Etap 4C: Strona O nas (1 zadanie)
- [x] 5. `src/app/o-nas/page.tsx` — Intro → Maria → Kamila → Miejsca → CTA

## Etap 4D: Single Parents (1 zadanie)
- [x] 6. `src/app/single-parents/page.tsx` — Hero → 6 korzyści → Opis → CTA

## Etap 4E: Kontakt — formularz + API (3 zadania)
- [x] 7. `src/lib/validations/contact.ts` — Zod 4 schema
- [x] 8. `src/components/contact/ContactForm.tsx` — RHF + Zod, 4 stany
- [x] 9. `src/app/api/contact/route.ts` — POST + honeypot + rate limit

## Etap 4F: Strony Kontakt + Opinie (3 zadania)
- [x] 10. `src/components/contact/ContactInfo.tsx` — email, tel, FB, IG
- [x] 11. `src/app/kontakt/page.tsx` — Grid: ContactInfo + ContactForm
- [x] 12. `src/app/opinie/page.tsx` — Placeholder z CTA

## Etap 4G: Strony prawne (2 zadania)
- [x] 13. `src/app/regulamin/page.tsx` — Placeholder
- [x] 14. `src/app/polityka-prywatnosci/page.tsx` — Placeholder

## Etap 4H: Weryfikacja (1 zadanie)
- [x] 15. `npm run build` — zero błędów ✓

## Do poprawy po review fazy 4

- [x] 🟠 [important] **src/app/o-nas/page.tsx:20-21** — Użyć `getTeamMember()` zamiast dostępu przez indeks tablicy
- [x] 🟠 [important] **src/app/o-nas/page.tsx** — Brak `<h1>` na stronie (SectionHeading renderuje `<h2>`)
- [x] 🟠 [important] **src/components/contact/ContactInfo.tsx:10** — Twarde wartości display name FB/IG zamiast stałych
- [x] 🟡 [nit] **src/data/places.ts** — Dodać eksport `getPlace()` dla spójności z `team.ts`
- [x] 🟡 [nit] **src/components/about/PersonBio.tsx:24** — Użyć `cn()` zamiast template literal dla className
- [x] 🟡 [nit] **src/components/contact/ContactInfo.tsx** — Dodać `aria-label` na linkach FB/IG otwierających nową kartę
- [x] 🟡 [nit] **src/components/about/PersonBio.tsx** — Dodać komentarz TODO o `next/image` gdy zdjęcia będą dostępne
- [x] 🟡 [nit] **src/components/about/PlaceCard.tsx** — Dodać komentarz TODO o `place.image` gdy zdjęcia będą dostępne
- [x] 🔵 [suggestion] **src/app/regulamin/page.tsx, polityka-prywatnosci/page.tsx** — Dodać `robots: { index: false }` na stronach placeholder
- [x] 🟠 [important] **src/app/kontakt/page.tsx** — Dodać `<h1>` + naprawić asymetrię animacji kolumn
