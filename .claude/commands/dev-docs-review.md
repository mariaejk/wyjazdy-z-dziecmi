---
description: Code review wykonanej fazy/etapu przez subagenta
argument-hint: [ścieżka-do-folderu] [numer-fazy] (np. "dev/auth-refaktor 3")
allowed-tools: Bash(git:*), Bash(find:*), Bash(ls:*), Read, Write, Task, Skill(code-review)
---

# Code Review fazy zadania

## Zmienne
- ŚCIEŻKA_ZADANIA: $1
- NUMER_FAZY: $2

## Instrukcje

### 1. Walidacja
- Sprawdź czy folder `$1/` istnieje
- Sprawdź zmiany w git: `git status --short`
- Jeśli folder nie istnieje → poinformuj użytkownika i zakończ

### 2. Przygotowanie kontekstu
Przeczytaj dokumentację zadania z `$1/`:
- Plan zadania (cele, wymagania, kryteria akceptacji)
- Plik z zadaniami (co miało być zrobione w fazie $2)
- Plik kontekstowy (decyzje, zmiany)

### 3. Uruchom subagenta do Code Review
Utwórz subagenta (Task) z następującymi instrukcjami:
```
Jesteś ekspertem Code Review.

KONTEKST:
- Folder zadania: $1
- Faza do review: $2
- Skill: code-review

ZADANIE:
1. Zapoznaj się z planem i zadaniami dla fazy $2
2. Sprawdź jakie pliki zostały zmienione: git diff --name-only
3. Przejrzyj każdy zmieniony plik
4. Oceń zgodność z planem i dobrymi praktykami
5. Wygeneruj raport code review

ZASADY:
- Skup się TYLKO na zmianach z fazy $2
- Bądź konkretny — podawaj pliki i linie
- Klasyfikuj problemy: 🔴 [blocking], 🟠 [important], 🟡 [nit], 🔵 [suggestion]
- Doceniaj też dobre rozwiązania
```

### 4. Zapisz wyniki review
Po zakończeniu review przez subagenta:

**Utwórz plik `$1/review-faza-$2.md`** z pełnym raportem.

**Zaktualizuj `$1/[zadanie]-zadania.md`:**
- Dodaj sekcję "## Do poprawy po review fazy $2"
- Wylistuj wszystkie 🔴 i 🟠 problemy jako **checkboxy** (nie bullet points!):
```markdown
  ## Do poprawy po review fazy $2

  - [ ] 🔴 [blocking] **plik:linia** — opis problemu
  - [ ] 🟠 [important] **plik:linia** — opis problemu
  - [ ] 🟡 [nit] **plik:linia** — opis (opcjonalne)
```
- Format musi być spójny z pozostałymi zadaniami w pliku

**Zaktualizuj `$1/[zadanie]-kontekst.md`:**
- Dodaj notatkę o przeprowadzonym review
- Zapisz kluczowe wnioski

### 5. Przedstaw podsumowanie użytkownikowi

## Format wyjściowy
```
✅ Code Review fazy $2 zakończony

📊 Statystyki:
   - Plików sprawdzonych: X
   - 🔴 [blocking]: X
   - 🟠 [important]: X
   - 🟡 [nit]: X
   - 🔵 [suggestion]: X

📄 Raport zapisany: $1/review-faza-$2.md

📝 Zadania do poprawy dodane do: $1/[zadanie]-zadania.md

---

[PODSUMOWANIE GŁÓWNYCH PROBLEMÓW]

---

❓ Czy wykonać poprawki teraz? (tak/nie)
   Jeśli tak → uruchom: /dev-docs-execute $1
```