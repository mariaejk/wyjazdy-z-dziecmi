import type { TextareaHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
};

export function Textarea({ label, error, id, className, ref, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className={className}>
      <label
        htmlFor={textareaId}
        className="block text-sm font-medium text-graphite"
      >
        {label}
        {props.required && (
          <span className="ml-1 text-red-600" aria-hidden="true">*</span>
        )}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        rows={4}
        className={cn(
          "mt-1.5 block w-full resize-y rounded-none border bg-white px-3 py-2.5 text-graphite transition-colors",
          "placeholder:text-graphite-light/60",
          "focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
            : "border-graphite/20",
        )}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
