import type { OpenNextConfig } from "@opennextjs/cloudflare";

// WARNING: OpenNext is not fully compatible with Windows.
// Use WSL (Windows Subsystem for Linux) for optimal performance.
// Build may pass on Windows but runtime can encounter unpredictable failures.

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // ISR disabled — using "dummy" cache. Pages are SSG with CF Cache Rules.
      // To enable ISR: replace with R2 cache handler + Durable Objects (paid plan required).
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
