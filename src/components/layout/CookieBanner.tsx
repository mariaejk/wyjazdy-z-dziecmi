"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const {
    isLoaded,
    showBanner,
    acceptAll,
    acceptNecessaryOnly,
    saveCustom,
  } = useCookieConsent();

  const [showPanel, setShowPanel] = useState(false);
  // openedFromFooter tracks when user opens settings from the footer link
  const [openedFromFooter, setOpenedFromFooter] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Listen for footer "Ustawienia cookies" button
  useEffect(() => {
    const handleOpenSettings = () => {
      setOpenedFromFooter(true);
      setShowPanel(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const isVisible = showBanner || openedFromFooter;

  // Escape closes panel or banner (when opened from footer)
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPanel) {
          setShowPanel(false);
        } else if (openedFromFooter) {
          setOpenedFromFooter(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, showPanel, openedFromFooter]);

  // Focus management: move focus into panel when "Dostosuj" is clicked
  useEffect(() => {
    if (showPanel && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector<HTMLElement>(
        "button, input, [tabindex]:not([tabindex=\"-1\"])",
      );
      firstFocusable?.focus();
    }
  }, [showPanel]);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setOpenedFromFooter(false);
    setShowPanel(false);
  }, [acceptAll]);

  const handleAcceptNecessary = useCallback(() => {
    acceptNecessaryOnly();
    setOpenedFromFooter(false);
    setShowPanel(false);
  }, [acceptNecessaryOnly]);

  const handleSaveCustom = useCallback(() => {
    saveCustom(analyticsChecked, marketingChecked);
    setOpenedFromFooter(false);
    setShowPanel(false);
  }, [saveCustom, analyticsChecked, marketingChecked]);

  if (!isLoaded || !isVisible) return null;

  // All 3 buttons share the same base style for equal visual weight (RODO/ePrivacy 2026)
  const buttonBase =
    "w-full rounded-none border border-moss px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto";

  return (
    <div
      role="dialog"
      aria-label="Ustawienia plików cookies"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-graphite/10 bg-white p-4 shadow-lg sm:p-6"
    >
      <div className="mx-auto max-w-4xl">
        {!showPanel ? (
          <>
            <p className="text-sm leading-relaxed text-graphite">
              Używamy plików cookies, aby zapewnić prawidłowe działanie strony.
              Możesz zaakceptować wszystkie cookies, wybrać tylko niezbędne lub
              dostosować swoje preferencje.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={handleAcceptAll}
                className={cn(buttonBase, "bg-moss text-white hover:bg-moss-dark")}
              >
                Zaakceptuj wszystkie
              </button>
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className={cn(buttonBase, "bg-white text-moss hover:bg-parchment-dark")}
              >
                Tylko niezbędne
              </button>
              <button
                type="button"
                onClick={() => setShowPanel(true)}
                className={cn(buttonBase, "bg-white text-moss hover:bg-parchment-dark")}
              >
                Dostosuj
              </button>
            </div>
          </>
        ) : (
          <div ref={panelRef}>
            <h2 className="font-heading text-lg font-bold text-graphite">
              Ustawienia cookies
            </h2>
            <p className="mt-2 text-sm text-graphite-light">
              Wybierz, które kategorie plików cookies chcesz włączyć.
            </p>

            <div className="mt-4 space-y-3">
              {/* Necessary — always on */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="h-4 w-4 rounded border-graphite/20 text-moss"
                />
                <span className="text-sm text-graphite">
                  <strong>Niezbędne</strong>{" "}
                  <span className="text-graphite-light">
                    — wymagane do działania strony
                  </span>
                </span>
              </label>

              {/* Analytics */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={analyticsChecked}
                  onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  className="h-4 w-4 rounded border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
                />
                <span className="text-sm text-graphite">
                  <strong>Analityczne</strong>{" "}
                  <span className="text-graphite-light">
                    — pomagają nam zrozumieć, jak korzystasz ze strony
                  </span>
                </span>
              </label>

              {/* Marketing */}
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="h-4 w-4 rounded border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
                />
                <span className="text-sm text-graphite">
                  <strong>Marketingowe</strong>{" "}
                  <span className="text-graphite-light">
                    — umożliwiają personalizację treści
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={handleSaveCustom}
                className={cn(buttonBase, "bg-moss text-white hover:bg-moss-dark")}
              >
                Zapisz ustawienia
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={cn(buttonBase, "bg-white text-moss hover:bg-parchment-dark")}
              >
                Zaakceptuj wszystkie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
