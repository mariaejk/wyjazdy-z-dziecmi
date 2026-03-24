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
  adults: number;
  children: number;
  childrenAges: string;
  dietaryNeeds: string;
  notes: string;
  consentMarketing: boolean;
  submittedAt: string;
}

export function BookingNotification(props: Props) {
  const totalPeople = props.adults + props.children;

  return (
    <Html>
      <Head />
      <Preview>
        {`Nowa rezerwacja: ${props.trip} — ${props.name} (${totalPeople} os.)`}
      </Preview>
      <Body style={s.main}>
        <Container style={s.container}>
          <Text style={s.heading}>Nowa rezerwacja</Text>
          <Hr style={s.hr} />

          <Section style={s.highlightBox}>
            <Text style={s.summaryTitle}>{props.trip}</Text>
            <Text style={s.summaryDetail}>
              {`${props.adults} dorosłych + ${props.children} dzieci = ${totalPeople} os.`}
            </Text>
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

          {props.childrenAges && (
            <Section style={s.section}>
              <Text style={s.label}>Wiek dzieci</Text>
              <Text style={s.value}>{props.childrenAges}</Text>
            </Section>
          )}

          {props.dietaryNeeds && (
            <Section style={s.section}>
              <Text style={s.label}>Dieta / alergie</Text>
              <Text style={s.messageBox}>{props.dietaryNeeds}</Text>
            </Section>
          )}

          {props.notes && (
            <Section style={s.section}>
              <Text style={s.label}>Uwagi</Text>
              <Text style={s.messageBox}>{props.notes}</Text>
            </Section>
          )}

          <Section style={s.section}>
            <Text style={s.label}>Zgoda marketingowa</Text>
            <Text style={s.value}>
              {props.consentMarketing ? "Tak" : "Nie"}
            </Text>
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
