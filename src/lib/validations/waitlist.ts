import { z } from "zod";

export const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(100, "Imię może mieć maksymalnie 100 znaków"),
  email: z
    .string()
    .email("Podaj prawidłowy adres e-mail"),
  phone: z
    .string()
    .min(9, "Numer telefonu musi mieć co najmniej 9 cyfr")
    .max(20, "Numer telefonu jest za długi")
    .regex(/^[+\d\s()-]+$/, "Numer telefonu zawiera niedozwolone znaki")
    .regex(/\d/, "Numer telefonu musi zawierać co najmniej jedną cyfrę"),
  trip: z
    .string()
    .min(1, "Wybierz wyjazd")
    .max(200, "Nazwa wyjazdu jest za długa"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  website: z.string(),
  turnstileToken: z.string().min(1).optional(),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
