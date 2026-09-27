import { Link } from "@tanstack/react-router";
import type { ClientFolderSummary } from "../lib/client-gallery";
import { ClientPhoto } from "./client-photo";

export function ClientFolderGrid({ folders }: { folders: ClientFolderSummary[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {folders.map((f) => (
        <ClientFolderCard key={f.slugPath} folder={f} />
      ))}
    </div>
  );
}

function ClientFolderCard({ folder }: { folder: ClientFolderSummary }) {
  return (
    <Link to="/clients/$" params={{ _splat: folder.slugPath }} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted">
        {folder.cover && (
          <ClientPhoto
            photoKey={folder.cover}
            width={900}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-xl transition-colors group-hover:text-primary">
          {folder.title}
        </h2>
        <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {folder.count} {folder.count === 1 ? "photo" : "photos"}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{folder.date}</p>
    </Link>
  );
}
