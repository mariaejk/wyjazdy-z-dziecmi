# Porownanie opcji CMS dla wyjazdyzdziecmi.pl

## Kontekst

Marysia potrzebuje samodzielnie edytowac tresci na stronie — dodawac wyjazdy, zdjecia, wpisy blogowe, opinie — bez angazowania dewelopera. Aktualnie cala tresc jest hardkodowana w plikach TypeScript.

---

## Opcje

### 1. Keystatic (REKOMENDACJA)

**Typ:** File-based CMS z wizualnym panelem admina
**Koszt:** Darmowy
**Hosting danych:** Pliki YAML/JSON/Markdoc w repozytorium Git

**Zalety:**
- Wizualny panel admina na `/keystatic` — prosty interfejs, bez wiedzy technicznej
- Dane w repozytorium — pelna historia zmian, backup w Git
- Tryb lokalny (dev) i GitHub (produkcja) — edycja tworzy commity automatycznie
- Zero kosztu — brak zewnetrznych serwisow
- Idealny do statycznych stron (SSG) — dane sa w plikach, nie w bazie
- Latwa migracja z hardcoded danych
- Rich text editor z Markdoc — formatowanie, zdjecia, linki
- Dziala z Next.js App Router

**Wady:**
- Wymaga GitHub App do trybu produkcyjnego
- Mniej popularny niz Sanity/Contentful — mniejsza spolecznosc
- Brak zaawansowanych workflow (np. draft/publish z approval)

---

### 2. Sanity

**Typ:** Headless CMS (SaaS)
**Koszt:** Darmowy do 10k dokumentow, potem od $99/mies
**Hosting danych:** Chmura Sanity

**Zalety:**
- Bardzo rozbudowany edytor (Portable Text)
- Real-time collaboration
- CDN na obrazki (transformacje, resize)
- Duza spolecznosc i dokumentacja

**Wady:**
- Dane poza repozytorium — zaleznosc od zewnetrznego serwisu
- Wymaga konta Sanity i konfiguracji projektu
- Overengineered dla malej strony z 5 wyjazdami
- Koszt przy skalowaniu

---

### 3. Contentful

**Typ:** Headless CMS (SaaS)
**Koszt:** Darmowy do 25k rekordow, potem od $300/mies
**Hosting danych:** Chmura Contentful

**Zalety:**
- Najbardziej dojrzaly headless CMS
- Swietne API i SDK
- Webhooks, preview, scheduling

**Wady:**
- Najdrozszy z opcji
- Skomplikowany interfejs — steep learning curve dla nie-technicznej osoby
- Dane poza repozytorium
- Zdecydowanie za duzy dla tego projektu

---

### 4. Markdown + GitHub (reczna edycja)

**Typ:** Pliki Markdown edytowane bezposrednio w GitHub
**Koszt:** Darmowy
**Hosting danych:** Repozytorium Git

**Zalety:**
- Zero dodatkowych narzedzi
- Pelna kontrola nad formatem danych

**Wady:**
- Wymaga znajomosci Markdown i GitHub
- Brak wizualnego edytora — Marysia musialoby edytowac pliki tekstowe
- Brak walidacji — latwo o bledy w strukturze danych
- Nieakceptowalne dla nie-technicznego uzytkownika

---

## Rekomendacja: Keystatic

Keystatic jest idealnym wyborem dla tego projektu:

1. **Prosty panel** — Marysia loguje sie na `wyjazdyzdziecmi.pl/keystatic` i edytuje tresci wizualnie
2. **Zero kosztu** — brak abonamentu, brak zewnetrznych serwisow
3. **Dane w Git** — kazda zmiana to commit, pelna historia, latwy rollback
4. **SSG-friendly** — dane w plikach, idealne do statycznego generowania stron
5. **Skalowalosc** — wystarczajacy na lata dla strony z kilkunastoma wyjazdami rocznie
