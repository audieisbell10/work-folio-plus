import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getClientPhotosBucket } from "../lib/client-photos-bucket";
import { isGalleryUnlocked } from "../lib/gallery-auth";
import { PHOTO_WIDTHS } from "../lib/client-gallery";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

// Minimal slice of Cloudflare's Images binding (wrangler.jsonc → "images").
type ImagesBinding = {
  input: (stream: ReadableStream) => {
    transform: (opts: { width: number; fit?: string }) => {
      output: (opts: { format: string; quality?: number }) => Promise<{ response: () => Response }>;
    };
  };
};

async function imagesBinding(): Promise<ImagesBinding | null> {
  try {
    const { env } = (await import("cloudflare:workers")) as unknown as {
      env: { IMAGES?: ImagesBinding };
    };
    return env.IMAGES ?? null;
  } catch {
    return null;
  }
}

const notFound = () => new Response("Not found", { status: 404 });

// Client Gallery photos, password-checked on every request.
//   /client-photos/<key>             the original, byte for byte
//   /client-photos/<key>?w=800       a resized copy for grids (fixed widths only)
//   /client-photos/<key>?download=1  the original, saved as a file
export const Route = createFileRoute("/client-photos/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        if (!(await isGalleryUnlocked(request.headers.get("cookie")))) {
          return new Response("Gallery locked", {
            status: 401,
            headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
          });
        }

        const key = params._splat ?? "";
        const ext = key.split(".").pop()?.toLowerCase() ?? "";
        // Only photos are ever served — anything else in the bucket stays private.
        if (!key.includes("/") || !(ext in CONTENT_TYPES)) return notFound();

        const bucket = await getClientPhotosBucket();
        if (!bucket) return notFound();

        const url = new URL(request.url);
        const base = new Headers({
          // Browser-only cache: shared caches/CDNs must never hand these to someone else.
          "cache-control": "private, max-age=86400",
          "x-robots-tag": "noindex, nofollow, noimageindex",
          "x-content-type-options": "nosniff",
          vary: "Cookie",
        });

        // Resized copy, made right here so it never lands in a public cache.
        const w = Number(url.searchParams.get("w"));
        if ((PHOTO_WIDTHS as readonly number[]).includes(w)) {
          const images = await imagesBinding();
          const source = images ? await bucket.get(key) : null;
          if (images && source) {
            try {
              const accept = request.headers.get("accept") ?? "";
              const format = accept.includes("image/avif")
                ? "image/avif"
                : accept.includes("image/webp")
                  ? "image/webp"
                  : "image/jpeg";
              const result = await images
                .input(source.body)
                .transform({ width: w, fit: "scale-down" })
                .output({ format, quality: 82 });
              const resized = result.response();
              const headers = new Headers(base);
              headers.set("content-type", resized.headers.get("content-type") ?? format);
              headers.append("vary", "Accept");
              return new Response(resized.body, { headers });
            } catch (error) {
              console.error("Resize failed, serving original", error);
            }
          }
          // No Images binding (or it failed): fall through to the original.
        }

        const object = await bucket.get(key);
        if (!object) return notFound();

        const headers = new Headers(base);
        // Content type comes from the extension, not upload metadata, so a
        // mislabeled upload can never be served as a web page.
        headers.set("content-type", CONTENT_TYPES[ext]);
        headers.set("content-length", String(object.size));
        headers.set("etag", object.httpEtag);

        if (url.searchParams.has("download")) {
          const name = key.split("/").pop() ?? "photo";
          const ascii = name.replace(/[^\x20-\x7e]|"/g, "_");
          headers.set(
            "content-disposition",
            `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
          );
        }

        return new Response(object.body, { headers });
      },
    },
  },
});
