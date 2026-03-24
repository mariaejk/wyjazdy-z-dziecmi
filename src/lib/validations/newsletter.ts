import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Podaj prawidłowy adres e-mail"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  consentNewsletter: z
    .literal(true, {
      error: "Zgoda na otrzymywanie newslettera jest wymagana",
    })
    .optional(),
  website: z.string(),
  turnstileToken: z.string().min(1).optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
