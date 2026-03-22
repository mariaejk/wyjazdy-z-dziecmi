"use client";

import { useSyncExternalStore, useCallback } from "react";
import {
  type CookieConsent,
  CONSENT_VERSION,
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT,
} from "@/types/cookies";

// Sentinel value to distinguish SSR (server snapshot) from client (localStorage null)
const SERVER_SENTINEL = "__ssr__";

function getSnapshot(): string {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot(): string {
  return SERVER_SENTINEL;
}

// Custom event to notify about consent changes within the same tab
const CONSENT_CHANGE_EVENT = "cookie-consent-change";

function subscribe(callback: () => void) {
  // Listen for cross-tab changes
  window.addEventListener("storage", callback);
  // Listen for same-tab changes via custom event
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function parseConsent(raw: string): CookieConsent | null {
  if (!raw || raw === SERVER_SENTINEL) return null;
  try {
    const parsed: CookieConsent = JSON.parse(raw);
    if (parsed.version === CONSENT_VERSION) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent = parseConsent(raw) ?? DEFAULT_CONSENT;
  // isLoaded: false on server (sentinel), true on client (getSnapshot returns "" or JSON)
  const isLoaded = raw !== SERVER_SENTINEL;
  // showBanner: consent was never saved (timestamp === 0) or version mismatch
  const showBanner = isLoaded && consent.timestamp === 0;

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    });
  }, [saveConsent]);

  const acceptNecessaryOnly = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    });
  }, [saveConsent]);

  const saveCustom = useCallback(
    (analytics: boolean, marketing: boolean) => {
      saveConsent({
        necessary: true,
        analytics,
        marketing,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
      });
    },
    [saveConsent],
  );

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    } catch {
      // localStorage unavailable
    }
  }, []);

  return {
    consent,
    isLoaded,
    showBanner,
    hasAnalyticsConsent: consent.analytics,
    hasMarketingConsent: consent.marketing,
    acceptAll,
    acceptNecessaryOnly,
    saveCustom,
    resetConsent,
  };
}
