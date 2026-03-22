import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { TeamMember } from "@/types/team";

type PersonBioProps = {
  member: TeamMember;
  variant?: "default" | "alternate";
  imagePosition?: "left" | "right";
};

export function PersonBio({
  member,
  variant = "default",
  imagePosition = "left",
}: PersonBioProps) {
  const paragraphs = member.bio.split("\n\n");

  return (
    <SectionWrapper variant={variant}>
      <Container>
        <div
          className={cn(
            "flex flex-col items-center gap-8 lg:flex-row lg:gap-12",
            imagePosition === "right" && "lg:flex-row-reverse",
          )}
        >
          {/* Avatar */}
          <ScrollAnimation
            variant={imagePosition === "left" ? "fadeLeft" : "fadeRight"}
            className="shrink-0"
          >
            {member.image ? (
              <div className="relative h-72 w-56 overflow-hidden rounded-3xl shadow-lg sm:h-80 sm:w-64 lg:h-96 lg:w-72">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-72 w-56 items-center justify-center rounded-3xl bg-moss/10 lg:h-96 lg:w-72">
                <User
                  className="h-20 w-20 text-moss/60"
                  strokeWidth={1.5}
                />
              </div>
            )}
          </ScrollAnimation>

          {/* Bio Text */}
          <ScrollAnimation
            variant={imagePosition === "left" ? "fadeRight" : "fadeLeft"}
            delay={0.15}
            className="flex-1"
          >
            <h2 className="font-heading text-2xl font-bold text-graphite sm:text-3xl">
              {member.name}
            </h2>
            <p className="mt-1 text-sm font-medium tracking-wide text-moss uppercase">
              {member.role}
            </p>
            <div className="mt-4 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-graphite-light sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
