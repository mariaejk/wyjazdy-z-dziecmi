# Faza 4: Pozostałe podstrony

> **Branch:** `feature/faza4-pozostale-podstrony`
> **Ostatnia aktualizacja:** 2026-02-26

---

## Podsumowanie wykonawcze

Faza 4 obejmuje budowę 6 brakujących podstron: O nas, Single Parents, Kontakt, Opinie, Regulamin i Polityka prywatności. Wykorzystuje istniejące UI primitives (Button, Input, Textarea, Checkbox, HoneypotField, SectionWrapper, ScrollAnimation) i wzorce z Fazy 3 (formularz + API route + walidacja Zod).

**Zakres:**
- 2 nowe pliki danych (`team.ts`, `places.ts`)
- 4 nowe komponenty (`PersonBio`, `PlaceCard`, `ContactInfo`, `ContactForm`)
- 1 nowy Zod schema (`contact.ts`)
- 1 nowy API route (`api/contact/route.ts`)
- 6 nowych stron (`/o-nas`, `/single-parents`, `/kontakt`, `/opinie`, `/regulamin`, `/polityka-prywatnosci`)

---

## Stan obecny

### Co istnieje (gotowe z Faz 1-3):
- Typy: `TeamMember`, `Place`, `ContactFormData` — zdefiniowane i gotowe
- Stałe: `CONTACT`, `SOCIAL_LINKS`, `ROUTES` — kompletne
- UI: Button, Input, Textarea, Checkbox, HoneypotField, Accordion, SectionWrapper, SectionHeading, Badge, Card, ScrollAnimation
- Wzorzec: API route z Zod + honeypot + rate limiting (`api/booking/route.ts`)
- Wzorzec: Formularz RHF + Zod (`BookingForm.tsx`)
- Nawigacja: Menu z 5 pozycjami (O nas, Wyjazdy, Single Parents, Opinie, Kontakt)
- Teasery na stronie głównej: `AboutTeaser`, `OpinionsTeaser` — z linkami do podstron

### Czego brakuje:
- Pliki danych: `data/team.ts`, `data/places.ts`
- Komponenty: `PersonBio`, `PlaceCard`, `ContactInfo`, `ContactForm`
- Walidacja: `lib/validations/contact.ts`
- API: `api/contact/route.ts`
- Strony: 6 plików `page.tsx`

---

## Stan docelowy

Wszystkie 7+ podstron z planu gotowe i nawigowalne. Formularz kontaktowy działa z walidacją i ochroną antyspamową. Każda strona ma poprawne metadata SEO.

---

## Fazy wdrożenia

### Etap 4A: Dane i typy (2 zadania)

Tworzenie plików danych na podstawie treści z `docs/tresc_na_strone.md`.

**4A.1** Utwórz `src/data/team.ts`
- Maria Kordalewska (organizatorka, joga, komunikacja, dr nauk o mediach, mama Laury)
- Kamila Janczurewicz (ajurweda, konie, HSP, mama Gai i Niny)
- Eksport: `TEAM_MEMBERS: TeamMember[]`, helper `getTeamMember(name)`
- Treści z `docs/tresc_na_strone.md` sekcja "O nas"
- **Brak zdjęć portretowych** — pole `image` zostawić `undefined`
- Nakład: **S**

**4A.2** Utwórz `src/data/places.ts`
- Kacze Bagno: eko-domki, ogród permakulturowy, pracownia ceramiczna, sauna + balia, 20 lat doświadczenia, image: `/images/kacze-bagno.jpg`
- Sasek (Mazury): nad jeziorem, otoczone lasami, konie, kryta ujeżdżalnia, piaszczysta plaża, image: `/images/yoga-konie.jpg`
- Eksport: `PLACES: Place[]`, helper `getPlace(name)`
- Treści z `docs/tresc_na_strone.md`
- Nakład: **S**

### Etap 4B: Komponenty about (2 zadania)

**4B.1** Zbuduj `src/components/about/PersonBio.tsx`
- **Server Component** (brak interakcji)
- Props: `member: TeamMember`, `variant?: "full" | "compact"`, `imagePosition?: "left" | "right"`
- Graceful fallback gdy brak `image` — ikona `User` z lucide-react (okrągłe tło `parchment-dark`)
- Layout: na desktop obraz po lewej/prawej + tekst; na mobile obraz na górze + tekst
- `variant="full"` — pełne bio z rolą; `variant="compact"` — skrócone
- Styl: `font-heading` na imieniu, `text-graphite-light` na roli
- Owinięty w `ScrollAnimation`
- Nakład: **M**

