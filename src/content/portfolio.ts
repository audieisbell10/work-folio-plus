// ================================================================
// PORTFOLIO CONTENT — EDIT THIS FILE TO UPDATE YOUR SITE
// ================================================================
// This is the single source of truth for every section of the site.
// Change names, copy, links, and image URLs here. Add or remove
// items in the arrays. The site rebuilds automatically.
// ----------------------------------------------------------------

export const site = {
  name: "Your Name",
  role: "Writer · Photographer · Marketer",
  // Shown in the browser tab and social shares.
  seoTitle: "Your Name — Portfolio",
  seoDescription:
    "Selected writings, photography, and marketing campaigns by Your Name.",
};

export const intro = {
  eyebrow: "Portfolio",
  heading: "A quiet record of words, images, and campaigns.",
  body: [
    "I write essays, make photographs, and build marketing campaigns for people and brands I believe in.",
    "This site is a living archive. Everything here is editable — swap the copy, add a piece of writing, drop in a new image, or link out to a case study.",
  ],
  // Optional portrait image URL. Leave "" to hide.
  portrait: "",
};

// ---------------- WRITINGS ----------------
// Each writing gets its own page at /writings/<slug>.
// `body` is an array of paragraphs. Add as many as you like.
export type Writing = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const writings: Writing[] = [
  {
    slug: "on-slow-mornings",
    title: "On Slow Mornings",
    date: "March 2025",
    category: "Essay",
    excerpt:
      "A short meditation on the small rituals that shape a working life — coffee, notebooks, and the discipline of staying quiet before the day begins.",
    body: [
      "There is a particular quality of light at 6:47am in early spring that I have come to depend on. It falls across the kitchen counter in a long, low band, and for the six or seven minutes it lasts, everything in the room appears both older and more useful than it did the night before.",
      "I have been thinking a lot lately about the difference between a routine and a ritual. A routine is what you do to move the day forward. A ritual is what you do to remember why the day is worth moving forward at all.",
      "Replace this text with the full body of your essay. Add as many paragraphs as you'd like by extending the `body` array in src/content/portfolio.ts.",
    ],
  },
  {
    slug: "notes-on-brand-voice",
    title: "Notes on Brand Voice",
    date: "January 2025",
    category: "Craft",
    excerpt:
      "What I've learned writing for founders — the difference between a voice that sounds like the brand and a voice that sounds like everyone else.",
    body: [
      "The first draft is almost always too clever. The second draft is almost always too safe. The voice you're looking for lives in the third draft, when you've stopped trying to impress anyone.",
      "Replace this text with the full body of your piece.",
    ],
  },
  {
    slug: "field-notes-lisbon",
    title: "Field Notes: Lisbon",
    date: "November 2024",
    category: "Travel",
    excerpt:
      "Ten days walking a city built on hills. What the light does to laundry, tile, and the patience of shopkeepers.",
    body: [
      "Lisbon is a city that rewards the pedestrian and punishes the impatient. The trams are theatrical; the sidewalks are treacherous; the pastries are non-negotiable.",
      "Replace this text with the full body of your piece.",
    ],
  },
];

// ---------------- PHOTOGRAPHY ----------------
// Paste image URLs (from your host of choice, or an upload service).
// Leave `src` as "" to render a soft placeholder tile.
export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  // "tall" | "wide" | "square" — controls grid cell shape.
  aspect?: "tall" | "wide" | "square";
};

export const photography: Photo[] = [
  { src: "", alt: "Morning window, kitchen", caption: "Home, March", aspect: "tall" },
  { src: "", alt: "Coastline at dusk", caption: "Cascais, 2024", aspect: "wide" },
  { src: "", alt: "Portrait, studio", caption: "M.R., Portrait series", aspect: "square" },
  { src: "", alt: "Cafe interior", caption: "Alfama", aspect: "square" },
  { src: "", alt: "Field, low light", caption: "Field study #4", aspect: "wide" },
  { src: "", alt: "Still life with fruit", caption: "Kitchen table", aspect: "tall" },
];

// ---------------- LINKED WORKS ----------------
// Marketing campaigns, case studies, side projects, press —
// anything that lives elsewhere on the web.
export type LinkedWork = {
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  href: string;
  // Optional thumbnail image URL.
  image?: string;
};

export const linkedWorks: LinkedWork[] = [
  {
    title: "Launch Campaign — Product X",
    client: "Client Name",
    year: "2025",
    role: "Creative direction, copy",
    summary:
      "A three-week launch that combined out-of-home, film, and a serialized newsletter. Lifted trial by 42%.",
    href: "https://example.com",
    image: "",
  },
  {
    title: "Rebrand — Studio Y",
    client: "Studio Y",
    year: "2024",
    role: "Strategy, verbal identity",
    summary:
      "Repositioning a ten-year-old design studio for a second act. New voice, new site, new client mix.",
    href: "https://example.com",
    image: "",
  },
  {
    title: "Editorial — The Quarterly",
    client: "The Quarterly",
    year: "2024",
    role: "Contributing writer",
    summary:
      "A recurring column on the craft of small businesses. Four issues, ongoing.",
    href: "https://example.com",
    image: "",
  },
];

// ---------------- CONTACT ----------------
export const contact = {
  heading: "Let's talk.",
  body: "Commissions, collaborations, or a note about something you read here — all welcome.",
  email: "hello@yourdomain.com",
  links: [
    { label: "Email", href: "mailto:hello@yourdomain.com" },
    { label: "Instagram", href: "https://instagram.com/yourhandle" },
    { label: "Are.na", href: "https://are.na/yourhandle" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  ],
};