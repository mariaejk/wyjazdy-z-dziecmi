import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // Default: show env var status
  if (!action) {
    return NextResponse.json({
      hasClientId: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
      clientIdPrefix:
        process.env.KEYSTATIC_GITHUB_CLIENT_ID?.slice(0, 10) + "...",
      hasClientSecret: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
      secretLength: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET?.length,
      hasSecret: Boolean(process.env.KEYSTATIC_SECRET),
      hasOwner: Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER),
      nodeEnv: process.env.NODE_ENV,
    });
  }

  // action=login: redirect to GitHub OAuth (bypassing Keystatic)
  if (action === "login") {
    const ghUrl = new URL("https://github.com/login/oauth/authorize");
    ghUrl.searchParams.set(
      "client_id",
      process.env.KEYSTATIC_GITHUB_CLIENT_ID || ""
    );
    ghUrl.searchParams.set(
      "redirect_uri",
      `${url.origin}/api/debug-keystatic?action=callback`
    );
    return NextResponse.redirect(ghUrl.toString());
  }

  // action=callback: exchange code for token (bypassing Keystatic)
  if (action === "callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      return NextResponse.json({ error: "no code" }, { status: 400 });
    }

    const tokenUrl = new URL("https://github.com/login/oauth/access_token");
    tokenUrl.searchParams.set(
      "client_id",
      process.env.KEYSTATIC_GITHUB_CLIENT_ID || ""
    );
    tokenUrl.searchParams.set(
      "client_secret",
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || ""
    );
    tokenUrl.searchParams.set("code", code);

    const tokenRes = await fetch(tokenUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    const body = await tokenRes.json();

    return NextResponse.json({
      status: tokenRes.status,
      ok: tokenRes.ok,
      body: {
        error: body.error,
        error_description: body.error_description,
        has_access_token: Boolean(body.access_token),
        token_type: body.token_type,
        scope: body.scope,
      },
    });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
