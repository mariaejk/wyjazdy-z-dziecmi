# Code Review — Faza 5: Polish, SEO, Compliance

Last Updated: 2026-02-26

---

## Podsumowanie

Faza 5 jest dobrze wykonana i kompletna. Wszystkie kluczowe wymagania (cookie banner RODO, GA4 za zgodą, newsletter z ochroną, structured data, security headers, logger, SectionHeading `as` prop) zostały zrealizowane. Architektura nowych komponentów jest spójna z wzorcami projektu. Znaleziono jeden błąd krytyczny w logice `isLoaded` i dwa problemy ważne wymagające poprawy przed produkcją.

**Ocena: 8/10** — wdrożenie solidne, kilka rzeczy do naprawy przed go-live.

---

## Pliki sprawdzone

### Nowe pliki (15)
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/not-found.tsx`
- `src/app/manifest.ts`
- `src/app/api/newsletter/route.ts`
- `src/lib/structured-data.ts`
- `src/lib/validations/newsletter.ts`
- `src/lib/logger.ts`
- `src/components/shared/StructuredData.tsx`
- `src/components/shared/GoogleAnalytics.tsx`
- `src/components/shared/NewsletterForm.tsx`
- `src/components/layout/CookieBanner.tsx`
- `src/components/layout/CookieSettingsButton.tsx`
- `src/hooks/useCookieConsent.ts`
- `src/types/cookies.ts`

### Zmodyfikowane pliki (13)
- `src/app/layout.tsx`
- `src/app/wyjazdy/[slug]/page.tsx`
- `src/app/wyjazdy/page.tsx`
- `src/app/o-nas/page.tsx`
- `src/app/kontakt/page.tsx`
- `src/app/opinie/page.tsx`
- `src/app/single-parents/page.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/SectionHeading.tsx`
- `src/app/api/booking/route.ts`
- `src/app/api/contact/route.ts`
- `next.config.ts`
- `CLAUDE.md`

---

## Problemy

### Blokujace

**[blocking-1] Logika `isLoaded` jest niepoprawna — banner moze sie pokazac na SSR lub byc ukryty na kliencie**

Plik: `src/hooks/useCookieConsent.ts`, linia 55

```typescript
const isLoaded = raw !== undefined;
```

Problem: `useSyncExternalStore` zwraca `getServerSnapshot()` na serwerze i `getSnapshot()` na kliencie. `getServerSnapshot()` zwraca `null` (nie `undefined`). `getSnapshot()` tez zwraca `string | null` (nie `undefined`). Wiec `raw` nigdy nie bedzie `undefined` — `isLoaded` zawsze bedzie `true`, wlacznie z renderowaniem po stronie serwera.

To narusza cel SSR-safe implementacji. Na serwerze `raw === null` (z `getServerSnapshot`), wiec `isLoaded = null !== undefined = true`. Banner zostanie wyrenderowany w HTML z serwera z `showBanner = true` (bo `consent.timestamp === 0`), co spowoduje flash banneru zanim klient zamontuje React.

Poprawna implementacja wymaga rozroznienia miedzy SSR a hydratacja klienta:

```typescript
// Poprawne rozwiazanie — isLoaded = true tylko po stronie klienta po montazu
// useSyncExternalStore zwraca getServerSnapshot() na SSR (null)
// Po hydratacji przechodzi do getSnapshot() — tez null lub string
// Nie mozna odroznic SSR od "klient, localStorage jest pusty" przez sam useSyncExternalStore.
// Potrzebny dodatkowy marker:

