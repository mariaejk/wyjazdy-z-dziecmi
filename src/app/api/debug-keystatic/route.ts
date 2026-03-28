import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    hasClientId: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
    clientIdPrefix: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.slice(0, 10) + "...",
    hasClientSecret: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
    hasSecret: Boolean(process.env.KEYSTATIC_SECRET),
    hasOwner: Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER),
    nodeEnv: process.env.NODE_ENV,
  });
}
