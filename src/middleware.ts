import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth middleware protecting /keystatic admin panel.
 * In GitHub mode, Keystatic handles auth via GitHub OAuth — Basic Auth is skipped.
 * API routes (/api/keystatic/*) are always passed through for OAuth callbacks.
 */
export function middleware(request: NextRequest) {
  // Never block API routes — they handle GitHub OAuth callbacks
  if (request.nextUrl.pathname.startsWith("/api/keystatic")) {
    return NextResponse.next();
  }

  // In GitHub mode, Keystatic uses GitHub OAuth — skip Basic Auth
  const isGithubMode =
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER &&
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;

  if (isGithubMode) {
    return NextResponse.next();
  }

  // Local mode: use Basic Auth if credentials are configured
  const user = process.env.KEYSTATIC_ADMIN_USER;
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;

  if (!user || !password) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [authUser, authPass] = decoded.split(":");
      if (authUser === user && authPass === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Keystatic Admin"',
    },
  });
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
