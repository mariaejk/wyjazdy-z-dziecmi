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
    <div className="rounded-none bg-graphite p-6 sm:p-8">
      <h3 className="font-heading text-xl font-light text-white sm:text-2xl">
        Bądź na bieżąco
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Zapisz się do naszego newslettera i bądź na bieżąco z wszystkimi wydarzeniami
      </p>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-3 text-moss-light">
          <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          <p className="text-sm font-medium">
            Dziękujemy za zapisanie się!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-4"
          aria-label="Formularz zapisu na newsletter"
        >
          <div className="flex gap-2">
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
                className="w-full rounded-none border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-mustard focus:outline-none focus:ring-2 focus:ring-mustard/30"
                {...register("email")}
              />
              {errors.email && (
                <p id="footer-nl-email-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-none bg-mustard px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-graphite transition-colors hover:bg-mustard/90 disabled:cursor-not-allowed disabled:opacity-60"
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
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-white/20 bg-white/10 text-mustard focus:ring-2 focus:ring-mustard/30 focus:ring-offset-0 focus:ring-offset-graphite"
                {...register("consentRodo")}
              />
              <label htmlFor="footer-nl-consent-rodo" className="text-xs leading-relaxed text-white/50">
                Wyrażam zgodę na przetwarzanie danych zgodnie z{" "}
                <a
                  href={ROUTES.privacy}
                  className="text-mustard underline hover:text-mustard/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  polityką prywatności
                </a>
                . *
              </label>
            </div>
            {errors.consentRodo && (
              <p id="footer-nl-rodo-error" className="text-xs text-red-400" role="alert">
                {errors.consentRodo.message}
              </p>
            )}

            <div className="flex items-start gap-2">
              <input
                id="footer-nl-consent-newsletter"
                type="checkbox"
                aria-invalid={!!errors.consentNewsletter}
                aria-describedby={errors.consentNewsletter ? "footer-nl-newsletter-error" : undefined}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-white/20 bg-white/10 text-mustard focus:ring-2 focus:ring-mustard/30 focus:ring-offset-0 focus:ring-offset-graphite"
                {...register("consentNewsletter")}
              />
              <label htmlFor="footer-nl-consent-newsletter" className="text-xs leading-relaxed text-white/50">
                Wyrażam zgodę na otrzymywanie newslettera z informacjami o warsztatach i wydarzeniach. *
              </label>
            </div>
            {errors.consentNewsletter && (
              <p id="footer-nl-newsletter-error" className="text-xs text-red-400" role="alert">
                {errors.consentNewsletter.message}
              </p>
            )}
          </div>

          {status === "error" && errorMessage && (
            <div className="mt-3 flex items-start gap-2 rounded-none border border-red-400/30 bg-red-900/20 p-3" role="alert">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={1.5} />
              <p className="text-xs text-red-300">{errorMessage}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
