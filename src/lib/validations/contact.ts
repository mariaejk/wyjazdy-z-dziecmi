import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(100, "Imię może mieć maksymalnie 100 znaków"),
  email: z
    .string()
    .email("Podaj prawidłowy adres e-mail"),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków")
    .max(2000, "Wiadomość może mieć maksymalnie 2000 znaków"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  website: z.string(),
  turnstileToken: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
