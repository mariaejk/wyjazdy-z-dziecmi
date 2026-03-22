# UI — Koncepcja "Naturalnego Minimalizmu"

Logo łączy w sobie motyw przygody (kompas) z elegancją i spokojem (kaligraficzny font). Sugeruje markę „premium, ale blisko natury". Aby UI współgrał z tym znakiem i wspierał cele projektu, zaprojektowano koncepcję **"Naturalnego Minimalizmu"**.

---

## 1. Paleta kolorystyczna (Naturalna i Uspokajająca)

Logo jest czarno-białe, co daje dużą swobodę, ale Marysia wspominała o „kolorach ziemi".

- **Tło:** Ciepły pergamin lub bardzo jasny beż (`#F9F7F2`) — buduje klimat „slow life" bardziej niż czysta biel.
- **Akcenty (Przyciski CTA):** Głęboka zieleń mchu (`#2D4635`) lub stary brąz.
- **Tekst:** Bardzo ciemny grafit (`#1A1A1A`) — lepszy niż czysty czarny, bardziej miękki dla oka.
- **Skala szarości:** Dla „minionych warsztatów" użyj desaturowanych, jasnych szarości, aby nie odciągały uwagi od nowości.

---

## 2. Typografia (Zgodna z Logo)

Logo używa eleganckiego szeryfu i skryptu.

- **Nagłówki (H1, H2):** Font szeryfowy klasy **Playfair Display** lub **Lora**. To nada stronie autorytetu i „magii", o której pisała Maria.
- **Body:** Nowoczesny, czytelny bezszeryf (np. **Inter** lub **Geist**). Rodzice będą czytać to na telefonach w biegu — musi być ultra-czytelne.

---

## 3. Layout i kluczowe sekcje (UX/UI)

### Hero Section (Pierwsze wrażenie)

- **Logo:** Wyśrodkowane u góry.
- **Tło:** Duże, autentyczne zdjęcie z warsztatów (nie stock!), na którym widać relację (np. dłonie rodzica i dziecka przy ceramice).
- **CTA:** Przycisk „Sprawdź najbliższe wyjazdy" umieszczony centralnie. Unikaj rozbudowanego menu — landing page ma prowadzić do zapisu, nie do błądzenia po stronach.

### Karty Warsztatów (Dynamiczne z Airtable)

- Zaprojektuj karty z dużym marginesem wewnętrznym (white space).
- **Ikony:** Zamiast bulletów przy korzyściach (natura, brak zasięgu, warsztaty), użyj cienkich, linearnych ikon nawiązujących stylem do igły kompasu z logo.
- **Status:** Warsztaty, które się odbyły, wyświetlaj z filtrem `grayscale(100%)` i niską oprawą, co wizualnie buduje „historię sukcesów".

### Pływający Chatbot RAG

- Widget bota nie powinien być generyczny. Nazwij go **„Asystentem Bliskości"**.
- Użyj fragmentu igły kompasu jako ikony otwierającej czat.
- W vibe codingu (Cursor) użyj promptu:

> *"Stwórz floating chat widget w Tailwind CSS, który używa kolorystyki #2D4635 i ma zaokrąglone rogi (rounded-2xl)".*

---

## 4. Funkcjonalność Formularza („Thumb-friendly")

Ponieważ większość ruchu będzie z mobile, pola formularza muszą być duże.

**Pola:**
- Imię
- E-mail
- Wybór warsztatu (dropdown zasilany z Airtable)
- Liczba dzieci

**Microcopy:** Pod przyciskiem „Wyślij" dodaj mały napis:

> *"Po wysłaniu otrzymasz automatyczne potwierdzenie na e-mail"* — to buduje zaufanie.

---

## 5. Jak to wdrożyć w tydzień (Wskazówki dla Dev)

**Vibe Coding (Cursor/Windsurf):** Wklej plik ze swoim logo do czatu AI i napisz:

> *"Look at this logo. I want to build a landing page in Next.js + Tailwind that reflects this branding: minimal, organic, forest-vibe. Use serif fonts for headings and sans-serif for body. Generate a responsive Hero section first."*

**Integracja n8n:** Logo ma cienkie linie — zachowaj ten styl w dividerach na stronie. n8n obsłuży przesyłanie danych z formularza do Airtable i wysyłkę e-maila.

**Vouchery:** Skoro planujesz PDF-y, szablon vouchera powinien być kopią estetyki strony — jasne tło, czarne logo, dużo przestrzeni.
