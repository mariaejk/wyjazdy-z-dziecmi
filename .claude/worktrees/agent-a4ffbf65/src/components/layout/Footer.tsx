import Link from "next/link";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { Container } from "./Container";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { footerLegalLinks } from "@/data/navigation";
import { CONTACT, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-parchment-dark bg-parchment-dark">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-heading text-lg font-bold text-moss">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-2 text-sm text-graphite-light">
              Rodzinne wyjazdy warsztatowe w naturze.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-graphite">
              Kontakt
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-graphite">
              Social
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (otwiera się w nowej karcie)"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (otwiera się w nowej karcie)"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + Newsletter placeholder */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-graphite">
              Informacje
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite-light transition-colors hover:text-moss"
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
        <div className="mt-8 border-t border-parchment pt-6 text-center">
          <p className="text-xs text-graphite-light">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </Container>
    </footer>
  );
}
