export const dynamic = "force-static";

import type { ReactNode } from "react";
import { Inter, Lora, Caveat } from "next/font/google";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { StructuredData } from "@/components/shared/StructuredData";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { ClarityScript } from "@/components/shared/ClarityScript";
import { getOrganizationSchema } from "@/lib/structured-data";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["500", "600"],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div
      className={`${inter.variable} ${lora.variable} ${caveat.variable} font-body bg-parchment text-graphite antialiased`}
    >
      <StructuredData data={getOrganizationSchema()} />
      <GoogleAnalytics />
      <ClarityScript />
      <SkipToContent />
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
