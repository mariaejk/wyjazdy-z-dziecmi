# Faza 3: Podstrona wyjazdu + formularz — Zadania

> **Branch:** `feature/faza3-podstrona-wyjazdu`
> **Ostatnia aktualizacja:** 2026-02-26
> **Postep:** 0/29

---

## Etap 3A: Komponenty sekcji wyjazdu (7 zadań)

- [ ] **3A.1** TripHero — full-width image, overlay z tytułem, datą, lokalizacją, badge
  - Plik: `src/components/trips/TripHero.tsx`
  - Server Component
  - Props: `title`, `subtitle`, `date`, `dateEnd`, `location`, `image`, `isPast`
  - next/image z `priority`, `sizes="100vw"`, overlay gradient
  - Badge "Zakończony" jeśli isPast
  - Kryteria: renderuje poprawnie z danymi "Matka i Córka"

- [ ] **3A.2** TripTargetAudience — "Dla kogo jest ten wyjazd?"
  - Plik: `src/components/trips/TripTargetAudience.tsx`
  - Server Component wewnątrz ScrollAnimation
  - Props: `items: TripTargetAudience[]`
  - Ikony Lucide (Heart, Star, Sparkles, Users) per item
  - Kryteria: 4 punkty z ikonami, responsive grid

- [ ] **3A.3** TripDescription — short + long description z expand
  - Plik: `src/components/trips/TripDescription.tsx`
  - Wymaga Accordion lub prosty expand/collapse
  - shortDescription zawsze widoczny
  - longDescription w expand (split by \n\n → <p>)
  - Kryteria: tekst czytelny, expand/collapse działa

- [ ] **3A.4** Accordion — reużywalny UI komponent
  - Plik: `src/components/ui/Accordion.tsx`
  - `"use client"` — motion/react AnimatePresence
  - Props: `items: { id: string; title: string; content: ReactNode }[]`, `allowMultiple?: boolean`, `defaultOpen?: string[]`
  - ARIA: aria-expanded, aria-controls, role
  - Reduced-motion: instant toggle (bez animacji)
  - Kryteria: a11y poprawne, animacja smooth, reduced-motion fallback

- [ ] **3A.5** TripProgram — timeline dzień po dniu
  - Plik: `src/components/trips/TripProgram.tsx`
  - Server Component
  - Props: `schedule: TripScheduleDay[]`
  - Design: karty per dzień, lista godzin + aktywności
  - Staggered animation via ScrollAnimation
  - Kryteria: 3 dni renderują się z poprawnym formatem

- [ ] **3A.6** TripPracticalInfo — ikony z informacjami
  - Plik: `src/components/trips/TripPracticalInfo.tsx`
  - Server Component
  - Props: `practicalInfo: { accommodation: string; food: string; transport?: string }`
  - Ikony Lucide: Home (zakwaterowanie), UtensilsCrossed (wyżywienie), Car (dojazd)
  - Kryteria: 2-3 pozycje z ikonami, responsive

- [ ] **3A.7** TripPricing — tabela cen
  - Plik: `src/components/trips/TripPricing.tsx`
  - Server Component
  - Props: `pricing: TripPricing[]`, `deposit: number`
  - formatCurrency() na kwotach
  - Wyróżniona informacja o zaliczce
  - CTA "Zapisz się" scroll do formularza
  - Kryteria: tabela/karty cen, zaliczka widoczna, CTA działa

---

## Etap 3B: Collaborator, FAQ, Gallery, placeholder handling (4 zadania)

- [ ] **3B.1** TripCollaborator — bio prowadzącego
  - Plik: `src/components/trips/TripCollaborator.tsx`
  - Server Component
  - Props: `collaborator: TripCollaborator`
  - Layout: opcjonalny obraz + tekst bio
  - Fallback: "Wkrótce" jeśli collaborator.name === "Wkrótce"
  - Kryteria: Ilona bio renderuje się czytelnie

- [ ] **3B.2** TripFAQ — lista pytań w accordion
  - Plik: `src/components/trips/TripFAQ.tsx`
  - Client Component (zawiera Accordion)
  - Props: `faq: TripFAQ[]`
  - Map FAQ → Accordion items
  - Kryteria: 5 pytań otwieranych/zamykanych, a11y OK

- [ ] **3B.3** TripGallery — siatka zdjęć
  - Plik: `src/components/trips/TripGallery.tsx`
  - Server Component
  - Props: `gallery: TripGalleryImage[]`
  - Główne zdjęcie (isMain) większe, reszta mniejsza
  - next/image z `sizes`, lazy loading
  - Responsive: 1 col mobile, 2-3 col desktop
  - Kryteria: zdjęcia wyświetlają się, responsive layout

- [ ] **3B.4** Placeholder handling — graceful fallback na "Yoga i Konie"
  - W [slug]/page.tsx: warunki renderowania sekcji
  - Brak schedule → ukryj TripProgram
  - Brak pricing → ukryj TripPricing
  - Brak FAQ → ukryj TripFAQ
  - Collaborator "Wkrótce" → skrócona sekcja
  - Kryteria: /wyjazdy/yoga-i-konie nie ma pustych sekcji

---

## Etap 3C: Form UI primitives (5 zadań)

- [ ] **3C.1** Input — text/email/tel/number z label i error
  - Plik: `src/components/ui/Input.tsx`
  - `forwardRef` (dla RHF register)
  - Props: `label`, `error`, `helperText`, `type`, + natywne HTML attrs
  - Stany: default, focus (border-moss), error (border-red-500, tekst błędu)
  - Kryteria: kompatybilne z `{...register("name")}`, wyświetla błędy

