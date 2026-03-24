# Code Review — Faza 4: Turnstile Widget (4 formularze)

Last Updated: 2026-03-24

---

## Executive Summary

Faza 4 implementuje Cloudflare Turnstile (invisible mode) we wszystkich czterech formularzach. Ogólna architektura jest poprawna: pattern jest spójny, graceful degradation działa, NEXT_PUBLIC_ prefix jest właściwy. Jednak w implementacji są trzy istotne błędy logiczne, które sprawią, że Turnstile de facto nie chroni formularzy w praktyce — token jest pobierany zbyt późno i błędy Turnstile nie są obsługiwane. Są też dwa problemy ważne z punktu widzenia bezpieczeństwa (reuse tokena) i UX (submit możliwy przed załadowaniem widgetu).

---

## Klasyfikacja problemów

### 🔴 Blocking (musi być naprawione przed deploy)

#### BF-1 — Token jest pobierany ZA PÓŹNO (wszystkie 4 formularze)

**Pliki:** `BookingForm.tsx:74`, `ContactForm.tsx:45`, `NewsletterForm.tsx:51`, `WaitlistForm.tsx:53`

```ts
// Aktualny kod — BŁĘDNY
const turnstileToken = turnstileRef.current?.getResponse();
const response = await fetch("/api/booking", { ... });
```

**Problem:** `getResponse()` z `@marsidev/react-turnstile` zwraca token TYLKO jeśli Turnstile zakończył challenge i nie wygasł (domyślny TTL tokena Cloudflare to 300 sekund). W trybie `invisible`, Turnstile nie startuje challenge automatycznie przy montowaniu — challenge jest wykonywany dopiero po wywołaniu `turnstileRef.current?.execute()`. Bez jawnego `execute()` metoda `getResponse()` zawsze zwraca `undefined` lub pusty string.

**Konsekwencja:** `turnstileToken` będzie zawsze `undefined`, co w API route trafia do gałęzi `if (data.turnstileToken)` — warunek jest `falsy`, weryfikacja jest pomijana, Turnstile w ogóle nie chroni formularzy.

**Fix:** W trybie `invisible` należy użyć callbacku `onSuccess` (Turnstile wykonuje challenge w tle i wywołuje callback z tokenem gdy gotowy) albo wywoływać `execute()` i czekać na token przez Promise:

```tsx
// Wariant A — onSuccess callback (rekomendowany dla invisible)
const [turnstileToken, setTurnstileToken] = useState<string | undefined>(undefined);

<Turnstile
  ref={turnstileRef}
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
  options={{ size: "invisible" }}
  onSuccess={(token) => setTurnstileToken(token)}
  onExpire={() => setTurnstileToken(undefined)}
  onError={() => setTurnstileToken(undefined)}
/>

// W onSubmit — bez getResponse():
body: JSON.stringify({ ...data, turnstileToken }),
```

```tsx
// Wariant B — execute() + onSuccess Promise (bardziej złożony)
// Pominięty dla zwięzłości — Wariant A jest wystarczający.
```

---

#### BF-2 — Turnstile nie resetuje się po BŁĘDZIE (wszystkie 4 formularze)

**Pliki:** `BookingForm.tsx:102-105`, `ContactForm.tsx:73-76`, `NewsletterForm.tsx:75-78`, `WaitlistForm.tsx:81-84`

```ts
// Aktualny kod
} catch {
  setStatus("error");
  setErrorMessage("...");
  // brak turnstileRef.current?.reset()
}
```

Oraz w gałęziach 429 i `!response.ok` (wczesny return):

```ts
if (response.status === 429) {
  setStatus("error");
  setErrorMessage("...");
  return; // brak reset!
}

if (!response.ok) {
  ...
  return; // brak reset!
}
```

**Problem:** Po nieudanym submicie (błąd sieci, 429, błąd API) token Turnstile jest zużyty lub wygasły. Kolejny submit wysyła ten sam token, który Cloudflare odrzuci ("token already used"). Widget musi być zresetowany po KAŻDYM nieudanym submicie, nie tylko po sukcesie.

Cloudflare dokumentuje wprost: token jest jednorazowy. Użyty token przy ponownej weryfikacji zwróci `success: false`.

