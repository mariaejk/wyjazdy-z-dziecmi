# Wyjazdy z Dziećmi — wyjazdyzdziecmi.pl

Landing page / sales funnel dla marki "Wyjazdy z Dziećmi" — rodzinne wyjazdy warsztatowe w naturze (joga, taniec, ceramika, konie).

## Tech Stack

- **Next.js 16** (App Router, SSG) + **TypeScript** + **Tailwind CSS v4**
- **React 19** + **Turbopack**
- **Motion 12** (`motion/react`) — animacje
- **Keystatic CMS** — edycja treści przez panel `/keystatic`
- **Vercel** — hosting i deployment

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Build produkcyjny
npm run lint       # ESLint
```

## CMS (Keystatic)

Panel administracyjny do edycji treści dostępny pod `/keystatic`.

- Instrukcja dla klienta: **[docs/instrukcja-cms.md](docs/instrukcja-cms.md)**
- Konfiguracja: `keystatic.config.ts`
- Dane: pliki YAML/Markdoc w folderze `content/`
- Autentykacja: HTTP Basic Auth (env vars `KEYSTATIC_ADMIN_USER` / `KEYSTATIC_ADMIN_PASSWORD`)

### Co mozna edytowac przez CMS

- Wyjazdy (treści, ceny, program, FAQ, galeria)
- Opinie uczestników
- Zespół (bio, zdjęcia)
- Blog (artykuły z edytorem Markdoc)
- Galeria zdjęć
- Miejsca/ośrodki
- Ustawienia strony głównej

## Struktura projektu

```
content/             — treści CMS (YAML, Markdoc)
docs/                — dokumentacja, instrukcje, materiały źródłowe
public/images/       — zdjęcia (JPG)
src/app/             — strony Next.js (App Router)
src/components/      — komponenty React
src/data/            — warstwa danych (czyta z Keystatic)
src/lib/             — utils, constants, rate-limit, analytics
src/types/           — typy TypeScript
keystatic.config.ts  — schemat CMS
```

## Keystatic na Vercel (GitHub mode)

Lokalnie Keystatic edytuje pliki na dysku. Na Vercel (read-only filesystem) potrzebny jest **GitHub mode** — Keystatic czyta/zapisuje bezpośrednio do repozytorium.

### Konfiguracja

1. **GitHub OAuth App** — stwórz na github.com → Settings → Developer settings → OAuth Apps:
   - Homepage URL: `https://wyjazdy-z-dziecmi.vercel.app`
   - Callback URL: `https://wyjazdy-z-dziecmi.vercel.app/api/keystatic/github/oauth/callback`
2. **Env vars na Vercel** (Settings → Environment Variables):
   ```
   NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER=TatianaG-ka
   NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=wyjazdy-z-dziecmi
   KEYSTATIC_GITHUB_CLIENT_ID=<client-id>
   KEYSTATIC_GITHUB_CLIENT_SECRET=<client-secret>
   KEYSTATIC_SECRET=<openssl rand -hex 32>
   ```
3. Redeploy na Vercel → panel CMS dostępny pod `/keystatic`

### Jak działa

- Edycja w panelu → commit w repo → Vercel automatycznie buduje nową wersję
- Logowanie przez GitHub (trzeba mieć dostęp do repo)
- Lokalnie (`npm run dev`) panel działa bez logowania i bez tych env vars

## Zmienne środowiskowe

Patrz `.env.example` — Google Analytics, Clarity, webhooks, Keystatic auth i GitHub mode.

## Dla nowego developera

1. Sklonuj repo: `git clone https://github.com/TatianaG-ka/wyjazdy-z-dziecmi.git`
2. `npm install`
3. Skopiuj `.env.example` → `.env.local` i uzupełnij potrzebne wartości
4. `npm run dev` → http://localhost:3000
5. Panel CMS: http://localhost:3000/keystatic (bez logowania lokalnie)
6. Treści w `content/` (YAML/Markdoc) — edytuj przez panel lub bezpośrednio w plikach
7. Po zmianach: commit + push → Vercel automatycznie deployuje
