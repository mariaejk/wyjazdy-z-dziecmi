import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";
import { getTeamMember } from "@/data/team";

export async function AboutTeaser() {
  const maria = await getTeamMember("Maria Kordalewska");
  if (!maria) return null;

  const bioText = maria.shortBio ?? maria.bio;
  const paragraphs = bioText.split(/\n\n+/).filter(Boolean);

  return (
    <SectionWrapper variant="alternate">
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Large photo */}
          <ScrollAnimation variant="fadeLeft" className="shrink-0">
            <div className="relative h-80 w-64 overflow-hidden rounded-none sm:h-[420px] sm:w-80 lg:h-[500px] lg:w-96">
              {maria.image && (
                <Image
                  src={maria.image}
                  alt={maria.name}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                />
              )}
            </div>
          </ScrollAnimation>

          {/* Text */}
          <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-graphite-light">
              Poznajmy się
            </p>
            <h2 className="mt-2 font-heading text-2xl font-light text-graphite sm:text-3xl">
              <span className="text-moss">{maria.name}</span>
            </h2>

            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-base leading-relaxed text-graphite-light"
              >
                {p}
              </p>
            ))}

            <div className="mt-8">
              <Button href={ROUTES.about} variant="secondary">
                Poznaj mnie bliżej
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