**4B.2** Zbuduj `src/components/about/PlaceCard.tsx`
- **Server Component**
- Props: `place: Place`
- Zdjęcie przez `next/image` (lazy, `sizes` prop), fallback jak w PersonBio
- Lista `features` jako `Badge` elementy lub lista z ikonami `Check`
- Opis tekstu
- Owinięty w `ScrollAnimation`
- Nakład: **M**

### Etap 4C: Strona O nas (1 zadanie)

**4C.1** Złóż `src/app/o-nas/page.tsx`
- `generateMetadata()` — tytuł "O nas | Wyjazdy z Dziećmi"
- Struktura sekcji (każda w `SectionWrapper`, alternate variant):
  1. **Hero/Intro** — SectionHeading "O nas" + krótki paragraf o misji
  2. **Maria** — `PersonBio` full, imagePosition="right"
  3. **Kamila** — `PersonBio` full, imagePosition="left"
  4. **Miejsca intro** — SectionHeading "Gdzie się spotykamy"
  5. **Kacze Bagno** — `PlaceCard`
  6. **Sasek** — `PlaceCard`
  7. **CTA** — "Sprawdź nasze wyjazdy" → `/wyjazdy`
- **Server Component** (wszystko statyczne)
- Nakład: **M**

### Etap 4D: Single Parents (1 zadanie)

**4D.1** Złóż `src/app/single-parents/page.tsx`
- `generateMetadata()` — tytuł "Single Parents | Wyjazdy z Dziećmi"
- Treść generowana (brak w źródłach) — empatyczny przekaz dla samotnych rodziców
- Struktura sekcji:
  1. **Hero** — empatyczny nagłówek ("Wyjazdy stworzone z myślą o Tobie"), inspirujący podtytuł
  2. **Dlaczego warto** — 4-6 korzyści z ikonami (gotowe aktywności, społeczność podobnych rodzin, bezpieczne środowisko, chwila wytchnienia, dzieci pod opieką, bez poczucia wykluczenia)
  3. **Jak to wygląda** — opis doświadczenia wyjazdu z perspektywy single parent
  4. **Wyjazdy** — link do `/wyjazdy` z info o single-parent friendly wyjazdach
  5. **CTA** — zachęta do kontaktu/rezerwacji
- **Server Component**
- Nakład: **M**

### Etap 4E: Kontakt — formularz + API (3 zadania)

**4E.1** Utwórz `src/lib/validations/contact.ts`
- Schema Zod 4 dla `ContactFormData`:
  - `name` — string, min 2, max 100
  - `email` — string, email
  - `message` — string, min 10, max 2000
  - `consentRodo` — boolean, refine: musi być `true`
  - `website` — string (honeypot)
- Wzorzec: kopia `booking.ts` uproszczona (mniej pól)
- NIE używać `.optional().default("")` (Faza 3 lesson)
- Nakład: **S**

**4E.2** Zbuduj `src/components/contact/ContactForm.tsx`
- **Client Component** (`"use client"`)
- React Hook Form + Zod resolver
- Pola: Input (name, email), Textarea (message), Checkbox (RODO), HoneypotField
- `defaultValues` w `useForm()` (nie `.default()` w Zod)
- Stany: idle → submitting → success / error
- Microcopy success: "Dziękujemy! Odpowiemy najszybciej jak to możliwe."
- Microcopy submit: "Wyślij wiadomość"
- `aria-invalid`, `aria-describedby`, error `role="alert"` — wzorzec z BookingForm
- Reduced-motion: nie dotyczy (brak motion w formularzu)
- Nakład: **M**

**4E.3** Utwórz `src/app/api/contact/route.ts`
- POST handler
- Zod walidacja server-side (import z `lib/validations/contact.ts`)
- Honeypot check → fake 200 OK
- Rate limiting → 429 Too Many Requests (reuse `lib/rate-limit.ts`)
- Zakomentowany `CONTACT_WEBHOOK_URL` dla przyszłego n8n
- `console.log` danych formularza (MVP)
- Nakład: **S**

### Etap 4F: Kontakt + Opinie — strony (3 zadania)

**4F.1** Zbuduj `src/components/contact/ContactInfo.tsx`
- **Server Component**
- Dane z `CONTACT` i `SOCIAL_LINKS` (constants.ts)
- Wyświetla: email (link `mailto:`), telefon (link `tel:`), Facebook, Instagram
- Ikony z lucide-react: `Mail`, `Phone`, `Facebook`, `Instagram` (lub `ExternalLink`)
- Layout: lista z ikonami, klikalne linki
- Nakład: **S**

