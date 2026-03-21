# Code Review — Faza 2: Hero + Kafelki kategorii + Gwiazdki opinii

Last Updated: 2026-03-21
Commit: `1b043e1`
Branch: `feature/poprawki-ui-nav-21-03`

---

## Executive Summary

Implementacja fazy 2 jest generalnie solidna i zgodna z planem. Wszystkie 8 zadań zostało ukończonych: H2 zmienione w obu wariantach HeroSection, USP usunięte, gwiazdki przeniesione nad opinie, CategoryCards dodane i zintegrowane na homepage. Brak błędów TypeScript (build clean). Znaleziono 1 issue accessibility (brak aria-label na linkach CategoryCards), 2 ważne kwestie dotyczące duplikacji kodu i semantyki, oraz kilka nitsów.

---

## Zgodność z planem

| Zadanie | Status | Uwagi |
|---------|--------|-------|
| 2.1 Zmiana H2 — wariant motion | OK | Tekst poprawny |
| 2.2 Zmiana H2 — wariant reduced-motion | OK | Tekst identyczny z motion wariantem |
| 2.3 Usunięcie USP pod slideshow | OK | Oba warianty oczyszczone |
| 2.4 Usunięcie gwiazdek z HeroSection | OK | Import `Star` usunięty z importów |
| 2.5 Gwiazdki nad OpinionsTeaser | OK | |
| 2.6 Gwiazdki na /opinie | OK | |
| 2.7 Nowy CategoryCards | OK | |
| 2.8 Integracja na homepage (po hero, przed kalendarzem) | OK | |

---

## Problemy

### 🟠 [important] CategoryCards — brak aria-label na linkach

**Plik:** `src/components/home/CategoryCards.tsx`, linia 41–60

Każda karta to `<Link>` zawierający tylko `<Image>` i `<h3>`. Screen reader odczyta `h3` jako tekst linku, co jest technicznie poprawne, ale istnieje subtelny problem: `<h3>` jest wewnątrz `<a>`, co jest niezalecane przez HTML spec (interactive content inside `<a>`). Bardziej krytyczne: link nie ma `aria-label` ani `title`, a jego dostępny tekst to zawartość h3, która jest duplikatem wizualnej etykiety. To działa, ale warto sprawdzić, czy h3 wewnątrz a nie powoduje ostrzeżeń w axe/Lighthouse.

Dodatkowy problem: brak opisu kontekstu w alt tekstach (np. "Warsztaty matka i córka" — czego dotyczą? dla kogo?). Obecne alt są OK, ale mogą być bardziej opisowe.

**Sugestia:**
Dodać `aria-label` na `<Link>` z pełnym kontekstem nawigacyjnym:
```tsx
<Link
  href={cat.href}
  aria-label={`Przejdź do: ${cat.label}`}
  className="group relative block overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
>
```
Alternatywnie, jeśli `h3` jest wystarczające — OK, ale warto zweryfikować axe.

---

### 🟠 [important] Duplikacja kodu gwiazdek — wydzielić komponent

**Pliki:**
- `src/components/home/OpinionsTeaser.tsx`, linie 22–33
- `src/app/(main)/opinie/page.tsx`, linie 38–49

Identyczny blok 12 linii JSX z `ScrollAnimation + div + Array.from({ length: 5 }) + Star + span` pojawia się w dwóch miejscach. CLAUDE.md stwierdza "Single Source of Truth" jako wzorzec projektu.

**Sugestia:** Wydzielić `StarRating` lub `SocialProofBadge` do `src/components/shared/` lub `src/components/ui/`:
```tsx
// src/components/ui/StarRating.tsx
export function StarRating({ label = "Polecane przez rodziców" }: { label?: string }) {
  return (
    <ScrollAnimation variant="fadeUp">
      <div className="mb-8 flex items-center justify-center gap-1.5 text-sm text-graphite-light" aria-label="5 z 5 gwiazdek">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-mustard text-mustard" strokeWidth={1} />
        ))}
        <span className="ml-1">{label}</span>
      </div>
    </ScrollAnimation>
  );
}
```
Wtedy użycie: `<StarRating />` zamiast 12 linii w każdym miejscu.

---

### 🟡 [nit] CategoryCards — semantyczny problem z h3 wewnątrz a

**Plik:** `src/components/home/CategoryCards.tsx`, linia 56

```tsx
<h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
  {cat.label}
</h3>
```

Nagłówek `<h3>` wewnątrz `<a>` jest technicznie dozwolony w HTML5, ale powoduje ostrzeżenia w niektórych linterach dostępności. Typowy pattern dla kart z nagłówkami i linkami to albo:
1. Nagłówek **poza** linkiem + `after:` pseudo-element na linku do "rozszerzenia" obszaru klikalności
2. Lub obecne podejście z nagłówkiem wewnątrz a (akceptowalne, ale niestandardowe)

W kontekście tego projektu (klikalna cała karta) obecne podejście jest powszechnie stosowane. Nie wymaga zmiany, ale warto mieć świadomość.

---

### 🟡 [nit] CategoryCards — brak sekcji "Nasze warsztaty" jako tytułu

**Plik:** `src/components/home/CategoryCards.tsx`

`CategoryCards` renderuje siatkę kart bez żadnego tytułu sekcji (`SectionHeading`). Sekcja wizualnie "wisi" bez kontekstu między hero a kalendarzem. Planer nie wymagał tytułu, ale dla screen readerów nawigujących przez headlingi sekcja kategorii jest niewidoczna w strukturze dokumentu.

