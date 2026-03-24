# Code Review — Faza 3: Modyfikacja API routes + Zod schemas

**Last Updated: 2026-03-24**
**Reviewer:** Claude Code (Sonnet 4.6)
**Scope:** 4 API routes + 4 Zod schemas + 7 email templates (weryfikacja props)

---

## Executive Summary

Implementacja Fazy 3 jest solidna i w 95% zgodna z planem. Istniejące zabezpieczenia (CSRF, rate limit, honeypot) zostały nienaruszone. Kolejność operacji jest poprawna. `Promise.allSettled` użyty prawidłowo — zewnętrzne awarie nie blokują odpowiedzi do klienta. Turnstile poprawnie opcjonalny.

Znaleziono **2 problemy blokujące** (bezpieczeństwo + integralność danych), **3 ważne** i **5 drobnych**. Żaden nie powoduje błędu kompilacji ani crash, ale dwa wymagają poprawki przed wdrożeniem produkcyjnym.

---

## Krytyczne problemy (🔴 Blocking — must fix before deploy)

### 🔴 1. Pusty string w `turnstileToken` omija weryfikację

**Lokalizacja:** Wszystkie 4 routes (`booking`, `contact`, `newsletter`, `waitlist`), linia ~74.

**Problem:** Schemat Zod definiuje `turnstileToken: z.string().optional()`. Oznacza to, że `turnstileToken: ""` (pusty string) przejdzie walidację Zod i trafi do kodu. Warunek `if (data.turnstileToken)` jest `false` dla pustego stringa — weryfikacja jest pomijana. Frontend może wysłać pusty string zamiast tokenu i ominąć Turnstile.

**Dowód w `turnstile.ts`:** Sama funkcja `verifyTurnstile` ma guard `if (!token.trim()) return false`, ale nigdy nie jest wywołana gdy `turnstileToken === ""` — bo warunek `if (data.turnstileToken)` jest już `false`.

**Ryzyko:** Bot może wysłać `turnstileToken: ""` i ominąć weryfikację Cloudflare, zachowując tylko ochronę honeypot + rate limit.

**Poprawka — opcja A (w schemacie Zod, preferowana):**
```typescript
// Zamiast:
turnstileToken: z.string().optional(),

// Użyć:
turnstileToken: z.string().min(1).optional(),
```
Zod odrzuci pusty string na poziomie walidacji zanim kod trafi do `if (data.turnstileToken)`.

**Poprawka — opcja B (w route, defensywna):**
```typescript
// Zamiast:
if (data.turnstileToken) {

// Użyć:
if (data.turnstileToken?.trim()) {
```
To spójne z logiką w `turnstile.ts` i nie wymaga zmiany schematu.

Rekomendacja: zastosować **obie** poprawki — schemat + guard. Defense in depth.

---

### 🔴 2. `appendBooking` nie otrzymuje pola `consentRodo`

**Lokalizacja:** `booking/route.ts` linia 99–110, `sheets.ts` linia 64–91.

**Problem:** `appendBooking` w `sheets.ts` zapisuje w kolumnie "Zgoda RODO" zawsze `"Tak"` (hardcoded). Jednak nie przyjmuje pola `consentRodo` jako parametru — zakłada, że skoro dana osoba przeszła walidację Zod (która wymaga `consentRodo: true`), zgoda jest zawsze prawdziwa.

To jest **poprawne architektonicznie** — Zod schema ma `consentRodo: z.literal(true)`, więc jeśli dane przeszły walidację, `consentRodo` musi być `true`. Hardcoded `"Tak"` jest zatem logicznie bezpieczne.

**ALE:** `appendBooking` nie przekazuje `consentRodo` z `data` — co jest OK, bo to literal. Jednakże `appendWaitlist` i `appendContact` stosują ten sam wzorzec. Jeśli kiedyś zmieni się logika (np. `consentRodo` stanie się `z.boolean()`), hardcoded `"Tak"` stanie się błędem danych bez żadnego ostrzeżenia kompilatora.

