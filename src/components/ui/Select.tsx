import type { SelectHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  ref?: Ref<HTMLSelectElement>;
};

export function Select({ label, error, options, placeholder, id, className, ref, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className={className}>
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-graphite"
      >
        {label}
        {props.required && (
          <span className="ml-1 text-red-600" aria-hidden="true">*</span>
        )}
      </label>
      <select
        ref={ref}
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={cn(
          "mt-1.5 block w-full rounded-none border bg-white px-3 py-2.5 text-base text-graphite transition-colors",
          "focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-graphite/20",
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
