"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { analytics } from "@/lib/analytics";
import { TURNSTILE_SITE_KEY } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
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
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      // RHF/Zod type mismatch — Zod literal(true) output ≠ boolean input
      consentRodo: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
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
      analytics.contactSubmit();
      reset();
      resetTurnstile();
    } catch {
      setStatus("error");
      setErrorMessage("Nie udało się wysłać wiadomości. Sprawdź połączenie z internetem.");
      resetTurnstile();
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-moss" strokeWidth={1.5} />
        <h3 className="mt-4 font-heading text-2xl font-bold text-graphite">
          Wiadomość wysłana!
        </h3>
        <p className="mt-3 text-graphite-light">
          Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      <Input
        label="Imię i nazwisko"
        placeholder="Jan Kowalski"
        autoComplete="name"
        required
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="E-mail"
        type="email"
        placeholder="jan@example.com"
        autoComplete="email"
        required
        {...register("email")}
        error={errors.email?.message}
      />
      <Textarea
        label="Wiadomość"
        placeholder="Napisz do nas..."
        required
        {...register("message")}
        error={errors.message?.message}
      />

      <HoneypotField {...register("website")} />

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

      {status === "error" && errorMessage && (
        <div className="flex items-start gap-3 rounded-none border border-red-200 bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.5} />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
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
          {status === "submitting" ? "Wysyłanie..." : "Wyślij wiadomość"}
        </Button>
      </div>
    </form>
  );
}
