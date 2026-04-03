import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Wyjazdy z Dziećmi — czas dla siebie i dziecka w naturze",
    template: "%s | Wyjazdy z Dziećmi",
  },
  description:
    "Wyjazdy warsztatowe w naturze dla zmęczonych rodziców i radosnych dzieci. Joga, taniec, ceramika, konie — czas na regenerację i wspólne wspomnienia.",
  metadataBase: new URL("https://www.wyjazdyzdziecmi.pl"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Wyjazdy z Dziećmi",
    title: "Wyjazdy z Dziećmi — czas dla siebie i dziecka w naturze",
    description:
      "Wyjazdy warsztatowe w naturze — czas na regenerację dla rodziców i przygodę dla dzieci.",
    images: [{ url: "/images/og-image.jpeg", width: 1200, height: 630, alt: "Wyjazdy z Dziećmi — dzieci na warsztatach w naturze" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wyjazdy z Dziećmi — czas dla siebie i dziecka w naturze",
    description:
      "Wyjazdy warsztatowe w naturze — czas na regenerację dla rodziców i przygodę dla dzieci.",
    images: ["/images/og-image.jpeg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
