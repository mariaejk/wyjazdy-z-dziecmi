"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";

const benefits = [
  "Miejsca w otoczeniu natury",
  "Warsztaty budujące więź",
  "Atrakcje lepsze od bajki",
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section id="hero" className="bg-parchment">
        <Container className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-28">
          {/* H1 — SEO overline */}
          <h1 className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-graphite-light">
            Rodzinne wyjazdy warsztatowe w naturze
          </h1>

          {/* H2 — emotional, TCW style with italic */}
          <h2 className="mx-auto max-w-4xl font-heading text-3xl font-light leading-tight text-graphite sm:text-4xl md:text-5xl lg:text-6xl">
            Ty się regenerujesz. Twoje dziecko się{" "}
            <em className="italic text-graphite-light">bawi</em>.{" "}
            Razem tworzycie wspomnienia{" "}
            <em className="italic text-graphite-light">na całe życie</em>.
          </h2>

          {/* Large image */}
          <div className="relative mt-12 w-full max-w-5xl overflow-hidden sm:mt-16">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <HeroSlideshow />
            </div>
          </div>

          {/* Minimal benefits */}
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12 md:gap-16">
            {benefits.map((text) => (
              <p
                key={text}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-graphite-light"
              >
                {text}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Button href="/wyjazdy" size="lg">
              Zobacz wyjazdy
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="hero" className="bg-parchment">
      <Container className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-28">
        {/* H1 — SEO overline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-graphite-light"
        >
          Rodzinne wyjazdy warsztatowe w naturze
        </motion.h1>

        {/* H2 — emotional, TCW style with italic */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-4xl font-heading text-3xl font-light leading-tight text-graphite sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Ty się regenerujesz. Twoje dziecko się{" "}
          <em className="italic text-graphite-light">bawi</em>.{" "}
          Razem tworzycie wspomnienia{" "}
          <em className="italic text-graphite-light">na całe życie</em>.
        </motion.h2>

        {/* Large image below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-12 w-full max-w-5xl overflow-hidden sm:mt-16"
        >
          <div className="aspect-[16/9] md:aspect-[21/9]">
            <HeroSlideshow />
          </div>
        </motion.div>

        {/* Minimal benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12 md:gap-16"
        >
          {benefits.map((text) => (
            <p
              key={text}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-graphite-light"
            >
              {text}
            </p>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-12"
        >
          <Button href="/wyjazdy" size="lg">
            Zobacz wyjazdy
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
