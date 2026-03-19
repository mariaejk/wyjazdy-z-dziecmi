# Plan: Poprawki konwersji i zaufania (audyt Gemini 19.03)

**Branch:** `feature/poprawki-konwersja-19-03`
**Status:** ✅ Wykonane — wszystkie 3 fazy, build OK
**Ostatnia aktualizacja:** 2026-03-19

---

## Faza 1: KRYTYCZNE — Copy i konwersja

### 1.1 Emocjonalny H1, subtitle i CTA w hero [S]
**Plik:** `src/components/home/HeroSection.tsx`

| Element | Obecne | Nowe |
|---------|--------|------|
| H1 (linie 67-69 + 150-152) | `Warsztaty wyjazdowe dla dorosłych i dzieci` | `Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo.` |
| Span terracotta | `dorosłych i dzieci` | `na nowo` |
| Subtitle (linie 71-73 + 156-163) | `Projekt, który powstał z potrzeby spędzania jakościowego czasu z dziećmi...` | `Wyjazdy warsztatowe w naturze, gdzie Ty się regenerujesz, a Twoje dziecko się bawi i rozwija. Joga, taniec, ceramika, konie — i wreszcie czas dla siebie.` |
| CTA Button (linia 95 + 199) | `Znajdź swój wyjazd` | `Zobacz wyjazdy` |

**Uwaga:** Zmiana w OBU wariantach (reduced-motion + animated). Tekst identyczny.
**Kryteria akceptacji:** H1 jest empatyczny i korzyściowy, CTA pasywne ("zobacz" nie "szukaj"), oba warianty spójne, `npm run build` bez błędów.

---

### 1.2 Sekcja "Opieka nad dziećmi" w informacjach praktycznych [M]
**Pliki:**
1. `src/types/trip.ts` (linia 58-62) — dodać `childCare?: string` do `practicalInfo`
2. `keystatic.config.ts` — dodać pole `childCare` (text, multiline) w `practicalInfo` fields
3. `src/data/trips.ts` — mapowanie `childCare` w `mapTrip()`
4. `src/components/trips/TripPracticalInfo.tsx`:
   - Typ `PracticalInfo` (linia 7-11): dodać `childCare?: string`
   - `infoItems[]` (linia 17-21): dodać `{ key: "childCare", icon: Baby, label: "Opieka nad dziećmi" }`
   - Import `Baby` z lucide-react
5. `content/trips/*.yaml` — dodać treść np.: `"Podczas bloków warsztatowych dla dorosłych, dziećmi opiekują się doświadczone animatorki. Program dla dzieci obejmuje zabawy na świeżym powietrzu, tworzenie i ruch."`

**Kryteria akceptacji:** Pole widoczne w CMS Keystatic, renderuje się na podstronach wyjazdów gdy wypełnione, nie wyświetla się gdy puste.

---

### 1.3 CTA copy — korzyściowe zamiast transakcyjnych [S]
| Plik | Obecne | Nowe |
|------|--------|------|
| `Header.tsx` (linia 179) | `Zarezerwuj` | `Sprawdź terminy` |
| `MobileMenu.tsx` (CTA na dole) | `Zarezerwuj` | `Sprawdź terminy` |
| `StickyBookingCTA.tsx` | `Zapisz się na wyjazd` | `Zarezerwuj miejsce` |
| `BookingForm.tsx` (linia 251) | `Wyślij zgłoszenie` | `Zarezerwuj miejsce` |

**Kryteria akceptacji:** Żadne CTA nie mówi "Zarezerwuj" bez kontekstu. Build passes.

---

### 1.4 Osobne pole dieta/alergie w formularzu [S]
**Pliki:**
1. `src/lib/validations/booking.ts` (przed linia 35) — dodać: `dietaryNeeds: z.string().max(500, "Opis wymagań dietetycznych jest za długi")`
2. `src/components/trips/BookingForm.tsx`:
   - `defaultValues`: dodać `dietaryNeeds: ""`
   - Przed Textarea "Uwagi" (linia 201): dodać `<Input label="Alergie / wymagania dietetyczne" placeholder="np. bezglutenowo, alergia na orzechy" {...register("dietaryNeeds")} error={errors.dietaryNeeds?.message} />`
   - Textarea placeholder (linia 203): `"Alergie, dieta, pytania..."` → `"Pytania, uwagi..."`

**Kryteria akceptacji:** Dwa osobne pola (dieta + uwagi), oba opcjonalne, walidacja max 500 znaków na diecie. Build passes.

**API route update:** `src/app/api/booking/route.ts` — dodać `dietaryNeeds: data.dietaryNeeds` do `log()` (linia 63-69). Zod schema jest shared, więc `safeParse()` już akceptuje nowe pole, ale log jawnie wybiera pola.

---

