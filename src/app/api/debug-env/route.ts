import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY ? `${process.env.AIRTABLE_API_KEY.substring(0, 8)}...` : "NOT SET",
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID ? `${process.env.AIRTABLE_BASE_ID.substring(0, 8)}...` : "NOT SET",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 8)}...` : "NOT SET",
    FROM_EMAIL: process.env.FROM_EMAIL || "NOT SET",
    OWNER_EMAIL: process.env.OWNER_EMAIL || "NOT SET",
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV || "NOT SET",
  });
}
