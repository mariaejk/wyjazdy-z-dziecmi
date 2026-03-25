"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { analytics } from "@/lib/analytics";
import type { FAQItem } from "@/data/faq";

interface HomeFAQProps {
  faqData: FAQItem[];
}

export function HomeFAQ({ faqData }: HomeFAQProps) {
  const accordionItems = faqData.map((item, i) => ({
    id: `faq-${i + 1}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <SectionWrapper variant="alternate" id="faq">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Najczęściej zadawane"
            italicText="pytania"
            underline
          />
        </ScrollAnimation>

        <div className="mx-auto max-w-3xl">
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <Accordion
              items={accordionItems}
              onToggle={(_id, title) => analytics.faqClick(title)}
            />
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
