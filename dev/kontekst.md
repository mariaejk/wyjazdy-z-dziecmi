# Kontekst projektu — "Wyjazdy z Dziećmi"

**Ostatnia aktualizacja:** 2026-02-26

---

## Czym jest ten projekt?

Landing page / lejek sprzedażowy dla firmy "Wyjazdy z Dziećmi" — marki organizującej rodzinne wyjazdy warsztatowe w naturze (joga, taniec, ceramika, konie, ajurweda). Główny cel: pozyskiwanie klientów na warsztaty-wyjazdy przez stronę internetową zamiast ręcznych rezerwacji przez FB/email.

## Kto jest klientem?

**Maria Kordalewska** — organizatorka wyjazdów, pilotka wycieczek, nauczycielka jogi, doktor nauk o mediach, mama Laury. Domena `www.wyjazdyzdziecmi.pl` kupiona.

## Grupa docelowa strony

Głównie mamy 30-42 lata z dziećmi 3-12 lat, przeglądające oferty na telefonie. Również samotni rodzice (osobna podstrona Single Parents).

---

## Stos technologiczny

- **Next.js 15** (App Router, SSG) + **Tailwind CSS v4** + **TypeScript**
- **Motion** (`motion/react`) — subtelne scroll animations (kompatybilny z React 19)
- **React Hook Form + Zod** — formularze
- **Lucide React** — ikony
- Deploy: **Vercel**
- Fonty: **Playfair Display** (nagłówki) + **Inter** (body), self-hosted

> **WAŻNE:** NIE używamy `framer-motion` (niekompatybilny z React 19). Pakiet `motion` jest jego następcą z identycznym API.

## Design System

- Styl: "Naturalny Minimalizm" — slow life, bliskość natury
- Tło: `#F9F7F2` (ciepły pergamin)
- Akcenty/CTA: `#2D4635` (zieleń mchu)
- Tekst: `#1A1A1A` (ciemny grafit)
- Mobile-first, dużo whitespace, ikony liniowe
- Tailwind v4: `@import "tailwindcss"` + `@theme` (nie stare `@tailwind` dyrektywy)

---

## Struktura strony

| URL | Strona |
|-----|--------|
| `/` | Strona główna (hero → kafelki wyjazdów → O nas teaser → opinie placeholder) |
| `/o-nas` | Bio Marii + Współpracują z nami (Kamila) + Miejsca (Kacze Bagno, Sasek) |
| `/wyjazdy` | Lista wyjazdów |
| `/wyjazdy/[slug]` | Szczegóły wyjazdu: Hero → Dla kogo? → Opis → Program → Info → Cennik → Współpraca → FAQ → Galeria → Formularz |
| `/single-parents` | Dedykowana strona dla rodziców solo |
| `/opinie` | Placeholder z CTA (brak opinii na start) |
| `/kontakt` | Info kontaktowe + formularz |
| `/regulamin` | Tekst prawny |
| `/polityka-prywatnosci` | RODO |

## Kluczowe decyzje

- Treści **hardcoded** (bez Airtable/n8n na MVP), 1-2 wyjazdy
- Formularz zapisu: imię, email, telefon, wyjazd, **liczba dorosłych**, **liczba dzieci + wiek**, uwagi, RODO, **zgoda marketingowa**
- Nawigacja: **każda pozycja = osobna podstrona**
- Opinie: **placeholder** (brak gotowych opinii)
- Newsletter: **w stopce od razu**
- Social media: **Facebook + Instagram**
- Ochrona formularzy: **honeypot + rate limiting** na API routes
- Cookie banner: **RODO/ePrivacy 2026** — kategorie zgód, 3 przyciski o równej wadze, zmiana decyzji w stopce
- `lang="pl"` od Fazy 1 w layout.tsx
- `SkipToContent` od Fazy 1
- `loading.tsx` / `error.tsx` — konwencje Next.js App Router

---

## Pliki z treściami

| Plik | Zawartość |
|------|-----------|
| `docs/tresc_na_strone.md` | Pełne treści: hero, O nas, wyjazd "Matka i Córka" (opis, program, cennik, bio) |
| `docs/PRD_Wyjazdy_z_Dziecmi.md` | PRD — wymagania, persony, KPI, architektura informacji |
| `docs/UI_przyklad.md` | Wytyczne designu |
| `docs/Images/` | logo + 40 zdjęć: Marysia.JPG, Kamila.JPG, laura.jpg, IMG_*.jpg (z wyjazdów) |
| `docs/TODO POPRAWIC landing page 2.03.2026.docx` | Bio "O mnie", 4 opinie, treść "Yoga i Konie", lista poprawek UI/UX |
| `docs/poradnik.md` | Lead magnet — "Jak przygotować dziecko do wyjazdu warsztatowego" |

