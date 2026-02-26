import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardProps = {
  image?: {
    src: string;
    alt: string;
  };
  href?: string;
  grayscale?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  image,
  href,
  grayscale = false,
  className,
  children,
}: CardProps) {
  const content = (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300",
        href && "hover:shadow-lg",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-500",
              href && "group-hover:scale-105",
              grayscale && "grayscale",
            )}
          />
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}
