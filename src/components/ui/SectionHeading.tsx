import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  italicText?: string;
  overline?: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  italicText,
  overline,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
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
            <em className="italic text-graphite-light">{italicText}</em>
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
