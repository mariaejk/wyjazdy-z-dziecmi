"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/newsletter";
import { analytics } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { ROUTES } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      // Zod literal(true) requires true type, but RHF needs false default for unchecked state
      consentRodo: false as unknown as true,
      website: "",
    },
  });

  // Reset form state when navigating between pages (adjust state during render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    reset();
    setStatus("idle");
    setErrorMessage("");
  }

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage("Zbyt wiele prób. Spróbuj ponownie za kilka minut.");
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(result.error ?? "Wystąpił błąd. Spróbuj ponownie.");
        return;
      }

      setStatus("success");
      analytics.newsletterSignup();
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Nie udało się zapisać. Sprawdź połączenie z internetem.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-10 border-t border-parchment pt-8">
        <div className="flex items-center gap-3 text-moss">
          <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm font-medium">
            Dziękujemy! Poradnik wysyłamy na Twój adres e-mail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-10 border-t border-parchment pt-8"
      aria-label="Formularz newslettera"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-graphite">
            Pobierz darmowy poradnik PDF
          </p>
          <p className="mt-1 text-xs text-graphite-light">
            „Jak przygotować dziecko do wyjazdu warsztatowego” — praktyczne wskazówki dla rodziców bliskościowych.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:max-w-md">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Adres e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Twój email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "newsletter-email-error" : undefined}
              className="w-full rounded-md border border-graphite/20 bg-white px-3 py-2 text-sm text-graphite placeholder:text-graphite-light/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
              {...register("email")}
            />
            {errors.email && (
              <p id="newsletter-email-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0 rounded-md bg-moss px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-moss-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "..." : "Pobierz"}
          </button>
        </div>

        <HoneypotField {...register("website")} />

        <div className="flex items-start gap-2">
          <input
            id="newsletter-consent"
            type="checkbox"
            aria-invalid={!!errors.consentRodo}
            aria-describedby={errors.consentRodo ? "newsletter-consent-error" : undefined}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
            {...register("consentRodo")}
          />
          <label htmlFor="newsletter-consent" className="text-xs leading-relaxed text-graphite-light">
            Wyrażam zgodę na przetwarzanie danych zgodnie z{" "}
            <a
              href={ROUTES.privacy}
              className="text-moss underline hover:text-moss-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              polityką prywatności
            </a>
            . *
          </label>
        </div>
        {errors.consentRodo && (
          <p id="newsletter-consent-error" className="text-xs text-red-600" role="alert">
            {errors.consentRodo.message}
          </p>
        )}

        {status === "error" && errorMessage && (
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" strokeWidth={1.5} />
            <p className="text-xs text-red-700">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}