- [ ] **3C.2** Textarea — z label i error
  - Plik: `src/components/ui/Textarea.tsx`
  - `forwardRef`
  - Props: `label`, `error`, `rows`, + natywne attrs
  - Kryteria: resize-y, kompatybilne z RHF

- [ ] **3C.3** Select — dropdown z opcjami
  - Plik: `src/components/ui/Select.tsx`
  - `forwardRef`
  - Props: `label`, `error`, `options: { value: string; label: string }[]`, `placeholder`
  - Kryteria: natywny select, kompatybilny z RHF

- [ ] **3C.4** Checkbox — z label i error
  - Plik: `src/components/ui/Checkbox.tsx`
  - `forwardRef`
  - Props: `label` (ReactNode — może zawierać link RODO), `error`
  - Styling: custom checkmark z moss color
  - Kryteria: klikalne label, link w label nie triggeruje checkbox

- [ ] **3C.5** HoneypotField — ukryte pole antyspamowe
  - Plik: `src/components/ui/HoneypotField.tsx`
  - Props: `register` (RHF register function)
  - Ukryte: `className="sr-only"`, `tabIndex={-1}`, `aria-hidden="true"`, `autoComplete="off"`
  - Kryteria: niewidoczne wizualnie i w screen readerze

---

## Etap 3D: BookingForm + API route (4 zadania)

- [ ] **3D.1** Zod schema — bookingFormSchema
  - Plik: `src/lib/validations/booking.ts`
  - Zod 4.3: name (min 2), email (email), phone (regex PL), trip (min 1), adults (min 1), children (min 0), childrenAges (warunkowe), notes (optional), consentRodo (true required), consentMarketing (optional boolean), website (string — honeypot)
  - Export: schema + inferred type
  - Kryteria: walidacja działa dla happy path i edge cases

- [ ] **3D.2** BookingForm — kompletny formularz zapisu
  - Plik: `src/components/trips/BookingForm.tsx`
  - `"use client"`
  - useForm + zodResolver
  - Props: `trips: { slug: string; title: string }[]` (do dropdown), `defaultTrip?: string`
  - Pola wg plan.md: imię, email, tel, wyjazd, dorośli, dzieci, wiek dzieci, uwagi, RODO, marketing, honeypot
  - Stany: idle → submitting (disabled, Loader2 spinner) → success → error
  - fetch POST do /api/booking
  - Microcopy: "Twoje zgłoszenie zostanie przesłane do organizatora. Skontaktujemy się z Tobą w ciągu 24h."
  - Kryteria: formularz wysyła poprawnie, walidacja client-side, stany UI działają

- [ ] **3D.3** Rate limiting — sliding window
  - Plik: `src/lib/rate-limit.ts`
  - In-memory Map<string, number[]>
  - Config: 5 requests / 15 minutes per IP
  - Export: `checkRateLimit(ip: string): { success: boolean; remaining: number }`
  - Cleanup starych timestamps
  - Kryteria: 5 requestów OK, 6. → 429

- [ ] **3D.4** API route — POST /api/booking
  - Plik: `src/app/api/booking/route.ts`
  - Zod re-walidacja server-side
  - Honeypot check: jeśli `website` nie-puste → 200 OK (fake success)
  - Rate limiting: 429 Too Many Requests
  - Success: console.log dane + 200 JSON
  - Zakomentowany `BOOKING_WEBHOOK_URL` fetch na n8n
  - Headers: CORS, Content-Type
  - Kryteria: POST działa, honeypot cicho odrzuca, rate limit 429

---

## Etap 3E: Assembly stron (3 zadania)

- [ ] **3E.1** wyjazdy/[slug]/page.tsx — pełna podstrona wyjazdu
  - Plik: `src/app/wyjazdy/[slug]/page.tsx`
  - generateStaticParams() z getAllTrips()
  - generateMetadata() z getTripBySlug()
  - notFound() jeśli brak wyjazdu
  - 10 sekcji wg kolejności PRD: Hero → Dla kogo? → Opis → Program → Info → Cennik → Współpraca → FAQ → Galeria → Formularz
  - Warunki: ukryj puste sekcje (placeholder handling)
  - Kryteria: /wyjazdy/matka-i-corka pełna strona, /wyjazdy/yoga-i-konie graceful

- [ ] **3E.2** wyjazdy/page.tsx — lista wyjazdów
  - Plik: `src/app/wyjazdy/page.tsx`
  - generateMetadata()
  - Sekcja "Nadchodzące wyjazdy" (upcoming) + "Minione wyjazdy" (past, grayscale)
  - Reużycie TripCard z home/
  - Fallback: "Brak wyjazdów" jeśli pusta lista
  - Kryteria: 2 kafelki widoczne, linki prowadzą do podstron

- [ ] **3E.3** Aktualizacja HeroSection CTA — #wyjazdy → /wyjazdy
  - Plik: `src/components/home/HeroSection.tsx`
  - Zmiana href z `#wyjazdy` na `/wyjazdy`
  - Kryteria: CTA prowadzi do strony listy wyjazdów

---

## Etap 3F: Weryfikacja końcowa (6 zadań)

- [ ] **3F.1** npm run build — zero errors
- [ ] **3F.2** Test responsywności — 320px, 375px, 768px, 1024px, 1440px
- [ ] **3F.3** Test formularza — happy path + walidacja + honeypot + rate limiting
- [ ] **3F.4** Test reduced-motion — Accordion i ScrollAnimation fallbackują
- [ ] **3F.5** Test nawigacji — TripCard → podstrona, CTA scroll do formularza
- [ ] **3F.6** npm run lint — zero warnings
