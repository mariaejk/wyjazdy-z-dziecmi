import type { ReactNode } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
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
  "aria-label"?: string;
  target?: string;
  rel?: string;
  disabled?: never;
  loading?: never;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  disabled?: boolean;
  loading?: boolean;
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
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, "aria-label": ariaLabel, target, rel } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  const { disabled, loading, type = "button", onClick } = props as ButtonAsButton;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(classes, isDisabled && "opacity-60 cursor-not-allowed")}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 shrink-0 animate-spin" strokeWidth={1.5} />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children}
    </button>
  );
}
