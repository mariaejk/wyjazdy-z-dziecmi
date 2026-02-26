# Kontekst: Faza 1 — Fundament

Branch: `feature/faza1-fundament`
Ostatnia aktualizacja: 2026-02-27

---

## Powiązane pliki

### Pliki źródłowe (czytaj)
| Plik | Zawartość |
|------|-----------|
| `CLAUDE.md` | Instrukcje projektu, stos, ograniczenia, design system |
| `dev/plan.md` | Plan implementacji v1.1 (78 zadań, 5 faz) |
| `dev/task.md` | Task checklist z checkboxami |
| `docs/tresc_na_strone.md` | Treści: hero, O nas, menu, stopka |
| `docs/UI_przyklad.md` | Wytyczne UI: kolory, typografia, layout |
| `docs/PRD_Wyjazdy_z_Dziecmi.md` | PRD: persony, KPI, mapa strony, wymagania |

### Pliki do utworzenia (Faza 1)
| Plik | Etap |
|------|------|
| `src/app/globals.css` | 1B (1.4) |
| `src/app/layout.tsx` | 1E (1.16) |
| `src/app/page.tsx` | 1E (placeholder) |
| `src/app/loading.tsx` | 1E (1.17) |
| `src/app/error.tsx` | 1E (1.18) |
| `src/lib/constants.ts` | 1C (1.7) |
| `src/lib/utils.ts` | 1C (1.8) |
| `src/data/navigation.ts` | 1C (1.9) |
| `src/types/trip.ts` | 1C (1.10) |
| `src/types/team.ts` | 1C (1.10) |
| `src/types/place.ts` | 1C (1.10) |
| `src/types/forms.ts` | 1C (1.10) |
| `src/components/layout/SkipToContent.tsx` | 1D (1.11) |
| `src/components/layout/Container.tsx` | 1D (1.12) |
| `src/components/layout/Header.tsx` | 1D (1.13) |
| `src/components/layout/MobileMenu.tsx` | 1D (1.14) |
| `src/components/layout/Footer.tsx` | 1D (1.15) |
| `public/images/*` | 1B (1.6) |
| `.env.example` | 1A (1.3) |

### Obrazy — mapowanie
| Źródło (`docs/Images/`) | Cel (`public/images/`) | Rozmiar źródłowy | Użycie |
|--------------------------|------------------------|-------------------|--------|
| `logo.jpeg` | `logo.jpeg` | 38KB | Header, OG |
| `image_1.jpg` | `hero.jpg` | 191KB | Hero / tło |
| `image_2.jpg` | `galeria-1.jpg` | 255KB | Galeria |
| `image_3.jpg` | `kacze-bagno.jpg` | 407KB | O nas / miejsce |
| `image_4.jpg` | `matka-corka.jpg` | 306KB | Karta wyjazdu |
| `image_5.png` | `yoga-konie.jpg` | 1.3MB! | Karta wyjazdu — **PRIORYTET resize** |

---

## Decyzje techniczne

### Potwierdzone (z CLAUDE.md / plan.md)
1. **`motion` (nie `framer-motion`)** — import: `import { motion, AnimatePresence } from 'motion/react'`
2. **Tailwind v4** — `@import "tailwindcss"` + `@theme {}` (nie stare dyrektywy)
3. **`lang="pl"`** na `<html>` w `layout.tsx`
4. **Fonty self-hosted** przez `next/font/local` (nie Google Fonts CDN, RODO-friendly)
5. **Logo jako raster JPG** — brak pliku wektorowego, `next/image`
6. **`color-scheme: light`** w globals.css

### Do rozstrzygnięcia w trakcie implementacji
1. **Pliki fontów .woff2** — skąd pobrać? Opcje: fontsource npm, google-webfonts-helper, pobieranie ręczne
2. **Header scroll behavior** — transparent → solid na scroll, czy od razu solid? (Proponuję: solid od razu na MVP)
3. **MobileMenu animacja** — slide from left/right/top? (Proponuję: slide from right)
4. **image_5.png konwersja** — sharp CLI vs ręczny resize? (Proponuję: ręczny resize + sharp jeśli dostępny)

