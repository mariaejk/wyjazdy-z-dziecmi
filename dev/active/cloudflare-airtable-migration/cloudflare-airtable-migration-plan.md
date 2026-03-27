# Plan: Migracja Vercel + Google Sheets → Cloudflare Workers + Airtable

Branch: `feature/cloudflare-airtable-migration`
Ostatnia aktualizacja: 2026-03-27

## Cel

Migracja landing page wyjazdyzdziecmi.pl z Vercel Hobby (łamie ToS dla komercji) na Cloudflare Workers ($5/mies.). Zamiana Google Sheets (google-auth-library niekompatybilna z Workers) na Airtable (prosty REST API).

## Zakres

- Zamiana data storage: Google Sheets → Airtable (4 tabele)
- Migracja blog reader: fs.readdir → Keystatic reader (GitHub mode)
- Rate limiting: in-memory Map → Cloudflare KV
- Build adapter: @opennextjs/cloudflare
- ISR → SSG + CF Cache Rules (jeśli ISR nie wspierane)
- DNS cutover: Hostinger DNS → CF Workers

## Fazy

### Faza 0: Przygotowanie infrastruktury (2-3h)
- Setup Airtable (4 tabele, Personal Access Token)
- Setup CF projekt + KV namespace RATE_LIMIT
- Instalacja @opennextjs/cloudflare + wrangler
- Weryfikacja build

### Faza 1: Google Sheets → Airtable (3-4h)
- `src/lib/sheets.ts` → `src/lib/airtable.ts`
- Aktualizacja importów w 4 API routes
- Usunięcie google-auth-library
- Env vars: AIRTABLE_API_KEY, AIRTABLE_BASE_ID

### Faza 2: Blog fs → Keystatic reader (2-3h)
- `src/data/blog.ts` → Keystatic reader API
- `src/lib/keystatic.ts` → warunkowy createGitHubReader
- Usunięcie js-yaml dependency
- Dostosowanie Markdoc rendering

### Faza 3: Workers compatibility (4-6h)
- 3a: Rate limiting → CF KV (async)
- 3b: Constants → CF_PAGES_URL
- 3c: Email → weryfikacja Resend / pre-render HTML
- 3d: ISR → SSG + cache headers (jeśli potrzebne)
- 3e: wrangler.toml + build config

### Faza 4: Deploy + DNS (3-4h)
- Deploy na CF staging
- Test 17 stron + 4 formularzy
- Bundle size check (<25MB)
- DNS cutover

### Faza 5: Testy + cleanup (2-3h)
- Testy funkcjonalne + Lighthouse
- Aktualizacja dokumentacji
- Zamknięcie brancha

## Kluczowe decyzje

| Decyzja | Wybór | Powód |
|---------|-------|-------|
| Adapter CF | @opennextjs/cloudflare | Aktywny rozwój, Next.js 16 support |
| Blog | Keystatic reader | Już w config, GitHub mode = HTTP, zero fs |
| Rate limiting | CF KV | Prosty, darmowy, eventual consistency OK |
| Email | React Email (zostaje) | Sprawdzimy bundle. Fallback: HTML strings |
| Airtable | Raw fetch() | 0KB overhead, prosty Bearer auth |

## Kryteria akceptacji

- [ ] Strona działa na CF Workers production domain
- [ ] 4 formularze zapisują do Airtable + wysyłają emaile
- [ ] Blog renderuje 3 posty z Keystatic reader
- [ ] Keystatic admin działa (GitHub OAuth)
- [ ] Rate limiting persystuje między requestami (KV)
- [ ] Redirects (3x 301) działają
- [ ] Security headers obecne
- [ ] Bundle <25MB
- [ ] Lighthouse score porównywalny z Vercel

## Szacowany nakład: 16-23h
