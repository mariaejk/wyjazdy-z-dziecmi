"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { mainNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { cn, isNavActive } from "@/lib/utils";

function MobileNavLinks({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <nav aria-label="Menu mobilne" className="flex-1 px-4">
      <ul className="flex flex-col gap-1">
        {mainNavigation.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItem === item.label;

          if (hasChildren) {
            const childActive = item.children!.some((child) =>
              isNavActive(child.href, pathname)
            );
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedItem(isExpanded ? null : item.label)
                  }
                  className={cn(
                    "flex w-full items-center justify-between rounded-none px-3 py-3 text-base font-medium transition-colors",
                    childActive
                      ? "bg-moss/10 text-moss"
                      : "text-graphite hover:bg-parchment-dark hover:text-moss"
                  )}
                  aria-expanded={isExpanded}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                {isExpanded && (
                  <ul className="ml-4 flex flex-col gap-1 border-l-2 border-parchment-dark pl-2">
                    {item.children!.map((child) => {
                      const active = isNavActive(child.href, pathname);
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "block rounded-none px-3 py-2.5 text-sm font-medium transition-colors",
                              active
                                ? "bg-moss/10 text-moss"
                                : "text-graphite hover:bg-parchment-dark hover:text-moss"
                            )}
                            {...(active
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

          const active = isNavActive(item.href, pathname);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "block rounded-none px-3 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-moss/10 text-moss"
                    : "text-graphite hover:bg-parchment-dark hover:text-moss"
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
  );
}

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  // Focus trap + Escape handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !menuRef.current) return;

      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    // Lock body scroll
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-graphite/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu nawigacyjne"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-parchment shadow-xl"
          >
            {/* Close button */}
            <div className="flex items-center justify-end px-4 py-4 pt-[env(safe-area-inset-top,16px)]">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-none p-2.5 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss min-h-11 min-w-11"
                aria-label="Zamknij menu"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation links */}
            <MobileNavLinks pathname={pathname} onClose={onClose} />

            {/* CTA */}
            <div className="mt-6 px-7" onClick={onClose}>
              <Button href={ROUTES.trips} className="w-full">
                Sprawdź terminy
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
