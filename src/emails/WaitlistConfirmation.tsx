import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Link,
  Preview,
} from "@react-email/components";
import { CONTACT, SITE_CONFIG } from "@/lib/constants";
import * as s from "./styles";

interface Props {
  name: string;
  trip: string;
}

export function WaitlistConfirmation(props: Props) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Lista oczekujących: {props.trip}</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>{SITE_CONFIG.name}</Text>
          <Hr style={s.hr} />

          <Text style={s.greeting}>Cześć {props.name}!</Text>

          <Text style={s.paragraph}>
            Dziękujemy za zainteresowanie warsztatem{" "}
            <strong>{props.trip}</strong>. Zapisaliśmy Cię na listę
            oczekujących.
          </Text>

          <Text style={s.paragraph}>
            Skontaktujemy się z Tobą, gdy zwolni się miejsce lub gdy otworzymy
            nowy termin.
          </Text>

          <Text style={s.paragraph}>
            Masz pytania? Zadzwoń pod <strong>{CONTACT.phone}</strong>.
          </Text>

          <Text style={s.paragraph}>
            Odwiedź nas na{" "}
            <Link href={SITE_CONFIG.url}>wyjazdyzdziecmi.pl</Link>.
          </Text>

          <Text style={s.paragraph}>
            Pozdrawiamy,
            <br />
            Maria — {SITE_CONFIG.name}
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Ta wiadomość została wysłana automatycznie w związku z zapisem na
            listę oczekujących na stronie wyjazdyzdziecmi.pl. Administratorem
            danych osobowych jest Maria Kordalewska. Dane przetwarzane są w celu
            obsługi listy oczekujących i kontaktu w sprawie dostępności terminu
            (art. 6 ust. 1 lit. b RODO).
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
