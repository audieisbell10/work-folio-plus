// ================================================================
// CLIENT GALLERY — reads shoots straight from Cloudflare R2
// ================================================================
// Every folder in the R2 bucket is a gallery with its own link, at any
// depth. A folder "Homecoming 2026" appears at /clients/homecoming-2026,
// and a folder inside it, "Luke and Bae", at
// /clients/homecoming-2026/luke-and-bae. A folder's page shows cards for
// the folders inside it, plus any photos sitting directly in it.
// Drop photos into a folder and they show up automatically.
// Optional nicer titles/dates live in src/content/portfolio.ts (clientShoots).
// ----------------------------------------------------------------

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setCookie } from "@tanstack/react-start/server";
import { clientShoots } from "../content/portfolio";
import { getClientPhotosBucket, type R2Bucket, type R2Object } from "./client-photos-bucket";
import {
  GALLERY_COOKIE,
  GALLERY_COOKIE_MAX_AGE,
  checkPassword,
  getGalleryPassword,
  isGalleryUnlocked,
  sessionToken,
} from "./gallery-auth";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

export type ClientPhoto = { key: string; name: string; bytes: number };
export type ClientFolderSummary = {
  /** Link path under /clients, e.g. "homecoming-2026/luke-and-bae". */
  slugPath: string;
  title: string;
  date: string;
  cover: string | null;
  /** Photos in this folder and every folder inside it. */
  count: number;
  bytes: number;
};
export type ClientFolder = ClientFolderSummary & {
  crumbs: { title: string; slugPath: string }[];
  folders: ClientFolderSummary[];
  photos: ClientPhoto[];
};

/** "Harper and The Girls" → "harper-and-the-girls" (for tidy, textable links). */
export function slugify(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || encodeURIComponent(name)
  );
}

const byKey = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });
const lastName = (prefix: string) => prefix.replace(/\/$/, "").split("/").pop() ?? "";

/** Photos directly in `prefix` plus the names of folders directly inside it. */
async function listLevel(bucket: R2Bucket, prefix: string) {
  const objects: R2Object[] = [];
  const prefixes: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await bucket.list({ prefix, delimiter: "/", cursor, limit: 1000 });
    objects.push(...page.objects);
    prefixes.push(...page.delimitedPrefixes);
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return {
    photos: objects.filter((o) => IMAGE_EXT.test(o.key)).sort((a, b) => byKey(a.key, b.key)),
    prefixes: prefixes.sort(byKey),
  };
}

