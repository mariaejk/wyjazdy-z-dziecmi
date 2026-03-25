import Link from "next/link";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { Container } from "./Container";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { SocialLink } from "./SocialLink";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { FooterNewsletter } from "@/components/shared/FooterNewsletter";
import { footerLegalLinks } from "@/data/navigation";
import { CONTACT, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-graphite/10 bg-parchment">
      <Container className="py-8 sm:py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-light italic text-graphite">
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
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
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
            <h3 className="font-heading text-lg font-light italic text-graphite">
              Znajdź nas
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.facebook}
                  platform="Facebook"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                  Facebook
                </SocialLink>
              </li>
              <li>
                <SocialLink
                  href={SOCIAL_LINKS.instagram}
                  platform="Instagram"
                  className="inline-flex items-center gap-2 text-sm text-graphite-light transition-colors hover:text-moss"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  Instagram
                </SocialLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg font-light italic text-graphite">
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

        {/* PDF + Newsletter side by side */}
        <div className="mt-10 grid gap-6 border-t border-parchment pt-8 lg:grid-cols-2">
          {/* Left: PDF download */}
          <div>
            <NewsletterForm />
          </div>

          {/* Right: Newsletter signup (dark bg) */}
          <FooterNewsletter />
        </div>

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
