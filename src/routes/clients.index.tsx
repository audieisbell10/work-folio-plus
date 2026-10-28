import { createFileRoute } from "@tanstack/react-router";
import { site } from "../content/portfolio";
import { getClientFolder } from "../lib/client-gallery";
import { ClientGalleryHeader } from "../components/client-gallery-header";
import { ClientFolderGrid } from "../components/client-folder-card";
import { GalleryLock } from "../components/gallery-lock";

export const Route = createFileRoute("/clients/")({
  loader: () => getClientFolder({ data: "" }),
  head: () => ({
    meta: [
      { title: `Client Gallery — ${site.name}` },
      { name: "description", content: `Full-resolution photo galleries by ${site.name}.` },
      // Client photos stay out of search engines even though the page is public.
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ClientGalleryPage,
});

function ClientGalleryPage() {
  const { available, locked, folder } = Route.useLoaderData();
  const shoots = folder?.folders ?? [];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <ClientGalleryHeader back={{ to: "/", label: "Portfolio" }} />

      <main className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-secondary">Client Gallery</p>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] md:text-5xl">
          Your photos, at full resolution.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {locked
            ? "Galleries are private. Enter your password to see your shoot."
            : "Find your shoot below. Every photo downloads at the exact quality it was taken."}
        </p>

        {locked ? (
          <GalleryLock />
        ) : !available ? (
          <EmptyNote>Client galleries load on the live site at audieisbell.com.</EmptyNote>
        ) : shoots.length === 0 ? (
          <EmptyNote>New galleries are on the way — check back soon.</EmptyNote>
        ) : (
          <div className="mt-16">
            <ClientFolderGrid folders={shoots} />
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-16 rounded-sm border border-dashed border-border bg-muted/50 px-6 py-10 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}