**4F.2** Złóż `src/app/kontakt/page.tsx`
- `generateMetadata()` — tytuł "Kontakt | Wyjazdy z Dziećmi"
- Struktura:
  1. **Hero** — SectionHeading "Kontakt" + krótki opis
  2. **Grid** — ContactInfo (lewa kolumna) + ContactForm (prawa kolumna) na desktop; stacked na mobile
- Nakład: **S**

**4F.3** Złóż `src/app/opinie/page.tsx`
- `generateMetadata()` — tytuł "Opinie | Wyjazdy z Dziećmi"
- Placeholder: brak opinii w źródłach
- Struktura:
  1. **Hero** — SectionHeading "Opinie" + empatyczny tekst ("Dołącz do rodzin, które już z nami były")
  2. **Placeholder** — komunikat o braku opinii jeszcze + zachęta
  3. **CTA** — "Zobacz nasze wyjazdy" → `/wyjazdy`
- **Server Component**
- Nakład: **S**

### Etap 4G: Strony prawne (2 zadania)

**4G.1** Złóż `src/app/regulamin/page.tsx`
- `generateMetadata()` — tytuł "Regulamin | Wyjazdy z Dziećmi"
- Placeholder: nagłówek + informacja "Regulamin jest w przygotowaniu"
- Prosta struktura tekstu w `SectionWrapper`
- Nakład: **S**

**4G.2** Złóż `src/app/polityka-prywatnosci/page.tsx`
- `generateMetadata()` — tytuł "Polityka prywatności | Wyjazdy z Dziećmi"
- Placeholder: nagłówek + informacja "Polityka prywatności jest w przygotowaniu"
- Prosta struktura tekstu w `SectionWrapper`
- Nakład: **S**

### Etap 4H: Weryfikacja końcowa (1 zadanie)

**4H.1** Weryfikacja kompletna
- `npm run build` — zero błędów
- Wszystkie 6 nowych stron renderują się poprawnie
- Nawigacja: każdy link w menu prowadzi do poprawnej strony
- Formularz kontaktowy: walidacja + submit działa
- Honeypot: ukryte pole → fake success
- Rate limiting: 6+ requestów → 429
- Responsywność: 320px, 375px, 768px, 1024px, 1440px
- ScrollAnimation działa na nowych stronach
- `prefers-reduced-motion` respektowane
- Linki z teaserów na stronie głównej (AboutTeaser → /o-nas, OpinionsTeaser → /opinie) działają
- Nakład: **M**

---

## Ocena ryzyka

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|--------|-------------------|-------|-----------|
| Brak zdjęć portretowych Marii i Kamili | Pewne | Niski | PersonBio z graceful fallback (ikona placeholder) |
| Brak treści Single Parents | Pewne | Średni | Treść generowana w oparciu o PRD persona "Tata Tomek" + kontekst marki |
| Brak tekstu prawnego | Pewne | Niski | Strony placeholder z info o przygotowywaniu |
| Brak opinii | Pewne | Niski | Placeholder z CTA |
| Zod 4 + RHF type mismatch | Niskie | Średni | Wzorzec z Fazy 3: non-optional + defaultValues |

---

## Mierniki sukcesu

1. `npm run build` — zero błędów
2. Wszystkie 6 stron dostępne pod poprawnymi URL
3. Menu nawigacji prowadzi do każdej strony
4. Formularz kontaktowy przechodzi pełny cykl: walidacja → submit → success/error
5. Honeypot + rate limiting działa na `/api/contact`
6. Responsywność OK na 5 breakpointów
7. Lighthouse Accessibility >95 na każdej nowej stronie

---

## Szacunki czasowe

| Etap | Zadania | Nakład |
|------|---------|--------|
| 4A — Dane i typy | 2 | S |
| 4B — Komponenty about | 2 | M |
| 4C — Strona O nas | 1 | M |
| 4D — Single Parents | 1 | M |
| 4E — Kontakt (form + API) | 3 | M |
| 4F — Kontakt + Opinie (strony) | 3 | S-M |
| 4G — Strony prawne | 2 | S |
| 4H — Weryfikacja | 1 | M |
| **Razem** | **15** | — |

---

## Zależności między etapami

```
4A (dane) → 4B (komponenty about) → 4C (strona O nas)
4E.1 (Zod schema) → 4E.2 (ContactForm) → 4E.3 (API route) → 4F.2 (strona kontakt)
4F.1 (ContactInfo) → 4F.2 (strona kontakt)
4D (Single Parents) — niezależne
4F.3 (Opinie) — niezależne
4G (strony prawne) — niezależne
4H (weryfikacja) — po wszystkim
```
