import type { Place } from "@/types/place";

export const places: Place[] = [
  {
    name: "Kacze Bagno",
    description:
      "Miejsce wyj\u0105tkowe. Ka\u017Cdy, kto go do\u015Bwiadczy\u0142, potwierdzi, \u017Ce zakl\u0119ty w nim jest pewien rodzaj magii. Ka\u017Cdy dzie\u0144 w tej wyj\u0105tkowej przestrzeni napawa moc\u0105, podnosi wibracje, koi i uspokaja.\n\nEko-Domki budowane ze s\u0142omy i gliny przynosz\u0105 g\u0142\u0119boki sen, ogr\u00F3d permakulturowy karmi przez ca\u0142y rok, a szcz\u0119\u015Bliwe kurki dbaj\u0105 o smak porannej jajecznicy. Do tego du\u017Ce przestrzenie warsztatowe, pracownia ceramiczna, sauna, balia daj\u0105 wiele opcji do sp\u0119dzenia kreatywnego, ale i pe\u0142nego relaksu czasu. Kacze Bagno \u2014 miejsce inicjatyw pozytywnych \u2014 to przestrze\u0144 edukacyjna, kt\u00F3ra od 20 lat wychowuje dzieci i m\u0142odzie\u017C zaszczepiaj\u0105c w nich warto\u015Bci.",
    features: [
      "Eko-domki ze s\u0142omy i gliny",
      "Ogr\u00F3d permakulturowy",
      "Pracownia ceramiczna",
      "Sauna i balia",
      "Du\u017Ce przestrzenie warsztatowe",
    ],
  },
  {
    name: "Sasek",
    description:
      "Jedyne w swoim rodzaju miejsce na Mazurach po\u0142o\u017Cone nad brzegiem jeziora, otoczone lasami, z kilkudziesi\u0119cioma mieszka\u0144cami oraz licznym stadem koni. Miejsce znane i uznane w \u201Eko\u0144skim\u201D \u015Bwiecie, idealne na wypoczynek dla rodzin, z dala od zgie\u0142ku miasta.\n\nCzyste jezioro z piaszczyst\u0105 pla\u017C\u0105, las, padoki i \u0142\u0105ki, a tak\u017Ce profesjonalna infrastruktura do jazdy konnej: kryta uje\u017Cd\u017Calnia, parkur, olbrzymie tereny do jazdy konnej.",
    features: [
      "Jezioro z piaszczyst\u0105 pla\u017C\u0105",
      "Kryta uje\u017Cd\u017Calnia",
      "Stado koni",
      "Las i \u0142\u0105ki",
      "Parkur",
    ],
  },
];

export function getPlace(name: string): Place | undefined {
  return places.find((p) => p.name === name);
}
