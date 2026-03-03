"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { waitlistSchema, type WaitlistFormValues } from "@/lib/validations/waitlist";
import { analytics } from "@/lib/analytics";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

type WaitlistFormProps = {
  tripSlug: string;
  tripTitle: string;
};

export function WaitlistForm({ tripSlug, tripTitle }: WaitlistFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      trip: tripSlug,
      consentRodo: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage(
          "Zbyt wiele prób. Spróbuj ponownie za kilka minut.",
        );
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(
          result.error ?? "Wystąpił błąd. Spróbuj ponownie.",
        );
        return;
      }

      setStatus("success");
      analytics.waitlistSignup(tripSlug);
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Nie udało się wysłać zgłoszenia. Sprawdź połączenie z internetem.");
    }
  };

  return (
    <SectionWrapper id="lista-oczekujacych" variant="alternate">
      <Container>
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Clock className="mx-auto h-12 w-12 text-amber-600" strokeWidth={1.5} />
            <h2 className="mt-4 font-heading text-2xl font-bold text-graphite">
              Lista oczekujących
            </h2>
            <p className="mt-2 text-graphite-light">
              Wyjazd <strong>{tripTitle}</strong> jest już pełny. Zapisz się
              na listę oczekujących, a poinformujemy Cię, gdy zwolni się miejsce.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-moss" strokeWidth={1.5} />
              <h3 className="mt-4 font-heading text-xl font-bold text-graphite">
                Zapisano na listę!
              </h3>
              <p className="mt-3 text-graphite-light">
                Dziękujemy! Skontaktujemy się z Tobą, gdy zwolni się miejsce.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <input type="hidden" {...register("trip")} />

              <Input
                label="Imię i nazwisko"
                placeholder="Jan Kowalski"
                required
                {...register("name")}
                error={errors.name?.message}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="jan@example.com"
                required
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Telefon"
                type="tel"
                placeholder="+48 123 456 789"
                required
                {...register("phone")}
                error={errors.phone?.message}
              />

              <HoneypotField {...register("website")} />

              <Checkbox
                label={
                  <>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                    kontaktu w sprawie listy oczekujących zgodnie z{" "}
                    <a
                      href={ROUTES.privacy}
                      className="text-moss underline hover:text-moss-light"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      polityką prywatności
                    </a>
                    . *
                  </>
                }
                {...register("consentRodo")}
                error={errors.consentRodo?.message}
              />

              {status === "error" && errorMessage && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.5} />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  loading={status === "submitting"}
                  icon={<Clock className="h-5 w-5" strokeWidth={1.5} />}
                  className="w-full"
                >
                  Zapisz się na listę oczekujących
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
