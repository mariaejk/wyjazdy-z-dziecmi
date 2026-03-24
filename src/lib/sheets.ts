import { GoogleAuth } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

function getAuth() {
  return new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
}

async function appendToSheet(sheet: string, values: string[]) {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn("[Sheets] GOOGLE_SHEETS_SPREADSHEET_ID not set — skipping");
    return;
  }

  const auth = getAuth();
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = `${sheet}!A:Z`;
  const url = `${SHEETS_API}/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [values],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets API error (${response.status}): ${errorText}`);
  }
}

function getTimestamp() {
  return new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
}

// Kolumny: Data | Imię | Email | Telefon | Wyjazd | Dorośli | Dzieci | Wiek dzieci | Dieta | Uwagi | Status | Zgoda RODO | Marketing
export async function appendBooking(data: {
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
}) {
  try {
    await appendToSheet("Rezerwacje", [
      getTimestamp(),
      data.name,
      data.email,
      data.phone,
      data.trip,
      String(data.adults),
      String(data.children),
      data.childrenAges || "",
      data.dietaryNeeds || "",
      data.notes || "",
      "Nowy",
      "Tak",
      data.consentMarketing ? "Tak" : "Nie",
    ]);
  } catch (error) {
    console.error("[Sheets] appendBooking failed:", error);
  }
}

// Kolumny: Data | Imię | Email | Wiadomość | Status | Zgoda RODO | Źródło
export async function appendContact(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await appendToSheet("Kontakty", [
      getTimestamp(),
      data.name,
      data.email,
      data.message,
      "Nowy",
      "Tak",
      "Formularz kontaktowy",
    ]);
  } catch (error) {
    console.error("[Sheets] appendContact failed:", error);
  }
}

// Kolumny: Data | Email | Status | Zgoda RODO
export async function appendNewsletter(data: { email: string }) {
  try {
    await appendToSheet("Newsletter", [
      getTimestamp(),
      data.email,
      "Aktywny",
      "Tak",
    ]);
  } catch (error) {
    console.error("[Sheets] appendNewsletter failed:", error);
  }
}

// Kolumny: Data | Imię | Email | Telefon | Wyjazd | Status | Zgoda RODO
export async function appendWaitlist(data: {
  name: string;
  email: string;
  phone: string;
  trip: string;
}) {
  try {
    await appendToSheet("Waitlist", [
      getTimestamp(),
      data.name,
      data.email,
      data.phone,
      data.trip,
      "Oczekujący",
      "Tak",
    ]);
  } catch (error) {
    console.error("[Sheets] appendWaitlist failed:", error);
  }
}
