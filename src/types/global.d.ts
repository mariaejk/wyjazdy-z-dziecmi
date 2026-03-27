declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    [key: `ga-disable-${string}`]: boolean;
  }

  // Cloudflare Workers bindings — extends @opennextjs/cloudflare CloudflareEnv
  // KV type is handled locally in api-security.ts (KVBinding interface)
  // to avoid dependency on @cloudflare/workers-types
  interface CloudflareEnv {
    RATE_LIMIT?: unknown;
  }
}

export {};
