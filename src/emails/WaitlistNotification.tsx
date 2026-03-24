import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from "@react-email/components";
import * as s from "./styles";

interface Props {
  name: string;
  email: string;
  phone: string;
  trip: string;
  submittedAt: string;
}

export function WaitlistNotification(props: Props) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>
        Lista oczekujących: {props.trip} — {props.name}
      </Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.heading}>Nowy wpis na listę oczekujących</Text>
          <Hr style={s.hr} />

          <Section style={s.highlightBox}>
            <Text style={s.summaryTitle}>{props.trip}</Text>
          </Section>

          <Section style={s.section}>
            <Text style={s.label}>Klient</Text>
            <Text style={s.value}>{props.name}</Text>
          </Section>

          <Section style={s.section}>
            <Text style={s.label}>Email</Text>
            <Text style={s.value}>{props.email}</Text>
          </Section>

          <Section style={s.section}>
            <Text style={s.label}>Telefon</Text>
            <Text style={s.value}>{props.phone}</Text>
          </Section>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Otrzymano: {props.submittedAt} · Kliknij {"\u201EOdpowiedz\u201D"} aby napisać do{" "}
            {props.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
