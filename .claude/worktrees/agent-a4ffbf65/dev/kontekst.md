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
| `docs/Images/` | logo.jpeg + image_1..5 (zdjęcia z wyjazdów) |

## Pliki projektowe

| Plik | Zawartość |
|------|-----------|
| `dev/plan.md` | Szczegółowy plan implementacji (v1.1 po review) |
| `dev/task.md` | Checkboxy z zadaniami do odhaczania (78 zadań) |
| `dev/kontekst.md` | Ten plik — ogólny kontekst projektu |

---

## Aktualny status

**Faza:** Plan zaktualizowany po review, implementacja nie rozpoczęta

### Co zostało zrobione:
- Analiza PRD, UI guidelines, treści i zdjęć
- Wywiad z klientem (4 rundy pytań)
- Wybór technologii (Next.js 15 + Tailwind v4 + TypeScript)
- Szczegółowy plan implementacji w 5 fazach
- Task list z 70 checkboxami
- **Review planu (ocena 7.5/10)** — zidentyfikowano 3 problemy krytyczne, 7 ważnych
- **Aktualizacja planu v1.1** — naprawiono wszystkie problemy z review, dodano ~8 nowych tasków (78 łącznie)

### Zmiany z review (krytyczne):
1. `framer-motion` → `motion` (kompatybilność z React 19)
2. Honeypot + rate limiting na formularzach (ochrona przed spamem)
3. Cookie banner RODO/ePrivacy 2026 (kategorie, 3 przyciski, zmiana decyzji)

### Następny krok:
- Faza 1: Inicjalizacja projektu Next.js i setup fundamentu (task 1.1)

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
