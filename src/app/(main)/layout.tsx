import type { ReactNode } from "react";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { StructuredData } from "@/components/shared/StructuredData";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { ClarityScript } from "@/components/shared/ClarityScript";
import { getOrganizationSchema } from "@/lib/structured-data";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
