import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { ContentBlock } from "@/types/trip";

type TripDescriptionProps = {
  shortDescription: string;
  longDescription: string;
  contentBlocks?: ContentBlock[];
};

export function TripDescription({
  shortDescription,
  longDescription,
  contentBlocks,
}: TripDescriptionProps) {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="O wyjeździe" />
        <div className="mx-auto max-w-3xl">
          <ScrollAnimation>
            <p className="text-lg font-medium leading-relaxed text-graphite sm:text-xl">
              {shortDescription}
            </p>
          </ScrollAnimation>

          {contentBlocks && contentBlocks.length > 0 ? (
            <div className="mt-8 space-y-6">
              {contentBlocks.map((block, index) =>
                block.type === "text" ? (
                  <ScrollAnimation key={index} delay={index * 0.05}>
                    <p className="leading-relaxed text-graphite-light">
                      {block.text}
                    </p>
                  </ScrollAnimation>
                ) : (
                  <ScrollAnimation key={index} delay={index * 0.05}>
                    <div className="overflow-hidden rounded-none">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={800}
                        height={500}
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </ScrollAnimation>
                ),
              )}
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {longDescription
                .split("\n\n")
                .filter(Boolean)
                .map((paragraph, index) => (
                  <ScrollAnimation key={index} delay={index * 0.1}>
                    <p className="leading-relaxed text-graphite-light">
                      {paragraph}
                    </p>
                  </ScrollAnimation>
                ))}
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
