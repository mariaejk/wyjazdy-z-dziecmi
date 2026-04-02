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

// Public site key — safe to hardcode (not a secret).
// CF Workers + @opennextjs/cloudflare don't inline NEXT_PUBLIC_* env vars into client bundles,
// so we hardcode it here instead of relying on process.env.
export const TURNSTILE_SITE_KEY = "0x4AAAAAACy69qw2BYCWGuia";

export const ALLOWED_ORIGINS = [
  "https://www.wyjazdyzdziecmi.pl",
  "https://wyjazdyzdziecmi.pl",
  "https://wyjazdy-z-dziecmi.maria-kordalewska.workers.dev",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
  // Vercel fallback (kept for dual-deployment transition period)
  ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
    : []),
];

export const ROUTES = {
  home: "/",
  about: "/o-nas",
  motherDaughter: "/matka-z-corka",
  familyTrips: "/warsztaty-z-dziecmi",
  singleParents: "/single-z-dziecmi",
  adultOnly: "/dla-doroslych",
  trips: "/wyjazdy",
  gallery: "/galeria",
  blog: "/blog",
  opinions: "/opinie",
  contact: "/kontakt",
  terms: "/regulamin",
  projects: "/inne-projekty",
  privacy: "/polityka-prywatnosci",
} as const;
