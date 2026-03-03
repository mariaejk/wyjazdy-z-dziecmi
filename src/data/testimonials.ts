import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "ania",
    quote:
      "Wyjazd „Wspólny Rytm” w Kaczem Bagnie był dla nas momentem prawdziwego zatrzymania. Moja córka po raz pierwszy poczuła się częścią kręgu kobiet — ważna i widziana. Weekend w „bezzasięgowiu”, wypełniony tańcem i jogą, dał nam bliskość, której nie potrafiłyśmy odnaleźć w codziennym pędzie. To było naprawdę lepsze niż niejedna bajka!",
    author: "Ania",
    context: "mama 7-letniej Zuzi",
    trip: "Matka i Córka",
  },
  {
    id: "katarzyna",
    quote:
      "Najbardziej bałam się braku zasięgu, a okazał się on największym luksusem. Maria wybiera miejsca, które koją samym wyglądem. Joga o poranku, zapach lasu w Sasku i wspólne wieczory przy ognisku sprawiły, że pierwszy raz od lat naprawdę odpoczęłam, a dzieci ani razu nie zapytały o tablet. Wróciłyśmy z nową energią.",
    author: "Katarzyna",
    context: "uczestniczka wyjazdu z jogą i końmi",
    trip: "Yoga i Konie",
  },
  {
    id: "malgorzata",
    quote:
      "Swojski klimat, niesamowite jedzenie i poczucie, że jesteśmy w pełni zaopiekowani. Maria i współpracujące z nią terapeutki tworzą przestrzeń, w której nie trzeba nic udowadniać. Dzieciaki były zachwycone warsztatami ceramicznymi i bliskością natury. To miejsce ma duszę, której mogą pozazdrościć najdroższe hotele.",
    author: "Małgorzata",
    context: "mama Gai i Leona",
  },
  {
    id: "marta",
    quote:
      "Warsztaty Marii to nie jest zwykły urlop. To podróż w głąb siebie i swojej relacji z dzieckiem. Profesjonalizm połączony z ogromną empatią i spokojem. Wróciliśmy bogatsi o wspólne rytuały, które pielęgnujemy w domu każdego dnia.",
    author: "Marta",
    context: "uczestniczka warsztatów rozwojowych",
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
