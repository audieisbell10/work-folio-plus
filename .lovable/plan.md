## Profile Picture Placement

Your intro section already has a dedicated portrait slot built in — a two-column grid with your name and bio on the left, and space for an image on the right. The only thing missing is the image URL.

### What we'll do

1. **Refine the portrait frame** — adjust the container to a 3:4 vertical aspect ratio with a soft rounded border, perfect for a classic head-and-shoulders crop. This feels like a traditional editorial portrait next to your intro text.

2. **Add a visible placeholder** — when no image is set, show a subtle placeholder tile so you can see exactly where the photo will sit. This makes it obvious where to drop your image.

3. **Wire up the drop-in path** — all you'll need to do is paste an image URL into `src/content/portfolio.ts` under `intro.portrait`, or drop a file into `public/` and reference it. The layout handles the rest.

### Placement
- Top of the page, right column of the intro section — beside your name, role, and bio. This is the most natural, expected location for a portfolio headshot.

### No-code update path
After this change, updating your photo is a single-line edit in `src/content/portfolio.ts`:
```ts
portrait: "/your-photo.jpg",
```
