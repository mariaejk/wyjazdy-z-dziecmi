# Setup Cloudflare Workers + Airtable

Instrukcja konfiguracji nowego hostingu i bazy danych formularzy.
Wykonuje **developer** — Maria nie musi nic robić na Cloudflare.

---

## 1. Airtable — baza danych formularzy

### 1.1 Utwórz bazę
1. https://airtable.com → **Create a base** → nazwa: "Wyjazdy z Dziećmi — Formularze"
2. Utwórz **4 tabele** (wszystkie kolumny typu "Single line text"):

| Tabela | Kolumny |
|--------|---------|
| **Rezerwacje** | Data, Imie, Email, Telefon, Wyjazd, Dorosli, Dzieci, WiekDzieci, Dieta, Uwagi, Status, ZgodaRODO, Marketing |
| **Kontakty** | Data, Imie, Email, Wiadomosc, Status, ZgodaRODO, Zrodlo |
| **Newsletter** | Data, Email, Status, ZgodaRODO |
| **ListaOczekujacych** | Data, Imie, Email, Telefon, Wyjazd, Status, ZgodaRODO |

### 1.2 Utwórz API token
1. https://airtable.com/create/tokens → **Create new token**
2. Nazwa: "Wyjazdy z Dziećmi — API"
3. Scope: `data.records:write`
4. Access: wybierz bazę z kroku 1.1
5. **Create token** → skopiuj token (`pat...`)

### 1.3 Skopiuj Base ID
1. Otwórz bazę w Airtable
2. Z URL skopiuj Base ID — to ciąg zaczynający się od `app` (np. `appXXXXXXXXXX`)

### 1.4 Wartości do zapisania
- `AIRTABLE_API_KEY` = `pat...` (token z kroku 1.2)
- `AIRTABLE_BASE_ID` = `app...` (Base ID z kroku 1.3)

### 1.5 Udostępnij bazę Marii (opcjonalnie)
Maria może przeglądać zgłoszenia bezpośrednio w Airtable (zamiast Google Sheets):
1. W bazie kliknij **Share** → **Invite by email**
2. Wpisz email Marii → rola: **Editor** (może edytować statusy)
3. Maria dostaje link — loguje się i widzi tabelki jak w arkuszu

---

## 2. Cloudflare — hosting

### 2.1 Konto Cloudflare
1. https://dash.cloudflare.com/ → załóż konto lub zaloguj się
2. To jest **jedyny dashboard** — nie używaj starych linków pages.cloudflare.com czy workers.cloudflare.com

### 2.2 Utwórz projekt Pages
1. Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Wybierz repo: `[OWNER]/wyjazdy-z-dziecmi`
3. Konfiguracja build:
   - **Build command**: `npx @opennextjs/cloudflare build`
   - **Build output directory**: `.open-next`
   - **Root directory**: `/` (domyślne)
   - **Branch**: `feature/cloudflare-airtable-migration` (na testy, potem `master`)
4. **Save and Deploy**

### 2.3 Utwórz KV namespace (rate limiting)
1. Dashboard → **Workers & Pages** → **KV** → **Create a namespace**
2. Nazwa: `RATE_LIMIT`
3. Skopiuj **Namespace ID**
4. W repo w pliku `wrangler.jsonc` — odkomentuj sekcję `kv_namespaces` i wpisz ID:
   ```jsonc
   "kv_namespaces": [
     { "binding": "RATE_LIMIT", "id": "<wpisz-namespace-id>" }
   ]
   ```

### 2.4 Ustaw zmienne środowiskowe (Secrets)
1. Dashboard → **Workers & Pages** → nazwa projektu → **Settings** → **Environment variables**
2. Dodaj (wszystkie jako **Encrypt** / Secret):

