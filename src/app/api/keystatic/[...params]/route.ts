import { makeRouteHandler } from "@keystatic/next/route-handler";
import { NextResponse } from "next/server";
import config from "../../../../../keystatic.config";

export const dynamic = "force-dynamic";

const showAdminUI =
  process.env.NODE_ENV !== "production" ||
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER);

const handler = makeRouteHandler({ config });

export const GET = showAdminUI
  ? handler.GET
  : () => NextResponse.json({ error: "Not found" }, { status: 404 });

export const POST = showAdminUI
  ? handler.POST
  : () => NextResponse.json({ error: "Not found" }, { status: 404 });
