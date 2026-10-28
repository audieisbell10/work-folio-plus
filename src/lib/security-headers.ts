// Security headers added to every page the Worker renders. Static files in
// /public get the same set from public/_headers. Keep the two in sync.
export const SECURITY_HEADERS: Record<string, string> = {
  // Only this site (and Lovable's editor preview) may show it in a frame — blocks clickjacking.
  "content-security-policy":
    "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app; base-uri 'self'; object-src 'none'; form-action 'self'",
  "strict-transport-security": "max-age=31536000",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

export function withSecurityHeaders(response: Response): Response {
  try {
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      if (!response.headers.has(k)) response.headers.set(k, v);
    }
    return response;
  } catch {
    // Some responses have immutable headers; copy into a new Response.
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!headers.has(k)) headers.set(k, v);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}
