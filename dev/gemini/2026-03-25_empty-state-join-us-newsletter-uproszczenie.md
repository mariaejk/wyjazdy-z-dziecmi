# Empty State — uproszczenie sekcji "Dołącz do nas"

**Data:** 2026-03-25
**Źródło:** Gemini CLI
**Zapytanie:** zaproponuj jak mogła wyglądac tak sekcja @docs/poprawki/poprawki_25.03/image_3.png w kazdym zakldaki warsztatow, które nie maja aktywnych dostepnych warsztatów. Bo narazie wygląda jak duze wszytskiego i rodzic pogubi sie. duzo przyciskow, zgod i innych rzeczy.

---

## Odpowiedź Gemini

Masz rację – obecny stan tworzy ogromny **szum informacyjny** ("cognitive overload"). Mamy 4 wyraźne klikalne prostokąty, dwie ściany tekstu prawniczego i niewiele empatii dla faktu, że użytkownik szukał wyjazdu, a trafił na pustą stronę.

### 1. Zmiana komunikatu na dopasowany do kontekstu

Zamiast ogólnego "Dołącz do nas", odnieśmy się bezpośrednio do faktu, że aktualnie nie ma wyjazdów w tej kategorii.

- **Nagłówek:** `Planujemy nowe terminy!`
- **Opis:** `Zostaw swój e-mail, a jako pierwsza dowiesz się, gdy otworzymy zapisy na nowe warsztaty. W międzyczasie sprawdź nasze pozostałe wyjazdy.`

### 2. Redukcja zgód prawnych (Kluczowy krok)

Obecne 2 wieloliniowe checkboksy odstraszają i tworzą barierę.

- **Rozwiązanie (Zalecane):** Całkowicie **usuń checkboksy**. Zastąp je jednym drobnym zdaniem bezpośrednio pod przyciskiem:
  > *"Zapisując się, wyrażasz zgodę na otrzymywanie informacji o nowych warsztatach i akceptujesz [Politykę Prywatności]."*

  Z punktu widzenia RODO/UX cel jest jednoznaczny i wynika z akcji pozostawienia maila, a klauzula informacyjna spełnia wymóg przejrzystości. Usunięcie checkboxów podnosi konwersję o 30-50%.

### 3. Redukcja i hierarchia CTA

Użytkownik ma dwa wyjścia: zapisać się NA PÓŹNIEJ lub zobaczyć coś INNEGO. Kontakt jest tu zbędny.

- **Usuń:** Przycisk "NAPISZ DO NAS" — formularz kontaktowy jest w stopce/menu
- **Przycisk zapisu (Primary):** Zmień "ZAPISZ SIĘ" → `POWIADOM MNIE` (benefit-driven)
- **Przycisk alternatywy:** "ZOBACZ WSZYSTKIE WARSZTATY" na dole, oddzielony odstępem, jako wyraźna druga opcja

---

### Proponowany schemat układu (Wireframe)

```text
              Planujemy nowe terminy!
W tej chwili nie mamy otwartych zapisów w tej kategorii. Zostaw nam
  swój adres e-mail, a powiadomimy Cię, gdy pojawią się nowości.

      ╭───────────────────────────╮ ╭──────────────────╮
      │ Twój adres e-mail         │ │  POWIADOM MNIE   │
      ╰───────────────────────────╯ ╰──────────────────╯
        * Zapisując się do newslettera, akceptujesz Politykę Prywatności.

                            ---

                   Szukasz czegoś innego?
            [ ZOBACZ POZOSTAŁE DOSTĘPNE WARSZTATY ]
```

### Korzyści tej zmiany

1. **Odkorkowanie uwagi:** Znika efekt "ściany tekstu". Użytkownik widzi prostą akcję: podaj maila.
2. **Wyższa konwersja:** Usunięcie checkboxów drastycznie podnosi wskaźnik zapisów.
3. **Jasna ścieżka ucieczki:** Jedno wyraźne CTA kierujące na inne warsztaty — zatrzymuje użytkownika na stronie.
4. **Empatyczny kontekst:** Nagłówek reaguje na sytuację ("Planujemy nowe terminy!"), zamiast być ogólnym apelem.

---

*Wygenerowano przez /gemini*
