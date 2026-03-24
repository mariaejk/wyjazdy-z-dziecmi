"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { bookingSchema, type BookingFormValues } from "@/lib/validations/booking";
import { analytics } from "@/lib/analytics";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

type TripOption = {
  slug: string;
  title: string;
};

type BookingFormProps = {
  trips: TripOption[];
  preselectedTrip?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function BookingForm({ trips, preselectedTrip }: BookingFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const turnstileRef = useRef<TurnstileInstance>(null);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(undefined);
    turnstileRef.current?.reset();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      trip: preselectedTrip ?? "",
      adults: 1,
      children: 0,
      childrenAges: "",
      notes: "",
      dietaryNeeds: "",
      consentRodo: false as unknown as true,
      consentMarketing: false,
      website: "",
    },
  });

  const childrenCount = watch("children");

  const tripOptions = trips.map((t) => ({
    value: t.slug,
    label: t.title,
  }));

  const onSubmit = async (data: BookingFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage(
          "Zbyt wiele prób. Spróbuj ponownie za kilka minut.",
        );
        resetTurnstile();
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(
          result.error ?? "Wystąpił błąd. Spróbuj ponownie.",
        );
        resetTurnstile();
        return;
      }

      setStatus("success");
      analytics.bookingSubmit(data.trip);
      reset();
      resetTurnstile();
    } catch {
      setStatus("error");
      setErrorMessage("Nie udało się wysłać formularza. Sprawdź połączenie z internetem.");
      resetTurnstile();
    }
  };

  if (status === "success") {
    return (
      <SectionWrapper variant="alternate" id="formularz">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-moss" strokeWidth={1.5} />
            <h2 className="mt-4 font-heading text-2xl font-bold text-graphite sm:text-3xl">
              Dziękujemy za zgłoszenie!
            </h2>
            <p className="mt-3 text-graphite-light">
              Otrzymaliśmy Twoje zgłoszenie. Skontaktujemy się z Tobą w ciągu 48 godzin
              z potwierdzeniem i szczegółami dotyczącymi płatności.
            </p>
          </div>
        </Container>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper variant="alternate" id="formularz">
      <Container>
        <SectionHeading
          title="Zapisz się na warsztat"
          subtitle="Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 48 godzin."
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto max-w-2xl space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Telefon"
              type="tel"
              placeholder="+48 500 000 000"
              required
              {...register("phone")}
              error={errors.phone?.message}
            />
            <Select
              label="Wyjazd"
              options={tripOptions}
              placeholder="Wybierz wyjazd..."
              required
              {...register("trip")}
              error={errors.trip?.message}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Dorośli"
              type="number"
              min={1}
              max={10}
              required
              {...register("adults", { valueAsNumber: true })}
              error={errors.adults?.message}
            />
            <Input
              label="Dzieci"
              type="number"
              min={0}
              max={10}
              required
              {...register("children", { valueAsNumber: true })}
              error={errors.children?.message}
            />
          </div>

          {Number(childrenCount) > 0 && (
            <Input
              label="Wiek dzieci"
              placeholder="np. 5, 8"
              {...register("childrenAges")}
              error={errors.childrenAges?.message}
            />
          )}

          <Input
            label="Alergie / wymagania dietetyczne"
            placeholder="np. bezglutenowo, alergia na orzechy"
            {...register("dietaryNeeds")}
            error={errors.dietaryNeeds?.message}
          />

          <Textarea
            label="Uwagi"
            placeholder="Pytania, uwagi..."
            {...register("notes")}
            error={errors.notes?.message}
          />

          <HoneypotField {...register("website")} />

          <div className="space-y-3">
            <Checkbox
              label={
                <>
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                  obsługi zgłoszenia zgodnie z{" "}
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
            <Checkbox
              label="Chcę otrzymywać informacje o przyszłych wyjazdach i wydarzeniach."
              {...register("consentMarketing")}
            />
          </div>

          {status === "error" && errorMessage && (
            <div className="flex items-start gap-3 rounded-none border border-red-200 bg-red-50 p-4" role="alert">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.5} />
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <p className="flex items-center gap-2 text-sm text-graphite-light">
            <Shield className="h-4 w-4 shrink-0 text-moss" strokeWidth={1.5} />
            Rezerwacja jest bezpłatna — nie płacisz z góry. Szczegóły płatności otrzymasz po potwierdzeniu.
          </p>

          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              options={{ size: "invisible" }}
              onSuccess={setTurnstileToken}
              onError={() => setTurnstileToken(undefined)}
              onExpire={() => setTurnstileToken(undefined)}
            />
          )}

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              loading={status === "submitting"}
              icon={<Send className="h-5 w-5" strokeWidth={1.5} />}
              className="w-full sm:w-auto"
            >
              {status === "submitting" ? "Wysyłanie..." : "Zarezerwuj miejsce"}
            </Button>
          </div>
        </form>
      </Container>
    </SectionWrapper>
  );
}
