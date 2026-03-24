import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Preview,
} from "@react-email/components";
import * as s from "./styles";

interface Props {
  name: string;
  trip: string;
}

export function WaitlistConfirmation(props: Props) {
  return (
    <Html>
      <Head />
      <Preview>Lista oczekujących: {props.trip}</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>Wyjazdy z Dziećmi</Text>
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
            Masz pytania? Zadzwoń pod <strong>+48 503 098 906</strong>.
          </Text>

          <Text style={s.paragraph}>
            Pozdrawiamy,
            <br />
            Maria — Wyjazdy z Dziećmi
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Ta wiadomość została wysłana automatycznie w związku z zapisem na
            listę oczekujących na stronie wyjazdyzdziecmi.pl. Administratorem
            danych osobowych jest Maria Kordalewska (art. 6 ust. 1 lit. b RODO).
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
