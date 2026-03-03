import { ROUTES } from "@/lib/constants";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavItem[] = [
  { label: "O mnie", href: ROUTES.about },
  { label: "Matka z córką", href: ROUTES.motherDaughter },
  { label: "Wyjazd z dziećmi", href: ROUTES.familyTrips },
  { label: "Wyjazdy", href: ROUTES.trips },
  { label: "Galeria", href: ROUTES.gallery },
  { label: "Blog", href: ROUTES.blog },
  { label: "Opinie", href: ROUTES.opinions },
  { label: "Kontakt", href: ROUTES.contact },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Regulamin", href: ROUTES.terms },
  { label: "Polityka prywatności", href: ROUTES.privacy },
];