## Pliki projektowe

| Plik | Zawartość |
|------|-----------|
| `dev/plan.md` | Szczegółowy plan implementacji (v1.1 po review) |
| `dev/task.md` | Checkboxy z zadaniami do odhaczania (78 zadań) |
| `dev/kontekst.md` | Ten plik — ogólny kontekst projektu |

---

## Aktualny status

**Faza:** 1-6 UKOŃCZONE. Faza 7 w kolejce.
**Ostatnia aktualizacja:** 2026-03-03

### Co zostało zrobione:
- Analiza PRD, UI guidelines, treści i zdjęć
- Wywiad z klientem (4 rundy pytań)
- Wybór technologii (Next.js 16 + Tailwind v4 + TypeScript)
- Szczegółowy plan implementacji — 5 faz, 78 zadań
- **Fazy 1-5 zaimplementowane** — strona produkcyjna (SEO, newsletter, cookie banner, GA4, security headers)
- **Review planu v1.1** — naprawiono 3 krytyczne + 7 ważnych problemów
- **Faza 5 code review** — 29/31 zadań ukończonych, 10/12 issues naprawionych
- **Plan Fazy 6-7** (2026-03-03) — na podstawie DOCX od klientki + analiz UX (Claude + Gemini)

### Faza 6 (następna): Treści i zdjęcia od klientki
- Nowe bio "O mnie" (rename z "O nas") + zdjęcia Marii i Kamili
- 4 prawdziwe opinie uczestniczek (zastąpienie placeholdera)
- Pełna treść wyjazdu "Yoga i Konie" (opis, program, FAQ, Kamila)
- Lead magnet (poradnik PDF) w newsletterze
- Poprawki: logo powiększenie, "Cennik" → "Twoja inwestycja", "Social" → "Znajdź nas"

### Faza 7 (po Fazie 6): Konwersja, UX i analityka
- CTA "Zarezerwuj" w nawigacji, telefon w headerze, active nav
- Dwa przyciski na kartach, scarcity ("Ostatnie miejsca!")
- Sticky CTA mobile, ukrycie "Wiek dzieci" gdy 0, Button loading
- GA4 event tracking, Microsoft Clarity

### Elementy odroczone:
- Blog, CMS/Google Drive, integracja n8n, płatności, interaktywny kalendarz

---

## Kontakt do projektu

- **Email:** wyjazdyzdziecmi@gmail.com
- **Telefon:** +48 503 098 906
- **Facebook:** do uzupełnienia
- **Instagram:** do uzupełnienia

---

## Notatki sesji

### Sesja 1 (2026-02-26)
- Przeanalizowano dokumenty PRD, UI, treści
- Przeprowadzono wywiad: 4 rundy po 3-5 pytań
- Stworzono plan implementacji (5 faz, ~70 plików)
- Klient preferuje: piękny design + UX, łatwa nawigacja, wyróżniająca się wizualnie strona
- Klient nie ma dużego doświadczenia w budowaniu landing page — proponujemy rozwiązania

### Sesja 2 (2026-02-26)
- Przeprowadzono review planu (ocena 7.5/10)
- Zidentyfikowano 3 krytyczne, 7 ważnych problemów
- Zaktualizowano plan.md i task.md (v1.1)
- Dodano ~8 nowych zadań (honeypot, rate limiting, FAQ, galeria, "Dla kogo?", env, loading/error, skip-to-content)
- Plan gotowy do implementacji Fazy 1

### Sesja 3 (2026-03-03) — Plan Fazy 6-7
- Klientka dostarczyła DOCX z poprawkami + zdjęcia (Marysia.JPG, Kamila.JPG, 30+ IMG_*.jpg)
- Przeanalizowano 3 audyty UX (2x Claude, 1x Gemini) z `dev/gemini/`
- Scalono draft `dev/plan_faza6_usprawnienia.md` z treścią DOCX
- Dodano Fazę 6 (21 zadań: treści, zdjęcia, opinie, "Yoga i Konie") i Fazę 7 (21 zadań: konwersja, UX, analityka)
- Zaktualizowano plan.md, task.md, kontekst.md
- Logo `logo_inne.jpeg` = identyczny obraz jak obecne logo (1024x1024px) — wystarczy powiększyć renderowanie w Header