const [hasMounted, setHasMounted] = useState(false);
useEffect(() => { setHasMounted(true); }, []);
const isLoaded = hasMounted;
```

Alternatywnie, jesli zachowamy `useSyncExternalStore`, `isLoaded` powinno byc:
```typescript
// Nie mozna rozroznic SSR od "pusty localStorage" przez raw wartosci.
// Jedyne rozwiazanie to sprawdzenie typeof window po stronie klienta.
const isLoaded = typeof window !== "undefined";
```

Ale to takze nie jest doskonale w SSR. Najczystsze rozwiazanie: dodac `useState(false)` + `useEffect(() => setHasMounted(true), [])`. `isLoaded = hasMounted`.

Aktualny kod sprawia, ze `CookieBanner` z `!isLoaded` w linii 71 NIGDY nie zwroci `null` — `isLoaded` jest zawsze `true`.

---

**[blocking-2] Brakujace pliki ikon referencjonowane w `manifest.ts` i `layout.tsx`**

Pliki: `src/app/manifest.ts` (linie 14, 19), `src/app/layout.tsx` (linia 53)

Manifest odwoluje sie do:
- `/icon-192.png` — nie istnieje (brak w `public/`)
- `/icon-512.png` — nie istnieje (brak w `public/`)
- `/apple-touch-icon.png` — nie istnieje (brak w `src/app/` ani `public/`)

Tylko `src/app/favicon.ico` istnieje. Brakujace pliki przy wdrozeniu na Vercel spowoduja 404 dla tych assetow, co jest widoczne dla uzytkownikow i crawlerow. Nie blokuje buildu, ale blokuje produkcyjny deploy (manifest jest niefunkcjonalny).

**Wymagane dzialanie:** Stworzyc pliki ikon lub usunac referencje do nieistniejacych assetow z `manifest.ts` i `layout.tsx`.

---

**[blocking-3] Niepoprawny `eventStatus` dla minionych wyjazdow — `EventCancelled` zamiast `EventPast`**

Plik: `src/lib/structured-data.ts`, linia 42

```typescript
if (trip.isPast) {
  schema.eventStatus = "https://schema.org/EventCancelled";
}
```

`EventCancelled` oznacza ze wydarzenie zostalo odwolane. Dla minionych (juz zakonczonych) wyjazdow poprawna wartosc to `EventScheduled` (odbylo sie zgodnie z planem) lub `EventPostponed` — nigdy `EventCancelled`. Google moze zdegradowac strony z niepoprawnym statusem. Wlasciwy schemat to:

```typescript
// Dla minionych, ktore sie odbyly:
schema.eventStatus = "https://schema.org/EventScheduled";
// Mozna tez nie ustawiac eventStatus dla minionych — domyslnie EventScheduled
```

---

### Wazne

**[important-1] Template literals zamiast `cn()` w `CookieBanner` — narusza zasade projektu**

Plik: `src/components/layout/CookieBanner.tsx`, linie 95, 102, 109, 178, 185

```typescript
const buttonClass = "w-full rounded-md border border-moss px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto";
// ...
className={`${buttonClass} bg-moss text-white hover:bg-moss-light`}
```

CLAUDE.md i Phase 4 Lessons Learned sa jednoznaczne: "cn() over template literals". Template literals omijaja tailwind-merge, ktore rozwiazuje konflikty klas. W tym przypadku nie ma konfliktu (inne wlasciwosci), wiec nie zepsuje UI — ale narusza ustalony wzorzec.

Poprawka:
```typescript
className={cn(buttonClass, "bg-moss text-white hover:bg-moss-light")}
```

Wymaga dodania `import { cn } from "@/lib/utils"`.

---

**[important-2] `panelRef` jest zadeklarowany ale nigdy nie uzywany**

Plik: `src/components/layout/CookieBanner.tsx`, linie 20, 116

```typescript
const panelRef = useRef<HTMLDivElement>(null); // linia 20
// ...
<div ref={panelRef}> // linia 116
```

Ref jest podlaczony do elementu, ale nie jest uzywany nigdzie w logice (brak `.current.focus()`, brak focus trap, brak scroll). Jest to dead code. Albo nalezy zaimplementowac focus management (patrz [important-3]), albo usunac ref.

---

**[important-3] Brak focus management w `CookieBanner` — problem dostepnosci (a11y)**

Plik: `src/components/layout/CookieBanner.tsx`

Banner uzywa `role="dialog"` (linia 78) i `aria-modal="false"` (linia 80). Wedlug WCAG 2.1 SC 2.4.3 (Focus Order) i WAI-ARIA dialog pattern: po otwarciu dialogu fokus powinien przeniesc sie do pierwszego focusable elementu wewnatrz.

Aktualnie:
1. Uzytkownik kliknie "Dostosuj" z klawiatury
2. Pojawia sie panel szczegolowy
3. Fokus pozostaje na przycisku "Dostosuj" (ktory znika)
4. Uzytkownik jest zdezorientowany

Poprawka — w handlerze otwierania panelu i w `handleOpenSettings`:
```typescript
// Po setShowPanel(true) — przenies fokus do pierwszego buttona w panelu
useEffect(() => {
  if (showPanel && panelRef.current) {
    const firstFocusable = panelRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  }
}, [showPanel]);
```

Skoro `panelRef` juz istnieje, to naturalne miejsce na te logike.

---

**[important-4] `openedFromFooter` nie resetuje sie gdy uzytkownik zapisze zgode przez banner otwarty z footer**

Plik: `src/components/layout/CookieBanner.tsx`, linia 36

```typescript
const isVisible = showBanner || openedFromFooter;
```

Scenariusz problemu:
1. Uzytkownik pierwszy raz odwiedza strone — banner pojawia sie (`showBanner = true`)
2. Klika "Tylko niezbedne" — zgoda zapisana, `consent.timestamp > 0`, `showBanner = false`
3. Pozniej klika "Ustawienia cookies" w footer — `openedFromFooter = true`, banner sie pokazuje
4. Klika Escape — `showPanel` sie zamyka, ale co z `openedFromFooter`?

W `handleKeyDown` (linia 42-47): `Escape` zamyka tylko `showPanel`, nie resetuje `openedFromFooter`. Jesli uzytkownik otworzy panel szczegolowy (`showPanel = true`) a potem nacisnenie Escape zamknie panel (`showPanel = false`), `openedFromFooter` nadal jest `true` — banner (glowny widok) jest nadal widoczny.

Poprawka w `handleKeyDown`:
```typescript
if (e.key === "Escape") {
  if (showPanel) {
    setShowPanel(false);
  } else if (openedFromFooter) {
    setOpenedFromFooter(false); // Zamknij caly banner jesli jest otwarty z footer
  }
}
```

---

**[important-5] Sitemap pomija strony z polityka prywatnosci i regulaminem**

Plik: `src/app/sitemap.ts`, linie 8-15

Strony `polityka-prywatnosci` i `regulamin` maja ustawione `robots: { index: false, follow: false }` — wiec celowo sa wykluczone z indeksowania, co jest prawidlowe. Jednak `opinie` i `single-parents` sa stronami z minimalnym contentem (placeholder) i nie maja `noindex`, a ich breadcrumby wpisuja sie do sitemapy.

Problem poboczny: `single-parents` jest w sitemap z priorytetem 0.6, ale strona nie ma pelnego contentu (wygenerowany przez AI). Zgodnie z notatka w CLAUDE.md ("robots: { index: false } on placeholder pages: Pages without content shouldn't be indexed. Remove after adding full content.") — ta zasada nie zostala zastosowana do `single-parents` i `opinie` (choc Faza 4 ja wprowadzila dla legal pages).

To nie jest blad budowania, ale SEO risk.

---

### Drobnostki

**[nit-1] Wcieciecia `<Container>` w stronach `kontakt` i `opinie` — nieporownanego wcieciecia**

Pliki: `src/app/kontakt/page.tsx` (linia 26), `src/app/opinie/page.tsx` (linia 26)

Po dodaniu wrapperow `<>` i `<StructuredData>`, `<Container>` stracil wciecia wzgledem `<SectionWrapper>`:
```tsx
// Aktualne (zle):
<SectionWrapper>
<Container>  // brakuje dwoch spacji

