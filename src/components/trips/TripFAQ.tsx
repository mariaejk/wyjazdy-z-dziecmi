"use client";

import type { TripFAQ as TripFAQType } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { Accordion } from "@/components/ui/Accordion";
import { analytics } from "@/lib/analytics";

type TripFAQProps = {
  items: TripFAQType[];
};

export function TripFAQ({ items }: TripFAQProps) {
  const accordionItems = items.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading title="Najczęściej zadawane pytania" />
        <div className="mx-auto max-w-3xl">
          <ScrollAnimation>
            <div className="rounded-2xl bg-white px-5 shadow-sm sm:px-6 lg:px-8">
              <Accordion
                items={accordionItems}
                onToggle={(_id, title) => analytics.faqClick(title)}
              />
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
