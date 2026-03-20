"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { ScrollAnimation } from "@/components/shared/ScrollAnimation";
import { analytics } from "@/lib/analytics";

const faqItems = [
  {
    id: "dieta-alergie",
    title: "Czy menu na wyjazdach uwzgl\u0119dnia alergie pokarmowe i specjalne diety dzieci?",
    content:
      "Bezpiecze\u0144stwo i zdrowie naszych uczestnik\u00F3w to priorytet. Podczas ka\u017Cdego wyjazdu zapewniamy pe\u0142ne wy\u017Cywienie i zawsze dostosowujemy menu do specjalnych potrzeb dietetycznych, w tym alergii i nietolerancji pokarmowych. Przed wyjazdem poprosimy Ci\u0119 o wype\u0142nienie kr\u00F3tkiej ankiety, w kt\u00F3rej b\u0119dziesz mog\u0142a/m\u00F3g\u0142 zg\u0142osi\u0107 wszelkie wykluczenia z diety swojego dziecka oraz w\u0142asnej.",
  },
  {
    id: "co-zabrac",
    title: "Co powinni\u015Bmy zabra\u0107 ze sob\u0105 na wyjazd?",
    content:
      "Przed ka\u017Cdym wyjazdem wysy\u0142amy uczestnikom maila z dok\u0142adnym planem oraz szczeg\u00F3\u0142ow\u0105 list\u0105 rzeczy do spakowania. Poniewa\u017C nasze wyjazdy odbywaj\u0105 si\u0119 w otoczeniu natury i obfituj\u0105 w aktywno\u015Bci ruchowe (takie jak joga, konie czy spacery po lesie), najwa\u017Cniejszy b\u0119dzie wygodny str\u00F3j sportowy, buty terenowe oraz odzie\u017C dostosowana do zmiennych warunk\u00F3w pogodowych. Dodatkowo, gor\u0105co zach\u0119camy do pobrania naszego darmowego poradnika PDF \u201EJak przygotowa\u0107 dziecko do wyjazdu warsztatowego\u201D, kt\u00F3ry znajdziesz na dole naszej strony.",
  },
  {
    id: "opieka-nad-dziecmi",
    title: "Kto opiekuje si\u0119 dzie\u0107mi, gdy odbywaj\u0105 si\u0119 warsztaty przeznaczone tylko dla rodzic\u00F3w?",
    content:
      "Wiemy, \u017Ce aby rodzic m\u00F3g\u0142 si\u0119 zregenerowa\u0107 i skupi\u0107 na sobie, musi mie\u0107 pewno\u015B\u0107, \u017Ce jego dziecko jest w dobrych r\u0119kach. Podczas wyjazd\u00F3w oferujemy zar\u00F3wno zaj\u0119cia wsp\u00F3lne, integruj\u0105ce rodzin\u0119, jak i bloki warsztatowe dedykowane wy\u0142\u0105cznie dla doros\u0142ych. Kiedy Ty uczestniczysz w warsztatach rozwojowych, Twoje dziecko ma zapewnion\u0105 w pe\u0142ni profesjonaln\u0105 opiek\u0119 i bierze udzia\u0142 w dedykowanych, rozwijaj\u0105cych zabawach.",
  },
  {
    id: "wiek-dzieci",
    title: "W jakim wieku powinny by\u0107 dzieci, aby wzi\u0105\u0107 udzia\u0142 w wyje\u017Adzie?",
    content:
      "Nasze wyjazdy s\u0105 starannie profilowane, dlatego na stronach poszczeg\u00F3lnych ofert (np. \u201EWsp\u00F3lny Rytm\u201D dla matek i c\u00F3rek) zawsze znajdziesz informacj\u0119 o rekomendowanym wieku uczestnik\u00F3w (np. 5+ lat). Dzi\u0119ki temu mamy pewno\u015B\u0107, \u017Ce program, zabawy oraz warsztaty b\u0119d\u0105 idealnie dopasowane do mo\u017Cliwo\u015Bci i zainteresowa\u0144 dzieci w danej grupie wiekowej.",
  },
  {
    id: "przykladowy-dzien",
    title: "Jak wygl\u0105da przyk\u0142adowy dzie\u0144 podczas wyjazdu warsztatowego?",
    content:
      "Ka\u017Cdy turnus ma sw\u00F3j unikalny temat i program, ale zawsze dbamy o zdrowy balans. Dzie\u0144 zazwyczaj przeplata aktywno\u015Bci zorganizowane (poranna joga, warsztaty ceramiczne czy taniec) z czasem wolnym na swobodn\u0105 zabaw\u0119 i odpoczynek w naturze. Zapewniamy r\u00F3wnowag\u0119 mi\u0119dzy ustrukturyzowanym harmonogramem a przestrzeni\u0105 na budowanie swobodnych relacji.",
  },
  {
    id: "lokalizacja",
    title: "Gdzie dok\u0142adnie odbywaj\u0105 si\u0119 Wasze wyjazdy?",
    content:
      "Wybieramy tylko sprawdzone, bezpieczne i oddalone od zgie\u0142ku miejsca w otoczeniu natury, kt\u00F3re przynosz\u0105 spok\u00F3j i ukojenie. Aktualnie zapraszamy Was mi\u0119dzy innymi na urokliwe Mazury (Sasek Ma\u0142y) oraz do wyj\u0105tkowego Miejsca Inicjatyw Pozytywnych \u2013 Kacze Bagno. S\u0105 to przestrzenie stworzone do regeneracji i wsp\u00F3lnego sp\u0119dzania czasu na \u0142onie natury.",
  },
  {
    id: "kontakt-konsultacja",
    title: "Czy przed podj\u0119ciem decyzji lub przed samym wyjazdem mog\u0119 skonsultowa\u0107 si\u0119 z organizatorem?",
    content:
      "Oczywi\u015Bcie! Je\u015Bli masz jakiekolwiek obawy lub chcesz sprawdzi\u0107, czy dany wyjazd jest odpowiedni dla Twojej rodziny, zawsze mo\u017Cesz do nas zadzwoni\u0107 pod numer 503 098 906. Ponadto, przed wieloma naszymi wyjazdami organizujemy spotkania organizacyjne (cz\u0119sto w formie online), podczas kt\u00F3rych szczeg\u00F3\u0142owo omawiamy program, zasady panuj\u0105ce na wyje\u017Adzie oraz odpowiadamy na wszystkie pytania rodzic\u00F3w, aby rozwia\u0107 ewentualne w\u0105tpliwo\u015Bci i zmniejszy\u0107 stres przed podr\u00F3\u017C\u0105.",
  },
];

export function HomeFAQ() {
  return (
    <SectionWrapper variant="alternate">
      <Container>
        <ScrollAnimation variant="fadeUp">
          <SectionHeading
            title="Najcz\u0119\u015Bciej zadawane pytania"
            subtitle="Odpowiadamy na pytania rodzic\u00F3w"
          />
        </ScrollAnimation>

        <div className="mx-auto max-w-3xl">
          <ScrollAnimation variant="fadeUp" delay={0.15}>
            <Accordion
              items={faqItems}
              onToggle={(_id, title) => analytics.faqClick(title)}
            />
          </ScrollAnimation>
        </div>
      </Container>
    </SectionWrapper>
  );
}
