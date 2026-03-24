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
}

export function ContactConfirmation(props: Props) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Dziękujemy za wiadomość, {props.name}!</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>{SITE_CONFIG.name}</Text>
          <Hr style={s.hr} />

          <Text style={s.greeting}>Cześć {props.name}!</Text>

          <Text style={s.paragraph}>
            Dziękujemy za wiadomość. Otrzymaliśmy Twoje zapytanie i odpowiemy
            najszybciej jak to możliwe — zazwyczaj w ciągu 24 godzin.
          </Text>

          <Text style={s.paragraph}>
            Jeśli Twoja sprawa jest pilna, zadzwoń pod numer{" "}
            <strong>{CONTACT.phone}</strong>.
          </Text>

          <Text style={s.paragraph}>
            Odwiedź nas na{" "}
            <Link href={SITE_CONFIG.url}>wyjazdyzdziecmi.pl</Link>.
          </Text>

          <Text style={s.paragraph}>
            Pozdrawiamy serdecznie,
            <br />
            Maria — {SITE_CONFIG.name}
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
