"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations/newsletter";
import { analytics } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function JoinUsNewsletter() {
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
    <section className="bg-graphite py-16 sm:py-20" id="wyjazdy">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-light text-white sm:text-4xl lg:text-5xl">
              Dołącz do nas
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Zapisz się do naszego newslettera i bądź na bieżąco z wszystkimi wydarzeniami
            </p>

            {status === "success" ? (
              <div className="mt-8 flex items-center justify-center gap-3 text-moss-light">
                <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                <p className="text-sm font-medium">
                  Dziękujemy za zapisanie się! Będziemy informować o nowych warsztatach.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-8"
                aria-label="Formularz zapisu na newsletter"
              >
                <div className="mx-auto flex max-w-md gap-2">
                  <div className="flex-1">
                    <label htmlFor="joinus-email" className="sr-only">
                      Adres e-mail
                    </label>
                    <input
                      id="joinus-email"
                      type="email"
                      placeholder="Twój email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "joinus-email-error" : undefined}
                      className="w-full rounded-none border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-mustard focus:outline-none focus:ring-2 focus:ring-mustard/30"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="joinus-email-error" className="mt-1 text-left text-xs text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="shrink-0 rounded-none bg-mustard px-6 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-graphite transition-colors hover:bg-mustard/90 disabled:cursor-not-allowed disabled:opacity-60"
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

                <div className="mx-auto mt-4 max-w-md space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    <input
                      id="joinus-consent-rodo"
                      type="checkbox"
                      aria-invalid={!!errors.consentRodo}
                      aria-describedby={errors.consentRodo ? "joinus-consent-rodo-error" : undefined}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-white/20 bg-white/10 text-mustard focus:ring-2 focus:ring-mustard/30 focus:ring-offset-0 focus:ring-offset-graphite"
                      {...register("consentRodo")}
                    />
                    <label htmlFor="joinus-consent-rodo" className="text-xs leading-relaxed text-white/60">
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
                    <p id="joinus-consent-rodo-error" className="text-xs text-red-400" role="alert">
                      {errors.consentRodo.message}
                    </p>
                  )}

                  <div className="flex items-start gap-2">
                    <input
                      id="joinus-consent-newsletter"
                      type="checkbox"
                      aria-invalid={!!errors.consentNewsletter}
                      aria-describedby={errors.consentNewsletter ? "joinus-consent-newsletter-error" : undefined}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-white/20 bg-white/10 text-mustard focus:ring-2 focus:ring-mustard/30 focus:ring-offset-0 focus:ring-offset-graphite"
                      {...register("consentNewsletter")}
                    />
                    <label htmlFor="joinus-consent-newsletter" className="text-xs leading-relaxed text-white/60">
                      Wyrażam zgodę na otrzymywanie newslettera z informacjami o warsztatach i wydarzeniach. *
                    </label>
                  </div>
                  {errors.consentNewsletter && (
                    <p id="joinus-consent-newsletter-error" className="text-xs text-red-400" role="alert">
                      {errors.consentNewsletter.message}
                    </p>
                  )}
                </div>

                {status === "error" && errorMessage && (
                  <div className="mx-auto mt-4 flex max-w-md items-start gap-2 rounded-none border border-red-400/30 bg-red-900/20 p-3" role="alert">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={1.5} />
                    <p className="text-xs text-red-300">{errorMessage}</p>
                  </div>
                )}
              </form>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button href={ROUTES.trips} variant="secondary">
                Zobacz wszystkie warsztaty
              </Button>
              <Button href={ROUTES.contact} variant="secondary">
                Napisz do nas
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
