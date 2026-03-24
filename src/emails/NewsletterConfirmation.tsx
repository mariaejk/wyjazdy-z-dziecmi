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
  email: string;
}

export function NewsletterConfirmation(props: Props) {
  return (
    <Html>
      <Head />
      <Preview>Dziękujemy za zapis — poradnik w drodze!</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.logo}>Wyjazdy z Dziećmi</Text>
          <Hr style={s.hr} />

          <Text style={s.greeting}>Cześć!</Text>

          <Text style={s.paragraph}>
            Dziękujemy za zapis na nasz newsletter ({props.email}). Poradnik PDF
            „Jak przygotować dziecko do wyjazdu warsztatowego" wyślemy wkrótce.
          </Text>

          <Text style={s.paragraph}>
            Będziemy Cię również informować o nowych terminach warsztatów i
            specjalnych ofertach.
          </Text>

          <Text style={s.paragraph}>
            Pozdrawiamy,
            <br />
            Maria — Wyjazdy z Dziećmi
          </Text>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Ta wiadomość została wysłana na adres {props.email} w związku z
            zapisem na newsletter na stronie wyjazdyzdziecmi.pl. Administratorem
            danych osobowych jest Maria Kordalewska (art. 6 ust. 1 lit. a RODO).
            Możesz zrezygnować z newslettera w dowolnym momencie.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
