import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { log } from "@/lib/logger";

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const { success } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Zbyt wiele pr\u00F3b. Spr\u00F3buj ponownie p\u00F3\u017Aniej." },
      { status: 429 },
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Nieprawid\u0142owy format danych." },
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
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ error: "B\u0142\u0105d walidacji.", errors }, { status: 400 });
  }

  const data = result.data;

  // TODO: Send webhook to n8n for email notification
  // await fetch(process.env.N8N_CONTACT_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });

  log("Contact", {
    name: data.name,
    email: data.email,
    message: data.message.substring(0, 100),
  });

  return NextResponse.json({ success: true });
}
