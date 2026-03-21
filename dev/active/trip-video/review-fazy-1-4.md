## Code Review: trip-video — fazy 1–4 (końcowy)

### Podsumowanie
✅ Gotowe do merge — czysta, minimalna implementacja. Jeden drobny problem dostępności.

### Statystyki
- Plików sprawdzonych: 6 (kod) + 1 (YAML)
- 🔴 [blocking]: 0
- 🟠 [important]: 1
- 🟡 [nit]: 1
- 🔵 [suggestion]: 1

### Problemy

#### 🟠 [important] Poważne

1. **`TripVideo.tsx:15`** — Brak dostępności `<video>` dla screen readerów
   - Problem: `<video>` nie ma `aria-label` ani otaczającego kontekstu tekstowego. Screen reader nie wie co to za treść.
   - Rozwiązanie: Dodać `aria-label="Film promocyjny z warsztatów"` na `<video>` lub wizualnie ukryty nagłówek nad wideo.

#### 🟡 [nit] Drobne

1. **`TripVideo.tsx:19`** — `object-cover` na `<video>` może przycinać treść
   - Na wideo (nie obrazie) `object-cover` może obciąć krawędzie filmu jeśli proporcje nie pasują do 16:9. `object-contain` byłby bezpieczniejszy, ale zostawiłby letterbox. Przy wideo nagranym w 16:9 `object-cover` jest OK.

#### 🔵 [suggestion] Sugestie

1. **Przyszłość: `.webm` fallback** — Dodanie `<source src="..." type="video/webm">` przed mp4 pozwoliłoby serwować mniejszy plik na Chrome/Firefox. Nie potrzebne teraz (8.6MB mp4 jest OK), ale warto pamiętać przy kolejnych filmach.

### Co zrobiono dobrze

- **Server Component** — `TripVideo` nie ma `"use client"`, nie dodaje JS do bundle'a. Natywny `<video>` działa bez React JS.
- **Spójność z projektem** — `SectionWrapper` + `ScrollAnimation` + `Container` — identyczny pattern jak inne sekcje.
- **Zmniejszony padding** — `py-8 sm:py-12` zamiast standardowego `py-16 sm:py-20` — wideo bliżej Hero, zgodnie z wymaganiem.
- **Warunkowe renderowanie** — `{trip.videoUrl && <TripVideo ... />}` — zero wpływu na warsztaty bez wideo.
- **CMS-ready** — pole w Keystatic, opcjonalne. Klientka może samodzielnie dodawać wideo.
- **`preload="metadata"`** — nie ładuje całego 8.6MB pliku, tylko metadane + 1. klatkę.
- **`playsInline`** — poprawne dla iOS Safari.
- **Minimalizm** — 29 linii kodu komponentu, 0 zależności, 0 hooków.

### Rekomendacja
- [ ] Gotowe do merge
- [x] Wymaga drobnych poprawek
- [ ] Wymaga znaczących zmian
- [ ] Wymaga przeprojektowania

**Jedyna poprawka:** dodać `aria-label` na `<video>` (🟠).
