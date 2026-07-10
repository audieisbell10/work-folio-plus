import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  site,
  intro,
  writings,
  photography,
  linkedWorks,
  contact,
} from "../content/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteNav />
      <main>
        <IntroSection />
        <WritingsSection />
        <PhotographySection />
        <LinkedWorksSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  const items = [
    { href: "#intro", label: "Intro" },
    { href: "#writings", label: "Writings" },
    { href: "#photography", label: "Photography" },
    { href: "#works", label: "Works" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#intro" className="font-serif text-lg tracking-tight text-foreground">
          {site.name}
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="transition-colors hover:text-primary">
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-secondary">{eyebrow}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        {title && (
          <h2 className="mb-12 max-w-3xl font-serif text-3xl leading-tight md:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section id="intro" className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-secondary">
          {intro.eyebrow} — {site.role}
        </p>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] text-foreground md:text-6xl">
          {intro.heading}
        </h1>
        <div className="mt-10 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function WritingsSection() {
  return (
    <Section id="writings" eyebrow="Writings" title="Essays, notes, and field reports.">
      <ul className="divide-y divide-border">
        {writings.map((w) => (
          <li key={w.slug}>
            <Link
              to="/writings/$slug"
              params={{ slug: w.slug }}
              className="group grid gap-4 py-8 md:grid-cols-[9rem_1fr_auto] md:items-baseline"
            >
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <div>{w.date}</div>
                <div className="mt-1 text-secondary">{w.category}</div>
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-snug text-foreground transition-colors group-hover:text-primary md:text-3xl">
                  {w.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {w.excerpt}
                </p>
              </div>
              <span className="text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100 md:self-center">
                Read →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function PhotoTile({ photo }: { photo: (typeof photography)[number] }) {
  const aspect =
    photo.aspect === "tall"
      ? "aspect-[3/4]"
      : photo.aspect === "wide"
      ? "aspect-[16/10] md:col-span-2"
      : "aspect-square";
  return (
    <figure className={`${aspect} group relative overflow-hidden rounded-sm bg-muted`}>
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-secondary/20 p-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
          {photo.alt}
        </div>
      )}
      {photo.caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

function PhotographySection() {
  return (
    <Section id="photography" eyebrow="Photography" title="Selected frames.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {photography.map((p, i) => (
          <PhotoTile key={i} photo={p} />
        ))}
      </div>
    </Section>
  );
}

function LinkedWorksSection() {
  return (
    <Section id="works" eyebrow="Linked Works" title="Campaigns, collaborations, and clients.">
      <div className="grid gap-6 md:grid-cols-2">
        {linkedWorks.map((w) => (
          <a
            key={w.title}
            href={w.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary/60"
          >
            {w.image ? (
              <img
                src={w.image}
                alt={w.title}
                className="mb-5 aspect-[16/9] w-full rounded-sm object-cover"
              />
            ) : (
              <div className="mb-5 flex aspect-[16/9] w-full items-center justify-center rounded-sm bg-gradient-to-br from-secondary/20 to-primary/10 text-xs uppercase tracking-widest text-muted-foreground">
                {w.client}
              </div>
            )}
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <span>{w.client}</span>
              <span>{w.year}</span>
            </div>
            <h3 className="font-serif text-xl text-foreground transition-colors group-hover:text-primary">
              {w.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {w.summary}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-secondary">{w.role}</span>
              <span className="text-primary">Visit ↗</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function PortraitFrame({ src }: { src: string }) {
  return src ? (
    <img
      src={src}
      alt={site.name}
      className="aspect-[3/4] w-full rounded-sm object-cover shadow-sm"
    />
  ) : (
    <div className="flex aspect-[3/4] w-full items-center justify-center rounded-sm border border-dashed border-primary-foreground/40 bg-primary-foreground/10">
      <span className="text-xs uppercase tracking-[0.15em] opacity-60">
        Portrait
      </span>
    </div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div>
          <p className="mb-8 text-xs uppercase tracking-[0.2em] opacity-70">Contact</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
            {contact.body}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-10 inline-block border-b border-primary-foreground/40 pb-1 font-serif text-2xl transition-colors hover:border-primary-foreground md:text-3xl"
          >
            {contact.email}
          </a>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {contact.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>Edit content in <code className="rounded bg-muted px-1.5 py-0.5">src/content/portfolio.ts</code></span>
      </div>
    </footer>
  );
}
