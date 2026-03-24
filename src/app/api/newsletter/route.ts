import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { rateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { appendNewsletter } from "@/lib/sheets";
import { sendConfirmationEmail } from "@/lib/email";
import { NewsletterConfirmation } from "@/emails/NewsletterConfirmation";
import { ALLOWED_ORIGINS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  // CSRF: Origin check
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",").at(-1)!.trim()
    : (request.headers.get("x-real-ip") ?? "unknown");

  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Zbyt wiele prób. Spróbuj ponownie później." },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawidłowy format danych." },
      { status: 400 },
    );
  }

  // Honeypot check — return fake 200 to not reveal detection
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    (body as Record<string, unknown>).website !== ""
  ) {
    return NextResponse.json({ success: true });
  }

  // Zod validation
  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ error: "Błąd walidacji.", errors }, { status: 400 });
  }

  const data = result.data;

  // Turnstile verification (if token provided)
  if (data.turnstileToken) {
    const isHuman = await verifyTurnstile(data.turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Weryfikacja antyspam nie powiodła się. Spróbuj ponownie." },
        { status: 400 },
      );
    }
  }

  log("Newsletter", { email: data.email });

  // Google Sheets + email confirmation (parallel, graceful degradation)
  // No notification to owner — too much spam for newsletter signups
  await Promise.allSettled([
    appendNewsletter({ email: data.email }),
    sendConfirmationEmail(
      data.email,
      "Dziękujemy za zapis — poradnik w drodze!",
      NewsletterConfirmation({ email: data.email }),
    ),
  ]);

  return NextResponse.json({ success: true });
}
