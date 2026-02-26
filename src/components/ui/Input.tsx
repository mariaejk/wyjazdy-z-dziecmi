import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className={className}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-graphite"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-600" aria-hidden="true">*</span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "mt-1.5 block w-full rounded-lg border bg-white px-3 py-2.5 text-graphite transition-colors",
            "placeholder:text-graphite-light/60",
            "focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-graphite/20",
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
