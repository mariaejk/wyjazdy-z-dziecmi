import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { validateRequest } from "@/lib/api-security";
import { appendBooking } from "@/lib/sheets";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";
import { BookingNotification } from "@/emails/BookingNotification";
import { BookingConfirmation } from "@/emails/BookingConfirmation";

export async function POST(request: NextRequest) {
  const check = await validateRequest(request);
  if (!check.ok) return check.response;
  const { ip, body } = check;

  // Zod validation
  const result = bookingSchema.safeParse(body);
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

  log("Booking", {
    name: data.name,
    email: data.email,
    trip: data.trip,
    adults: data.adults,
    children: data.children,
  });

  const timestamp = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });

  // Google Sheets + emails (parallel, graceful degradation)
  const results = await Promise.allSettled([
    appendBooking({
      name: data.name,
      email: data.email,
      phone: data.phone,
      trip: data.trip,
      adults: data.adults,
      children: data.children,
      childrenAges: data.childrenAges,
      dietaryNeeds: data.dietaryNeeds,
      notes: data.notes,
      consentMarketing: data.consentMarketing,
    }),
    sendNotificationEmail(
      `Nowa rezerwacja: ${data.trip} — ${data.name}`,
      BookingNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        trip: data.trip,
        adults: data.adults,
        children: data.children,
        childrenAges: data.childrenAges,
        dietaryNeeds: data.dietaryNeeds,
        notes: data.notes,
        consentMarketing: data.consentMarketing,
        submittedAt: timestamp,
      }),
      data.email,
    ),
    sendConfirmationEmail(
      data.email,
      `Potwierdzenie rezerwacji: ${data.trip}`,
      BookingConfirmation({
        name: data.name,
        trip: data.trip,
        adults: data.adults,
        children: data.children,
      }),
    ),
  ]);

  // Detect total delivery failure — data submitted but not stored or emailed
  const allFailed = results.every((r) => r.status === "rejected");
  if (allFailed) {
    console.error("[Booking] ALL deliveries failed — lead lost!", {
      trip: data.trip,
    });
    return NextResponse.json(
      { error: "Wystąpił problem. Proszę spróbować ponownie lub skontaktować się telefonicznie." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
