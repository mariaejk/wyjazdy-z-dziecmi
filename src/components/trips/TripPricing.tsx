import type { TripPricing as TripPricingType } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

type TripPricingProps = {
  pricing: TripPricingType[];
  deposit: number;
};

export function TripPricing({ pricing, deposit }: TripPricingProps) {
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
              <Button href="#formularz" size="lg">
                Zapisz się na wyjazd
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
