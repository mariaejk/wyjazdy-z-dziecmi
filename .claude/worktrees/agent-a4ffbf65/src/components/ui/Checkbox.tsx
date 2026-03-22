import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const checkboxId = id ?? props.name;

    return (
      <div className={className}>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            className={cn(
              "mt-1 h-4 w-4 shrink-0 rounded border-graphite/20 text-moss",
              "focus:ring-2 focus:ring-moss/20 focus:ring-offset-0",
            )}
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className="text-sm leading-relaxed text-graphite-light"
          >
            {label}
          </label>
        </div>
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
