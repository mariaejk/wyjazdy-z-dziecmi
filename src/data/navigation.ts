import { ROUTES } from "@/lib/constants";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const mainNavigation: NavItem[] = [
  { label: "Wszystkie warsztaty", href: ROUTES.trips },
  { label: "Warsztaty z dziećmi", href: ROUTES.familyTrips },
  { label: "Matka i córka", href: ROUTES.motherDaughter },
  { label: "Single parents", href: ROUTES.singleParents },
  { label: "Dla dorosłych", href: ROUTES.adultOnly },
  {
    label: "O nas",
    href: ROUTES.about,
    children: [
      { label: "Galeria", href: ROUTES.gallery },
      { label: "Opinie", href: ROUTES.opinions },
      { label: "Kontakt", href: ROUTES.contact },
      { label: "Blog", href: ROUTES.blog },
    ],
  },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Regulamin", href: ROUTES.terms },
  { label: "Polityka prywatności", href: ROUTES.privacy },
];
