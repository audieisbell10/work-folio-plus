import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { site } from "../content/portfolio";
import {
  downloadUrl,
  formatBytes,
  getClientFolder,
  type ClientPhoto as Photo,
} from "../lib/client-gallery";
import { ClientGalleryHeader } from "../components/client-gallery-header";
import { ClientPhoto } from "../components/client-photo";
import { ClientFolderGrid } from "../components/client-folder-card";
import { GalleryLock } from "../components/gallery-lock";

// Any folder in the bucket, at any depth: /clients/homecoming-2026/luke-and-bae
export const Route = createFileRoute("/clients/$")({
  loader: async ({ params }) => {
    const result = await getClientFolder({ data: params._splat ?? "" });
    if (result.available && !result.locked && !result.folder) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.folder
          ? `${loaderData.folder.title} — ${site.name}`
          : `Client Gallery — ${site.name}`,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FolderPage,
  notFoundComponent: ShootNotFound,
});

function FolderPage() {
  const { locked, folder } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(null);

  if (locked) {
    return (
      <Shell>
        <p className="text-xs uppercase tracking-[0.2em] text-secondary">Client Gallery</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
          Your photos are waiting.
        </h1>
        <GalleryLock />
      </Shell>
    );
  }

  if (!folder) {
    return (
      <Shell>
        <p className="text-sm text-muted-foreground">
          Client galleries load on the live site at audieisbell.com.
        </p>
      </Shell>
    );
  }

  const { photos, folders } = folder;
  const summary = [
    folder.date,
    `${folder.count} ${folder.count === 1 ? "photo" : "photos"}`,
    formatBytes(folder.bytes),
    folders.length > 0 && `${folders.length} ${folders.length === 1 ? "gallery" : "galleries"}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Shell>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-[0.2em] text-secondary">
            <Link to="/clients" className="transition-colors hover:text-primary">
              Client Gallery
            </Link>
            {folder.crumbs.slice(0, -1).map((c) => (
              <span key={c.slugPath} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link
                  to="/clients/$"
                  params={{ _splat: c.slugPath }}
                  className="transition-colors hover:text-primary"
                >
                  {c.title}
                </Link>
              </span>
            ))}
          </nav>
          <h1 className="font-serif text-4xl leading-[1.1] md:text-5xl">{folder.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">{summary}</p>
        </div>
        {photos.length > 0 && <DownloadAll photos={photos} />}
      </div>

      {folders.length > 0 && (
        <div className="mt-14">
          {photos.length > 0 && (
            <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Galleries
            </h2>
          )}
          <ClientFolderGrid folders={folders} />
        </div>
      )}

      {photos.length > 0 && (
        <div className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4">
          {photos.map((photo, i) => (
            <figure
              key={photo.key}
              className="group relative mb-3 break-inside-avoid overflow-hidden rounded-sm bg-muted md:mb-4"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full cursor-zoom-in"
              >
                <ClientPhoto
                  photoKey={photo.key}
                  width={800}
                  alt={photo.name}
                  loading="lazy"
                  className="w-full"
                />
              </button>
              <a
                href={downloadUrl(photo.key)}
                download={photo.name}
                aria-label={`Download ${photo.name}`}
                className="absolute right-2 bottom-2 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-opacity hover:bg-background md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              >
                <Download className="size-4" />
              </a>
            </figure>
          ))}
        </div>
      )}

      {open !== null && (
        <Lightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <ClientGalleryHeader back={{ to: "/clients", label: "Client Gallery" }} />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">{children}</main>
    </div>
  );
}

// Downloads every original one after another. Browsers may ask once to
// "allow multiple downloads" — zipping on the server isn't possible within
// Cloudflare's free-plan limits for shoots this size.
function DownloadAll({ photos }: { photos: Photo[] }) {
  const [done, setDone] = useState<number | null>(null);

  async function start() {
    for (let i = 0; i < photos.length; i++) {
      setDone(i);
      const a = document.createElement("a");
      a.href = downloadUrl(photos[i].key);
      a.download = photos[i].name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise((r) => setTimeout(r, 700));
    }
    setDone(photos.length);
  }

  const running = done !== null && done < photos.length;

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <button
        type="button"
        onClick={start}
        disabled={running}
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
      >
        <Download className="size-4" />
        {running ? `Downloading ${done + 1} of ${photos.length}…` : "Download all"}
      </button>
      <span className="max-w-xs text-xs text-muted-foreground md:text-right">
        {running
          ? "Keep this page open until it finishes."
          : done === photos.length
            ? "All photos sent to your downloads."
            : "Full resolution, exactly as taken. Your browser may ask to allow multiple downloads."}
      </span>
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  const prev = () => onChange((index - 1 + photos.length) % photos.length);
  const next = () => onChange((index + 1) % photos.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-foreground text-background">
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm md:px-6">
        <span className="opacity-70">
          {index + 1} / {photos.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden opacity-70 sm:inline">
            {photo.name} · {formatBytes(photo.bytes)}
          </span>
          <a
            href={downloadUrl(photo.key)}
            download={photo.name}
            className="inline-flex items-center gap-2 rounded-sm bg-background px-4 py-2 font-medium text-foreground transition-colors hover:bg-background/90"
          >
            <Download className="size-4" />
            Download original
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 opacity-70 hover:opacity-100"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 md:px-16">
        <ClientPhoto
          key={photo.key}
          photoKey={photo.key}
          width={2400}
          alt={photo.name}
          className="max-h-full max-w-full object-contain"
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 -translate-y-1/2 p-3 opacity-70 hover:opacity-100 md:left-4"
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-3 opacity-70 hover:opacity-100 md:right-4"
            >
              <ChevronRight className="size-7" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ShootNotFound() {
  return (
    <Shell>
      <div className="mx-auto max-w-md py-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary">Not found</p>
        <h1 className="mt-4 font-serif text-3xl">This gallery doesn't exist.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Double-check the link you were sent, or browse all client galleries.
        </p>
        <Link
          to="/clients"
          className="mt-6 inline-block border-b border-primary pb-0.5 text-sm text-primary"
        >
          All client galleries
        </Link>
      </div>
    </Shell>
  );
}
