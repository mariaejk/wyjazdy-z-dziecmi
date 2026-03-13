import { ROUTES } from "@/lib/constants";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavItem[] = [
  { label: "O nas", href: ROUTES.about },
  { label: "Wszystkie warsztaty", href: ROUTES.trips },
  { label: "Warsztaty z dziećmi", href: ROUTES.familyTrips },
  { label: "Matka i córka", href: ROUTES.motherDaughter },
  { label: "Single parents", href: ROUTES.singleParents },
  { label: "Dla dorosłych", href: ROUTES.adultOnly },
  { label: "Galeria", href: ROUTES.gallery },
  { label: "Opinie", href: ROUTES.opinions },
  { label: "Kontakt", href: ROUTES.contact },
  { label: "Blog", href: ROUTES.blog },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Regulamin", href: ROUTES.terms },
  { label: "Polityka prywatności", href: ROUTES.privacy },
];
