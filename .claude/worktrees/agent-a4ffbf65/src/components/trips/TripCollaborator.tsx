import Image from "next/image";
import type { TripCollaborator as TripCollaboratorType } from "@/types/trip";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";

type TripCollaboratorProps = {
  collaborator: TripCollaboratorType;
};

export function TripCollaborator({ collaborator }: TripCollaboratorProps) {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <SectionHeading title="Prowadząca" />
        <ScrollAnimation>
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {collaborator.image && (
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={collaborator.image}
                    alt={collaborator.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-heading text-xl font-bold text-graphite sm:text-2xl">
                  {collaborator.name}
                </h3>
                <p className="mt-3 leading-relaxed text-graphite-light">
                  {collaborator.bio}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </SectionWrapper>
  );
}
