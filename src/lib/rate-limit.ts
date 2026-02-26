const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

const requestMap = new Map<string, number[]>();

export function rateLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const timestamps = requestMap.get(ip) ?? [];

  // Remove expired entries
  const validTimestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    requestMap.set(ip, validTimestamps);
    return { success: false };
  }

  validTimestamps.push(now);
  requestMap.set(ip, validTimestamps);
  return { success: true };
}
