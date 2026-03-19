# Kontekst: Poprawki konwersji i zaufania (audyt Gemini 19.03)

**Branch:** `feature/poprawki-konwersja-19-03`
**Data:** 2026-03-19
**Status:** ✅ Wszystkie 3 fazy ukończone (równoległe worktrees)

---

## Źródło
Audyt Gemini CLI: `dev/gemini/2026-03-19_analiza-landing-page-podstrony.md`

Gemini przeanalizował entire landing page i podstrony, identyfikując:
- **Krytyczne:** H1 zbyt funkcjonalny, brak sekcji opieki nad dziećmi, CTA transakcyjny zamiast korzyściowego, diet/allergy w jednym polu
- **Średni priorytet:** Brak ikony telefonu na mobile, słabe SEO meta tagi, brak reassurance "nie płacisz z góry"
- **Niski:** Analytics tracking dla FAQ i social clicks

---

## Kluczowe pliki do modyfikacji

### Faza 1 (Krytyczne)
- `src/components/home/HeroSection.tsx` — H1 + subtitle (2 warianty: reduced-motion + animated)
- `src/types/trip.ts` — rozszerzenie Trip type o childCare
- `keystatic.config.ts` — nowe pole w CMS
- `src/data/trips.ts` — mapper dla childCare
- `src/components/trips/TripPracticalInfo.tsx` — nowy item w UI
- `content/trips/*.yaml` — treść dla wyjazdów
- `src/components/layout/Header.tsx` — zmiana copy CTA
- `src/components/layout/MobileMenu.tsx` — zmiana copy CTA
- `src/components/trips/StickyBookingCTA.tsx` — zmiana copy
- `src/components/trips/BookingForm.tsx` — nowe pole, zmiana copy
- `src/lib/validations/booking.ts` — Zod schema dla dietaryNeeds
- `src/app/(main)/page.tsx` — USP copy

### Faza 2 (Średni priorytet)
- `src/components/layout/Header.tsx` — ikona telefonu na mobile
- `src/components/trips/BookingForm.tsx` — reassurance tekst
- `src/app/layout.tsx` — meta tagi
- `src/app/(main)/wyjazdy/page.tsx` — title

### Faza 3 (Niski priorytet)
- `src/lib/analytics.ts` — nowe metody tracking
- `src/components/ui/Accordion.tsx` — callback dla toggle
- `src/components/trips/TripFAQ.tsx` — powiązanie analytics
- `src/components/layout/Footer.tsx` — wydzielenie SocialLink component

---

## Decyzje techniczne

1. **H1 copy — Wariant A zatwierdzony:**
   - "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo."
   - Span terracotta na "na nowo" zamiast "dorosłych i dzieci"

2. **Child Care — rozszerzenie Trip type:**
   - Opcjonalne pole w Keystatic (wieloliniowy tekst)
   - Renderuje się w TripPracticalInfo tylko jeśli wypełnione
   - Ikona `Baby` z lucide-react, label "Opieka nad dziećmi"

3. **CTA copy — konsystencja:**
   - Header desktop: "Sprawdź terminy" (zamiast "Zarezerwuj")
   - Mobile menu: "Sprawdź terminy"
   - Sticky CTA: "Zarezerwuj miejsce"
   - Form submit: "Zarezerwuj miejsce"

4. **Diet/Allergy — nowe pole:**
   - Osobne od "Uwagi"
   - Max 500 znaków, opcjonalne
   - Placeholder: "np. bezglutenowo, alergia na orzechy"

5. **Mobile phone icon:**
   - Ikona `Phone` z lucide-react (już importowana w Header)
   - `lg:hidden` — widoczna tylko na mobile
   - Pozycja: PRZED hamburgerem
   - Analytics: `phoneClick()` na click

6. **Analytics — nowe metody:**
   - `faqClick(question)` — event label = tekst pytania
   - `socialClick(platform)` — event label = "facebook" | "instagram"

---

## Zależności

- **Brak nowych dependencji** — wszystko z istniejących bibliotek (lucide-react, Zod, Motion)
- **Keystatic CMS** — wymaga aktualizacji schematu + zawartości YAML
- **Analytics** — GA4 już podpięty, tylko nowe event names

---

## Ryzyka i mitygacja

| Ryzyko | Mitygacja |
|--------|-----------|
| Zmiana H1 wpłynie na branding | Copy zatwierdzony przez klientkę przed implementacją |
| Child care field wymaga zawartości w CMS | Dokumentacja dla klientki w instrukcji |
| CTA copy musi być spójny | Checklist wszystkich miejsc ze zmianą |
| Formularz: nowe pole wymaga aktualizacji API | Zod schema wystarczy, API już akceptuje wszystkie pola |

---

## Testowanie

1. **Build:** `npm run build` — zero błędów
2. **Visual:** Vercel preview — mobile, tablet, desktop
3. **Forms:** Test submit na wszystkich stronach z wyjazdami
4. **Mobile:** Ikona telefonu na < lg breakpoint
5. **Analytics:** Sprawdzić GA4 w DevTools → Network → collect

---

## Commit message (template)

```
feat: poprawki konwersji i zaufania (audyt Gemini 19.03)

- H1 hero: emocjonalny tekst, korzyściowy ton
- Nowe pole: opieka nad dziećmi w informacjach praktycznych
- CTA copy: korzyściowe zamiast transakcyjnych
- Formularz: osobne pole dla alergii/diet
- Mobile: ikona telefonu w header
- Form: reassurance tekst "nie płacisz z góry"
- USP: bardziej empatyczny tekst
- SEO: meta tagi z emocjonalnymi słowami kluczowymi
- Analytics: tracking FAQ i social clicks

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```
