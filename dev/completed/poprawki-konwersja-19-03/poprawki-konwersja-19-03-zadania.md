# Zadania: Poprawki konwersji i zaufania

**Branch:** `feature/poprawki-konwersja-19-03`
**Status:** ✅ Ukończone
**Ostatnia aktualizacja:** 2026-03-19

---

## FAZA 1: KRYTYCZNE (12 zadań)

### 1.1 [S] H1, subtitle i CTA w HeroSection.tsx
- [x] Zmienić H1 (reduced-motion, linia 67-69)
- [x] Zmienić H1 (animated, linia 150-152)
- [x] Zmienić span terracotta z "dorosłych i dzieci" na "na nowo"
- [x] Zmienić subtitle (reduced-motion, linia 71-73)
- [x] Zmienić subtitle (animated, linia 156-163)
- [x] Zmienić CTA Button: "Znajdź swój wyjazd" → "Zobacz wyjazdy" (reduced-motion, linia 95)
- [x] Zmienić CTA Button: "Znajdź swój wyjazd" → "Zobacz wyjazdy" (animated, linia 199)
- [x] Verify: oba warianty mają identyczny tekst
- [x] Test: `npm run build` bez błędów

### 1.2 [M] Child care section
- [x] `src/types/trip.ts` — dodać `childCare?: string` do `practicalInfo` (linia 58-62)
- [x] `keystatic.config.ts` — dodać pole `childCare` w practicalInfo fields
- [x] `src/data/trips.ts` — mapowanie `childCare` w `mapTrip()`
- [x] `src/components/trips/TripPracticalInfo.tsx` — dodać typ `childCare?: string`
- [x] `TripPracticalInfo.tsx` — dodać item do `infoItems[]` z ikoną `Baby`, label "Opieka nad dziećmi"
- [x] Import `Baby` z lucide-react
- [x] `content/trips/matka-i-corka.yaml` — dodać treść childCare
- [x] `content/trips/yoga-i-konie.yaml` — dodać treść childCare (lub pominąć jeśli brak)
- [x] Test: field widoczny w Keystatic admin
- [x] Test: renderuje się na podstronach gdy wypełnione
- [x] Test: nie wyświetla się gdy puste
- [x] Test: `npm run build` bez błędów

### 1.3 [S] CTA copy
- [x] `src/components/layout/Header.tsx` linia 179: `"Zarezerwuj"` → `"Sprawdź terminy"`
- [x] `src/components/layout/MobileMenu.tsx` CTA na dole: `"Zarezerwuj"` → `"Sprawdź terminy"`
- [x] `src/components/trips/StickyBookingCTA.tsx`: `"Zapisz się na wyjazd"` → `"Zarezerwuj miejsce"`
- [x] `src/components/trips/BookingForm.tsx` linia 251: `"Wyślij zgłoszenie"` → `"Zarezerwuj miejsce"`
- [x] Test: `npm run build` bez błędów

### 1.4 [S] Diet/allergy field
- [x] `src/lib/validations/booking.ts` — dodać `dietaryNeeds: z.string().max(500, "...")`
- [x] `BookingForm.tsx` defaultValues — dodać `dietaryNeeds: ""`
- [x] `BookingForm.tsx` — dodać Input pole dla alergii PRZED Textarea
- [x] `BookingForm.tsx` — register `dietaryNeeds` pole
- [x] `BookingForm.tsx` linia 203 — zmienić Textarea placeholder na `"Pytania, uwagi..."`
- [x] Test: pole dieta widoczne, walidacja 500 znaków
- [x] Test: forma submit z i bez dieta field
- [x] `src/app/api/booking/route.ts` — dodać `dietaryNeeds: data.dietaryNeeds` do `log()`
- [x] Test: `npm run build` bez błędów

---

## FAZA 2: ŚREDNI PRIORYTET (4 zadania)

