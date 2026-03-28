import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_ORIGINS } from "./constants";
import { rateLimit, type KVBinding } from "./rate-limit";

const MAX_BODY_SIZE = 50_000; // 50KB

type SecurityCheckResult =
  | { ok: true; ip: string; body: unknown }
  | { ok: false; response: NextResponse };

async function getKVBinding(): Promise<KVBinding | undefined> {
  try {
    // Dynamic import — only available on CF Workers with @opennextjs/cloudflare
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    // { async: true } required — without it, synchronous overload is used and
    // await becomes a no-op, causing KV rate limiting to silently fail
    const ctx = await getCloudflareContext({ async: true });
    return ctx.env?.RATE_LIMIT as KVBinding | undefined;
  } catch {
    // Not on CF Workers — KV not available
    return undefined;
  }
}

/**
 * Shared security preamble for all API POST routes.
 * Checks: Origin (CSRF), Content-Length, rate limit, JSON parse, honeypot.
 */
export async function validateRequest(request: NextRequest): Promise<SecurityCheckResult> {
  // CSRF: require Origin header in production
  const origin = request.headers.get("origin");
  if (process.env.NODE_ENV === "production" && !origin) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return { ok: false, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  // Body size check
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return { ok: false, response: NextResponse.json({ error: "Payload too large" }, { status: 413 }) };
  }

  // Rate limiting — uses KV on CF Workers, in-memory fallback elsewhere
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",").at(-1)!.trim()
    : (request.headers.get("x-real-ip") ?? "unknown");

  const kv = await getKVBinding();
  const { success } = await rateLimit(ip, kv);
  if (!success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Zbyt wiele prób. Spróbuj ponownie później." },
        { status: 429 },
      ),
    };
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Nieprawidłowy format danych." },
        { status: 400 },
      ),
    };
  }

  // Honeypot check — return fake 200 to not reveal detection
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    (body as Record<string, unknown>).website !== ""
  ) {
    return { ok: false, response: NextResponse.json({ success: true }) };
  }

  return { ok: true, ip, body };
}
