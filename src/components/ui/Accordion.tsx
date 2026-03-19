"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  onToggle?: (id: string, title: string) => void;
};

export function Accordion({ items, className, onToggle }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    const newId = openId === id ? null : id;
    setOpenId(newId);
    if (newId !== null && onToggle) {
      const item = items.find((i) => i.id === newId);
      if (item) onToggle(newId, item.title);
    }
  };

  return (
    <div className={cn("divide-y divide-graphite/10", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const triggerId = `accordion-trigger-${item.id}`;

        return (
          <div key={item.id}>
            <button
              id={triggerId}
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-graphite transition-colors hover:text-moss sm:py-5 sm:text-lg"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-graphite-light transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>

            {prefersReducedMotion ? (
              isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="pb-4 text-graphite-light sm:pb-5"
                >
                  <p className="leading-relaxed">{item.content}</p>
                </div>
              )
            ) : (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 text-graphite-light sm:pb-5">
                      <p className="leading-relaxed">{item.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
