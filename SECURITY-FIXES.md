# Security fixes — October 2026

What changed, and the steps to finish setup.

## Before you merge: set the gallery password
Client galleries now require a password. If it's not set, galleries stay locked for everyone.

1. Cloudflare dashboard → **Workers & Pages** → **audieisbell** → **Settings** → **Variables and Secrets** → **Add**
2. Type: **Secret**, name: `CLIENT_GALLERY_PASSWORD`, value: a long passphrase (e.g. four random words)
3. Text that password to clients along with their gallery link. Changing it signs everyone out.

## After it's live
- **Supabase:** open SQL Editor and run `supabase/security-hardening.sql` once. Order matters: the site update has to be live first.
- **Rate-limit password guesses (recommended):** Cloudflare → Security → WAF → Rate limiting rules → limit `POST` requests whose URI path contains `/_serverFn` to about 10 per minute per IP.
- **R2 bucket:** Cloudflare → R2 → `hoco2026` → Settings → make sure **Public access / r2.dev URL is disabled** and no custom domain is attached. If either is on, anyone can skip the password.

## What was fixed
| Issue | Fix |
|---|---|
| TanStack Start reflected XSS (CVE-2026-102989) | Upgraded `@tanstack/react-start` 1.168.26 → 1.169.4 |
| seroval critical + high (CVE-2026-104846) | Upgraded through TanStack → seroval 1.7.x |
| 39 build-tool advisories | `bun audit fix`. `bun audit` now reports 0 |
| Client galleries public | Password gate (`src/lib/gallery-auth.ts`), private thumbnails via the Images binding, `robots.txt` disallow, `noindex` headers |
| Photo route served any file | Images only, content type taken from the extension |
| Leaderboard forgery / exposed player IDs | `supabase/security-hardening.sql` + Sonar Dive reads the board via `sonar_board()` |
| No security headers | `src/lib/security-headers.ts` + `public/_headers` |
| `.env` not ignored | Added to `.gitignore` |
