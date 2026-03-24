export const SITE_CONFIG = {
  name: "Wyjazdy z Dziećmi",
  description:
    "Rodzinne wyjazdy warsztatowe w naturze — joga, taniec, ceramika, konie.",
  url: "https://www.wyjazdyzdziecmi.pl",
  locale: "pl_PL",
  language: "pl",
} as const;

export const CONTACT = {
  email: "wyjazdyzdziecmi@gmail.com",
  phone: "+48 503 098 906",
  phoneDisplay: "503 098 906",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/wyjazdyzdziecmi",
  instagram: "https://www.instagram.com/wyjazdyzdziecmi",
} as const;

export const ALLOWED_ORIGINS = [
  "https://www.wyjazdyzdziecmi.pl",
  "https://wyjazdyzdziecmi.pl",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
];

export const ROUTES = {
  home: "/",
  about: "/o-nas",
  motherDaughter: "/matka-z-corka",
  familyTrips: "/wyjazd-z-dziecmi",
  singleParents: "/single-parents",
  adultOnly: "/dla-doroslych",
  trips: "/wyjazdy",
  gallery: "/galeria",
  blog: "/blog",
  opinions: "/opinie",
  contact: "/kontakt",
  terms: "/regulamin",
  projects: "/moje-projekty",
  privacy: "/polityka-prywatnosci",
} as const;
