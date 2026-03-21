# Code Review: Faza 1 — Nawigacja
# Poprawki UI + Nawigacja 21.03.2026

Last Updated: 2026-03-21
Commit: `489250c`
Branch: `feature/poprawki-ui-nav-21-03`
Reviewer: Claude Code

---

## Executive Summary

Implementacja fazy 1 jest solidna i spełnia główne kryterium: 4 top-level items, 2 dropdowny, 2 samodzielne linki. Refaktor ze stanu lokalnego w `DropdownNavItem` na wspólny stan `openDropdown` w `Header` jest poprawny architektonicznie i rozwiązuje problem jednoczesnego otwierania dwóch dropdownów. Znaleziono 2 problemy blokujące (accessibility + edge case), 2 ważne problemy i kilka drobnostek.

---

## Ocena zgodności z planem

| Kryterium z planu | Status |
|-------------------|--------|
| 4 top-level items | ✅ Warsztaty, Poznajmy się, Blog, Kontakt |
| "Warsztaty" i "Poznajmy się" nieklikalne | ✅ `<button>` bez nawigacji |
| Blog samodzielna pozycja | ✅ `/blog` |
| Kontakt samodzielna pozycja | ✅ `/kontakt` |
| Oba dropdowny otwierają się na hover | ✅ |
| Zamykanie z delay 150ms | ✅ `setTimeout(150)` |
| Dwa niezależne accordion na mobile | ✅ stan `expandedItem` per `item.label` |
| Blog i Kontakt jako zwykłe linki na mobile | ✅ |
| Build check OK | ✅ (wg zadania 1.4) |

---

## Problemy blokujące [blocking]

### 1. `isNavActive("")` — niebezpieczna logika dla pustego href

**Plik:** `src/lib/utils.ts:64-67`, `src/data/navigation.ts:12,23`

`isNavActive` sprawdza `href === "/"` lub `pathname.startsWith(href)`. Kiedy `href = ""`:
- `"" === "/"` — false
- `pathname.startsWith("")` — **zawsze true** (każdy string zaczyna się od pustego stringa)

Wynik: dropdown "Warsztaty" i "Poznajmy się" mają `active = true` na KAŻDEJ stronie, ponieważ `item.children?.some(child => isNavActive(child.href, pathname))` nie jest tu wołane dla samego top-level item z `href: ""`.

Zaraz — sprawdźmy jeszcze raz. W `Header.tsx` linia 151 wywołuje `isNavActive(item.href, pathname)` tylko dla items BEZ `children`. Items z `children` trafiają do `DropdownNavItem` — tam `active` jest obliczane przez `item.children?.some(child => isNavActive(child.href, pathname))` (linia 32-34). Więc `isNavActive("")` NIE jest wywoływane bezpośrednio dla dropdownów.

Jednak `href: ""` w `NavItem` jest wartością która może zostać użyta w przyszłości przez inny kod lub w MobileMenu. W `MobileMenu.tsx` linia 86 woła `isNavActive(item.href, pathname)` dla items bez children — items z children są obsługiwane osobno, więc `""` też nie jest bezpośrednio podawane do `isNavActive`.

**Wniosek:** Aktualnie nie powoduje błędu, ale to tykająca bomba. Należy dodać guard w `isNavActive`.

**Poprawka:**
```ts
// src/lib/utils.ts
export function isNavActive(href: string, pathname: string): boolean {
  if (!href) return false;  // dodać tę linię
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
```

**Klasyfikacja:** 🟠 [important] — nie jest blokujący teraz, ale może stać się bugiem przy refaktorze.

---

### 2. Brak `aria-haspopup="listbox"` lub prawidłowej wartości — błąd semantyki ARIA

**Plik:** `src/components/layout/Header.tsx:66`

```tsx
aria-haspopup="true"
```

Wartość `"true"` jest przestarzałym skrótem. Według WAI-ARIA 1.2, prawidłowe wartości dla `aria-haspopup` to: `"menu"`, `"listbox"`, `"tree"`, `"grid"`, `"dialog"`, `"true"`, `"false"`. Wartość `"true"` jest równoznaczna z `"menu"`. Dropdown jest renderowany jako `<ul role="menu">` — więc wartość powinna być `"menu"` dla jasności i zgodności z dokumentacją.

Brak `aria-label` na `<button>` opisującego zawartość dropdownu dla czytników ekranu — np. `aria-label="Warsztaty — menu rozwijane"`.

**Poprawka:**
```tsx
aria-haspopup="menu"
aria-label={`${item.label} — otwórz podmenu`}
```

**Klasyfikacja:** 🟠 [important] — nie blokuje funkcjonalności, ale jest błędem accessibility.

---

### 3. Dropdown nie zamyka się przy kliknięciu na przycisk z otwartym dropdownem

