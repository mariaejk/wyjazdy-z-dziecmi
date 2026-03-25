import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { ROUTES } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";
import { getAllProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Inne projekty",
  description:
    "Poznaj inne projekty Marii Kordalewskiej — Joga z Marią i Enviar, firma z przesłaniem. Wellbeing, joga i eventy firmowe.",
};

function ProjectMedia({ project }: { project: Project }) {
  if (project.videoUrl) {
    return (
      <div className="mx-auto max-w-lg overflow-hidden rounded-none shadow-xl ring-1 ring-graphite/5 sm:max-w-md lg:w-96">
        <video
          controls
          playsInline
          preload="metadata"
          aria-label={`${project.title} — wideo`}
          className="w-full bg-graphite"
        >
          <source src={project.videoUrl} type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="relative h-72 w-56 overflow-hidden rounded-none shadow-lg sm:h-80 sm:w-64 lg:h-96 lg:w-72">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
          className="object-cover"
        />
      </div>
    );
  }

  return null;
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Strona główna", url: ROUTES.home },
          { name: "Inne projekty", url: ROUTES.projects },
        ])}
      />

      {/* Intro */}
      <SectionWrapper className="py-4 sm:py-6">
        <Container>
          <SectionHeading
            as="h1"
            title="Przestrzeń dobrego życia"
            subtitle="Inne projekty"
          />
          <ScrollAnimation variant="fadeUp">
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-graphite-light">
              Wierzę, że dobrostan to naczynie połączone. Dbanie o siebie, swoje
              emocje i relacje nie kończy się tylko na warsztatach dla rodziców.
              Od lat angażuję się również w inne inicjatywy, które pomagają
              odzyskiwać wewnętrzny spokój i budować silne więzi — zarówno
              w życiu prywatnym, jak i zawodowym. Poznaj moje pozostałe
              przestrzenie działań.
            </p>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Projects from CMS */}
      {projects.map((project, index) => (
        <SectionWrapper
          key={project.slug}
          variant={index % 2 === 0 ? "alternate" : "default"}
          className="py-6 sm:py-8"
        >
          <Container>
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
              {/* Media — left side */}
              <ScrollAnimation variant="fadeLeft" className="shrink-0">
                <ProjectMedia project={project} />
              </ScrollAnimation>

              {/* Text — right side */}
              <ScrollAnimation variant="fadeRight" delay={0.15} className="flex-1">
                <h2 className="font-heading text-2xl font-light sm:text-3xl">
                  <span className="text-moss">{project.title}</span>
                </h2>
                <p className="mt-1 text-base text-graphite-light">
                  {project.tagline}
                </p>

                {project.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-graphite-light"
                  >
                    {p}
                  </p>
                ))}

                {project.links.length > 0 && (
                  <>
                    <p className="mt-6 text-sm font-medium text-graphite">
                      {project.links.length > 1
                        ? "Dołącz do mojej społeczności:"
                        : "Zobacz więcej:"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <Button
                          key={link.url}
                          variant="secondary"
                          size="sm"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label} (otwiera się w nowej karcie)`}
                          icon={<ExternalLink className="h-4 w-4" strokeWidth={1.5} />}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </ScrollAnimation>
            </div>
          </Container>
        </SectionWrapper>
      ))}
    </>
  );
}