// Powinno byc:
<SectionWrapper>
  <Container>
```

Nie wplywa na funkcjonalnosc, ale narusza spojnosc formatowania w calym projekcie.

---

**[nit-2] `newsletter.ts` — brak minimalnej dlugosci emaila i komunikat bledu nie jest przyjazny**

Plik: `src/lib/validations/newsletter.ts`, linia 4-6

```typescript
email: z.string().email("Podaj prawidłowy adres e-mail"),
```

Porownanie z `contact.ts`: tam jest `z.string().email(...)` bez minLength — tu tak samo. Drobna niespojnosc z Zod 4 best practices (`.min(1)` zanim `.email()`), ale w praktyce `.email()` odrzuci pusty string.

---

**[nit-3] `false as unknown as true` — komentarz wyjasnajacy bylby pomocny**

Pliki: `src/components/shared/NewsletterForm.tsx` linia 26

```typescript
consentRodo: false as unknown as true,
```

Ten wzorzec jest ustalony w projekcie (faza 3 lesson learned) i pojawia sie w trzech miejscach. Warto miec krotki komentarz dlaczego:
```typescript
consentRodo: false as unknown as true, // RHF type: output jest `true`, ale defaultValue to false
```

---

**[nit-4] Brak `lastModified` w sitemap — mniejsza uzytkownsc dla crawlerow**

Plik: `src/app/sitemap.ts`

`MetadataRoute.Sitemap` wspiera pole `lastModified`. Bez niego Google nie wie kiedy zasoby sie zmienily. Dla stron statycznych mozna ustawic date deployu lub stala date.

```typescript
{ url: baseUrl, changeFrequency: "weekly", priority: 1, lastModified: new Date() },
```

Drobne, nie krytyczne.

---

### Sugestie

**[suggestion-1] CSP: brak `object-src 'none'` i `base-uri 'self'`**

Plik: `next.config.ts`

Aktualny CSP nie zawiera:
- `object-src 'none'` — blokuje stary Flash/plugin content (dobra praktyka)
- `base-uri 'self'` — zapobiega atakom base tag injection

Odwolanie: OWASP CSP Cheat Sheet. Te dyrektywy sa niskokosztowe i zwieksza bezpieczenstwo:
```typescript
"object-src 'none'",
"base-uri 'self'",
```

---

**[suggestion-2] `StructuredData` — ochrona przed JSON injection przez `</script>` w danych**

Plik: `src/components/shared/StructuredData.tsx`, linia 11

```typescript
dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
```

Dane JSON-LD pochodza z hardcoded `src/data/trips.ts` i `constants.ts` — wiec XSS ryzyko jest minimalne w MVP. Jednak jesli tresc kiedys pochodzi z zewnetrznych zrodel (CMS), JSON moze zawierac sekwencje `</script>` ktora zamknie tag skryptu.

Bezpieczna praktyka:
```typescript
// Zamien </script> na \u003C/script\u003E
const safe = JSON.stringify(data).replace(/<\/script>/gi, "\\u003C/script\\u003E");
dangerouslySetInnerHTML={{ __html: safe }}
```

Priorytet: niski dla MVP z hardcoded danymi, ale dobra praktyka defensywna.

---

**[suggestion-3] `GoogleAnalytics` — wyciek danych po revoke zgody przez usuwanie cookies z hostname**

Plik: `src/components/shared/GoogleAnalytics.tsx`, linia 33

```typescript
document.cookie = `${name}=; expires=...; path=/; domain=${window.location.hostname}`;
```

GA ustawia cookies na `domain=.wyjazdyzdziecmi.pl` (z kropka), a usuwanie przez `hostname` (bez kropki) moze nie usunac cookies ustawionych na subdomenach. Poprawka:

```typescript
// Probuj usunac z domena i bez
const domain = window.location.hostname;
const rootDomain = domain.startsWith("www.") ? domain.slice(4) : domain;
document.cookie = `${name}=; expires=...; path=/; domain=.${rootDomain}`;
document.cookie = `${name}=; expires=...; path=/`;
```

Priorytet: wazny dla zgodnosci RODO, ale istniejacy kod takze probuje bez domeny (linia 34), wiec czescioworadzacy.

---

**[suggestion-4] `SectionHeading as` prop nie jest uzywany na istniejacych podstronach**

Pliki: `src/app/o-nas/page.tsx` (linia 36), `src/app/kontakt/page.tsx` (linia 28), `src/app/opinie/page.tsx` (linia 33)

Dodano `as` prop do `SectionHeading`, ale istniejace podstrony nadal uzywaja inline `<h1>` zamiast `<SectionHeading as="h1">`. To jest spojne z aktualna architektura — strony maja rozne layouty naglowkow. Nie jest to blad, ale warto rozwazyc refaktor dla spojnosci.

---

**[suggestion-5] `useCookieConsent` — `subscribe` funkcja zamknieta nad `window` nie dziala na SSR**

Plik: `src/hooks/useCookieConsent.ts`, linia 26-35

```typescript
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  // ...
}
```

`subscribe` jest funkcja modulu (nie wewnatrz hooka), i zawiera `window.addEventListener`. Jesli Next.js kiedys wywola ta funkcje na SSR (w teorii nie powinien z `useSyncExternalStore` — drugi argument `getServerSnapshot` zapobiega), spowoduje to blad. Aktualnie to dziala, ale jest fragile. Wzorzec `useSyncExternalStore` jest prawidlowy dla tej sytuacji.

---

## Dobre praktyki

**useSyncExternalStore dla localStorage** — poprawne i nowoczesne podejscie (vs useState + useEffect), respektuje React 19 lint rules. Cross-tab sync przez `storage` event to solidna praktyka.

**Logger z `NODE_ENV` guard** — `src/lib/logger.ts` jest czysty, prosty i poprawnie zaaplikowany do wszystkich 3 API routes (booking, contact, newsletter).

**Fake 200 dla honeypota** — konsekwentnie we wszystkich 3 route'ach. Zgodne z wzorcem projektu.

**GA4 warunkowe ladowanie** — `GoogleAnalytics` prawidlowo sprawdza `isLoaded && hasAnalyticsConsent` zanim zaladuje skrypt. Cookie cleanup przy revoke jest dobra proba (patrz suggestion-3 na ulepszona wersje).

**SectionHeading `as` prop** — eleganckie rozwiazanie z `as: Tag = "h2"` wzorcem. Nie psuje istniejacych callsitow dzieki defaultowi.

**`CookieBanner` nie uzywa komponentu `Button`** — zgodnie z wymaganiem planu ("NIE uzywac Button komponentu — warianty roznej wagi"), uzywa raw `<button>` elementow.

**3 przyciski rownej wagi wizualnej** — `buttonClass` bazowy jest identyczny dla wszystkich 3 przyciskow. "Zaakceptuj wszystkie" ma `bg-moss text-white` (wypelniony), pozostale dwa `bg-white text-moss` (outline). Technicznie to nie jest rowna waga — jeden jest primary (solid), dwa sa secondary (outline). RODO wymaga rownowaznoci wyboru — "Zaakceptuj wszystkie" wyrozniajac sie kolorem moze byc kwestionowane przez regulatora. Warto skonsultowac z klientem.

**Structured data pokrycie** — Organization (layout), Event + FAQ + Breadcrumb (trip page), Breadcrumb (5 podstron). Dobre pokrycie.

**Sitemap + robots.ts** — prawidlowe uzycie `MetadataRoute` API Next.js. Disallow `/api/` jest kluczowe.

**`not-found.tsx`** — prosta, funkcjonalna, dostepna strona 404 z `<h1>` i powrotem na glowna.

**`manifest.ts`** — poprawne kolory z design systemu (`#F9F7F2`, `#2D4635`).

