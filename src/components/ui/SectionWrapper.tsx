import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  variant?: "default" | "alternate";
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
        "py-8 sm:py-10",
        variant === "alternate" ? "bg-parchment-dark" : "bg-parchment",
        className,
      )}
    >
      {children}
    </section>
  );
}
