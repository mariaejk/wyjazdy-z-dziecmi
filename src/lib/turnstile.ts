const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Graceful skip in dev mode without Turnstile keys
  if (!secret) {
    console.warn("[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }

  if (!token.trim()) {
    console.warn("[Turnstile] Empty token received");
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteip && { remoteip }),
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("[Turnstile] Verification failed:", error);
    return false;
  }
}
