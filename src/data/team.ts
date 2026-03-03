import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    name: "Maria Kordalewska",
    role: "Twórczyni projektu, nauczycielka jogi, organizatorka eventów",
    image: "/images/maria-2.jpg",
    bio: "Jestem mamą Laury, nauczycielką jogi i wieloletnią organizatorką eventów, która od ponad dekady łączy świat profesjonalnej komunikacji z miłością do podróży. Posiadam tytuł doktora nauk o mediach (Uniwersytet Warszawski), a moje doświadczenie zawodowe obejmuje zarówno pracę akademicką, jak i zarządzanie relacjami w dużych agencjach eventowych.\n\nProjekt „Wyjazdy z Dziećmi” powstał z mojej osobistej potrzeby spędzania z córką czasu, który jest naprawdę wartościowy. W świecie pełnym bodźców szukam miejsc w „bezinterneciu” i „bezzasięgowie”, gdzie pośród ciszy i natury możemy zbliżyć się do siebie samych. Zapraszam do współpracy najlepszych specjalistów od rozwoju, aby tworzyć spotkania, które – jak mówią uczestnicy – są „lepsze niż bajka”.",
  },
  {
    name: "Kamila Janczurewicz",
    role: "Konsultantka i terapeutka ajurwedyjska",
    image: "/images/kamila.jpg",
    bio: "Mama Gai i Niny, pasjonatka bliskiego kontaktu z naturą oraz holistycznego podejścia do zdrowia i życia. Konsultantka i terapeutka ajurwedyjska, wspierająca przede wszystkim kobiety wysoko wrażliwe w procesie odzyskiwania równowagi i wyciszenia układu nerwowego.\n\nKocha konie, ciszę lasu i przestrzeń, jaką daje przebywanie na łonie natury. Prowadzi również warsztaty w nurcie bliskości dla dzieci i rodziców, oparte na ciepłym i intuicyjnym dotyku, wspierając budowanie głębokiej więzi między dzieckiem a rodzicem.",
  },
];

export function getTeamMember(name: string): TeamMember | undefined {
  return teamMembers.find((m) => m.name === name);
}
