# Code Review — Faza 6, Etapy D-G (zadania 6.12–6.19)

**Last Updated:** 2026-03-03
**Branch:** feature/faza6-tresci-i-zdjecia
**Reviewer:** Claude Code (automatyczny code review)

---

## 1. Sprawdzone pliki

### Pliki zmienione (tracked, uncommitted):
- `src/app/o-nas/page.tsx` — rename "O nas" → "O mnie" + misja + nowa hierarchia
- `src/app/opinie/page.tsx` — prawdziwe opinie zamiast placeholdera
- `src/app/sitemap.ts` — dodano `/opinie`
- `src/components/home/AboutTeaser.tsx` — nowy copy 1. osoba, ikona User
- `src/components/home/OpinionsTeaser.tsx` — 2 featured opinie z TestimonialCard
- `src/data/navigation.ts` — "O nas" → "O mnie"
- `src/data/team.ts` — nowe bio Marii 1. osoba, nowa rola

### Pliki nowe (untracked):
- `src/types/testimonial.ts` — typ Testimonial
- `src/data/testimonials.ts` — 4 opinie + helpery
- `src/components/shared/TestimonialCard.tsx` — komponent karty opinii

### Pliki zmodyfikowane z poprzedniego commita (Etap A) — sprawdzone dla kontekstu:
- `src/data/trips.ts` — pełna treść "Yoga i Konie" (Etap D)
- `src/types/trip.ts` — `role?: string` na TripCollaborator (zadanie 6.12)
- `src/components/trips/TripCollaborator.tsx` — wyświetla role (zadanie 6.14)
- `src/components/layout/Header.tsx` — logo width={56} (zadanie 6.15)
- `src/components/trips/TripPricing.tsx` — "Twoja inwestycja" (zadanie 6.16)
- `src/components/layout/Footer.tsx` — "Znajdź nas" (zadanie 6.17)
- `src/components/shared/NewsletterForm.tsx` — copy poradnik PDF (zadanie 6.18)
- `src/components/contact/ContactInfo.tsx` — avatar Marii (zadanie 6.19)
- `src/components/about/PersonBio.tsx` — z poprzedniego commita (Etap A)

---

## 2. Problemy

### 🟠 [important] Mieszane kodowanie — literalne polskie znaki w `.ts` w nowej sekcji trips.ts

**Plik:** `src/data/trips.ts` — linia 218

**Opis:** Sekcja "Yoga i Konie" (Etap D) zawiera jeden string z mieszanym kodowaniem — część polskich znaków jest jako unicode escapes (`\u0142`), a część jako literalne znaki UTF-8 (`wyżywienie`, `Posiłki`, `składników`):

```ts
// Linia 218 — FAQ "Yoga i Konie", odpowiedź na pytanie o wyżywienie:
"Tak, pe\u0142ne wyżywienie jest wliczone. Posiłki przygotowywane są z lokalnych składników z uwzględnieniem diet..."
```

Zasada projektu z CLAUDE.md: "Polish quotes in JS strings: use unicode escapes in .ts files". Chociaż literalne UTF-8 w `.ts` działa w Node.js/TypeScript (plik jest poprawnie zakodowany w UTF-8), projekt konsekwentnie używa unicode escapes w `.ts` dla uniknięcia potencjalnych problemów z edytorami/terminalami na różnych OS.

**Uwaga kontekstowa:** Pozostałe linie tej samej sekcji (Yoga i Konie) są poprawnie zakodowane z unicode escapes. Problem dotyczy tylko tej jednej linii FAQ. Natomiast cały blok "Matka i Córka" (pre-Faza 6) zawiera literalne polskie znaki — ale to stary kod, poza zakresem review.

**Poprawka:**
```ts
// Zamienić linię 218 na:
"Tak, pe\u0142ne wy\u017Cywienie jest wliczone. Posi\u0142ki przygotowywane s\u0105 z lokalnych sk\u0142adnik\u00F3w z uwzgl\u0119dnieniem diet i preferencji dzieci (alergie, nietolerancje).",
```

---

### 🟠 [important] Duplikacja bio Kamili — rozbieżność między `team.ts` i `trips.ts`

**Pliki:** `src/data/team.ts` linia 14 vs `src/data/trips.ts` linia 201

**Opis:** Bio Kamili Janczurewicz istnieje w dwóch miejscach z różną treścią:

