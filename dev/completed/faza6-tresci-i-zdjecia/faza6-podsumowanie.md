# Faza 6: Tre\u015Bci i zdj\u0119cia od klientki \u2014 Podsumowanie

**Data uko\u0144czenia:** 2026-03-03
**Branch:** `feature/faza6-tresci-i-zdjecia`
**Zada\u0144:** 21 (6.1\u20136.21) + 4 poprawki z review (R1\u2013R4)

---

## Co zosta\u0142o dostarczone

### Etap A: Zdj\u0119cia i zasoby
- Zdj\u0119cia zespo\u0142u (`maria.jpg`, `kamila.jpg`) w `public/images/`
- `PersonBio.tsx` z `next/image` (fallback na ikon\u0119 `User`)

### Etap B: "O mnie" \u2014 bio i rename
- Nowe bio Marii w 1. osobie (z DOCX)
- Rename "O nas" \u2192 "O mnie" w nawigacji, metadata (URL bez zmian)
- Nowa hierarchia `/o-nas`: H1 \u2192 PersonBio \u2192 Misja (3 karty) \u2192 Wsp\u00F3\u0142pracownicy \u2192 Miejsca \u2192 CTA

### Etap C: Opinie
- Typ `Testimonial` + 4 opinie z DOCX w `src/data/testimonials.ts`
- `TestimonialCard.tsx` z semantycznym `<blockquote>`
- `/opinie` z prawdziwymi danymi, dodane do sitemap
- `OpinionsTeaser.tsx` z 2 featured opiniami

### Etap D: "Yoga i Konie" \u2014 pe\u0142na tre\u015B\u0107
- Pe\u0142na tre\u015B\u0107 z DOCX: opis, schedule 3-dniowy, targetAudience (4), FAQ (5), Kamila jako collaborator
- `role?: string` w typie `TripCollaborator` + wy\u015Bwietlanie w komponencie
- Pricing `[]` i deposit `0` (brak cen w DOCX)

### Etap E: Poprawki wizualne
- Logo 44px \u2192 56px w Header
- "Cennik" \u2192 "Twoja inwestycja"
- "Social" \u2192 "Znajd\u017A nas"

### Etap F: Lead magnet
- Newsletter promuje poradnik PDF "Jak przygotowa\u0107 dziecko do wyjazdu"
- Przycisk "Pobierz" zamiast "Zapisz"

### Etap G: Kontakt
- Mini avatar Marii (64px) z imieniem i rol\u0105 w ContactInfo
- Copy zmieniony na 1. osob\u0119

### Poprawki z code review (R1\u2013R4)
- R1: Unicode escapes w FAQ Yoga i Konie
- R2: Bio Kamili importowane z `team.ts` via `getTeamMember()` (single source of truth)
- R3: `sectionTitle` prop w TripCollaborator (domy\u015Blnie "Wsp\u00F3\u0142praca")
- R4: PersonBio Kamili na `/o-nas` z `variant="alternate"` (sp\u00F3jne t\u0142o)

---

## Kluczowe decyzje

1. **Import danych z team.ts do trips.ts** \u2014 bio Kamili jako collaborator pochodzi z `getTeamMember()`, nie jest duplikowane
2. **`sectionTitle` prop** \u2014 "Wsp\u00F3\u0142praca" jako neutralny default zamiast "Prowadz\u0105ca" (pasuje do obu wyjazd\u00F3w)
3. **Slug vs tytu\u0142** \u2014 `slug: "yoga-i-konie"` zachowany dla SEO/URL, tytu\u0142 zmieniony na "Joga i Konie \u2014 Harmonia Natury na Mazurach"
4. **Lead magnet w newsletter** \u2014 poradnik PDF jako warto\u015B\u0107 wymienna za email (konwersja)
5. **1. osoba w copy** \u2014 "O mnie", "Napisz do mnie", "ch\u0119tnie pomog\u0119" (sp\u00F3jno\u015B\u0107 z osobistym tonem marki)

---

## G\u0142\u00F3wne pliki utworzone/zmodyfikowane

### Nowe pliki
- `src/types/testimonial.ts`
- `src/data/testimonials.ts`
- `src/components/shared/TestimonialCard.tsx`

### Zmodyfikowane pliki
- `src/types/trip.ts` \u2014 `role?: string` w TripCollaborator
- `src/data/trips.ts` \u2014 pe\u0142na tre\u015B\u0107 "Yoga i Konie" + role + import z team.ts
- `src/data/team.ts` \u2014 nowe bio Marii, zdj\u0119cia obu cz\u0142onk\u00F3w
- `src/data/navigation.ts` \u2014 "O nas" \u2192 "O mnie"
- `src/components/trips/TripCollaborator.tsx` \u2014 `role` + `sectionTitle` prop
- `src/components/trips/TripPricing.tsx` \u2014 "Twoja inwestycja"
- `src/components/about/PersonBio.tsx` \u2014 `next/image` z fallback
- `src/components/home/AboutTeaser.tsx` \u2014 "O mnie" + 1. osoba
- `src/components/home/OpinionsTeaser.tsx` \u2014 2 featured opinie
- `src/components/shared/NewsletterForm.tsx` \u2014 lead magnet copy
- `src/components/contact/ContactInfo.tsx` \u2014 mini avatar Marii
- `src/components/layout/Header.tsx` \u2014 logo 56px
- `src/components/layout/Footer.tsx` \u2014 "Znajd\u017A nas"
- `src/app/o-nas/page.tsx` \u2014 nowa hierarchia + misja
- `src/app/opinie/page.tsx` \u2014 prawdziwe opinie
- `src/app/sitemap.ts` \u2014 dodano /opinie

---

## Wyci\u0105gni\u0119te wnioski (Lessons Learned)

1. **Unicode escapes konsekwentnie** \u2014 mieszanie literalnych polskich znak\u00F3w z unicode escapes w tym samym pliku jest \u0142atwe do przeoczenia. Lepiej u\u017Cywa\u0107 escapes wsz\u0119dzie w `.ts` i sprawdza\u0107 w review.
2. **Single Source of Truth dla bio** \u2014 duplikowanie bio osoby w `team.ts` i `trips.ts` prowadzi do rozjazdu. Import via helper eliminuje problem.
3. **Neutralne nazwy sekcji** \u2014 "Prowadz\u0105ca" zak\u0142ada\u0142o p\u0142e\u0107 i rol\u0119. "Wsp\u00F3\u0142praca" jest uniwersalne.
4. **SectionWrapper variant sp\u00F3jno\u015B\u0107** \u2014 gdy nag\u0142\u00F3wek sekcji i tre\u015B\u0107 s\u0105 w osobnych SectionWrapperach, musz\u0105 mie\u0107 ten sam variant, inaczej powstaje wizualny "skok" t\u0142a.
5. **Semantic HTML dla opinii** \u2014 `<blockquote>` + `<footer>` + `<cite>` to w\u0142a\u015Bciwy wzorzec dla cytat\u00F3w/testimoniali.
6. **Lead magnet > newsletter** \u2014 "Pobierz poradnik" ma wy\u017Csz\u0105 konwersj\u0119 ni\u017C "Zapisz si\u0119 na newsletter" (warto\u015B\u0107 wymienna).

---

## Pozosta\u0142e nity (R5\u2013R7, opcjonalne)

- R5: Ujednolicenie kodowania w NewsletterForm.tsx
- R6: Komentarz o slug vs tytu\u0142 w trips.ts
- R7: Przeniesienie `extractHandle` do utils.ts

Te mo\u017Cna wzi\u0105\u0107 w Fazie 7 lub zignorowa\u0107.
