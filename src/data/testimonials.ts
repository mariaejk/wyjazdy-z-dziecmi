import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "ania",
    quote:
      "Wyjazd \u201EWsp\u00F3lny Rytm\u201D w Kaczem Bagnie by\u0142 dla nas momentem prawdziwego zatrzymania. Moja c\u00F3rka po raz pierwszy poczu\u0142a si\u0119 cz\u0119\u015Bci\u0105 kr\u0119gu kobiet \u2014 wa\u017Cna i widziana. Weekend w \u201Ebezzasi\u0119gowiu\u201D, wype\u0142niony ta\u0144cem i jog\u0105, da\u0142 nam blisko\u015B\u0107, kt\u00F3rej nie potrafi\u0142y\u015Bmy odnale\u017A\u0107 w codziennym p\u0119dzie. To by\u0142o naprawd\u0119 lepsze ni\u017C niejedna bajka!",
    author: "Ania",
    context: "mama 7-letniej Zuzi",
    trip: "Matka i C\u00F3rka",
  },
  {
    id: "katarzyna",
    quote:
      "Najbardziej ba\u0142am si\u0119 braku zasi\u0119gu, a okaza\u0142 si\u0119 on najwi\u0119kszym luksusem. Maria wybiera miejsca, kt\u00F3re koj\u0105 samym wygl\u0105dem. Joga o poranku, zapach lasu w Sasku i wsp\u00F3lne wieczory przy ognisku sprawi\u0142y, \u017Ce pierwszy raz od lat naprawd\u0119 odpocz\u0119\u0142am, a dzieci ani razu nie zapyta\u0142y o tablet. Wr\u00F3ci\u0142y\u015Bmy z now\u0105 energi\u0105.",
    author: "Katarzyna",
    context: "uczestniczka wyjazdu z jog\u0105 i ko\u0144mi",
    trip: "Yoga i Konie",
  },
  {
    id: "malgorzata",
    quote:
      "Swojski klimat, niesamowite jedzenie i poczucie, \u017Ce jeste\u015Bmy w pe\u0142ni zaopiekowani. Maria i wsp\u00F3\u0142pracuj\u0105ce z ni\u0105 terapeutki tworz\u0105 przestrze\u0144, w kt\u00F3rej nie trzeba nic udowadnia\u0107. Dzieciaki by\u0142y zachwycone warsztatami ceramicznymi i blisko\u015Bci\u0105 natury. To miejsce ma dusz\u0119, kt\u00F3rej mog\u0105 pozazdro\u015Bci\u0107 najdro\u017Csze hotele.",
    author: "Ma\u0142gorzata",
    context: "mama Gai i Leona",
  },
  {
    id: "marta",
    quote:
      "Warsztaty Marii to nie jest zwyk\u0142y urlop. To podr\u00F3\u017C w g\u0142\u0105b siebie i swojej relacji z dzieckiem. Profesjonalizm po\u0142\u0105czony z ogromn\u0105 empati\u0105 i spokojem. Wr\u00F3cili\u015Bmy bogatsi o wsp\u00F3lne rytua\u0142y, kt\u00F3re piel\u0119gnujemy w domu ka\u017Cdego dnia.",
    author: "Marta",
    context: "uczestniczka warsztat\u00F3w rozwojowych",
  },
];

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getFeaturedTestimonials(ids: string[]): Testimonial[] {
  return ids
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t): t is Testimonial => t !== undefined);
}
