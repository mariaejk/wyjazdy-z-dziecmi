import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { validateRequest } from "@/lib/api-security";
import { appendWaitlist } from "@/lib/airtable";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";
import { waitlistNotificationHtml, waitlistConfirmationHtml } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  const check = await validateRequest(request);
  if (!check.ok) return check.response;
  const { ip, body } = check;

  // Zod validation
  const result = waitlistSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ error: "Błąd walidacji.", errors }, { status: 400 });
  }

  const data = result.data;

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

  log("Waitlist", {
    name: data.name,
    email: data.email,
    trip: data.trip,
  });

  const timestamp = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });

  // Airtable + emails (parallel, graceful degradation)
  const results = await Promise.allSettled([
    appendWaitlist({
      name: data.name,
      email: data.email,
      phone: data.phone,
      trip: data.trip,
    }),
    sendNotificationEmail(
      `Lista oczekujących: ${data.trip} — ${data.name}`,
      waitlistNotificationHtml({
        name: data.name,
        email: data.email,
        phone: data.phone,
        trip: data.trip,
        submittedAt: timestamp,
      }),
      data.email,
    ),
    sendConfirmationEmail(
      data.email,
      `Lista oczekujących: ${data.trip}`,
      waitlistConfirmationHtml({
        name: data.name,
        trip: data.trip,
      }),
    ),
  ]);

  const allFailed = results.every((r) => r.status === "rejected");
  if (allFailed) {
    console.error("[Waitlist] ALL deliveries failed — lead lost!", {
      trip: data.trip,
    });
    return NextResponse.json(
      { error: "Wystąpił problem. Proszę spróbować ponownie lub skontaktować się telefonicznie." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
