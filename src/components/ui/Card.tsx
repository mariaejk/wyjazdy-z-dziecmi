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
  className?: string;
  children: ReactNode;
};

export function Card({
  image,
  href,
  className,
  children,
}: CardProps) {
  const content = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-none border border-graphite/8 bg-white transition-colors duration-300",
        href && "hover:border-graphite/20",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500",
              href && "group-hover:scale-105",
            )}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block rounded-none focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-2",
        )}
      >
        {content}
      </Link>
    );
  }

  return content;
}
