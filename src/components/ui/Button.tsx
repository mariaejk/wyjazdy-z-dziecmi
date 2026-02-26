import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  disabled?: never;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-moss text-white hover:bg-moss-light focus-visible:ring-moss",
  secondary:
    "border-2 border-moss text-moss hover:bg-moss hover:text-white focus-visible:ring-moss",
  ghost:
    "text-moss hover:bg-moss/10 focus-visible:ring-moss",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  const { disabled, type = "button", onClick } = props as ButtonAsButton;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(classes, disabled && "opacity-60 cursor-not-allowed")}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
