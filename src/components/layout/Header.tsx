"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";
import { mainNavigation } from "@/data/navigation";
import type { NavItem } from "@/data/navigation";
import { ROUTES, CONTACT } from "@/lib/constants";
import { analytics } from "@/lib/analytics";
import { cn, isNavActive } from "@/lib/utils";

function DropdownNavItem({
  item,
  pathname,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = item.children?.some((child) =>
    isNavActive(child.href, pathname)
  );

  const openDropdown = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  }, [onOpen]);

  const closeDropdown = useCallback(() => {
    timeoutRef.current = setTimeout(() => onClose(), 150);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <li
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md px-4 py-2.5 text-base font-medium transition-colors",
          active
            ? "bg-moss/10 text-moss"
            : "text-graphite hover:bg-parchment-dark hover:text-moss"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={openDropdown}
      >
        <span className="uppercase tracking-wide">{item.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-parchment-dark bg-parchment py-1 shadow-lg"
          role="menu"
        >
          {item.children?.map((child) => {
            const childActive = isNavActive(child.href, pathname);
            return (
              <li key={child.href} role="none">
                <Link
                  href={child.href}
                  role="menuitem"
                  className={cn(
                    "block px-4 py-2 text-sm font-medium transition-colors",
                    childActive
                      ? "bg-moss/10 text-moss"
                      : "text-graphite hover:bg-parchment-dark hover:text-moss"
                  )}
                  {...(childActive
                    ? { "aria-current": "page" as const }
                    : {})}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-parchment-dark bg-parchment/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href={ROUTES.home} className="group flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Wyjazdy z Dziećmi"
              width={80}
              height={80}
              className="rounded-full"
              priority
            />
          </Link>

          {/* Right side: nav + phone + CTA + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav aria-label="Nawigacja główna" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNavigation.map((item) => {
                  if (item.children) {
                    return (
                      <DropdownNavItem
                        key={item.label}
                        item={item}
                        pathname={pathname}
                        isOpen={openDropdown === item.label}
                        onOpen={() => setOpenDropdown(item.label)}
                        onClose={() => setOpenDropdown(null)}
                      />
                    );
                  }
                  const active = isNavActive(item.href, pathname);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-base font-medium uppercase tracking-wide transition-colors",
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
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-graphite transition-colors hover:bg-parchment-dark hover:text-moss lg:inline-flex"
              aria-label={`Zadzwoń: ${CONTACT.phoneDisplay}`}
              onClick={() => analytics.phoneClick()}
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span>{CONTACT.phoneDisplay}</span>
            </a>

            {/* CTA — visible lg+ */}
            <div className="hidden lg:block">
              <Button href={ROUTES.trips} size="md" className="whitespace-nowrap">
                Sprawdź terminy
              </Button>
            </div>

            {/* Phone icon — visible on mobile only */}
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss lg:hidden"
              aria-label={`Zadzwoń: ${CONTACT.phoneDisplay}`}
              onClick={() => analytics.phoneClick()}
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Otwórz menu"
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
