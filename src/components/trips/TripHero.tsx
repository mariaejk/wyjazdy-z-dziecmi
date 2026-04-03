import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { formatDate } from "@/lib/utils";

type TripHeroProps = {
  title: string;
  subtitle: string;
  date: string;
  dateEnd: string;
  location: string;
  image: string;
  imagePosition?: "center" | "top" | "bottom";
  isPast: boolean;
  spotsLeft?: number;
};

const POSITION_CLASS = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export function TripHero({
  title,
  subtitle,
  date,
  dateEnd,
  location,
  image,
  imagePosition = "center",
  isPast,
  spotsLeft,
}: TripHeroProps) {
  const isSoldOut = spotsLeft === 0;
  const ctaHref = isSoldOut ? "#lista-oczekujacych" : "#formularz";
  const ctaLabel = isSoldOut ? "Zapisz się na listę oczekujących" : "Zapisz się";

  return (
    <>
      <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", POSITION_CLASS[imagePosition])}
        />
      </div>
      <SectionWrapper variant="alternate" className="py-6 sm:py-8">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-moss/10 text-graphite">
                <Calendar className="mr-1 h-3 w-3" strokeWidth={1.5} />
                {formatDate(date)} – {formatDate(dateEnd)}
              </Badge>
              <Badge className="bg-moss/10 text-graphite">
                <MapPin className="mr-1 h-3 w-3" strokeWidth={1.5} />
                {location}
              </Badge>
            </div>

            <h1 className="mt-4 font-heading text-3xl font-light text-graphite sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-lg text-graphite-light sm:text-xl">
              {subtitle}
            </p>

            {!isPast && (
              <div className="mt-6">
                <Button href={ctaHref}>{ctaLabel}</Button>
              </div>
            )}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