## Faza 2: ŚREDNI PRIORYTET — UX i zaufanie

### 2.1 Ikona telefonu na mobile w Header [S]
**Plik:** `src/components/layout/Header.tsx`

Dodać PRZED hamburgerem (linia 183), wewnątrz `<div className="flex items-center gap-4">`:
```tsx
<a
  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
  className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss lg:hidden"
  aria-label={`Zadzwoń: ${CONTACT.phoneDisplay}`}
  onClick={() => analytics.phoneClick()}
>
  <Phone className="h-5 w-5" strokeWidth={1.5} />
</a>
```

`Phone` jest już zaimportowane. `lg:hidden` ukrywa na desktop.
**Kryteria akceptacji:** Ikona telefonu widoczna na mobile obok hamburgera, ukryta na lg+, `tel:` link działa, `analytics.phoneClick()` się odpala.

---

### 2.2 Tekst "nie płacisz z góry" nad przyciskiem formularza [S]
**Plik:** `src/components/trips/BookingForm.tsx`

Dodać PRZED `<div className="pt-2">` (linia 243):
```tsx
<p className="flex items-center gap-2 text-sm text-graphite-light">
  <Shield className="h-4 w-4 shrink-0 text-moss" strokeWidth={1.5} />
  Rezerwacja jest bezpłatna — nie płacisz z góry. Szczegóły płatności otrzymasz po potwierdzeniu.
</p>
```

Import `Shield` z `lucide-react`.
**Kryteria akceptacji:** Tekst widoczny nad przyciskiem submit, ikona Shield w kolorze moss. Build passes.

---

### 2.3 USP copy — bardziej empatyczny [S]
**Plik:** `src/app/(main)/page.tsx` (linia 31-33)

| Obecne | Nowe |
|--------|------|
| `Jedyne w Polsce wyjazdy warsztatowe łączące rozwój osobisty rodziców z programem dla dzieci.` | `Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie.` |

**Kryteria akceptacji:** USP mówi "Ty/Twoje", krótkie zdania. Build passes.

---

### 2.5 Badges/5-star nad CTA w Hero [S]
**Plik:** `src/components/home/HeroSection.tsx`

Przenieść blok gwiazdek "Polecane przez rodziców" PRZED przycisk CTA (zamiast po nim) w OBU wariantach:
- **Reduced-motion:** div z gwiazdkami (linie 99-108) PRZED div z Button (linie 93-97)
- **Animated:** motion.div z gwiazdkami (linie 206-218) PRZED motion.div z Button (linie 195-201)
- Dostosować marginesy: gwiazdki `mt-8 sm:mt-10`, Button `mt-4`

**Dlaczego:** Social proof nad CTA zwiększa click-through — rodzic widzi "Polecane" → czuje się pewniej klikając.
**Kryteria akceptacji:** Gwiazdki nad przyciskiem, oba warianty spójne. Build passes.

---

### 2.4 SEO meta tagi [S]
**Pliki:**
1. `src/app/layout.tsx` — title.default: `"Wyjazdy z Dziećmi — Warsztaty w naturze, czas dla siebie i dziecka"`, description z emocjonalnymi frazami
2. `src/app/(main)/wyjazdy/page.tsx` — title: `"Wyjazdy"` → `"Nadchodzące wyjazdy warsztatowe — terminy i ceny"`

**Kryteria akceptacji:** Tytuły < 60 znaków, opisy < 155 znaków, zawierają frazy emocjonalne. Build passes.

---

## Faza 3: NISKI PRIORYTET — Analityka

### 3.1 FAQ click tracking [S]
- `src/lib/analytics.ts` — dodać `faqClick(question: string)`
- `src/components/ui/Accordion.tsx` — dodać opcjonalny `onToggle` callback
- `src/components/trips/TripFAQ.tsx` — podpiąć analytics

### 3.2 Social media click tracking [S]
- `src/lib/analytics.ts` — dodać `socialClick(platform: string)`
- Wydzielić `SocialLink` client component z Footer (Footer zostaje Server Component)

---

## Wykluczone z tego planu
- ~~Reorganizacja menu~~ — osobno, po konsultacji z klientką
- ~~Scroll depth tracking~~ — wymaga nowego komponentu, niski priorytet

---

## Weryfikacja
1. `npm run build` — zero błędów
2. Podgląd Vercel — mobile i desktop
3. Testy manualne: H1, ikona telefonu, formularz (pole dieta), CTA spójność, child care w practical info
4. GA4 DevTools — sprawdzić nowe eventy (faq_click, social_click)

---

## Szacunek nakładu
- **Faza 1:** ~2h (1×M + 3×S)
- **Faza 2:** ~1h (4×S)
- **Faza 3:** ~1h (2×S)
- **Łącznie:** ~4h
