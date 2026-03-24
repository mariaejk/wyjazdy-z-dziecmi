import { Resend } from "resend";
import type { ReactElement } from "react";
import { CONTACT } from "@/lib/constants";

const FROM_EMAIL =
  process.env.FROM_EMAIL || "Wyjazdy z Dziećmi <onboarding@resend.dev>";

type SendEmailOptions = {
  to: string;
  subject: string;
  react: ReactElement;
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
    react: options.react,
    replyTo: options.replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

export async function sendNotificationEmail(
  subject: string,
  react: ReactElement,
  replyTo?: string,
) {
  const ownerEmail = process.env.OWNER_EMAIL || CONTACT.email;

  try {
    await sendEmail({
      to: ownerEmail,
      subject,
      react,
      replyTo,
    });
  } catch (error) {
    console.error("[Email] Notification failed:", error);
  }
}

export async function sendConfirmationEmail(
  to: string,
  subject: string,
  react: ReactElement,
) {
  try {
    await sendEmail({
      to,
      subject,
      react,
    });
  } catch (error) {
    console.error("[Email] Confirmation failed:", error);
  }
}
