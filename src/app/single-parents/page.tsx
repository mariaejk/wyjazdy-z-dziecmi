import type { Metadata } from "next";
import { Heart, Shield, Users, TreePine, Smile, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { ROUTES, SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Single Parents",
  description:
    "Wyjazdy dla samodzielnych rodzic\u00F3w z dzie\u0107mi. Odpoczynek, wsparcie i czas pe\u0142en blisko\u015Bci w otoczeniu natury.",
};

const benefits = [
  {
    icon: Heart,
    title: "Czas tylko dla Was",
    description:
      "Wyjazdy zaprojektowane tak, aby\u015B m\u00F3g\u0142/mog\u0142a cieszy\u0107 si\u0119 czasem z dzieckiem bez po\u015Bpiechu i codziennych obowi\u0105zk\u00F3w.",
  },
  {
    icon: Shield,
    title: "Bezpieczna przestrze\u0144",
    description:
      "Kameralna grupa, w kt\u00F3rej ka\u017Cdy jest mile widziany. Bez oceniania, z pe\u0142nym szacunkiem dla Twojej historii.",
  },
  {
    icon: Users,
    title: "Spo\u0142eczno\u015B\u0107",
    description:
      "Mo\u017Cliwo\u015B\u0107 poznania innych rodzic\u00F3w w podobnej sytuacji. Wsp\u00F3lne do\u015Bwiadczenia buduj\u0105 trwa\u0142e relacje.",
  },
  {
    icon: TreePine,
    title: "Natura leczy",
    description:
      "Las, jezioro, cisza \u2014 przyroda daje si\u0142\u0119 i spok\u00F3j, kt\u00F3rych tak bardzo potrzebujesz.",
  },
  {
    icon: Smile,
    title: "Zabawa i rozw\u00F3j",
    description:
      "Warsztaty kreatywne, ruch i zabawy na \u015Bwie\u017Cym powietrzu \u2014 dzieci poznaj\u0105 nowych przyjaci\u00F3\u0142.",
  },
  {
    icon: Sparkles,
    title: "Chwila dla Ciebie",
    description:
      "W programie znajdziesz czas na jog\u0119, relaks i oddech \u2014 bo Ty te\u017C zas\u0142ugujesz na regeneracj\u0119.",
  },
];

export default function SingleParentsPage() {
  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Single Parents", url: `${SITE_CONFIG.url}/single-parents` },
      ])} />

      {/* Hero */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold text-graphite sm:text-5xl lg:text-6xl">
                Single Parents
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-graphite-light sm:text-xl">
                Samodzielne rodzicielstwo to codzienne wyzwanie. Wiemy, \u017Ce potrzebujesz
                chwili wytchnienia &mdash; i \u017Ce zas\u0142ugujesz na ni\u0105 razem ze swoim dzieckiem.
                Nasze wyjazdy to bezpieczna przestrze\u0144, w kt\u00F3rej mo\u017Cesz odpocz\u0105\u0107,
                odetchn\u0105\u0107 i po prostu by\u0107.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* Benefits */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <SectionHeading
              title="Dlaczego warto?"
              subtitle="Wyjazdy dopasowane do potrzeb samodzielnych rodzic\u00F3w"
            />
          </ScrollAnimation>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <ScrollAnimation
                  key={benefit.title}
                  variant="fadeUp"
                  delay={index * 0.1}
                >
                  <div className="rounded-2xl border border-graphite/10 bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-moss/10">
                      <benefit.icon
                        className="h-6 w-6 text-moss"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-graphite">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite-light">
                      {benefit.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Experience Description */}
      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Jak wygl\u0105da wyjazd?
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-graphite-light">
                <p>
                  Ka\u017Cdy dzie\u0144 zaczyna si\u0119 spokojnie &mdash; od porannej jogi lub
                  spaceru w ciszy. Potem warsztaty: kreatywne zaj\u0119cia dla dzieci
                  i doros\u0142ych, wsp\u00F3lne gotowanie, zabawy na \u015Bwie\u017Cym powietrzu.
                </p>
                <p>
                  Wieczorem ognisko, rozmowy i cisza. Bez po\u015Bpiechu, bez planu
                  dnia w\u0142o\u017Conego w ramki. Ka\u017Cdy mo\u017Ce uczestniczy\u0107 w swoim tempie.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="alternate">
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Do\u0142\u0105cz do nas
              </h2>
              <p className="mt-4 text-lg text-graphite-light">
                Sprawd\u017A dost\u0119pne terminy lub napisz do nas &mdash; pomo\u017Cemy
                znale\u017A\u0107 wyjazd idealny dla Ciebie i Twojego dziecka.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href={ROUTES.trips}>
                  Zobacz wyjazdy
                </Button>
                <Button href={ROUTES.contact} variant="secondary">
                  Napisz do nas
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>
    </>
  );
}
