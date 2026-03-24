import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  italicText?: string;
  overline?: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Show decorative hand-drawn underline under italicText */
  underline?: boolean;
};

function DecorativeUnderline() {
  return (
    <svg
      className="mx-auto mt-1 h-[6px] w-[90%] text-graphite-light/40"
      viewBox="0 0 200 8"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 5.5C30 2 50 6.5 80 3.5C110 0.5 130 7 160 4C175 2.5 190 5 198 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SectionHeading({
  title,
  italicText,
  overline,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
  underline = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 lg:mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      {overline && (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-graphite-light">
          {overline}
        </p>
      )}
      <Tag className="font-heading text-3xl font-light text-graphite sm:text-4xl lg:text-5xl">
        {title}
        {italicText && (
          <>
            {" "}
            <span className="relative inline-block">
              <em className="italic text-graphite-light">{italicText}</em>
              {underline && <DecorativeUnderline />}
            </span>
          </>
        )}
      </Tag>
      {subtitle && (
        <p className="mt-3 text-lg text-graphite-light sm:mt-4 sm:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
