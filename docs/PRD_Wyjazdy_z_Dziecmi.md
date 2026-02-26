# PRD — Product Requirements Document

## Wyjazdy z Dziećmi

*Platforma rezerwacji wyjazdów warsztatowych dla rodzin*

**Wersja:** 1.0 | **Data:** 25 lutego 2026 | **Autor:** Zespół Projektowy
**Status:** Draft | **Domena:** www.wyjazdyzdziecmi.pl

---

## Spis treści

1. [Streszczenie projektu (Executive Summary)](#1-streszczenie-projektu-executive-summary)
2. [Problem i kontekst rynkowy](#2-problem-i-kontekst-rynkowy)
3. [Cele projektu i kryteria sukcesu (KPI)](#3-cele-projektu-i-kryteria-sukcesu-kpi)
4. [Grupa docelowa i persony użytkowników](#4-grupa-docelowa-i-persony-użytkowników)
5. [Zakres funkcjonalny (Scope)](#5-zakres-funkcjonalny-scope)
6. [Architektura informacji i mapa strony](#6-architektura-informacji-i-mapa-strony)
7. [Wymagania UX/UI](#7-wymagania-uxui)
8. [Szczegółowy opis funkcjonalności](#8-szczegółowy-opis-funkcjonalności)
9. [Integracje i automatyzacje (n8n)](#9-integracje-i-automatyzacje-n8n)
10. [Stos technologiczny](#10-stos-technologiczny)
11. [Plan wdrożenia (Roadmap)](#11-plan-wdrożenia-roadmap)
12. [Wymagania niefunkcjonalne](#12-wymagania-niefunkcjonalne)
13. [Ryzyka i ograniczenia](#13-ryzyka-i-ograniczenia)
14. [Załączniki i inspiracje](#14-załączniki-i-inspiracje)

---

## 1. Streszczenie projektu (Executive Summary)

"Wyjazdy z Dziećmi" to cyfrowa platforma rezerwacyjna dedykowana rodzinom poszukującym jakościowego czasu spędzanego wspólnie z dziećmi — w otoczeniu natury, z dala od ekranów i pośpiechu codzienności. Projekt łączy w sobie filozofię slow life z nowoczesną automatyzacją, tworząc środowisko, w którym rodzic w kilka kliknięć może zapisać rodzinę na wyjazd warsztatowy.

Inicjatorka projektu, Maria Kordalewska, jest doświadczoną organizatorką wyjazdów, pilotką wycieczek, nauczycielką jogi i doktorem nauk o mediach. Dotychczas rezerwacje odbywały się ręcznie (Facebook, e-mail, wiadomości prywatne), co ograniczało skalowalność i generowało ryzyko utraty zgłoszeń.

Platforma zostanie zbudowana w architekturze low-code (Claude code+ n8n + Airtable + Supabase) z chatbotem RAG, systemem voucherów i pełną automatyzacją procesu rezerwacji — od formularza po potwierdzenie e-mail i wpis do bazy CRM.

---

## 2. Problem i kontekst rynkowy

### 2.1. Opis problemu

Rodzice nie mają jednego, czytelnego miejsca, w którym zobaczą wszystkie aktualne wyjazdy z programem, ceną, warunkami i prostym sposobem zapisu. Informacje są rozproszone między Facebookiem, pocztą głosową i poleceniami ustnymi, co prowadzi do utraty potencjalnych zgłoszeń i erozji zaufania.

Dla organizatorki proces zapisu jest całkowicie ręczny: maile, wiadomości prywatne, notatki. Trudno śledzić, kto się zgłosił, kto wpłacił zaliczkę, a dane uczestników nie budują się w jedną bazę. Brakuje narzędzi do budowania relacji długoterminowych (newsletter, follow-upy, chatbot).

### 2.2. Analiza wymiarów problemu

| Wymiar | Opis mechanizmu wpływu | Implikacje projektowe |
|---|---|---|
| **Bariera zaufania** | Rodzice powierzają organizatorowi bezpieczeństwo dzieci — wymagają silnego dowodu społecznego i profesjonalizmu wizualnego | Ekspozycja autentycznych opinii, biogramów ekspertów, materiałów wizualnych z wyjazdów |
| **Tarcie decyzyjne** | Skomplikowane formularze i brak jasnego harmonogramu prowadzą do porzucenia procesu rezerwacji | Minimalistyczne formularze, natychmiastowe potwierdzenia automatyczne (n8n) |
| **Przeciążenie informacyjne** | Nadmiar tekstu bez hierarchii wizualnej uniemożliwia szybkie zrozumienie wartości wyjazdu | Układy Z-pattern/F-pattern, copywriting oparty na korzyściach |
| **Zarządzanie manualne** | Ręczne odpowiadanie na pytania o terminy, ceny, diety zabiera czas na merytoryczne przygotowanie warsztatów | Chatbot RAG + integracja Airtable z automatyzacją mailową |

---

## 3. Cele projektu i kryteria sukcesu (KPI)

### 3.1. Cele strategiczne

- Stworzenie centralnego punktu sprzedaży i komunikacji marki "Wyjazdy z Dziećmi"
- Automatyzacja procesu rezerwacji od formularza do potwierdzenia mailowego i wpisu do CRM
- Redukcja czasu administracyjnego organizatorki o minimum 70%
- Budowa bazy klientów i listy newsletterowej jako fundament długoterminowego wzrostu
- Uruchomienie dodatkowych kanałów monetyzacji (vouchery, blog, cross-selling innych usług)

### 3.2. Kluczowe wskaźniki efektywności (KPI)

| Metryka | Definicja | Cel (Benchmark) |
|---|---|---|
| **Conversion Rate (CVR)** | % osób wypełniających formularz zapisu | > 5% |
| **Lead-to-Booking Rate** | % osób dokonujących wpłaty zaliczki po zapytaniu | > 40% |
| **Bounce Rate** | % osób opuszczających stronę bez interakcji | < 40% |
| **Avg. Time on Page** | Czas poświęcony na przeglądanie oferty | 1,5–3 minuty |
| **Form Abandonment Rate** | % osób porzucających formularz w trakcie | < 30% |
| **Newsletter Growth** | Nowe adresy e-mail miesięcznie | +20–30 / miesiąc |
| **LCP (Core Web Vitals)** | Largest Contentful Paint | < 2,5 s |
| **CLS (Core Web Vitals)** | Cumulative Layout Shift | < 0,1 |

### 3.3. Kryteria sukcesu użytkownika

- W 5–10 sekund rozumie, czym są "Wyjazdy z Dziećmi" i widzi najbliższe terminy
- W max. 3 kliknięciach przechodzi z głównej do formularza konkretnego wyjazdu
- Formularz jest krótki, zrozumiały i działa doskonale na telefonie
- Otrzymuje natychmiastowe potwierdzenie e-mail po zapisie

---

## 4. Grupa docelowa i persony użytkowników

### 4.1. Persona: Mama Ania (Primary)

| Atrybut | Opis |
|---|---|
| **Wiek** | 30–42 lata |
| **Status** | Pracująca mama 1–2 dzieci (wiek 3–12 lat) |
| **Zachowanie** | Szuka wytchnienia od codzienności; przegląda oferty na telefonie w krótkich przerwach |
| **Potrzeby** | Bezpieczeństwo dziecka, autentyczność programu, prostota procesu zapisu |
| **Bariery** | Deficyt czasu i uwagi, lęk przed nieznaną usługą, wrażliwość cenowa |
| **Kanały dotarcia** | Facebook, grupy rodzicielskie, polecenia znajomych, Instagram |

### 4.2. Persona: Tata Tomek (Single Parent)

| Atrybut | Opis |
|---|---|
| **Wiek** | 32–45 lat |
| **Status** | Samotny rodzic szukający sposobu na budowanie relacji z dzieckiem |
| **Zachowanie** | Potrzebuje gotowych rozwiązań; ceni przejrzystość i konkret |
| **Potrzeby** | Dedykowana oferta dla single parents, brak poczucia wykluczenia |
| **Kanały dotarcia** | Google, SEO, rekomendacje |

### 4.3. Persona: Organizatorka Maria (Admin)

Maria potrzebuje prostego panelu do dodawania nowych wyjazdów, śledzenia zgłoszeń i wpłat. Interfejs administracyjny musi być intuicyjny (Airtable) i nie wymagać pomocy programisty do codziennej obsługi.

---

## 5. Zakres funkcjonalny (Scope)

### 5.1. MVP (Faza 1) — In Scope

- Landing page z hero section, listą wyjazdów, sekcją "O nas", opiniami, newsletterem i stopką
- Podstrony szczegółowe dla każdego wyjazdu (program, cennik, formularz zapisu)
- Formularz zgłoszeniowy z automatycznym potwierdzeniem e-mail (n8n + Airtable)
- Responsywny design mobile-first (thumb-friendly)
- Sekcja "Minione wyjazdy" (greyscale) budująca historię sukcesów
- Integracja z Google Analytics (GA4)
- Regulamin serwisu i polityka prywatności (RODO)

### 5.2. Faza 2 — Rozszerzenia

- Chatbot RAG ("Asystent Bliskości") — odpowiedzi na pytania o wyjazdy 24/7
- System voucherów (generowanie PDF, automatyczna wysyłka)
- Płatności online (BLIK, Przelewy24, PayU/Tpay)
- Baza wektorowa Supabase dla chatbota RAG

### 5.3. Faza 3 — Skalowanie

- Blog / aktualności (SEO content marketing)
- A/B testing nagłówków i kolorów CTA
- Heatmaps i analityka zaawansowana
- Automatyczny newsletter (lead nurturing)
- Sekcja "Co jeszcze robimy" (INVIRE, joga, boxy dla firm)
- Kalendarz wizualny (widok miesięczny)

### 5.4. Out of Scope (na obecnym etapie)

- Aplikacja mobilna natywna
- Koszyk e-commerce z pełnym procesem zakupowym
- Panel administracyjny custom-built (w zamian: Airtable)
- Wielojęzyczność strony

---

## 6. Architektura informacji i mapa strony

Architektura informacji jest płaska — najważniejsze funkcje (lista wyjazdów, formularz zapisu) są dostępne bezpośrednio na stronie głównej.

### 6.1. Menu główne

| Pozycja menu | Typ | Opis |
|---|---|---|
| **Logo** | Link | Klikalne — zawsze wraca na stronę główną |
| **O nas** | Podstrona | Bio Marii, Kamili + opis miejsc (Kacze Bagno, Sasek) |
| **Wyjazdy** | Podstrona/Sekcja | Lista aktualnych i minionych wyjazdów z filtrami |
| **Single Parents** | Podstrona | Dedykowana oferta dla rodziców solo |
| **Opinie klientów** | Sekcja | Rekomendacje, cytaty, zdjęcia uczestników |
| **Kontakt** | Sekcja/Stopka | E-mail, telefon, social media, grupa FB |

### 6.2. Struktura strony głównej (top-down)

1. **Hero Section:** logo + hasło + 3 korzyści (ikony) + CTA
2. **Lista najbliższych wyjazdów** (kafelki dynamiczne z Airtable)
3. **Skrócone "O nas"** z linkiem do pełnej podstrony
4. **Opinie / rekomendacje** uczestników
5. **Współpracują z nami** (partnerzy, miejsca)
6. **Sekcja vouchera** (Faza 2)
7. **Newsletter** (pole e-mail + zgody)
8. **Stopka:** kontakt, regulamin, polityka prywatności, copyright

### 6.3. Podstrona wyjazdu (template)

1. Hero ze zdjęciem, tytułem i krótkim opisem
2. Sekcja "Dla kogo jest ten wyjazd?" (3–5 punktów)
3. Program dzień po dniu (godziny, aktywności)
4. Informacje praktyczne (zakwaterowanie, wyżywienie, dojazd)
5. Cennik (dorośli, dzieci, zaliczka, zasady)
6. Współpraca — opis prowadzących + zdjęcia
7. FAQ (najczęstsze pytania)
8. Galeria (1 główne zdjęcie + 2 dodatkowe)
9. Formularz "Zapisz się na wyjazd"

---

## 7. Wymagania UX/UI

### 7.1. Styl wizualny: Naturalny Minimalizm

Design strony ma odzwierciedlać filozofię slow life i bliskość natury. Logo łączy motyw przygody (kompas) z elegancją (kaligraficzny font), co wyznacza kierunek: premium, ale blisko natury.

### 7.2. Paleta kolorystyczna

| Element | Kolor | Kod HEX | Uzasadnienie |
|---|---|---|---|
| **Tło główne** | Ciepły pergamin / jasny beż | `#F9F7F2` | Buduje klimat slow life, mniej sterylny niż biel |
| **Akcenty / CTA** | Głęboka zieleń mchu | `#2D4635` | Nawiązanie do natury, kontrast z tłem |
| **Tekst główny** | Ciemny grafit | `#1A1A1A` | Miększy niż czysty czarny, przyjazny dla oka |
| **Minione wyjazdy** | Desaturowane szarości | `grayscale` | Nie odciągają uwagi od nowych wydarzeń |
| **Tła sekcji** | Skala szarości / beżu | `#F5F3EE` | Delikatne rozdzielenie sekcji |

### 7.3. Typografia

| Zastosowanie | Font | Uzasadnienie |
|---|---|---|
| **Nagłówki (H1, H2)** | Playfair Display / Lora (szeryf) | Nadaje autorytet i atmosferę magii; spójne z logo |
| **Treść (body)** | Inter / Geist (bezszeryf) | Ultra-czytelny na telefonach, nowoczesny |

### 7.4. Zasady layoutu

- **Mobile-first, thumb-friendly design** — większość użytkowników przegląda na telefonach
- **Dużo whitespace** (wolna przestrzeń) — strona ma „oddychać"
- **Przyciski CTA** duże, centralnie umieszczone, łatwo dostępne kciukiem
- **Ikony linearne** (cienkie, nawiązujące do igły kompasu z logo) zamiast zwykłych bulletów
- **Autentyczne zdjęcia** z wyjazdów (nie stockowe) — budują most zaufania
- **Karty wyjazdów** z dużym marginesem wewnętrznym (white space)

### 7.5. Przykładowe CTA

- "Sprawdź najbliższe wyjazdy"
- "Zapisz rodzinę na wyjazd"
- "Zapytaj o szczegóły"
- "Dowiedz się więcej"

---

## 8. Szczegółowy opis funkcjonalności

### 8.1. Moduł prezentacji i rezerwacji wyjazdów

Centralny element platformy: dynamiczna lista wyjazdów pobierana z Airtable. Każdy wyjazd posiada: tytuł, termin, miejsce, liczbę dostępnych miejsc, krótki opis, zdjęcie główne. Wyjazdy przeszłe wyświetlane w skali szarości (filter: `grayscale(100%)`).

**Formularz zgłoszeniowy — pola:**

- Imię i nazwisko rodzica
- Adres e-mail
- Numer telefonu
- Wybrany wyjazd / termin (dropdown zasilany z Airtable)
- Typ pokoju (jeśli dotyczy)
- Liczba dorosłych i dzieci + wiek dzieci
- Uwagi (diety, alergie, specjalne potrzeby)
- Zgoda RODO + opcjonalna zgoda marketingowa

> *Microcopy pod przyciskiem "Wyślij": "Po wysłaniu otrzymasz automatyczne potwierdzenie na e-mail" — buduje zaufanie.*

### 8.2. Chatbot RAG: Asystent Bliskości (Faza 2)

Zaawansowany chatbot oparty na architekturze Retrieval-Augmented Generation. Posiada dostęp do pełnej dokumentacji (opisy miejsc, programy, cenniki, FAQ). Odpowiada na pytania typu: "Czy w Kaczym Bagnie jest sauna?" lub "Ile kosztuje wyjazd dla mamy z dwójką dzieci poniżej 8 lat?".

**Specyfikacja UI chatbota:**

- Widget pływający (floating), nie generyczny
- Nazwa: "Asystent Bliskości"
- Ikona: fragment igły kompasu z logo
- Kolorystyka: `#2D4635`, zaokrąglone rogi (`rounded-2xl`)
- Możliwość wstępnej rezerwacji: zbiera dane i przekazuje do n8n

### 8.3. System voucherów (Faza 2)

Moduł voucherów kwotowych (od 400 PLN) i celowych (na konkretny warsztat). Automatyczne generowanie PDF z unikalnym kodem, wysyłka e-mailem. Estetyka vouchera spójna ze stroną: jasne tło, czarne logo, dużo przestrzeni.

### 8.4. Newsletter i lead nurturing

Formularz zapisu na newsletter z polem e-mail i zgodami. Integracja z systemem mailingowym (Mailerlite / Brevo) poprzez n8n. Automatyczne dopisywanie do odpowiednich grup mailingowych.

### 8.5. Sekcja "O nas"

Pełne biogramy: Maria Kordalewska, Kamila Janczurewicz (konsultantka ajurwedyjska). Opisy miejsc partnerskich: Kacze Bagno (eko-domki, sauna, balia, pracownia ceramiczna) i Sasek (Mazury, konie, jezioro). Zdjęcia pokazujące klimat.

### 8.6. Opinie i social proof

Cytaty od uczestników ze zdjęciami i imionami. Logotypy partnerów i miejsc w sekcji "Współpracują z nami". Docelowo: opinie video i galerie z minionych wyjazdów.

---

## 9. Integracje i automatyzacje (n8n)

### 9.1. Przepływy pracy (Workflows)

| Flow | Opis | Trigger → Akcje |
|---|---|---|
| **Flow 1: Rezerwacja** | Automatyczna obsługa zgłoszeń | Formularz → Webhook → Airtable (zapis) → Gmail (potwierdzenie) → Slack (powiadomienie do Marii) |
| **Flow 2: RAG Chatbot** | Inteligentna obsługa pytań | Wiadomość → Supabase (vector search) → OpenAI (generowanie) → Odpowiedź w widgecie |
| **Flow 3: Vouchery** | Automatyczne generowanie voucherów | Płatność → Generowanie PDF → Wysyłka mailowa → Update w Airtable |
| **Flow 4: Newsletter** | Budowa listy mailingowej | Formularz → n8n → Mailerlite/Brevo + Airtable |
| **Flow 5: Follow-up** | Automatyczne przypomnienia | X dni przed wyjazdem → E-mail z instrukcjami / przypomnieniem |
| **Flow 6: Płatności** | Obsługa płatności online | Zgłoszenie → Link płatności (PayU/Tpay) → Webhook → Status w Airtable |

---

## 10. Stos technologiczny

| Warstwa | Narzędzie | Kluczowa zaleta | Koszt (start) |
|---|---|---|---|
| **Frontend / CMS** | Claude code | Wyjątkowa estetyka, animacje, CMS kolekcje | ~15–20 USD/mc |
| **Baza operacyjna / CRM** | Airtable | Łatwość edycji dla właścicielki (arkuszowy UI) | Free / 20 USD/mc |
| **Automatyzacja** | n8n (Cloud lub self-host) | Nieograniczona logika integracji workflowów | ~20 USD/mc (Cloud) |
| **Pamięć AI / Backend** | Supabase (PostgreSQL + pgvector) | Baza wektorowa dla RAG, profesjonalny backend | Free Tier |
| **Silnik AI (LLM)** | OpenAI GPT-4o-mini | Najwyższa jakość rozumienia tekstu po polsku | Pay-as-you-go |
| **Płatności** | PayU / Tpay / Przelewy24 | Obsługa BLIK i polskich metod płatności | Prowizja ~1,5% |
| **Mailing** | Mailerlite / Brevo | Automatyzacja newslettera, grupy mailingowe | Free / ~10 USD/mc |
| **Analityka** | Google Analytics 4 | Śledzenie konwersji, źródeł ruchu | Free |

CMS Claude code obsługuje kolekcje dynamiczne: "Wyjazdy", "Opinie", "Partnerzy", "Minione wyjazdy". Dane z kolekcji zasilają kafelki na stronie głównej i podstrony wyjazdów.

---

## 11. Plan wdrożenia (Roadmap)

### Faza 1: Fundament i Launch (Tygodnie 1–4)

| Tydzień | Zadania |
|---|---|
| **1** | Konfiguracja Airtable (tabele: Wyjazdy, Zgłoszenia, Kontakty). Przygotowanie treści i zdjęć. |
| **2** | Budowa landing page z Claude code: hero, lista wyjazdów, sekcja O nas, opinie, stopka. |
| **3** | Formularz zgłoszeniowy + integracja n8n (webhook → Airtable → potwierdzenie e-mail). |
| **4** | Testy (mobile, formularze, e-maile), SEO basics, GA4. Launch! |

### Faza 2: Automatyzacja i monetyzacja (Tygodnie 5–8)

- Wdrożenie bazy wektorowej Supabase i chatbota RAG
- Przeszkolenie AI na dokumentacji (opisy miejsc, programy, FAQ)
- Uruchomienie modułu voucherów z generowaniem PDF
- Integracja płatności BLIK / PayU / Tpay

### Faza 3: Skalowanie i optymalizacja (Tygodnie 9+)

- Uruchomienie analityki zaawansowanej (heatmaps, funnele)
- Automatyczny newsletter i lead nurturing
- Rozbudowa sekcji minionych wyjazdów (galerie, video)
- A/B testing nagłówków, CTA, layoutów
- Blog / content marketing pod SEO
- Sekcja "Co jeszcze robimy" (INVIRE, joga, boxy)

---

## 12. Wymagania niefunkcjonalne

| Kategoria | Wymaganie | Specyfikacja |
|---|---|---|
| **Wydajność** | Core Web Vitals | LCP < 2,5 s; FID < 100 ms; CLS < 0,1 |
| **Responsywność** | Mobile-first | Pełna funkcjonalność na urządzeniach 320px+ |
| **SEO** | Optymalizacja | Nagłówki, meta opisy, frazy kluczowe ("wyjazdy z dziećmi", "warsztaty dla mam") |
| **Dostępność** | WCAG 2.1 AA | Kontrast, nawigacja klawiaturą, alt-texty zdjęć |
| **Bezpieczeństwo** | SSL / HTTPS | Cała strona serwowana przez HTTPS |
| **Prywatność** | RODO / GDPR | Zgody na przetwarzanie, polityka prywatności, cookie banner |
| **Skalowalność** | CDN + Cloud hosting | Obsługa skoków ruchu (promocje na FB) |
| **Backup** | Dane Airtable / Supabase | Automatyczne kopie zapasowe danych zgłoszeń |

---

## 13. Ryzyka i ograniczenia

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|---|---|---|
| **Brak zdjęć autentycznych na start** | Średnie | Wysoki | Zaplanować sesję zdjęciową na pierwszym wyjeździe; tymczasowo użyć najlepszych zdjęć z FB |
| **Złożoność integracji płatności** | Wysokie | Średni | Odroczenie do Fazy 2; na start: przelew tradycyjny + potwierdzenie manualne |
| **Niejasna forma prawna działalności** | Wysokie | Wysoki | Wyjaśnienie statusu prawnego (spółka vs. działalność) PRZED integracją płatności |
| **Niska jakość odpowiedzi chatbota** | Średnie | Średni | Staranny trening na dokumentacji; monitorowanie rozmów; fallback do kontaktu z Marią |
| **Uzależnienie od narzędzi SaaS** | Niskie | Średni | Regularne eksporty danych z Airtable; Supabase jako backup |

---

## 14. Załączniki i inspiracje

### 14.1. Inspiracje treściowe

- **wielkizachwyt.pl** — kalendarz wyjazdów, estetyka sprzedaży
- **paniodrelaksu.pl/warsztaty** — harmonogram warsztatów, rozpiski dnia
- **holisticfriends.pl** — vouchery, layout usług holistycznych

### 14.2. Inspiracje wizualne i UX

- **land-book.com**, **lapa.ninja**, **landingfolio.com** — najlepsze landing pages
- **onepagelove.com** — one-page designs
- **builtformars.com/ux-glossary** — wzorce UX
- **ui-patterns.com** — wzorce interfejsów

### 14.3. Treści przykładowego wyjazdu (załącznik referencyjny)

Dokument `POMYSly_zbiorowe.docx` zawiera pełną treść wyjazdu "Matka i Córka — Wspólny Rytm" (6–8 marca, Kacze Bagno), w tym: program dzień po dniu, cennik, bio prowadzących, informacje o zakwaterowaniu i wyżywieniu. Treści te stanowią wzorzec dla podstron pozostałych wyjazdów.

---

*— Koniec dokumentu PRD —*
