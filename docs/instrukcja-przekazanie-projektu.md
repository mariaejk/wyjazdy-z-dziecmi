# Przekazanie projektu — wyjazdyzdziecmi.pl

Instrukcja krok po kroku: co robi developer (Ty), co robi klientka (Maria), w jakiej kolejności.

**Czas realizacji:** ~2-3 godziny (developer) + ~15 minut (klientka)

---

## Spis treści

1. [Podsumowanie — kto co robi](#podsumowanie--kto-co-robi)
2. [Faza 1: Developer — przygotowanie kodu](#faza-1-developer--przygotowanie-kodu)
3. [Faza 2: Developer — deploy na Vercel](#faza-2-developer--deploy-na-vercel)
4. [Faza 3: Developer — serwisy zewnętrzne](#faza-3-developer--serwisy-zewnętrzne)
5. [Faza 4: Developer — domena](#faza-4-developer--domena)
6. [Faza 5: Developer — CMS dla klientki](#faza-5-developer--cms-dla-klientki)
7. [Faza 6: Developer — testy końcowe](#faza-6-developer--testy-końcowe)
8. [Faza 7: Klientka — onboarding](#faza-7-klientka--onboarding)
9. [Checklist końcowy](#checklist-końcowy)
10. [Co klientka dostaje na koniec](#co-klientka-dostaje-na-koniec)

---

## Podsumowanie — kto co robi

### Developer robi (Fazy 1-6):
- [ ] Wypchać kod na GitHub klientki
- [ ] Deploy na Vercel (z konta klientki lub swojego)
- [ ] Skonfigurować Google Sheets, Resend, Turnstile
- [ ] Podłączyć domenę `wyjazdyzdziecmi.pl`
- [ ] Skonfigurować Keystatic CMS (GitHub mode)
- [ ] Przetestować wszystko

### Klientka robi (Faza 7):
- [ ] Zaakceptować zaproszenie na GitHub (email)
- [ ] Zalogować się do CMS (`wyjazdyzdziecmi.pl/keystatic`)
- [ ] Przeczytać instrukcję CMS i zarządzania stroną

### Klientka potrzebuje:
- Konto GitHub (darmowe) — do logowania w CMS
- Dostęp do panelu Hostinger — do ustawienia DNS domeny
- Konto Google — do arkusza Sheets z formularzami

---

## Faza 1: Developer — transfer repo na konto klientki

Kod jest teraz na Twoim koncie (`TatianaG-ka/wyjazdy-z-dziecmi`). Trzeba go przenieść na konto klientki (Maria), żeby ona była właścicielem.

### 1.1 Klientka zakłada konto GitHub

1. https://github.com/signup → darmowe konto
2. Zapisz jej **username** — będzie potrzebny w kolejnych krokach
3. Klientka nie musi wiedzieć co to GitHub — potrzebuje tylko konta do logowania w CMS

### 1.2 Transfer repo (rekomendowane)

Transfer przenosi całe repo (z historią, branches, issues) na konto klientki. Ty automatycznie stajesz się collaborator.

1. Wejdź na https://github.com/TatianaG-ka/wyjazdy-z-dziecmi/settings
2. Przewiń na dół → **Danger Zone** → **Transfer ownership**
3. Wpisz username klientki → potwierdź nazwę repo `wyjazdy-z-dziecmi`
4. Klientka dostanie email z prośbą o akceptację → musi kliknąć **Accept**
5. Po akceptacji repo jest na koncie klientki: `https://github.com/[KLIENTKA]/wyjazdy-z-dziecmi`

**Co się dzieje po transferze:**
- Stary URL (`TatianaG-ka/wyjazdy-z-dziecmi`) automatycznie przekierowuje na nowy
- Cała historia commitów, branches zachowane
- Ty (TatianaG-ka) jesteś automatycznie collaborator z dostępem write

### 1.3 Zaktualizuj local remote

```bash
# Zmień URL remote na nowe repo klientki
git remote set-url origin https://github.com/[KLIENTKA]/wyjazdy-z-dziecmi.git

# Sprawdź
git remote -v
# Powinno pokazać: https://github.com/[KLIENTKA]/wyjazdy-z-dziecmi.git
```

Zamień `[KLIENTKA]` na username klientki.

### 1.4 Sprawdź że `.env.example` jest w repo

Plik `.env.example` z pustymi kluczami powinien być w repo (jest). NIE commituj `.env.local` z prawdziwymi kluczami.

### 1.5 Alternatywa: push do nowego repo (zamiast transferu)

Jeśli transfer nie działa (np. klientka nie akceptuje emaila):

1. Klientka tworzy puste repo na swoim koncie: https://github.com/new → nazwa `wyjazdy-z-dziecmi` → **Private** → bez README
2. Klientka dodaje Cię jako collaborator: repo → Settings → Collaborators → Invite → `TatianaG-ka`
3. Ty:
```bash
git remote set-url origin https://github.com/[KLIENTKA]/wyjazdy-z-dziecmi.git
git push origin master
```

---

## Faza 2: Developer — deploy na Vercel

### Kto ma konto Vercel?

**Rekomendacja:** Klientka zakłada konto Vercel (loguje się swoim GitHubem — tym na który przeniesiono repo). Wtedy ona jest właścicielem deployu i ma pełną kontrolę. Ty możesz być dodany jako Member.

**Alternatywa:** Deploy z Twojego konta Vercel — prostsze na start, ale klientka zależy od Ciebie. Jeśli wybierzesz tę opcję, zaloguj się swoim GitHubem i zaimportuj repo klientki (masz dostęp jako collaborator).

### 2.1 Załóż konto na Vercel

1. Wejdź na https://vercel.com/signup
2. Kliknij **"Continue with GitHub"** → zaloguj kontem GitHub **właściciela repo** (klientka lub Ty)
3. Autoryzuj Vercel

### 2.2 Importuj projekt

1. Na dashboardzie Vercel kliknij **"Add New… → Project"**
2. Znajdź repo `wyjazdy-z-dziecmi` na liście → kliknij **"Import"**
3. Ustawienia (Vercel wykryje Next.js automatycznie):
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `.` (domyślne)
   - Build Command: `npm run build` (domyślne)
   - Output Directory: `.next` (domyślne)
4. **NA RAZIE nie dodawaj env vars** — zrobimy to w Fazie 3
5. Kliknij **"Deploy"**

Build potrwa 2-3 minuty. Strona będzie dostępna pod adresem:
```
https://wyjazdy-z-dziecmi.vercel.app
```

**Uwaga:** Formularze nie będą jeszcze działać (brak kluczy API). Reszta strony powinna wyświetlać się poprawnie.

---

## Faza 3: Developer — serwisy zewnętrzne

Pełna instrukcja: `docs/setup-external-services.md`

Rób w tej kolejności:

### 3.1 Google Sheets (zapis formularz → arkusz)

Szczegóły: `setup-external-services.md` → sekcja 1

1. Utwórz projekt w Google Cloud Console
2. Włącz Google Sheets API
3. Utwórz Service Account → pobierz JSON z kluczem
4. Utwórz arkusz Google Sheets z 4 zakładkami (Rezerwacje, Kontakty, Newsletter, Lista oczekujących)
5. Udostępnij arkusz Service Accountowi (email z JSON → rola Edytor)

**Klucze do zapisania:**
- `GOOGLE_SHEETS_CLIENT_EMAIL` — z pliku JSON
- `GOOGLE_SHEETS_PRIVATE_KEY` — z pliku JSON
- `GOOGLE_SHEETS_SPREADSHEET_ID` — z URL arkusza

### 3.2 Resend (emaile do klientów)

Szczegóły: `setup-external-services.md` → sekcja 2

1. Załóż konto na https://resend.com
2. Stwórz API key
3. **Zweryfikuj domenę** `wyjazdyzdziecmi.pl` — dodaj rekordy SPF, DKIM, DMARC na Hostinger DNS

**Klucze do zapisania:**
- `RESEND_API_KEY`
- `FROM_EMAIL` = `Wyjazdy z Dziećmi <kontakt@wyjazdyzdziecmi.pl>`
- `OWNER_EMAIL` = `wyjazdyzdziecmi@gmail.com`

**Uwaga:** Rekordy DNS Resend (SPF, DKIM, DMARC) nie kolidują z rekordami Vercel (A, CNAME). Można ustawić równocześnie.

### 3.3 Cloudflare Turnstile (antyspam)

Szczegóły: `setup-external-services.md` → sekcja 3

1. Załóż konto na Cloudflare (darmowe, nie potrzebujesz domeny na CF)
2. Turnstile → Add Site → domeny: `wyjazdyzdziecmi.pl`, `www.wyjazdyzdziecmi.pl`, `localhost`
3. Widget type: Managed

**Klucze do zapisania:**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

### 3.4 Dodaj env vars na Vercel

1. Vercel → projekt → **Settings → Environment Variables**
2. Dodaj wszystkie klucze z kroków 3.1-3.3:

```
GOOGLE_SHEETS_CLIENT_EMAIL=...
GOOGLE_SHEETS_PRIVATE_KEY=...
GOOGLE_SHEETS_SPREADSHEET_ID=...
RESEND_API_KEY=...
FROM_EMAIL=Wyjazdy z Dziećmi <kontakt@wyjazdyzdziecmi.pl>
OWNER_EMAIL=wyjazdyzdziecmi@gmail.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
```

3. **Redeploy**: Deployments → najnowszy → ⋮ → **Redeploy**

---

## Faza 4: Developer — domena

Pełna instrukcja: `docs/instrukcja-domena-vercel.md`

### 4.1 Dodaj domenę w Vercel

1. Vercel → projekt → **Settings → Domains**
2. Dodaj `wyjazdyzdziecmi.pl` → Add
3. Dodaj `www.wyjazdyzdziecmi.pl` → Add
4. Vercel pokaże rekordy DNS — zapisz je

### 4.2 Ustaw DNS na Hostinger

Potrzebujesz dostępu do panelu Hostinger klientki. Opcje:
- Klientka udostępnia login/hasło (nie rekomendowane)
- Klientka robi to sama z Twoimi instrukcjami (screenshoty)
- Zróbcie to razem przez screenshare (rekomendowane)

**Na Hostinger:**
1. Domeny → `wyjazdyzdziecmi.pl` → DNS / Strefa DNS
2. Usuń istniejące rekordy A i CNAME (jeśli wskazują na parking Hostingera)
3. Dodaj rekordy z Vercela:
   - `A` — `@` → `76.76.21.21` (wartość z Vercela)
   - `CNAME` — `www` → `cname.vercel-dns.com` (wartość z Vercela)
4. Dodaj rekordy Resend (z Fazy 3.2):
   - `TXT` — SPF record
   - `TXT` — DKIM record (lub CNAME, zależy od Resend)
   - `TXT` — DMARC record

### 4.3 Poczekaj na propagację

- Zazwyczaj 5-30 minut
- Sprawdź status: Vercel → Settings → Domains → zielony „Valid Configuration"
- SSL (HTTPS) wygeneruje się automatycznie
- Test: otwórz `https://wyjazdyzdziecmi.pl` w przeglądarce

---

## Faza 5: Developer — CMS dla klientki

Pełna instrukcja: `setup-external-services.md` → sekcja 0

### 5.1 Stwórz GitHub App

GitHub App musi być utworzona na koncie **właściciela repo** (klientka, po transferze).

1. Zaloguj się na konto klientki (lub poproś ją) → https://github.com/settings/apps/new
2. Wypełnij wg instrukcji w `setup-external-services.md` krok 0.3
3. **Callback URL** — dodaj OBA:
   - `https://wyjazdy-z-dziecmi.vercel.app/api/keystatic/github/oauth/callback`
   - `https://wyjazdyzdziecmi.pl/api/keystatic/github/oauth/callback`
4. Skopiuj Client ID + wygeneruj Client Secret
5. Install App na repo `wyjazdy-z-dziecmi`

**Ważne:** Jeśli nie masz dostępu do konta klientki, możesz stworzyć GitHub App na swoim koncie — ale wtedy App musi być **publiczna** (Advanced → Make public) żeby klientka mogła się autoryzować.

### 5.2 Dodaj env vars Keystatic na Vercel

```
NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER=[KLIENTKA]
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=wyjazdy-z-dziecmi
KEYSTATIC_GITHUB_CLIENT_ID=<Client ID>
KEYSTATIC_GITHUB_CLIENT_SECRET=<Client Secret>
KEYSTATIC_SECRET=<losowy ciąg — wygeneruj: openssl rand -hex 32>
```

Zamień `[KLIENTKA]` na GitHub username klientki (właścicielka repo po transferze).

**Redeploy** po dodaniu.

### 5.3 Upewnij się że masz dostęp jako collaborator

Po transferze repo Ty (TatianaG-ka) automatycznie jesteś collaborator. Sprawdź:
1. Wejdź na `https://github.com/[KLIENTKA]/wyjazdy-z-dziecmi`
2. Powinieneś widzieć kod i móc pushować

### 5.4 Test CMS

1. Otwórz incognito: `https://wyjazdyzdziecmi.pl/keystatic`
2. Kliknij "Sign in with GitHub"
3. Powinien otworzyć się panel CMS z listą kolekcji

---

## Faza 6: Developer — testy końcowe

Przed oddaniem klientce, przetestuj WSZYSTKO:

### Formularze
- [ ] Rezerwacja — wypełnij formularz na stronie warsztatu → sprawdź Sheets (zakładka "Rezerwacje") + email na OWNER_EMAIL + email potwierdzenia
- [ ] Kontakt — wypełnij /kontakt → sprawdź Sheets + emaile
- [ ] Newsletter — zapisz się w stopce → sprawdź Sheets + email potwierdzenia
- [ ] Lista oczekujących — na warsztatcie z `spotsLeft: 0` → sprawdź Sheets + emaile

### CMS
- [ ] Zaloguj się na `/keystatic` → zmień drobną treść (np. tytuł opinii) → "Save" → sprawdź czy Vercel automatycznie zbudował nową wersję (~2 min)
- [ ] Cofnij zmianę

### Domena i SSL
- [ ] `https://wyjazdyzdziecmi.pl` — otwiera się poprawnie
- [ ] `https://www.wyjazdyzdziecmi.pl` — przekierowuje na wersję bez www (lub odwrotnie)
- [ ] Kłódka SSL (HTTPS) jest zielona
- [ ] `http://wyjazdyzdziecmi.pl` → automatyczny redirect na `https://`

### Strona
- [ ] Wszystkie podstrony się ładują (/, /wyjazdy, /o-nas, /kontakt, /blog, /inne-projekty)
- [ ] Zdjęcia się wyświetlają
- [ ] Kalendarz warsztatów działa
- [ ] Mobile — otwórz na telefonie, sprawdź menu hamburger

---

## Faza 7: Klientka — onboarding

### Co klientka musi zrobić:

**Krok 1:** Zaakceptować zaproszenie GitHub collaborator (email od GitHub → kliknij zielony przycisk "Accept invitation")

**Krok 2:** Wejść na `https://wyjazdyzdziecmi.pl/keystatic` → "Sign in with GitHub" → Authorize

**Krok 3:** Przeczytać instrukcje:
- `docs/instrukcja-cms.md` — jak edytować warsztaty, blog, opinie, zespół
- `docs/instrukcja-zarzadzanie.md` — jak działają formularze, gdzie trafiają dane, jak sprawdzać Sheets

### Co klientka NIE musi robić:
- Instalować niczego na komputerze
- Znać się na kodzie, GitHubie czy terminalu
- Płacić za GitHub (darmowe konto wystarczy)
- Logować się na Vercel (nie musi wiedzieć że istnieje)

### Rekomendacja: spotkanie onboardingowe (30 min)

Umów się z klientką na screenshare i pokaż:
1. Jak wejść do CMS i zmienić treść warsztatu
2. Jak dodać nowy warsztat
3. Jak sprawdzać arkusz Sheets z rezerwacjami
4. Gdzie są emaile z powiadomieniami

---

## Checklist końcowy

### Konta i dostępy:
- [ ] Klientka ma konto GitHub + jest collaborator na repo
- [ ] Klientka loguje się do CMS na `/keystatic`
- [ ] Klientka ma dostęp do arkusza Google Sheets z leadami
- [ ] Klientka dostaje emaile o rezerwacjach na `wyjazdyzdziecmi@gmail.com`

### Infrastruktura:
- [ ] Kod jest na GitHub (repo klientki)
- [ ] Vercel buduje i publikuje stronę z mastera
- [ ] Domena `wyjazdyzdziecmi.pl` wskazuje na Vercel
- [ ] SSL działa
- [ ] Formularze zapisują do Sheets + wysyłają emaile
- [ ] Turnstile chroni przed spamem
- [ ] CMS pozwala edytować treść

### Dokumenty przekazane klientce:
- [ ] `instrukcja-cms.md` — edycja treści
- [ ] `instrukcja-zarzadzanie.md` — zarządzanie rezerwacjami/leadami
- [ ] Dane logowania (w bezpieczny sposób — nie emailem)

---

## Co klientka dostaje na koniec

| Co | Gdzie | Kto zarządza |
|---|---|---|
| Strona internetowa | `wyjazdyzdziecmi.pl` | Auto (Vercel) |
| Panel CMS | `wyjazdyzdziecmi.pl/keystatic` | Klientka |
| Rezerwacje + kontakty | Arkusz Google Sheets | Klientka |
| Powiadomienia email | `wyjazdyzdziecmi@gmail.com` | Klientka |
| Kod źródłowy | GitHub `[KLIENTKA]/wyjazdy-z-dziecmi` | Klientka (owner), Developer (collaborator) |
| Hosting + deploy | Vercel | Developer (lub klientka) |
| Domena | Hostinger | Klientka |

### Koszty miesięczne (zależą od wybranej platformy):

| Usługa | Vercel Hobby | Vercel Pro | Coolify (VPS) |
|---|---|---|---|
| Hostinger — domena | ~4 zł/mies. | ~4 zł/mies. | ~4 zł/mies. |
| Hosting | $0 | $20/mies. (~80 zł) | ~$7/mies. (~28 zł) |
| GitHub, Sheets, Resend, Turnstile, Keystatic | 0 zł | 0 zł | 0 zł |
| **Razem** | **~4 zł/mies.** | **~84 zł/mies.** | **~32 zł/mies.** |

Porównanie platform → sekcja [Wybór platformy hostingowej](#wybór-platformy-hostingowej) na końcu dokumentu.

---

## Jak trafiają poprawki developera na stronę (po przekazaniu)

Po przekazaniu projektu klientce, Twój codzienny workflow wygląda tak:

```
1. git pull origin master          ← pobierz ewentualne zmiany klientki z CMS
2. (robisz poprawki w kodzie)
3. git add + git commit
4. git push origin master          ← push na repo klientki (masz dostęp jako collaborator)
5. Vercel automatycznie buduje     ← nowa wersja na wyjazdyzdziecmi.pl w ~2 min
```

**Klientka nie musi nic robić** — Twoje poprawki pojawiają się na stronie automatycznie.

**Ważne:** Klientka też edytuje treści przez CMS (`/keystatic`), co tworzy commity w tym samym repo. Dlatego ZAWSZE rób `git pull` przed rozpoczęciem pracy, żeby uniknąć konfliktów.

### Schemat:

```
Developer (Ty)                          Klientka (Maria)
     │                                        │
     │  git push ──────► GitHub repo ◄─────── CMS /keystatic (auto-commit)
     │                       │
     │                       ▼
     │                    Vercel
     │                       │
     │                       ▼
     │               wyjazdyzdziecmi.pl
```

Oboje pracujecie na tym samym repo, ale:
- **Ty** pushesz kod (poprawki, nowe funkcje) przez `git push`
- **Klientka** edytuje treści (warsztaty, blog, opinie) przez CMS w przeglądarce

---

## Powiązane dokumenty

| Dokument | Opis |
|---|---|
| `setup-external-services.md` | Szczegółowa konfiguracja Sheets, Resend, Turnstile, Keystatic |
| `instrukcja-domena-vercel.md` | Podłączenie domeny Hostinger → Vercel |
| `instrukcja-cms.md` | Instrukcja CMS dla klientki (edycja treści) |
| `instrukcja-zarzadzanie.md` | Instrukcja zarządzania stroną dla klientki (formularze, Sheets) |
| `instrukcja-developer.md` | Instrukcja dla przyszłego developera |

---

## Wybór platformy hostingowej

Analiza przeprowadzona 26.03.2026. Trzy realistyczne opcje dla tego projektu:

### Porównanie platform

| Kryterium | Vercel Hobby ($0) | Coolify na VPS (~$7/mies.) | Netlify Free ($0) |
|---|---|---|---|
| **Koszt** | $0 | ~$7/mies. (Hostinger KVM 2) | $0 |
| **Użytek komercyjny** | Zabroniony w ToS | Dozwolony | Dozwolony |
| **Limit deployów** | Bez limitu | Bez limitu | **~20/mies.** (nowe konta) |
| **CMS auto-deploy** | OK | OK | **Szybko zjada limit** |
| **ISR (revalidate)** | Natywne, pełne | Działa (single instance) | Działa (OpenNext adapter) |
| **API routes** | Serverless functions | Node.js always-on | Serverless functions |
| **Cold starts API** | ~1 sek | **Brak** (always-on) | **~3+ sek** |
| **Latencja PL** | Dobra (edge EU) | **Najlepsza** (VPS w EU) | Słaba (US East domyślnie) |
| **CDN** | Globalny (automatyczny) | Brak (dodaj Cloudflare free) | Globalny (automatyczny) |
| **Maintenance** | Zero | 1-2h/mies. (aktualizacje OS, Docker) | Zero |
| **Migracja z Vercel** | Już działa | 4-8h (Docker, Nixpacks) | 2-4h (zmiana env vars) |
| **next/image** | Vercel Image CDN | sharp (lokalnie) | Netlify Image CDN |
| **Preview deployments** | Automatyczne | Ręczne | Automatyczne |

### Rekomendacja

**1. Vercel Hobby ($0) — najprostsze, już działa**
- Ryzyko ToS: Vercel zabrania komercyjnego użycia na darmowym planie. Nie egzekwują aktywnie, ale mogą poprosić o upgrade lub wyłączyć bez ostrzeżenia
- Realistycznie: mała polska strona warsztatowa nie jest na radarze Vercela
- Wszystko działa idealnie — ISR, API, CMS, auto-deploy

**2. Coolify na Hostinger VPS (~28 zł/mies.) — legalnie i tanio**
- Klientka ma hosting na Hostinger, ale shared hosting (PHP) nie obsłuży Next.js
- VPS KVM 2 (8GB RAM, 2 vCPU) to minimum — **4GB RAM crashuje** przy buildzie Next.js
- Zero limitów deployów, bandwidth, API calls
- Serwer w EU (Holandia/Niemcy) — najszybsza opcja dla polskich użytkowników
- Wymaga: setup VPS (~2h), okazjonalne aktualizacje OS i Coolify (~1-2h/mies.)
- Opcja: buduj przez GitHub Actions (darmowe) → push Docker image → Coolify ciągnie gotowy obraz (eliminuje problem RAM przy buildzie)

**3. Netlify Free — NIE REKOMENDOWANE z nowym kontem**
- Konta założone po 04.09.2025 mają system kredytowy: ~20 deployów produkcyjnych/mies.
- Każdy commit Marysi z CMS = deploy = -15 kredytów z puli 300
- Przy codziennej edycji treści limit kończy się w ~3 tygodnie
- Cold starts API ~3+ sek — formularz rezerwacji będzie wolny
- Serverless functions domyślnie w US East — dodatkowe opóźnienie dla PL
- Jedyna przewaga nad Vercel Hobby: legalny użytek komercyjny
- **Wyjątek:** Jeśli masz stare konto Netlify (sprzed 04.09.2025) — stare limity są dużo lepsze (100GB bandwidth, 300 min build, 125k function calls)

### Decyzja

Wybór zależy od priorytetu klientki:

| Priorytet | Wybierz |
|---|---|
| Najmniej pracy, działa teraz | Vercel Hobby ($0) |
| Legalnie + tanio + szybkie API | Coolify (~28 zł/mies.) |
| Legalnie + zero maintenance | Vercel Pro (~84 zł/mies.) |

### Migracja na Coolify (jeśli wybrane)

Jeśli klientka zdecyduje się na Coolify, potrzebne zmiany w kodzie:
1. `next.config.ts` — dodaj `output: "standalone"`
2. `src/lib/api-security.ts` — usuń `VERCEL_PROJECT_PRODUCTION_URL`, dodaj URL VPS do `ALLOWED_ORIGINS`
3. Opcjonalnie: `Dockerfile` (lub użyj Nixpacks auto-detect)
4. Opcjonalnie: `nixpacks.toml` z `npm ci --legacy-peer-deps` (jeśli build fails)

Szczegółowa instrukcja Coolify: osobny dokument do stworzenia gdy klientka zdecyduje.
