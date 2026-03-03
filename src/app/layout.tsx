import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { StructuredData } from "@/components/shared/StructuredData";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { ClarityScript } from "@/components/shared/ClarityScript";
import { getOrganizationSchema } from "@/lib/structured-data";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
    template: "%s | Wyjazdy z Dziećmi",
  },
  description:
    "Warsztaty rozwojowe dla rodzin w otoczeniu natury. Joga, taniec, ceramika, konie. Organizatorka: Maria Kordalewska.",
  metadataBase: new URL("https://www.wyjazdyzdziecmi.pl"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Wyjazdy z Dziećmi",
    title: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
    description:
      "Warsztaty rozwojowe dla rodzin w otoczeniu natury. Joga, taniec, ceramika, konie.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Wyjazdy z Dziećmi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
    description:
      "Warsztaty rozwojowe dla rodzin w otoczeniu natury. Joga, taniec, ceramika, konie.",
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    // TODO: Add apple-touch-icon after generating from logo
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <StructuredData data={getOrganizationSchema()} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body bg-parchment text-graphite antialiased`}
      >
        <GoogleAnalytics />
        <ClarityScript />
        <SkipToContent />
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