### Sesja 4 (2026-03-03) — Faza 6 Etap A
- Skopiowano zdjęcia zespołu: `Marysia.JPG` → `public/images/maria.jpg`, `Kamila.JPG` → `public/images/kamila.jpg`
- Dodano `image` field do obu TeamMember w `src/data/team.ts`
- `PersonBio.tsx` — conditional rendering: `next/image` (fill + rounded-full) gdy `member.image`, fallback na ikonę `User`
- Rozmiar avatara: 192px (mobile) → 224px (lg+), `object-cover` w kółku
- Build: zero błędów

### Sesja 5 (2026-03-03) — Faza 6 Etap B
- Nowe bio Marii w 1. osobie (z DOCX), role → "Twórczyni projektu, nauczycielka jogi, organizatorka eventów"
- Rename "O nas" → "O mnie" w nawigacji, metadata, breadcrumb, h1 (URL `/o-nas` bez zmian — SEO)
- Nowa hierarchia `/o-nas`: H1 "O mnie" → intro (osobisty ton) → PersonBio Maria → "Moja misja" (3 karty: Leaf/Heart/Star) → "Współpracują ze mną" + Kamila → Miejsca → CTA "Dołącz do mnie"
- `AboutTeaser.tsx` — ikona `User` zamiast `Users`, nowy tekst 1. osoba, CTA "Poznaj mnie bliżej"
- Build: zero błędów

### Sesja 6 (2026-03-03) — Faza 6 Etap C
- Nowy typ `Testimonial` w `src/types/testimonial.ts`
- 4 opinie z DOCX w `src/data/testimonials.ts` (Ania, Katarzyna, Małgorzata, Marta) + helpery `getTestimonials()`, `getFeaturedTestimonials()`
- `TestimonialCard.tsx` — `<blockquote>` + Quote icon + ScrollAnimation (staggered), wzór PlaceCard
- `/opinie/page.tsx` — SectionHeading as="h1" + grid 2-kolumnowy (md+) z 4 kartami + CTA
- `sitemap.ts` — dodano `/opinie` z `priority: 0.6`, `changeFrequency: "monthly"`
- `OpinionsTeaser.tsx` — 2 featured opinie (Ania + Katarzyna) + CTA "Zobacz wszystkie opinie" → /opinie
- Build: zero błędów

### Sesja 7 (2026-03-03) — Faza 6 Etap D
- Dodano `role?: string` do typu `TripCollaborator` w `src/types/trip.ts`
- Dodano `role` do obu collaborators: Ilona ("Tancerka, choreografka, nauczycielka jogi"), Kamila ("Konsultantka i terapeutka ajurwedyjska")
- Zastąpiono placeholder "Yoga i Konie" pełną treścią z DOCX: nowy tytuł "Joga i Konie — Harmonia Natury na Mazurach", longDescription (5 akapitów z intro + "Dlaczego konie i joga?" + "Co na was czeka?"), 4 targetAudience, schedule 3-dniowy (piątek–niedziela), practicalInfo z DOCX, Kamila jako collaborator z bio z team.ts, 5 FAQ
- Pricing `[]` i deposit `0` — brak cen w DOCX
- `TripCollaborator.tsx` — wyświetla `role` pod imieniem (text-sm text-graphite-light)
- Build: zero błędów

### Sesja 8 (2026-03-03) — Code Review Fazy 6, Etapy D-G
- Przeprowadzono code review 19 plików (Etapy D-G: zadania 6.12-6.19 + powiązane z B-C)
- Raport: `dev/review-faza6-etapy-d-g.md`
- Wynik: 0 krytycznych, 4 ważnych, 3 drobne uwagi
- Kluczowe problemy do naprawy (R1-R4 w task.md):
  - R1: mieszane kodowanie linia 218 w trips.ts (FAQ Yoga i Konie)
  - R2: duplikacja bio Kamili między trips.ts i team.ts (rozbita spójność)
  - R3: hardcoded "Prowadząca" w TripCollaborator.tsx (nie pasuje do Kamili)
  - R4: weryfikacja wizualna sekcji "Współpracują ze mną" w o-nas (podwójne tło SectionWrapper)
- Etapy D-G generalnie dobrej jakości: wzorce SC/client poprawne, helper pattern zachowany, testimoniale semantycznie poprawne