---

## Zależności zewnętrzne

### Pakiety npm (do zainstalowania w 1.2)
```
motion                  — animacje (React 19 compatible)
react-hook-form         — formularze (używane od Fazy 3)
zod                     — walidacja (używane od Fazy 3)
@hookform/resolvers     — bridge RHF ↔ Zod (używane od Fazy 3)
lucide-react            — ikony liniowe
clsx                    — conditional classnames
tailwind-merge          — merge Tailwind classes
```

### Pliki fontów potrzebne
- **Playfair Display**: Regular (400), Bold (700) — .woff2
- **Inter**: Regular (400), Medium (500), SemiBold (600) — .woff2

---

## Nawigacja (z treści)

Menu główne (z `docs/tresc_na_strone.md`):
1. O nas → `/o-nas`
2. Wyjazdy → `/wyjazdy`
3. Single Parents → `/single-parents`
4. Opinie → `/opinie`
5. Kontakt → `/kontakt`

Footer links:
- Regulamin → `/regulamin`
- Polityka prywatności → `/polityka-prywatnosci`
- Ustawienia cookies → (placeholder, onclick handler w Fazie 5)

---

## Kontakt (z treści)

- Email: wyjazdyzdziecmi@gmail.com
- Telefon: +48 503 098 906
- Facebook: (do uzupełnienia)
- Instagram: (do uzupełnienia)

---

## Notatki sesji

### Sesja 1 (2026-02-26) — Planowanie
- Utworzono branch `feature/faza1-fundament`
- Przeanalizowano plan.md, task.md, kontekst.md, treści, UI, PRD
- Stworzono dokumentację Fazy 1 (plan, kontekst, zadania)
- Gotowe do implementacji: `/dev-docs-execute dev/active/faza1-fundament`

### Sesja 2 (2026-02-27) — Etap 1A: Inicjalizacja
- Zainicjalizowano projekt Next.js **16.1.6** (nie 15 — @latest dał v16, kompatybilny wstecz)
- React **19.2.3**, Turbopack domyślnie
- Zainstalowano wszystkie zależności (motion, RHF, Zod, Lucide, clsx, tailwind-merge)
- Utworzono `.env.example`, zaktualizowano `.gitignore`
- Poprawiono `package.json` name z "temp-next" na "wyjazdy-z-dziecmi"
- Dev server testowo uruchomiony — HTTP 200 OK

**Decyzja:** Użyto Next.js 16 zamiast 15 (plan mówi 15, ale @latest daje 16). API App Router jest identyczne. React 19 + motion działa bez zmian.

### Sesja 2 kontynuacja — Etap 1B: Design System i fonty
- `globals.css` skonfigurowany: `@import "tailwindcss"` + `@theme` z 6 kolorami + 2 fontami
- Dodano globalne style: `color-scheme: light`, `scroll-behavior: smooth`, `:focus-visible`, `::selection`
- Fonty załadowane przez `next/font/google` (auto self-hosting, pliki serwowane z domeny, zero requestów do Google)
- Obrazy skopiowane z semantycznymi nazwami: hero.jpg, galeria-1.jpg, kacze-bagno.jpg, matka-corka.jpg, yoga-konie.jpg, logo.jpeg
- `image_5.png` (1.3MB) → zoptymalizowany `yoga-konie.jpg` (256KB, -80%) przez sharp-cli
- `page.tsx` tymczasowo zastąpiony stroną testową z design tokenami
- `npm run build` PASS, dev server HTTP 200

**Decyzja:** Użyto `next/font/google` zamiast `next/font/local` — efekt identyczny (auto self-hosting w Next.js), mniej pracy z plikami .woff2. RODO OK — zero requestów do Google w runtime.
