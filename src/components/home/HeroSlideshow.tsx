"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const slides = [
  { src: "/images/hero-zachod-slonca.jpg", alt: "Dzieci bawiące się nad jeziorem o zachodzie słońca", position: "object-bottom" as const },
  { src: "/images/slide-2.jpeg", alt: "Spacer po wiejskiej drodze w otoczeniu natury", position: "object-center" as const },
  { src: "/images/kazce-bagno-1.jpg", alt: "Warsztaty w otoczeniu natury — Kacze Bagno", position: "object-center" as const },
  { src: "/images/slide-show-1.jpeg", alt: "Rodziny na warsztatach w naturze", position: "object-center" as const },
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
      <div className="absolute inset-0">
        <Image
          src={slides[0].src}
          alt={slides[0].alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover ${slides[0].position}`}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
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
            fill
            loading={current === 0 ? "eager" : "lazy"}
            fetchPriority={current === 0 ? "high" : "auto"}
            sizes="100vw"
            className={`object-cover ${slides[current].position}`}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
