"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { mainNavigation } from "@/data/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
            transition={{ duration: 0.2 }}
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-parchment shadow-xl"
          >
            {/* Close button */}
            <div className="flex items-center justify-end px-4 py-4">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md p-2 text-graphite transition-colors hover:bg-parchment-dark hover:text-moss"
                aria-label="Zamknij menu"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation links */}
            <nav aria-label="Menu mobilne" className="flex-1 px-4">
              <ul className="flex flex-col gap-1">
                {mainNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-md px-3 py-3 text-base font-medium text-graphite transition-colors hover:bg-parchment-dark hover:text-moss"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
