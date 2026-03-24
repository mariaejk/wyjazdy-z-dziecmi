# Ogólny Code Review — System Dostarczania Danych z Formularzy

Last Updated: 2026-03-24

Reviewer: Claude Code (system-level review, fazy 1–5 razem)
Branch: `feature/form-delivery-system`

---

## Executive Summary

System jest dobrze zaprojektowany jako całość. Architektura jest spójna, pipeline bezpieczeństwa jest kompletny (CSRF → rate limit → honeypot → Turnstile → Zod), a graceful degradation działa poprawnie dla wszystkich zewnętrznych serwisów. Typowanie TypeScript jest solidne — zrezygnowanie z `forms.ts` na rzecz `z.infer<typeof schema>` jest właściwą decyzją. Cztery formularze są zaimplementowane spójnie i zgodnie z ustalonymi wzorcami projektu.

Znaleziono **2 problemy blokujące** (oba dotyczą bezpieczeństwa produkcyjnego), **4 istotne usprawnienia** oraz kilka drobiazgów. System jest bliski gotowości do merge, ale wymaga rozwiązania blokerów przed deploy na produkcję.

---

## 🔴 Blocking — Must Fix Before Merge

### B1. `email.ts` — podwójna inicjalizacja klienta Resend przy każdym żądaniu

Funkcja `sendEmail()` wywołuje `getResendClient()` po tym, jak już sprawdziła `process.env.RESEND_API_KEY`. W środku `getResendClient()` klucz jest sprawdzany ponownie i rzucany jest wyjątek — ale ten wyjątek **nie jest wychwytywany** w `sendEmail()`. W połączeniu z logiką w `sendEmail()` (linia 22–25 sprawdza klucz i wychodzi cicho, ale linia 28 ponownie wywołuje `getResendClient()` który rzuca) — jeśli ktoś zmodyfikuje ten kod, łatwo stworzyć sytuację, gdzie wyjątek wycieka poza `try/catch` w routach (które wołają `sendNotificationEmail`/`sendConfirmationEmail`, nie `sendEmail` bezpośrednio).

Aktualnie jest to zamaskowane przez `Promise.allSettled` w routach — błąd jest pochłaniany. Jednak oznacza to, że **brak klucza Resend na Vercel = ciche niepowodzenie emaili BEZ żadnego logu w produkcji** (bo `log()` jest wyłączony w production). Właściciel nie dowie się, że emaile nie dochodzą.

Konkretny problem: `console.error("[Email] Notification failed:", error)` — `console.error` działa w produkcji (inaczej niż `log()`), więc ta ścieżka jest w porządku. Ale skoro `sendEmail()` sprawdza klucz i wychodzi cicho (`return;` bez `throw`), wywołanie `getResendClient()` po tej samej sprawdzeniu jest martwym kodem który nigdy nie rzuca. Architektonicznie — dwie funkcje owijające tę samą logikę `getResendClient()` i sprawdzania klucza tworzą mylącą redundancję.

**Fix:** Usuń `getResendClient()` jako osobną funkcję. W `sendEmail()` bezpośrednio: `const resend = new Resend(process.env.RESEND_API_KEY!);` (po już istniejącym early return gdy brak klucza). Jedna prosta ścieżka, zero redundancji.

---

### B2. Analytics `bookingSubmit()` wywoływany po sukcesie — potencjalny False Positive

W `BookingForm.tsx` (linia 106): `analytics.bookingSubmit(data.trip)` jest wywoływany po tym, jak `response.ok === true`, ale **przed sprawdzeniem** czy Sheets i emaile faktycznie się powiodły. Z perspektywy backendu `{ success: true }` jest zwracany nawet jeśli Sheets i oba emaile zawiodły (wszystkie w `Promise.allSettled`).

Analitycznie — event `booking_submit` jest śledzony jako konwersja, ale system może ją zaraportować nawet gdy operator nie dostał żadnego powiadomienia o rezerwacji. Dla landing page'a sprzedażowego to poważny problem — metryki konwersji mogą wyglądać świetnie, a faktycznie żadne leady nie dotarły do Marii.

