# Podłączenie domeny wyjazdyzdziecmi.pl do Vercel

## Co gdzie jest

- **Hostinger** — tutaj kupiona jest domena `wyjazdyzdziecmi.pl`. Hostinger pełni rolę „drogowskazu" (DNS) — mówi przeglądarkom gdzie szukać strony.
- **Vercel** — tutaj jest hosting strony (serwer, SSL, CDN). Vercel sam buduje i publikuje stronę z kodu na GitHubie.

Nie trzeba kupować osobnego hostingu na Hostinger — Vercel to hosting + CDN + CI/CD w jednym.

---

## Krok 1: Deploy projektu na Vercel

1. Wejdź na https://vercel.com i zaloguj się kontem **GitHub** (to samo konto gdzie jest repo projektu)
2. Kliknij **„Add New… → Project"**
3. Wybierz repozytorium `langing_page_wyjazd_z_dziecmi` z listy
4. Vercel automatycznie wykryje Next.js — nie zmieniaj ustawień
5. Kliknij **„Deploy"**
6. Poczekaj 2-3 minuty na build

Po deployu strona będzie dostępna pod adresem typu:
```
https://langing-page-wyjazd-z-dziecmi.vercel.app
```

Sprawdź czy działa poprawnie zanim przejdziesz dalej.

---

## Krok 2: Dodaj zmienne środowiskowe (env vars)

W dashboardzie Vercel:
1. Wejdź w projekt → **Settings** → **Environment Variables**
2. Dodaj wszystkie zmienne z pliku `.env.local`:

| Zmienna | Opis |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email konta serwisowego Google |
| `GOOGLE_PRIVATE_KEY` | Klucz prywatny Google (cały, z `-----BEGIN...`) |
| `GOOGLE_SPREADSHEET_ID` | ID arkusza Google Sheets |
| `RESEND_API_KEY` | Klucz API Resend do emaili |
| `NOTIFICATION_EMAIL` | Email na który przychodzą powiadomienia o rezerwacjach |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Klucz publiczny Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Klucz prywatny Cloudflare Turnstile |

**Ważne:** Po dodaniu zmiennych kliknij **„Redeploy"** (Deployments → … → Redeploy), żeby nowy build miał dostęp do zmiennych.

---

## Krok 3: Dodaj domenę w Vercel

1. W dashboardzie Vercel → projekt → **Settings** → **Domains**
2. Wpisz `wyjazdyzdziecmi.pl` i kliknij **Add**
3. Wpisz `www.wyjazdyzdziecmi.pl` i kliknij **Add**
4. Vercel pokaże **rekordy DNS** do ustawienia — zapisz je, np.:

```
Typ       Nazwa   Wartość
A         @       76.76.21.21
CNAME     www     cname.vercel-dns.com
```

(Dokładne wartości mogą się różnić — użyj tych co pokaże Vercel)

---

## Krok 4: Ustaw DNS na Hostinger

1. Zaloguj się na https://www.hostinger.pl → **Panel klienta**
2. Przejdź do: **Domeny** → `wyjazdyzdziecmi.pl` → **DNS / Nameservers** (lub „Strefa DNS")
3. **Usuń** istniejące rekordy A i CNAME (jeśli są — mogą wskazywać na domyślny parking Hostingera)
4. **Dodaj** nowe rekordy zgodnie z tym co Vercel pokazał w kroku 3:

   **Rekord A:**
   - Typ: `A`
   - Nazwa: `@` (lub puste pole)
   - Wartość: `76.76.21.21` (wartość z Vercela)
   - TTL: `3600` (lub domyślne)

   **Rekord CNAME:**
   - Typ: `CNAME`
   - Nazwa: `www`
   - Wartość: `cname.vercel-dns.com` (wartość z Vercela)
   - TTL: `3600` (lub domyślne)

5. Zapisz zmiany

---

## Krok 5: Poczekaj na propagację DNS

- Zazwyczaj: **5-30 minut**
- Maksymalnie: do 48 godzin (rzadko)
- Vercel automatycznie wygeneruje certyfikat **SSL (HTTPS)** po propagacji

Sprawdź status w Vercel → Settings → Domains — powinno pokazać zielony status „Valid Configuration".

---

## Jak działa po podłączeniu

```
Użytkownik wpisuje wyjazdyzdziecmi.pl
        ↓
Hostinger DNS kieruje na Vercel (76.76.21.21)
        ↓
Vercel serwuje stronę + HTTPS + CDN
```

Każdy `git push` do `master` automatycznie buduje i publikuje nową wersję strony na Vercel (CI/CD).

---

## Rozwiązywanie problemów

### Domena nie działa po 30 minutach
- Sprawdź rekordy DNS na Hostinger — czy nie ma starych/konfliktujących rekordów A lub CNAME
- W Vercel → Domains sprawdź czy status to „Valid Configuration" czy „Invalid"

### SSL nie działa (brak HTTPS)
- Vercel generuje certyfikat automatycznie, ale potrzebuje poprawnych rekordów DNS
- Jeśli Hostinger ma włączony własny SSL — wyłącz go (Vercel ma swój)

### Strona działa na .vercel.app ale nie na domenie
- DNS się jeszcze nie propagował — poczekaj lub sprawdź na https://dnschecker.org

### Formularz nie wysyła (błąd po submicie)
- Sprawdź czy zmienne środowiskowe (env vars) są dodane w Vercel Settings
- Po dodaniu/zmianie env vars trzeba zrobić **Redeploy**

---

## Koszty

| Usługa | Koszt |
|---|---|
| Hostinger — domena `wyjazdyzdziecmi.pl` | ~40-60 zł/rok (odnowienie) |
| Vercel Hobby (darmowy) | $0/mies. (tylko projekty osobiste) |
| Vercel Pro (komercyjny) | $20/mies. (~80 zł/mies.) |

**Uwaga:** Plan Hobby (darmowy) jest przeznaczony wyłącznie do użytku osobistego. Strona komercyjna klientki wymaga planu **Pro** ($20/mies.) zgodnie z regulaminem Vercel.
