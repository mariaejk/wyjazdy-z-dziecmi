import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "default" | "outline";
  children: ReactNode;
  className?: string;
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-3 py-1 text-xs font-medium",
        variant === "default" &&
          "bg-moss/10 text-moss",
        variant === "outline" &&
          "border border-moss/30 text-moss",
        className,
      )}
    >
      {children}
    </span>
  );
}
