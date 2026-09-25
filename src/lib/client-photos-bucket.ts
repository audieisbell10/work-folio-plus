// Server-only access to the Client Gallery R2 bucket (binding CLIENT_PHOTOS in
// wrangler.jsonc). Only import this from server functions and server routes.

// Minimal slice of the R2 API we use (full types live in @cloudflare/workers-types).
export type R2Object = { key: string; size: number; uploaded: Date };
export type R2ObjectBody = R2Object & {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata: (headers: Headers) => void;
};
type R2ListResult = {
  objects: R2Object[];
  delimitedPrefixes: string[];
  truncated: boolean;
  cursor?: string;
};
export type R2Bucket = {
  list: (opts: {
    prefix?: string;
    delimiter?: string;
    cursor?: string;
    limit?: number;
  }) => Promise<R2ListResult>;
  get: (key: string) => Promise<R2ObjectBody | null>;
};

// The bucket only exists on Cloudflare. In Lovable's editor preview this
// returns null and the pages show a friendly "live site only" message.
export async function getClientPhotosBucket(): Promise<R2Bucket | null> {
  try {
    const { env } = (await import("cloudflare:workers")) as unknown as {
      env: { CLIENT_PHOTOS?: R2Bucket };
    };
    return env.CLIENT_PHOTOS ?? null;
  } catch {
    return null;
  }
}
