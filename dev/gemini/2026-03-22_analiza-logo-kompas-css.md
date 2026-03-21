# Analiza nowego logo (kompas CSS) — dopasowanie do strony

**Data:** 2026-03-22
**Źródło:** Gemini CLI
**Zapytanie:** Analiza logo z docs/poprawki/poprawki_20.03/logo.html — HTML/CSS vs SVG/PNG, responsywność, favicon, dopasowanie do koncepcji strony.

---

## Odpowiedź Gemini

### 1. HTML/CSS vs Obrazek (SVG/PNG)
**Rekomendacja:** Zdecydowanie najlepiej **przekonwertować ten kod CSS na czysty plik wektorowy (SVG)** lub na **komponent React zwracający `<svg>`**, a nie wklejać go jako czysty HTML/CSS z pozycjonowaniem absolutnym.

*Dlaczego?* Obecny kod to tzw. "CSS Art". Używa sztywnych wartości w pikselach (`width: 70px`, `top: -6px`, `border-bottom: 14px`). Wklejenie tego w takiej formie do Reacta sprawi, że logo będzie "sztywne", trudne do skalowania i wymusi pisanie własnych klas CSS zamiast używania Tailwinda. Plik PNG/JPG (jak obecne `logo.jpeg` w `Header.tsx`) z kolei straci na ostrości.
Komponent SVG będzie semantyczny, idealnie ostry i pozwoli na manipulację kolorami przez Tailwind (np. `text-current`).

### 2. Światło (padding) i wysokość 50-70px
Obecny `Header.tsx` ma kontener o wysokości `h-16 sm:h-20` (czyli 64px na mobile, 80px na desktopie).
Jeśli zamienisz to logo na SVG, skalowanie będzie banalnie proste. Wystarczy nadać odpowiednią klasę Tailwind, a "światło" utworzy się naturalnie dzięki flexboxowi i wysokości headera:
```tsx
// Zamiast <Image src="/images/logo.jpeg" width={80} height={80} />
<LogoSVG className="h-[50px] md:h-[70px] w-auto text-[#48351b]" />
```
Gdybyś jednak został przy obecnym kodzie HTML/CSS, jedynym sensownym sposobem na zachowanie proporcji i "światła" byłoby wymuszenie skali: `transform: scale(0.7) md:scale(1)`. Dlatego konwersja do SVG to lepsza ścieżka.

### 3. Responsywność na mobile (ukrycie tekstu)
Mając do dyspozycji Tailwind CSS v4, sprawa jest bardzo prosta. Wystarczy obudować część tekstową ("Wyjazdy z dziećmi") w klasę `hidden md:flex`, a do kontenera nadrzędnego dodać warunkowy `gap`:

```tsx
<Link href="/" className="flex items-center gap-0 md:gap-4 group">
  {/* Sygnet (Kompas) - zawsze widoczny */}
  <CompassIcon className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]" />

  {/* Tekst - ukryty na mobile (poniżej 768px) */}
  <div className="hidden md:flex flex-col leading-none">
    <span className="font-lora text-[42px] font-normal tracking-tight">Wyjazdy</span>
    <span className="font-caveat text-[32px] -mt-2.5 pl-11">z dziećmi</span>
  </div>
</Link>
```

### 4. Generowanie Favicony
Jako że używasz App Router w Next.js, framework ten natywnie wspiera wektorowe favicony.
Gdy wyekstrahujesz kod sygnetu (kompasu) do formatu SVG, wystarczy zapisać ten plik jako `icon.svg` i umieścić go w folderze `src/app/icon.svg`. Next.js automatycznie go wykryje i obsłuży we wszystkich przeglądarkach.

### 5. Dopasowanie do ogólnej koncepcji wizualnej (Theme Fit)
Logo bardzo dobrze wpisuje się w klimat warsztatów rodzinnych, ale wymaga jednej decyzji architektonicznej:

* **Kolorystyka:** Gorzka czekolada (`#48351b`) z logo idealnie gra z zmiennymi z `globals.css`: `--color-graphite` (`#2C241B`), pergaminowym tłem i akcentami z terakoty/oliwki. To świetny, ziemisty wybór.
* **Symbolika:** Kompas pasuje do słów-kluczy: podróż, natura, szukanie ścieżki (rozwój osobisty na warsztatach), las. Posiada przyjemny, klasyczny wydźwięk.
* **Typografia (Uwaga):** W projekcie używasz jako fontu nagłówkowego **Playfair Display**, a tu zaproponowano **Lora**. Zderzenie dwóch różnych fontów szeryfowych (serif) na jednej stronie może wprowadzić delikatny dysonans. **Rekomendacja:** Zmień wyraz "Wyjazdy" z Lora na istniejący już w projekcie `Playfair Display`. Zmniejszy to wagę strony i poprawi spójność. Natomiast dodatek fontu **Caveat** ("z dziećmi") to świetny zabieg – imituje pismo ręczne, ociepla wizerunek, kojarzy się z odręcznymi notatkami z warsztatów i dodaje niezbędnego elementu "zabawy" i więzi rodzinnych.

---

*Wygenerowano przez /gemini*
