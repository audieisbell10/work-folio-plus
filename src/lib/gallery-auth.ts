// ================================================================
// CLIENT GALLERY PASSWORD — server-only
// ================================================================
// The gallery is locked with one shared password, stored as a Cloudflare
// Worker secret named CLIENT_GALLERY_PASSWORD (never in this repo).
//   Set it:    Cloudflare dashboard → Workers & Pages → audieisbell →
//              Settings → Variables and Secrets → Add → Type "Secret"
//   Or:        npx wrangler secret put CLIENT_GALLERY_PASSWORD
// Visitors are asked again every 3 days. Changing the password signs everyone out.
// If the secret isn't set, the gallery stays locked for everyone.
// ----------------------------------------------------------------

export const GALLERY_COOKIE = "gallery_session";
export const GALLERY_COOKIE_MAX_AGE = 60 * 60 * 24 * 3; // 3 days, then the password is asked again

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

/**
 * The cookie value: "<issued-at seconds>.<signature>". The signature covers the
 * time and is keyed by the password, so it can't be forged or have its date
 * pushed forward without knowing the password.
 */
export async function sessionToken(password: string, issuedAt = Math.floor(Date.now() / 1000)) {
  const sig = toB64Url(await hmac(password, `workfolio-client-gallery-session-v2:${issuedAt}`));
  return `${issuedAt}.${sig}`;
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
  const issuedAt = Number(got.split(".")[0]);
  if (!Number.isInteger(issuedAt)) return false;
  // Enforced here too, not just by the browser's cookie expiry, so a copied
  // cookie stops working after 3 days no matter where it's used.
  const age = Math.floor(Date.now() / 1000) - issuedAt;
  if (age < -300 || age > GALLERY_COOKIE_MAX_AGE) return false;
  return sameBytes(enc.encode(got), enc.encode(await sessionToken(password, issuedAt)));
}
