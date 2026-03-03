import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { StructuredData } from "@/components/shared/StructuredData";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktyczne wskazówki dla rodziców — jak przygotować dziecko na wyjazd warsztatowy, radzenie sobie z tęsknotą i więcej.",
};

const sections = [
  {
    title: "Zrozum emocje dziecka (i swoje)",
    paragraphs: [
      "Dzieci przed pierwszym wyjazdem często czują mieszankę radości, ciekawości i niepokoju, a lekkie objawy lęku separacyjnego są w takim momencie zupełnie normalne. Badania i praktyka psychologów pokazują, że to, jak dorosły reaguje na te emocje, ma ogromny wpływ na to, jak dziecko poradzi sobie z rozstaniem.",
      `Nie warto udawać, że trudnych uczuć nie ma — lepiej je nazwać: \u201EWidzę, że trochę się boisz spania poza domem, to normalne przed czymś nowym\u201D. Z drugiej strony ważne jest, aby rodzic na zewnątrz był spokojny i pewny decyzji, bo dziecko bardzo mocno \u201Eczyta\u201D nasz niepokój.`,
    ],
  },
  {
    title: "Rozmawiaj i oswajaj nową sytuację",
    paragraphs: [
      "Dzieci mniej boją się tego, co rozumieją i potrafią sobie wyobrazić. Warto razem obejrzeć stronę organizatora, zdjęcia miejsca i przykładowy plan dnia. Opowiedzieć, jak mogą wyglądać poranki, zajęcia, posiłki, wieczorne ogniska czy krąg na zakończenie dnia.",
      "Dobrze jest też otwarcie poruszyć temat tęsknoty — wyjaśnić, że większość dzieci choć trochę tęskni, ale uczucie to zwykle mija po pierwszych dniach, gdy wciągną ich nowe aktywności. Możesz podzielić się własną historią: kiedy Ty tęskniłaś/eś i co Ci wtedy pomogło.",
    ],
  },
  {
    title: "Pracuj z lękiem separacyjnym",
    paragraphs: [
      "Psycholodzy podkreślają, że łagodne rytuały rozstań i przewidywalność bardzo zmniejszają lęk separacyjny. Pomaga jasna informacja: kiedy wyjazd, jak długo potrwa, kto będzie z dzieckiem. Stały, krótki rytuał pożegnania zamiast długiego, przeciąganego rozstania.",
      `Specjaliści odradzają zdanie \u201EJeśli będzie źle, przyjadę od razu i zabiorę cię do domu\u201D, bo nasila ono skupienie na lęku. Lepiej powiedzieć: \u201EWiem, że dasz sobie radę, a jeśli będzie ci trudno, porozmawiaj z opiekunem — oni są tam po to, żeby ci pomóc\u201D.`,
    ],
  },
  {
    title: "Zrób małe próby przed wyjazdem",
    paragraphs: [
      `Wielu wychowawców rekomenduje stopniowe oswajanie dziecka z nocowaniem poza domem. Możesz zorganizować kilka nocowań u dziadków, cioci czy zaprzyjaźnionej rodziny. Spróbować \u201Epół-wyjazdu\u201D — np. jednodniowe warsztaty bez rodziców.`,
      `Takie doświadczenia budują w dziecku poczucie: \u201EJuż to kiedyś zrobiłem/am, poradziłem/am sobie — dam radę znowu\u201D.`,
    ],
  },
  {
    title: "Włącz dziecko w przygotowania i pakowanie",
    paragraphs: [
      `Eksperci podkreślają, że dziecko powinno aktywnie uczestniczyć w pakowaniu, a nie tylko dostać \u201Egotową walizkę\u201D. Wspólne przygotowania dają dziecku poczucie kontroli i sprawczości, pomagają zapamiętać, co jest gdzie spakowane, i zamieniają stres w konkretne działanie.`,
      `Jeśli organizator na to pozwala, spakuj dziecku \u201Ekawałek domu\u201D: małego pluszaka, małą poduszkę czy zdjęcie rodziny — takie przedmioty bardzo pomagają w chwilach tęsknoty.`,
    ],
  },
  {
    title: "Zadbaj też o siebie jako rodzica",
    paragraphs: [
      "To, jak rodzic radzi sobie ze swoim lękiem, bardzo wpływa na doświadczenie dziecka. Warto porozmawiać z innymi rodzicami, którzy mają to już za sobą, i jasno przypomnieć sobie, dlaczego ten wyjazd jest ważny.",
      "Kiedy dziecko widzi, że rodzic ufa kadrze, decyzji o wyjeździe i własnemu dziecku, znacznie łatwiej wchodzi w nowe środowisko z ciekawością zamiast ze strachem.",
    ],
  },
];

export default function BlogPage() {
  return (
    <>
      <StructuredData data={getBreadcrumbSchema([
        { name: "Strona główna", url: SITE_CONFIG.url },
        { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
      ])} />

      <SectionWrapper>
        <Container>
          <ScrollAnimation variant="fadeUp">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                as="h1"
                title="Blog"
                subtitle="Praktyczne wskazówki dla rodziców"
              />
            </div>
          </ScrollAnimation>
        </Container>
      </SectionWrapper>

      <SectionWrapper variant="alternate">
        <Container>
          <article className="mx-auto max-w-3xl">
            <ScrollAnimation variant="fadeUp">
              <h2 className="font-heading text-3xl font-bold text-graphite sm:text-4xl">
                Jak przygotować dziecko na pierwszy wyjazd warsztatowy
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-graphite-light">
                Pierwszy wyjazd warsztatowy to duży krok w stronę samodzielności
                dziecka, ale też spore emocje dla rodziców. Dobra przygotówka
                &mdash; zwłaszcza emocjonalna &mdash; zmniejsza ryzyko silnej
                tęsknoty i pomaga zamienić lęk w ekscytację.
              </p>
            </ScrollAnimation>

            <div className="mt-12 space-y-12">
              {sections.map((section, index) => (
                <ScrollAnimation key={section.title} variant="fadeUp" delay={index * 0.05}>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-graphite">
                      {section.title}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-base leading-relaxed text-graphite-light"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation variant="fadeUp">
              <div className="mt-16 rounded-2xl border border-graphite/10 bg-white p-6 sm:p-8">
                <h3 className="font-heading text-xl font-bold text-graphite">
                  Chcesz więcej praktycznych wskazówek?
                </h3>
                <p className="mt-2 text-base text-graphite-light">
                  Pobierz nasz darmowy poradnik PDF z checklistą pakowania
                  i wskazówkami, jak przygotować dziecko na wyjazd.
                </p>
                <NewsletterForm />
              </div>
            </ScrollAnimation>
          </article>
        </Container>
      </SectionWrapper>
    </>
  );
}
