"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const { isLoaded, hasAnalyticsConsent } = useCookieConsent();

  // Cleanup when consent is revoked
  useEffect(() => {
    if (!GA_ID || !isLoaded) return;

    if (!hasAnalyticsConsent) {
      // Disable GA
      window[`ga-disable-${GA_ID}`] = true;

      // Remove GA cookies
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const name = cookie.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      }
    } else {
      // Re-enable GA
      window[`ga-disable-${GA_ID}`] = false;
    }
  }, [isLoaded, hasAnalyticsConsent]);

  if (!GA_ID || !isLoaded || !hasAnalyticsConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
