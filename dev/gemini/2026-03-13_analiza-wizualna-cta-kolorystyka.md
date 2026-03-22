# Analiza wizualna, funkcjonalna i CTA landing page

**Data:** 2026-03-13
**Źródło:** Gemini CLI
**Zapytanie:** Analiza landing page pod względem wyglądu wizualnego, funkcjonalności i CTA. Porównanie z inspiracją https://paniodrelaksu.pl/warsztaty/ — propozycja nowej kolorystyki.

---

## Odpowiedź Gemini

Obecny design (jasny pergamin `#F9F7F2`, zgaszone zielenie `#2D4635` i pastelowe kropki) jest bardzo zachowawczy i minimalistyczny. Dla strony oferującej wyjazdy dla rodziców z dziećmi brakuje w nim **ciepła, energii i poczucia obfitości/bezpieczeństwa**, co sprawia, że strona wydaje się "pusta" i wyblakła.

---

### 1. Wygląd wizualny i nowa kolorystyka (globals.css)

Strona *paniodrelaksu.pl* bazuje na tzw. palecie barw ziemi, ale w cieplejszym, bardziej słonecznym i przytulnym wydaniu (terakota, ciepły beż, musztarda, oliwka). Takie kolory budują zaufanie i kojarzą się z odpoczynkiem oraz naturą.

**Propozycja nowej palety kolorów (Hex):**
*   **Tło główne (Ciepły Piasek / Oat):** `#F4EFE6` (zamiast chłodnego `#F9F7F2`)
*   **Tło sekcji naprzemiennych (Ciepły Karmel / Jasna Terakota):** `#EADCC8` lub `#E6D0B3` (do przełamania pustki)
*   **Główny kolor akcentu / CTA (Ziemista Terakota):** `#C85A32` lub `#D9734E` (przyciąga wzrok, daje energię, idealny na przyciski)
*   **Zieleń (Ciepła Oliwka):** `#5C713B` (zamiast ciemnego, smutnego `#2D4635`)
*   **Tekst (Ciemne Espresso):** `#3E362E` lub `#2C241B` (zamiast czarnego/grafitu `#1A1A1A` – brązy są bardziej miękkie dla oka)
*   **Kolory wspierające (dla detali/ikon):** Musztardowy (`#DDB74A`), Brudny Róż/Koral (`#E2856E`)

**Rekomendowana zmiana w `src/app/globals.css`:**
```css
@theme {
  /* Zmienione kolory — Ciepła, relaksująca natura */
  --color-parchment: #F4EFE6;
  --color-parchment-dark: #EADCC8;
  --color-moss: #5C713B;
  --color-moss-light: #7A8F53;
  --color-graphite: #2C241B;
  --color-graphite-light: #5A4F44;
  --color-white: #FFFFFF;

  /* Nowe, nasycone kolory dla CTA i akcentów */
  --color-terracotta: #D9734E;
  --color-terracotta-dark: #B85331;
  --color-mustard: #DDB74A;
  --color-coral: #E2856E;

  /* Pozostawione dla tła ikon, ale ocieplone */
  --color-sage: #8DA988;
  --color-peach: #F0A884;
}
```

### 2. Układ bloków i sekcji (Layout)

Obecnie strona sprawia wrażenie pustej ze względu na gradienty i małe, unoszące się kropki (`DecorativeDots` w `HeroSection.tsx`).

**Co poprawić (na bazie paniodrelaksu.pl):**
1.  **Solidne tła sekcji:** Zamiast używać białego tła dla całości i oddzielać sekcje tylko nagłówkami, zastosuj naprzemienne kolory tła dla całych bloków (np. biały -> jasny beż (`#F4EFE6`) -> jasna terakota (`#EADCC8`)). W `TripCardsSection.tsx` i `HeroSection.tsx` owiń zawartość w `div` z różnym tłem.
2.  **Organiczne kształty (Blobs/Fale) zamiast kropek:** Zamiast małych kropek (`h-2 w-2`), użyj większych, asymetrycznych kształtów o niskim kryciu pod tekstami lub zdjęciami, co wypełni "pustą" przestrzeń.
3.  **Większe i zaokrąglone zdjęcia:** W `HeroSection.tsx` zdjęcie ma klasę `aspect-[4/3]`. Dodaj do niego ciepły, miękki cień (`shadow-xl shadow-terracotta/10`) i lekko obróconą ramkę z tyłu (tzw. offset border) w kolorze musztardowym lub oliwkowym, by nadać mu charakter "albumu ze zdjęciami".

