# Zadania: Migracja CF Workers + Airtable

Branch: `feature/cloudflare-airtable-migration`
Ostatnia aktualizacja: 2026-03-27

## Faza 0: Przygotowanie infrastruktury (2-3h)

- [x] 0.1 Utworzenie brancha `feature/cloudflare-airtable-migration`
- [ ] 0.2 Setup Airtable: baza z 4 tabelami (Rezerwacje, Kontakty, Newsletter, ListaOczekujacych) ⚠️ WYMAGA RĘCZNEJ KONFIGURACJI W DASHBOARD
- [ ] 0.3 Airtable: Personal Access Token z `data.records:write` ⚠️ WYMAGA RĘCZNEJ KONFIGURACJI
- [ ] 0.4 Setup CF Pages/Workers projekt ⚠️ WYMAGA RĘCZNEJ KONFIGURACJI W DASHBOARD
- [ ] 0.5 Utworzenie KV namespace `RATE_LIMIT` ⚠️ WYMAGA RĘCZNEJ KONFIGURACJI
- [x] 0.6 `npm install -D @opennextjs/cloudflare wrangler` — v1.18.0 + v4.77.0
- [x] 0.7 Weryfikacja: `npx @opennextjs/cloudflare build` startuje ✅ BUILD OK
- [x] 0.7a Utworzenie `open-next.config.ts` (wymagane przez adapter)
- [x] 0.7b Utworzenie `wrangler.jsonc` (CF Workers config)
- [x] 0.7c Sprawdzenie bundle size: **4.4MB compressed** (limit 10MB) ✅ MIEŚCI SIĘ
- [x] 0.8 **Review fazy 0** → `/dev-docs-review` ✅ DONE

## Do poprawy po review fazy 0

- [x] 🔴 [blocking] **package.json** — Dodać skrypty CF: `build:cf`, `preview`, `deploy`
- [x] 🟠 [important] **wrangler.jsonc** — Dodać zakomentowany `kv_namespaces` placeholder
- [x] 🟠 [important] **package.json** — Poprawić `eslint-config-next` z `"16.1.6"` na `"^16.2.1"`
- [x] 🟠 [important] **open-next.config.ts** — Dodać komentarz o Windows/WSL warning
- [x] 🟡 [nit] **wrangler.jsonc** — Dodać `$schema` dla autouzupełniania
- [x] 🟡 [nit] **.gitignore** — Dodać `.wrangler/`
- [x] 🟡 [nit] **open-next.config.ts** — Komentarz o `incrementalCache: "dummy"` (bez ISR)
- [x] 🟡 [nit] Utworzyć `.dev.vars.example` z listą secretów

- [x] 0.9 **Zamknięcie fazy 0** → `/dev-docs-complete` ✅ DONE 2026-03-27

## Faza 1: Google Sheets → Airtable (3-4h)

- [x] 1.1 Utworzenie `src/lib/airtable.ts` z 4 funkcjami append
- [x] 1.2 `appendBooking()` — 13 pól → Airtable Rezerwacje
- [x] 1.3 `appendContact()` — 7 pól → Airtable Kontakty
- [x] 1.4 `appendNewsletter()` — 4 pola → Airtable Newsletter
- [x] 1.5 `appendWaitlist()` — 7 pól → Airtable ListaOczekujacych
- [x] 1.6 Aktualizacja importu w `src/app/api/booking/route.ts`
- [x] 1.7 Aktualizacja importu w `src/app/api/contact/route.ts`
- [x] 1.8 Aktualizacja importu w `src/app/api/newsletter/route.ts`
- [x] 1.9 Aktualizacja importu w `src/app/api/waitlist/route.ts`
- [x] 1.10 Usunięcie `src/lib/sheets.ts`
- [x] 1.11 `npm uninstall google-auth-library`
- [x] 1.12 Aktualizacja `.env.example` (usunąć GOOGLE_SHEETS_*, dodać AIRTABLE_*)
- [x] 1.13 `npm run build` przechodzi ✅
- [ ] 1.14 Test manualny: formularz booking → wiersz w Airtable ⏳ ODŁOŻONE (brak Airtable setup)
- [ ] 1.15 Test manualny: formularz contact → wiersz w Airtable ⏳ ODŁOŻONE
- [ ] 1.16 Test manualny: formularz newsletter → wiersz w Airtable ⏳ ODŁOŻONE
- [ ] 1.17 Test manualny: formularz waitlist → wiersz w Airtable ⏳ ODŁOŻONE
- [x] 1.18 **Review fazy 1** → `/dev-docs-review` ✅ DONE

## Do poprawy po review fazy 1

- [x] 🔴 [blocking] **src/lib/airtable.ts** — Dodać `sanitizeCell()` + `sanitizeFields()` wrapper
- [x] 🟠 [important] **4 API routes** — Zmienić komentarze `// Google Sheets + emails` → `// Airtable + emails`
- [x] 🟠 [important] **src/lib/airtable.ts** — Poprawić typy opcjonalnych pól (childrenAges?, dietaryNeeds?, notes?) + `??` zamiast `||`

- [x] 1.19 Naprawa uwag z review ✅
- [x] 1.20 **Zamknięcie fazy 1** → `/dev-docs-complete` ✅ DONE 2026-03-27

## Faza 2: Blog fs → Keystatic reader (2-3h)

