# Analiza kompletności planu — Fazy 6-7

**Data:** 2026-03-03
**Źródło:** Claude Code (Gemini CLI niedostępne — brak API key)
**Zapytanie:** Sprawdź nowe zmiany w planie. Czy wszystko zostało uwzględnione do naprawy i ulepszenia?

---

## A) Draft (`plan_faza6_usprawnienia.md`) → Finalny plan (`plan.md` Fazy 6-7)

### Etap A (Quick Wins — nawigacja i konwersja)
| Element z draftu | Zadanie w planie | Status |
|---|---|---|
| A1. CTA "Zarezerwuj" w Header + MobileMenu | 7.1 | **OK** |
| A2. CTA w TripHero (anchor #formularz) | 7.5 | **OK** |
| A3. Active state nawigacji + aria-current | 7.2 | **OK** |
| A4. Numer telefonu w headerze | 7.3 | **OK** |
| A5. "Porozmawiaj z Marią" — miękkie CTA | 7.4 | **OK** |
| A6. "Social" → "Znajdź nas" | 6.17 | **OK** |

### Etap B (Scarcity)
| Element z draftu | Zadanie w planie | Status |
|---|---|---|
| B1. Rozszerzyć typ Trip o spots + early-bird | 7.7 | **OK** |
| B2. Dane spots/early-bird w trips.ts | 7.8 | **OK** |
| B3. Badge "Ostatnie miejsca!" na TripCard | 7.9 | **OK** |
| B4. Dostępność w TripPricing | 7.10 | **OK** |

### Etap C (SEO i analityka)
| Element z draftu | Zadanie w planie | Status |
|---|---|---|
| C1. FAQPage Schema.org | 7.15 | **OK** |
| C2. Śledzenie zdarzeń GA4 | 7.14 | **OK** |
| C3. Microsoft Clarity | 7.16 | **OK** |

### Etap D (UX fixes)
| Element z draftu | Zadanie w planie | Status |
|---|---|---|
| D1. Ukryć "Wiek dzieci" gdy dzieci=0 | 7.11 | **OK** |
| D2. Button active + loading | 7.12 | **OK** |
| D3. Cena na TripCard | 7.6 (w ramach "dwa przyciski + cena") | **OK** |
| D4. Sticky CTA na mobile | 7.13 | **OK** |
| D5. Usunąć OpinionsTeaser z homepage | 6.10-6.11 (zastąpiony prawdziwymi opiniami) | **OK** (inne rozwiązanie — lepsze) |

**Wynik: 18/18 — KOMPLET.** Wszystkie elementy z draftu zostały przeniesione do finalnego planu.

---

## B) Audyt UX (`2026-02-27_analiza-ux-ui-landing-page.md`) → Finalny plan

### TOP 10 priorytetów z audytu
| # | Rekomendacja | Zadanie | Status |
|---|---|---|---|
| 1 | CTA w TripHero | 7.5 | **OK** |
| 2 | Active state nawigacji + aria-current | 7.2 | **OK** |
| 3 | NewsletterForm → komponenty UI | — | **BRAK** |
| 4 | Focus ring formularzy → silniejszy ring | — | **BRAK** |
| 5 | Button active:scale-[0.98] | 7.12 | **OK** |
| 6 | Ukryj "Wiek dzieci" gdy dzieci=0 | 7.11 | **OK** |
| 7 | OpinionsTeaser — usunąć lub zamienić | 6.10-6.11 | **OK** |
| 8 | "Yoga i Konie" — pełna treść zamiast placeholder | 6.12-6.14 | **OK** |
| 9 | Dodaj `<h1>` na `/wyjazdy` | — | **BRAK** (ale SectionHeading `as="h1"` dodano w Fazie 5) |
| 10 | Footer "Social"→"Znajdź nas" | 6.17 | **OK** |

### Pozostałe elementy z audytu
| Rekomendacja | Status | Komentarz |
|---|---|---|
| PersonBio: placeholder User icon → zdjęcia | **OK** (6.2-6.3) | |
| PlaceCard: brak zdjęć miejsc | **BRAK** | Brak planu dodania zdjęć do PlaceCard |
| Logo `alt=""` (dekoracyjne, czytane 2x) | **BRAK** | Drobna poprawka a11y |
| Footer: brak logo | **BRAK** | Minor |
| Footer: newsletter border-t | **BRAK** | Minor styling |
| Hero h1 = value proposition zamiast brand name | **BRAK** | Zmiana copy, nie komponentu |
| Hero: text-white/85 WCAG contrast | **BRAK** | Potencjalny problem a11y |
| TripGallery: brak lightbox/zoom | **BRAK** | Użytkownik chce zobaczyć zdjęcia bliżej |
| Kontakt: brak info o czasie odpowiedzi | **BRAK** | Minor copy |
| Kontakt: success state layout shift | **BRAK** | Minor UX |
| aria-live na form state changes | **BRAK** | a11y gap |
| Wizualny breadcrumb (mamy JSON-LD, nie mamy UI) | **BRAK** | Minor SEO/UX |
| Color tokens --color-error, --color-success | **BRAK** | Design system gap |
| TripPracticalInfo: brak info "Dojazd własny" | **BRAK** | Content gap |

**Wynik: 8/10 priorytetów OK. ~14 mniejszych elementów nieuwzględnionych** (głównie styling, a11y, minor copy).

---

## C) Competitive Blueprint (`claude_competitive_blueprint.md`) → Finalny plan

| Rekomendacja | Priorytet w Blueprint | Status | Zadanie |
|---|---|---|---|
| Prawdziwe opinie/testimoniale | Krytyczny | **OK** | 6.8-6.11 |
| CTA w nawigacji | Krytyczny | **OK** | 7.1 |
| **Trust numbers/stats na homepage** | **Krytyczny** | **BRAK** | Brak zadania! |
| Scarcity/spots | Krytyczny | **OK** | 7.7-7.10 |
| FAQPage Schema | Wysoki | **OK** | 7.15 |
| Telefon w headerze | Wysoki | **OK** | 7.3 |
| Early-bird pricing | Wysoki | **OK** | 7.7 (pola w typie) |
| Historia Marii (pełna) | Wysoki | **OK** | 6.4-6.7 |
| Lead magnet PDF | Średni | **OK** | 6.18 |
| Sticky CTA mobile | Średni | **OK** | 7.13 |
| "Porozmawiaj z Marią" | Średni | **OK** | 7.4 |
| Galeria prawdziwych zdjęć | Średni | **OK** | 6.1, 6.13 |
| Blog | Średni | Odroczone | Świadoma decyzja |
| **Pasek logotypów partnerów/prasy** | **Średni** | **BRAK** | Brak zadania |
| Hashtag marki | Niski | Odroczone | OK |
| Community online | Niski | Odroczone | OK |
| Referral program | Niski | Odroczone | OK |
| Płatności ratalne | Niski | Odroczone | OK |
| Quiz segmentujący | Niski | Odroczone | OK |

**Wynik: 12/14 aktywnych rekomendacji OK. 2 brakujące: Trust numbers + Partner logos.**

---

## D) Poradnik (`docs/poradnik.md`) → Finalny plan

| Element | Status | Zadanie |
|---|---|---|
| Poradnik jako lead magnet w newsletterze | **OK** | 6.18 |
| FAQ: co zabrać na wyjazd | **OK** | 7.17 |
| FAQ: jak dojechać | **OK** | 7.17 |
| FAQ: brak zasięgu/cyfrowy detoks | **OK** | 7.17 |
| Checklista do plecaka (w FAQ lub jako osobny element) | **CZĘŚCIOWO** | Integracja przez FAQ, ale brak dedykowanej checklisty |

**Wynik: 4/5 OK.**

---

## E) Analiza strategiczna (`claude_project_description.md`) → Finalny plan

| Element | Status | Komentarz |
|---|---|---|
| GA4 event tracking | **OK** (7.14) | |
| **Pasek logotypów partnerów** | **BRAK** | Powtarza się z Blueprint |
| Lead magnet | **OK** (6.18) | |
| Rozbudowa galerii | **OK** (6.1, 6.13) | |
| **Sekcja "Minione wyjazdy"** | **BRAK** | Osobna sekcja na homepage |
| Microsoft Clarity | **OK** (7.16) | |
| Sticky CTA mobile | **OK** (7.13) | |

---

## PODSUMOWANIE

### Co jest w porządku (komplet):
- **Draft → Plan: 18/18 (100%)** — wszystkie elementy przeniesione
- **Blueprint krytyczne: 3/4** — scarcity, opinie, CTA OK
- **Poradnik: integracja kompletna** — lead magnet + FAQ expansion
- **Faza 6 (treści)** — logiczna i kompletna
- **Faza 7 (konwersja/UX)** — logiczna i kompletna

### Co BRAKUJE (warto dodać):

#### Priorytet WYSOKI:
1. **Trust numbers/stats na homepage** — "X rodzin | Y wyjazdów | Z lat doświadczenia". Blueprint ocenia to jako KRYTYCZNE. Brak jakichkolwiek liczb na stronie. Sugerowane zadanie: nowy komponent `TrustNumbers` lub inline w `AboutTeaser`/`page.tsx`.

#### Priorytet ŚREDNI:
2. **NewsletterForm → refaktor na komponenty UI** — używa raw HTML zamiast `Input`/`Button`/`Checkbox`. Niespójność z design systemem. (audyt UX, prio 3/10)
3. **Focus ring strength** — `ring-moss/20` (20% opacity) za słaby dla WCAG SC 1.4.11. (audyt UX, prio 4/10)
4. **aria-live na stanach formularzy** — brak powiadomień screen readera o success/error. (WCAG SC 4.1.3)
5. **TripGallery lightbox/zoom** — przy cenie 1100-1400 zł użytkownik chce zobaczyć zdjęcia bliżej.
6. **Zdjęcia do PlaceCard** — strona /o-nas: Kacze Bagno i Sasek mają placeholder.

#### Priorytet NISKI:
7. Hero `<h1>` = value proposition (nie brand name)
8. Logo `alt=""` (czytane 2x przez screen reader)
9. Footer: logo + newsletter `border-t`
10. Kontakt: info o czasie odpowiedzi ("48h")
11. Color tokens `--color-error`/`--color-success` (zamiast raw `red-*`)
12. Pasek logotypów partnerów (Kacze Bagno, Sasek) — jeśli mają loga
13. Wizualny breadcrumb na podstronach

### Kolejność i podział na etapy:
**Logiczny i prawidłowy.** Faza 6 (treści) przed Fazą 7 (konwersja) — ma sens, bo opinie i zdjęcia muszą być przed trust signals i scarcity. Etapy wewnątrz faz też są logiczne (dane → komponenty → integracja → weryfikacja).

---

*Wygenerowano przez Claude Code (zamiast /gemini — brak API key)*
