import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
