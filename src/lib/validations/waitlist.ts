import { z } from "zod";

export const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, "Imi\u0119 musi mie\u0107 co najmniej 2 znaki")
    .max(100, "Imi\u0119 mo\u017Ce mie\u0107 maksymalnie 100 znak\u00F3w"),
  email: z
    .string()
    .email("Podaj prawid\u0142owy adres e-mail"),
  phone: z
    .string()
    .min(9, "Numer telefonu musi mie\u0107 co najmniej 9 cyfr")
    .max(20, "Numer telefonu jest za d\u0142ugi")
    .regex(/^[+\d\s()-]+$/, "Numer telefonu zawiera niedozwolone znaki"),
  trip: z
    .string()
    .min(1, "Wybierz wyjazd"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  website: z.string(),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
