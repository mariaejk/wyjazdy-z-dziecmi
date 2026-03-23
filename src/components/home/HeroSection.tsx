"use client";

import { motion, useReducedMotion } from "motion/react";
import { Leaf, Heart, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Leaf,
    text: "Miejsca w otoczeniu natury, które przynoszą spokój i ukojenie",
  },
  {
    icon: Heart,
    text: "Warsztaty rozwojowe budujące więź z dzieckiem",
  },
  {
    icon: Sparkles,
    text: "Mnóstwo niebanalnych atrakcji, lepszych od niejednej bajki!",
  },
];

function DecorativeElements() {
  return (
    <div aria-hidden="true">
      <div className="absolute top-[10%] right-[8%] h-px w-16 bg-moss/15" />
      <div className="absolute top-[35%] right-[4%] h-12 w-px bg-moss/10" />
      <div className="absolute bottom-[15%] right-[12%] h-px w-10 bg-moss/10" />
      <div className="absolute top-[20%] left-[48%] h-8 w-px bg-moss/8 hidden lg:block" />
      <div className="absolute bottom-[30%] left-[52%] h-px w-12 bg-moss/8 hidden lg:block" />
    </div>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        className="relative overflow-hidden bg-parchment"
      >
        <DecorativeElements />
        <Container className="relative z-10 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Image — left */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-1/2 lg:max-w-none">
              <div className="relative overflow-hidden rounded-none shadow-lg">
                <HeroSlideshow />
              </div>
            </div>

            {/* Text — right */}
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              {/* H1 = SEO descriptive keyword-rich, styled as overline badge.
                  H2 = emotional headline for users. Intentional hierarchy inversion for SEO. */}
              <h1 className="text-sm font-semibold uppercase tracking-wider text-moss">
                Rodzinne wyjazdy warsztatowe w naturze
              </h1>
              <h2 className="mt-3 font-heading text-xl font-bold text-graphite sm:text-2xl lg:text-3xl">
                Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia{" "}
                <span className="text-terracotta">na całe życie</span>.
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.text}
                    className="rounded-none border border-graphite/8 bg-parchment-dark/50 p-4"
                  >
                    <benefit.icon
                      className="mb-2 h-5 w-5 text-graphite-light"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm leading-snug text-graphite">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href="/wyjazdy" size="lg" className="rounded-none">
                  Zobacz wyjazdy
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-parchment"
    >
      <DecorativeElements />

      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Image — left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-1/2 lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-none shadow-lg">
              <HeroSlideshow />
            </div>
          </motion.div>

          {/* Text — right */}
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            {/* H1 — SEO descriptive */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm font-semibold uppercase tracking-wider text-moss"
            >
              Rodzinne wyjazdy warsztatowe w naturze
            </motion.h1>

            {/* H2 — emotional */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 font-heading text-xl font-bold text-graphite sm:text-2xl lg:text-3xl"
            >
              Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia{" "}
              <span className="text-terracotta">na całe życie</span>.
            </motion.h2>

            {/* Benefit cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                    ease: "easeOut",
                  }}
                  className="rounded-none border border-graphite/8 bg-parchment-dark/50 p-4"
                >
                  <benefit.icon
                    className="mb-2 h-5 w-5 text-graphite-light"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm leading-snug text-graphite">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8"
            >
              <Button href="/wyjazdy" size="lg" className="rounded-none">
                Zobacz wyjazdy
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
