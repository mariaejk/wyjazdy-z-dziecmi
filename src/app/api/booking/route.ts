import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { rateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/logger";
import { verifyTurnstile } from "@/lib/turnstile";
import { appendBooking } from "@/lib/sheets";
import { sendNotificationEmail, sendConfirmationEmail } from "@/lib/email";
import { BookingNotification } from "@/emails/BookingNotification";
import { BookingConfirmation } from "@/emails/BookingConfirmation";

const ALLOWED_ORIGINS = [
  "https://www.wyjazdyzdziecmi.pl",
  "https://wyjazdyzdziecmi.pl",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
];

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
  const result = bookingSchema.safeParse(body);
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

  log("Booking", {
    name: data.name,
    email: data.email,
    trip: data.trip,
    adults: data.adults,
    children: data.children,
    dietaryNeeds: data.dietaryNeeds,
  });

  const timestamp = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });

  // Google Sheets + emails (parallel, graceful degradation)
  await Promise.allSettled([
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

  return NextResponse.json({ success: true });
}
