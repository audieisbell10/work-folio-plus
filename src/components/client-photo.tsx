import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { originalUrl, resizedUrl } from "../lib/client-gallery";

// Shows a Cloudflare-resized copy for speed. If image transformations aren't
// enabled for the domain (or on localhost), falls back to the original file.
export function ClientPhoto({
  photoKey,
  width,
  ...props
}: { photoKey: string; width: number } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src">) {
  const ref = useRef<HTMLImageElement>(null);
  const [useOriginal, setUseOriginal] = useState(false);

  // The error can fire before React hydrates, so check once on mount too.
  // (Callers remount this with a React `key` when the photo changes.)
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setUseOriginal(true);
  }, []);

  return (
    <img
      ref={ref}
      src={useOriginal ? originalUrl(photoKey) : resizedUrl(photoKey, width)}
      onError={() => setUseOriginal(true)}
      {...props}
    />
  );
}
