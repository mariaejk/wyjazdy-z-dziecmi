import { z } from "zod";

export const bookingSchema = z.object({
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
    .regex(/^[+\d\s()-]+$/, "Numer telefonu zawiera niedozwolone znaki"),
  trip: z
    .string()
    .min(1, "Wybierz wyjazd"),
  adults: z
    .number({ error: "Podaj liczbę osób dorosłych" })
    .int()
    .min(1, "Przynajmniej 1 osoba dorosła")
    .max(10, "Maksymalnie 10 osób dorosłych"),
  children: z
    .number({ error: "Podaj liczbę dzieci" })
    .int()
    .min(0, "Liczba dzieci nie może być ujemna")
    .max(10, "Maksymalnie 10 dzieci"),
  childrenAges: z
    .string()
    .max(200, "Zbyt długi opis wieków dzieci"),
  notes: z
    .string()
    .max(1000, "Uwagi mogą mieć maksymalnie 1000 znaków"),
  dietaryNeeds: z
    .string()
    .max(500, "Opis wymagań dietetycznych jest za długi"),
  consentRodo: z
    .literal(true, {
      error: "Zgoda na przetwarzanie danych jest wymagana",
    }),
  consentMarketing: z.boolean(),
  website: z.string(),
  turnstileToken: z.string().min(1).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