- W `src/data/team.ts` — bio podzielone na dwa akapity `\n\n` (13 słów różnicy):
  ```
  "...wyciszenia układu nerwowego.\n\nKocha konie..."
  ```
- W `src/data/trips.ts` collaborator — bio jako jeden akapit (bez `\n\n`):
  ```
  "...wyciszenia układu nerwowego. Kocha konie..."
  ```

Jest to Single Source of Truth naruszenie. Zadanie 6.13 mówiło "Kamila jako collaborator z bio z team.ts" — co sugeruje intencję użycia bio z `team.ts`, ale bio w `trips.ts` nie jest identyczne z `team.ts`.

**Ryzyko:** Jeśli klientka zmieni bio Kamili, trzeba pamiętać o edycji w dwóch miejscach.

**Zalecana poprawka:** Zaimportować bio bezpośrednio z `team.ts`:
```ts
// src/data/trips.ts — collaborator "Yoga i Konie"
import { getTeamMember } from "./team";

// W definicji tripu:
collaborator: (() => {
  const kamila = getTeamMember("Kamila Janczurewicz")!;
  return {
    name: kamila.name,
    role: kamila.role,
    bio: kamila.bio,
    image: kamila.image,
  };
})(),
```

Alternatywnie (prostsze): trzymać bio w jednym miejscu i importować w czasie runtime. Jeśli to zbyt skomplikowane dla obecnego MVP, co najmniej zsynchronizować oba bios i dodać komentarz `// SYNC with team.ts`.

---

### 🟠 [important] Sekcja "Współpracują ze mną" — rozbite SectionWrapper powoduje wizualne rozerwanie sekcji

**Plik:** `src/app/o-nas/page.tsx` — linie 109–119

**Opis:** Nagłówek sekcji "Współpracują ze mną" jest w osobnym `<SectionWrapper variant="alternate">`, a `<PersonBio>` Kamili (które też ma swój wbudowany `<SectionWrapper variant="default">`) jest bezpośrednio po nim:

```tsx
{/* "Współpracują ze mną" — linie 109-118 */}
<SectionWrapper variant="alternate">
  <Container>
    <SectionHeading title="Współpracują ze mną" ... />
  </Container>
</SectionWrapper>
{/* PersonBio ma swój własny SectionWrapper variant="default" */}
<PersonBio member={kamila} variant="default" imagePosition="right" />
```

Skutek wizualny: nagłówek sekcji ma tło `alternate` (`#F5F3EE`), a bezpośrednio pod nim PersonBio ma tło `default` (`#F9F7F2`). Użytkownik widzi podwójne tło z nieuzasadnionym wizualnym przeskokiem. Dodatkowo, przestrzeń między nimi duplikuje padding (dwie sekcje = 2x py-16 lub podobne).

**Prawidłowy wzorzec** (spójny z resztą strony): nagłówek i PersonBio powinny być w tej samej sekcji. Ponieważ `PersonBio` wewnętrznie renderuje `<SectionWrapper>`, należy albo:
1. Przenieść nagłówek do `PersonBio` przez dodanie opcjonalnego `sectionTitle` propa, lub
2. Zrezygnować z wbudowanego `SectionWrapper` w `PersonBio` i zarządzać nim z zewnątrz, lub
3. (najprostsze) Umieścić `SectionHeading` wewnątrz `PersonBio`'s SectionWrapper przez prop.

Najprostsze rozwiązanie bez refaktoru `PersonBio`:

```tsx
{/* Wyjąć nagłówek, PersonBio dostanie ten sam variant="alternate" i pokaże nagłówek przez własny Container */}
{/* Wymagałoby dodania opcjonalnego prop `heading` do PersonBio */}
```

Alternatywa krótkoterminowa: zmienić `PersonBio member={kamila} variant="alternate"` żeby przynajmniej kolor tła był spójny z sekcją nagłówka, choć pozostawi podwójny padding.

---

### 🟠 [important] `TripCollaborator.tsx` — hardcoded "Prowadząca" nie pasuje do Kamili (konsultantki)

**Plik:** `src/components/trips/TripCollaborator.tsx` — linia 16

**Opis:** Nagłówek sekcji jest na stałe wpisany jako "Prowadząca":

```tsx
<SectionHeading title="Prowadząca" />
```