**Sugestia:** Opcjonalnie dodać `SectionHeading` z tytułem np. "Nasze warsztaty" lub "Wybierz swój wyjazd". Jeśli wygląd jest celowo bezpośredni (karty mówią same za siebie), wystarczy `aria-label="Kategorie warsztatów"` na `<div>` siatki.

---

### 🟡 [nit] CategoryCards — sizes attribute niedokładny przy 3 kolumnach

**Plik:** `src/components/home/CategoryCards.tsx`, linia 50

```tsx
sizes="(max-width: 640px) 100vw, 33vw"
```

Brakuje uwzględnienia przerw (`gap-6`) między kolumnami i paddingu Containera. Przy 3 kolumnach z gap-6 i containerem z px-4 dokładniejszy rozmiar to `calc(33vw - 24px)` lub `calc((100vw - 2rem - 2 * 1.5rem) / 3)`. Przy rozmiarze projektu ta niedokładność nie wpłynie znacząco na wydajność (Next.js Image wybiera odpowiedni srcset), ale jest to best practice.

**Sugestia:**
```tsx
sizes="(max-width: 640px) calc(100vw - 2rem), calc((100vw - 2rem - 3rem) / 3)"
```

---

### 🟡 [nit] OpinionsTeaser — ScrollAnimation na gwiazdkach obok SectionHeading

**Plik:** `src/components/home/OpinionsTeaser.tsx`, linia 22

`SectionHeading` ma wbudowany efekt animacji (bazuje na `ScrollAnimation` wewnątrz lub ma własne klasy). Dodanie osobnego `<ScrollAnimation variant="fadeUp">` tuż po `SectionHeading` może powodować dwa następujące po sobie efekty fade-in, co wygląda "skaczące". Warto sprawdzić wizualnie, czy efekt jest płynny.

---

### 🔵 [suggestion] Gwiazdki — rozważyć `role="img"` i poprawiony aria-label

**Pliki:** `OpinionsTeaser.tsx` linia 23, `opinie/page.tsx` linia 39

```tsx
<div className="..." aria-label="5 z 5 gwiazdek">
```

`aria-label` jest na `<div>`, ale `<div>` domyślnie nie ma roli, więc screen readery mogą zignorować `aria-label`. Dodanie `role="img"` zapewnia, że czytnik ekranowy odczyta aria-label jako opis "obrazka":

```tsx
<div role="img" aria-label="5 z 5 gwiazdek — Polecane przez rodziców" className="...">
```

Wtedy można usunąć `<span className="ml-1">Polecane przez rodziców</span>` z treści (przeniesionej do aria-label), lub zachować oba dla użytkowników widzących.

---

### 🔵 [suggestion] CategoryCards — wariant "dla dorosłych" nieobecny

**Plik:** `src/components/home/CategoryCards.tsx`, linia 8–27

Plan (zadanie 7) wymienia 3 karty: Wyjazdy z Dziećmi, Dla Matki i Córki, Dla Singli z Dziećmi. Kategoria "Dla dorosłych" (`/dla-doroslych`) jest pominięta. Plan tego nie wymagał — jest to noindex placeholder, więc pominięcie jest prawdopodobnie celowe. Brak uwag, tylko informacja.

---

## Co działa dobrze

### HeroSection

**H2 zgodny w obu wariantach.** Zarówno wariant `reduced-motion` (linia 73–74) jak i wariant z `motion` (linia 151–152) mają identyczny tekst:
```
"Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia na całe życie."
```
z `<span className="text-terracotta">na całe życie</span>` jako wyróżnieniem.

Komentarz dokumentacyjny o SEO H1/H2 inversion zachowany (linia 67–68).

**USP usunięte** z obu wariantów. Import `Star` prawidłowo usunięty z importów (linia 1 — nie ma w aktualnym pliku).

### CategoryCards

**Server Component** — brak `"use client"`, brak hooków. Poprawnie.

**`cn()` nie jest potrzebne** — klasy są statyczne, nie ma warunkowych klas. Brak naruszenia konwencji.

**`ScrollAnimation className="h-full"`** — linia 39, zgodnie z wymaganiem CLAUDE.md dla gridów.

**Staggered delay** — `delay={index * 0.12}` — poprawny wzorzec.

**Istniejące obrazy** — `/images/hero.jpg`, `/images/matki-corki-1.jpg`, `/images/przeszly-1.jpg` — wszystkie pliki istnieją w `public/images/`.

**`ROUTES` z constants.ts** — nie ma hardcoded URL-i.

### Gwiazdki

**`aria-label="5 z 5 gwiazdek"`** obecny w obu miejscach — zgodny z wymaganiem z planu (ryzyko: "accessibility gwiazdek").

**`strokeWidth={1}`** na gwiazdkach (nie 1.5 jak standard ikon) — właściwy wybór, bo gwiazdki są wypełnione (`fill-mustard`) i cieńszy stroke wygląda lepiej.

### Homepage — kolejność sekcji

`page.tsx` linia 28–51:
```
HeroSection → CategoryCards → Calendar → TripCardsSection → AboutTeaser → OpinionsTeaser → HomeFAQ
```
Zgodna z wymaganiem planu (Miernik sukcesu #5).

---

## Podsumowanie

| Priorytet | Ilość | Opis |
|-----------|-------|------|
| Blocking | 0 | Brak |
| Important | 2 | aria-label na linkach CategoryCards, duplikacja gwiazdek |
| Nit | 3 | h3 w a, brak tytułu sekcji, sizes attribute |
| Suggestion | 2 | role="img" na gwiazdkach, "dla dorosłych" info |

Build jest czysty, TypeScript nie zgłasza błędów. Faza 2 może iść dalej bez blocking issues.