| Zmienna | Wartość | Skąd |
|---------|---------|------|
| `AIRTABLE_API_KEY` | `pat...` | Krok 1.2 |
| `AIRTABLE_BASE_ID` | `app...` | Krok 1.3 |
| `RESEND_API_KEY` | `re_...` | https://resend.com → API Keys |
| `FROM_EMAIL` | `Wyjazdy z Dziećmi <kontakt@wyjazdyzdziecmi.pl>` | Taki sam jak na Vercel |
| `OWNER_EMAIL` | `wyjazdyzdziecmi@gmail.com` | Email Marii |
| `TURNSTILE_SECRET_KEY` | `0x...` | https://dash.cloudflare.com → Turnstile |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x...` | Turnstile (klucz publiczny) |
| `NEXT_PUBLIC_GA_ID` | `G-...` | Google Analytics |
| `NEXT_PUBLIC_CLARITY_ID` | `...` | Microsoft Clarity |

3. Dodaj zmienne Keystatic (te same co na Vercel):

| Zmienna | Wartość |
|---------|---------|
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` | `[OWNER]` |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | `wyjazdy-z-dziecmi` |
| `KEYSTATIC_GITHUB_CLIENT_ID` | z GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | z GitHub App |
| `KEYSTATIC_SECRET` | losowy ciąg (np. `openssl rand -hex 32`) |

### 2.5 Przetestuj na staging
1. Po deploy — CF da staging URL (np. `wyjazdy-z-dziecmi.pages.dev`)
2. Przetestuj: strony, formularze, CMS, emaile
3. Sprawdź czy dane trafiają do Airtable

---

## 3. DNS — przełączenie domeny (po testach!)

### 3.1 Dodaj domenę w CF Pages
1. Dashboard → Workers & Pages → projekt → **Custom domains** → **Set up a domain**
2. Wpisz: `wyjazdyzdziecmi.pl` i `www.wyjazdyzdziecmi.pl`

### 3.2 Zmień DNS na Hostingerze
1. Hostinger → Domains → wyjazdyzdziecmi.pl → **DNS / Nameservers**
2. Zmień rekordy A i CNAME według instrukcji CF (wyświetlone w kroku 3.1)
3. Propagacja DNS: 5 min – 48h (zazwyczaj <1h)

### 3.3 Zweryfikuj
1. Otwórz https://wyjazdyzdziecmi.pl — powinna się załadować z CF
2. Przetestuj formularz — dane w Airtable + emaile
3. Przetestuj CMS — `/keystatic` działa

---

## 4. Po przełączeniu

### Dla Marii — co się zmieniło
- **Strona wygląda tak samo** — zero zmian wizualnych
- **CMS** — wchodzisz tak samo na `wyjazdyzdziecmi.pl/keystatic`
- **Emaile** — przychodzą tak samo
- **Zamiast Google Sheets** → teraz **Airtable** (link do bazy dasz Marii)
- Airtable działa jak arkusz: tabele, filtry, sortowanie, statusy

### Dla developera
- `git push origin master` → CF auto-deploys (tak jak Vercel)
- Logi: Dashboard → Workers & Pages → projekt → **Logs**
- Build: `npm run build:cf` lokalnie, `npm run preview` do testów
- Vercel projekt: usuń po 1 tygodniu stabilności

---

## 5. Koszty

| Usługa | Koszt | Limit |
|--------|-------|-------|
| Cloudflare Workers | **$5/mies.** (paid plan) | 10M requests/mies. |
| Airtable | **$0** (free) | 1,000 records/base, 1,000 API calls/mies. |
| Resend | **$0** (free) | 3,000 emails/mies. |
| Turnstile | **$0** (free) | Unlimited |
| Hostinger (domena) | ~50 zł/rok | DNS only |
| **Razem** | **~25 zł/mies.** | |

---

## Troubleshooting

| Problem | Rozwiązanie |
|---------|-------------|
| Build fail na CF | Sprawdź logi w Dashboard → Deployments. Upewnij się że branch jest poprawny |
| Formularz nie zapisuje | Sprawdź AIRTABLE_API_KEY i AIRTABLE_BASE_ID w CF Settings → Variables |
| Brak emaili | Sprawdź RESEND_API_KEY w CF Variables. Sprawdź https://resend.com/emails |
| CMS nie działa | Sprawdź 5 zmiennych Keystatic w CF Variables |
| Rate limiting nie działa | Sprawdź czy KV namespace jest podpięty (Settings → Bindings → KV) |
| Stara strona nadal widoczna | DNS propagacja — poczekaj do 48h. Wyczyść cache przeglądarki |
