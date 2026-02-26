export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: number;
};

export const CONSENT_VERSION = "1.0";
export const CONSENT_STORAGE_KEY = "cookie-consent";

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  timestamp: 0,
};
