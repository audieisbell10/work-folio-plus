// ================================================================
// CLIENT GALLERY PASSWORD — server-only
// ================================================================
// The gallery is locked with one shared password, stored as a Cloudflare
// Worker secret named CLIENT_GALLERY_PASSWORD (never in this repo).
//   Set it:    Cloudflare dashboard → Workers & Pages → audieisbell →
//              Settings → Variables and Secrets → Add → Type "Secret"
//   Or:        npx wrangler secret put CLIENT_GALLERY_PASSWORD
// Changing the password signs everyone out (old cookies stop matching).
// If the secret isn't set, the gallery stays locked for everyone.
// ----------------------------------------------------------------

export const GALLERY_COOKIE = "gallery_session";
export const GALLERY_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const enc = new TextEncoder();

async function workerEnv(): Promise<Record<string, unknown>> {
  try {
    const { env } = (await import("cloudflare:workers")) as unknown as {
      env: Record<string, unknown>;
    };
    return env ?? {};
  } catch {
    return {};
  }
}

export async function getGalleryPassword(): Promise<string | null> {
  const value = (await workerEnv()).CLIENT_GALLERY_PASSWORD;
  return typeof value === "string" && value.length > 0 ? value : null;
}

async function hmac(key: string, message: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

const toB64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/** Constant-time compare so response timing doesn't leak how close a guess was. */
function sameBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** The cookie value for a password. Derived from the password, so it can't be forged without it. */
export async function sessionToken(password: string) {
  return toB64Url(await hmac(password, "workfolio-client-gallery-session-v1"));
}

/** True when `guess` matches the configured password. */
export async function checkPassword(guess: string) {
  const password = await getGalleryPassword();
  if (!password) return false;
  // Compare fixed-length digests, not raw strings, so lengths don't leak either.
  const [a, b] = await Promise.all([hmac("compare", guess), hmac("compare", password)]);
  return sameBytes(a, b);
}

function readCookie(cookieHeader: string | null | undefined, name: string) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

/** True when the request carries a valid gallery session cookie. */
export async function isGalleryUnlocked(cookieHeader: string | null | undefined) {
  const password = await getGalleryPassword();
  if (!password) return false;
  const got = readCookie(cookieHeader, GALLERY_COOKIE);
  if (!got) return false;
  return sameBytes(enc.encode(got), enc.encode(await sessionToken(password)));
}