### 2.1 [S] Mobile phone icon
- [x] `src/components/layout/Header.tsx` — dodać link `tel:` z ikoną Phone PRZED hamburgerem
- [x] Klasa: `lg:hidden` (widoczny tylko na mobile)
- [x] aria-label z numerem telefonu
- [x] onClick: `analytics.phoneClick()`
- [x] Test: ikona widoczna na mobile, ukryta na lg+
- [x] Test: kliknięcie otwiera `tel:` link
- [x] Test: `npm run build` bez błędów

### 2.2 [S] No-payment reassurance
- [x] `BookingForm.tsx` — dodać `<p>` z Shield ikoną i tekstem PRZED `<div className="pt-2">`
- [x] Import `Shield` z lucide-react
- [x] Tekst: "Rezerwacja jest bezpłatna — nie płacisz z góry. Szczegóły płatności otrzymasz po potwierdzeniu."
- [x] Styling: `text-sm text-graphite-light`, ikona moss kolor
- [x] Test: tekst widoczny nad przyciskiem submit
- [x] Test: `npm run build` bez błędów

### 2.3 [S] USP copy
- [x] `src/app/(main)/page.tsx` linia 31-33 — zmienić USP tekst
- [x] Nowy tekst: "Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie."
- [x] Test: `npm run build` bez błędów

### 2.5 [S] Badges/5-star nad CTA w Hero
- [x] Przenieść div z gwiazdkami PRZED div z Button (reduced-motion)
- [x] Przenieść motion.div z gwiazdkami PRZED motion.div z Button (animated)
- [x] Dostosować marginesy: gwiazdki `mt-8 sm:mt-10`, Button `mt-4`
- [x] Verify: oba warianty spójne
- [x] Test: `npm run build` bez błędów

### 2.4 [S] SEO meta tags
- [x] `src/app/layout.tsx` — `title.default` → `"Wyjazdy z Dziećmi — Warsztaty w naturze, czas dla siebie i dziecka"`
- [x] `src/app/layout.tsx` — `description` → emocjonalna, < 155 znaków
- [x] `src/app/layout.tsx` — `og.title` i `og.description` update
- [x] `src/app/layout.tsx` — `twitter.title` i `twitter.description` update
- [x] `src/app/(main)/wyjazdy/page.tsx` — title: `"Wyjazdy"` → `"Nadchodzące wyjazdy warsztatowe — terminy i ceny"`
- [x] Test: tytuły < 60 znaków, opisy < 155 znaków
- [x] Test: `npm run build` bez błędów

---

## FAZA 3: NISKI PRIORYTET (2 zadania)

### 3.1 [S] FAQ click tracking
- [x] `src/lib/analytics.ts` — dodać `faqClick(question: string)` metoda
- [x] `src/components/ui/Accordion.tsx` — dodać opcjonalny `onToggle` callback prop
- [x] `src/components/trips/TripFAQ.tsx` — podpiąć `analytics.faqClick(question)` na toggle
- [x] Test: GA4 event `faq_click` w DevTools

### 3.2 [S] Social media click tracking
- [x] `src/lib/analytics.ts` — dodać `socialClick(platform: string)` metoda
- [x] `src/components/layout/Footer.tsx` — wydzielić `SocialLink` jako mały client component
- [x] Podpiąć `onClick: () => analytics.socialClick(platform)`
- [x] Test: GA4 event `social_click` w DevTools

---

## SUMMARY

| Faza | Liczba zadań | Effort | Status |
|------|-------------|--------|--------|
| 1 Krytyczne | 14 | ~2h | ✅ Done |
| 2 Średni | 5 | ~1.25h | ✅ Done |
| 3 Niski | 2 | ~1h | ✅ Done |
| **RAZEM** | **21** | **~4.25h** | **✅ Done** |

---

## Workflow wykonania
1. Wyciągnij branch: `git checkout feature/poprawki-konwersja-19-03`
2. Wykonaj Fazę 1 (krytyczne, podstawa)
3. Test: `npm run build` i Vercel preview
4. Jeśli OK → Faza 2 (średni priorytet)
5. Jeśli OK → Faza 3 (analityka)
6. Final test: `npm run build` cały projekt
7. Commit z message wg template w kontekście
8. Push do branch, utwórz PR
