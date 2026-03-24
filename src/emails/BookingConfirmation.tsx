import {
  Html,
  Head,
  Body,
  Container,
  Section,
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
  adults: number;
  children: number;
}

export function BookingConfirmation(props: Props) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Potwierdzenie rezerwacji: {props.trip}</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>{SITE_CONFIG.name}</Text>
          <Hr style={s.hr} />

          <Text style={s.greeting}>Cześć {props.name}!</Text>

          <Text style={s.paragraph}>
            Dziękujemy za zainteresowanie! Otrzymaliśmy Twoje zgłoszenie. Oto
            podsumowanie:
          </Text>

          <Section style={s.highlightBox}>
            <Text style={s.summaryTitle}>{props.trip}</Text>
            <Text style={s.summaryDetail}>
              {`${props.adults} dorosłych + ${props.children} dzieci`}
            </Text>
          </Section>

          <Text style={s.paragraph}>
            <strong>Co dalej?</strong>
          </Text>

          <Text style={s.paragraph}>
            Skontaktujemy się z Tobą w ciągu 48 godzin, aby potwierdzić
            dostępność i omówić szczegóły. Jeśli rezerwacja zostanie
            potwierdzona, wyślemy informacje o wpłacie zaliczki.
          </Text>

          <Text style={s.paragraph}>
            Masz pytania? Odpisz na tę wiadomość lub zadzwoń pod{" "}
            <strong>{CONTACT.phone}</strong>.
          </Text>

          <Text style={s.paragraph}>
            Odwiedź nas na{" "}
            <Link href={SITE_CONFIG.url}>wyjazdyzdziecmi.pl</Link>.
          </Text>

          <Text style={s.paragraph}>
            Do zobaczenia!
            <br />
            Maria — {SITE_CONFIG.name}
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Ta wiadomość została wysłana automatycznie w związku z Twoim
            zgłoszeniem na stronie wyjazdyzdziecmi.pl. Jeśli nie składałeś/aś
            tej rezerwacji, zignoruj tę wiadomość. Administratorem danych
            osobowych jest Maria Kordalewska. Dane przetwarzane są w celu
            realizacji rezerwacji (art. 6 ust. 1 lit. b RODO).
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
