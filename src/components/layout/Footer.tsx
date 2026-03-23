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
    <footer className="border-t border-graphite/5 bg-parchment-dark">
      <Container className="py-16 sm:py-20 lg:py-24">
        {/* Centered editorial heading */}
        <h2 className="mb-12 text-center font-heading text-3xl font-light italic text-graphite sm:text-4xl">
          {SITE_CONFIG.name}
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-graphite-light">
              Kontakt
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-graphite"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-graphite"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-graphite-light">
              Znajdź nas
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.facebook}
                  platform="Facebook"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-graphite"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                  Facebook
                </SocialLink>
              </li>
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.instagram}
                  platform="Instagram"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-graphite"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  Instagram
                </SocialLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-graphite-light">
              Informacje
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite-light transition-colors hover:text-graphite"
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
        <div className="mt-10 border-t border-graphite/5 pt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-graphite-light">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </Container>
    </footer>
  );
}
