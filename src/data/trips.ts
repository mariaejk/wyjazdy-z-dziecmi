import type { Trip } from "@/types/trip";
import { getTeamMember } from "@/data/team";

const kamila = getTeamMember("Kamila Janczurewicz");

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
      role: "Tancerka, choreografka, nauczycielka jogi",
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
    title: "Joga i Konie \u2014 Harmonia Natury na Mazurach",
    subtitle: "Rodzinne warsztaty uwa\u017Cno\u015Bci, blisko\u015Bci i przygody",
    date: "2026-06-20",
    dateEnd: "2026-06-22",
    location: "Sasek Ma\u0142y \u2014 Mazury",
    shortDescription:
      "Zapraszamy Was do miejsca, gdzie czas mierzy si\u0119 t\u0119tnem lasu i spokojnym oddechem stada koni. To przestrze\u0144 dla rodzin, kt\u00F3re chc\u0105 zamieni\u0107 miejski zgie\u0142k na zapach siana, ch\u0142\u00F3d jeziora i autentyczn\u0105 relacj\u0119 z natur\u0105.",
    longDescription:
      "Wyjazd \u201EJoga i Konie\u201D to spotkanie dw\u00F3ch \u015Bwiat\u00F3w, kt\u00F3re ucz\u0105 nas tego samego: jak by\u0107 w pe\u0142ni obecnym \u201Etu i teraz\u201D. W Sasku, po\u015Br\u00F3d kilkudziesi\u0119ciu koni i mazurskich las\u00F3w, stworzymy bezpieczny kr\u0105g, w kt\u00F3rym ka\u017Cde dziecko i ka\u017Cdy rodzic poczuje si\u0119 wa\u017Cny i us\u0142yszany.\n\nKonie s\u0105 mistrzami uwa\u017Cno\u015Bci. Wyczuwaj\u0105 nasze emocje i ucz\u0105 nas spokoju, cierpliwo\u015Bci oraz \u0142agodno\u015Bci. Joga z kolei pozwala nam wr\u00F3ci\u0107 do w\u0142asnego cia\u0142a, wyciszy\u0107 uk\u0142ad nerwowy i otworzy\u0107 si\u0119 na spotkanie z drugim cz\u0142owiekiem \u2014 tym ma\u0142ym i tym du\u017Cym.\n\nNa wyjazd czeka na Was poranna joga na trawie z widokiem na jezioro, dostosowana do mo\u017Cliwo\u015Bci doros\u0142ych i dzieci. Poznacie ko\u0144ski j\u0119zyk \u2014 nauk\u0119 opieki, czyszczenia i rozumienia koni pod okiem do\u015Bwiadczonych instruktor\u00F3w. Profesjonalna infrastruktura Saska pozwala na bezpieczny start dla pocz\u0105tkuj\u0105cych i pi\u0119kne trasy le\u015Bne dla zaawansowanych.\n\nKamila poprowadzi warsztaty z ajurwedyjskimi wskaz\u00F3wkami dotycz\u0105cymi wyciszenia i regeneracji, nauk\u0105 koj\u0105cego dotyku i wsp\u00F3lnymi rytua\u0142ami blisko\u015Bci.\n\nA po warsztatach? K\u0105piele w piaszczystym jeziorze, wsp\u00F3lne ogniska, sp\u0142ywy kajakowe Sawic\u0105 i wieczorne rozmowy pod gwiazdami. Mazurski chill w najlepszym wydaniu.",
    image: "/images/yoga-konie.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodziny szukaj\u0105ce aktywnego wypoczynku w naturze" },
      { label: "Rodzice pragn\u0105cy wzmocni\u0107 wi\u0119\u017A z dzieckiem" },
      { label: "Mi\u0142o\u015Bnicy koni \u2014 pocz\u0105tkuj\u0105cy i zaawansowani" },
      { label: "Osoby szukaj\u0105ce cyfrowego detoksu i wyciszenia" },
    ],
    schedule: [
      {
        date: "2026-06-20",
        dayLabel: "Pi\u0105tek, 20 czerwca",
        activities: [
          { time: "od 16:00", activity: "Przyjazd, zakwaterowanie, zwiedzanie Saska" },
          { time: "19:00", activity: "Kolacja powitalna" },
          { time: "20:00", activity: "Kr\u0105g otwarcia i integracja przy ognisku" },
        ],
      },
      {
        date: "2026-06-21",
        dayLabel: "Sobota, 21 czerwca",
        activities: [
          { time: "8:00", activity: "Rodzinna joga i \u015Bwiadomy oddech na powitanie dnia" },
          { time: "9:00", activity: "Pyszne, lokalne \u015Bniadanie" },
          { time: "10:30", activity: "Blok warsztatowy: dzieci w stajni (nauka blisko\u015Bci z ko\u0144mi) // mamy w kr\u0119gu uwa\u017Cno\u015Bci" },
          { time: "14:00", activity: "Wsp\u00F3lny mazurski obiad" },
          { time: "15:30", activity: "Czas wolny: pla\u017Ca, kajaki lub wsp\u00F3lny spacer do lasu" },
          { time: "17:00", activity: "Jazdy konne / p\u0142awienie koni" },
          { time: "19:00", activity: "Kolacja i wieczorne opowie\u015Bci o naturze przy ognisku" },
        ],
      },
      {
        date: "2026-06-22",
        dayLabel: "Niedziela, 22 czerwca",
        activities: [
          { time: "8:00", activity: "Poranna joga na trawie" },
          { time: "9:00", activity: "\u015Aniadanie" },
          { time: "10:30", activity: "Warsztaty z Kamil\u0105: ajurweda, koj\u0105cy dotyk i rytua\u0142y blisko\u015Bci" },
          { time: "14:00", activity: "Obiad po\u017Cegnalny" },
          { time: "15:00", activity: "Kr\u0105g zamykaj\u0105cy i po\u017Cegnanie" },
        ],
      },
    ],
    practicalInfo: {
      accommodation:
        "Przytulne apartamenty w Sasku Ma\u0142ym \u2014 bezpieczny, ogrodzony teren z dost\u0119pem do jeziora.",
      food: "Pe\u0142ne, lokalne wy\u017Cywienie z uwzgl\u0119dnieniem diet i preferencji dzieci.",
    },
    pricing: [],
    deposit: 0,
    collaborator: {
      name: kamila?.name ?? "Kamila Janczurewicz",
      role: kamila?.role,
      bio: kamila?.bio ?? "",
      image: kamila?.image,
    },
    faq: [
      {
        question: "Czy potrzebne jest do\u015Bwiadczenie w je\u017Adzie konnej?",
        answer:
          "Nie, zupe\u0142nie nie! Infrastruktura Saska pozwala na bezpieczny start dla pocz\u0105tkuj\u0105cych. Do\u015Bwiadczeni instruktorzy zadbaj\u0105 o komfort zar\u00F3wno dzieci, jak i doros\u0142ych, niezale\u017Cnie od poziomu zaawansowania.",
      },
      {
        question: "Dla jakiego wieku dzieci jest ten wyjazd?",
        answer:
          "Zapraszamy rodziny z dzie\u0107mi w ka\u017Cdym wieku \u2014 atrakcje s\u0105 dostosowane do etapu rozwoju. Zar\u00F3wno maluchy, jak i starsze dzieci znajd\u0105 co\u015B dla siebie.",
      },
      {
        question: "Czy wy\u017Cywienie jest wliczone w cen\u0119?",
        answer:
          "Tak, pe\u0142ne wy\u017Cywienie jest wliczone. Posi\u0142ki przygotowywane s\u0105 z lokalnych sk\u0142adnik\u00F3w z uwzgl\u0119dnieniem diet i preferencji dzieci (alergie, nietolerancje).",
      },
      {
        question: "Jak dojecha\u0107 do Saska?",
        answer:
          "Sasek Ma\u0142y znajduje si\u0119 na Mazurach. Szczeg\u00F3\u0142owe wskaz\u00F3wki dojazdu (w tym wsp\u00F3\u0142rz\u0119dne GPS) otrzymasz po potwierdzeniu rezerwacji. Dojazd w\u0142asny.",
      },
      {
        question: "Co zabra\u0107 ze sob\u0105?",
        answer:
          "Wygodne ubrania na cebulk\u0119 (pogoda nad jeziorem bywa zmienna), buty terenowe, str\u00F3j k\u0105pielowy, krem z filtrem i ulubion\u0105 przytulank\u0119 dziecka. Maty do jogi zapewniamy na miejscu.",
      },
    ],
    gallery: [
      {
        src: "/images/yoga-konie.jpg",
        alt: "Joga i konie na Mazurach \u2014 rodzinne warsztaty w Sasku",
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
