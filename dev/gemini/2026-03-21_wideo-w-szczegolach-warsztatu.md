# Propozycja umieszczenia wideo w szczegółach warsztatu

**Data:** 2026-03-21
**Źródło:** Gemini CLI
**Zapytanie:** zaproponuj gdzie w sekcji w szczególach warsztatu 'Rodzinny tydzień z końmi i jogą' w sierpniu dodać wideo. Wideo: docs/poprawki/poprawki_20.03/warsztaty z konmy.mp4. Żeby rodzic kiedy wszedł, to prawie od razu mógł zobaczyć ten film i odtworzyć.

---

## Odpowiedź Gemini

Na podstawie analizy plików projektu przygotowałem szczegółową propozycję umieszczenia i wdrożenia wideo.

Zależało nam, aby rodzic po wejściu na stronę "prawie od razu mógł zobaczyć film i go odtworzyć". Zatem zależy nam na wysokiej widoczności, ale przy zachowaniu dobrego User Experience.

### 1. Dokładna lokalizacja w layoucie strony

Najlepszym miejscem na wideo z możliwością ręcznego odtworzenia będzie **tuż pod komponentem `<TripHero>`**, a przed sekcją `<TripTargetAudience>` (Dla kogo) lub `<TripDescription>` (O wyjeździe).

W pliku `src/app/(main)/wyjazdy/[slug]/page.tsx` wyglądałoby to tak:

```tsx
{/* 1. Hero */}
<TripHero
  // ... props
/>

{/* NOWY KOMPONENT: 1.5. Wideo promocyjne */}
{trip.videoUrl && (
  <TripVideo videoUrl={trip.videoUrl} posterUrl={trip.image} />
)}

{/* 2. Target Audience */}
{trip.targetAudience.length > 0 && (
  <TripTargetAudience items={trip.targetAudience} />
)}
```
Dzięki temu po załadowaniu strony uwaga użytkownika skupi się na estetycznym Hero, ale tuż pod linią zanurzenia (above-the-fold / tuż pod nią) będzie widoczna miniatura wideo zapraszająca do kliknięcia.

### 2. Techniczna implementacja (Next.js 16 / React 19)

1. **Plik wideo**: Plik `warsztaty z konmy.mp4` musisz przenieść z `docs/poprawki/...` do folderu publicznego, aby Next.js mógł go zaserwować, np. do `public/videos/warsztaty-z-konmi.mp4`.
2. **Aktualizacja schematu**: W Keystatic i w `src/data/trips.ts` warto dodać opcjonalne pole `videoUrl: string`, aby móc łatwo włączać wideo tylko dla wybranych wyjazdów.
3. **Komponent `<TripVideo>`**: Do wyświetlenia wykorzystaj natywny znacznik HTML5 `<video>`, opakowany w kontener zachowujący proporcje (Tailwind: `aspect-video`). Next.js nie posiada (w standardzie) dedykowanego wbudowanego komponentu do wideo lokalnego jak `<Image>` do zdjęć.

Przykład komponentu (`src/components/trips/TripVideo.tsx`):
```tsx
import { Container } from "@/components/layout/Container";

type TripVideoProps = {
  videoUrl: string;
  posterUrl?: string;
};

export function TripVideo({ videoUrl, posterUrl }: TripVideoProps) {
  return (
    <section className="relative mt-8 sm:mt-12 mb-8">
      <Container>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          <video
            controls
            preload="metadata"
            playsInline
            poster={posterUrl}
            className="aspect-video w-full bg-black object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            Twoja przeglądarka nie obsługuje odtwarzacza wideo.
          </video>
        </div>
      </Container>
    </section>
  );
}
```

### 3. Hero, pod Hero czy osobna sekcja?

* **Nie w sekcji Hero:** Ponieważ użytkownik ma sam **"odtworzyć"** film (z dźwiękiem), umieszczanie go w głównym obszarze Hero jako element klikalny sprawia problemy na urządzeniach mobilnych i zaburza nawigację po tytule wyjazdu. Wideo w Hero sprawdza się świetnie wyłącznie jako niemychy, zapętlony film w tle (vibe/mood).
* **Dedykowana sekcja pod Hero:** Zdecydowanie najlepsza opcja. Pozwala na umieszczenie tradycyjnego odtwarzacza z paskiem postępu, który nie koliduje z nagłówkiem H1 i przyciskiem "Zapisz się", zlokalizowanymi w Hero.

### 4. Obsługa autoplay / poster / controls dla świetnego UX

* **Autoplay:** Absolutnie odradzam (`autoplay={false}`). Nowoczesne przeglądarki i tak blokują autoodtwarzanie z dźwiękiem. Nagły dźwięk po wejściu na stronę to bardzo złe doświadczenie (irytuje i powoduje szybkie zamknięcie strony). Wideo ma być odtwarzane intencjonalnie.
* **Poster (Miniatura):** Konieczny. Bez niego wideo przed startem będzie czarnym kwadratem. Jako `poster="..."` można użyć głównego zdjęcia wyjazdu (`trip.image`) lub przygotować osobną miniaturę ze wklejonym wielkim przyciskiem "Play", aby jeszcze mocniej zachęcić do kliknięcia (tzw. "click magnet").
* **Controls:** Obowiązkowe (`controls={true}`), aby rodzic mógł spauzować, cofnąć czy wyciszyć nagranie.
* **Preload:** Użyj `preload="metadata"`. Pozwoli to przeglądarce pobrać tylko pierwszą klatkę i czas trwania wideo, a nie cały plik 50MB+, co uratuje pakiet danych mobilnych użytkownika zanim w ogóle zdecyduje się kliknąć "play".

### 5. Mobile vs Desktop (RWD)

* **Mobile:** Wideo na telefonie przyjmie 100% szerokości z marginesami po bokach (dzięki `<Container>`) i automatycznie dopasuje wysokość (`aspect-video`). Dodanie atrybutu `playsInline` zapobiegnie wymuszaniu przez iOS Safari natychmiastowego przejścia w tryb pełnoekranowy — wideo odpali się na stronie, a rodzic będzie mógł zescrollować tekst "O wyjeździe" podczas słuchania.
* **Desktop:** Obowiązkowo należy nałożyć limit maksymalnej szerokości (np. `max-w-4xl`). Na bardzo szerokich monitorach wideo rozciągnięte na całą szerokość ekranu wygląda przytłaczająco i jest niskiej jakości. Kontener o maksymalnej szerokości wyśrodkowany przez `mx-auto` będzie wyglądał elegancko i profesjonalnie.

---

*Wygenerowano przez /gemini*
