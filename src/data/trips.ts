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
    category: "matka-corka",
    shortDescription:
      "Zapraszamy Cię w podróż poza codzienny pośpiech, hałas i role, w które tak łatwo wpadamy. „Matka i Córka – Wspólny Rytm” to wyjazdowe warsztaty stworzone z myślą o kobietach — tych dużych i tych małych — które pragną spotkać się naprawdę: w ruchu, w uważności i w sercu.",
    longDescription:
      "Podczas wyjazdu będziemy spotykać się w ruchu i obecności — poprzez jogę, taniec intuicyjny, medytacje, sztukę, muzykę i głos.\n\nTworzymy przestrzeń, w której córki poczują się częścią kręgu kobiet — widziane, ważne i zaproszone do bycia sobą.\n\nJednocześnie zadbamy o równowagę. Będzie czas wspólny, pogłębiający relację matki i córki, ale także czas oddzielny — moment tylko dla mam, na regenerację, refleksję i bycie w kobiecym kręgu. W tym czasie małe kobiety spędzą czas razem, budując własne relacje, ucząc się współbycia i wspólnej zabawy w bezpiecznej, uważnej przestrzeni.\n\nPoznasz praktyki, które zabierzesz ze sobą do codzienności — proste, a jednocześnie głębokie rytuały ruchu, oddechu i obecności, które mogą stać się Waszym wspólnym językiem także po powrocie do domu.\n\nSpotkasz inne kobiety — mamy i córki — i razem stworzymy krąg wspólnej kreacji i autentycznego bycia. Przestrzeń, w której nie trzeba nic udowadniać, przyspieszać ani dopasowywać się. Wystarczy być.\n\nJeśli czujesz, że chcesz zatrzymać się, odetchnąć i spotkać swoją córkę w nowy sposób — ten wyjazd jest dla Was.\n\nJeśli pragniesz, by Twoje dziecko od najmłodszych lat doświadczało mocy kobiecych spotkań, ruchu i uważności — zapraszamy Was do Wspólnego Rytmu.",
    image: "/images/matka-corka.jpg",
    isPast: false,
    targetAudience: [
      {
        label: "Mamy, które chcą świadomie budować relację z córką",
      },
      {
        label: "Córki od 5 lat, które lubią ruch, taniec i tworzenie",
        description: "Warsztaty są projektowane z myślą o dziewczynkach w wieku 5+. Jeśli Twoja córka jest nieco młodsza — skontaktuj się z nami, ocenimy indywidualnie.",
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
    spotsTotal: 12,
    spotsLeft: 5,
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
        question: "Co zabrać ze sobą?",
        answer:
          "Wygodne buty terenowe (najlepiej dwie pary), ubrania „nieszkoda” — takie, które mogą się wybrodzić błotem czy gliną. Ciepła warstwa na wieczory, krem z filtrem, bidon na wodę i ulubiona przytulanka dziecka. Maty do jogi i materiały warsztatowe zapewniamy na miejscu.",
      },
      {
        question: "Czy jest zasięg telefoniczny?",
        answer:
          "Kacze Bagno to miejsce, gdzie telefon służy głównie jako aparat fotograficzny. Ograniczony zasięg to luksus — dzięki temu macie więcej czasu na wspólne ogniska, rozmowy i bycie razem. Traktujcie to jako cyfrowy detoks dla całej rodziny.",
      },
      {
        question: "Jak dojechać do Kaczego Bagna?",
        answer:
          "Dojazd własny. Szczegółowe wskazówki dojazdu wraz ze współrzędnymi GPS otrzymasz po potwierdzeniu rezerwacji. Kacze Bagno znajduje się w malowniczej okolicy — idealnej na rodzinny weekend.",
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
    contentBlocks: [
      { type: "text", text: "Podczas wyjazdu będziemy spotykać się w ruchu i obecności — poprzez jogę, taniec intuicyjny, medytacje, sztukę, muzykę i głos." },
      { type: "image", src: "/images/matki-corki-1.jpg", alt: "Warsztaty matka i córka — ruch i taniec" },
      { type: "text", text: "Tworzymy przestrzeń, w której córki poczują się częścią kręgu kobiet — widziane, ważne i zaproszone do bycia sobą." },
      { type: "image", src: "/images/matki-corki-2.jpg", alt: "Krąg kobiet — matki i córki" },
      { type: "text", text: "Jednocześnie zadbamy o równowagę. Będzie czas wspólny, pogłębiający relację matki i córki, ale także czas oddzielny — moment tylko dla mam, na regenerację, refleksję i bycie w kobiecym kręgu." },
      { type: "image", src: "/images/matki-corki-3.jpg", alt: "Czas dla mam — regeneracja" },
      { type: "text", text: "Poznasz praktyki, które zabierzesz ze sobą do codzienności — proste, a jednocześnie głębokie rytuały ruchu, oddechu i obecności, które mogą stać się Waszym wspólnym językiem także po powrocie do domu." },
      { type: "image", src: "/images/matki-corki-4.jpg", alt: "Rytuały ruchu i obecności" },
      { type: "text", text: "Spotkasz inne kobiety — mamy i córki — i razem stworzymy krąg wspólnej kreacji i autentycznego bycia. Przestrzeń, w której nie trzeba nic udowadniać, przyspieszać ani dopasowywać się. Wystarczy być." },
      { type: "image", src: "/images/matki-corki-5.jpg", alt: "Wspólna kreacja — warsztaty" },
    ],
  },
  {
    slug: "yoga-i-konie",
    title: "Joga i Konie — Harmonia Natury na Mazurach",
    subtitle: "Rodzinne warsztaty uważności, bliskości i przygody",
    date: "2026-06-20",
    dateEnd: "2026-06-22",
    location: "Sasek Mały — Mazury",
    category: "rodzinny",
    shortDescription:
      "Zapraszamy Was do miejsca, gdzie czas mierzy się tętnem lasu i spokojnym oddechem stada koni. To przestrzeń dla rodzin, które chcą zamienić miejski zgiełk na zapach siana, chłód jeziora i autentyczną relację z naturą.",
    longDescription:
      "Wyjazd „Joga i Konie” to spotkanie dwóch światów, które uczą nas tego samego: jak być w pełni obecnym „tu i teraz”. W Sasku, pośród kilkudziesięciu koni i mazurskich lasów, stworzymy bezpieczny krąg, w którym każde dziecko i każdy rodzic poczuje się ważny i usłyszany.\n\nKonie są mistrzami uważności. Wyczuwają nasze emocje i uczą nas spokoju, cierpliwości oraz łagodności. Joga z kolei pozwala nam wrócić do własnego ciała, wyciszyć układ nerwowy i otworzyć się na spotkanie z drugim człowiekiem — tym małym i tym dużym.\n\nNa wyjazd czeka na Was poranna joga na trawie z widokiem na jezioro, dostosowana do możliwości dorosłych i dzieci. Poznacie koński język — naukę opieki, czyszczenia i rozumienia koni pod okiem doświadczonych instruktorów. Profesjonalna infrastruktura Saska pozwala na bezpieczny start dla początkujących i piękne trasy leśne dla zaawansowanych.\n\nKamila poprowadzi warsztaty z ajurwedyjskimi wskazówkami dotyczącymi wyciszenia i regeneracji, nauką kojącego dotyku i wspólnymi rytuałami bliskości.\n\nA po warsztatach? Kąpiele w piaszczystym jeziorze, wspólne ogniska, spływy kajakowe Sawicą i wieczorne rozmowy pod gwiazdami. Mazurski chill w najlepszym wydaniu.",
    image: "/images/yoga-konie.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodziny szukające aktywnego wypoczynku w naturze" },
      { label: "Rodzice pragnący wzmocnić więź z dzieckiem" },
      { label: "Miłośnicy koni — początkujący i zaawansowani" },
      { label: "Osoby szukające cyfrowego detoksu i wyciszenia" },
    ],
    schedule: [
      {
        date: "2026-06-20",
        dayLabel: "Piątek, 20 czerwca",
        activities: [
          { time: "od 16:00", activity: "Przyjazd, zakwaterowanie, zwiedzanie Saska" },
          { time: "19:00", activity: "Kolacja powitalna" },
          { time: "20:00", activity: "Krąg otwarcia i integracja przy ognisku" },
        ],
      },
      {
        date: "2026-06-21",
        dayLabel: "Sobota, 21 czerwca",
        activities: [
          { time: "8:00", activity: "Rodzinna joga i świadomy oddech na powitanie dnia" },
          { time: "9:00", activity: "Pyszne, lokalne śniadanie" },
          { time: "10:30", activity: "Blok warsztatowy: dzieci w stajni (nauka bliskości z końmi) // mamy w kręgu uważności" },
          { time: "14:00", activity: "Wspólny mazurski obiad" },
          { time: "15:30", activity: "Czas wolny: plaża, kajaki lub wspólny spacer do lasu" },
          { time: "17:00", activity: "Jazdy konne / pławienie koni" },
          { time: "19:00", activity: "Kolacja i wieczorne opowieści o naturze przy ognisku" },
        ],
      },
      {
        date: "2026-06-22",
        dayLabel: "Niedziela, 22 czerwca",
        activities: [
          { time: "8:00", activity: "Poranna joga na trawie" },
          { time: "9:00", activity: "Śniadanie" },
          { time: "10:30", activity: "Warsztaty z Kamilą: ajurweda, kojący dotyk i rytuały bliskości" },
          { time: "14:00", activity: "Obiad pożegnalny" },
          { time: "15:00", activity: "Krąg zamykający i pożegnanie" },
        ],
      },
    ],
    practicalInfo: {
      accommodation:
        "Przytulne apartamenty w Sasku Małym — bezpieczny, ogrodzony teren z dostępem do jeziora.",
      food: "Pełne, lokalne wyżywienie z uwzględnieniem diet i preferencji dzieci.",
    },
    pricing: [
      { label: "Warsztaty + joga \u2014 doros\u0142y", price: 900 },
      { label: "Warsztaty + joga \u2014 dziecko", price: 700 },
    ],
    priceIncludes: [
      "Warsztaty rozwojowe i joga",
      "Animacje i opieka dla dzieci",
      "Gry i zabawy na \u015Bwie\u017Cym powietrzu",
    ],
    priceExcludes: [
      "Nocleg (od 100 z\u0142/os, p\u0142atny w pensjonacie)",
      "Wy\u017Cywienie (140 z\u0142/dzie\u0144 doros\u0142y, 70 z\u0142 dzieci do 10 lat, 0 z\u0142 dzieci do 3 lat)",
      "Jazda konna (p\u0142atna w pensjonacie)",
    ],
    deposit: 300,
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
          "Wy\u017Cywienie jest p\u0142atne osobno: 140 z\u0142/dzie\u0144 (doros\u0142y), 70 z\u0142 (dzieci do 10 lat), bezp\u0142atnie (dzieci do 3 lat). Posi\u0142ki przygotowywane s\u0105 z lokalnych sk\u0142adnik\u00F3w.",
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
      {
        question: "Ile kosztuje nocleg?",
        answer:
          "Noclegi od 100 z\u0142/os/noc. Pe\u0142ny cennik pokoi dost\u0119pny na stronie sasek.pl/cennik.",
      },
    ],
    gallery: [
      {
        src: "/images/yoga-konie.jpg",
        alt: "Joga i konie na Mazurach — rodzinne warsztaty w Sasku",
        isMain: true,
      },
    ],
  },
  {
    slug: "krag-uwaznosci-2026",
    title: "W Kręgu Uważności — wyjazd dla rodziców i dzieci",
    subtitle: "Weekend pełen uważności, rozmów i wspólnego bycia",
    date: "2026-05-29",
    dateEnd: "2026-05-31",
    location: "Kacze Bagno — Miejsce Inicjatyw Pozytywnych",
    category: "rodzinny",
    shortDescription:
      "Z okazji dnia dziecka, matki i ojca spotkamy się w jeden weekend, aby z uważnością spojrzeć na każdego i każdą z Was. To czas, by pokazać, jak ważny jesteś w swej roli i jak ważne jest, aby zadbać o siebie — tak jak o swoje dziecko.",
    longDescription:
      "W kręgu spotkasz rodziców — tych, którzy w pojedynkę wychowują dzieci, i tych, którzy mają na co dzień wsparcie partnera. Będzie okazja do wymiany doświadczeń, szczerej i wspierającej rozmowy oraz nawiązania wartościowych znajomości.\n\nKrąg, w którym każdy jest ważny i wysłuchany, rozmowa i uważność, a także dużo pracy twórczej, joga, treningi, sesja oddechowa, sauna, balia, ognisko, kajaki i długie rozmowy pod gwiazdami.",
    image: "/images/kazce-bagno-1.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodzice szukający chwili zatrzymania i uważności" },
      { label: "Samodzielni rodzice potrzebujący wsparcia" },
      { label: "Rodziny chcące pogłębić relację" },
    ],
    schedule: [],
    practicalInfo: {
      accommodation: "Eko-domki lub sala wspólna w Kaczym Bagnie.",
      food: "Pełne wyżywienie z ekologicznych składników.",
    },
    pricing: [],
    deposit: 0,
    faq: [
      {
        question: "Czy mogę przyjechać sam/sama z dzieckiem?",
        answer: "Oczywiście! Wyjazd jest dla wszystkich rodziców — niezależnie od sytuacji rodzinnej.",
      },
      {
        question: "Co nas czeka na wyjeździe?",
        answer: "Krąg uważności, joga, sesje oddechowe, warsztaty twórcze, sauna, balia, ognisko, kajaki i dużo rozmów.",
      },
    ],
    gallery: [],
  },
  {
    slug: "rodzinny-konie-joga-2026",
    title: "Rodzinny tydzień z końmi i jogą",
    subtitle: "Tydzień natury, bliskości i dobrej energii na Mazurach",
    date: "2026-08-01",
    dateEnd: "2026-08-07",
    location: "Sasek Mały — Mazury",
    category: "rodzinny",
    shortDescription:
      "Zapraszamy na wyjątkowy, rodzinny wyjazd pełen natury, bliskości i dobrej energii. Spędzimy tydzień w malowniczym Sasku Małym — wśród lasów, nad czystym jeziorem, w rytmie natury i w towarzystwie koni.",
    longDescription:
      "To przestrzeń, w której można naprawdę zwolnić, odetchnąć i pobyć razem.\n\nNa wyjazd czekają na Was: przejażdżki konne w terenie, nauka jazdy z instruktorem, codzienna opieka nad końmi, pływanie z końmi w jeziorze, joga na polanie wśród koni. Poranna joga nad brzegiem jeziora, fun joga dla rodziców i dzieci, relaksacje i świadomy oddech.\n\nKamila poprowadzi warsztaty ajurwedyjskie — naturalny sposób na regulację układu nerwowego, warsztat świadomego dotyku dla rodziców i dzieci. Codzienne zabawy inspirowane naturą, kąpiele w jeziorze, rodzinne ogniska pod gwiazdami.\n\nZapewniamy gry i zabawy dla dzieci każdego dnia oraz częściową opiekę dla dzieci, podczas gdy dorośli będą na jodze lub na warsztacie im dedykowanym.",
    image: "/images/yoga-konie.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodziny kochające naturę i życie w jej rytmie" },
      { label: "Rodzice chcący spędzić jakościowy czas z dziećmi" },
      { label: "Osoby potrzebujące wyciszenia i regeneracji" },
      { label: "Miłośnicy koni — początkujący i zaawansowani" },
    ],
    schedule: [
      {
        date: "2026-08-01",
        dayLabel: "Sobota, 1 sierpnia — dzień przyjazdu",
        activities: [
          { time: "od 14:00", activity: "Przyjazd, zakwaterowanie, zwiedzanie Saska" },
          { time: "19:00", activity: "Kolacja powitalna" },
          { time: "20:00", activity: "Krąg otwarcia i integracja przy ognisku" },
        ],
      },
    ],
    practicalInfo: {
      accommodation: "Przytulne apartamenty w pensjonacie Sasek Mały — bezpieczny, ogrodzony teren z dostępem do jeziora.",
      food: "Całodzienne wyżywienie: 140 zł/dzień dorosły, 70 zł dzieci do 10 lat, 0 zł dzieci do 3 lat.",
      transport: "Dojazd własny. Szczegółowe wskazówki otrzymasz po rezerwacji.",
    },
    pricing: [
      { label: "Warsztaty — dorosły", price: 900 },
      { label: "Warsztaty — dziecko", price: 700 },
    ],
    priceIncludes: [
      "Warsztaty rozwojowe i joga",
      "Animacje i opieka dla dzieci",
      "Gry i zabawy na świeżym powietrzu",
    ],
    priceExcludes: [
      "Nocleg (od 100 zł/os, płatny w pensjonacie)",
      "Wyżywienie (140 zł/dzień dorosły)",
      "Jazda konna (płatna w pensjonacie)",
    ],
    deposit: 300,
    collaborator: {
      name: kamila?.name ?? "Kamila Janczurewicz",
      role: kamila?.role,
      bio: kamila?.bio ?? "",
      image: kamila?.image,
    },
    faq: [
      {
        question: "Czy potrzebne jest doświadczenie w jeździe konnej?",
        answer: "Nie, zupełnie nie! Doświadczeni instruktorzy zadbają o komfort zarówno dzieci, jak i dorosłych.",
      },
      {
        question: "Jak zarezerwować miejsce?",
        answer: "Napisz do nas, a następnie zarezerwuj nocleg na stronie sasek.pl. Wpłata zaliczki 30% gwarantuje miejsce.",
      },
      {
        question: "Ile kosztuje nocleg?",
        answer: "Noclegi od 100 zł/os/noc. Cennik pokoi na stronie sasek.pl.",
      },
    ],
    gallery: [],
  },
  {
    slug: "zlot-kaczek-2026",
    title: "Festiwal Rodzinny \u201EZlot Kaczek\u201D — III edycja",
    subtitle: "Cztery dni warsztatów, muzyki i rodzinnej atmosfery",
    date: "2026-08-20",
    dateEnd: "2026-08-23",
    location: "Kacze Bagno — Miejsce Inicjatyw Pozytywnych",
    category: "rodzinny",
    shortDescription:
      "Wpiszcie w kalendarz: 20-23 sierpnia 2026! Po raz trzeci spotkamy się pod koniec sierpnia, by wspólnie spędzić przedostatni letni weekend. Jeszcze więcej warsztatów i wyjątkowych gości, jeszcze więcej magicznych wieczorów i niespiesznych poranków.",
    longDescription:
      "To wyjątkowe wydarzenie dla małych i nieco większych, dla mamy, taty i dzieci w każdym wieku. Nie ma znaczenia, czy na Festiwal wybierzesz się całą rodziną, czy samemu z dziećmi, z kolegą, babcią, sąsiadką — na miejscu spotkasz ludzi podobnych do Ciebie.\n\nWarsztaty muzyczne, plastyczne, ceramiczne, strefy tematyczne oraz kameralne koncerty to świetna okazja, aby spędzić naprawdę wyjątkowo czas w nadchodzące wakacje. W niespiesznej atmosferze, w bliskości, w naturze — po prostu pobyć razem.\n\nNa Zlocie Kaczek nie ma oddzielnej strefy warsztatowej dla rodzica i dziecka. Wszystkie warsztaty są zaproszeniem do wspólnie spędzonego, wartościowego czasu — jednocześnie dbasz o rozwój własny i Twojego dziecka.",
    image: "/images/kazce-bagno-2.jpg",
    isPast: false,
    targetAudience: [
      { label: "Rodziny z dziećmi w każdym wieku" },
      { label: "Samodzielni rodzice szukający wspólnoty" },
      { label: "Dziadkowie, ciocie, przyjaciele z dziećmi" },
    ],
    schedule: [],
    practicalInfo: {
      accommodation: "Pole namiotowe (w cenie biletu), sala wspólna z łóżkami (60 zł/os/noc), pokoje eko-domki (100 zł/os/noc), przyczepy campingowe (700 zł/4 dni).",
      food: "Pełne wyżywienie w cenie biletu: śniadanie, obiad, kolacja, domowe wypieki. Opcje: wegetariańska, wegańska, bezglutenowa.",
    },
    pricing: [
      { label: "Bilet early bird (czw-nd)", price: 690 },
      { label: "Bilet early bird (pt-nd)", price: 560 },
    ],
    priceIncludes: [
      "Pełne wyżywienie (3 posiłki + przekąski)",
      "Nocleg na polu namiotowym/campingowym",
      "Wszystkie warsztaty i atrakcje",
    ],
    priceExcludes: [
      "Nocleg w pokoju/eko-domku (dopłata)",
      "Przyczepa campingowa (dopłata)",
    ],
    earlyBirdDeadline: "2026-03-31",
    deposit: 0,
    spotsTotal: 35,
    faq: [
      {
        question: "Czy dzieci do 3 lat wchodzą za darmo?",
        answer: "Tak! Dzieci do lat 3 uczestniczą bezpłatnie.",
      },
      {
        question: "Co jeśli nie będę mógł przyjechać?",
        answer: "Bilety przebukujemy na kolejny rok — bez straty pieniędzy.",
      },
      {
        question: "Czy mogę przyjechać z namiotem?",
        answer: "Tak! Pole namiotowe jest w cenie biletu. To idealna opcja na pierwszy camping z dzieckiem.",
      },
    ],
    gallery: [],
  },
  {
    slug: "zlot-kaczek-swieta-2025",
    title: "Świąteczna Edycja Festiwalu Rodzinnego \u201EZlot Kaczek\u201D",
    subtitle: "Mikołajkowy weekend pełen warsztatów, magii i rodzinnego ciepła",
    date: "2025-12-05",
    dateEnd: "2025-12-07",
    location: "Kacze Bagno — Miejsce Inicjatyw Pozytywnych",
    category: "rodzinny",
    shortDescription:
      "Wyobraźcie sobie wszystko, co najpiękniejsze w Zlocie Kaczek — domowa atmosfera, kameralność, wartościowe warsztaty, cudowni ludzie. Całość przyprószona śniegiem, z zapachem cynamonu, otulona ciepłem świateł choinkowych.",
    longDescription:
      "Warsztaty mikołajkowe, teatralne czy ceramiczne to świetna okazja, aby spędzić naprawdę wyjątkowo ten świąteczny czas. W niespiesznej atmosferze, w bliskości — po prostu pobyć razem.\n\nAnimacje dla najmłodszych zapewnią chwile wytchnienia dla rodziców, którzy w tym czasie mogą skorzystać z zajęć im dedykowanych lub zwyczajnie nie robić nic. Program, chociaż bardzo bogaty, daje przestrzeń na odpoczynek i wytchnienie.\n\nPosiłki przygotowujemy na bazie naturalnych składników z naszego ogródka, jaj od naszych kur, świeżych produktów dostarczanych przez lokalnych wytwórców.",
    image: "/images/kazce-bagno-3.jpg",
    isPast: true,
    targetAudience: [
      { label: "Rodziny z dziećmi w każdym wieku" },
      { label: "Samodzielni rodzice szukający świątecznej atmosfery" },
    ],
    schedule: [
      {
        date: "2025-12-05",
        dayLabel: "Piątek, 5 grudnia",
        activities: [
          { time: "18:00", activity: "Wspólna kolacja" },
          { time: "19:00", activity: "Otwarcie Festiwalu w kręgu — Kamila Janczurewicz" },
        ],
      },
      {
        date: "2025-12-06",
        dayLabel: "Sobota, 6 grudnia",
        activities: [
          { time: "8:00", activity: "Joga o poranku dla dużych i małych" },
          { time: "9:00", activity: "Śniadanie" },
          { time: "10:30–14:00", activity: "Mikołajki dla dzieci / ceramika dla rodziców" },
          { time: "14:30", activity: "Obiad" },
          { time: "16:00–18:00", activity: "Rodzinne warsztaty teatralne — Edyta Machul" },
          { time: "18:30", activity: "Kolacja" },
          { time: "20:00", activity: "Świąteczne karaoke" },
        ],
      },
      {
        date: "2025-12-07",
        dayLabel: "Niedziela, 7 grudnia",
        activities: [
          { time: "8:00", activity: "Joga o poranku" },
          { time: "9:00", activity: "Śniadanie" },
          { time: "10:00–13:00", activity: "Warsztaty ceramiczne, pierniczkowe i bębniarskie" },
          { time: "14:00", activity: "Obiad" },
          { time: "15:00", activity: "Zakończenie Festiwalu w kręgu" },
        ],
      },
    ],
    practicalInfo: {
      accommodation: "Wspólna sala z łóżkami piętrowymi (w cenie biletu), eko-domki (450 zł/weekend/pokój), przyczepy campingowe (500 zł/weekend).",
      food: "Pełne wyżywienie w cenie biletu. Opcje: wegańska, wegetariańska, bezglutenowa.",
    },
    pricing: [
      { label: "Dzieci 3+ i dorośli", price: 650 },
      { label: "Dzieci do lat 3", price: 0 },
    ],
    priceIncludes: [
      "Pełne wyżywienie (3 posiłki + przekąski)",
      "Nocleg na sali wspólnej",
      "Wszystkie warsztaty i atrakcje",
    ],
    priceExcludes: [
      "Nocleg w eko-domku (dopłata)",
    ],
    deposit: 0,
    spotsLeft: 0,
    faq: [
      {
        question: "Czy jest zniżka dla dużych rodzin?",
        answer: "Tak, posiadacze Karty Dużej Rodziny mogą uzyskać zniżkę — prosimy o kontakt mailowy.",
      },
    ],
    gallery: [],
    contentBlocks: [
      { type: "text", text: "Warsztaty mikołajkowe, teatralne czy ceramiczne to świetna okazja, aby spędzić naprawdę wyjątkowo ten świąteczny czas." },
      { type: "image", src: "/images/kazce-bagno-4.jpg", alt: "Świąteczny Zlot Kaczek w Kaczym Bagnie" },
      { type: "text", text: "Piękno i radość zamknięte w prostocie. Wspólne pieczenie pierników, zabawy, rodzinny czas." },
      { type: "image", src: "/images/przeszly-1.jpg", alt: "Rodzinne warsztaty — wspólne chwile" },
      { type: "text", text: "Posiłki przygotowujemy na bazie naturalnych składników z naszego ogródka, jaj od naszych kur, świeżych produktów dostarczanych przez lokalnych wytwórców." },
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

export function getTripsByCategory(cat: Trip["category"]): Trip[] {
  return trips.filter((trip) => trip.category === cat);
}

export function getUpcomingTripsByCategory(cat: Trip["category"]): Trip[] {
  return trips.filter((trip) => !trip.isPast && trip.category === cat);
}
