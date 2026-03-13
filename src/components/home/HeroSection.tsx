"use client";

import { motion, useReducedMotion } from "motion/react";
import { Leaf, Heart, Sparkles, Star } from "lucide-react";
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
        <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            {/* Image — left */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-[45%] lg:max-w-none">
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-moss/15" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-coral/20" />
              <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-mustard/15" />
              <div className="relative rotate-[-2deg] overflow-hidden rounded-3xl shadow-2xl">
                <HeroSlideshow />
              </div>
            </div>

            {/* Text — right */}
            <div className="mt-10 lg:mt-0 lg:w-[55%]">
              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl">
                Wyjazdy z{" "}
                <span className="text-terracotta">Dziećmi</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-graphite-light sm:mt-6">
                Projekt, który powstał z potrzeby spędzania jakościowego czasu
                z dziećmi. Warsztaty, natura i niezapomniane przygody.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.text}
                    className={cn("rounded-xl p-4", benefit.bgClass)}
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

              <div className="mt-8 sm:mt-10">
                <Button href="/wyjazdy" size="lg" className="rounded-xl">
                  Znajdź swój wyjazd
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-sm text-graphite-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-mustard text-mustard"
                    strokeWidth={1}
                  />
                ))}
                <span className="ml-1">Polecane przez rodziców</span>
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

      <Container className="relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Image — left */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:w-[45%] lg:max-w-none"
          >
            {/* Decorative circles behind image */}
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-moss/15 animate-float-slow" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-coral/20 animate-float-medium" />
            <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-mustard/15 animate-float-reverse" />

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <HeroSlideshow />
            </div>
          </motion.div>

          {/* Text — right */}
          <div className="mt-10 lg:mt-0 lg:w-[55%]">
            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl"
            >
              Wyjazdy z{" "}
              <span className="text-terracotta">Dziećmi</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-4 max-w-lg text-lg leading-relaxed text-graphite-light sm:mt-6"
            >
              Projekt, który powstał z potrzeby spędzania jakościowego czasu
              z dziećmi. Warsztaty, natura i niezapomniane przygody.
            </motion.p>

            {/* Benefit cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 24, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.12,
                    ease: "easeOut",
                  }}
                  className={cn("rounded-xl p-4", benefit.bgClass)}
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
              className="mt-8 sm:mt-10"
            >
              <Button href="/wyjazdy" size="lg" className="rounded-xl">
                Znajdź swój wyjazd
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-4 flex items-center gap-1.5 text-sm text-graphite-light"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-mustard text-mustard"
                  strokeWidth={1}
                />
              ))}
              <span className="ml-1">Polecane przez rodziców</span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
