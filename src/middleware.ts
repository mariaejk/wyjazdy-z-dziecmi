import { NextResponse } from "next/server";

/**
 * Middleware for Keystatic API routes (GitHub OAuth callbacks).
 * UI routes (/keystatic/*) are NOT matched — they render directly.
 * In GitHub mode, API routes pass through for OAuth flow.
 */
export function middleware() {
  // API routes always pass through — they handle GitHub OAuth callbacks
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/keystatic/:path*"],
};
