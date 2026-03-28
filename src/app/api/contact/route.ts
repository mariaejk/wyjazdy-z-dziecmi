import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { validateRequest } from "@/lib/api-security";
import { appendContact } from "@/lib/airtable";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";
import { ContactNotification } from "@/emails/ContactNotification";
import { ContactConfirmation } from "@/emails/ContactConfirmation";

export async function POST(request: NextRequest) {
  const check = await validateRequest(request);
  if (!check.ok) return check.response;
  const { ip, body } = check;

  // Zod validation
  const result = contactSchema.safeParse(body);
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

  log("Contact", {
    name: data.name,
    email: data.email,
    message: data.message.substring(0, 100),
  });

  const timestamp = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });

  // Airtable + emails (parallel, graceful degradation)
  const results = await Promise.allSettled([
    appendContact({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
    sendNotificationEmail(
      `Nowe zapytanie od ${data.name}`,
      ContactNotification({
        name: data.name,
        email: data.email,
        message: data.message,
        submittedAt: timestamp,
      }),
      data.email,
    ),
    sendConfirmationEmail(
      data.email,
      "Dziękujemy za wiadomość — odpowiemy w ciągu 24h",
      ContactConfirmation({ name: data.name }),
    ),
  ]);

  const allFailed = results.every((r) => r.status === "rejected");
  if (allFailed) {
    console.error("[Contact] ALL deliveries failed — lead lost!");
    return NextResponse.json(
      { error: "Wystąpił problem. Proszę spróbować ponownie lub skontaktować się telefonicznie." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