Nie jest to bug w kodzie frontendowym (zachowuje się poprawnie), tylko problem w **semantyce odpowiedzi API**. Backend zwraca `{ success: true }` niezależnie od wyniku dostarczenia.

**Fix opcja A (rekomendowana):** Backend niech sprawdzi wyniki `Promise.allSettled` i gdy WSZYSTKIE deliveries zawiodły (sheets + oba emaile), zwróci `{ success: true, warning: "delivery_failed" }`. Frontend może zalogować ostrzeżenie ale i tak pokazać sukces użytkownikowi (graceful degradation w UI). Alternatywnie, wymaga żeby Sheets LUB przynajmniej powiadomienie do właściciela powiodło się — w przeciwnym wypadku 503.

**Fix opcja B (minimum):** Dodaj do backendu `console.error` kiedy wszystkie delivery zawiodły — przynajmniej będzie widoczne w logach Vercel.

---

## 🟠 Important — Should Fix

### I1. Rate limiter jest per-route, nie per-IP globalnie

Każdy route (`/api/booking`, `/api/contact`, `/api/newsletter`, `/api/waitlist`) importuje ten sam moduł `rate-limit.ts`, ale na Vercel każda funkcja serverless ma **osobną instancję** modułu w pamięci. Oznacza to, że `requestMap` NIE jest współdzielony między routami.

Bot może wysłać 5 requestów na `/api/booking` + 5 na `/api/newsletter` + 5 na `/api/contact` = 15 requesty z jednego IP bez trafienia w limit.

Ponadto na Vercel ten sam route może być obsługiwany przez wiele instancji serverless równolegle — rate limiter in-memory nie działa poprawnie w środowisku serverless z wieloma instancjami.

**Fix krótkoterminowy:** Dodać komentarz w `rate-limit.ts` wyraźnie dokumentujący ograniczenie ("per-route, per-instance — not shared across Vercel functions"). Turnstile kompensuje to ograniczenie dla bot traffic.

**Fix długoterminowy (post-launch):** Upstash Redis lub Vercel KV dla shared rate limiting.

---

### I2. `trip` field w BookingSchema przyjmuje dowolny string — brak walidacji na liście wyjazdów

`bookingSchema` i `waitlistSchema` walidują `trip` jako `z.string().min(1)`, ale nie sprawdzają czy wartość jest faktycznie istniejącym slugiem wyjazdu. Możliwe jest wysłanie `{ trip: "jakiś-spam" }` i trafi to do Google Sheets jako "Wyjazd: jakiś-spam".

W trips.ts istnieje lista wyjazdów z których można pobrać slugi. Jednak ta lista jest dostępna tylko server-side, a schemat jest współdzielony frontend/backend.

**Fix:** W route.ts (server-only), po Zod validation, dodać dodatkowe sprawdzenie:
```typescript
const allTrips = await getAllTrips();
const validSlugs = allTrips.map(t => t.slug);
if (!validSlugs.includes(data.trip)) {
  return NextResponse.json({ error: "Wybrany wyjazd nie istnieje." }, { status: 400 });
}
```
Alternatywnie: skoro formularz wysyła slug a nie tytuł, w BookingNotification/WaitlistNotification wyświetlany jest slug zamiast przyjaznego tytułu — co wygląda nieprofesjonalnie w emailu do właściciela. Warto rozważyć przekazywanie tytułu z frontendu (który i tak go ma przez `trips` prop).

---

### I3. Brak `aria-label` na niewidocznym Turnstile widget

We wszystkich 4 formularzach Turnstile jest renderowany jako `size: "invisible"`, ale bez żadnego `aria-label` ani wrapping elementu z opisem. Chociaż widget jest niewidoczny, `@marsidev/react-turnstile` renderuje iframe — screen readery mogą go napotykać bez kontekstu.

**Fix:** Dodać `className="sr-only"` na kontenerze lub przekazać `aria-label` przez API widgetu (sprawdzić czy `@marsidev/react-turnstile` to obsługuje).

---

### I4. `WaitlistForm` nie ma Checkbox dla RODO z linkiem, ale WaitlistForm przesyła `consentRodo`

