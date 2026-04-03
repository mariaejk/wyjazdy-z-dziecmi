import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { ROUTES } from "@/lib/constants";

const categories = [
  {
    label: "Rodzinny czas",
    href: ROUTES.familyTrips,
    image: "/images/okladka-rodzinny-czas-hero.jpeg",
    alt: "Rodziny na warsztatach w naturze — wspólne zajęcia na łące",
  },
  {
    label: "Matka i córka",
    href: ROUTES.motherDaughter,
    image: "/images/okladka-matki-hero.jpeg",
    alt: "Warsztaty matka i córka — kobiety na drewnianej podłodze",
  },
  {
    label: "Single z dziećmi",
    href: ROUTES.singleParents,
    image: "/images/okladka-single-z-dziecmi-hero.jpeg",
    alt: "Rodzina na kajakach — warsztaty dla singli z dziećmi",
  },
  {
    label: "Czas bez dzieci",
    href: ROUTES.adultOnly,
    image: "/images/marysia_single.jpeg",
    alt: "Marysia na huśtawce — warsztaty wyjazdowe dla dorosłych",
  },
];

export function CategoryCards() {
  return (
    <SectionWrapper className="py-6 sm:py-8">
      <Container>
        <SectionHeading title="Najczęściej wybierane" italicText="warsztaty" underline />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6" role="region" aria-label="Kategorie warsztatów">
          {categories.map((cat, index) => (
            <ScrollAnimation
              key={cat.href}
              variant="fadeUp"
              delay={index * 0.12}
              className="h-full"
            >
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-none border border-graphite/10 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-[3/2]">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 1.5rem), calc(25vw - 2rem)"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-graphite/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-heading text-xl font-light text-white sm:text-2xl">
                    {cat.label}
                  </h3>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