Dla wypazdu "Matka i Córka" Ilona jest faktycznie prowadzącą (tancerka, choreografka), więc "Prowadząca" pasuje. Jednak dla "Yoga i Konie" collaboratorem jest Kamila Janczurewicz — "Konsultantka i terapeutka ajurwedyjska". Termin "Prowadząca" nie opisuje właściwie jej roli.

Zadanie 6.14 dodało `collaborator.role` pod imieniem — ale nagłówek sekcji pozostał hardcoded.

**Poprawka — dodać opcjonalny prop `sectionTitle` lub użyć `collaborator.role`:**

```tsx
type TripCollaboratorProps = {
  collaborator: TripCollaboratorType;
  sectionTitle?: string;
};

export function TripCollaborator({ collaborator, sectionTitle = "Prowadząca" }: TripCollaboratorProps) {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title={sectionTitle} />
        ...
```

Lub krócej — pozwolić by `role` ze współpracownika kształtowało nagłówek, np. `"Współpracownik"` jako bardziej neutralny default.

---

### 🟡 [nit] `NewsletterForm.tsx` linia 90 — mieszane kodowanie w jednym stringu

**Plik:** `src/components/shared/NewsletterForm.tsx` — linia 90

**Opis:** Jeden string ma mieszane kodowanie — `\u201E` i `\u201D` (unicode escapes dla cudzysłowów) ale `wskazówki` i `rodziców` jako literalne znaki:

```tsx
\u201EJak przygotowa\u0107 dziecko do wyjazdu warsztatowego\u201D \u2014 praktyczne wskazówki dla rodzic\u00F3w blisko\u015Bciowych.
```

W JSX literalne polskie znaki są akceptowalne (CLAUDE.md: "HTML entities w JSX"), ale ten string jest w `.tsx` renderowanym jako tekst, więc zasada HTML entities nie jest tu ścisła. Jednak konsekwencja kodowania jest ważna — albo wszystkie unicode escapes, albo literalne znaki, nie mix.

Nie jest to błąd krytyczny (JSX renderuje poprawnie), ale niespójne z resztą linii w tym samym stringu.

---

### 🟡 [nit] Slug wyjazdu "yoga-i-konie" — niespójność z nowym tytułem "Joga i Konie"

**Plik:** `src/data/trips.ts` — linia 138

**Opis:** Tytuł wyjazdu zmieniono na "Joga i Konie — Harmonia Natury na Mazurach" (z "Yoga i Konie"), ale slug pozostał `yoga-i-konie`:

```ts
slug: "yoga-i-konie",
title: "Joga i Konie \u2014 Harmonia Natury na Mazurach",
```

URL będzie `/wyjazdy/yoga-i-konie` mimo że tytuł używa polskiej pisowni "Joga".

**Uwaga:** Zmiana slugu to decyzja SEO — URL `yoga-i-konie` może być korzystny (angielska forma jest bardziej popularna w wyszukiwaniach, `yoga` vs `joga`). Jednak powinno to być świadoma decyzja, a nie przypadkowe pominięcie. Warto skomentować w kodzie.

Jeśli slug ma zostać `yoga-i-konie`, to poprawny komentarz:
```ts
slug: "yoga-i-konie", // URL celowo "yoga" (SEO), tytuł "Joga" (polska pisownia)
```

---

### 🟡 [nit] `ContactInfo.tsx` — `extractHandle` zdefiniowana lokalnie, duplikuje logikę z o-nas

**Plik:** `src/components/contact/ContactInfo.tsx` — linie 7-9

**Opis:** Funkcja `extractHandle` jest zdefiniowana bezpośrednio w `ContactInfo.tsx`. Ta sama logika prawdopodobnie istnieje gdzieś w kodzie (lub jest wzorcem z CLAUDE.md Phase 4 Lessons).

Sprawdzenie: czy `extractHandle` istnieje już jako exportowana funkcja gdzieś w projekcie? Jeśli nie, powinna być w `src/lib/utils.ts` jako shared utility. Jeśli tak, powinna być importowana.

W obecnym kształcie nie jest to blocking issue (funkcja jest prosta i lokalne użycie jest czytelne), ale narusza DRY jeśli ta logika jest powielona.

---

### 🟡 [nit] `o-nas/page.tsx` — `Strona główna` w breadcrumb bez unicode escapes

**Plik:** `src/app/o-nas/page.tsx` — linia 50

