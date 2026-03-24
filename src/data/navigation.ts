import { ROUTES } from "@/lib/constants";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  {
    label: "Warsztaty",
    href: "",
    children: [
      { label: "Wszystkie warsztaty", href: ROUTES.trips },
      { label: "Warsztaty z dziećmi", href: ROUTES.familyTrips },
      { label: "Matka i córka", href: ROUTES.motherDaughter },
      { label: "Single z dziećmi", href: ROUTES.singleParents },
      { label: "Dla dorosłych", href: ROUTES.adultOnly },
    ],
  },
  {
    label: "Poznajmy się",
    href: "",
    children: [
      { label: "O nas", href: ROUTES.about },
      { label: "Galeria", href: ROUTES.gallery },
      { label: "Opinie", href: ROUTES.opinions },
      { label: "Moje inne projekty", href: ROUTES.projects },
    ],
  },
  { label: "Blog", href: ROUTES.blog },
  { label: "Kontakt", href: ROUTES.contact },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Regulamin", href: ROUTES.terms },
  { label: "Polityka prywatności", href: ROUTES.privacy },
];
