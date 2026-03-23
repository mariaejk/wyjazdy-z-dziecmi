# Styl Common Wanderer — Blueprint dla landing page

**Data:** 2026-03-23
**Źródło:** Gemini CLI
**Zapytanie:** Pokaż jak wyglądałby nasz landing page gdybyśmy przenieśli styl, fonty, kolorystykę z The Common Wanderer

---

## Odpowiedź Gemini

Kluczem do stylu TCW jest **maksymalny minimalizm, ogromna ilość światła (whitespace), dominacja jasnych, ciepłych beżów, typografia oparta na klasycznym foncie szeryfowym z mocnym wykorzystaniem kursywy (italic) oraz rezygnacja z krzykliwych elementów na rzecz pięknej fotografii.**

Aby osiągnąć ten efekt, musimy całkowicie porzucić odręczny font `Caveat` i przeprojektować układy z kafelkowych na bardziej edytorialne (magazynowe).

### 5. Kolorystyka (aktualizacja `src/app/globals.css`)
TCW opiera się na bardzo powściągliwej palecie. Musimy rozjaśnić tła i uspokoić zielenie.

```css
@theme {
  --color-tcw-cream: #FAF9F6;    /* Główne tło strony */
  --color-tcw-sand: #F2EFE9;     /* Tło sekcji alternatywnych */
  --color-tcw-charcoal: #222222;  /* Nagłówki i główny tekst */
  --color-tcw-slate: #555555;     /* Subtitles, meta teksty */
  --color-tcw-olive: #6C7A63;     /* Delikatne akcenty */
  --color-tcw-taupe: #8B857B;     /* Linie i ramki */
}
```

### 6. Typografia
Fonty zostają (Cormorant Garamond + Inter), ale zmieniamy użycie. **Rezygnujemy z Caveat.**

Hierarchia TCW:
- **Overlines:** małe, bezszeryfowe, uppercase, tracking-[0.25em]
- **Nagłówki:** szeryfowe, **font-light**, mocne użycie *italic*
- **Tekst:** mniejszy, leading-relaxed

### 1. Hero — wyśrodkowany układ edytorialny

```tsx
<Container className="py-20 md:py-32 flex flex-col items-center text-center">
  <h1 className="text-[10px] md:text-xs font-body font-medium uppercase tracking-[0.25em] text-tcw-slate mb-6">
    Curated Family Retreats
  </h1>
  <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-tcw-charcoal max-w-4xl leading-tight mb-12">
    Odkryj z dzieckiem <span className="italic">naturę</span> na nowo.
    <span className="italic text-tcw-slate">Wspomnienia na całe życie.</span>
  </h2>
  <div className="w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] relative overflow-hidden mt-8 mb-16">
     <HeroSlideshow />
  </div>
  <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center text-center max-w-3xl">
    {benefits.map(b => (
      <p className="font-body text-[13px] leading-relaxed text-tcw-slate uppercase tracking-widest">
        {b.text}
      </p>
    ))}
  </div>
</Container>
```

### 2. Nawigacja — niewidzialna, minimalistyczna
- Tło: `bg-tcw-cream/90 backdrop-blur-sm`
- Linki: `text-[11px] uppercase tracking-[0.2em] font-medium text-tcw-charcoal hover:text-tcw-olive`
- Logo: czysty napis szeryfowy

### 3. AboutTeaser — styl "list z podróży"
- Jednolite tło, zdjęcie portretowe (3:4), bez borderów
- Overline + italic nagłówek + light tekst

```tsx
<div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 max-w-5xl mx-auto">
  <div className="w-full md:w-5/12 aspect-[3/4] relative">
    <Image src="/images/marysia.png" fill className="object-cover" />
  </div>
  <div className="w-full md:w-7/12 flex flex-col justify-center">
    <span className="text-[10px] uppercase tracking-[0.25em] text-tcw-slate mb-4">Poznajmy się</span>
    <h2 className="font-heading text-4xl md:text-5xl font-light text-tcw-charcoal mb-8">
      Nazywam się <span className="italic">Maria</span>
    </h2>
    <p className="font-body text-[15px] leading-[1.8] text-tcw-slate font-light mb-8">
      Jestem mamą Laury, nauczycielką jogi...
    </p>
  </div>
</div>
```

### 4. Karty — tekst POD zdjęciem, bez overlay

```tsx
<Link href={cat.href} className="group flex flex-col gap-5">
  <div className="aspect-[3/4] overflow-hidden bg-tcw-sand relative">
    <Image src={cat.image} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
  </div>
  <div className="flex flex-col text-center px-4">
    <span className="text-[10px] uppercase tracking-[0.2em] text-tcw-slate mb-2">Kategoria</span>
    <h3 className="font-heading text-2xl md:text-3xl font-light italic text-tcw-charcoal">{cat.label}</h3>
  </div>
</Link>
```

### 7. CTA — elegancka czerń lub outline

```tsx
const variantStyles = {
  primary: "bg-tcw-charcoal text-tcw-cream hover:bg-black text-[11px] uppercase tracking-[0.2em] px-8 py-4 font-medium",
  secondary: "bg-transparent border border-tcw-charcoal text-tcw-charcoal hover:bg-tcw-charcoal hover:text-tcw-cream text-[11px] uppercase tracking-[0.2em] px-8 py-4 font-medium",
  ghost: "bg-transparent text-tcw-slate hover:text-tcw-charcoal underline underline-offset-4 decoration-tcw-slate/30 text-[11px] uppercase tracking-[0.2em]",
};
```

### 8. Footer — przewiewny, wyśrodkowany
- Layout: `bg-tcw-sand py-24 md:py-32 flex flex-col items-center text-center`
- H2: `font-heading text-3xl md:text-4xl italic text-tcw-charcoal mb-12`
- Linki: `text-[10px] uppercase tracking-[0.2em] font-medium`

### Podsumowanie wdrożenia
1. Usunąć ładowanie fontu `Caveat` z layout.tsx
2. Zaktualizować zmienne `--color-*` w globals.css
3. Zaktualizować `SectionHeading` — `italicWords` zamiast `accentText` (Caveat)
4. Przenieść tekst w kartach pod zdjęcia (usunąć overlay)
5. Zamienić przyciski na outline/charcoal zamiast zielonego filled

---

*Wygenerowano przez /gemini*