**Plik:** `src/components/layout/Header.tsx:67`

```tsx
onClick={openDropdown}
```

`onClick` zawsze woła `onOpen()` — nie toggle. Użytkownik klikający klawiaturą (Tab + Enter/Space) na "Warsztaty" otwiera dropdown, ale kolejne kliknięcie nie zamknie go. Zamknięcie następuje dopiero przez `onMouseLeave` (hover) albo przez otwarcie drugiego dropdownu.

Dla interakcji klawiaturowej to problem UX — user nie może zamknąć dropdownu klikając ponownie w button.

**Poprawka:**
```tsx
onClick={() => isOpen ? onClose() : onOpen()}
```

**Klasyfikacja:** 🔴 [blocking] — przerywa keyboard navigation zgodnie z wymaganiami WCAG 2.1.1.

---

## Ważne uwagi [important]

### 4. Focus nie przechodzi do pierwszego elementu dropdownu po otwarciu klawiaturą

**Plik:** `src/components/layout/Header.tsx:57-77`

Dropdown otwiera się przez `onClick`, ale focus pozostaje na `<button>`. Użytkownik musi wcisnąć Tab żeby przejść do pierwszego linku w dropdownie — to nieoczywiste. Standard dla `role="menu"` to przeniesienie focus na pierwszy `menuitem` po otwarciu.

Przy obecnej implementacji (dropdown jako `ul role="menu"`) powinno być:
1. Enter/Space na button otwiera dropdown I przenosi focus na pierwszy `menuitem`
2. Escape zamyka dropdown i wraca focus na button (nie zaimplementowane)
3. Strzałki nawigują między `menuitem`

To jest duże zagadnienie (pełna implementacja keyboard menu navigation). Minimalna poprawka: przenieść focus na pierwszy link po otwarciu.

**Klasyfikacja:** 🟠 [important] — keyboard-only users mają utrudnioną nawigację.

---

### 5. Dropdown nie zamyka się po kliknięciu poza nim (poza `onMouseLeave`)

**Plik:** `src/components/layout/Header.tsx:112-114`

```tsx
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
```

Brak obsługi kliknięcia poza komponentem (`document.addEventListener("click", ...)`). Jeśli user kliknie na inny element strony (nie inny dropdown), aktualny dropdown pozostanie otwarty. Przy desktop hover-based UX jest to mniej odczuwalne, ale przy keyboard/touch może być problem.

Poprzednia implementacja miała `containerRef` z `useEffect` na `mousedown` — został usunięty w tym commicie. Sprawdzić czy był w poprzedniej wersji:

```
-      ref={containerRef}
```

Tak — `containerRef` z click-outside detection został usunięty. To regresja.

**Klasyfikacja:** 🟠 [important] — minor UX regression, szczególnie widoczna przy interakcji klawiaturą.

---

## Drobnostki [nit]

### 6. `aria-haspopup` na mobile accordion button — brak

**Plik:** `src/components/layout/MobileMenu.tsx:45`

```tsx
aria-expanded={isExpanded}
```

Brak `aria-controls` wskazującego na `<ul>` sublisty. Technicznie nie wymagane dla accordion (w odróżnieniu od dialog), ale dobra praktyka accessibility. Dodanie `id` na `<ul>` i `aria-controls` na `<button>` poprawia komunikację czytnika ekranu.

**Klasyfikacja:** 🟡 [nit]

---

### 7. `key={item.label}` — potencjalny problem przy duplikacie "Kontakt"

**Plik:** `src/components/layout/Header.tsx:153`, `src/components/layout/MobileMenu.tsx:33,88`

"Kontakt" pojawia się w dwóch miejscach: jako dziecko "Poznajmy się" (`child.label`) i jako samodzielna pozycja top-level. W `mainNavigation.map` key to `item.label` — dla top-level items są unikalne (Warsztaty, Poznajmy się, Blog, Kontakt). Brak konfliktu na tym poziomie.

Ale w `DropdownNavItem` children używają `key={child.href}` (linia 87) — "Kontakt" ma `/kontakt` jako href. Brak konfliktu. Zmiana `key` z `item.href` na `item.label` dla top-level jest poprawna, bo `href: ""` nie jest unikalny.

**Klasyfikacja:** ✅ [good] — zmiana key na label jest właściwą decyzją.

---

### 8. Duplikacja "Kontakt" w dropdownie i jako top-level — zamierzone

**Plik:** `src/data/navigation.ts:28,32`

Plan dokumentuje to jako zamierzone: "dropdown daje discovery, top-level daje szybki dostęp". Brak problemu technicznego. Jednak z perspektywy UX: jeśli user klika "Poznajmy się" po raz pierwszy, widzi "Kontakt" — a potem widzi osobny "Kontakt" obok. Może być mylące.

