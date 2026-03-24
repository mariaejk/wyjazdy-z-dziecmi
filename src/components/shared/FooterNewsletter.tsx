"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/newsletter";
import { analytics } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { ROUTES } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function FooterNewsletter() {
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
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      consentRodo: false as unknown as true,
      consentNewsletter: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage("Zbyt wiele prób. Spróbuj ponownie za kilka minut.");
        resetTurnstile();
        return;
      }

      if (!response.ok) {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(result.error ?? "Wystąpił błąd. Spróbuj ponownie.");
        resetTurnstile();
        return;
      }

      setStatus("success");
      analytics.newsletterSignup();
      reset();
      resetTurnstile();
    } catch {
      setStatus("error");
      setErrorMessage("Nie udało się zapisać. Sprawdź połączenie z internetem.");
      resetTurnstile();
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-graphite">
        Bądź na bieżąco
      </p>
      <p className="mt-1 text-xs text-graphite-light">
        Zapisz się do naszego newslettera i bądź na bieżąco z wszystkimi wydarzeniami.
      </p>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-3 text-moss">
          <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm font-medium">
            Dziękujemy za zapisanie się!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-3"
          aria-label="Formularz zapisu na newsletter"
        >
          <div className="flex w-full gap-2 sm:max-w-md">
            <div className="flex-1">
              <label htmlFor="footer-nl-email" className="sr-only">
                Adres e-mail
              </label>
              <input
                id="footer-nl-email"
                type="email"
                placeholder="Twój email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "footer-nl-email-error" : undefined}
                className="w-full rounded-none border border-graphite/20 bg-white px-3 py-2 text-sm text-graphite placeholder:text-graphite-light/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
                {...register("email")}
              />
              {errors.email && (
                <p id="footer-nl-email-error" className="mt-1 text-xs text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-none bg-moss px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-moss-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "..." : "Zapisz się"}
            </button>
          </div>

          <HoneypotField {...register("website")} />

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

          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2">
              <input
                id="footer-nl-consent-rodo"
                type="checkbox"
                aria-invalid={!!errors.consentRodo}
                aria-describedby={errors.consentRodo ? "footer-nl-rodo-error" : undefined}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
                {...register("consentRodo")}
              />
              <label htmlFor="footer-nl-consent-rodo" className="text-xs leading-relaxed text-graphite-light">
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
              <p id="footer-nl-rodo-error" className="text-xs text-red-600" role="alert">
                {errors.consentRodo.message}
              </p>
            )}

            <div className="flex items-start gap-2">
              <input
                id="footer-nl-consent-newsletter"
                type="checkbox"
                aria-invalid={!!errors.consentNewsletter}
                aria-describedby={errors.consentNewsletter ? "footer-nl-newsletter-error" : undefined}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
                {...register("consentNewsletter")}
              />
              <label htmlFor="footer-nl-consent-newsletter" className="text-xs leading-relaxed text-graphite-light">
                Wyrażam zgodę na otrzymywanie newslettera z informacjami o warsztatach i wydarzeniach. *
              </label>
            </div>
            {errors.consentNewsletter && (
              <p id="footer-nl-newsletter-error" className="text-xs text-red-600" role="alert">
                {errors.consentNewsletter.message}
              </p>
            )}
          </div>

          {status === "error" && errorMessage && (
            <div className="mt-3 flex items-start gap-2 rounded-none border border-red-200 bg-red-50 p-3" role="alert">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" strokeWidth={1.5} />
              <p className="text-xs text-red-700">{errorMessage}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
