"use client";

import { analytics } from "@/lib/analytics";

type SocialLinkProps = {
  href: string;
  platform: string;
  children: React.ReactNode;
  className?: string;
};

export function SocialLink({ href, platform, children, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform} (otwiera się w nowej karcie)`}
      className={className}
      onClick={() => analytics.socialClick(platform.toLowerCase())}
    >
      {children}
    </a>
  );
}