**To nie jest blocking bug teraz**, ale promowane do 🔴 ze względu na ryzyko cichego błędu w przyszłości. Patrz sekcja "Ważne".

**Reklasyfikacja:** Obniżam do 🟠 — patrz poniżej.

---

## Ważne problemy (🟠 Important — should fix)

### 🟠 3. `Promise.allSettled` — brak logowania odrzuconych promises

**Lokalizacja:** Wszystkie 4 routes, sekcja `Promise.allSettled`.

**Problem:** Wynik `Promise.allSettled` jest ignorowany. Jeśli Sheets i oba emaile zawiodą jednocześnie (np. wszystkie klucze env są błędne), użytkownik dostanie `{ success: true }`, a żadne dane nie zostaną zapisane — bez żadnego śladu w logach Vercel poza `console.error` w helperach.

Helperzy (`appendBooking`, `sendNotificationEmail`, `sendConfirmationEmail`) mają własne try/catch z `console.error`, więc błędy będą logowane. Ale `Promise.allSettled` w routes jest nadmiarowo ślepe — nie wiadomo ile operacji faktycznie się udało.

**Poprawka:**
```typescript
const results = await Promise.allSettled([
  appendBooking({ ... }),
  sendNotificationEmail(...),
  sendConfirmationEmail(...),
]);

// Opcjonalnie — log w dev, żeby widzieć co się dzieje:
if (process.env.NODE_ENV === "development") {
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[Booking] Operation ${i} rejected:`, r.reason);
    }
  });
}
```

Helperzy już logują błędy wewnętrznie, więc to jest nice-to-have, nie blocking. Jednak `Promise.allSettled` jest zaprojektowany tak, żeby jego wynik był sprawdzany — ignorowanie go całkowicie jest anty-wzorcem.

---

### 🟠 4. `sendNotificationEmail` otrzymuje `data.email` jako `replyTo` — czy to zamierzone?

**Lokalizacja:** `booking/route.ts` linia 111–127, `contact/route.ts` linia 101–110, `waitlist/route.ts` linia 103–113.

**Problem:** Sygnatura `sendNotificationEmail` to `(subject, react, replyTo?)`. Wszystkie 3 routes przekazują `data.email` jako trzeci argument. To oznacza, że gdy Maria kliknie "Odpowiedz" w emailu o nowej rezerwacji, odpowiedź trafi do klienta — co jest **pożądanym zachowaniem**.

Ale sygnatura jest myląca: `replyTo` jest opcjonalne i wydaje się drugorzędne, a w praktyce jest kluczowe dla UX Marii. Nie ma tu błędu, ale warto sprawdzić czy intencja jest jasna.

**Weryfikacja w `email.ts`:** `replyTo` jest poprawnie przekazywane do Resend — OK.

**Sugestia:** Dodać komentarz w routes: `// replyTo = klient, żeby Maria mogła odpowiedzieć bezpośrednio`.

---

### 🟠 5. `bookingSchema` — brak `.optional()` na `childrenAges`, `notes`, `dietaryNeeds`

**Lokalizacja:** `src/lib/validations/booking.ts`, linia 29–37.

**Problem:** Pola `childrenAges`, `notes` i `dietaryNeeds` są zdefiniowane jako `z.string().max(...)` bez `.optional()`. Oznacza to, że Zod oczekuje tych pól w obiekcie. Jeśli frontend nie wyśle któregoś z nich (np. `childrenAges` gdy `children === 0`), walidacja się nie powiedzie.

W praktyce frontend pewnie zawsze wysyła `""` dla tych pól (i `defaultValues` w RHF inicjalizuje je jako `""`), więc może działać. Ale:
- Jest to niejawne założenie — schemat nie odzwierciedla intencji "pole opcjonalne"
- `appendBooking` w `sheets.ts` już obsługuje `childrenAges || ""`, co sugeruje, że te pola mogą być puste/nieobecne

