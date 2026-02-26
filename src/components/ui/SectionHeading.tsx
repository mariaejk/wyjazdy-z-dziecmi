import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
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
      <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-graphite-light sm:mt-4 sm:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
