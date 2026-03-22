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
10. [Jak dodawac zdjecia](#10-jak-dodawac-zdjecia)
11. [Jak zapisac zmiany](#11-jak-zapisac-zmiany)
12. [Tryb lokalny vs GitHub](#12-tryb-lokalny-vs-github)

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

### Tryb produkcyjny (Vercel)

1. Wejdz na:
   ```
   https://wyjazdyzdziecmi.pl/keystatic
   ```
2. Pojawi sie okno logowania (HTTP Basic Auth).
3. Wpisz login i haslo ustawione w zmiennych srodowiskowych Vercel:
   - `KEYSTATIC_ADMIN_USER` — login
   - `KEYSTATIC_ADMIN_PASSWORD` — haslo

---

## 2. Nawigacja po panelu

Po wejsciu do panelu zobaczysz boczny panel z sekcjami:

### Kolekcje (listy elementow)
| Sekcja       | Co zawiera                          |
|-------------|--------------------------------------|
| **Wyjazdy**  | Wszystkie wyjazdy (aktualne i przeszle) |
| **Zespol**   | Osoby prowadzace                     |
| **Opinie**   | Opinie uczestnikow                   |
| **Blog**     | Artykuly blogowe                     |
| **Galeria**  | Zdjecia do strony galerii            |

### Singletony (unikalne strony)
| Sekcja            | Co zawiera                            |
|-------------------|---------------------------------------|
| **Miejsca**        | Osrodki/lokalizacje wyjazdow         |
| **Strona glowna**  | Ustawienia strony glownej (np. wyrozanione opinie) |

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
| Kategoria              | "Rodzinny" lub "Matka z corka"                 |
| Krotki opis            | Tekst na karcie wyjazdu (strona glowna)        |
| Dlugi opis             | Pelny opis na podstronie wyjazdu               |
| Zdjecie glowne         | Sciezka do zdjecia, np. `/images/matka-corka.jpg` |
| Zakonczony             | Checkbox — zaznacz gdy wyjazd juz sie odbyl    |
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
3. Wypelnij wszystkie pola.
4. Kliknij **"Save"** (Zapisz).

---

## 4. Edycja opinii

1. Kliknij **Opinie** w bocznym panelu.
2. Kliknij na opinie do edycji lub **"Create"** aby dodac nowa.
3. Pola:
   - **Autor** — imie osoby
   - **Cytat** — tresc opinii
   - **Kontekst** — np. "mama 7-letniej Zuzi"
   - **Wyjazd** — nazwa wyjazdu (opcjonalne)

---

## 5. Edycja zespolu

1. Kliknij **Zespol**.
2. Pola:
   - **Imie i nazwisko**
   - **Rola** — np. "Prowadzaca"
   - **Bio** — opis osoby
   - **Zdjecie** — sciezka, np. `/images/maria.jpg`

---

## 6. Edycja bloga

1. Kliknij **Blog**.
2. Artykuly maja edytor tekstowy (Markdoc) — mozesz:
   - Pisac tekst
   - Dodawac naglowki (## Naglowek)
   - Robic listy (- element)
   - Pogrubiac tekst (**pogrubiony**)
3. Pola:
   - **Tytul**
   - **Podtytul**
   - **Data publikacji** — format `2026-03-06`
   - **Tresc** — pelny edytor tekstowy

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

## 10. Jak dodawac zdjecia

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
galeria-1.jpg          matki-corki-1.jpg
hero.jpg               matki-corki-2.jpg
kacze-bagno.jpg        matki-corki-3.jpg
kamila.jpg             matki-corki-4.jpg
kazce-bagno-1.jpg      matki-corki-5.jpg
kazce-bagno-2.jpg      matki-corki-6.jpg
kazce-bagno-3.jpg      matki-corki-7.jpg
kazce-bagno-4.jpg      matki-corki-8.jpg
logo.jpeg              przeszly-1.jpg
maria.jpg              przeszly-2.jpg
maria-2.jpg            przeszly-3.jpg
matka-corka.jpg        przeszly-4.jpg
yoga-konie.jpg         przeszly-5.jpg
```

---

## 11. Jak zapisac zmiany

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

## 12. Tryb lokalny vs GitHub

| Cecha                  | Tryb lokalny              | Tryb GitHub                   |
|------------------------|---------------------------|-------------------------------|
| Gdzie zapisuje         | Pliki na dysku            | Commity w repozytorium GitHub |
| Wymaga git push        | Tak (reczny push)         | Nie (automatyczny commit)     |
| Dostep                 | Tylko na Twoim komputerze | Przez przegladarke, zewszad   |
| Logowanie              | Opcjonalne                | GitHub OAuth                  |
| Konfiguracja           | Zero (domyslny tryb)     | Wymaga env vars na Vercel     |

### Jak wlaczyc tryb GitHub

Na Vercel dodaj zmienne srodowiskowe:
```
NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER=twoj-github-username
NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO=nazwa-repozytorium
KEYSTATIC_GITHUB_CLIENT_ID=xxx
KEYSTATIC_GITHUB_CLIENT_SECRET=xxx
KEYSTATIC_SECRET=losowy-ciag-znakow
```

Instrukcja tworzenia GitHub App: https://keystatic.com/docs/github-mode

---

## Szybka sciagawka

| Chce...                        | Kroki                                                  |
|-------------------------------|--------------------------------------------------------|
| Zmienic cene wyjazdu          | Wyjazdy > wybierz > Cennik > edytuj > Save             |
| Dodac nowy wyjazd             | Wyjazdy > Create > wypelnij > Save                     |
| Zmienic ilosc miejsc          | Wyjazdy > wybierz > "Pozostale miejsca" > Save         |
| Oznaczyc wyjazd jako zakonczony | Wyjazdy > wybierz > zaznacz "Zakonczony" > Save      |
| Dodac opinie                   | Opinie > Create > wypelnij > Save                      |
| Zmienic opinie na glownej      | Strona glowna > edytuj liste ID > Save                 |
| Dodac zdjecie do galerii       | 1) Dodaj plik do `public/images/` 2) Galeria > Create  |
| Napisac nowy artykul           | Blog > Create > wypelnij + napisz tresc > Save         |
| Zmienic bio prowadzacej        | Zespol > wybierz osobe > edytuj Bio > Save             |
