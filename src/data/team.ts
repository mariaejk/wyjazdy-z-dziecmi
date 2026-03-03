import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    name: "Maria Kordalewska",
    role: "Tw\u00F3rczyni projektu, nauczycielka jogi, organizatorka event\u00F3w",
    image: "/images/maria.jpg",
    bio: "Jestem mam\u0105 Laury, nauczycielk\u0105 jogi i wieloletni\u0105 organizatork\u0105 event\u00F3w, kt\u00F3ra od ponad dekady \u0142\u0105czy \u015Bwiat profesjonalnej komunikacji z mi\u0142o\u015Bci\u0105 do podr\u00F3\u017Cy. Posiadam tytu\u0142 doktora nauk o mediach (Uniwersytet Warszawski), a moje do\u015Bwiadczenie zawodowe obejmuje zar\u00F3wno prac\u0119 akademick\u0105, jak i zarz\u0105dzanie relacjami w du\u017Cych agencjach eventowych.\n\nProjekt \u201EWyjazdy z Dzie\u0107mi\u201D zrodzi\u0142 si\u0119 z mojej osobistej potrzeby sp\u0119dzania z c\u00F3rk\u0105 czasu, kt\u00F3ry jest naprawd\u0119 warto\u015Bciowy. W \u015Bwiecie pe\u0142nym bod\u017Ac\u00F3w szukam miejsc w \u201Ebezinterneciu\u201D i \u201Ebezzasi\u0119gowie\u201D, gdzie po\u015Br\u00F3d ciszy i natury mo\u017Cemy zbli\u017Cy\u0107 si\u0119 do siebie samych. Zapraszam do wsp\u00F3\u0142pracy najlepszych specjalist\u00F3w od rozwoju, aby tworzy\u0107 spotkania, kt\u00F3re \u2013 jak m\u00F3wi\u0105 uczestnicy \u2013 s\u0105 \u201Elepsze ni\u017C bajka\u201D.",
  },
  {
    name: "Kamila Janczurewicz",
    role: "Konsultantka i terapeutka ajurwedyjska",
    image: "/images/kamila.jpg",
    bio: "Mama Gai i Niny, pasjonatka bliskiego kontaktu z natur\u0105 oraz holistycznego podej\u015Bcia do zdrowia i \u017Cycia. Konsultantka i terapeutka ajurwedyjska, wspieraj\u0105ca przede wszystkim kobiety wysoko wra\u017Cliwe w procesie odzyskiwania r\u00F3wnowagi i wyciszenia uk\u0142adu nerwowego.\n\nKocha konie, cisz\u0119 lasu i przestrze\u0144, jak\u0105 daje przebywanie na \u0142onie natury. Prowadzi r\u00F3wnie\u017C warsztaty w nurcie blisko\u015Bci dla dzieci i rodzic\u00F3w, oparte na ciep\u0142ym i intuicyjnym dotyku, wspieraj\u0105c budowanie g\u0142\u0119bokiej wi\u0119zi mi\u0119dzy dzieckiem a rodzicem.",
  },
];

export function getTeamMember(name: string): TeamMember | undefined {
  return teamMembers.find((m) => m.name === name);
}