**Poprawka:**
```typescript
childrenAges: z.string().max(200, "...").optional().default(""),
notes: z.string().max(1000, "...").optional().default(""),
dietaryNeeds: z.string().max(500, "...").optional().default(""),
```
Uwaga z CLAUDE.md: "Zod 4 + RHF type mismatch: `z.string().optional().default("")` creates input/output type divergence." — w tym kontekście to nie jest problem bo te pola są używane tylko server-side w route, nie w RHF. Można też użyć `.optional()` bez `.default()` i obsłużyć `undefined` w route z `?? ""`.

---

## Drobne uwagi (🟡 Nit)

### 🟡 6. Duplikacja `ALLOWED_ORIGINS` w każdym route

**Lokalizacja:** Wszystkie 4 routes, linia 12–16.

**Problem:** Identyczna tablica `ALLOWED_ORIGINS` jest zdefiniowana 4 razy. Gdy zmieni się domena (np. dodanie Vercel preview URL), trzeba zaktualizować 4 miejsca.

**Sugestia:** Wyekstrahować do `src/lib/constants.ts` lub `src/lib/api-security.ts`:
```typescript
export const ALLOWED_ORIGINS = [
  "https://www.wyjazdyzdziecmi.pl",
  "https://wyjazdyzdziecmi.pl",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];
```
Następnie w każdym route: `import { ALLOWED_ORIGINS } from "@/lib/constants"`.

---

### 🟡 7. Duplikacja bloku `rateLimit` + `CSRF` w każdym route

**Lokalizacja:** Wszystkie 4 routes.

**Problem:** Identyczne bloki CSRF check (10 linii) + rate limit (12 linii) + IP extraction powtarzają się 4 razy. Łącznie ~88 linii duplikowanego kodu.

**Sugestia (opcjonalna):** Helper `validateRequest(request)` zwracający `NextResponse | null`:
```typescript
// src/lib/api-security.ts
export function validateRequest(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const ip = extractIp(request);
  if (!rateLimit(ip).success) {
    return NextResponse.json({ error: "Zbyt wiele prób..." }, { status: 429 });
  }
  return null;
}
```
Uwaga: honeypot NIE powinien być w tym helperze — wymaga sparsowanego `body`, które nie jest dostępne przed `request.json()`. CSRF + rate limit są przed parsowaniem — mogą być razem.

To jest **suggestion**, nie requirement. Obecna duplikacja jest czytelna i nie wprowadza błędów.

---

### 🟡 8. `log()` loguje wrażliwe dane w development

**Lokalizacja:** `booking/route.ts` linia 84–91.

**Problem:** `log("Booking", { name, email, trip, adults, children, dietaryNeeds })` — w `logger.ts` `log()` jest no-op w produkcji, więc OK. Ale `dietaryNeeds` to dane zdrowotne (szczególna kategoria RODO, art. 9). W development (lokalnie) będą widoczne w konsoli. To nie jest problem produkcyjny, ale warto być świadomym.

**Sugestia:** Przy przyszłych zmianach rozważyć nielogowanie `dietaryNeeds` nawet w dev, lub zamaskowanie: `dietaryNeeds: data.dietaryNeeds ? "[provided]" : "[empty]"`.

---

### 🟡 9. `NewsletterConfirmation` używa `props.email` w treści emaila

**Lokalizacja:** `src/emails/NewsletterConfirmation.tsx`, linia 31–33.

**Problem:** Email zawiera: "Dziękujemy za zapis na nasz newsletter ({props.email})." Wyświetlanie adresu email z powrotem w treści emaila jest redundantne (odbiorca wie na jaki adres dostał email) i może wyglądać nieprofesjonalnie.

**Sugestia:** Usunąć `({props.email})` z treści. Email w stopce (`Ta wiadomość została wysłana na adres {props.email}`) jest wystarczający i standardowy. Jeśli usunąć `email` z props, zmienić `NewsletterConfirmation({ email: data.email })` w route na `NewsletterConfirmation({})`.

---

### 🟡 10. Brak sprawdzenia czy `Promise.allSettled` wyniki są dostępne gdy env vars nie są skonfigurowane

**Lokalizacja:** `sheets.ts` + `email.ts`.

