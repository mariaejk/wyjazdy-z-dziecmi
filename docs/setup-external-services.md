# Konfiguracja serwisów zewnętrznych

Instrukcja krok po kroku dla: Google Sheets, Resend, Cloudflare Turnstile.

---

## 1. Google Sheets (zapis leadów)

### 1.1 Utwórz projekt w Google Cloud Console
1. Wejdź na https://console.cloud.google.com
2. Utwórz nowy projekt (np. "wyjazdy-z-dziecmi")
3. Włącz **Google Sheets API**: APIs & Services → Enable APIs → szukaj "Google Sheets API" → Enable

### 1.2 Utwórz Service Account
1. APIs & Services → Credentials → Create Credentials → **Service Account**
2. Nazwa: np. "sheets-writer"
3. Kliknij na service account → Keys → **Add Key → JSON** → pobierz plik

### 1.3 Skopiuj dane z pliku JSON
Z pobranego pliku JSON skopiuj:
- `client_email` → wklej do `GOOGLE_SHEETS_CLIENT_EMAIL` w `.env.local`
- `private_key` → wklej do `GOOGLE_SHEETS_PRIVATE_KEY` w `.env.local`

### 1.4 Przygotuj arkusz Google Sheets
1. Utwórz nowy arkusz Google Sheets
2. Skopiuj ID arkusza z URL: `https://docs.google.com/spreadsheets/d/[TEN_FRAGMENT]/edit`
3. Wklej do `GOOGLE_SHEETS_SPREADSHEET_ID` w `.env.local`
4. **Udostępnij arkusz** Service Accountowi: Udostępnij → wklej `client_email` → rola **Edytor**

### 1.5 Utwórz 4 zakładki z nagłówkami

**Zakładka "Rezerwacje":**
| Data | Imię | Email | Telefon | Wyjazd | Dorośli | Dzieci | Wiek dzieci | Dieta | Uwagi | Status | Zgoda RODO | Marketing |

**Zakładka "Kontakty":**
| Data | Imię | Email | Wiadomość | Status | Zgoda RODO | Źródło |

**Zakładka "Newsletter":**
| Data | Email | Status | Zgoda RODO |

**Zakładka "Lista oczekujących":**
| Data | Imię | Email | Telefon | Wyjazd | Status | Zgoda RODO |

---

## 2. Resend (emaile)

### 2.1 Załóż konto
1. Zarejestruj się na https://resend.com (darmowy plan: 3000 emaili/miesiąc)
2. API Keys → Create → skopiuj klucz
3. Wklej do `RESEND_API_KEY` w `.env.local`

### 2.2 Zweryfikuj domenę (wymagane do wysyłki do klientów)
1. Resend Dashboard → Domains → **Add Domain** → wpisz `wyjazdyzdziecmi.pl`
2. Dodaj rekordy DNS u rejestratora domeny:
   - **SPF** (TXT record)
   - **DKIM** (TXT record)
   - **DMARC** (TXT record)
3. Poczekaj na weryfikację (~5-60 min)

### 2.3 Skonfiguruj env variables
```
FROM_EMAIL="Wyjazdy z Dziećmi <kontakt@wyjazdyzdziecmi.pl>"
OWNER_EMAIL=wyjazdyzdziecmi@gmail.com
```

**Bez zweryfikowanej domeny:** Możesz używać `onboarding@resend.dev` ale tylko do wysyłki do siebie (OWNER_EMAIL). Emaile do klientów wymagają własnej domeny.

---

## 3. Cloudflare Turnstile (antyspam)

### 3.1 Utwórz widget
1. Wejdź na https://dash.cloudflare.com → **Turnstile**
   (nie potrzebujesz domeny na Cloudflare — Turnstile jest darmowy osobno)
2. **Add Site** → wpisz nazwę i domeny:
   - `wyjazdyzdziecmi.pl`
   - `www.wyjazdyzdziecmi.pl`
   - `localhost` (do testów)
3. Widget type: **Managed** (niewidoczny, sam decyduje czy pokazać challenge)

### 3.2 Skopiuj klucze
- **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` w `.env.local` (publiczny)
- **Secret Key** → `TURNSTILE_SECRET_KEY` w `.env.local` (prywatny)

---

## 4. Vercel — Environment Variables

Na Vercel: Settings → Environment Variables → dodaj wszystkie:

| Zmienna | Wartość | Uwagi |
|---------|---------|-------|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | z pliku JSON | |
| `GOOGLE_SHEETS_PRIVATE_KEY` | z pliku JSON | Pamiętaj o cudzysłowach |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | z URL arkusza | |
| `RESEND_API_KEY` | z Resend dashboard | |
| `FROM_EMAIL` | `Wyjazdy z Dziećmi <kontakt@wyjazdyzdziecmi.pl>` | Po weryfikacji domeny |
| `OWNER_EMAIL` | `wyjazdyzdziecmi@gmail.com` | |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | z Cloudflare | Publiczny |
| `TURNSTILE_SECRET_KEY` | z Cloudflare | Prywatny |

---

## 5. Testowanie

### Bez kluczy (dev mode)
Formularze działają bez żadnych kluczy — helpery logują `console.warn` i pomijają zewnętrzne serwisy. Możesz normalnie rozwijać stronę.

### Z kluczami
1. Skopiuj `.env.example` jako `.env.local`
2. Wypełnij wartości
3. `npm run dev`
4. Wyślij formularz → sprawdź:
   - Arkusz Google Sheets (nowy wiersz)
   - Skrzynkę OWNER_EMAIL (powiadomienie)
   - Skrzynkę klienta (potwierdzenie)

---

## Koszty

| Usługa | Plan | Limit | Koszt |
|--------|------|-------|-------|
| Google Sheets API | Free | 300 zapisów/min | 0 zł |
| Resend | Free | 3000 emaili/mies. | 0 zł |
| Cloudflare Turnstile | Free | 1M weryfikacji/mies. | 0 zł |
| **Razem** | | | **0 zł** |
