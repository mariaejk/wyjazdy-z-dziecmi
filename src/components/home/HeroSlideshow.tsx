"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const slides = [
  { src: "/images/hero.jpg", alt: "Rodzina na wyjeździe warsztatowym w naturze" },
  { src: "/images/matki-corki-1.jpg", alt: "Warsztaty matka i córka" },
  { src: "/images/przeszly-1.jpg", alt: "Uczestnicy warsztatów na łonie natury" },
  { src: "/images/kazce-bagno-1.jpg", alt: "Warsztaty w otoczeniu natury — Kacze Bagno" },
];

export function HeroSlideshow() {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <Image
        src={slides[0].src}
        alt={slides[0].alt}
        width={720}
        height={540}
        priority
        sizes="(max-width: 1024px) calc(100vw - 2rem), 45vw"
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            width={720}
            height={540}
            priority={current === 0}
            sizes="(max-width: 1024px) calc(100vw - 2rem), 45vw"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
