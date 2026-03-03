declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    [key: `ga-disable-${string}`]: boolean;
  }
}

export {};
