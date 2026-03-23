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
    image: "/images/hero.jpg",
    alt: "Rodzinne warsztaty wyjazdowe w naturze",
  },
  {
    label: "Dla matki i córki",
    href: ROUTES.motherDaughter,
    image: "/images/matki-corki-1.jpg",
    alt: "Warsztaty matka i córka",
  },
  {
    label: "Samodzielny rodzic",
    href: ROUTES.singleParents,
    image: "/images/przeszly-1.jpg",
    alt: "Warsztaty dla singli z dziećmi w naturze",
  },
  {
    label: "Czas bez dzieci",
    href: ROUTES.adultOnly,
    image: "/images/kazce-bagno-1.jpg",
    alt: "Warsztaty wyjazdowe dla dorosłych",
  },
];

export function CategoryCards() {
  return (
    <SectionWrapper className="py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          overline="Odkryj nasze"
          title="Najczęściej wybierane"
          italicText="warsztaty"
        />
        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10"
          role="region"
          aria-label="Kategorie warsztatów"
        >
          {categories.map((cat, index) => (
            <ScrollAnimation
              key={cat.href}
              variant="fadeUp"
              delay={index * 0.12}
              className="h-full"
            >
              <Link
                href={cat.href}
                className="group flex flex-col gap-5"
              >
                {/* Photo — vertical 3:4, no overlay */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-parchment-dark">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(max-width: 640px) calc(50vw - 1.5rem), calc(25vw - 2rem)"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Text under photo */}
                <div className="flex flex-col text-center">
                  <h3 className="font-heading text-xl font-light italic text-graphite sm:text-2xl">
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
