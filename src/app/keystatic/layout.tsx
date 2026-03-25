import type { ReactNode } from "react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const showAdminUI =
  process.env.NODE_ENV !== "production" ||
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER);

export default function KeystaticLayout({ children }: { children: ReactNode }) {
  if (!showAdminUI) notFound();
  return children;
}
