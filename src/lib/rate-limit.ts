const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// KV-based rate limiter for Cloudflare Workers.
// Falls back to in-memory Map when KV is not available (local dev, Vercel).

// In-memory fallback
const MAX_IPS = 10_000;
const EVICTION_BATCH = 1_000;
const requestMap = new Map<string, number[]>();

function rateLimitInMemory(ip: string): { success: boolean } {
  const now = Date.now();

  if (requestMap.size >= MAX_IPS) {
    let evicted = 0;
    for (const [key, timestamps] of requestMap) {
      if (evicted >= EVICTION_BATCH) break;
      if (timestamps.every((t) => now - t >= WINDOW_MS)) {
        requestMap.delete(key);
        evicted++;
      }
    }
  }

  const timestamps = requestMap.get(ip) ?? [];
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    requestMap.set(ip, validTimestamps);
    return { success: false };
  }

  validTimestamps.push(now);
  requestMap.set(ip, validTimestamps);
  return { success: true };
}

// KV namespace type (subset of Cloudflare KV API)
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

async function rateLimitKV(ip: string, kv: KVNamespace): Promise<{ success: boolean }> {
  const key = `rate:${ip}`;
  const now = Date.now();

  const raw = await kv.get(key);
  const timestamps: number[] = raw ? JSON.parse(raw) : [];
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    return { success: false };
  }

  valid.push(now);
  // TTL = 15 minutes — auto-cleanup, no eviction logic needed
  await kv.put(key, JSON.stringify(valid), { expirationTtl: 900 });
  return { success: true };
}

/**
 * Rate limit by IP. Uses KV when available (CF Workers), falls back to in-memory (Vercel/dev).
 */
export async function rateLimit(
  ip: string,
  kv?: KVNamespace,
): Promise<{ success: boolean }> {
  if (kv) {
    try {
      return await rateLimitKV(ip, kv);
    } catch (error) {
      // KV failure should not block the request — fall back to in-memory
      console.error("[RateLimit] KV error, falling back to in-memory:", error);
      return rateLimitInMemory(ip);
    }
  }
  return rateLimitInMemory(ip);
}
