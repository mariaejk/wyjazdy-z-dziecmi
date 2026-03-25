import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { validateRequest } from "@/lib/api-security";
import { appendNewsletter } from "@/lib/sheets";
import { sendConfirmationEmail } from "@/lib/email";
import { NewsletterConfirmation } from "@/emails/NewsletterConfirmation";

export async function POST(request: NextRequest) {
  const check = await validateRequest(request);
  if (!check.ok) return check.response;
  const { ip, body } = check;

  // Zod validation — consentRodo is optional at API level (passive consent in JoinUsNewsletter)
  const apiSchema = newsletterSchema.extend({
    consentRodo: newsletterSchema.shape.consentRodo.optional(),
  });
  const result = apiSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ error: "Błąd walidacji.", errors }, { status: 400 });
  }

  const data = result.data;

  // RODO: at least one consent must be provided
  if (!data.consentRodo && !data.consentNewsletter) {
    return NextResponse.json(
      { error: "Wymagana jest zgoda na przetwarzanie danych." },
      { status: 400 },
    );
  }

  // Turnstile verification — require token when secret key is configured
  if (process.env.TURNSTILE_SECRET_KEY && !data.turnstileToken) {
    return NextResponse.json(
      { error: "Weryfikacja antyspam jest wymagana." },
      { status: 400 },
    );
  }
  if (data.turnstileToken) {
    const isHuman = await verifyTurnstile(data.turnstileToken, ip);
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
  const results = await Promise.allSettled([
    appendNewsletter({ email: data.email }),
    sendConfirmationEmail(
      data.email,
      "Dziękujemy za zapis — poradnik w drodze!",
      NewsletterConfirmation({ email: data.email }),
    ),
  ]);

  const allFailed = results.every((r) => r.status === "rejected");
  if (allFailed) {
    console.error("[Newsletter] ALL deliveries failed!");
    return NextResponse.json(
      { error: "Wystąpił problem. Proszę spróbować ponownie." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
