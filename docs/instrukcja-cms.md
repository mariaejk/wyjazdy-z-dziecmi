# Instrukcja CMS Keystatic — wyjazdyzdziecmi.pl

## Spis tresci

1. [Jak wejsc do panelu CMS](#1-jak-wejsc-do-panelu-cms)
2. [Nawigacja po panelu](#2-nawigacja-po-panelu)
3. [Edycja wyjazdow (trips)](#3-edycja-wyjazdow)
4. [Edycja opinii](#4-edycja-opinii)
5. [Edycja zespolu](#5-edycja-zespolu)
6. [Edycja bloga](#6-edycja-bloga)
7. [Edycja galerii](#7-edycja-galerii)
8. [Edycja strony glownej](#8-edycja-strony-glownej)
9. [Edycja miejsc](#9-edycja-miejsc)
10. [Edycja FAQ (najczesciej zadawane pytania)](#10-edycja-faq)
11. [Edycja korzysci kategorii (benefit cards)](#11-edycja-korzysci-kategorii)
12. [Edycja innych projektow](#12-edycja-innych-projektow)
13. [Jak dodawac zdjecia](#13-jak-dodawac-zdjecia)
14. [Jak zapisac zmiany](#14-jak-zapisac-zmiany)
15. [Tryb lokalny vs GitHub](#15-tryb-lokalny-vs-github)

**Poradniki krok po kroku:**
- [Poradnik 1: Dodaje nowy warsztat od zera](#poradnik-1-dodaje-nowy-warsztat-od-zera)
- [Poradnik 2: Zmieniam termin warsztatu](#poradnik-2-zmieniam-termin-istniejacego-warsztatu)
- [Poradnik 3: Warsztat jest wyprzedany](#poradnik-3-warsztat-jest-wyprzedany)
- [Poradnik 4: Pisze nowy artykul na bloga](#poradnik-4-pisze-nowy-artykul-na-bloga)
- [Poradnik 5: Aktualizuje ceny i cennik](#poradnik-5-aktualizuje-ceny-i-cennik-warsztatu)
- [Poradnik 6: Dodaje nowa osobe do zespolu](#poradnik-6-dodaje-nowa-osobe-do-zespolu)
- [Poradnik 7: Co NIE da sie zmienic przez CMS](#poradnik-7-co-nie-da-sie-zmienic-przez-cms)

---

## 1. Jak wejsc do panelu CMS

### Tryb lokalny (development)

1. Uruchom serwer deweloperski:
   ```
   npm run dev
   ```
2. Otworz przegladarke i wejdz na:
   ```
   http://localhost:3000/keystatic
   ```
3. Jesli nie ma ustawionych hasel w `.env` — panel otworzy sie od razu.

### Tryb produkcyjny (Vercel + GitHub mode)

1. Wejdz na:
   ```
   https://wyjazdyzdziecmi.pl/keystatic
   ```
2. Kliknij **Sign in with GitHub**.
3. Zaloguj sie swoim kontem GitHub (musisz byc collaborator w repozytorium).
4. Po zalogowaniu zobaczysz panel CMS.

**Uwaga:** Jesli widzisz strone 404, oznacza to, ze tryb GitHub nie jest skonfigurowany. Patrz sekcja 15 ponizej lub `docs/setup-external-services.md`.

---

## 2. Nawigacja po panelu

Po wejsciu do panelu zobaczysz boczny panel z sekcjami:

### Kolekcje (listy elementow)
| Sekcja              | Co zawiera                              |
|--------------------|------------------------------------------|
| **Wyjazdy**         | Wszystkie wyjazdy (aktualne i przeszle) |
| **Zespol**          | Osoby prowadzace                        |
| **Opinie**          | Opinie uczestnikow                      |
| **Blog**            | Artykuly blogowe                        |
| **Galeria**         | Zdjecia do strony galerii               |
| **Inne projekty**   | Inne projekty (Joga z Maria, Enviar)    |

### Singletony (unikalne strony/sekcje)
| Sekcja                          | Co zawiera                                          |
|---------------------------------|------------------------------------------------------|
| **Miejsca**                      | Osrodki/lokalizacje wyjazdow                        |
| **Strona glowna**                | Ustawienia strony glownej (np. wyrozone opinie)     |
| **FAQ (strona glowna)**          | Pytania i odpowiedzi na stronie glownej             |
| **Korzysci kategorii**           | Karty "Dlaczego warto?" na stronach kategorii       |

---

## 3. Edycja wyjazdow

### Otworz istniejacy wyjazd
1. Kliknij **Wyjazdy** w bocznym panelu.
2. Zobaczysz liste: np. "Matka i Corka", "Yoga i Konie", itd.
3. Kliknij na wyjazd, ktory chcesz edytowac.

### Co mozesz zmieniac

| Pole                    | Opis                                          |
|------------------------|------------------------------------------------|
| Nazwa wyjazdu          | Tytul wyswietlany na stronie                  |
| Podtytul               | Krotki opis pod tytulem                        |
| Data rozpoczecia       | Format: `2026-06-15` (rok-miesiac-dzien)      |
| Data zakonczenia       | Format: `2026-06-17`                           |
| Lokalizacja            | Np. "Kacze Bagno"                              |
| Kategoria              | "Rodzinny", "Matka z corka", "Single z dziecmi", "Czas bez dzieci" |
| Krotki opis            | Tekst na karcie wyjazdu (strona glowna)        |
| Dlugi opis             | Pelny opis na podstronie wyjazdu               |
| Zdjecie glowne         | Sciezka do zdjecia, np. `/images/matka-corka.jpg` |
| Zakonczony             | Ignorowane — system automatycznie oznacza wyjazd jako zakonczony na podstawie daty zakonczenia. Nie musisz tego zaznaczac. |
| Liczba miejsc (ogolem) | Np. 15                                         |
| Pozostale miejsca      | Np. 5 (gdy 0 — pojawia sie lista oczekujacych) |
| Zaliczka (zl)          | Kwota zaliczki                                 |
| Deadline early bird    | Data promocyjnej ceny                          |
| Cena early bird (zl)   | Cena przed deadlinem                           |

### Sekcje rozwijane wyjazdu

**Grupa docelowa** — kliknij "+ Dodaj" aby dodac nowa pozycje:
- Etykieta: np. "Mamy z corkami 5+"
- Opis: dodatkowe wyjasnienie

**Program (harmonogram)** — dodaj dni:
- Etykieta dnia: np. "Dzien 1 — Piatek"
- Data: `2026-06-15`
- Aktywnosci: dodaj godzine + opis (np. "16:00" + "Przyjazd i zakwaterowanie")

**Informacje praktyczne:**
- Zakwaterowanie
- Wyzywienie
- Dojazd

**Cennik** — warianty cenowe:
- Np. "Dorosly + dziecko: 1500 zl", "Dodatkowe dziecko: 400 zl"

**Cena zawiera / Cena nie zawiera** — listy pozycji

**Wspolprowadzacy** — dane osoby wspolprowadzacej:
- Imie, rola, bio, zdjecie

**FAQ** — pytania i odpowiedzi

**Galeria** — zdjecia do podstrony wyjazdu (szczegoly w sekcji 10)

**Bloki tresci** — przeplatane teksty i zdjecia na podstronie:
- Typ "Tekst" — wpisz tresc
- Typ "Zdjecie" — wpisz sciezke i opis alternatywny

### Dodaj nowy wyjazd
1. Wejdz do **Wyjazdy**.
2. Kliknij przycisk **"Create"** (Utworz) w gornym rogu.
3. Wpisz nazwe wyjazdu — stanie sie tez adresem URL (np. "Joga i Konie" → `/wyjazdy/joga-i-konie`).
4. Wypelnij **obowiazkowe pola** (oznaczone gwiazdka):
   - Nazwa, podtytul, daty, lokalizacja, kategoria
   - Krotki opis (widoczny na karcie wyjazdu)
   - Dlugi opis (widoczny na podstronie)
   - Zdjecie glowne
5. Wypelnij **sekcje rozwijane** (moga byc puste na poczatek — dodasz pozniej):
   - Grupa docelowa, program, info praktyczne, cennik, FAQ, galeria
6. Kliknij **"Save"** (Zapisz).
7. Wyjazd pojawi sie na stronie w ciagu kilku minut (po przebudowie na Vercel).

### Zmiana terminu wyjazdu
1. Otworz wyjazd, ktory chcesz przeniesc.
2. Zmien pola **Data rozpoczecia** i **Data zakonczenia**.
3. Jesli masz program (harmonogram) — zmien tez daty i etykiety dni.
4. Kliknij **Save**.

**Wazne:** System automatycznie oznacza wyjazd jako "zakonczony" gdy minie data zakonczenia. Nie musisz tego robic recznie.

### Zmiana liczby miejsc
1. Otworz wyjazd.
2. Zmien pole **Pozostale miejsca**.
3. Gdy wstawisz **0** — na stronie pojawi sie formularz "Lista oczekujacych" zamiast rezerwacji.
4. Kliknij **Save**.

### Usuwanie wyjazdu
Nie usuwaj starych wyjazdow — pozostaw je. System automatycznie przenosi je do sekcji "Zakonczone". Stare wyjazdy buduja zaufanie u nowych klientow.

---

## 4. Edycja opinii

1. Kliknij **Opinie** w bocznym panelu.
2. Kliknij na opinie do edycji lub **"Create"** aby dodac nowa.
3. Pola:
   - **Autor** — imie osoby (stanie sie tez identyfikatorem opinii)
   - **Cytat** — tresc opinii (pelny tekst)
   - **Kontekst** — np. "mama 7-letniej Zuzi", "uczestniczka wyjazdu z joga i konmi"
   - **Wyjazd** — nazwa wyjazdu (opcjonalne, np. "Matka i Corka")
   - **Data dodania** — format `2026-03-15`. Opinie z data sa sortowane od najnowszych. Opinie bez daty wyswietlaja sie na koncu.
4. Kliknij **Save**.

### Opinie na stronie glownej
Na stronie glownej wyswietlaja sie tylko **wyrozone** opinie (3 sztuki). Aby zmienic ktore opinie sa wyrozone:
1. Wejdz do **Strona glowna** (singleton).
2. Edytuj liste **Wyrozone opinie** — wpisz identyfikatory (slug) opinii, np. `ania`, `katarzyna`, `marta`.
3. Identyfikator opinii to nazwa pliku — widoczna w liscie opinii jako pierwszy czlon URL.

---

## 5. Edycja zespolu

1. Kliknij **Zespol**.
2. Pola:
   - **Imie i nazwisko**
   - **Rola** — np. "Prowadzaca"
   - **Bio** — pelny opis osoby (wyswietlany na stronie /o-nas)
   - **Krotkie bio** — skrocony opis wyswietlany na stronie glownej w sekcji "Poznajmy sie". Jesli puste, uzyje pelnego bio.
   - **Zdjecie** — sciezka, np. `/images/maria-sloneczniki.jpg`

---

## 6. Edycja bloga

### Edycja istniejacego artykulu
1. Kliknij **Blog** w bocznym panelu.
2. Wybierz artykul z listy.
3. Edytuj pola lub tresc.
4. Kliknij **Save**.

### Dodaj nowy artykul — krok po kroku
1. Kliknij **Blog** > **Create**.
2. Wpisz **Tytul** — stanie sie tez adresem URL (np. "Jak spakowac dziecko" → `/blog/jak-spakowac-dziecko`).
3. Wpisz **Podtytul** — krotkie streszczenie (1-2 zdania). Wyswietlany na karcie artykulu na stronie glownej i /blog.
4. Wpisz **Date publikacji** — format `2026-03-06` (rok-miesiac-dzien). Artykuly sortowane od najnowszych.
5. Wpisz **Zdjecie** (opcjonalne) — sciezka do zdjecia, np. `/images/blog/nowy-artykul.jpg`. Wyswietlane na karcie artykulu. Jesli puste — karta bedzie bez zdjecia.
6. Napisz **Tresc** w edytorze Markdoc.
7. Kliknij **Save**.

### Edytor Markdoc — formatowanie tresci
Edytor Markdoc obsluguje podstawowe formatowanie:

| Chce...              | Wpisz                              | Efekt                    |
|---------------------|-------------------------------------|--------------------------|
| Naglowek sekcji      | `## Moj naglowek`                 | Duzy pogrubiony tekst    |
| Podnaglowek          | `### Mniejszy naglowek`            | Sredni pogrubiony tekst  |
| Pogrubienie          | `**wazny tekst**`                  | **wazny tekst**          |
| Kursywa              | `*kursywa*`                        | *kursywa*                |
| Lista punktowa       | `- element`                        | punkt z kreska           |
| Lista numerowana     | `1. element`                       | numerowany punkt         |
| Link                 | `[tekst](https://adres.pl)`       | klikalny link            |
| Pusta linia          | (pusta linia miedzy akapitami)     | nowy akapit              |

### Wskazowki do bloga
- Na stronie glownej wyswietlaja sie **3 najnowsze artykuly** (wg daty).
- Zdjecie warto miec — artykuly z obrazkiem wygladaja lepiej na karcie.
- Zdjecia blogowe trzymaj w folderze `public/images/blog/`.
- Dobra dlugosc artykulu to 500-1500 slow.
- Podtytul powinien zachecac do klikniecia — to pierwsze co widzi czytelnik na karcie.

---

## 7. Edycja galerii

1. Kliknij **Galeria**.
2. Kazde zdjecie to osobny wpis z polami:
   - **Opis alternatywny** — co widac na zdjeciu (wazne dla dostepnosci i SEO)
   - **Sciezka do zdjecia** — np. `/images/matki-corki-1.jpg`
   - **Kategoria** — opcjonalnie, np. "matka-corka"

### Dodaj nowe zdjecie do galerii
1. Najpierw dodaj plik zdjecia do folderu `public/images/` (patrz sekcja 10).
2. Wejdz do **Galeria** > **Create**.
3. Wpisz opis i sciezke `/images/nazwa-pliku.jpg`.

---

## 8. Edycja strony glownej

1. Kliknij **Strona glowna** w sekcji "Singletony".
2. Mozesz zmienic **Wyrozone opinie** — to lista ID (slug) opinii wyswietlanych na stronie glownej.
3. ID opinii to ich nazwy plikow, np. `ania`, `katarzyna`, `malgorzata`, `marta`.
4. Aby zmienic wyrozone opinie: usun lub dodaj ID z listy.

---

## 9. Edycja miejsc

1. Kliknij **Miejsca** w sekcji "Singletony".
2. Zobaczysz liste osrodkow. Mozesz:
   - Edytowac nazwe, opis, URL
   - Dodawac/usuwac zdjecia (sciezki)
   - Dodawac/usuwac cechy osrodka

---

## 10. Edycja FAQ

FAQ to sekcja "Najczesciej zadawane pytania" wyswietlana na dole strony glownej.

1. Kliknij **FAQ (strona glowna)** w sekcji "Singletony".
2. Zobaczysz liste pytan. Mozesz:
   - **Edytowac** istniejace pytania i odpowiedzi
   - **Dodac nowe** — kliknij "+ Dodaj" na dole listy
   - **Usunac** — kliknij ikone kosza przy pytaniu
   - **Zmienic kolejnosc** — przeciagnij pytanie w gore lub dol

### Pola
| Pole       | Opis                                    |
|------------|-----------------------------------------|
| **Pytanie** | Tresc pytania wyswietlana na stronie   |
| **Odpowiedz** | Pelna odpowiedz (rozwija sie po kliknieciu) |

### Wskazowki
- Pytania pojawiaja sie takze w wynikach Google (schema.org FAQPage)
- Staraj sie pisac pelne, wyczerpujace odpowiedzi
- Optymalna liczba pytan: 5-10

---

## 11. Edycja korzysci kategorii

Karty "Dlaczego warto?" wyswietlane na 4 stronach kategorii:
- /warsztaty-z-dziecmi (Rodzinny)
- /matka-z-corka (Matka z corka)
- /single-z-dziecmi (Single z dziecmi)
- /dla-doroslych (Czas bez dzieci)

1. Kliknij **Korzysci kategorii (benefit cards)** w sekcji "Singletony".
2. Zobaczysz 4 kategorie. Kliknij na kategorie, ktora chcesz edytowac.

### Pola kategorii
| Pole        | Opis                                                |
|-------------|------------------------------------------------------|
| **Kategoria** | Ktora strona kategorii (nie zmieniaj!)             |
| **Podtytul**  | Tekst pod naglowkiem "Dlaczego warto?"             |

### Pola korzysci (benefit card)
| Pole       | Opis                                              |
|------------|---------------------------------------------------|
| **Ikona**   | Wybierz z listy (Heart, Shield, TreePine, itd.)  |
| **Tytul**   | Krotki tytul korzysci, np. "Czas tylko dla Was"  |
| **Opis**    | 1-2 zdania opisujace korzysc                     |

### Wskazowki
- Kazda kategoria powinna miec 6 kart (3 kolumny × 2 wiersze)
- Ikony do wyboru: Heart, Shield, Users, TreePine, Smile, Sparkles, Music, Sun, Flower2, Coffee
- Opisy powinny byc zwiezle — 1-2 krotkie zdania

---

## 12. Edycja innych projektow

Strona /inne-projekty wyswietla inne inicjatywy (np. Joga z Maria, Enviar).

1. Kliknij **Inne projekty** w bocznym panelu.
2. Zobaczysz liste projektow. Mozesz edytowac istniejace lub dodac nowe.

### Pola
| Pole                  | Opis                                                |
|-----------------------|------------------------------------------------------|
| **Nazwa projektu**     | Tytul wyswietlany na stronie                        |
| **Podtytul / tagline** | Krotki opis pod tytulem                             |
| **Opis**               | Pelny opis (akapity oddzielone pusta linia)         |
| **Zdjecie**            | Sciezka do zdjecia, np. `/images/marysia.png`       |
| **Wideo**              | Sciezka do wideo, np. `/videos/joga.mp4`. Jesli podane, wyswietla sie zamiast zdjecia. |
| **Kolejnosc**          | Numer kolejnosci (1, 2, 3...) — projekty sortowane rosnaco |
| **Linki zewnetrzne**   | Przyciski z linkami (np. Facebook, Instagram)        |

### Dodaj nowy projekt
1. Wejdz do **Inne projekty** > **Create**.
2. Wypelnij nazwe, tagline, opis.
3. Dodaj zdjecie lub wideo.
4. Dodaj linki (np. Facebook, strona www).
5. Ustaw kolejnosc wyswietlania.
6. Kliknij **Save**.

---

## 13. Jak dodawac zdjecia

### Krok 1: Przygotuj zdjecie

- **Format**: JPG (zalecany) lub PNG
- **Rozmiar**: max 1920px szerokosc, zoptymalizuj w np. [squoosh.app](https://squoosh.app) do ~200-400 KB
- **Nazwa pliku**: bez polskich znakow, bez spacji. Uzyj myslnikow:
  - Dobrze: `matki-corki-9.jpg`
  - Zle: `Matki i córki (9).jpg`

### Krok 2: Dodaj plik do projektu

**Tryb lokalny:**
Skopiuj zdjecie do folderu:
```
public/images/
```
Np. plik `nowe-zdjecie.jpg` wyląduje w `public/images/nowe-zdjecie.jpg`.

**Tryb GitHub:**
Dodaj zdjecie do repozytorium GitHub w folderze `public/images/` (przez interfejs GitHub lub git push).

### Krok 3: Uzyj sciezki w CMS

W kazdym polu typu "zdjecie" wpisz sciezke zaczynajac od `/images/`:
```
/images/nowe-zdjecie.jpg
```

### Gdzie uzywa sie zdjec

| Miejsce w CMS                | Przyklad sciezki            |
|------------------------------|------------------------------|
| Wyjazd > Zdjecie glowne     | `/images/matka-corka.jpg`   |
| Wyjazd > Galeria > Zdjecie  | `/images/matki-corki-1.jpg` |
| Wyjazd > Bloki tresci       | `/images/kazce-bagno-2.jpg` |
| Wyjazd > Wspolprowadzacy    | `/images/kamila.jpg`        |
| Zespol > Zdjecie             | `/images/maria.jpg`         |
| Galeria > Sciezka            | `/images/przeszly-1.jpg`    |

### Lista istniejacych zdjec

Aktualnie dostepne w `public/images/`:
```
galeria-1.jpg              matki-corki-5.jpg
hero.jpg                   matki-corki-6.jpg
kacze-bagno.jpg            matki-corki-7.jpg
kamila.jpg                 matki-corki-8.jpg
kazce-bagno-1.jpg          marysia.png
kazce-bagno-2.jpg          matka-corka.jpg
kazce-bagno-3.jpg          matka-corka-category.jpg
kazce-bagno-4.jpg          przeszly-1.jpg
logo.jpeg                  przeszly-2.jpg
maria.jpg                  przeszly-3.jpg
maria-2.jpg                przeszly-4.jpg
maria-portrait.jpg         przeszly-5.jpg
maria-sloneczniki.jpg      yoga-konie.jpg
matki-corki-1.jpg
matki-corki-2.jpg          blog/
matki-corki-3.jpg            jak-przygotowac-dziecko.jpg
matki-corki-4.jpg            dlaczego-warto-podrozowac.jpg
                             jak-przetrwac-podroz.jpg
```

---

## 14. Jak zapisac zmiany

### Tryb lokalny (development)

1. Po edycji kliknij **"Save"** (Zapisz) w prawym gornym rogu.
2. Keystatic zapisze zmiany bezposrednio w plikach YAML w folderze `content/`.
3. Zmiany widac natychmiast na `http://localhost:3000`.
4. **Aby zmiany pojawily sie na produkcji**, trzeba je commitnac i pushnac do GitHuba:
   ```
   git add content/
   git commit -m "aktualizacja tresci"
   git push
   ```
5. Vercel automatycznie zbuduje nowa wersje strony (2-3 minuty).

### Tryb GitHub (produkcja)

1. Kliknij **"Save"** — Keystatic automatycznie utworzy commit w repozytorium GitHub.
2. Vercel wykryje zmiane i zbuduje strone automatycznie.
3. Nie trzeba recznego `git push` — wszystko dzieje sie przez przegladarke.

### Wazne zasady

- **Kliknij "Save"** po kazdej zmianie — bez tego nic nie zostanie zapisane.
- Jesli edytujesz wiele rzeczy naraz, mozesz zapisywac po kazdej zmianie lub na koncu.
- Jesli zamkniesz kartaprzegladarki bez zapisania — zmiany zostana utracone.
- Blog uzywa edytora Markdoc — zmiany w tresci zapisuja sie w pliku `.mdoc`.

---

## 15. Tryb lokalny vs GitHub

| Cecha                  | Tryb lokalny              | Tryb GitHub                   |
|------------------------|---------------------------|-------------------------------|
| Gdzie zapisuje         | Pliki na dysku            | Commity w repozytorium GitHub |
| Wymaga git push        | Tak (reczny push)         | Nie (automatyczny commit)     |
| Dostep                 | Tylko na Twoim komputerze | Przez przegladarke, zewszad   |
| Logowanie              | Opcjonalne                | GitHub OAuth                  |
| Konfiguracja           | Zero (domyslny tryb)     | Wymaga env vars na Vercel     |

### Jak wlaczyc tryb GitHub — krok po kroku

Tryb GitHub pozwala edytowac tresci przez przegladarke na `wyjazdyzdziecmi.pl/keystatic`. Zmiany zapisuja sie bezposrednio w repozytorium GitHub, a Vercel automatycznie przebudowuje strone.

**Wymagania:** konto GitHub dla kazdej osoby, ktora ma edytowac tresci.

#### Krok 1 — Klient zaklada konto GitHub
1. Klient wchodzi na https://github.com/signup
2. Tworzy darmowe konto (np. `maria-kordalewska`)
3. Nie musi nic wiedziec o kodzie — bedzie logowac sie tylko przez przycisk na `/keystatic`

#### Krok 2 — Dodaj klienta jako collaborator do repozytorium
1. Wejdz na https://github.com/TatianaG-ka/wyjazdy-z-dziecmi/settings/access
2. Kliknij **Invite a collaborator**
3. Wpisz username klienta (np. `maria-kordalewska`) → wyslij zaproszenie
4. Klient akceptuje zaproszenie (dostanie email od GitHub)

#### Krok 3 — Stworz GitHub App (jednorazowo)
1. Wejdz na https://github.com/settings/apps/new
2. Wypelnij formularz:

| Pole | Wartosc |
|------|---------|
| **GitHub App name** | `wyjazdy-z-dziecmi-cms` |
| **Homepage URL** | `https://wyjazdyzdziecmi.pl` |
| **Callback URL** | `https://wyjazdyzdziecmi.pl/api/keystatic/github/oauth/callback` |
| **Request user authorization (OAuth)** | Zaznacz |
| **Webhook → Active** | Odznacz (nie potrzebujemy) |

3. W sekcji **Permissions → Repository permissions**:
   - **Contents**: Read & write
   - Reszta zostaw domyslnie (No access)
4. Kliknij **Create GitHub App**
5. Na stronie utworzonej apki:
   - Skopiuj **Client ID** (widoczny od razu)
   - Kliknij **Generate a new client secret** → skopiuj secret (wyswietla sie raz!)
6. **Install App** (przycisk w lewym menu) → wybierz `TatianaG-ka` → **Only select repositories** → wybierz `wyjazdy-z-dziecmi` → Install

#### Krok 4 — Dodaj zmienne srodowiskowe na Vercel
1. Wejdz na https://vercel.com → projekt `wyjazdy-z-dziecmi` → **Settings** → **Environment Variables**
2. Dodaj 5 zmiennych (Environment: Production + Preview + Development):

| Zmienna | Wartosc | Skad |
|---------|---------|------|
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` | `TatianaG-ka` | Twoj GitHub username |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | `wyjazdy-z-dziecmi` | Nazwa repo |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv1.abc123...` | Z kroku 3, pkt 5 |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `secret_abc123...` | Z kroku 3, pkt 5 |
| `KEYSTATIC_SECRET` | losowy ciag 64 znakow | Wygeneruj: `openssl rand -hex 32` |

3. Kliknij **Redeploy**: Deployments → wybierz najnowszy → **...** → **Redeploy**

#### Krok 5 — Test
1. Wejdz na `https://wyjazdyzdziecmi.pl/keystatic`
2. Kliknij **Sign in with GitHub**
3. Zaloguj sie kontem GitHub
4. Powinien sie pojawic panel CMS z lista kolekcji

#### Krok 6 — Klient testuje
1. Klient wchodzi na `https://wyjazdyzdziecmi.pl/keystatic`
2. Klika **Sign in with GitHub** → loguje sie swoim kontem
3. Edytuje cos (np. opinie) → klika **Save**
4. Po 2-3 minutach zmiana pojawia sie na stronie (automatyczny build na Vercel)

#### Rozwiazywanie problemow

| Problem | Rozwiazanie |
|---------|-------------|
| Strona 404 na `/keystatic` | Sprawdz czy env vars sa ustawione na Vercel. Bez `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER` panel jest zablokowany. |
| "Not authorized" po zalogowaniu | Sprawdz czy klient jest collaborator w repo (krok 2) |
| "OAuth error" | Sprawdz Callback URL w GitHub App — musi dokladnie pasowac |
| Zmiany nie pojawiaja sie na stronie | Sprawdz Vercel Deployments — czy build przeszedl po commit |
| Klient nie dostaje zaproszenia | Sprawdz poprawnosc GitHub username w zaproszeniu |

#### Dodawanie kolejnych edytorow
1. Dodaj osobe jako collaborator do repozytorium (krok 2)
2. Gotowe — osoba moze sie logowac na `/keystatic`

Nie trzeba nic zmieniac w GitHub App ani env vars — kazdy collaborator z kontem GitHub moze sie logowac.

---

## Szybka sciagawka

| Chce...                            | Kroki                                                           |
|-----------------------------------|-----------------------------------------------------------------|
| Zmienic cene wyjazdu              | Wyjazdy > wybierz > Cennik > edytuj > Save                     |
| Dodac nowy wyjazd                 | Wyjazdy > Create > wypelnij > Save                              |
| Zmienic ilosc miejsc              | Wyjazdy > wybierz > "Pozostale miejsca" > Save                 |
| Oznaczyc wyjazd jako zakonczony   | Automatyczne — system sam oznacza po dacie zakonczenia          |
| Dodac opinie                       | Opinie > Create > wypelnij > Save                               |
| Zmienic opinie na glownej          | Strona glowna > edytuj liste ID > Save                          |
| Dodac zdjecie do galerii           | 1) Dodaj plik do `public/images/` 2) Galeria > Create           |
| Napisac nowy artykul               | Blog > Create > wypelnij + napisz tresc > Save                  |
| Zmienic bio prowadzacej            | Zespol > wybierz osobe > edytuj Bio > Save                      |
| Zmienic bio na stronie glownej     | Zespol > wybierz osobe > edytuj "Krotkie bio" > Save            |
| Dodac/zmienic pytanie FAQ          | FAQ (strona glowna) > edytuj/dodaj pytanie > Save               |
| Zmienic korzysci na str. kategorii | Korzysci kategorii > wybierz kategorie > edytuj > Save          |
| Dodac nowy projekt                 | Inne projekty > Create > wypelnij > Save                        |
| Zmienic opis projektu              | Inne projekty > wybierz projekt > edytuj > Save                 |

---

## Poradniki krok po kroku

### Poradnik 1: Dodaje nowy warsztat od zera

Wyobraz sobie, ze planujesz nowy wyjazd "Ceramika i Las" w pazdzierniku 2026.

**Krok 1 — Przygotuj materialy**
- Zdjecie glowne warsztatu (min. 1200px szerokosc, format JPG)
- Zdjecie wspolprowadzacego (jesli jest)
- Krotki opis (2-3 zdania na karte)
- Pelny opis (kilka akapitow)
- Harmonogram (godziny + aktywnosci na kazdy dzien)
- Cennik (warianty)
- FAQ (3-5 pytan, ktore moga zadawac uczestnicy)

**Krok 2 — Dodaj zdjecia**
1. Zoptymalizuj zdjecia na [squoosh.app](https://squoosh.app) (do 200-400 KB).
2. Nazwij pliki bez polskich znakow: `ceramika-las.jpg`, nie `ceramika i las (1).jpg`.
3. Dodaj pliki do folderu `public/images/` (przez GitHub lub lokalnie).

**Krok 3 — Stworz wyjazd w CMS**
1. Wejdz na `/keystatic` > **Wyjazdy** > **Create**.
2. Wypelnij dane:
   - Nazwa: `Ceramika i Las — jesienny weekend`
   - Data rozpoczecia: `2026-10-09`
   - Data zakonczenia: `2026-10-11`
   - Lokalizacja: `Kacze Bagno`
   - Kategoria: `Rodzinny`
   - Zdjecie glowne: `/images/ceramika-las.jpg`
   - Pozostale miejsca: np. `15`
3. Wypelnij sekcje rozwijane: grupa docelowa, program, cennik, FAQ.
4. Kliknij **Save**.

**Krok 4 — Sprawdz efekt**
- Wyjazd pojawi sie na stronie glownej w sekcji "Nadchodzace warsztaty".
- Pojawi sie tez w kalendarzu i na odpowiedniej stronie kategorii.
- Jesli wybrales kategorie "Rodzinny" — pojawi sie na `/warsztaty-z-dziecmi`.

**Krok 5 — Dodaj opinie (pozniej)**
Po wyjezdzie, gdy uczestnicy przysla opinie:
1. **Opinie** > **Create** > wpisz autora, cytat, kontekst, date.
2. Jesli chcesz ja wyrozniac na homepage — dodaj jej ID do **Strona glowna** > Wyrozone opinie.

---

### Poradnik 2: Zmieniam termin istniejacego warsztatu

Warsztat "Zlot Kaczek" przesuwa sie z 20-23 sierpnia na 27-30 sierpnia.

1. Wejdz na `/keystatic` > **Wyjazdy** > wybierz "Zlot Kaczek".
2. Zmien **Data rozpoczecia**: `2026-08-20` → `2026-08-27`.
3. Zmien **Data zakonczenia**: `2026-08-23` → `2026-08-30`.
4. Jesli masz wypelniony **Program (harmonogram)** — zmien daty i etykiety dni:
   - "Czwartek, 20 sierpnia" → "Czwartek, 27 sierpnia"
   - itd. dla kazdego dnia
5. Kliknij **Save**.

Kalendarz na stronie zaktualizuje sie automatycznie. Nie trzeba nic wiecej.

---

### Poradnik 3: Warsztat jest wyprzedany

Wszystkie miejsca sa zajete na "Matka i Corka".

1. Wejdz na `/keystatic` > **Wyjazdy** > wybierz "Matka i Corka".
2. Zmien **Pozostale miejsca** na `0`.
3. Kliknij **Save**.

Co sie stanie na stronie:
- Zamiast formularza rezerwacji pojawi sie **formularz listy oczekujacych**.
- Pojawi sie czerwona plakietka "Komplet" na karcie wyjazdu.
- Klienci moga zostawic email — dostaniesz powiadomienie.

Gdy zwolni sie miejsce: zmien "Pozostale miejsca" z powrotem na np. `1`.

---

### Poradnik 4: Pisze nowy artykul na bloga

Chcesz napisac artykul "5 gier na dluga podroz samochodem".

**Krok 1 — Przygotuj zdjecie**
1. Zoptymalizuj zdjecie (squoosh.app, ~300 KB).
2. Nazwij: `gry-na-podroz.jpg`.
3. Dodaj do `public/images/blog/`.

**Krok 2 — Napisz artykul**
1. `/keystatic` > **Blog** > **Create**.
2. Tytul: `5 gier na dluga podroz samochodem`
3. Podtytul: `Sprawdzone zabawy, ktore umila czas w aucie kazdemu dziecku — bez telefonu i tabletu.`
4. Data publikacji: `2026-04-10`
5. Zdjecie: `/images/blog/gry-na-podroz.jpg`
6. Napisz tresc w edytorze:

```
## 1. Gra w kolory

Kazdy wybiera kolor samochodu...

## 2. 20 pytan

Klasyka! Jedno dziecko mysli o czyms...

## 3. Opowiesc na zmiane

Kazdy dodaje jedno zdanie do historii...
```

7. Kliknij **Save**.

Artykul pojawi sie jako najnowszy na stronie glownej (w sekcji Blog) i na `/blog`.

---

### Poradnik 5: Aktualizuje ceny i cennik warsztatu

Na przyklad — podwyzka cen "Joga i Konie".

1. `/keystatic` > **Wyjazdy** > wybierz "Joga i Konie".
2. Przewin do sekcji **Cennik**.
3. Zmien kwoty:
   - "Warsztaty + joga — dorosly": `900` → `1000`
   - "Warsztaty + joga — dziecko": `700` → `800`
4. Opcjonalnie zmien **Zaliczka**: `300` → `350`.
5. Jesli masz **Cena zawiera** / **Cena nie zawiera** — zaktualizuj jesli potrzeba.
6. Jesli chcesz dodac **cene early bird**:
   - Wpisz **Deadline early bird**: `2026-05-15`
   - Wpisz **Cena early bird**: `850`
7. Kliknij **Save**.

---

### Poradnik 6: Dodaje nowa osobe do zespolu

Dolacza nowa wspolprowadzaca — np. Agnieszka, instruktorka ceramiki.

1. Przygotuj zdjecie (zoptymalizowane, np. `agnieszka.jpg`), dodaj do `public/images/`.
2. `/keystatic` > **Zespol** > **Create**.
3. Wypelnij:
   - Imie i nazwisko: `Agnieszka Nowak`
   - Rola: `Instruktorka ceramiki`
   - Bio: pelny opis (kilka akapitow)
   - Krotkie bio: (opcjonalnie — jesli ma sie pojawic na str. glownej)
   - Zdjecie: `/images/agnieszka.jpg`
4. Kliknij **Save**.

Osoba pojawi sie na stronie `/o-nas`.

Jesli Agnieszka wspolprowadzi konkretny warsztat — dodaj ja tez w sekcji **Wspolprowadzacy** danego wyjazdu.

---

### Poradnik 7: Co NIE da sie zmienic przez CMS

Niektore elementy strony wymagaja zmian w kodzie (przez developera):

| Element                              | Dlaczego wymaga kodu                        |
|--------------------------------------|----------------------------------------------|
| Tytul i tekst w hero (strona glowna) | Powiazany z SEO i schema.org                |
| Nazwy kategorii i ich adresy URL     | Powiazane z routingiem i nawigacja           |
| Menu nawigacyjne                     | Powiazane z routami stron                    |
| Numer telefonu / email              | W pliku constants.ts i szablonach emaili      |
| Kolory, czcionki, uklad strony      | Pliki CSS/Tailwind                            |
| Formularz rezerwacji (pola)         | Walidacja Zod + API                           |
| Teksty wstepne na str. kategorii    | Powiazane z layoutem strony                   |

Jesli chcesz zmienic cos z tej listy — skontaktuj sie z developerem.
