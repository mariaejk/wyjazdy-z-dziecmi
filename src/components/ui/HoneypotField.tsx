import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type HoneypotFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">;

export const HoneypotField = forwardRef<HTMLInputElement, HoneypotFieldProps>(
  (props, ref) => {
    return (
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          ref={ref}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...props}
        />
      </div>
    );
  },
);

HoneypotField.displayName = "HoneypotField";
