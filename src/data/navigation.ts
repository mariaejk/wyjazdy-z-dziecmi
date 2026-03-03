import { ROUTES } from "@/lib/constants";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNavigation: NavItem[] = [
  { label: "O mnie", href: ROUTES.about },
  { label: "Wyjazdy", href: ROUTES.trips },
  { label: "Single Parents", href: ROUTES.singleParents },
  { label: "Opinie", href: ROUTES.opinions },
  { label: "Kontakt", href: ROUTES.contact },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Regulamin", href: ROUTES.terms },
  { label: "Polityka prywatności", href: ROUTES.privacy },
];
