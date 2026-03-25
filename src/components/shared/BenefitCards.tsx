import {
  Heart,
  Shield,
  Users,
  TreePine,
  Smile,
  Sparkles,
  Music,
  Sun,
  Flower2,
  Coffee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { CategoryBenefits } from "@/data/benefits";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Shield,
  Users,
  TreePine,
  Smile,
  Sparkles,
  Music,
  Sun,
  Flower2,
  Coffee,
};

interface BenefitCardsProps {
  benefits: CategoryBenefits;
}

export function BenefitCards({ benefits }: BenefitCardsProps) {
  return (
    <>
      <ScrollAnimation variant="fadeUp">
        <SectionHeading
          title="Dlaczego"
          italicText="warto?"
          underline
          subtitle={benefits.subtitle}
        />
      </ScrollAnimation>

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.icon] ?? Heart;
            return (
              <ScrollAnimation
                key={benefit.title}
                variant="fadeUp"
                delay={index * 0.1}
                className="h-full"
              >
                <div className="flex h-full flex-col rounded-none border border-graphite/10 bg-white p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-moss/10">
                    <Icon className="h-6 w-6 text-moss" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-graphite">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-light">
                    {benefit.description}
                  </p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </>
  );
}
