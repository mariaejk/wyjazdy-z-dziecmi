# Propozycja redesignu landing page — styl "Naturalny Magazyn"

**Data:** 2026-03-22
**Źródło:** Gemini CLI
**Zapytanie:** Nowa propozycja redesignu landing page zgodnie z opisem w inspiracja_22.03_1.txt oraz inspiracjami (thecommonwanderer, wielkizachwyt, paniodrelaksu)

---

## Odpowiedź Gemini

### PROPOZYCJA REDESIGNU: LANDING PAGE W STYLU "NATURALNYM MAGAZYNIE"

**1. Nowa paleta kolorów (Zieleń, Natura, Pergamin, Świeżość)**
Rezygnujemy z dominujących barw jesiennych (pomarańcz/terakota) na rzecz świeżej, kojącej natury.
*   **Tło / Baza (Pergamin & Świeżość):** Zamiast czystej bieli używamy ciepłych, jasnych odcieni pergaminu, surowego lnu lub wełny (np. jasny, złamany beż/kremowy `#F9F8F6`). Zapewni to dużą ilość "światła" (white space) typowego dla magazynów.
*   **Kolory Główne (Las i Roślinność):** Głęboka zieleń mchu (`#2C4C3B`) jako główny kolor tekstu i nagłówków (zamiast czerni) oraz świeża szałwia/eukaliptus (`#52796F` lub `#8DA399`) jako tła dla bloków wyróźnionych i akcentów.
*   **Akcenty (Ziemia):** Wyblakłe, bardzo stonowane brązy drewna do drobnych linii oddzielających i detali.

**2. Nowa typografia (Styl drukowany + pisany)**
*   **Font Nagłówkowy (Drukowany / Szeryfowy):** Klasyczny, elegancki font o charakterze redakcyjnym (np. *Playfair Display* lub *Cormorant Garamond*). Będzie budował magazynowy prestiż i czytelność.
*   **Font Ozdobny (Pisany odręcznie):** Swobodny font imitujący pismo odręczne (np. *Caveat*, *Nanum Pen Script* lub *Shadows Into Light*). Będzie stosowany miejscowo, np. wplatany w środek drukowanego nagłówka lub jako "dopisek" w formie notatki na marginesie.
*   **Font Ciałowy (Prosty bezszeryfowy):** Bardzo czytelny i minimalistyczny font do długich tekstów (np. *Inter* lub *Montserrat*).

**3. Nowy layout sekcji (Styl magazynowy)**
*   **Hero Sekcja (Okładka):** Projektowana jako okładka czasopisma lifestylowego. Duże, prostokątne zdjęcie z lewej lub prawej strony, a tekst obok łamany asymetrycznie. Tytuł z wykorzystaniem podwójnej typografii.
*   **Wielołamowość i Hierarchia:** Teksty w dłuższych sekcjach (np. opis wyjazdu) łamane na 2 kolumny. Wyraźne "Lidy" (pogrubione, nieco większe pierwsze akapity wprowadzające).
*   **Światło (White Space):** Radykalne zwiększenie marginesów i odstępów między sekcjami. Elementy muszą "oddychać".

**4. Ostre kształty (Prostokąty)**
*   **Zdjęcia i kontenery:** Bezwzględne usunięcie wszelkich zaokrągleń (w Tailwind: usunięcie klas `rounded-X`). Wszystkie zdjęcia to surowe, geometryczne prostokąty, często ułożone w asymetryczną siatkę (grid).
*   **Przyciski:** Ostre, prostokątne przyciski (Call to Action) – w stylu "solid" (wypełnione ciemną zielenią) lub magazynowym "outline" (tylko cienka, prostokątna ramka).

**5. Elementy scrapbookingu i kolażu**
*   **Taśmy i Pinezki:** Ozdobne, półprzezroczyste prostokąciki imitujące taśmę klejącą ("washi tape") nałożone na rogi niektórych zdjęć, sprawiające wrażenie wklejonych odbitek.
*   **Ręczne "bazgroły":** Półprzezroczyste strzałki, zakreślenia lub odręczne dopiski wokół ważnych elementów (np. podświetlenie ceny lub daty odręcznym kołem).
*   **Warstwowość:** Zdjęcia lekko nachodzące na bloki tekstowe lub na siebie nawzajem (kolaż).

**6. Hierarchia typograficzna i detale z prasy**
*   **Inicjały (Drop Caps):** Pierwsza litera kluczowych akapitów w opisach znacznie powiększona (zajmująca np. 3 linie tekstu) – klasyczny zabieg redakcyjny.
*   **Linie (Dividers):** Delikatne, cienkie linie oddzielające poszczególne sekcje i artykuły.

**7. Adaptacja konkretnych elementów z inspiracji:**
*   **Od *The Common Wanderer*:** Bierzemy wysoce czytelną, magazynową hierarchię. Wykorzystanie kursywy w podtytułach i zróżnicowanej wielkości fontów. Asymetryczne, czyste ułożenie wysokiej jakości zdjęć połączone ze światłem na stronie.
*   **Od *Wielki Zachwyt*:** Bierzemy klimat bliskości z naturą i leśny "vibe". Zastosujemy ich pomysł na delikatne graficzne przerywniki oddzielające sekcje (zamiast szlaczków mogą to być minimalistyczne gałązki lub wektorowe liście) i styl mieszania typografii w jednym nagłówku.
*   **Od *Pani od relaksu*:** Bierzemy niezwykły spokój, miękkość nawigacji i bardzo dużo wolnej, kojącej przestrzeni. Zapożyczamy strukturę z delikatnymi liniami i nadtytułami wprowadzającymi (np. "Cześć! _______").

---

### Czy to zadanie wymaga Plan Mode czy Edit Mode?

To zadanie bezwzględnie wymaga **Plan Mode (planowania)**.

**Uzasadnienie:**
1. **Skala zmian architektonicznych:** Zmiana układu na magazynowy (wielołamowość, asymetryczne gridy) i wprowadzenie elementów scrapbookingu wymaga gruntownego przebudowania komponentów React i logiki CSS (Tailwind). Nie jest to zwykła poprawka kosmetyczna, ale zmiana całej struktury DOM.
2. **Konfiguracja na poziomie globalnym:** Nowa paleta kolorów i dodanie dwóch nowych fontów (szeryfowy magazynowy + odręczny) wymaga modyfikacji plików konfiguracyjnych (np. `tailwind.config.ts`, wpięcie `next/font/google`), co powinno być przemyślane systemowo.
3. **Spójność:** Wymagane jest najpierw zdefiniowanie nowych wytycznych projektowych dla wszystkich komponentów (usunięcie zaokrągleń `rounded`, wprowadzenie inicjałów, nowe klasy na przyciski), aby implementacja była spójna we wszystkich plikach i podstronach.

---

*Wygenerowano przez /gemini*