Alternatywa: usunąć "Kontakt" z dropdown "Poznajmy się" (zostaje O mnie, Galeria, Opinie). Decyzja biznesowa, nie techniczna.

**Klasyfikacja:** 🔵 [suggestion] — warto przedyskutować z klientką.

---

### 9. Hover delay — brak cancel przy rapid hover między dropdownami

**Plik:** `src/components/layout/Header.tsx:41-43`

```tsx
const closeDropdown = useCallback(() => {
  timeoutRef.current = setTimeout(() => onClose(), 150);
}, [onClose]);
```

Gdy user szybko przejeżdża kursorem z "Warsztaty" na "Poznajmy się": `closeDropdown` "Warsztaty" startuje timeout 150ms → `openDropdown` "Poznajmy się" wywołuje `onOpen()` → `setOpenDropdown("Poznajmy się")`. Po 150ms `onClose()` "Warsztaty" wywołuje `setOpenDropdown(null)`, zamykając właśnie otwarty dropdown "Poznajmy się".

**Jest to bug** — race condition. `onClose` zamknie nowo otwarty dropdown.

**Poprawka:** `onClose` powinien zamykać TYLKO jeśli aktualnie otwarty dropdown to ten sam, który zainicjował zamknięcie:

```tsx
// W Header.tsx:
onClose={() => setOpenDropdown(prev => prev === item.label ? null : prev)}
```

**Klasyfikacja:** 🟠 [important] — powoduje race condition przy rapid hover.

---

## Dobre rozwiązania [good]

### 10. Stan `openDropdown` wyniesiony do `Header`

✅ Przeniesienie zarządzania stanem dropdownu z `DropdownNavItem` do `Header` przez props `isOpen/onOpen/onClose` jest poprawnym podejściem. Jeden stan kontroluje wzajemne wykluczanie się dropdownów.

### 11. `item.label` jako key zamiast `item.href`

✅ Zmiana z `key={item.href}` na `key={item.label}` dla top-level items jest niezbędna, bo `href: ""` nie jest unikalnym kluczem.

### 12. Active state dla dropdownów przez `children.some()`

✅ `item.children?.some(child => isNavActive(child.href, pathname))` poprawnie aktywuje dropdown gdy user jest na stronie dziecka. Na `/o-nas` "Poznajmy się" będzie aktywne — tak jak powinno.

### 13. `expandedItem` trzyma `item.label` zamiast `item.href` w MobileMenu

✅ Analogicznie do zmiany w Header — poprawna decyzja.

### 14. `"use client"` granice pozostają niezmienione

✅ `MobileNavLinks` słusznie wyekstrahowany jako osobny komponent z lokalnym stanem (`expandedItem`) — to czysta separacja od `MobileMenu` z focus trap i motion.

### 15. Polskie znaki — literalne UTF-8

✅ Wszystkie polskie znaki w plikach są w UTF-8 (Warsztaty, Poznajmy się, Wszystkie warsztaty etc.). Zgodne z zasadami projektu.

---

## Architecture Considerations

**Hover vs. Click pattern dla desktop dropdownu:** Obecna implementacja działa tylko na hover (+ onClick). Na urządzeniach dotykowych bez hover efektu (np. iPad) dropdown nie otworzy się dopóki user nie kliknie. `onClick` na button jest obecny, ale brak `onClose` przy kliknięciu poza — dropdown pozostanie otwarty. Rozważyć: po otwarciu dropdownu przez klik, dodać nasłuchiwacz na `document` który zamknie dropdown przy kliknięciu gdziekolwiek.

**`aria-haspopup` + `role="menu"` implikuje pełen keyboard support:** Przeglądarki i czytniki ekranu oczekują strzałkowej nawigacji wewnątrz `role="menu"`. Bez niej implementacja jest niekompletna pod kątem WCAG 2.1.1. To duży zakres pracy — alternatywą jest zmiana `role` dropdownu na `role="list"` zamiast `role="menu"`, co nie narzuca keyboard navigation pattern.

---

## Next Steps

Przed merge proponuję naprawić w kolejności priorytetów:

1. **[blocking]** Bug race condition przy rapid hover (punkt 9) — 1-liniowa poprawka `onClose`
2. **[blocking]** Toggle onClick na button (punkt 3) — 1-liniowa poprawka
3. **[important]** Guard `if (!href) return false` w `isNavActive` (punkt 1) — zabezpieczenie na przyszłość
4. **[important]** Przywrócenie click-outside detection (punkt 5) — `useEffect` na `document`
5. **[important]** `aria-haspopup="menu"` zamiast `"true"` (punkt 2) — 1-znakowa zmiana
6. **[nit]** `aria-controls` na mobile accordion (punkt 6) — opcjonalne

Punkty 3-5 z Fazy 1 są blokerami UX i accessibility przed production deploy.
