# Do poprawy po review fazy 5

## 🔴 Blocking

- [x] 🔴 **useCookieConsent.ts:55** — `isLoaded` zawsze `true`. Fix: sentinel value `"__ssr__"` w getServerSnapshot, `isLoaded = raw !== SERVER_SENTINEL`.
- [x] 🔴 **manifest.ts + layout.tsx** — brakujące pliki ikon. Fix: zakomentowane referencje z TODO do wygenerowania.
- [x] 🔴 **structured-data.ts:42** — `EventCancelled` dla `isPast`. Fix: zawsze `EventScheduled` (miniony ≠ odwołany).

## 🟠 Important

- [x] 🟠 **CookieBanner.tsx** — template literals zamiast `cn()`. Fix: import cn(), zastosowano wszędzie.
- [x] 🟠 **CookieBanner.tsx** — `panelRef` dead code. Fix: użyty do focus management.
- [x] 🟠 **CookieBanner.tsx** — brak focus management w dialogu. Fix: useEffect z querySelector na panelRef.
- [x] 🟠 **CookieBanner.tsx:41-47** — Escape nie zamykał bannera z footer. Fix: dodano `else if (openedFromFooter)`.
- [x] 🟠 **sitemap.ts** — placeholder strony w sitemap. Fix: usunięto `/opinie` i `/single-parents`.

## 🟡 Nit

- [x] 🟡 **kontakt/page.tsx, opinie/page.tsx** — niespójne wcięcia. Fix: poprawiono indentację.
- [ ] 🟡 **sitemap.ts** — brak `lastModified`. (Pominięto — brak danych o datach modyfikacji.)
- [x] 🟡 **NewsletterForm.tsx:26** — `false as unknown as true` bez komentarza. Fix: dodano komentarz wyjaśniający.
- [ ] 🟡 **CookieBanner.tsx** — nierówna waga wizualna przycisków. (Do konsultacji z klientem/prawnikiem.)