/** Every photo anywhere under `prefix`. */
async function listAll(bucket: R2Bucket, prefix: string) {
  const objects: R2Object[] = [];
  let cursor: string | undefined;
  do {
    const page = await bucket.list({ prefix, cursor, limit: 1000 });
    objects.push(...page.objects);
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return objects.filter((o) => IMAGE_EXT.test(o.key)).sort((a, b) => byKey(a.key, b.key));
}

/** Turns link segments back into the real folder prefix ("Homecoming 2026/Luke and Bae/"). */
async function resolveFolder(bucket: R2Bucket, segments: string[]) {
  let prefix = "";
  const slugs: string[] = [];
  const crumbs: { title: string; slugPath: string }[] = [];
  for (const segment of segments) {
    const { prefixes } = await listLevel(bucket, prefix);
    // Exact folder names keep old links like /clients/Homecoming%202026 working.
    const match =
      prefixes.find((p) => lastName(p) === segment) ??
      prefixes.find((p) => slugify(lastName(p)) === slugify(segment));
    if (!match) return null;
    prefix = match;
    slugs.push(slugify(lastName(match)));
    crumbs.push({ title: folderTitle(match), slugPath: slugs.join("/") });
  }
  return { prefix, crumbs };
}

function folderTitle(prefix: string) {
  const path = prefix.replace(/\/$/, "");
  const config = clientShoots.find((s) => s.folder === path);
  if (config?.title) return config.title;
  const name = lastName(prefix);
  // Folder names with dashes/underscores ("emmas-30th") read better as words.
  return /\s/.test(name)
    ? name
    : name
        .split(/[-_]+/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
}

function summarize(prefix: string, slugPath: string, photos: R2Object[]): ClientFolderSummary {
  const config = clientShoots.find((s) => s.folder === prefix.replace(/\/$/, ""));
  const newest = photos.reduce<Date | null>(
    (d, o) => (!d || o.uploaded > d ? o.uploaded : d),
    null,
  );
  return {
    slugPath,
    title: folderTitle(prefix),
    date:
      config?.date ||
      (newest ? newest.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""),
    cover: config?.cover ? `${prefix}${config.cover}` : (photos[0]?.key ?? null),
    count: photos.length,
    bytes: photos.reduce((sum, o) => sum + o.size, 0),
  };
}

/** A folder's page: its subfolders as cards and the photos directly inside it. "" = the top level. */
export const getClientFolder = createServerFn({ method: "GET" })
  .validator((path: string) => path)
  .handler(async ({ data: path }) => {
    const bucket = await getClientPhotosBucket();
    if (!bucket) return { available: false as const, locked: false as const, folder: null };
    // Nothing about any shoot (names, counts, photos) is sent until the password is entered.
    if (!(await isGalleryUnlocked(getRequestHeader("cookie")))) {
      return { available: true as const, locked: true as const, folder: null };
    }

    const resolved = await resolveFolder(bucket, path.split("/").filter(Boolean));
    if (!resolved) return { available: true as const, locked: false as const, folder: null };
    const { prefix, crumbs } = resolved;
    const slugPath = crumbs.at(-1)?.slugPath ?? "";

    const [level, all] = await Promise.all([listLevel(bucket, prefix), listAll(bucket, prefix)]);
    const folders = (
      await Promise.all(
        level.prefixes.map(async (sub) =>
          summarize(
            sub,
            [slugPath, slugify(lastName(sub))].filter(Boolean).join("/"),
            await listAll(bucket, sub),
          ),
        ),
      )
    ).filter((f) => f.count > 0);

    if (prefix && all.length === 0) {
      return { available: true as const, locked: false as const, folder: null };
    }

    const folder: ClientFolder = {
      ...summarize(prefix, slugPath, all),
      crumbs,
      folders,
      // Loose files at the very top of the bucket aren't part of any shoot.
      photos: prefix
        ? level.photos.map((o) => ({ key: o.key, name: o.key.slice(prefix.length), bytes: o.size }))
        : [],
    };
    return { available: true as const, locked: false as const, folder };
  });

/** Checks the gallery password and, if right, sets a 30-day session cookie. */
export const unlockGallery = createServerFn({ method: "POST" })
  .validator((password: unknown) => (typeof password === "string" ? password.slice(0, 200) : ""))
  .handler(async ({ data: password }) => {
    if (!(await getGalleryPassword())) return { ok: false as const, reason: "not-set" as const };
    if (!(await checkPassword(password))) {
      // Slow down guessing a little. (For real rate limiting, add a Cloudflare
      // rate-limiting rule on POST /_serverFn* — see SECURITY-FIXES.md.)
      await new Promise((r) => setTimeout(r, 800));
      return { ok: false as const, reason: "wrong" as const };
    }
    setCookie(GALLERY_COOKIE, await sessionToken(password), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: GALLERY_COOKIE_MAX_AGE,
    });
    return { ok: true as const };
  });

// ---------------- URLs used by the pages ----------------

const encodeKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");

/** The exact original file, byte for byte. */
export const originalUrl = (key: string) => `/client-photos/${encodeKey(key)}`;
export const downloadUrl = (key: string) => `${originalUrl(key)}?download=1`;

/** Widths the photo route will resize to (a fixed list, so nobody can run up transformation costs). */
export const PHOTO_WIDTHS = [400, 800, 1200, 1600, 2400] as const;

/**
 * A smaller copy for fast grids, resized inside the password-checked photo
 * route (not the public /cdn-cgi/image cache, which would skip the password).
 */
export const resizedUrl = (key: string, width: number) => {
  const w = PHOTO_WIDTHS.find((x) => x >= width) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];
  return `${originalUrl(key)}?w=${w}`;
};

export function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
