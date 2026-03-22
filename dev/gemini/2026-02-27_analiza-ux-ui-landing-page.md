# Analiza UX/UI — Landing Page "Wyjazdy z Dziećmi"

**Data:** 2026-02-27
**Źródło:** Claude Code (Gemini CLI niedostępne — quota exceeded na free tier)
**Zapytanie:** Analiza landing page strony głównej oraz podstron — co można poprawić, co może ładniej wyglądać.

---

## Odpowiedź

### CZĘŚĆ 1: STRONA GŁÓWNA

#### 1. Header & Nawigacja

**Co działa dobrze:**
- `sticky top-0 z-40` z `bg-parchment/95 backdrop-blur-sm` — frosted-glass effect, nowoczesny
- Logo `rounded-full` — spójne z miękkim, "naturalnym" brandem
- Brand name w Playfair Display + moss green — rozpoznawalne na pierwszy rzut oka
- Hamburger z `aria-expanded` + `aria-controls` — prawidłowe ARIA
- MobileMenu: pełny focus trap, Escape, body scroll lock, spring physics — rzadko widziana jakość implementacji

**Co poprawić:**
- **Brak aktywnego stanu** w nawigacji — użytkownik nie wie, na której stronie jest. Brak `aria-current="page"` i wizualnego highlight
- **Brak CTA w headerze** (np. "Zapisz się"). Po zscrollowaniu hero CTA znika — persistent CTA w sticky header poprawia konwersję
- **Nav gap-1 (4px)** to za mało dla 5 itemów — `gap-2` lub `gap-4` da lepszą separację i większe touch targets
- **Logo alt="Wyjazdy z Dziećmi"** + `<span>Wyjazdy z Dziećmi</span>` obok → screen reader czyta nazwę 2x. Fix: `alt=""` (dekoracyjne)
- MobileMenu: brak CTA wewnątrz, brak logo/brandu, brak dividerów między linkami

---

#### 2. HeroSection

**Co działa dobrze:**
- `min-h-[85vh]` — dobry balans między impact a hint do scrollowania
- `priority` na hero image — krytyczne dla LCP
- Gradient overlay `from-black/70 via-black/40 to-black/20` — tekst czytelny na dowolnym zdjęciu
- Staggered entrance animations (h1→p→ul→button, +150ms) — naturalny kaskadowy efekt
- Benefits list z Leaf/Heart/Sparkles icons — subtelne, premium
- Reduced-motion early return z pełnym HTML — wzorowe

**Co poprawić:**
- **`<h1>Wyjazdy z Dziećmi</h1>` = nazwa marki, nie value proposition!** To powtórzenie logo. Nagłówek powinien komunikować benefit: *"Zatrzymaj się z córką — odkryjcie siebie razem w naturze"*
- **Podtytuł origin-focused** (historia Marii), nie benefit-focused (co użytkownik zyska)
- **Tylko jeden CTA** ("Zobacz wyjazdy"). Dodać secondary ghost CTA ("Dowiedz się więcej") z anchorem do sekcji poniżej
- **`text-white/85` na benefit liście** — 85% opacity white nad overlay może nie spełniać WCAG AA (4.5:1) zależnie od zdjęcia. Bezpieczniej: `text-white`
- **Brak scroll indicator** — na dużych monitorach użytkownik może nie wiedzieć, że content jest poniżej

---

#### 3. TripCardsSection & TripCard

**Co działa dobrze:**
- `id="wyjazdy"` anchor dla hero CTA — dobra koordynacja nawigacji
- `sm:grid-cols-2` → single-column mobile, 2-column tablet+ — poprawne
- Staggered `delay={index * 0.15}` — płynna kaskada przy scroll
- `aspect-[4/3]` na image container — konsystentna wysokość kart
- `group-hover:scale-105` zoom na image — taktylny, interaktywny feel
- `grayscale` filter na past trips — elegancki semantyczny marker
- `line-clamp-3` na opisie — równe wysokości kart
- Badge z Calendar icon + datą — scannability

**Co poprawić:**
- **Brak ceny na karcie!** Rodziny są price-sensitive. "od 750 zł" pre-kwalifikuje i zmniejsza bounce
- **"Yoga i Konie" placeholder** prezentowany jako równoważny wyjazd — podkopuje zaufanie. "Wkrótce" wariant karty byłby lepszy
- Padding `p-4` na mobile dla premium brandu — `p-5` byłoby miękciej
- Heading centred → karty left-aligned — lekka niespójność osi czytania

