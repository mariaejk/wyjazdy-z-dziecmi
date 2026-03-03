"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";
import { mainNavigation } from "@/data/navigation";
import { ROUTES, CONTACT } from "@/lib/constants";
import { analytics } from "@/lib/analytics";
import { cn, isNavActive } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-parchment-dark bg-parchment/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Wyjazdy z Dzie\u0107mi"
              width={56}
              height={56}
              className="rounded-full"
              priority
            />
            <span className="font-heading text-lg font-bold text-moss sm:text-xl">
              Wyjazdy z Dzie\u0107mi
            </span>
          </Link>

          {/* Right side: nav + phone + CTA + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav aria-label="Nawigacja g\u0142\u00F3wna" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {mainNavigation.map((item) => {
                  const active = isNavActive(item.href, pathname);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-moss/10 text-moss"
                            : "text-graphite hover:bg-parchment-dark hover:text-moss",
                        )}
                        {...(active ? { "aria-current": "page" as const } : {})}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Phone — visible lg+ */}
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-graphite transition-colors hover:bg-parchment-dark hover:text-moss lg:inline-flex"
              aria-label={`Zadzwo\u0144: ${CONTACT.phoneDisplay}`}
              onClick={() => analytics.phoneClick()}
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* CTA — visible md+ */}
            <div className="hidden md:block">
              <Button href={ROUTES.trips} size="sm">
                Zarezerwuj
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Otw\u00F3rz menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
