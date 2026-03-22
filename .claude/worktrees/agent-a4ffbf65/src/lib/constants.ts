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

export const ROUTES = {
  home: "/",
  about: "/o-nas",
  trips: "/wyjazdy",
  singleParents: "/single-parents",
  opinions: "/opinie",
  contact: "/kontakt",
  terms: "/regulamin",
  privacy: "/polityka-prywatnosci",
} as const;