- [x] 2.1 Aktualizacja `src/lib/keystatic.ts` — komentarz, createGitHubReader w Fazie 3
- [x] 2.2 Przepisanie `src/data/blog.ts` → Keystatic reader API
- [x] 2.3 Dodanie `React.cache()` wrapperów na blog functions
- [x] 2.4 Zachowanie `isSafeSlug()` walidacji
- [x] 2.5 `blog/[slug]/page.tsx` — bez zmian (Markdoc.renderers.react kompatybilny)
- [x] 2.6 `npm uninstall js-yaml @types/js-yaml`
- [x] 2.7 `npm run build` przechodzi ✅ (29 stron)
- [ ] 2.8 Test: `/blog` wyświetla 3 posty ⏳ ODŁOŻONE (testy wizualne później)
- [ ] 2.9 Test: `/blog/[slug]` renderuje Markdoc content poprawnie ⏳ ODŁOŻONE
- [ ] 2.10 Test: BlogTeaser na homepage pokazuje 3 posty ⏳ ODŁOŻONE
- [ ] 2.11 Test: sitemap zawiera blog posts ⏳ ODŁOŻONE
- [x] 2.12 **Review fazy 2** → `/dev-docs-review` ✅ DONE

## Do poprawy po review fazy 2

- [x] 🔴 [blocking] **src/data/blog.ts** — Runtime guard na `entry.content.node` + komentarz o `resolveLinkedFiles`
- [x] 🔴 [blocking] **src/data/blog.ts** — Dodano `warnInvalidSlug(slug, "blog")`
- [x] 🟠 [important] **src/data/blog.ts** — `getLatestBlogPosts` plain async function
- [x] 🟠 [important] **src/data/blog.ts** — Eksport typu `BlogPostWithContent`
- [x] 🟠 [important] **src/data/blog.ts** — Sort: `parseLocalDate().getTime()`

- [x] 2.13 Naprawa uwag z review ✅
- [x] 2.14 **Zamknięcie fazy 2** → `/dev-docs-complete` ✅ DONE 2026-03-27

## Faza 3: Workers compatibility (4-6h)

- [ ] 3.1 Przepisanie `src/lib/rate-limit.ts` → async z KV namespace
- [ ] 3.2 Aktualizacja `src/lib/api-security.ts` — getCloudflareContext() + async rateLimit
- [ ] 3.3 Aktualizacja `src/lib/constants.ts` — CF_PAGES_URL zamiast VERCEL_*
- [ ] 3.4 Weryfikacja Resend SDK na Workers runtime
- [ ] 3.5 (Jeśli potrzebne) Zmiana email.ts na pre-render HTML + resend html option
- [ ] 3.6 Sprawdzenie ISR support w @opennextjs/cloudflare
- [ ] 3.7 (Jeśli ISR nie działa) Usunięcie `revalidate`, dodanie CF Cache Rules
- [ ] 3.8 Utworzenie `wrangler.toml` (KV bindings, nodejs_compat)
- [ ] 3.9 Aktualizacja `package.json` scripts (build:cf, preview)
- [ ] 3.10 Utworzenie `.dev.vars` (gitignored) z sekretami
- [ ] 3.11 `wrangler dev` serwuje stronę lokalnie
- [ ] 3.12 Test: API routes działają w Workers runtime
- [ ] 3.13 Test: rate limiter persystuje między requestami
- [ ] 3.14 Test: emaile wysyłają się poprawnie
- [ ] 3.15 Sprawdzenie bundle size (<25MB)
- [ ] 3.16 **Review fazy 3** → `/dev-docs-review` + `code-architecture-reviewer`
- [ ] 3.17 Naprawa uwag z review
- [ ] 3.18 **Zamknięcie fazy 3** → `/dev-docs-complete`

## Faza 4: Deploy + DNS (3-4h)

- [ ] 4.1 Deploy na CF Workers staging URL
- [ ] 4.2 Test wszystkich 17 stron na staging
- [ ] 4.3 Test 4 formularzy na staging
- [ ] 4.4 Weryfikacja Keystatic admin (GitHub OAuth)
- [ ] 4.5 Weryfikacja 301 redirects
- [ ] 4.6 Weryfikacja security headers
- [ ] 4.7 Aktualizacja ALLOWED_ORIGINS z CF domain
- [ ] 4.8 DNS cutover: wyjazdyzdziecmi.pl → CF Workers
- [ ] 4.9 Weryfikacja na production domain
- [ ] 4.10 **Review fazy 4** → `/dev-docs-review`
- [ ] 4.11 **Zamknięcie fazy 4** → `/dev-docs-complete`

## Faza 5: Testy + cleanup (2-3h)

- [ ] 5.1 Pełne testy funkcjonalne (17 stron, 4 formularze, rate limit, honeypot, Turnstile)
- [ ] 5.2 Lighthouse comparison (before vs after)
- [ ] 5.3 Sprawdzenie SEO (sitemap, robots, meta tags, OG images)
- [ ] 5.4 Aktualizacja CLAUDE.md (nowy hosting, Airtable, CF Workers)
- [ ] 5.5 Aktualizacja `docs/setup-external-services.md`
- [ ] 5.6 Aktualizacja `docs/instrukcja-developer.md`
- [ ] 5.7 Aktualizacja `docs/instrukcja-przekazanie-projektu.md`
- [ ] 5.8 Merge do mastera
- [ ] 5.9 Usunięcie brancha
- [ ] 5.10 (Po 1 tygodniu stabilności) Usunięcie Vercel projektu
- [ ] 5.11 **Finalny code review** → `/dev-docs-review` + `code-review` skill
- [ ] 5.12 **Zamknięcie fazy 5** → `/dev-docs-complete`

## Podsumowanie

| Faza | Zadania | Szacowany czas |
|------|---------|----------------|
| 0 | 9 | 2-3h |
| 1 | 20 | 3-4h |
| 2 | 14 | 2-3h |
| 3 | 18 | 4-6h |
| 4 | 11 | 3-4h |
| 5 | 12 | 2-3h |
| **Razem** | **84** | **16-23h** |