W `WaitlistForm.tsx` Checkbox RODO jest zaimplementowany prawidłowo (linie 165–183). Jednak — inaczej niż BookingForm i ContactForm — w `WaitlistForm` RODO checkbox jest PRZED error message blokiem (linia 185–190), co jest niespójnym układem UX w porównaniu z resztą formularzy (gdzie błąd jest zawsze pod wszystkimi polami, nad przyciskiem submit).

Więcej istotne: w `WaitlistForm` brakuje pola `consentMarketing`. Użytkownicy z listy oczekujących to gorące leady — warto zapytać o zgodę marketingową tak jak w BookingForm.

**Fix:** Przenieść error message block za Checkbox RODO (spójność z innymi formularzami). Rozważyć dodanie opcjonalnego `consentMarketing` do waitlist schema i formularza.

---

## 🟡 Minor / Nit

### N1. `false as unknown as true` — workaround widoczny w 4 miejscach

Wszystkie 4 formularze używają `consentRodo: false as unknown as true` w `defaultValues`. Jest to znany Zod 4 + RHF workaround (udokumentowany w CLAUDE.md). Jednak warto dodać jeden komentarz wyjaśniający dlaczego — `// RHF defaultValues must be false (unchecked), but Zod literal(true) types it as true — server validates actual value` — zamiast żadnego komentarza (w 3 formularzach) lub zbyt lakonicznego komentarza (w 1 formularzu). WaitlistForm ma komentarz, pozostałe nie.

---

### N2. `timestamp` jest tworzony dwukrotnie — w route.ts i w `getTimestamp()` w sheets.ts

W każdym route.ts tworzony jest `timestamp` dla emaili (np. `const timestamp = new Date().toLocaleString(...)`), a `getTimestamp()` w `sheets.ts` tworzy osobny timestamp dla Google Sheets. Te dwa timestampy mogą się różnić o milisekundy/sekundy jeśli Sheets lub email jest wolny.

**Fix:** Przekazać timestamp do `appendBooking()` jako parametr zamiast generować go wewnątrz. Jeden timestamp na request = spójne logi.

---

### N3. `NewsletterConfirmation` obiecuje wysłanie PDF którego nie ma

W `NewsletterConfirmation.tsx` (linia 31–32): email obiecuje "Poradnik PDF... wyślemy wkrótce". Jednak PDF nie istnieje w repozytorium (`public/`) ani nie jest linkowany. Użytkownik dostanie email, będzie czekał na PDF który nigdy nie przyjdzie.

Jest to issue z contentem, nie z kodem — ale email jest sercem UX po signup. Należy albo: (a) dodać link do istniejącego PDF, lub (b) zmienić copy na bardziej ogólne "Wyślemy Ci nasze nowości i informacje o warsztatach."

---

### N4. `email.ts` — FROM_EMAIL fallback `onboarding@resend.dev` może trafić do spamu

Fallback `process.env.FROM_EMAIL || "Wyjazdy z Dziećmi <onboarding@resend.dev>"` jest dobry do developmentu, ale jeśli `FROM_EMAIL` nie jest ustawione na Vercel, emaile potwierdzające do klientów wyjdą od `onboarding@resend.dev` — co wygląda nieprofesjonalnie i może trafić do spamu.

**Fix:** W `docs/setup-external-services.md` i `.env.example` dodać wyraźne ostrzeżenie: "Bez FROM_EMAIL = emaile do klientów są wysyłane z onboarding@resend.dev — ustaw PRZED uruchomieniem produkcji."

---

### N5. `tsconfig.json` — `"exclude": ["docs"]` wyklucza folder z `.md` plikami, ale nie `.ts`/`.tsx`

To jest właściwe zachowanie, ale warto sprawdzić czy `docs/setup-external-services.md` nie zawiera żadnych `.ts` snippetów które TypeScript mógłby próbować skompilować. Aktualnie nie zawiera — więc to tylko nota dla przyszłości.

---

## 🔵 Architecture Considerations

### A1. Brak Vercel Preview branch w `ALLOWED_ORIGINS`

`ALLOWED_ORIGINS` w `constants.ts` zawiera produkcję i localhost. Vercel Preview deployments mają adresy w stylu `https://langing-page-xyz.vercel.app` — żądania z tych adresów będą odrzucane przez CSRF check (403).