---

#### 4. AboutTeaser

**Co działa dobrze:**
- `variant="alternate"` tworzy wizualny rytm sekcji
- Inline `<strong>` dla nazwy Marii w muted paragraph — sprytna hierarchia typograficzna
- `max-w-3xl` na text block — kontrolowana długość linii
- Button `variant="secondary"` — prawidłowa hierarchia CTA (nie konkuruje z primary w hero)

**Co poprawić:**
- **BRAK ZDJĘCIA MARII!** Twarz = zaufanie. To największy gap budowania emocjonalnej więzi na homepage
- Podtytuł "ludzi" (plural) ale opisana tylko Maria — niespójność
- **Centrowany body text >3 linii** = trudniejszy do czytania. Heading centered OK, ale paragraf → `text-left`

---

#### 5. OpinionsTeaser

**Co poprawić (KRYTYCZNE):**
- **Pusta sekcja opinii SZKODZI konwersji** — sygnalizuje brak potwierdzenia społecznego
- Opcje: (1) usunąć z homepage, (2) zamienić na inny social proof, (3) dodać choćby 1-2 prawdziwe cytaty
- Używa raw `<h2>` zamiast `<SectionHeading>` — niespójne spacing
- CTA "Weź udział" w pustej sekcji — brak kontekstu perswazji

---

#### 6. Footer

**Co działa dobrze:**
- Responsive grid 1→2→4 columns
- Newsletter form embedded — dobre placement
- Social links z `aria-label` + `rel="noopener noreferrer"`
- CookieSettingsButton — wymagane RODO, prawidłowo umieszczone
- Copyright z `new Date().getFullYear()`

**Co poprawić:**
- **"Social" po angielsku** na polskiej stronie → "Znajdź nas" / "Media społecznościowe"
- Brak logo w footerze — marka wizualnie niedomknięta
- Newsletter form gubi się między linkami a copyright — `border-t` dałby wizualną wagę
- `border-parchment-dark` na `bg-parchment-dark` = niewidoczny border → `border-graphite/10`
- Brak `<address>` wrapping kontaktu — minor semantic improvement

---

### CZĘŚĆ 2: PODSTRONY

#### 7. Trip Detail Page (`/wyjazdy/[slug]`)

**Co działa dobrze:**
- Sekwencja sekcji zgodna z PRD (Hero→Dla kogo→Opis→Program→Info→Cena→Prowadząca→FAQ→Galeria→Formularz) — naturalny sales funnel
- Conditional rendering (`hasSchedule`, `hasPricing`...) — czyste, prawidłowe
- BookingForm ukryty dla past trips
- 3 JSON-LD schemas (Event, FAQ, Breadcrumb) — thorough SEO

**Co poprawić:**
- **TripHero: BRAK CTA!** — najważniejszy brak konwersyjny na całej stronie. Dodać `<Button href="#formularz">Zapisz się</Button>`
- TripHero `min-h-[60vh]` konserwatywne — 70-75vh dałoby więcej impact
- Brak wizualnego breadcrumb (jest JSON-LD ale nie na stronie)
- **TripGallery: brak lightbox/zoom** — dla wyjazdu za 1100-1400 PLN użytkownik chce zobaczyć zdjęcia bliżej
- TripCollaborator: bio w jednym paragrafie — rozbić na 2-3
- TripPracticalInfo: brak info o transporcie ("Dojazd własny")
- TripProgram: brak rozróżnienia czas wolny vs sesje obowiązkowe
- **BookingForm: "Wiek dzieci" widoczny przy 0 dzieci** — ukryj gdy irrelevant
- BookingForm: trip dropdown edytowalny mimo preselected — ryzyko przypadkowej zmiany
- TripTargetAudience: brak CTA — high-intent user musi scrollować 4 sekcje do pierwszego CTA

---

#### 8. Strona `/wyjazdy` (listing)

**Co poprawić:**
- **Brak `<h1>`!** SectionHeading = `<h2>` by default. Gap a11y/SEO
- Brak page hero/intro — inne podstrony mają styled h1 z subtitle, ta zaczyna się abruptnie
- OK na 2 wyjazdy, ale w przyszłości przyda się filtering

---

#### 9. O nas (`/o-nas`)

**Co działa dobrze:**
- PersonBio alternating layout (Maria left/Kamila right) — vizualny zigzag
- ScrollAnimation direction mirrors image side — spójne
- Dual CTA na dole (primary + secondary)
- PlaceCard features/badges — szybkie skanowanie

