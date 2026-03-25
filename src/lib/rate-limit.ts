const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;
const MAX_IPS = 10_000;
const EVICTION_BATCH = 1_000;

const requestMap = new Map<string, number[]>();

export function rateLimit(ip: string): { success: boolean } {
  const now = Date.now();

  // Evict expired entries in batches when map grows too large
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

  // Remove expired entries for this IP
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    requestMap.set(ip, validTimestamps);
    return { success: false };
  }

  validTimestamps.push(now);
  requestMap.set(ip, validTimestamps);
  return { success: true };
}
