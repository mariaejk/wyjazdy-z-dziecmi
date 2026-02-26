import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "Wyjazdy z Dziećmi — Rodzinne wyjazdy warsztatowe w naturze",
  description:
    "Warsztaty rozwojowe dla rodzin w otoczeniu natury. Joga, taniec, ceramika, konie. Organizatorka: Maria Kordalewska.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${playfair.variable} ${inter.variable} font-body bg-parchment text-graphite antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
