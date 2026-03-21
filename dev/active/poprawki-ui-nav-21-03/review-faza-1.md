# Code Review — Faza 1: Nawigacja

Data: 2026-03-21
Commit: `489250c`

## Statystyki
- Plików sprawdzonych: 3 (navigation.ts, Header.tsx, MobileMenu.tsx)
- 🔴 [blocking]: 2
- 🟠 [important]: 3
- 🟡 [nit]: 0
- 🔵 [suggestion]: 0
- ✅ [good]: 2

## 🔴 Blocking

### 1. Race condition przy rapid hover (Header.tsx)
Gdy user szybko przesuwa mysz z "Warsztaty" na "Poznajmy się", timeout 150ms zamknięcia "Warsztaty" wywoła `setOpenDropdown(null)` już PO tym jak "Poznajmy się" zostało otwarte.

**Fix:**
```tsx
onClose={() => setOpenDropdown(prev => prev === item.label ? null : prev)}
```

### 2. Dropdown nie zamyka się przy ponownym kliknięciu (Header.tsx:67)
`onClick={openDropdown}` zawsze otwiera — brak toggle. Keyboard user nie może zamknąć dropdownu.

**Fix:**
```tsx
onClick={() => isOpen ? onClose() : onOpen()}
```

## 🟠 Important

### 3. Brak click-outside detection (Header.tsx)
Dropdown nie zamknie się po kliknięciu na treść strony.

**Fix:** Dodać `useEffect` z globalnym click listener, zamykający dropdown gdy kliknięto poza menu.

### 4. isNavActive("") zwraca true (utils.ts)
`pathname.startsWith("")` zawsze zwraca `true`. Dropdown headers mają `href: ""`, więc guard jest potrzebny.

**Fix:** Dodać `if (!href) return false` na początku `isNavActive()`.

### 5. aria-haspopup="true" zamiast "menu" (Header.tsx:66)
Dropdown ma `role="menu"`, więc poprawna wartość to `aria-haspopup="menu"`.

## ✅ Good

- Centralne zarządzanie stanem dropdownów w Header — czyste rozwiązanie
- MobileMenu: pełny button z chevronem — lepsza accessibility niż osobny link + button
