# Faza 4 — Pozostałe podstrony — Podsumowanie

**Data ukończenia:** 2026-02-26
**Branch:** `feature/faza4-pozostale-podstrony`
**Zadania:** 15/15 ukończonych + 10/10 poprawek po review

---

## Co zostało dostarczone

### 6 nowych podstron
- `/o-nas` — zespół (Maria, Kamila) + miejsca (Kacze Bagno, Sasek) + CTA
- `/single-parents` — empatyczny hero + 6 korzyści z ikonami + opis doświadczenia + CTA
- `/kontakt` — dane kontaktowe (email, tel, FB, IG) + formularz kontaktowy (RHF + Zod)
- `/opinie` — placeholder z CTA "Weź udział w wyjeździe"
- `/regulamin` — placeholder "w przygotowaniu" (noindex)
- `/polityka-prywatnosci` — placeholder "w przygotowaniu" (noindex)

### 1 nowy API route
- `POST /api/contact` — Zod walidacja + honeypot fake 200 + rate limit 429 + console.log + webhook stub

### 4 nowe komponenty
- `PersonBio` — SC, ikona User jako fallback, imagePosition left/right, cn() na className
- `PlaceCard` — SC, Badge na features, MapPin ikona
- `ContactForm` — CC, RHF + Zod, 4 stany (idle/submitting/success/error)
- `ContactInfo` — SC, 4 elementy kontaktowe z ikonami lucide, aria-label na linkach zewnętrznych

### 2 pliki danych + 1 schema
- `team.ts` — Maria Kordalewska + Kamila Janczurewicz + `getTeamMember()` helper
- `places.ts` — Kacze Bagno + Sasek + `getPlace()` helper
- `contact.ts` — Zod 4 schema (name, email, message, consentRodo, website)

---

## Kluczowe decyzje

1. **Inline `<h1>` zamiast SectionHeading** na podstronach o-nas i kontakt — SectionHeading renderuje zawsze `<h2>`, a każda strona potrzebuje dokładnie jednego `<h1>` dla SEO
2. **`getTeamMember(name)` zamiast indeksów tablicy** — odporny na zmianę kolejności danych
3. **`extractHandle()` w ContactInfo** — wyciąga handle z URL stałych zamiast twardych wartości
4. **`robots: { index: false }` na stronach placeholder** — regulamin i polityka prywatności nie powinny być indeksowane dopóki nie mają treści
5. **Single Parents po angielsku** — "Single Parents" to brand name, spójne z nawigacją i treścią klientki
6. **Treść Single Parents generowana** — brak w źródłach, empatyczny przekaz oparty na kontekście marki

---

## Utworzone/zmodyfikowane pliki

### Nowe pliki (14)
```
src/data/team.ts
src/data/places.ts
src/lib/validations/contact.ts
src/components/about/PersonBio.tsx
src/components/about/PlaceCard.tsx
src/components/contact/ContactForm.tsx
src/components/contact/ContactInfo.tsx
src/app/api/contact/route.ts
src/app/o-nas/page.tsx
src/app/single-parents/page.tsx
src/app/kontakt/page.tsx
src/app/opinie/page.tsx
src/app/regulamin/page.tsx
src/app/polityka-prywatnosci/page.tsx
```

### Nowe katalogi (2)
```
src/components/about/
src/components/contact/
```

---

## Wyciągnięte wnioski (Lessons Learned)

1. **Dostęp do danych przez helper, nie indeks** — `getTeamMember("Maria")` zamiast `teamMembers[0]`. Indeks jest kruchy i nie daje błędu kompilacji przy zmianie kolejności.

2. **`<h1>` na każdej podstronie** — SectionHeading renderuje zawsze `<h2>`. Na podstronach z inline nagłówkiem h1 trzeba pamiętać o prawidłowej hierarchii. Sugestia na przyszłość: dodać prop `as` do SectionHeading.

3. **Wyciąganie wartości z URL zamiast hardkodowania** — `extractHandle(SOCIAL_LINKS.facebook, "facebook.com/")` jest odporniejsze na zmiany niż `"wyjazdyzdziecmi"`.

4. **`aria-label` na linkach `target="_blank"`** — przeglądarkowe czytniki ekranu nie informują automatycznie o nowej karcie. Dodanie `aria-label="X (otwiera się w nowej karcie)"` poprawia dostępność.

5. **`robots: { index: false }` na placeholderach** — strony bez treści nie powinny trafiać do Google. Usunąć po dodaniu pełnej treści.

6. **`cn()` zamiast template literals** — projekt konsekwentnie używa `cn()` z clsx + tailwind-merge. Template literals omijają merge i mogą powodować konflikty klas.

---

## Code Review
- 🔴 Blocking: 0
- 🟠 Important: 5 → wszystkie naprawione
- 🟡 Nit: 6 → 5 naprawione, 1 (Single Parents angielski title) — do weryfikacji z klientem
- 🔵 Suggestion: 5 → 1 naprawiona (noindex), reszta odłożona do przyszłych faz
- Pełny raport: `review-faza4.md`