**Fix:** Dodać `turnstileRef.current?.reset()` (oraz `setTurnstileToken(undefined)` jeśli używamy Wariantu A z BF-1) we wszystkich ścieżkach błędu:

```ts
if (response.status === 429) {
  setStatus("error");
  setErrorMessage("...");
  turnstileRef.current?.reset();
  setTurnstileToken(undefined); // jeśli używamy state
  return;
}

if (!response.ok) {
  ...
  turnstileRef.current?.reset();
  setTurnstileToken(undefined);
  return;
}

} catch {
  setStatus("error");
  setErrorMessage("...");
  turnstileRef.current?.reset();
  setTurnstileToken(undefined);
}
```

---

### 🟠 Important (powinno być naprawione)

#### BI-1 — Brak obsługi stanu "Turnstile ładuje się" — submit możliwy przed załadowaniem widgetu

**Pliki:** Wszystkie 4 formularze.

**Problem:** Widget invisible Turnstile potrzebuje czasu na załadowanie (skrypt Cloudflare ~50-200ms, challenge może trwać dłużej na wolnym połączeniu). Jeśli użytkownik wypełni formularz i kliknie submit natychmiast po wejściu na stronę, `turnstileToken` będzie `undefined` — i zgodnie z Wariantem A (BF-1) zostanie wysłany pusty token.

Na serwerze gałąź `if (data.turnstileToken)` jest pominięta gdy token jest `undefined` — formularz przejdzie bez weryfikacji Turnstile. W środowisku bez `TURNSTILE_SECRET_KEY` jest to akceptowalne (dev), ale w produkcji z kluczem ustawiony SITE_KEY a bez tokena — brak ochrony.

**Fix:** Dodać stan `isTurnstileReady` i dezaktywować przycisk submit dopóki token nie jest gotowy:

```tsx
const [isTurnstileReady, setIsTurnstileReady] = useState(
  !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY // ready jeśli brak klucza (disabled Turnstile)
);

<Turnstile
  onSuccess={(token) => {
    setTurnstileToken(token);
    setIsTurnstileReady(true);
  }}
  onExpire={() => {
    setTurnstileToken(undefined);
    setIsTurnstileReady(false);
  }}
  onError={() => {
    setTurnstileToken(undefined);
    setIsTurnstileReady(false);
  }}
/>

<Button
  type="submit"
  disabled={!isTurnstileReady || status === "submitting"}
  loading={status === "submitting"}
>
```

Uwaga: Nie pokazywać użytkownikowi komunikatu "czeka na Turnstile" — invisible mode ma być przezroczysty. Sam disabled button wystarczy.

---

#### BI-2 — Brak callbacku `onError` i `onExpire` — Turnstile failure jest cichy

**Pliki:** Wszystkie 4 formularze (linie z `<Turnstile ... />`).

**Problem:** Widget montowany jest bez callbacków `onError` i `onExpire`. Jeśli Cloudflare challenge się nie powiedzie (np. zablokowany JS, sieć korporacyjna filtrująca Cloudflare) lub token wygaśnie po 300s, użytkownik nie dowie się o problemie dopiero do momentu submitu, gdzie dostanie generyczny błąd "Weryfikacja antyspam nie powiodła się".

Przy Wariancie A z BF-1 (używanie state dla tokena), `onExpire` i `onError` są już wymagane do czyszczenia state — stąd klasyfikacja jako "important" a nie "blocking".

**Fix:** Widoczny w BF-1 i BI-1 — dodanie callbacków do `<Turnstile />` przy przejściu na state pattern.

---

#### BI-3 — `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY` w JSX — wartość może być `""` (empty string)

**Pliki:** `BookingForm.tsx:260`, `ContactForm.tsx:151`, `NewsletterForm.tsx:142`, `WaitlistForm.tsx:146`

```tsx
{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
  <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} ... />
)}
```

**Problem:** Jeśli zmienna środowiskowa jest ustawiona na pusty string `NEXT_PUBLIC_TURNSTILE_SITE_KEY=""`, warunek jest `falsy` — widget nie zostanie wyrenderowany (OK), ale `isTurnstileReady` (z BI-1) musiałoby to uwzględniać. Ważniejszy problem: Next.js inlinuje `NEXT_PUBLIC_` zmienne w build time. Zmiana wartości zmiennej wymaga przebudowania aplikacji — nie wystarczy zmiana w Vercel env vars bez redeployu.

