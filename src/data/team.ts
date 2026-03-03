import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    name: "Maria Kordalewska",
    role: "Organizatorka, nauczycielka jogi, pilotka wycieczek",
    image: "/images/maria.jpg",
    bio: "Wieloletnia organizatorka wyjazd\u00F3w i event\u00F3w, pilotka wycieczek, specjalistka od komunikacji, wyk\u0142adowca uniwersytecki z tytu\u0142em doktora nauk o mediach, nauczycielka jogi i mama Laury.\n\nKocha podr\u00F3\u017Ce, ale coraz cz\u0119\u015Bciej wraca do miejsc, gdzie czuje spok\u00F3j. To tam odnajduje, to za czym tak bardzo t\u0119sknimy. Po\u015Br\u00F3d ciszy, w \u201Ebezinterneciu\u201D i w \u201Ebezzasi\u0119gowie\u201D organizuje spotkania dla doros\u0142ych i dzieci, kt\u00F3re przybli\u017Caj\u0105 ich do nich samych. Zaprasza do wsp\u00F3\u0142pracy najlepszych specjalist\u00F3w z tzw. rozwoju, tworz\u0105c niepowtarzalne spotkania.",
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
