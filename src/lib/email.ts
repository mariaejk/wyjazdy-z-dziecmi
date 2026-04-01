import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";

const FROM_EMAIL = process.env.FROM_EMAIL || "Wyjazdy z Dziećmi <onboarding@resend.dev>";

if (!process.env.FROM_EMAIL && process.env.NODE_ENV === "production") {
  console.warn("[Email] FROM_EMAIL not set — using default onboarding@resend.dev. Emails may not be delivered.");
}

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [options.to],
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

export async function sendNotificationEmail(
  subject: string,
  html: string,
  replyTo?: string,
) {
  const ownerEmail = process.env.OWNER_EMAIL || CONTACT.email;

  try {
    await sendEmail({
      to: ownerEmail,
      subject,
      html,
      replyTo,
    });
  } catch (error) {
    console.error("[Email] Notification failed:", error);
  }
}

export async function sendConfirmationEmail(
  to: string,
  subject: string,
  html: string,
) {
  try {
    await sendEmail({
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("[Email] Confirmation failed:", error);
  }
}