Jest to raczej kwestia dokumentacyjna / operacyjna niż bug kodu, ale warto odnotować w komentarzu w kodzie lub README deploymentu.

**Fix:** Wyciągnąć do stałej dla czytelności i unikania powtórzenia:

```ts
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
// ...
{SITE_KEY && <Turnstile siteKey={SITE_KEY} ... />}
```

---

### 🟡 Nit (drobne)

#### BN-1 — Spójność: `turnstileRef.current?.reset()` po sukcesie jest zbędne jeśli formularz jest resetowany

**Pliki:** `BookingForm.tsx:100-101`, `ContactForm.tsx:71-72`, `NewsletterForm.tsx:73-74`, `WaitlistForm.tsx:79-80`

```ts
reset(); // reset RHF
turnstileRef.current?.reset(); // reset Turnstile
```

Przy zmianie statusu na `"success"` komponent BookingForm renderuje inny widok (early return z `if (status === "success")`). Widget Turnstile jest odmontowywany, więc `reset()` na nim jest no-op. W NewsletterForm i WaitlistForm (success wewnątrz tego samego render tree) reset jest natomiast potrzebny.

Nie jest to bug, ale warto wiedzieć że w BookingForm i ContactForm (które unmount widget przy success) wywołanie `.reset()` nic nie robi.

---

#### BN-2 — Brak `aria-label` na wbudowanych elementach Turnstile

**Pliki:** Wszystkie 4 formularze.

Cloudflare Turnstile w trybie invisible renderuje ukryty iframe. Biblioteka `@marsidev/react-turnstile` przekazuje dodatkowe props do kontenera `<div>`. Brak widocznej interakcji, więc brak ryzyka dostępności — ale warto dodać `className="sr-only"` wrapper lub upewnić się że Turnstile renderuje się poza `<form>` flow by nie wpływał na kolejność focusu.

W aktualnym kodzie Turnstile jest wewnątrz `<form>` — to akceptowalne dla invisible mode, ale nieintuicyjne w przyszłości.

---

#### BN-3 — `consentRodo: false as unknown as true` — pattern nie jest opisany komentarzem w 3 z 4 formularzy

**Pliki:** `BookingForm.tsx:56`, `ContactForm.tsx:35`, `WaitlistForm.tsx:43`

`NewsletterForm.tsx:32` ma komentarz wyjaśniający:
```ts
// Zod literal(true) requires true type, but RHF needs false default for unchecked state
consentRodo: false as unknown as true,
```

Pozostałe 3 formularze nie mają tego komentarza. Drobna niespójność dokumentacyjna.

---

### 🔵 Suggestion (propozycje architektoniczne)

#### BS-1 — Wyciągnięcie logiki Turnstile do custom hooka `useTurnstile()`

Powtórzony pattern (ref, state tokena, callbacki) w 4 formularzach to kandydat do ekstrakcji:

```ts
// src/hooks/useTurnstile.ts
export function useTurnstile() {
  const ref = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const onSuccess = (t: string) => { setToken(t); setIsReady(true); };
  const onExpire = () => { setToken(undefined); setIsReady(false); };
  const onError = () => { setToken(undefined); setIsReady(false); };
  const reset = () => { ref.current?.reset(); setToken(undefined); setIsReady(false); };

  return { ref, token, isReady, onSuccess, onExpire, onError, reset };
}
```

Zmniejsza ryzyko że kolejne formularze (np. przyszły "formularz pytania") pominą reset przy błędzie.

---

#### BS-2 — Weryfikacja Turnstile na serwerze powinna być wymagana gdy SECRET_KEY jest ustawiony

**Plik:** `src/app/api/booking/route.ts:69` (i identycznie w pozostałych 3)

```ts
// Aktualny kod
if (data.turnstileToken) {
  const isHuman = await verifyTurnstile(data.turnstileToken);
  if (!isHuman) { return 400; }
}
// Jeśli brak tokena — brak weryfikacji, request przechodzi
```

`verifyTurnstile()` już ma graceful skip gdy `TURNSTILE_SECRET_KEY` nie jest ustawiony. Ale gdy SECRET_KEY jest ustawiony, a token nie przyszedł (bo widget się nie załadował / BF-2), request przejdzie bez weryfikacji.

