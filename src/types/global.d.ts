declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    [key: `ga-disable-${string}`]: boolean;
  }

  // Cloudflare Workers bindings — extends @opennextjs/cloudflare CloudflareEnv
  interface CloudflareEnv {
    RATE_LIMIT?: KVNamespace;
  }
}

export {};