Oznacza to że **Vercel Preview deployments nie mogą testować formularzy** — użytkownik testujący na Preview dostanie "Forbidden".

**Fix:** Albo wyłączyć CSRF check dla Origin null/undefined (żądania bez Origin — np. z curl), albo dodać do env variable: `NEXT_PUBLIC_VERCEL_URL` jest automatycznie ustawiane przez Vercel — można go użyć dynamicznie:
```typescript
...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
```

---

### A2. Google Sheets access token jest pobierany przy każdym żądaniu

`getAuth()` i `auth.getClient()` / `client.getAccessToken()` są wywoływane przy każdym `appendToSheet()`. Google OAuth access tokens mają ważność 1h — nie ma sensu pobierać nowego tokenu przy każdym żądaniu w Vercel serverless.

Na Vercel serverless każda instancja funkcji startuje od zera (cold start) — więc caching tokenu między requestami i tak nie zadziała. To jest nienaprawialne bez Redis/external cache. **Pozostawić as-is**, ale warto dodać komentarz w `sheets.ts`: "Token jest pobierany per-request — caching niemożliwy w Vercel serverless bez external store."

---

### A3. Brak Content-Type validation na input w API routes

Wszystkie routes próbują `request.json()` bez sprawdzenia `Content-Type: application/json`. Złośliwy request z `Content-Type: text/plain` ale JSON body zadziała — Next.js i tak sparsuje JSON. To nie jest security issue (Zod waliduje dane), ale warto być defensywnym:
```typescript
const contentType = request.headers.get("content-type");
if (!contentType?.includes("application/json")) {
  return NextResponse.json({ error: "Nieprawidłowy format." }, { status: 415 });
}
```

---

### A4. System nie obsługuje duplikatów newsletter subskrypcji

Jeśli ten sam email wyśle formularz newslettera dwukrotnie, zostanie zapisany dwa razy w Google Sheets z statusem "Aktywny". Google Sheets nie ma deduplikacji. Przy małej skali (landing page) to jest akceptowalne, ale warto to udokumentować w `setup-external-services.md`.

---

## Production Readiness Checklist

| Element | Status | Uwaga |
|---------|--------|-------|
| CSRF Origin check | GOTOWE | Brak Preview URLs — patrz A1 |
| Rate limiting | GOTOWE | Per-route only — patrz I1 |
| Honeypot | GOTOWE | Poprawna fake-200 odpowiedź |
| Turnstile | GOTOWE | Poprawna graceful degradation |
| Zod validation | GOTOWE | Client + server |
| Google Sheets | GOTOWE | Graceful degradation gdy brak kluczy |
| Email notifications | GOTOWE | Graceful degradation |
| RODO compliance | GOTOWE | Klauzule w stopkach emaili |
| GA4 tracking | GOTOWE | bookingSubmit, contactSubmit, etc. |
| Graceful degradation | GOTOWE | Promise.allSettled wszędzie |
| TypeScript strict | GOTOWE | Zod infer, bez forms.ts |
| Email templates | GOTOWE | 7 templatek, PL język |
| Dokumentacja setup | GOTOWE | docs/setup-external-services.md |
| PDF w newsletterze | BRAKUJE | Patrz N3 |
| Vercel Preview URLs | BRAKUJE | Patrz A1 |
| Delivery failure detection | BRAKUJE | Patrz B2 |

---

## Next Steps

**Przed merge (blocking):**
1. Naprawić redundancję w `email.ts` — usuń `getResendClient()` (B1)
2. Dodać logging/detection gdy wszystkie deliveries zawiodą (B2)

**Przed deploy na produkcję (important):**
3. Dodać Vercel Preview URL do ALLOWED_ORIGINS (A1)
4. Rozważyć walidację `trip` slug na serwerze (I2)
5. Rozwiązać kwestię PDF w newsletterze (N3)

**Post-launch (nice to have):**
6. Shared rate limiting z Upstash Redis (I1)
7. `consentMarketing` w WaitlistForm (I4)
8. Przekazanie `timestamp` jako parametru do sheets.ts (N2)

---

Code review saved to: `./dev/active/form-delivery-system/review-final.md`
