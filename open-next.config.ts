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
      // SSG only — serve prerendered pages from Workers static assets (read-only, no ISR).
      incrementalCache: () =>
        import(
          "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"
        ).then((m) => m.default),
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
