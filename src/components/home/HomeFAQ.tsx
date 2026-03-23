"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { analytics } from "@/lib/analytics";

export const faqData = [
  {
    question: "Czy menu na wyjazdach uwzględnia alergie pokarmowe i specjalne diety dzieci?",
    answer:
      "Bezpieczeństwo i zdrowie naszych uczestników to priorytet. Podczas każdego wyjazdu zapewniamy pełne wyżywienie i zawsze dostosowujemy menu do specjalnych potrzeb dietetycznych, w tym alergii i nietolerancji pokarmowych. Przed wyjazdem poprosimy Cię o wypełnienie krótkiej ankiety, w której będziesz mogła/mógł zgłosić wszelkie wykluczenia z diety swojego dziecka oraz własnej.",
  },
  {
    question: "Co powinniśmy zabrać ze sobą na wyjazd?",
    answer:
      'Przed każdym wyjazdem wysyłamy uczestnikom maila z dokładnym planem oraz szczegółową listą rzeczy do spakowania. Ponieważ nasze wyjazdy odbywają się w otoczeniu natury i obfitują w aktywności ruchowe (takie jak joga, konie czy spacery po lesie), najważniejszy będzie wygodny strój sportowy, buty terenowe oraz odzież dostosowana do zmiennych warunków pogodowych. Dodatkowo, gorąco zachęcamy do pobrania naszego darmowego poradnika PDF \„Jak przygotować dziecko do wyjazdu warsztatowego\", który znajdziesz na dole naszej strony.',
  },
  {
    question: "Kto opiekuje się dziećmi, gdy odbywają się warsztaty przeznaczone tylko dla rodziców?",
    answer:
      "Wiemy, że aby rodzic mógł się zregenerować i skupić na sobie, musi mieć pewność, że jego dziecko jest w dobrych rękach. Podczas wyjazdów oferujemy zarówno zajęcia wspólne, integrujące rodzinę, jak i bloki warsztatowe dedykowane wyłącznie dla dorosłych. Kiedy Ty uczestniczysz w warsztatach rozwojowych, Twoje dziecko ma zapewnioną w pełni profesjonalną opiekę i bierze udział w dedykowanych, rozwijających zabawach.",
  },
  {
    question: "W jakim wieku powinny być dzieci, aby wziąć udział w wyjeździe?",
    answer:
      'Nasze wyjazdy są starannie profilowane, dlatego na stronach poszczególnych ofert (np. \„Wspólny Rytm\" dla matek i córek) zawsze znajdziesz informację o rekomendowanym wieku uczestników (np. 5+ lat). Dzięki temu mamy pewność, że program, zabawy oraz warsztaty będą idealnie dopasowane do możliwości i zainteresowań dzieci w danej grupie wiekowej.',
  },
  {
    question: "Jak wygląda przykładowy dzień podczas wyjazdu warsztatowego?",
    answer:
      "Każdy turnus ma swój unikalny temat i program, ale zawsze dbamy o zdrowy balans. Dzień zazwyczaj przeplata aktywności zorganizowane (poranna joga, warsztaty ceramiczne czy taniec) z czasem wolnym na swobodną zabawę i odpoczynek w naturze. Zapewniamy równowagę między ustrukturyzowanym harmonogramem a przestrzenią na budowanie swobodnych relacji.",
  },
  {
    question: "Gdzie dokładnie odbywają się Wasze wyjazdy?",
    answer:
      "Wybieramy tylko sprawdzone, bezpieczne i oddalone od zgiełku miejsca w otoczeniu natury, które przynoszą spokój i ukojenie. Aktualnie zapraszamy Was między innymi na urokliwe Mazury (Sasek Mały) oraz do wyjątkowego Miejsca Inicjatyw Pozytywnych \u2013 Kacze Bagno. Są to przestrzenie stworzone do regeneracji i wspólnego spędzania czasu na łonie natury.",
  },
  {
    question: "Czy przed podjęciem decyzji lub przed samym wyjazdem mogę skonsultować się z organizatorem?",
    answer:
      "Oczywiście! Jeśli masz jakiekolwiek obawy lub chcesz sprawdzić, czy dany wyjazd jest odpowiedni dla Twojej rodziny, zawsze możesz do nas zadzwonić pod numer 503 098 906. Ponadto, przed wieloma naszymi wyjazdami organizujemy spotkania organizacyjne (często w formie online), podczas których szczegółowo omawiamy program, zasady panujące na wyjeździe oraz odpowiadamy na wszystkie pytania rodziców, aby rozwiać ewentualne wątpliwości i zmniejszyć stres przed podróżą.",
  },
];

const accordionItems = faqData.map((item, i) => ({
  id: `faq-${i + 1}`,
  title: item.question,
  content: item.answer,
}));

export function HomeFAQ() {
  return (
    <SectionWrapper variant="alternate" id="faq">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Najczęściej zadawane pytania"
          />
        </ScrollAnimation>

        <div className="mx-auto max-w-3xl">
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <Accordion
              items={accordionItems}
              onToggle={(_id, title) => analytics.faqClick(title)}
            />
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
