import { Link } from "@tanstack/react-router";
import { site } from "../content/portfolio";

export function ClientGalleryHeader({ back }: { back?: { to: "/" | "/clients"; label: string } }) {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-serif text-lg tracking-tight">
          {site.name}
        </Link>
        {back && (
          <Link
            to={back.to}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ← {back.label}
          </Link>
        )}
      </div>
    </header>
  );
}
