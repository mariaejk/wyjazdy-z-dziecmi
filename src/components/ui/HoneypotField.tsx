import type { InputHTMLAttributes, Ref } from "react";

type HoneypotFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  ref?: Ref<HTMLInputElement>;
};

export function HoneypotField({ ref, ...props }: HoneypotFieldProps) {
  const fieldId = props.id ?? props.name ?? "website";

  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor={fieldId}>Website</label>
      <input
        ref={ref}
        id={fieldId}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}
