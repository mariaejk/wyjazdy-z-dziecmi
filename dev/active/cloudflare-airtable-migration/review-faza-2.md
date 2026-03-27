# Code Review — Faza 2: Blog fs → Keystatic reader

Data: 2026-03-27
Reviewer: code-architecture-reviewer agent

## Pliki sprawdzone

1. `src/data/blog.ts` — przepisany na Keystatic reader
2. `src/lib/keystatic.ts` — komentarz, bez zmian logiki

## Problemy

### 🔴 [blocking] (2)

1. **`src/data/blog.ts:65`** — `resolveLinkedFiles` behavior fragile. Bez tej opcji `entry.content` jest lazy function, a `.node` zwraca `undefined` bez błędu. Dodać komentarz wyjaśniający + runtime guard.
2. **`src/data/blog.ts`** — Brak `warnInvalidSlug()`. Każdy inny reader w projekcie (trips, team, testimonials, projects) wywołuje `warnInvalidSlug(slug, "blog")`. Blog reader pomija — błędne slugi znikają bez diagnostyki.

### 🟠 [important] (3)

1. **`src/data/blog.ts:48`** — `getLatestBlogPosts` niepotrzebnie w `cache()`. `getAllBlogPosts()` jest już cached. Inne derived readery (np. `getUpcomingTrips`) to plain async functions.
2. **`src/data/blog.ts`** — Brak eksportowanego typu `BlogPostWithContent` dla return z `getBlogPost`. Richer shape (z `content`) powinien mieć swój typ.
3. **`src/data/blog.ts:42`** — Sort `localeCompare` działa tylko bo format to YYYY-MM-DD. `trips.ts` używa `parseLocalDate().getTime()`. Niespójność z resztą projektu.

### 🟡 [nit] (0)

Brak.

## Pozytywne

- Keystatic reader API prawidłowo użyte (list/read)
- `Markdoc.transform(entry.content.node)` → kompatybilny RenderableTreeNode
- `isSafeSlug()` zachowany (path traversal guard)
- `React.cache()` na getAllBlogPosts (spójne z innymi readerami)
- blog/[slug]/page.tsx nie wymagał zmian — backwards compatible
- js-yaml i @types/js-yaml poprawnie usunięte
