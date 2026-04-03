import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { TripCardHorizontal } from "@/components/home/TripCardHorizontal";
import { JoinUsNewsletter } from "@/components/shared/JoinUsNewsletter";
import { BenefitCards } from "@/components/shared/BenefitCards";
import { getUpcomingTripsByCategory } from "@/data/trips";
import { getBenefitsByCategory } from "@/data/benefits";
import { ROUTES } from "@/lib/constants";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Single z dziećmi",
  description:
    "Warsztaty dla samodzielnych rodziców z dziećmi. Bezpieczna przestrzeń, wsparcie i czas pełen bliskości w otoczeniu natury.",
  robots: { index: false },
};

export default async function SingleParentsPage() {
  const trips = await getUpcomingTripsByCategory("single-parents");
  const benefits = await getBenefitsByCategory("single-parents");

  return (
    <>
      {/* Hero */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-light text-graphite sm:text-5xl lg:text-6xl">
                Single z dziećmi
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Warsztaty stworzone z myślą o samodzielnych i o samotnych
                rodzicach i ich dzieciach. Bez względu na to, do której kategorii
                siebie zaliczasz, zapraszamy Cię do przestrzeni pełnej zrozumienia
                i wsparcia. Gdzie możesz przez chwilę odetchnąć, zobaczyć, że nie
                jesteś sam w swojej walce, bo inni są na tym samym froncie.
                Inaczej spojrzeć na siebie i swoje dziecko. To też przestrzeń
                budowania relacji, bo w końcu nie jesteśmy tylko rodzicami.
              </p>
            </div>
            <div className="relative mx-auto mt-8 aspect-[4/3] max-w-2xl overflow-hidden rounded-none">
              <Image
                src="/images/okladka-single-z-dziecmi-hero.jpeg"
                alt="Rodzina na kajakach — warsztaty dla singli z dziećmi"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits from CMS */}
      {benefits && (
        <SectionWrapper className="py-6 sm:py-8">
          <Container>
            <BenefitCards benefits={benefits} />
          </Container>
        </SectionWrapper>
      )}

      {/* Trips or Join Us */}
      {trips.length > 0 ? (
        <SectionWrapper className="bg-moss/10 py-6 sm:py-8">
          <Container>
            <SectionHeading
              title="Nadchodzące"
              italicText="warsztaty"
              underline
              subtitle="Wybierz termin i dołącz do nas"
            />
            <div className="mx-auto max-w-4xl space-y-6">
              {trips.map((trip, index) => (
                <ScrollAnimation key={trip.slug} delay={index * 0.12}>
                  <TripCardHorizontal trip={trip} />
                </ScrollAnimation>
              ))}
            </div>
            <div className="mt-10 text-center">
              <ScrollAnimation variant="fadeUp" delay={0.3}>
                <Button href={ROUTES.trips} variant="secondary">
                  Zobacz wszystkie warsztaty
                </Button>
              </ScrollAnimation>
            </div>
          </Container>
        </SectionWrapper>
      ) : (
        <JoinUsNewsletter className="bg-moss/10" />
      )}
    </>
  );
}
