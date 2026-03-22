import type { Trip } from "@/types/trip";

export const trips: Trip[] = [
  {
    slug: "matka-i-corka",
    title: "Matka i Córka — Wspólny Rytm",
    subtitle:
      "Wyjazd z tańcem, jogą i warsztatami dla kobiet i dziewczynek 5+",
    date: "2026-03-06",
    dateEnd: "2026-03-08",
    location: "Kacze Bagno — Miejsce Inicjatyw Pozytywnych",
    shortDescription:
      "Zapraszamy Cię w podróż poza codzienny pośpiech, hałas i role, w które tak łatwo wpadamy. \u201EMatka i Córka \u2013 Wspólny Rytm\u201D to wyjazdowe warsztaty stworzone z myślą o kobietach \u2014 tych dużych i tych małych \u2014 które pragną spotkać się naprawdę: w ruchu, w uważności i w sercu.",
    longDescription:
      "Podczas wyjazdu będziemy spotykać się w ruchu i obecności — poprzez jogę, taniec intuicyjny, medytacje, sztukę, muzykę i głos.\n\nTworzymy przestrzeń, w której córki poczują się częścią kręgu kobiet — widziane, ważne i zaproszone do bycia sobą.\n\nJednocześnie zadbamy o równowagę. Będzie czas wspólny, pogłębiający relację matki i córki, ale także czas oddzielny — moment tylko dla mam, na regenerację, refleksję i bycie w kobiecym kręgu. W tym czasie małe kobiety spędzą czas razem, budując własne relacje, ucząc się współbycia i wspólnej zabawy w bezpiecznej, uważnej przestrzeni.\n\nPoznasz praktyki, które zabierzesz ze sobą do codzienności — proste, a jednocześnie głębokie rytuały ruchu, oddechu i obecności, które mogą stać się Waszym wspólnym językiem także po powrocie do domu.\n\nSpotkasz inne kobiety — mamy i córki — i razem stworzymy krąg wspólnej kreacji i autentycznego bycia. Przestrzeń, w której nie trzeba nic udowadniać, przyspieszać ani dopasowywać się. Wystarczy być.\n\nJeśli czujesz, że chcesz zatrzymać się, odetchnąć i spotkać swoją córkę w nowy sposób — ten wyjazd jest dla Was.\n\nJeśli pragniesz, by Twoje dziecko od najmłodszych lat doświadczało mocy kobiecych spotkań, ruchu i uważności — zapraszamy Was do Wspólnego Rytmu.",
    image: "/images/matka-corka.jpg",
    isPast: false,
    targetAudience: [
      {
        label: "Mamy, które chcą świadomie budować relację z córką",
      },
      {
        label: "Córki 5+, które lubią ruch, taniec i tworzenie",
      },
      {
        label: "Kobiety szukające wytchnienia od codziennego pośpiechu",
      },
      {
        label: "Pary mama-córka, które chcą się poznać na nowo",
      },
    ],
    schedule: [
      {
        date: "2026-03-06",
        dayLabel: "Piątek, 6 marca",
        activities: [
          { time: "od 16:00", activity: "Przyjazd uczestników, zakwaterowanie" },
          { time: "19:00", activity: "Kolacja" },
          {
            time: "20:00",
            activity: "Krąg otwarcia & integracja (warsztat wprowadzający)",
          },
        ],
      },
      {
        date: "2026-03-07",
        dayLabel: "Sobota, 7 marca",
        activities: [
          { time: "8:00", activity: "Joga" },
          { time: "9:00", activity: "Śniadanie" },
          {
            time: "10:00–13:00",
            activity:
              "Warsztat 4 żywiołów dla matek z Marią // warsztat ceramiczny dla córek",
          },
          { time: "14:00", activity: "Obiad" },
          {
            time: "15:30–18:30",
            activity:
              "Warsztat taneczno-rozwojowy z Iloną dla matek i córek",
          },
          { time: "19:00", activity: "Kolacja" },
          { time: "20:00", activity: "Sauna & balia & chill" },
        ],
      },
      {
        date: "2026-03-08",
        dayLabel: "Niedziela, 8 marca",
        activities: [
          { time: "8:00", activity: "Joga" },
          { time: "9:00", activity: "Śniadanie" },
          { time: "10:00–13:00", activity: "Warsztat taneczno-rozwojowy" },
          { time: "14:00", activity: "Obiad" },
          { time: "15:00", activity: "Krąg zamykający" },
        ],
      },
    ],
    practicalInfo: {
      accommodation:
        "Eko-domki, pokoje w budynku głównym lub duża sala nad pracownią; pokoje 1-2-3 lub wieloosobowe.",
      food: "Eko jedzenie z uwzględnieniem diet (alergii, nietolerancji).",
    },
    pricing: [
      { label: "Osoba dorosła (pokoje)", price: 1400 },
      { label: "Osoba dorosła (sala wspólna)", price: 1100 },
      { label: "Dziecko do lat 8", price: 750 },
    ],
    deposit: 450,
    collaborator: {
      name: "Ilona Bekier-Ekwa",
      bio: "Tancerka, choreografka, nauczycielka jogi i medytacji, finalistka oraz choreografka programu You Can Dance, mentorka i twórczyni projektu rozwojowego dla kobiet Womanifesto. Od ponad 20 lat tworzy przestrzenie, w których ruch staje się powrotem do esencji, czułości i autentycznego kontaktu ze sobą. Jest też mamą 5-letniej Naomi, z którą wspólnie praktykuje jogę i taniec, zapraszając mamy i córki do spotkania we Wspólnym Rytmie — poprzez ruch, bliskość i radość bycia razem.",
    },
    faq: [
      {
        question: "Czy mogę przyjechać z dzieckiem młodszym niż 5 lat?",
        answer:
          "Warsztaty są projektowane z myślą o dziewczynkach w wieku 5+. Jeśli Twoje dziecko jest nieco młodsze, skontaktuj się z nami — ocenimy indywidualnie, czy program będzie odpowiedni.",
      },
      {
        question: "Jak dojechać do Kaczego Bagna?",
        answer:
          "Kacze Bagno znajduje się w malowniczej okolicy. Szczegółowe wskazówki dojazdu otrzymasz po potwierdzeniu rezerwacji. Dojazd własny.",
      },
      {
        question: "Czy wyżywienie jest wliczone w cenę?",
        answer:
          "Tak, pełne wyżywienie (śniadania, obiady, kolacje) jest wliczone w cenę. Posiłki są przygotowywane z ekologicznych składników z uwzględnieniem diet i alergii.",
      },
      {
        question: "Czy mogę wpłacić zaliczkę przelewem?",
        answer:
          "Tak, zaliczka 450 zł gwarantuje miejsce na wyjeździe. Dane do przelewu otrzymasz po wypełnieniu formularza zgłoszeniowego.",
      },
      {
        question: "Co zabrać ze sobą?",
        answer:
          "Wygodne ubrania do ćwiczeń (joga, taniec), cieplejszą warstwę na wieczory, obuwie na zewnątrz. Maty do jogi i materiały warsztatowe zapewniamy na miejscu.",
      },
    ],
    gallery: [
      {
        src: "/images/matka-corka.jpg",
        alt: "Warsztaty Matka i Córka — taniec i joga w naturze",
        isMain: true,
      },
      {
        src: "/images/kacze-bagno.jpg",
        alt: "Kacze Bagno — eko-domki w otoczeniu natury",
      },
      {
        src: "/images/galeria-1.jpg",
        alt: "Wspólne warsztaty dla mam i córek",
      },
    ],
  },
  {
    slug: "yoga-i-konie",
    title: "Yoga i Konie",
    subtitle: "Rodzinny wyjazd z jogą i jazdą konną",
    date: "2026-06-20",
    dateEnd: "2026-06-22",
    location: "Sasek — Mazury",
    shortDescription:
      "Wyjątkowe połączenie jogi i kontaktu z końmi w sercu Mazur. Wyjazd dla rodzin, które szukają aktywnego wypoczynku w otoczeniu natury, z dala od zgiełku miasta.",
    longDescription:
      "Szczegółowy program wkrótce. Śledź nasze media społecznościowe, aby być na bieżąco!",
    image: "/images/yoga-konie.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodziny z dziećmi lubiące aktywny wypoczynek" },
      { label: "Miłośnicy koni i jogi" },
    ],
    schedule: [],
    practicalInfo: {
      accommodation:
        "Pokoje nad brzegiem jeziora, otoczone lasami.",
      food: "Pełne wyżywienie wliczone w cenę.",
    },
    pricing: [],
    deposit: 0,
    collaborator: {
      name: "Wkrótce",
      bio: "Informacje o prowadzących pojawią się wkrótce.",
    },
    faq: [],
    gallery: [
      {
        src: "/images/yoga-konie.jpg",
        alt: "Yoga i konie na Mazurach",
        isMain: true,
      },
    ],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function getAllTrips(): Trip[] {
  return trips;
}

export function getUpcomingTrips(): Trip[] {
  return trips.filter((trip) => !trip.isPast);
}

export function getPastTrips(): Trip[] {
  return trips.filter((trip) => trip.isPast);
}
