import { CONTACT, SITE_CONFIG } from "@/lib/constants";

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="utf-8"></head>
<body style="background-color:#f7f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0">
<div style="background-color:#ffffff;margin:40px auto;padding:32px;max-width:520px">
${content}
</div>
</body>
</html>`;
}

function hr(): string {
  return '<hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0">';
}

function field(label: string, value: string, isMessage = false): string {
  const valueStyle = isMessage
    ? 'font-size:15px;color:#333;line-height:1.6;background-color:#f9f9f9;padding:16px;margin:0'
    : 'font-size:16px;color:#1a1a1a;margin:0';
  return `<div style="margin:0 0 16px">
<p style="font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 4px">${label}</p>
<p style="${valueStyle}">${value}</p>
</div>`;
}

function footer(text: string): string {
  return `<p style="font-size:12px;color:#999;margin:0">${text}</p>`;
}

// Contact
export function contactNotificationHtml(data: { name: string; email: string; message: string; submittedAt: string }): string {
  return layout(`
<p style="font-size:20px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Nowe zapytanie ze strony</p>
${hr()}
${field("Imię", data.name)}
${field("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
${field("Wiadomość", data.message, true)}
${hr()}
${footer(`Otrzymano: ${data.submittedAt} · Kliknij \u201eOdpowiedz\u201d aby napisać do ${data.name}`)}
`);
}

export function contactConfirmationHtml(data: { name: string }): string {
  return layout(`
<p style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 8px">${SITE_CONFIG.name}</p>
${hr()}
<p style="font-size:18px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Cześć ${data.name}!</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Dziękujemy za wiadomość. Otrzymaliśmy Twoje zapytanie i odpowiemy najszybciej jak to możliwe — zazwyczaj w ciągu 24 godzin.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Jeśli Twoja sprawa jest pilna, zadzwoń pod numer <strong>${CONTACT.phone}</strong>.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Odwiedź nas na <a href="${SITE_CONFIG.url}">wyjazdyzdziecmi.pl</a>.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Pozdrawiamy serdecznie,<br>Maria — ${SITE_CONFIG.name}</p>
${hr()}
${footer("Ta wiadomość została wysłana automatycznie w związku z Twoim zapytaniem na stronie wyjazdyzdziecmi.pl. Administratorem danych osobowych jest Maria Kordalewska. Dane przetwarzane są w celu odpowiedzi na zapytanie (art. 6 ust. 1 lit. b RODO).")}
`);
}

// Booking
export function bookingNotificationHtml(data: { name: string; email: string; phone: string; trip: string; adults: number; children: number; childrenAges?: string; dietaryNeeds?: string; notes?: string; consentMarketing: boolean; submittedAt: string }): string {
  return layout(`
<p style="font-size:20px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Nowa rezerwacja</p>
${hr()}
<p style="font-size:17px;font-weight:600;color:#1a1a1a;margin:0 0 8px">Dane uczestnika</p>
${field("Imię", data.name)}
${field("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
${field("Telefon", data.phone)}
${hr()}
<p style="font-size:17px;font-weight:600;color:#1a1a1a;margin:0 0 8px">Szczegóły rezerwacji</p>
${field("Warsztat", data.trip)}
${field("Dorośli", String(data.adults))}
${field("Dzieci", String(data.children))}
${data.childrenAges ? field("Wiek dzieci", data.childrenAges) : ""}
${data.dietaryNeeds ? field("Wymagania dietetyczne", data.dietaryNeeds) : ""}
${data.notes ? field("Uwagi", data.notes, true) : ""}
${field("Marketing", data.consentMarketing ? "Tak" : "Nie")}
${hr()}
${footer(`Otrzymano: ${data.submittedAt}`)}
`);
}

export function bookingConfirmationHtml(data: { name: string; trip: string }): string {
  return layout(`
<p style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 8px">${SITE_CONFIG.name}</p>
${hr()}
<p style="font-size:18px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Cześć ${data.name}!</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Dziękujemy za rezerwację na warsztat <strong>${data.trip}</strong>! Otrzymaliśmy Twoje zgłoszenie.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Skontaktujemy się z Tobą w ciągu 24 godzin, aby potwierdzić dostępność i omówić szczegóły.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Pytania? Zadzwoń: <strong>${CONTACT.phone}</strong> lub napisz: <strong>${CONTACT.email}</strong>.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Do zobaczenia!<br>Maria — ${SITE_CONFIG.name}</p>
${hr()}
${footer("Ta wiadomość została wysłana automatycznie. Administratorem danych osobowych jest Maria Kordalewska.")}
`);
}

// Newsletter
export function newsletterConfirmationHtml(data: { email: string }): string {
  return layout(`
<p style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 8px">${SITE_CONFIG.name}</p>
${hr()}
<p style="font-size:18px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Witaj!</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Dziękujemy za zapisanie się do naszego newslettera. Będziemy informować Cię o nowych warsztatach i wydarzeniach.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Pozdrawiamy,<br>Maria — ${SITE_CONFIG.name}</p>
${hr()}
${footer(`Zapisano: ${data.email}. Administratorem danych jest Maria Kordalewska.`)}
`);
}

// Waitlist
export function waitlistNotificationHtml(data: { name: string; email: string; phone: string; trip: string; submittedAt: string }): string {
  return layout(`
<p style="font-size:20px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Nowy zapis na listę oczekujących</p>
${hr()}
${field("Imię", data.name)}
${field("Email", `<a href="mailto:${data.email}">${data.email}</a>`)}
${field("Telefon", data.phone)}
${field("Warsztat", data.trip)}
${hr()}
${footer(`Otrzymano: ${data.submittedAt}`)}
`);
}

export function waitlistConfirmationHtml(data: { name: string; trip: string }): string {
  return layout(`
<p style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 8px">${SITE_CONFIG.name}</p>
${hr()}
<p style="font-size:18px;font-weight:600;color:#1a1a1a;margin:0 0 16px">Cześć ${data.name}!</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Zapisaliśmy Cię na listę oczekujących na warsztat <strong>${data.trip}</strong>. Damy znać, gdy pojawią się wolne miejsca.</p>
<p style="font-size:15px;color:#333;line-height:1.6;margin:0 0 16px">Pozdrawiamy,<br>Maria — ${SITE_CONFIG.name}</p>
${hr()}
${footer("Ta wiadomość została wysłana automatycznie. Administratorem danych osobowych jest Maria Kordalewska.")}
`);
}
