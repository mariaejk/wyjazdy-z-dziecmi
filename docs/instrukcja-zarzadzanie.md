# Instrukcja zarządzania stroną — wyjazdyzdziecmi.pl

Instrukcja dla właścicielki strony (Maria Kordalewska).

---

## Spis treści

1. [Co robi strona automatycznie](#1-co-robi-strona-automatycznie)
2. [Skąd przychodzą zgłoszenia](#2-skąd-przychodzą-zgłoszenia)
3. [Google Sheets — zarządzanie leadami](#3-google-sheets--zarządzanie-leadami)
4. [Emaile — jak działają](#4-emaile--jak-działają)
5. [CMS — edycja treści](#5-cms--edycja-treści)
6. [Co robić gdy coś nie działa](#6-co-robić-gdy-coś-nie-działa)

---

## 1. Co robi strona automatycznie

Gdy klient wypełni formularz na stronie:

1. **Dane trafiają do Google Sheets** — nowy wiersz w odpowiedniej zakładce
2. **Ty dostajesz email** z danymi klienta (możesz odpowiedzieć klikając "Odpowiedz")
3. **Klient dostaje email** z potwierdzeniem i Twoim numerem telefonu

Nie musisz nic robić — system działa sam. Twoja jedyna praca to:
- Sprawdzać email / arkusz
- Odpisywać klientom
- Zmieniać statusy w arkuszu

---

## 2. Skąd przychodzą zgłoszenia

| Formularz | Gdzie na stronie | Co trafia do Sheets | Emaile |
|-----------|-----------------|---------------------|--------|
| **Rezerwacja** | Strona warsztatu (na dole) | Zakładka "Rezerwacje" | Do Ciebie + do klienta |
| **Kontakt** | Strona /kontakt | Zakładka "Kontakty" | Do Ciebie + do klienta |
| **Newsletter** | Stopka (na każdej stronie) + sekcja "Dołącz do nas" (gdy brak aktywnych warsztatów) | Zakładka "Newsletter" | Tylko do klienta |
| **Lista oczekujących** | Warsztat z kompletem miejsc | Zakładka "Lista oczekujących" | Do Ciebie + do klienta |

---

## 3. Google Sheets — zarządzanie leadami

### Gdzie jest arkusz
Arkusz "Wyjazdy z Dziećmi — Formularze" w Twoim Google Drive. Ma 4 zakładki (karty na dole).

### Statusy
Każde zgłoszenie ma kolumnę "Status". Nowe zgłoszenia mają status **"Nowy"**. Zmieniaj ręcznie:

| Status | Znaczenie |
|--------|-----------|
| Nowy | Właśnie przyszło, jeszcze nie odpowiedziałaś |
| Kontakt | Odpisałaś / zadzwoniłaś |
| Potwierdzony | Klient potwierdził udział |
| Opłacony | Klient wpłacił zaliczkę |
| Anulowany | Klient zrezygnował |

### Filtrowanie
- Kliknij ikonę filtra przy nagłówku kolumny "Status"
- Wybierz np. tylko "Nowy" — zobaczysz nieobsłużone zgłoszenia

---

## 4. Emaile — jak działają

### Email do Ciebie (powiadomienie)
- Przychodzi na: **wyjazdyzdziecmi@gmail.com**
- Temat zawiera nazwę warsztatu i imię klienta
- **Kliknij "Odpowiedz"** — email pójdzie bezpośrednio do klienta

### Email do klienta (potwierdzenie)
- Automatyczny, wysyłany natychmiast po wypełnieniu formularza
- Zawiera: podsumowanie, Twój numer telefonu (+48 503 098 906), link do strony
- Klauzula RODO w stopce

### Jeśli emaile nie przychodzą
1. Sprawdź folder SPAM w Gmailu
2. Sprawdź czy Resend działa: https://resend.com/emails (logi wysyłek)
3. Dane i tak są w Google Sheets — nic nie jest stracone

---

## 5. CMS — edycja treści

Panel administracyjny: **wyjazdyzdziecmi.pl/keystatic**

Szczegółowa instrukcja: **`docs/instrukcja-cms.md`**

Co możesz edytować w CMS:
- Warsztaty (tytuły, opisy, ceny, terminy, zdjęcia)
- Opinie klientów
- Blog (artykuły)
- Galeria zdjęć
- Zespół (bio, zdjęcia)
- Miejsca
- Treści strony głównej

---

## 6. Co robić gdy coś nie działa

| Problem | Co zrobić |
|---------|-----------|
| Formularz nie wysyła | Sprawdź czy strona w ogóle działa (Vercel). Jeśli tak — dane mogą być w Sheets mimo błędu |
| Brak emaili | Sprawdź SPAM. Sprawdź https://resend.com/emails. Dane są w Sheets |
| Arkusz pusty | Sprawdź czy arkusz jest udostępniony Service Accountowi (instrukcja: `docs/setup-external-services.md`) |
| CMS nie działa | Sprawdź https://vercel.com — czy ostatni deploy się powiódł |
| Zmiana numeru telefonu | Poproś developera — numer jest w kodzie (constants.ts) i w szablonach emaili |
| Zmiana emaila | Zmień `OWNER_EMAIL` w Vercel: Settings → Environment Variables → Redeploy |
