import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth middleware protecting /keystatic admin panel.
 * Requires KEYSTATIC_ADMIN_USER and KEYSTATIC_ADMIN_PASSWORD env vars.
 * In development without these vars, access is open.
 */
export function middleware(request: NextRequest) {
  const user = process.env.KEYSTATIC_ADMIN_USER;
  const password = process.env.KEYSTATIC_ADMIN_PASSWORD;

  // Skip auth in development if credentials are not configured
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