**aria-label na `target="_blank"` linkach** — Facebook i Instagram w Footer maja prawidlowe `aria-label="X (otwiera sie w nowej karcie)"`. Zgodne z Phase 4 lessons learned.

**Breadcrumby na wszystkich publicznych podstronach** — o-nas, wyjazdy, wyjazdy/[slug], kontakt, opinie, single-parents. Kompletne pokrycie.

---

## Statystyki

| Kategoria | Liczba |
|-----------|--------|
| Blokujace (blocking) | 3 |
| Wazne (important) | 5 |
| Drobnostki (nit) | 4 |
| Sugestie (suggestion) | 5 |
| Dobre praktyki | 11 |

| Nowe pliki | 15 |
| Zmodyfikowane pliki | 13 |
| Zadania zrealizowane | 29/31 (93%) |

---

## Priorytety dzialania

### Przed produkcja — wymagane:
1. **[blocking-1]** Naprawic `isLoaded` w `useCookieConsent` — dodac `useState(false)` + `useEffect(() => setHasMounted(true), [])`
2. **[blocking-2]** Stworzyc lub usunac referencje do `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
3. **[blocking-3]** Zmienic `EventCancelled` na `EventScheduled` dla `isPast === true`
4. **[important-3]** Dodac focus management po otwarciu panelu cookie (uzyc `panelRef` ktory juz istnieje)
5. **[important-4]** Naprawic Escape nie zamykajace bannera gdy `openedFromFooter === true` i `showPanel === false`

### Po produkcji — zalecane:
6. **[important-1]** Zmienic template literals na `cn()` w CookieBanner
7. **[important-2]** Usunac `panelRef` lub faktycznie go uzyc (po naprawie [important-3] bedzie uzywany)
8. **[suggestion-3]** Poprawic usuwanie GA cookies dla subdomen
9. **[suggestion-1]** Dodac `object-src 'none'` i `base-uri 'self'` do CSP
