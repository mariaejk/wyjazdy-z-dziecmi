import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageBreakerProps = {
  src: string;
  alt: string;
  aspectRatio?: "21/9" | "16/9" | "3/1";
  objectPosition?: "top" | "center" | "bottom";
  overlayText?: string;
  className?: string;
};

const aspectClasses = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "3/1": "aspect-[3/1]",
} as const;

const positionClasses = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

export function ImageBreaker({
  src,
  alt,
  aspectRatio = "21/9",
  objectPosition = "center",
  overlayText,
  className,
}: ImageBreakerProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectClasses[aspectRatio],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="100vw"
        className={cn("object-cover", positionClasses[objectPosition])}
      />
      {overlayText && (
        <>
          <div className="absolute inset-0 bg-graphite/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-heading text-2xl font-light italic text-white sm:text-3xl lg:text-4xl">
              {overlayText}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
