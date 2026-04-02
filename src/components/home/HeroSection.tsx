"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        className="relative h-[70svh] overflow-hidden sm:h-[80svh]"
      >
        {/* Full-bleed slideshow background */}
        <HeroSlideshow />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/40 to-graphite/10" />

        {/* Content overlaid at bottom */}
        <Container className="relative z-10 flex h-full flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
          {/* H1 = SEO descriptive keyword-rich, styled as overline.
              H2 = emotional headline for users. Intentional hierarchy inversion for SEO. */}
          <h1 className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 sm:text-[11px]">
            Rodzinne wyjazdy warsztatowe w naturze
          </h1>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl font-light italic text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            „Świadomy kierunek — warsztaty rozwojowe dla{" "}
            <span className="relative inline-block"><em className="italic text-white/90">dorosłych i dzieci</em><svg className="mx-auto mt-0.5 h-[5px] w-[95%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" /></svg></span>"
          </h2>
          <div className="mt-8">
            <Button href="/wyjazdy" size="lg">
              Zobacz warsztaty
            </Button>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
          <ChevronDown className="h-6 w-6 text-white/40" strokeWidth={1.5} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative h-[70svh] overflow-hidden sm:h-[80svh]"
    >
      {/* Full-bleed slideshow background */}
      <HeroSlideshow />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/40 to-graphite/10" />

      {/* Content overlaid at bottom */}
      <Container className="relative z-10 flex h-full flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
        {/* H1 — SEO descriptive overline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 sm:text-[11px]"
        >
          Rodzinne wyjazdy warsztatowe w naturze
        </motion.h1>

        {/* H2 — emotional headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-4 max-w-3xl font-heading text-3xl font-light italic text-white sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          „Świadomy kierunek — warsztaty rozwojowe dla{" "}
          <span className="relative inline-block"><em className="italic text-white/90">dorosłych i dzieci</em><svg className="mx-auto mt-0.5 h-[5px] w-[95%]" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" /></svg></span>"
        </motion.h2>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Button href="/wyjazdy" size="lg">
            Zobacz warsztaty
          </Button>
        </motion.div>
      </Container>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6 text-white/40" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
