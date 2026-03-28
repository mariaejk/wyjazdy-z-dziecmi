import { makeRouteHandler } from "@keystatic/next/route-handler";
import { NextResponse } from "next/server";
import config from "../../../../../keystatic.config";

export const dynamic = "force-dynamic";

const showAdminUI =
  process.env.NODE_ENV !== "production" ||
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER);

const handler = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});

// Temporary debug endpoint: GET /api/keystatic/debug-env
const debugHandler = () =>
  NextResponse.json({
    hasClientId: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID),
    clientIdPrefix: process.env.KEYSTATIC_GITHUB_CLIENT_ID?.slice(0, 10) + "...",
    hasClientSecret: Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
    hasSecret: Boolean(process.env.KEYSTATIC_SECRET),
    hasOwner: Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER),
    nodeEnv: process.env.NODE_ENV,
  });

export const GET = (req: Request) => {
  if (new URL(req.url).pathname === "/api/keystatic/debug-env") {
    return debugHandler();
  }
  return showAdminUI
    ? handler.GET(req)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
};

export const POST = showAdminUI
  ? handler.POST
  : () => NextResponse.json({ error: "Not found" }, { status: 404 });
