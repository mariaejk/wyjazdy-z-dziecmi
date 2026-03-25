import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_ORIGINS } from "./constants";
import { rateLimit } from "./rate-limit";

const MAX_BODY_SIZE = 50_000; // 50KB

type SecurityCheckResult =
  | { ok: true; ip: string; body: unknown }
  | { ok: false; response: NextResponse };

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

  // Rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",").at(-1)!.trim()
    : (request.headers.get("x-real-ip") ?? "unknown");

  const { success } = rateLimit(ip);
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
