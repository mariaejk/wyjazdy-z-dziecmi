"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { mainNavigation } from "@/data/navigation";
import { ROUTES } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-parchment-dark bg-parchment/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Wyjazdy z Dziećmi"
              width={56}
              height={56}
              className="rounded-full"
              priority
            />
            <span className="font-heading text-lg font-bold text-moss sm:text-xl">
              Wyjazdy z Dziećmi
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Nawigacja główna" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-graphite transition-colors hover:bg-parchment-dark hover:text-moss"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Otwórz menu"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
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
