"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
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
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage(
          "Zbyt wiele pr\u00F3b. Spr\u00F3buj ponownie za kilka minut.",
        );
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(
          result.error ?? "Wyst\u0105pi\u0142 b\u0142\u0105d. Spr\u00F3buj ponownie.",
        );
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Nie uda\u0142o si\u0119 wys\u0142a\u0107 wiadomo\u015Bci. Sprawd\u017A po\u0142\u0105czenie z internetem.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-moss" strokeWidth={1.5} />
        <h3 className="mt-4 font-heading text-2xl font-bold text-graphite">
          Wiadomo\u015B\u0107 wys\u0142ana!
        </h3>
        <p className="mt-3 text-graphite-light">
          Dzi\u0119kujemy za kontakt. Odpowiemy najszybciej jak to mo\u017Cliwe.
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
        label="Imi\u0119 i nazwisko"
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
      <Textarea
        label="Wiadomo\u015B\u0107"
        placeholder="Napisz do nas..."
        required
        {...register("message")}
        error={errors.message?.message}
      />

      <HoneypotField {...register("website")} />

      <Checkbox
        label={
          <>
            Wyra\u017Cam zgod\u0119 na przetwarzanie moich danych osobowych w celu
            obs\u0142ugi zg\u0142oszenia zgodnie z{" "}
            <a
              href={ROUTES.privacy}
              className="text-moss underline hover:text-moss-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              polityk\u0105 prywatno\u015Bci
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
          disabled={status === "submitting"}
          icon={<Send className="h-5 w-5" strokeWidth={1.5} />}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Wysy\u0142anie..." : "Wy\u015Blij wiadomo\u015B\u0107"}
        </Button>
      </div>
    </form>
  );
}
