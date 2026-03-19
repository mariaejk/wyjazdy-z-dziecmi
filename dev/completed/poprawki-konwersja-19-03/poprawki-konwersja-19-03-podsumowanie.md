# Podsumowanie: Poprawki konwersji i zaufania (audyt Gemini 19.03)

**Data ukończenia:** 2026-03-19
**Branch:** `feature/poprawki-konwersja-19-03`
**Commity:** `33ca759` (implementacja) + `f862192` (fix OG title)

---

## Co zostało dostarczone

### Faza 1 — Krytyczne (konwersja)
- **Emocjonalny H1:** "Zatrzymaj się. Odetchnij. Spotkaj swoje dziecko na nowo." (oba warianty hero)
- **Opieka nad dziećmi:** nowe pole `childCare` w CMS Keystatic + typ + mapper + UI z ikoną Baby
- **CTA korzyściowe:** "Sprawdź terminy" (Header/Menu), "Zarezerwuj miejsce" (Sticky/Form), "Zobacz wyjazdy" (Hero)
- **Pole dieta/alergie:** osobne `dietaryNeeds` w BookingForm + Zod schema + API log

### Faza 2 — UX i zaufanie
- **Ikona telefonu na mobile:** `lg:hidden` z `tel:` link + analytics.phoneClick()
- **Reassurance:** "Rezerwacja jest bezpłatna — nie płacisz z góry" z ikoną Shield nad przyciskiem
- **USP empatyczny:** "Ty się regenerujesz. Twoje dziecko się bawi..."
- **SEO meta tagi:** title 55 znaków, description emocjonalna 148 znaków, OG/Twitter spójne
- **Gwiazdki nad CTA:** social proof "Polecane przez rodziców" PRZED przyciskiem (oba warianty)

### Faza 3 — Analityka
- **FAQ click tracking:** `analytics.faqClick(question)` via Accordion `onToggle` callback
- **Social click tracking:** `analytics.socialClick(platform)` via wydzielony `SocialLink` client component

---

## Kluczowe decyzje

1. **Side effect poza setState** — `onToggle` w Accordion wywoływany po `setOpenId(newId)`, nie wewnątrz updater function (React 19 Strict Mode wywołuje setState updater 2x)
2. **SocialLink jako wąski Client Component** — Footer pozostaje Server Component, tylko `onClick` handler wymaga `"use client"`
3. **Platform jako display name** — `platform="Facebook"` w Footer, `platform.toLowerCase()` w analytics dla spójności GA4
4. **childCare placeholder identyczny** — wszystkie 4 wyjazdy mają ten sam tekst; klientka powinna dostosować w CMS
5. **OG/Twitter title = meta title** — wszystkie 3 spójne na 55 znaków

---

## Główne pliki utworzone/zmodyfikowane

### Nowe pliki
- `src/components/layout/SocialLink.tsx` — Client Component do social links z analytics

### Zmodyfikowane (kluczowe)
- `src/components/home/HeroSection.tsx` — H1, subtitle, CTA, gwiazdki nad CTA
- `src/components/trips/BookingForm.tsx` — dietaryNeeds, reassurance, CTA copy
- `src/components/layout/Header.tsx` — CTA copy, mobile phone icon
- `src/components/ui/Accordion.tsx` — onToggle callback, fix setState side effect
- `src/lib/analytics.ts` — faqClick(), socialClick()
- `src/lib/validations/booking.ts` — dietaryNeeds schema
- `src/app/layout.tsx` — SEO meta tagi
- `keystatic.config.ts` — pole childCare w CMS
- `content/trips/*.yaml` (4 pliki) — treść childCare

---

## Wyciągnięte wnioski (Lessons Learned)

1. **React 19 Strict Mode + setState updater = podwójny side effect** — NIGDY nie wywoływać side effects (analytics, API calls) wewnątrz funkcji przekazywanej do `setState(prev => ...)`. Updater function może być wywołana 2x w Strict Mode. Zawsze: `const newVal = ...; setState(newVal); sideEffect(newVal);`

2. **Równoległa implementacja w worktrees wymaga merge planu** — 3 fazy w osobnych worktrees przyspieszyły pracę, ale pliki modyfikowane przez >1 fazę (HeroSection, Header, BookingForm) wymagały ręcznego mergowania. Planować podział tak, żeby fazy nie dotykały tych samych plików.

3. **SEO title = OG title = Twitter title** — Gdy zmieniasz meta title, zawsze aktualizuj WSZYSTKIE 3 (default, OG, Twitter). Łatwo zapomnieć o OG/Twitter.

4. **`platform` jako display name, nie identyfikator** — W SocialLink lepiej przekazywać "Facebook" (wielka litera) jako `platform` i normalizować do lowercase w analytics. Unikamy podwójnej logiki kapitalizacji.

5. **Reassurance text nad CTA** — "Nie płacisz z góry" z ikoną Shield zmniejsza tarcie. Wzorzec: `<p className="flex items-center gap-2 text-sm text-graphite-light">` + ikona `text-moss` + tekst.
