import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getClientPhotosBucket } from "../lib/client-photos-bucket";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

// Serves Client Gallery photos from R2 exactly as uploaded — no resizing or
// recompression. Add ?download=1 to make the browser save it as a file.
export const Route = createFileRoute("/client-photos/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const key = params._splat ?? "";
        const bucket = await getClientPhotosBucket();
        if (!bucket || !key.includes("/")) return new Response("Not found", { status: 404 });

        const object = await bucket.get(key);
        if (!object) return new Response("Not found", { status: 404 });

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        const ext = key.split(".").pop()?.toLowerCase() ?? "";
        if (!headers.has("content-type")) {
          headers.set("content-type", CONTENT_TYPES[ext] ?? "application/octet-stream");
        }
        headers.set("content-length", String(object.size));
        headers.set("etag", object.httpEtag);
        headers.set("cache-control", "public, max-age=86400");

        if (new URL(request.url).searchParams.has("download")) {
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
