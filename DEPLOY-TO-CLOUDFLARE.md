# Deploy this site to Cloudflare (auto-update on every GitHub push)

This portfolio is a TanStack Start app. It runs on **Cloudflare Workers**. Once you connect
your GitHub repo (below), Cloudflare rebuilds and republishes the live site **every time you
push to GitHub** (including changes made in Lovable) — you won't have to do anything
manually after this one-time setup.

You need: a free Cloudflare account (https://dash.cloudflare.com/sign-up).

---

## One-time setup: connect GitHub to Cloudflare

1. Go to **https://dash.cloudflare.com** and sign in.

2. In the left sidebar click **Workers & Pages**.

3. Click the **Create** button (top right).

4. Choose the **Workers** tab, then click **Connect to Git** (sometimes labeled
   "Import a repository").

5. Click **Connect GitHub**, authorize Cloudflare, and pick your **work-folio-plus**
   repository. If GitHub asks which repositories Cloudflare may access, you can choose
   just this one.

6. On the setup screen, fill in these fields **exactly**:

   | Field | What to enter |
   |-------|---------------|
   | **Project name** | `workfolio` (this becomes your web address, e.g. `workfolio.<you>.workers.dev`) |
   | **Production branch** | `main` |
   | **Build command** | `npm install && npm run build` |
   | **Deploy command** | `npx wrangler deploy` |
   | **Root directory** | Leave blank (or `/`) |

   If Cloudflare shows a "Framework preset" dropdown, choose **None** — the two commands
   above are all it needs. If some of these fields are hidden, click **"Advanced settings"**
   or **"Edit build configuration"** to reveal them.

7. Click **Save and Deploy** (or **Create and deploy**).

8. Wait ~1–3 minutes for the first build. When it finishes, Cloudflare shows a link like
   `https://workfolio.<your-name>.workers.dev` — that's your live site. Click it to check.

That's it. From now on, **every push to `main` auto-builds and updates the live site.**
You can watch each deploy under **Workers & Pages → workfolio → Deployments**.

---

## (Optional) Use your own domain

1. Open **Workers & Pages → workfolio → Settings → Domains & Routes**.
2. Click **Add** → **Custom domain**, type your domain, and follow the prompts.
   Cloudflare handles the HTTPS certificate automatically.

---

## If a build ever fails

- Open **Workers & Pages → workfolio → Deployments**, click the failed build, and read the
  log. The most common cause is a typo in the **Build command** — it must be exactly
  `npm install && npm run build`.
- You can confirm the build works on your own computer by running these two commands in
  the project folder:
  ```
  npm install
  npm run build
  ```
  If that finishes without errors locally, Cloudflare will build it too.

---

## Why Workers (not Pages)?

This site does a little work on the server — it renders pages on the fly and generates
`/sitemap.xml` on request — so it needs the Workers runtime rather than plain static
hosting. The config is already done for you in `wrangler.jsonc`.