**Obserwacja:** Gdy brak `GOOGLE_SHEETS_*` zmiennych, `appendBooking` (i inne) loguje `console.warn` i zwraca `undefined` (bez rzucania). Gdy brak `RESEND_API_KEY`, `sendEmail` loguje `console.warn` i zwraca `undefined`. To jest **poprawne zachowanie** — graceful degradation.

**Ale:** W dev bez konfiguracji env vars, `Promise.allSettled` dostanie 3 promises które wszystkie resolve do `undefined`. Route odpowie `{ success: true }` — co jest prawidłowe. Brak błędów.

Żadna poprawka nie jest potrzebna, to notatka potwierdzająca poprawność graceful degradation.

---

## Analiza architektury

### Kolejność operacji — POPRAWNA
Wszystkie 4 routes stosują prawidłową sekwencję:
1. CSRF Origin check
2. Rate limiting (z prawidłowym `at(-1)` dla IP)
3. `request.json()` — parse body
4. Honeypot check (fake 200)
5. Zod validation
6. Turnstile (jeśli token obecny)
7. `log()` — bez wrażliwych danych (poza `dietaryNeeds`, patrz #8)
8. `Promise.allSettled([Sheets, notification, confirmation])`
9. `return { success: true }`

### Zgodność z planem — WYSOKA
- [x] CSRF zachowane
- [x] Rate limit zachowane (`at(-1)` dla IP — zgodne z Code Review Audit 24.03)
- [x] Honeypot zachowane (fake 200)
- [x] Zod zachowane
- [x] `log()` zachowane
- [x] Turnstile opcjonalny (`if (data.turnstileToken)`)
- [x] `Promise.allSettled` — poprawne użycie
- [x] Newsletter BEZ notification do Marii
- [x] Zakomentowany webhook usunięty
- [x] `turnstileToken: z.string().optional()` w każdym schemacie

### Props email templates vs route calls — ZGODNOŚĆ
Każdy route przekazuje dokładnie te pola których wymaga interface Props w szablonie:

| Template | Props wymagane | Props przekazane | Status |
|---|---|---|---|
| BookingNotification | name, email, phone, trip, adults, children, childrenAges, dietaryNeeds, notes, consentMarketing, submittedAt | Wszystkie | ✅ |
| BookingConfirmation | name, trip, adults, children | Wszystkie | ✅ |
| ContactNotification | name, email, message, submittedAt | Wszystkie | ✅ |
| ContactConfirmation | name | name | ✅ |
| WaitlistNotification | name, email, phone, trip, submittedAt | Wszystkie | ✅ |
| WaitlistConfirmation | name, trip | Wszystkie | ✅ |
| NewsletterConfirmation | email | email | ✅ |

### Sheets data vs helpers — ZGODNOŚĆ
Pola przekazywane z routes do `append*` helpers są zgodne z sygnaturami w `sheets.ts`. Brak niezgodności typów.

### Security — DOBRY STAN
- CSRF: poprawny
- Rate limit: poprawny (`at(-1)` dla IP, MAX_IPS cap)
- Honeypot: poprawny (fake 200)
- Brak data leaks w error responses (błędy walidacji ujawniają nazwy pól — akceptowalne)
- `sanitizeCell` w `sheets.ts` chroni przed formula injection
- JEDYNY problem: pusty string w `turnstileToken` omija weryfikację (🔴 #1)

---

## Następne kroki

Przed wdrożeniem produkcyjnym wymagane:
1. **Naprawić 🔴 #1** — dodać `.min(1)` do `turnstileToken` w schematach (4 pliki) LUB zmienić guard na `?.trim()` w routes (4 pliki). Rekomendacja: oba.
2. **Sprawdzić 🟠 #5** — czy frontend zawsze wysyła `childrenAges`, `notes`, `dietaryNeeds` jako `""` gdy puste. Jeśli nie — dodać `.optional().default("")`.
3. **Opcjonalnie** 🟠 #3 — sprawdzić wyniki `Promise.allSettled` w dev logach.

Po zaakceptowaniu poprawek: Faza 3 gotowa, można przejść do Fazy 4 (Turnstile widget w formularzach).
