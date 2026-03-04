import type { TripPricing as TripPricingType } from "@/types/trip";
import { Check, MessageCircle, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { Button } from "@/components/ui/Button";
import { PhoneLink } from "@/components/trips/PhoneLink";
import { cn, formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

type TripPricingProps = {
  pricing: TripPricingType[];
  deposit: number;
  spotsTotal?: number;
  spotsLeft?: number;
  priceIncludes?: string[];
  priceExcludes?: string[];
};

export function TripPricing({ pricing, deposit, spotsTotal, spotsLeft, priceIncludes, priceExcludes }: TripPricingProps) {
  const showAvailability =
    spotsTotal !== undefined && spotsLeft !== undefined && spotsLeft > 0;
  const isLow = spotsLeft !== undefined && spotsLeft <= 3;

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading title="Twoja inwestycja" />
        <div className="mx-auto max-w-2xl">
          <ScrollAnimation>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-graphite/10">
                    <th className="px-5 py-4 text-left text-sm font-medium text-graphite-light sm:px-6">
                      Wariant
                    </th>
                    <th className="px-5 py-4 text-right text-sm font-medium text-graphite-light sm:px-6">
                      Cena
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite/10">
                  {pricing.map((item) => (
                    <tr key={item.label}>
                      <td className="px-5 py-4 text-graphite sm:px-6">
                        {item.label}
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-moss sm:px-6">
                        {formatCurrency(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollAnimation>

          {/* Price includes/excludes */}
          {(priceIncludes || priceExcludes) && (
            <ScrollAnimation delay={0.1}>
              <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
                {priceIncludes && priceIncludes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-graphite">Cena zawiera:</p>
                    <ul className="mt-2 space-y-1.5">
                      {priceIncludes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-graphite-light">
                          <Check className="h-4 w-4 shrink-0 text-moss" strokeWidth={1.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {priceExcludes && priceExcludes.length > 0 && (
                  <div className={priceIncludes ? "mt-4" : ""}>
                    <p className="text-sm font-medium text-graphite">Dodatkowo płatne:</p>
                    <ul className="mt-2 space-y-1.5">
                      {priceExcludes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-graphite-light">
                          <X className="h-4 w-4 shrink-0 text-graphite-light/60" strokeWidth={1.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          )}

          {/* Availability bar */}
          {showAvailability && (
            <ScrollAnimation delay={0.1}>
              <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-graphite">
                    Zostało{" "}
                    <span className={isLow ? "font-bold text-amber-600" : "font-medium text-moss"}>
                      {spotsLeft} z {spotsTotal}
                    </span>{" "}
                    miejsc
                  </span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-graphite/10"
                  role="progressbar"
                  aria-valuenow={spotsLeft}
                  aria-valuemin={0}
                  aria-valuemax={spotsTotal}
                  aria-label={`Dostępność: ${spotsLeft} z ${spotsTotal} miejsc`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isLow ? "bg-amber-500" : "bg-moss",
                    )}
                    style={{ width: `${((spotsTotal! - spotsLeft!) / spotsTotal!) * 100}%` }}
                  />
                </div>
              </div>
            </ScrollAnimation>
          )}

          {deposit > 0 && (
            <ScrollAnimation delay={0.15}>
              <p className="mt-4 text-center text-graphite-light">
                Zaliczka gwarantująca miejsce:{" "}
                <span className="font-medium text-moss">
                  {formatCurrency(deposit)}
                </span>
              </p>
            </ScrollAnimation>
          )}

          <ScrollAnimation delay={0.3}>
            <div className="mt-8 text-center">
              <Button href={spotsLeft === 0 ? "#lista-oczekujacych" : "#formularz"} size="lg">
                {spotsLeft === 0 ? "Zapisz się na listę oczekujących" : "Zapisz się na wyjazd"}
              </Button>

              {/* Soft CTA */}
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
                <PhoneLink />
                <Button href={ROUTES.contact} variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  Napisz do nas
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
