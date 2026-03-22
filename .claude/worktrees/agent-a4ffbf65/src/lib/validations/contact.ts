import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imi\u0119 musi mie\u0107 co najmniej 2 znaki")
    .max(100, "Imi\u0119 mo\u017Ce mie\u0107 maksymalnie 100 znak\u00F3w"),
  email: z
    .string()
    .email("Podaj prawid\u0142owy adres e-mail"),
  message: z
    .string()
    .min(10, "Wiadomo\u015B\u0107 musi mie\u0107 co najmniej 10 znak\u00F3w")
    .max(2000, "Wiadomo\u015B\u0107 mo\u017Ce mie\u0107 maksymalnie 2000 znak\u00F3w"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  website: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
