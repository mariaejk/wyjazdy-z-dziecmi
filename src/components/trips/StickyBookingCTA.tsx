"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function StickyBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVisibleRef = useRef(true);
  const formVisibleRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const formEl = document.getElementById("formularz");
    if (!heroEl) return;

    function update() {
      const shouldShow = !heroVisibleRef.current && !formVisibleRef.current;
      setIsVisible(shouldShow);
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formVisibleRef.current = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );

    heroObserver.observe(heroEl);
    if (formEl) formObserver.observe(formEl);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  // Set inert attribute to prevent keyboard focus when hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isVisible) {
      el.removeAttribute("inert");
    } else {
      el.setAttribute("inert", "");
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 border-t border-parchment-dark bg-parchment/95 px-4 py-3 backdrop-blur-sm md:hidden",
        !prefersReducedMotion && "transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!isVisible}
    >
      <Button href="#formularz" className="w-full">
        Zapisz si\u0119 na wyjazd
      </Button>
    </div>
  );
}
