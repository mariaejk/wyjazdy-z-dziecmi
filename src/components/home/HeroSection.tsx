"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Leaf, Heart, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

const benefits = [
  {
    icon: Leaf,
    text: "Miejsca w otoczeniu natury, które przynoszą spokój i ukojenie",
  },
  {
    icon: Heart,
    text: "Warsztaty rozwojowe, które zapraszają w podróż wgłąb siebie i budują więź z dzieckiem",
  },
  {
    icon: Sparkles,
    text: "Mnóstwo niebanalnych atrakcji, lepszych od niejednej bajki!",
  },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Rodzina na wyjeździe warsztatowym w naturze"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Content */}
      <Container className="relative z-10 py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Wyjazdy z Dziećmi
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 text-lg text-white/90 sm:mt-6 sm:text-xl lg:text-2xl"
          >
            Projekt, który zrodził się z potrzeby spędzania jakościowego czasu
            z dziećmi.
          </motion.p>

          <motion.ul
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 space-y-4 sm:mt-10"
          >
            {benefits.map((benefit) => (
              <li key={benefit.text} className="flex items-start gap-3">
                <benefit.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-white/80"
                  strokeWidth={1.5}
                />
                <span className="text-base text-white/85 sm:text-lg">
                  {benefit.text}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 sm:mt-12"
          >
            <Button href={ROUTES.trips} size="lg" className="bg-moss hover:bg-moss-light">
              Zobacz wyjazdy
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
