# Kontekst: Migracja CF Workers + Airtable

Branch: `feature/cloudflare-airtable-migration`
Ostatnia aktualizacja: 2026-03-27

## Faza 0 — wyniki

- **@opennextjs/cloudflare 1.18.0** + **wrangler 4.77.0** zainstalowane
- **Build przechodzi** — `npx @opennextjs/cloudflare build` OK (Next.js 16.2.1)
- **Bundle size: 4.4MB compressed** — mieści się w limicie 10MB (CF Workers paid plan)
- **Bundle breakdown**: next (15MB), react-dom (1.3MB), google-auth-library (328KB), reszta mała
- **Ostrzeżenie**: "OpenNext is not fully compatible with Windows. Use WSL." — build przechodzi ale runtime może mieć problemy
- **ISR**: wymaga R2 + Durable Objects (paid). Obecny config: `incrementalCache: "dummy"`, `tagCache: "dummy"` = ISR wyłączone
- **open-next.config.ts**: wymagany z pełną konfiguracją (wrapper, converter, proxy, cache, queue, edgeExternals)
- **wrangler.jsonc**: compatibility_date 2025-05-05, nodejs_compat flag

### Nowe pliki dodane w Fazie 0
- `open-next.config.ts` — OpenNext adapter config
- `wrangler.jsonc` — CF Workers deployment config

### Odkryte z researchu (27.03.2026)
- **Bundle limit**: 10 MiB compressed (paid plan), NIE 25MB
- **ISR wymaga Durable Objects** = Workers Paid plan ($5/mies.) + R2 bucket
- **wrangler 4.65+** wymagany (peer dep)
- **@cloudflare/next-on-pages PORZUCONY** (ostatni update 09.2025, nie wspiera Next.js 16)
- **fs.readdir potwierdzone niedziałające** na Workers (GitHub issue #734)
- **Next.js 16.2.0 bug naprawiony** w adapter 1.17.3+ (prefetch-hints.json)

## Powiązane pliki

### Do przepisania
| Plik | Obecny stan | Docelowy stan |
|------|-------------|---------------|
| `src/lib/sheets.ts` | Google Sheets via google-auth-library | USUŃ → `src/lib/airtable.ts` (raw fetch) |
| `src/data/blog.ts` | fs.readdir + js-yaml + Markdoc.parse | Keystatic reader API |
| `src/lib/keystatic.ts` | `createReader(process.cwd(), config)` | Warunkowy: createGitHubReader (prod) / createReader (dev) |
| `src/lib/rate-limit.ts` | In-memory Map (synchroniczny) | CF KV (async) |

### Do modyfikacji
| Plik | Zmiana |
|------|--------|
| `src/lib/api-security.ts` | Dodaj `getCloudflareContext()` dla KV, rateLimit async |
| `src/lib/constants.ts` | VERCEL_PROJECT_PRODUCTION_URL → CF_PAGES_URL |
| `src/lib/email.ts` | Weryfikacja Resend SDK / fallback pre-render HTML |
| `src/app/api/booking/route.ts` | Import sheets → airtable |
| `src/app/api/contact/route.ts` | Import sheets → airtable |
| `src/app/api/newsletter/route.ts` | Import sheets → airtable |
| `src/app/api/waitlist/route.ts` | Import sheets → airtable |
| `src/app/(main)/blog/[slug]/page.tsx` | Markdoc rendering z Keystatic format |
| `package.json` | -google-auth-library, -js-yaml, +@opennextjs/cloudflare, +wrangler |

### Nowe pliki
| Plik | Cel |
|------|-----|
| `src/lib/airtable.ts` | Airtable REST API client (4 append funkcje) |
| `wrangler.toml` | CF Workers config (KV bindings, compatibility_flags) |
| `.dev.vars` | Lokalne secrets dla wrangler (gitignored) |

## Decyzje techniczne

1. **@opennextjs/cloudflare** nad @cloudflare/next-on-pages — aktywny rozwój, lepszy Next.js 16 support
2. **Keystatic blog reader** nad build-time JSON — blog w config, GitHub mode = HTTP, spójność z resztą data layer
3. **CF KV rate limiter** nad Durable Objects — prostszy, darmowy, eventual consistency akceptowalna
4. **Raw fetch() do Airtable** nad SDK — 0KB, prosty Bearer token
5. **React Email zostaje** — sprawdzimy bundle, fallback: pre-render do HTML

## Zależności

- Faza 1 (Airtable) i Faza 2 (blog) mogą być równoległe
- Faza 3 (Workers compat) wymaga Fazy 1+2
- Faza 4 (deploy) wymaga Fazy 3
- Faza 5 (testy) wymaga Fazy 4

## Env vars — zmiana

### Usunąć
- GOOGLE_SHEETS_CLIENT_EMAIL
- GOOGLE_SHEETS_PRIVATE_KEY
- GOOGLE_SHEETS_SPREADSHEET_ID
- VERCEL_PROJECT_PRODUCTION_URL

### Dodać
- AIRTABLE_API_KEY
- AIRTABLE_BASE_ID
- CF_PAGES_URL (auto-set przez CF)
- KEYSTATIC_GITHUB_TOKEN (jeśli jeszcze nie ustawiony)

### Zachować
- RESEND_API_KEY, FROM_EMAIL, OWNER_EMAIL
- TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY
- NEXT_PUBLIC_TURNSTILE_SITE_KEY
- NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER, NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO
- KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET

## Ryzyka

| Ryzyko | Mitygacja |
|--------|-----------|
| Bundle >25MB | Mierz w Fazie 0. Fallback: HTML email templates |
| @opennextjs/cloudflare + Next.js 16.2 | Pin wersje. Fallback: @cloudflare/next-on-pages |
| React Email na Workers | Pre-render do HTML |
| ISR nie wspierane | SSG + CF Cache Rules + daily rebuild cron |
| Keystatic blog reader bug | Build-time JSON fallback |

## Workflow po każdej fazie

1. Implementacja fazy → `/dev-docs-execute`
2. Code review fazy → `/dev-docs-review`
3. Naprawienie uwag z review
4. Zamknięcie fazy → `/dev-docs-complete`
5. Przejście do kolejnej fazy

## Wcześniejszy research

- `docs/decyzja-hosting-platforma.md` — pełne porównanie platform
- `docs/lessons-learned.md` — sekcja "Deployment & Handover 26.03.2026"
- `docs/poprawki/poprawki_27.03/railway.md` — analiza Railway (odrzucone)