**Co poprawić:**
- **PersonBio: placeholder User icon zamiast zdjęć!** — cel strony = budować zaufanie, a nie ma twarzy
- PlaceCard: też placeholder — brak zdjęć miejsc
- Brak linka do mapy / regionu dla lokalizacji
- Negative margin pattern `-mt-4 sm:-mt-6` — fragile spacing

---

#### 10. Kontakt (`/kontakt`)

**Co działa dobrze:**
- 2-column layout: info + form — standard, czytelny
- ContactInfo cards z hover states i aria-labels
- ContactForm minimal (3 pola) — prawidłowy zakres
- Error handling: 429 + generic errors

**Co poprawić:**
- Brak info o czasie odpowiedzi ("Odpowiadamy w ciągu 48h")
- Success state → layout shift (duży form → mały success message). Min-height pomoże
- Animation stagger inconsistency mobile (form delay 0.2 < last contact item delay 0.3)

---

#### 11. Opinie (`/opinie`)

**Co poprawić:**
- **Brak `robots: { index: false }`** — placeholder page indeksowana, sprzeczne z Phase 5 lessons
- Brak powiązania z danymi wyjazdów — choćby "Wyjazd 'Matka i Córka' — marzec 2026" z badge "Opinie wkrótce"

---

### CZĘŚĆ 3: DESIGN SYSTEM I KOMPONENTKI

#### 12. Spójność komponentów

| Problem | Severity |
|---------|----------|
| NewsletterForm używa raw HTML zamiast Input/Button/Checkbox | WYSOKA |
| CookieBanner omija Button component | ŚREDNIA |
| Checkbox label `text-graphite-light` vs inne `text-graphite` | NISKA |
| rounded-md vs rounded-lg mix (newsletter, cookie) | ŚREDNIA |
| HeroSection redundantne className na Button primary | NISKA |

#### 13. Accessibility gaps

| Problem | WCAG |
|---------|------|
| Focus ring `ring-moss/20` za słaby (20% opacity) | SC 1.4.11 |
| Brak `aria-current="page"` na nav links | SC 1.3.1 |
| Brak `aria-live` na form state changes | SC 4.1.3 |
| `text-white/85` w hero na zmiennym tle | SC 1.4.3 |
| Brak active/pressed state na Button (touch) | UX |

#### 14. Brakujące elementy design system

- `loading` prop na Button (formularze wyświetlają `"..."`)
- Tokeny `--color-error`, `--color-success` (raw `red-*` scattered)
- Empty state component
- `active:scale-[0.98]` na Button
- AnimatePresence na form success/error state transitions

---

### TOP 10 PRIORYTETÓW

| # | Zmiana | Impact | Effort |
|---|--------|--------|--------|
| 1 | CTA w TripHero (anchor do #formularz) | 🔴 Wysoki | 🟢 Niski |
| 2 | Aktywny stan nawigacji + aria-current | 🟡 Średni | 🟢 Niski |
| 3 | NewsletterForm → komponenty UI | 🟡 Średni | 🟡 Średni |
| 4 | Focus ring formularzy → ring-moss | 🟡 Średni | 🟢 Niski |
| 5 | Button active:scale-[0.98] | 🟢 Niski | 🟢 Niski |
| 6 | Ukryj "Wiek dzieci" gdy dzieci=0 | 🟢 Niski | 🟢 Niski |
| 7 | OpinionsTeaser — usunąć lub zamienić | 🔴 Wysoki | 🟡 Średni |
| 8 | "Yoga i Konie" — banner "wkrótce" | 🟡 Średni | 🟢 Niski |
| 9 | Dodaj `<h1>` na `/wyjazdy` | 🟢 Niski | 🟢 Niski |
| 10 | Footer "Social"→"Znajdź nas" + logo alt | 🟢 Niski | 🟢 Niski |

---

 Weryfikacja

 Po implementacji:
 1. npm run build — zero errors
 2. npm run dev — sprawdzić wizualnie każdą stronę
 3. Keyboard navigation — Tab przez cały site, sprawdzić focus rings    
 4. Mobile — sprawdzić na 375px width (iPhone SE)
 5. Screen reader — VoiceOver/NVDA na formularze i nawigację
 6. Lighthouse — accessibility score ≥95

*Wygenerowano przez Claude Code (zamiast /gemini — quota exceeded)*