**Opis:** W nowym kodzie:
```tsx
{ name: "Strona g\u0142\u00F3wna", url: SITE_CONFIG.url },
```
To jest poprawne (unicode escapes). Natomiast w liniach 75-77 breadcrumb dla wyjazdu (w `[slug]/page.tsx`) używa literalnych polskich znaków. To stary kod poza zakresem, ale warto wiedzieć.

---

## 3. Dobre rozwiązania — warte docenienia

### Etap D — "Yoga i Konie" pełna treść (6.12–6.14)

**`src/types/trip.ts` — `role?: string` jako optional**
Prawidłowa decyzja dodania jako opcjonalny `role?` — zachowana kompatybilność wsteczna z Iloną, która miała role w danych, i nie łamie TypeScripta dla przyszłych collaboratorów bez roli.

**`src/components/trips/TripCollaborator.tsx` — conditional rendering `role`**
```tsx
{collaborator.role && (
  <p className="mt-1 text-sm text-graphite-light">
    {collaborator.role}
  </p>
)}
```
Prawidłowy conditional render. Spójny z wzorcem projektowym.

**`src/data/trips.ts` — `pricing: []` i `deposit: 0` dla Yoga i Konie**
Świadoma decyzja — brak cen w danych DOCX. Odpowiedź na to w `page.tsx` (hasPricing guard) jest prawidłowa:
```tsx
const hasPricing = trip.pricing.length > 0;
{hasPricing && <TripPricing pricing={trip.pricing} deposit={trip.deposit} />}
```
Wzorzec z CLAUDE.md Phase 3: "Conditional section rendering with boolean flags".

**`src/data/trips.ts` — `hasCollaborator` guard**
```tsx
const hasCollaborator = trip.collaborator.name !== "Wkrótce";
```
Nadal działa dla Kamili — jej name !== "Wkrótce". Sekcja współpracownika renderuje się poprawnie.

---

### Etap E — Poprawki wizualne (6.15–6.17)

**`Header.tsx` — logo width={56}**
Prosta zmiana, prawidłowo zastosowana. `priority` zachowane — logo jest above-the-fold.

**`TripPricing.tsx` — "Twoja inwestycja"**
Dobra zmiana copywritingowa. Tytuł sekcji jest bardziej perswazyjny i mniej transakcyjny.

**`Footer.tsx` — "Znajdź nas"**
Prawidłowa zmiana. Bardziej przyjazna dla użytkownika niż angielskie "Social".

---

### Etap F — Lead magnet w newsletterze (6.18)

**`NewsletterForm.tsx` — nowy copy**
Zmiana z ogólnego newslettera na lead magnet (poradnik PDF) jest strategicznie dobra. Implementacja zachowuje:
- Honeypot (`HoneypotField`)
- Zod validation + RHF
- 4-state machine (idle/submitting/success/error)
- Poprawne `aria-label`, `aria-invalid`, `aria-describedby`
- Rate limiting po stronie API (nie zmieniane)

Wiadomość sukcesu `"Dziękujemy! Poradnik wysyłamy na Twój adres e-mail."` jest jasna i nie obiecuje automatycznego potwierdzenia — zgodna z zasadą projektu "No automatic email confirmation in MVP".

---

### Etap G — Avatar w ContactInfo (6.19)

**`ContactInfo.tsx` — avatar Marii**
```tsx
const maria = getTeamMember("Maria Kordalewska");
```
Prawidłowe użycie helpera `getTeamMember()` zamiast `teamMembers[0]` — zgodne z Phase 4 Lesson: "Data access via helpers, not array indices".

Conditional rendering `maria?.image && (...)` obsługuje brak zdjęcia.

`sizes="64px"` prawidłowe dla 64px avatara.

---

### Etap C — TestimonialCard i opinie (6.8–6.11)

**`src/types/testimonial.ts` — typ Testimonial**
Czysty, minimalny typ. `trip?` jako optional — poprawne (nie każda opinia przypisana do konkretnego wyjazdu).

**`src/data/testimonials.ts` — helpery**
```ts
export function getFeaturedTestimonials(ids: string[]): Testimonial[]
```
Dobry wzorzec — zamiast hardcoded indeksów, wybór po `id`. Spójne z filozofią projektu (Phase 4: helpers over array indices).

Filtrowanie z type guard `(t): t is Testimonial => t !== undefined` — poprawna TypeScript technika.

