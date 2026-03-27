const AIRTABLE_API = "https://api.airtable.com/v0";

function getConfig() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    return null;
  }

  return { apiKey, baseId };
}

async function appendToTable(
  table: string,
  fields: Record<string, string>,
) {
  const config = getConfig();
  if (!config) {
    console.warn("[Airtable] Credentials not configured — skipping");
    return;
  }

  const url = `${AIRTABLE_API}/${config.baseId}/${encodeURIComponent(table)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: sanitizeFields(fields) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Log full error for debugging, but don't leak API details in thrown error
    console.error(`[Airtable] API error (${response.status}):`, errorText);
    throw new Error(`Airtable API error (${response.status})`);
  }
}

function getTimestamp() {
  return new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
}

// CSV/formula injection prevention — dangerous chars trigger formulas in Excel/LibreOffice
// when client exports Airtable data. Prefix with apostrophe (safe display char).
function sanitizeCell(value: string): string {
  if (/^[=+\-@\t\r]/.test(value)) {
    return `'${value}`;
  }
  return value;
}

function sanitizeFields(fields: Record<string, string>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    sanitized[key] = sanitizeCell(value);
  }
  return sanitized;
}

// No try/catch on public append* functions — errors must propagate to
// Promise.allSettled() in API routes for correct graceful degradation.
// If append* swallows errors, allFailed is never true and lost leads go undetected.

// Pola: Data, Imie, Email, Telefon, Wyjazd, Dorosli, Dzieci, WiekDzieci, Dieta, Uwagi, Status, ZgodaRODO, Marketing
export async function appendBooking(data: {
  name: string;
  email: string;
  phone: string;
  trip: string;
  adults: number;
  children: number;
  childrenAges?: string;
  dietaryNeeds?: string;
  notes?: string;
  consentMarketing: boolean;
}) {
  await appendToTable("Rezerwacje", {
    Data: getTimestamp(),
    Imie: data.name,
    Email: data.email,
    Telefon: data.phone,
    Wyjazd: data.trip,
    Dorosli: String(data.adults),
    Dzieci: String(data.children),
    WiekDzieci: data.childrenAges ?? "",
    Dieta: data.dietaryNeeds ?? "",
    Uwagi: data.notes ?? "",
    Status: "Nowy",
    ZgodaRODO: "Tak",
    Marketing: data.consentMarketing ? "Tak" : "Nie",
  });
}

// Pola: Data, Imie, Email, Wiadomosc, Status, ZgodaRODO, Zrodlo
export async function appendContact(data: {
  name: string;
  email: string;
  message: string;
}) {
  await appendToTable("Kontakty", {
    Data: getTimestamp(),
    Imie: data.name,
    Email: data.email,
    Wiadomosc: data.message,
    Status: "Nowy",
    ZgodaRODO: "Tak",
    Zrodlo: "Formularz kontaktowy",
  });
}

// Pola: Data, Email, Status, ZgodaRODO
export async function appendNewsletter(data: { email: string }) {
  await appendToTable("Newsletter", {
    Data: getTimestamp(),
    Email: data.email,
    Status: "Aktywny",
    ZgodaRODO: "Tak",
  });
}

// Pola: Data, Imie, Email, Telefon, Wyjazd, Status, ZgodaRODO
export async function appendWaitlist(data: {
  name: string;
  email: string;
  phone: string;
  trip: string;
}) {
  await appendToTable("ListaOczekujacych", {
    Data: getTimestamp(),
    Imie: data.name,
    Email: data.email,
    Telefon: data.phone,
    Wyjazd: data.trip,
    Status: "Oczekujący",
    ZgodaRODO: "Tak",
  });
}