Bardziej defensywny wariant:

```ts
const secret = process.env.TURNSTILE_SECRET_KEY;
if (secret) {
  // Turnstile jest aktywne — token jest wymagany
  if (!data.turnstileToken) {
    return NextResponse.json(
      { error: "Weryfikacja antyspam wymagana." },
      { status: 400 }
    );
  }
  const isHuman = await verifyTurnstile(data.turnstileToken);
  if (!isHuman) {
    return NextResponse.json(
      { error: "Weryfikacja antyspam nie powiodła się. Spróbuj ponownie." },
      { status: 400 }
    );
  }
}
```

To zamknęłoby dziurę z BF-1/BI-1 od strony serwera — nawet jeśli frontend nie wyśle tokena, backend odrzuci request.

---

## Podsumowanie problemów

| ID   | Klasyfikacja | Opis                                              | Pliki                    |
|------|-------------|---------------------------------------------------|--------------------------|
| BF-1 | 🔴 Blocking | `getResponse()` bez `execute()` = zawsze undefined | Wszystkie 4 formularze   |
| BF-2 | 🔴 Blocking | Brak `reset()` po błędzie — token zużyty          | Wszystkie 4 formularze   |
| BI-1 | 🟠 Important| Submit możliwy przed załadowaniem Turnstile       | Wszystkie 4 formularze   |
| BI-2 | 🟠 Important| Brak `onError`/`onExpire` callbacków              | Wszystkie 4 formularze   |
| BI-3 | 🟠 Important| env var może być `""` — brak stałej              | Wszystkie 4 formularze   |
| BN-1 | 🟡 Nit      | `reset()` zbędny po success w BookingForm/Contact | BookingForm, ContactForm |
| BN-2 | 🟡 Nit      | Turnstile iframe wewnątrz `<form>` flow           | Wszystkie 4 formularze   |
| BN-3 | 🟡 Nit      | Brak komentarza do `false as unknown as true`     | 3 z 4 formularzy         |
| BS-1 | 🔵 Suggest  | Wyciągnąć `useTurnstile()` custom hook            | —                        |
| BS-2 | 🔵 Suggest  | Backend: wymagaj tokena gdy SECRET_KEY ustawiony  | Wszystkie 4 API routes   |

---

## Ocena spójności między formularzami

Pattern jest SPÓJNY — wszystkie 4 formularze mają identyczny błąd BF-1 i BF-2, co oznacza że były kopiowane z jednego wzorca. Dobra wiadomość: naprawienie jednego schematu i zastosowanie go w 4 miejscach będzie systematyczne. Nie ma przypadków gdzie jeden formularz działa a inny nie.

---

## Pozytywne aspekty implementacji

- `NEXT_PUBLIC_` prefix poprawny — zmienna dostępna po stronie klienta
- `options={{ size: "invisible" }}` poprawny — nie blokuje UX widocznym captcha
- Conditional render `{siteKey && <Turnstile />}` zapewnia graceful degradation gdy brak klucza
- `verifyTurnstile()` w `src/lib/turnstile.ts` ma własny graceful skip gdy brak SECRET_KEY
- Zod schema `turnstileToken: z.string().min(1).optional()` poprawnie modeluje opcjonalność
- `@marsidev/react-turnstile` v1.4.2 jest kompatybilna z React 19 (brak peer dep conflict)
- Reset po sukcesie obecny (choć zbędny w formularzach unmountujących widget)

---

## Next Steps

1. Naprawić BF-1 — przejść na pattern `onSuccess` callback + state zamiast `getResponse()`
2. Naprawić BF-2 — dodać `reset()` + `setTurnstileToken(undefined)` we wszystkich ścieżkach błędu
3. Naprawić BI-1 — dodać `isTurnstileReady` state i disabled button
4. Opcjonalnie: BS-1 — wyciągnąć do `useTurnstile()` hooka by uniknąć dalszej duplikacji
5. Opcjonalnie: BS-2 — wzmocnić backend by wymagał tokena gdy SECRET_KEY jest ustawiony

**Szacowany nakład pracy:** BF-1 + BF-2 + BI-1 = ~1-2h (systematyczna zmiana w 4 formularzach po ustaleniu wzorca). BS-1 hook zredukuje przyszłą duplikację.
