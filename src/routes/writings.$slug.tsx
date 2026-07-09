import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { writings, site } from "../content/portfolio";

export const Route = createFileRoute("/writings/$slug")({
  loader: ({ params }) => {
    const writing = writings.find((w) => w.slug === params.slug);
    if (!writing) throw notFound();
    return { writing };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { writing } = loaderData;
    const title = `${writing.title} — ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: writing.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: writing.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: WritingPage,
  notFoundComponent: WritingNotFound,
});

function WritingPage() {
  const { writing } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-lg tracking-tight">
            {site.name}
          </Link>
          <Link
            to="/"
            hash="writings"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            ← All writings
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-secondary">{writing.category}</span>
          <span className="h-px w-8 bg-border" />
          <span>{writing.date}</span>
        </div>
        <h1 className="font-serif text-4xl leading-[1.15] text-foreground md:text-5xl">
          {writing.title}
        </h1>
        <p className="mt-6 border-l-2 border-secondary pl-5 font-serif text-lg italic leading-relaxed text-muted-foreground md:text-xl">
          {writing.excerpt}
        </p>

        <div className="mt-12 space-y-6 font-serif text-lg leading-[1.75] text-foreground md:text-xl">
          {writing.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-8 text-sm text-muted-foreground">
          <Link to="/" hash="writings" className="transition-colors hover:text-primary">
            ← Back to all writings
          </Link>
        </div>
      </article>
    </div>
  );
}

function WritingNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary">404</p>
        <h1 className="mt-4 font-serif text-3xl">This writing doesn't exist.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          It may have been renamed or removed from the archive.
        </p>
        <Link
          to="/"
          hash="writings"
          className="mt-6 inline-block border-b border-primary pb-0.5 text-sm text-primary"
        >
          Browse all writings
        </Link>
      </div>
    </div>
  );
}