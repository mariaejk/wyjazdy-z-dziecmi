# Code Review — Faza 0: Przygotowanie infrastruktury

Data: 2026-03-27
Reviewer: code-architecture-reviewer agent

## Pliki sprawdzone

1. `open-next.config.ts` — konfiguracja adaptera OpenNext
2. `wrangler.jsonc` — konfiguracja CF Workers
3. `package.json` — nowe devDependencies
4. `.gitignore` — dodane .open-next/ i .dev.vars

## Problemy

### 🔴 [blocking] (1)

1. **`package.json`** — Brak skryptów CF (`build:cf`, `preview`, `deploy`). Bez nich Faza 4 (deploy) nie ma standardowej komendy. Każdy developer musi pamiętać `npx @opennextjs/cloudflare build`.

### 🟠 [important] (3)

1. **`wrangler.jsonc`** — Brak `kv_namespaces` placeholder. Faza 3 wymaga KV binding. Warto przygotować strukturę teraz (zakomentowaną).
2. **`package.json`** — `eslint-config-next` pinowane `"16.1.6"` (bez `^`) vs `next: "^16.2.1"` — niespójność wersji.
3. **`open-next.config.ts`** — Brak ostrzeżenia o Windows/WSL w kodzie. Info jest w kontekst.md ale developer otwierający plik nie zobaczy.

### 🟡 [nit] (4)

1. **`wrangler.jsonc`** — Brak `$schema` (autouzupełnianie w VS Code).
2. **Brak `.dev.vars.example`** — lista wymaganych secretów dla nowych developerów.
3. **`.gitignore`** — Brak `.wrangler/` (katalog cache wranglera, potrzebny po Fazie 3).
4. **`open-next.config.ts`** — Brak komentarza że `incrementalCache: "dummy"` to świadoma decyzja (bez ISR).

### 🔵 [suggestion] (0)

Brak.

## Ogólna ocena

**Pozytywna.** Konfiguracja jest kompletna i poprawna:
- `open-next.config.ts`: wrapper/converter/proxy/cache/queue/edgeExternals prawidłowe
- `wrangler.jsonc`: compatibility_date 2025-05-05 (powyżej minimum), nodejs_compat obecny
- Build przechodzi, bundle 4.4MB compressed (limit 10MB)
- `.gitignore` pokrywa build output i secrets

1 blocking do naprawienia przed Fazą 1. Reszta to ulepszenia.
