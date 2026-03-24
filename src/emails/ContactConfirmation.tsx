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
}

export function ContactConfirmation(props: Props) {
  return (
    <Html>
      <Head />
      <Preview>Dziękujemy za wiadomość, {props.name}!</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>Wyjazdy z Dziećmi</Text>
          <Hr style={s.hr} />

          <Text style={s.greeting}>Cześć {props.name}!</Text>

          <Text style={s.paragraph}>
            Dziękujemy za wiadomość. Otrzymaliśmy Twoje zapytanie i odpowiemy
            najszybciej jak to możliwe — zazwyczaj w ciągu 24 godzin.
          </Text>

          <Text style={s.paragraph}>
            Jeśli Twoja sprawa jest pilna, zadzwoń pod numer{" "}
            <strong>+48 503 098 906</strong>.
          </Text>

          <Text style={s.paragraph}>
            Pozdrawiamy serdecznie,
            <br />
            Maria — Wyjazdy z Dziećmi
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Ta wiadomość została wysłana automatycznie w związku z Twoim
            zapytaniem na stronie wyjazdyzdziecmi.pl. Administratorem danych
            osobowych jest Maria Kordalewska. Dane przetwarzane są w celu
            odpowiedzi na zapytanie (art. 6 ust. 1 lit. b RODO).
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
