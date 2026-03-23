import Link from "next/link";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { Container } from "./Container";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { SocialLink } from "./SocialLink";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { footerLegalLinks } from "@/data/navigation";
import { CONTACT, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-moss text-parchment">
      <Container className="py-16 sm:py-20">
        {/* Brand tagline */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-light italic text-parchment sm:text-4xl">
            Warsztaty wyjazdowe z dziećmi.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-parchment/70">
            Wyjątkowe wyjazdy warsztatowe dla rodzin szukających bliskości, natury i regeneracji.
            Prowadzone z pasją i troską o każdego uczestnika.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-light italic text-parchment">
              Kontakt
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-sm text-parchment/70 transition-colors hover:text-parchment"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-parchment/70 transition-colors hover:text-parchment"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-lg font-light italic text-parchment">
              Znajdź nas
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.facebook}
                  platform="Facebook"
                  className="inline-flex items-center gap-2 text-sm text-parchment/70 transition-colors hover:text-parchment"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                  Facebook
                </SocialLink>
              </li>
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.instagram}
                  platform="Instagram"
                  className="inline-flex items-center gap-2 text-sm text-parchment/70 transition-colors hover:text-parchment"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  Instagram
                </SocialLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg font-light italic text-parchment">
              Informacje
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-parchment/70 transition-colors hover:text-parchment"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterForm />

        {/* Copyright */}
        <div className="mt-8 border-t border-parchment/20 pt-6 text-center">
          <p className="text-xs text-parchment/50">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </Container>
    </footer>
  );
}