### 3. Funkcjonalność – co dodać dla rodziców?

Z perspektywy rodzica szukającego wyjazdu brakuje kilku kluczowych, widocznych od razu elementów:
1.  **Wiek dzieci:** W `src/data/trips.ts` brakuje widocznego pola, dla jakiego wieku dedykowany jest wyjazd (np. "Dzieci 3-6 lat", "Nastolatkowie"). To kluczowa funkcja. Powinno to być widoczne jako odznaka (`Badge.tsx`) na karcie `TripCard.tsx`.
2.  **Rodzaj noclegu:** Wyjazd z dziećmi to logistyka. Dodaj piktogramy (ikony Lucide) na kartach wyjazdów informujące o standardzie (np. "pokoje z łazienkami", "pełne wyżywienie w cenie").
3.  **Społeczny dowód słuszności (Social Proof):** W `HeroSection.tsx` masz napis "Polecane przez rodziców" i 5 gwiazdek. Zmień to na karuzelę opinii ze zdjęciami (lub awatarami) konkretnych osób tuż pod nagłówkiem głównym lub zaraz za pierwszą sekcją.

### 4. Call to Action (CTA) - Przeprojektowanie

Obecnie główne przyciski opierają się na kolorze `moss` (zielony) lub `sage-dark` (wyblakły zielony). Te kolory zlewają się z tłem i nie krzyczą "Kliknij mnie!".

**Rekomendacje dla `src/components/ui/Button.tsx` oraz `Header.tsx`:**

1.  **Nowy kolor dla "primary" Buttona:**
    Zmień styl `primary` w komponencie `Button.tsx` na rzucającą się w oczy, ciepłą terakotę:
    ```typescript
    primary: "bg-terracotta text-white hover:bg-terracotta-dark focus-visible:ring-terracotta shadow-md hover:shadow-lg hover:-translate-y-0.5",
    ```
2.  **Zmiana tekstu w Hero Section:**
    Zamiast generycznego "Znajdź swój wyjazd" (które brzmi jak zadanie dla użytkownika), użyj języka korzyści:
    *   *Propozycja 1:* "Sprawdź najbliższe wyjazdy"
    *   *Propozycja 2:* "Zabierz dziecko na przygodę"
    ```tsx
    <Button
      href="/wyjazdy"
      size="lg"
      variant="primary"
      className="rounded-full px-8 py-4 font-bold text-lg"
    >
      Sprawdź najbliższe wyjazdy
    </Button>
    ```
3.  **Wyróżnienie CTA w Headerze:**
    W `Header.tsx` przycisk "Zarezerwuj" jest bardzo zachowawczy. Warto dodać mu animację pulsowania lub wyróżnić go kolorem:
    ```tsx
    <Button href={ROUTES.trips} size="sm" variant="primary" className="rounded-full shadow-sm bg-terracotta hover:bg-terracotta-dark">
      Zobacz ofertę wyjazdów
    </Button>
    ```

**Podsumowanie działań naprawczych:**
Wdróż ciepłą paletę ziemistą (terakota, oliwka, beż) w `globals.css`, podmień zgaszoną zieleń w przyciskach na energetyczny kolor `#D9734E`, zmień tła całych sekcji w `TripCardsSection.tsx` na lekko odcinające się beże zamiast samej bieli i wprowadź konkretne, jasno komunikujące odznaki (wiek dziecka, wyżywienie) na kartach produktów.

---

*Wygenerowano przez /gemini*
