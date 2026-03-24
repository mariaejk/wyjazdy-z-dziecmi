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
  message: string;
  submittedAt: string;
}

export function ContactNotification(props: Props) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Nowe zapytanie od {props.name}</Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.heading}>Nowe zapytanie ze strony</Text>
          <Hr style={s.hr} />

          <Section style={s.section}>
            <Text style={s.label}>Imię</Text>
            <Text style={s.value}>{props.name}</Text>
          </Section>

          <Section style={s.section}>
            <Text style={s.label}>Email</Text>
            <Text style={s.value}>{props.email}</Text>
          </Section>

          <Section style={s.section}>
            <Text style={s.label}>Wiadomość</Text>
            <Text style={s.messageBox}>{props.message}</Text>
          </Section>

          <Hr style={s.hr} />
          <Text style={s.footer}>
            Otrzymano: {props.submittedAt} · Kliknij „Odpowiedz" aby napisać do{" "}
            {props.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
