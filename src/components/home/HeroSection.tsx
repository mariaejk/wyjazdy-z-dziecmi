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
    bgClass: "bg-moss/10",
    iconClass: "text-moss",
  },
  {
    icon: Heart,
    text: "Warsztaty rozwojowe budujące więź z dzieckiem",
    bgClass: "bg-coral/15",
    iconClass: "text-coral",
  },
  {
    icon: Sparkles,
    text: "Mnóstwo niebanalnych atrakcji, lepszych od niejednej bajki!",
    bgClass: "bg-mustard/15",
    iconClass: "text-mustard",
  },
];

function DecorativeDots() {
  return (
    <>
      <div className="absolute top-[15%] right-[10%] h-2 w-2 rounded-full bg-moss/10 animate-float-slow" />
      <div className="absolute top-[40%] right-[5%] h-3 w-3 rounded-full bg-coral/20 animate-float-medium" />
      <div className="absolute bottom-[20%] right-[15%] h-2 w-2 rounded-full bg-mustard/15 animate-float-reverse" />
      <div className="absolute top-[25%] left-[48%] h-2.5 w-2.5 rounded-full bg-terracotta/10 animate-float-medium hidden lg:block" />
      <div className="absolute bottom-[35%] left-[52%] h-2 w-2 rounded-full bg-moss/10 animate-float-slow hidden lg:block" />
    </>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-parchment via-parchment to-coral/15"
      >
        <DecorativeDots />
        <Container className="relative z-10 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Image — left */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-[45%] lg:max-w-none">
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-moss/15" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-coral/20" />
              <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-mustard/15" />
              <div className="relative overflow-hidden rounded-none shadow-2xl">
                <HeroSlideshow />
              </div>
            </div>

            {/* Text — right */}
            <div className="mt-6 lg:mt-0 lg:w-[55%]">
              {/* H1 = SEO descriptive keyword-rich, styled as overline badge.
                  H2 = emotional headline for users. Intentional hierarchy inversion for SEO. */}
              <h1 className="text-sm font-semibold uppercase tracking-wider text-moss">
                Rodzinne wyjazdy warsztatowe w naturze
              </h1>
              <h2 className="mt-2 font-heading text-3xl font-bold text-graphite sm:text-4xl lg:text-5xl">
                Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia{" "}
                <span className="text-terracotta">na całe życie</span>.
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.text}
                    className={cn("rounded-none p-4", benefit.bgClass)}
                  >
                    <benefit.icon
                      className={cn("mb-2 h-5 w-5", benefit.iconClass)}
                      strokeWidth={1.5}
                    />
                    <p className="text-sm leading-snug text-graphite">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
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
      className="relative overflow-hidden bg-gradient-to-br from-parchment via-parchment to-coral/15"
    >
      <DecorativeDots />

      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Image — left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-[45%] lg:max-w-none"
          >
            {/* Decorative circles behind image */}
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-moss/15 animate-float-slow" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-coral/20 animate-float-medium" />
            <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-mustard/15 animate-float-reverse" />

            <div className="relative overflow-hidden rounded-none shadow-2xl">
              <HeroSlideshow />
            </div>
          </motion.div>

          {/* Text — right */}
          <div className="mt-6 lg:mt-0 lg:w-[55%]">
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
              className="mt-2 font-heading text-3xl font-bold text-graphite sm:text-4xl lg:text-5xl"
            >
              Ty się regenerujesz. Twoje dziecko się bawi. Razem tworzycie wspomnienia{" "}
              <span className="text-terracotta">na całe życie</span>.
            </motion.h2>

            {/* Benefit cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
                  className={cn("rounded-none p-4", benefit.bgClass)}
                >
                  <benefit.icon
                    className={cn("mb-2 h-5 w-5", benefit.iconClass)}
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
              className="mt-6"
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