**`src/components/shared/TestimonialCard.tsx` — semantyczny HTML**
```tsx
<blockquote>
  ...
  <footer>
    <cite className="not-italic">
```
Wzorowa semantyka HTML dla cytatów. `<blockquote>` + `<cite>` w `<footer>` to prawidłowy HTML5 pattern dla testimoniali.

**`OpinionsTeaser.tsx` — Server Component**
Brak `"use client"` — prawidłowe. `getFeaturedTestimonials` jest wywołana w SC. `TestimonialCard` używa `ScrollAnimation` (klient) jako granicy — wzorzec SC + client boundary jest zachowany.

**`/opinie/page.tsx` — usunięcie `robots: { index: false }` + dodanie do sitemap.ts**
Prawidłowa sekwencja — zgodna z Phase 5 Lesson: "Placeholder pages out of sitemap". Teraz gdy strona ma prawdziwą treść, powinna być indeksowana i w sitemap.

**`SectionHeading as="h1"` w `/opinie/page.tsx`**
Prawidłowe użycie `as` prop dodanego w Phase 5.

---

### Etap B — "O mnie" rename (6.4–6.7)

**Unicode escapes w `.ts` data files**
Nowe bio Marii w `team.ts` poprawnie używa unicode escapes dla polskich znaków.

**`getTeamMember()` helper**
Konsekwentne użycie helpera w `o-nas/page.tsx`:
```tsx
const maria = getTeamMember("Maria Kordalewska")!;
const kamila = getTeamMember("Kamila Janczurewicz")!;
```
Non-null assertion `!` jest tu akceptowalna — dane są hardcoded i zawsze będą istnieć.

**`missionCards` jako moduł-level constant**
```tsx
const missionCards = [...]; // poza komponentem, w module scope
```
Prawidłowe — nie powoduje re-tworzenia tablicy przy każdym renderze (Server Component, więc nie ma to znaczenia wydajnościowego, ale jest dobrym nawykiem).

**`key={card.title}` zamiast indeksu**
```tsx
{missionCards.map((card, index) => (
  <ScrollAnimation key={card.title} ...>
```
Prawidłowe — stabilny key z unikalnej wartości.

---

## 4. Uwagi architektoniczne

### A. Bio Kamili — Single Source of Truth

Najważniejsza uwaga architektoniczna: `TripCollaborator` dla "Yoga i Konie" ma bio w `trips.ts`, które jest prawie identyczne z `team.ts`, ale nie jest tym samym stringiem (brak `\n\n`).

Długoterminowo warto rozważyć:
1. `Trip.collaborator` = `{ teamMemberId: string } | { name, role, bio, image }` — referencja do team member lub własne dane
2. Lub helper `buildCollaboratorFromTeamMember(name)` w `trips.ts`

### B. `TripCollaborator` heading — rozszerzalność

Hardcoded "Prowadząca" stanie się problemem gdy pojawi się wyjazd z prowadzącym-mężczyzną lub parą prowadzących. Prop `sectionTitle` powinien zostać dodany jako priorytet przed kolejnymi wyjazdami.

### C. Sekcja "Współpracują ze mną" — layout

Rozdzielenie nagłówka i treści PersonBio na dwa osobne SectionWrapper z różnymi wariantami tła to potencjalny problem UX przy różnych rozmiarach ekranu. Polecam weryfikację wizualną jako część zadania 6.21.

---

## 5. Podsumowanie

### Statystyki:
- Sprawdzonych plików: **19** (nowe + zmienione)
- Problemów krytycznych (🔴 blocking): **0**
- Problemów ważnych (🟠 important): **4**
- Drobnych uwag (🟡 nit): **3**
- Propozycji (🔵 suggestion): **0**

### Ogólna ocena: **Dobra jakość implementacji**

Etapy D-G są dobrze wykonane. Kod jest spójny z wzorcami projektu, TypeScript jest prawidłowy, dostępność zachowana, Server Components używane poprawnie. Cztery "important" issues to problemy, które mogą powodować wizualne lub treściowe niespójności, ale żaden nie łamie buildu.

Przed oznaczeniem Fazy 6 jako ukończonej (po `npm run build` w zadaniu 6.20) zalecam naprawienie przynajmniej:
1. Mieszanego kodowania w `trips.ts` linia 218
2. Duplikacji bio Kamili (lub co najmniej synchronizacji + komentarza)
3. Hardcoded "Prowadząca" w `TripCollaborator.tsx`
4. Sekcja "Współpracują ze mną" — weryfikacja wizualna po zadaniu 6.21
