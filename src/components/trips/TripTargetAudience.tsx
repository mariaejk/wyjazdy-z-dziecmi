import { Heart } from "lucide-react";
import type { TripTargetAudience as TripTargetAudienceType } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripTargetAudienceProps = {
  items: TripTargetAudienceType[];
};

export function TripTargetAudience({ items }: TripTargetAudienceProps) {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="Dla kogo?" />
        <div className="mx-auto max-w-2xl space-y-4">
          {items.map((item, index) => (
            <ScrollAnimation key={item.label} delay={index * 0.15}>
              <div className="flex items-start gap-3 rounded-none bg-white p-4 shadow-sm sm:p-5">
                <Heart
                  className="mt-0.5 h-5 w-5 shrink-0 text-moss"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="font-medium text-graphite">{item.label}</p>
                  {item.description && (
                    <p className="mt-1 text-sm text-graphite-light">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
