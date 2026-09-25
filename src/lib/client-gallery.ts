// ================================================================
// CLIENT GALLERY — reads shoots straight from Cloudflare R2
// ================================================================
// Each top-level folder in the R2 bucket is one shoot, and its folder
// name is the link: a folder "emmas-30th" appears at /clients/emmas-30th.
// Drop photos into the folder and they show up automatically.
// Optional nicer titles/dates live in src/content/portfolio.ts (clientShoots).
// ----------------------------------------------------------------

import { createServerFn } from "@tanstack/react-start";
import { clientShoots } from "../content/portfolio";
import { getClientPhotosBucket, type R2Bucket, type R2Object } from "./client-photos-bucket";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

export type ClientPhoto = { key: string; name: string; bytes: number };
export type ClientShootSummary = {
  slug: string;
  title: string;
  date: string;
  cover: string | null;
  count: number;
  bytes: number;
};
export type ClientShoot = ClientShootSummary & { photos: ClientPhoto[] };

async function listPhotos(bucket: R2Bucket, slug: string) {
  const objects: R2Object[] = [];
  let cursor: string | undefined;
  do {
    const page = await bucket.list({ prefix: `${slug}/`, cursor, limit: 1000 });
    objects.push(...page.objects);
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return objects
    .filter((o) => IMAGE_EXT.test(o.key))
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
}

function summarize(slug: string, objects: R2Object[]): ClientShootSummary {
  const config = clientShoots.find((s) => s.folder === slug);
  const newest = objects.reduce<Date | null>(
    (d, o) => (!d || o.uploaded > d ? o.uploaded : d),
    null,
  );
  return {
    slug,
    title: config?.title || titleFromFolder(slug),
    date:
      config?.date ||
      (newest ? newest.toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""),
    cover: config?.cover ? `${slug}/${config.cover}` : (objects[0]?.key ?? null),
    count: objects.length,
    bytes: objects.reduce((sum, o) => sum + o.size, 0),
  };
}

function titleFromFolder(slug: string) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export const getClientShoots = createServerFn({ method: "GET" }).handler(async () => {
  const bucket = await getClientPhotosBucket();
  if (!bucket) return { available: false as const, shoots: [] };

  const { delimitedPrefixes } = await bucket.list({ delimiter: "/" });
  const shoots = await Promise.all(
    delimitedPrefixes.map(async (prefix) => {
      const slug = prefix.replace(/\/$/, "");
      return summarize(slug, await listPhotos(bucket, slug));
    }),
  );
  return { available: true as const, shoots: shoots.filter((s) => s.count > 0) };
});

export const getClientShoot = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const bucket = await getClientPhotosBucket();
    if (!bucket) return { available: false as const, shoot: null };

    const objects = await listPhotos(bucket, slug);
    if (objects.length === 0) return { available: true as const, shoot: null };

    const shoot: ClientShoot = {
      ...summarize(slug, objects),
      photos: objects.map((o) => ({
        key: o.key,
        name: o.key.slice(slug.length + 1),
        bytes: o.size,
      })),
    };
    return { available: true as const, shoot };
  });

// ---------------- URLs used by the pages ----------------

const encodeKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");

/** The exact original file, byte for byte. */
export const originalUrl = (key: string) => `/client-photos/${encodeKey(key)}`;
export const downloadUrl = (key: string) => `${originalUrl(key)}?download=1`;

/** A smaller copy made by Cloudflare Image Transformations, for fast grids. */
export const resizedUrl = (key: string, width: number) =>
  `/cdn-cgi/image/width=${width},quality=82,fit=scale-down,format=auto${originalUrl(key)}`;

export function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
