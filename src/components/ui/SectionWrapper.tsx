import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  variant?: "default" | "alternate" | "highlight";
  id?: string;
  className?: string;
};

export function SectionWrapper({
  children,
  variant = "default",
  id,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        variant === "alternate"
          ? "bg-parchment-dark"
          : variant === "highlight"
            ? "bg-coral/10"
            : "bg-parchment",
        className,
      )}
    >
      {children}
    </section>
  );
}
