"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

const passiveNewsletterSchema = z.object({
  email: z.string().email("Podaj prawidłowy adres e-mail"),
  consentRodo: z.literal(true, { error: "Zgoda jest wymagana" }),
  website: z.string(),
  turnstileToken: z.string().min(1).optional(),
});
type PassiveNewsletterValues = z.infer<typeof passiveNewsletterSchema>;

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
  } = useForm<PassiveNewsletterValues>({
    resolver: zodResolver(passiveNewsletterSchema),
    defaultValues: { email: "", consentRodo: false as unknown as true, website: "" },
  });

  const onSubmit = async (data: PassiveNewsletterValues) => {
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
    <section className="bg-parchment-dark py-8 sm:py-10" id="wyjazdy">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-2xl font-light text-graphite sm:text-3xl">
              Planujemy nowe terminy!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-graphite-light sm:text-base">
              W tej chwili nie mamy otwartych zapisów w tej kategorii. Zostaw
              swój e-mail, a w pierwszej kolejności dowiesz się, gdy pojawią się nowe warsztaty.
            </p>

            {status === "success" ? (
              <div className="mt-8 flex items-center justify-center gap-3 text-moss">
                <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                <p className="text-sm font-medium">
                  Gotowe! Powiadomimy Cię, gdy pojawią się nowe terminy.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-7"
                aria-label="Formularz powiadomień o nowych warsztatach"
              >
                <div className="mx-auto flex max-w-sm gap-2">
                  <div className="flex-1">
                    <label htmlFor="joinus-email" className="sr-only">
                      Adres e-mail
                    </label>
                    <input
                      id="joinus-email"
                      type="email"
                      placeholder="Twój adres e-mail"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "joinus-email-error" : undefined}
                      className="w-full rounded-none border border-graphite/20 bg-white px-4 py-3 text-sm text-graphite placeholder:text-graphite-light/60 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="joinus-email-error" className="mt-1 text-left text-xs text-red-600" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="shrink-0 rounded-none bg-moss px-5 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-moss-light disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "..." : "Powiadom mnie"}
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

                <div className="mx-auto mt-3 max-w-sm text-left">
                  <div className="flex items-start gap-2">
                    <input
                      id="joinus-consent-rodo"
                      type="checkbox"
                      aria-invalid={!!errors.consentRodo}
                      aria-describedby={errors.consentRodo ? "joinus-consent-rodo-error" : undefined}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-none border-graphite/20 text-moss focus:ring-2 focus:ring-moss/20 focus:ring-offset-0"
                      {...register("consentRodo")}
                    />
                    <label htmlFor="joinus-consent-rodo" className="text-xs leading-relaxed text-graphite-light">
                      Akceptuję{" "}
                      <a
                        href={ROUTES.privacy}
                        className="text-moss underline hover:text-moss-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Politykę Prywatności
                      </a>
                      . *
                    </label>
                  </div>
                  {errors.consentRodo && (
                    <p id="joinus-consent-rodo-error" className="mt-1 text-xs text-red-600" role="alert">
                      {errors.consentRodo.message}
                    </p>
                  )}
                </div>

                {status === "error" && errorMessage && (
                  <div className="mx-auto mt-4 flex max-w-sm items-start gap-2 rounded-none border border-red-200 bg-red-50 p-3" role="alert">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" strokeWidth={1.5} />
                    <p className="text-xs text-red-700">{errorMessage}</p>
                  </div>
                )}
              </form>
            )}

            <div className="mt-8 border-t border-graphite/10 pt-8">
              <p className="mb-4 text-sm leading-relaxed text-graphite-light sm:text-base">
                Szukasz czegoś dostępnego teraz?
              </p>
              <Button href={ROUTES.trips}>
                Zobacz wszystkie warsztaty
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
