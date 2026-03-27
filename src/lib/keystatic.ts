import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

// Local reader — uses filesystem via process.cwd().
// Works at build time (next build) and in local dev.
// In CF Workers runtime, Keystatic GitHub mode uses HTTP API instead of fs,
// but createReader still needs process.cwd() for config resolution.
export const reader = createReader(process.cwd(), config);
