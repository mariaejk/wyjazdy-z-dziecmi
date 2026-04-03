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
          <h1 className="max-w-3xl font-heading text-3xl font-light italic text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Świadomy kierunek — warsztaty rozwojowe dla dorosłych i dzieci
          </h1>
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
        {/* H1 — headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-3xl font-heading text-3xl font-light italic text-white sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          Świadomy kierunek — warsztaty rozwojowe dla dorosłych i dzieci
        </motion.h1>

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
