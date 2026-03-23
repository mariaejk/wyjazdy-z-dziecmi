import { config, fields, collection, singleton } from "@keystatic/core";

const isGithubMode =
  process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER &&
  process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

const storage = isGithubMode
  ? {
      kind: "github" as const,
      repo: {
        owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER!,
        name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO!,
      },
    }
  : { kind: "local" as const };

export default config({
  storage,
  collections: {
    trips: collection({
      label: "Wyjazdy",
      slugField: "title",
      path: "content/trips/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Nazwa wyjazdu" } }),
        subtitle: fields.text({ label: "Podtytuł" }),
        date: fields.text({ label: "Data rozpoczęcia (YYYY-MM-DD)" }),
        dateEnd: fields.text({ label: "Data zakończenia (YYYY-MM-DD)" }),
        location: fields.text({ label: "Lokalizacja" }),
        category: fields.select({
          label: "Kategoria",
          options: [
            { label: "Rodzinny", value: "rodzinny" },
            { label: "Matka z córką", value: "matka-corka" },
            { label: "Samodzielny rodzic", value: "single-parents" },
            { label: "Dla dorosłych", value: "dla-doroslych" },
          ],
          defaultValue: "rodzinny",
        }),
        shortDescription: fields.text({
          label: "Krótki opis",
          multiline: true,
        }),
        longDescription: fields.text({
          label: "Długi opis",
          multiline: true,
        }),
        image: fields.text({ label: "Zdjęcie główne (ścieżka)" }),
        videoUrl: fields.text({
          label: "URL wideo promocyjnego (opcjonalne, np. /videos/nazwa.mp4)",
        }),
        isPast: fields.checkbox({
          label: "Zakończony (ignorowane — obliczane automatycznie z daty końca)",
          defaultValue: false,
        }),
        spotsTotal: fields.integer({
          label: "Liczba miejsc (ogółem)",
        }),
        spotsLeft: fields.integer({
          label: "Pozostałe miejsca",
        }),
        deposit: fields.integer({
          label: "Zaliczka (zł)",
          defaultValue: 0,
        }),
        earlyBirdDeadline: fields.text({
          label: "Deadline early bird (YYYY-MM-DD)",
        }),
        earlyBirdPrice: fields.integer({
          label: "Cena early bird (zł)",
        }),
        targetAudience: fields.array(
          fields.object({
            label: fields.text({ label: "Dla kogo" }),
            description: fields.text({
              label: "Opis (opcjonalny)",
              multiline: true,
            }),
          }),
          {
            label: "Grupa docelowa",
            itemLabel: (props) => props.fields.label.value || "...",
          }
        ),
        schedule: fields.array(
          fields.object({
            date: fields.text({ label: "Data (YYYY-MM-DD)" }),
            dayLabel: fields.text({ label: "Etykieta dnia" }),
            activities: fields.array(
              fields.object({
                time: fields.text({ label: "Godzina" }),
                activity: fields.text({ label: "Aktywność" }),
              }),
              {
                label: "Aktywności",
                itemLabel: (props) =>
                  `${props.fields.time.value} — ${props.fields.activity.value}`,
              }
            ),
          }),
          {
            label: "Program",
            itemLabel: (props) => props.fields.dayLabel.value || "...",
          }
        ),
        practicalInfo: fields.object(
          {
            accommodation: fields.text({
              label: "Zakwaterowanie",
              multiline: true,
            }),
            food: fields.text({ label: "Wyżywienie", multiline: true }),
            transport: fields.text({
              label: "Dojazd (opcjonalny)",
              multiline: true,
            }),
            childCare: fields.text({
              label: "Opieka nad dziećmi (opcjonalny)",
              multiline: true,
            }),
          },
          { label: "Informacje praktyczne" }
        ),
        pricing: fields.array(
          fields.object({
            label: fields.text({ label: "Wariant" }),
            price: fields.integer({ label: "Cena (zł)" }),
          }),
          {
            label: "Cennik",
            itemLabel: (props) =>
              `${props.fields.label.value}: ${props.fields.price.value} zł`,
          }
        ),
        priceIncludes: fields.array(fields.text({ label: "Pozycja" }), {
          label: "Cena zawiera",
        }),
        priceExcludes: fields.array(fields.text({ label: "Pozycja" }), {
          label: "Cena nie zawiera",
        }),
        collaborator: fields.object(
          {
            name: fields.text({ label: "Imię i nazwisko" }),
            role: fields.text({ label: "Rola" }),
            bio: fields.text({ label: "Bio", multiline: true }),
            image: fields.text({ label: "Zdjęcie (ścieżka)" }),
          },
          { label: "Współprowadzący" }
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Pytanie" }),
            answer: fields.text({ label: "Odpowiedź", multiline: true }),
          }),
          {
            label: "FAQ",
            itemLabel: (props) => props.fields.question.value || "...",
          }
        ),
        gallery: fields.array(
          fields.object({
            src: fields.text({ label: "Ścieżka do zdjęcia" }),
            alt: fields.text({ label: "Opis alternatywny" }),
            isMain: fields.checkbox({
              label: "Zdjęcie główne",
              defaultValue: false,
            }),
          }),
          {
            label: "Galeria",
            itemLabel: (props) => props.fields.alt.value || "...",
          }
        ),
        contentBlocks: fields.array(
          fields.conditional(
            fields.select({
              label: "Typ bloku",
              options: [
                { label: "Tekst", value: "text" },
                { label: "Zdjęcie", value: "image" },
              ],
              defaultValue: "text",
            }),
            {
              text: fields.object({
                text: fields.text({ label: "Treść", multiline: true }),
              }),
              image: fields.object({
                image: fields.image({
                  label: "Zdjęcie",
                  directory: "public/images/content",
                  publicPath: "/images/content/",
                }),
                alt: fields.text({ label: "Opis alternatywny" }),
              }),
            }
          ),
          {
            label: "Bloki treści",
            itemLabel: (props) =>
              props.discriminant === "text" ? "Tekst" : "Zdjęcie",
          }
        ),
      },
    }),

    team: collection({
      label: "Zespół",
      slugField: "name",
      path: "content/team/*",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Imię i nazwisko" } }),
        role: fields.text({ label: "Rola" }),
        bio: fields.text({ label: "Bio", multiline: true }),
        image: fields.text({ label: "Zdjęcie (ścieżka)" }),
      },
    }),

    testimonials: collection({
      label: "Opinie",
      slugField: "author",
      path: "content/testimonials/*",
      format: { data: "yaml" },
      schema: {
        author: fields.slug({ name: { label: "Autor" } }),
        quote: fields.text({ label: "Cytat", multiline: true }),
        context: fields.text({ label: "Kontekst (np. mama 7-letniej Zuzi)" }),
        trip: fields.text({ label: "Wyjazd (opcjonalny)" }),
        date: fields.text({ label: "Data dodania (YYYY-MM-DD)", defaultValue: "" }),
      },
    }),

    blog: collection({
      label: "Blog",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Tytuł" } }),
        subtitle: fields.text({ label: "Podtytuł" }),
        publishedDate: fields.text({ label: "Data publikacji (YYYY-MM-DD)" }),
        image: fields.text({ label: "Zdjęcie (ścieżka, opcjonalne)" }),
        content: fields.markdoc({
          label: "Treść",
        }),
      },
    }),

    gallery: collection({
      label: "Galeria",
      slugField: "alt",
      path: "content/gallery/*",
      format: { data: "yaml" },
      schema: {
        alt: fields.slug({ name: { label: "Opis alternatywny" } }),
        src: fields.text({ label: "Ścieżka do zdjęcia" }),
        category: fields.text({ label: "Kategoria (opcjonalna)" }),
      },
    }),
  },

  singletons: {
    places: singleton({
      label: "Miejsca",
      path: "content/places",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Nazwa" }),
            description: fields.text({ label: "Opis", multiline: true }),
            url: fields.text({ label: "URL (opcjonalny)" }),
            images: fields.array(fields.text({ label: "Ścieżka" }), {
              label: "Zdjęcia",
            }),
            features: fields.array(fields.text({ label: "Cecha" }), {
              label: "Cechy",
            }),
          }),
          {
            label: "Miejsca",
            itemLabel: (props) => props.fields.name.value || "...",
          }
        ),
      },
    }),

    homepage: singleton({
      label: "Strona główna",
      path: "content/homepage",
      format: { data: "yaml" },
      schema: {
        featuredTestimonialIds: fields.array(
          fields.text({ label: "ID opinii (slug)" }),
          { label: "Wyróżnione opinie na stronie głównej" }
        ),
      },
    }),
  },
});
