import type { ReactNode } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import type { TeamMember } from "@/types/team";

function renderBoldText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-graphite font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

type PersonBioProps = {
  member: TeamMember;
  variant?: "default" | "alternate";
  imagePosition?: "left" | "right";
  hideNameHeading?: boolean;
  children?: ReactNode;
};

export function PersonBio({
  member,
  variant = "default",
  imagePosition = "left",
  hideNameHeading = false,
  children,
}: PersonBioProps) {
  const paragraphs = member.bio.split("\n\n");

  return (
    <SectionWrapper variant={variant}>
      <Container>
        <div
          className={cn(
            "flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-14",
            imagePosition === "right" && "lg:flex-row-reverse",
          )}
        >
          {/* Photo — large rounded rectangle */}
          <ScrollAnimation
            variant={imagePosition === "left" ? "fadeLeft" : "fadeRight"}
            className="shrink-0"
          >
            {member.image ? (
              <div className="relative h-80 w-64 overflow-hidden rounded-3xl bg-parchment-dark shadow-xl sm:h-[420px] sm:w-80 lg:h-[500px] lg:w-96">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-80 w-64 items-center justify-center rounded-3xl bg-moss/10 lg:h-[500px] lg:w-96">
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
            {!hideNameHeading && (
              <h2 className="font-heading text-2xl font-bold text-graphite sm:text-3xl">
                {member.name}
              </h2>
            )}
            <p className={cn(
              "text-sm font-medium tracking-wide text-moss uppercase",
              hideNameHeading ? "font-heading text-xl font-bold sm:text-2xl" : "mt-1",
            )}>
              {member.role}
            </p>
            <div className="mt-4 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-graphite-light sm:text-lg"
                >
                  {renderBoldText(paragraph)}
                </p>
              ))}
            </div>
            {children && <div className="mt-6">{children}</div>}
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
