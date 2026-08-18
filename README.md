# AMARA Villas

A concept microsite for thirty-two standalone villas on their own plots, along
two garden streets on Lake Road, Telibandha, Raipur. Built for the S7 Labs
portfolio as the `real-estate` case study.

**Light, held in stone.** Warm ivory, terracotta and espresso; a high-contrast
serif for display, monospace for every number.

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # → dist/
npm run preview
```

## What is interesting about it

**Real houses, not one building.** Amara is not an apartment tower — it is
thirty-two independent villas, each on its own plot, facing each other across
two garden streets. Every villa type carries its own front elevation
photograph, its own plan, and its own set of interior photographs (living,
bedroom, bath, kitchen), so a visitor can see the actual home rather than
imagine one from a floor plan alone.

**Photographed and drawn, on purpose.** Villa exteriors and every interior
room are real photographs — a plan cannot tell you what a room feels like. The
masterplan, the four floor plans, the jaali module and the drive-time diagram
stay SVG, because a drawing states an intention where a photograph only states
a finish. Photographs live in `public/photos` as WebP; see
`public/photos/CREDITS.md` for sources and licence (all free, Unsplash
License — checked individually against Unsplash's paid-tier flag).

**Every villa card pairs elevation, plan and interiors.** Front elevation on
top, floor plan beneath it, three interior photographs below that — the same
pairing repeats in the availability explorer's detail panel, so browsing by
type and browsing by plot both end at the same picture of the home.

**One source of truth for inventory.** `src/data/project.js` declares the
thirty-two villas once, as a two-street, sixteen-plot-per-street layout.
Availability counts, the per-type "3 available" labels, the explorer, the
price list and the enquiry dropdown all derive from it, so a villa cannot be
sold in one place and available in another.

**The availability explorer** (`src/components/PlanExplorer.jsx`) is the
centrepiece — the community drawn as two streets of numbered plots, where
every plot is a button. Selecting one loads its villa's elevation, plan,
aspect and price, and carries that plot into the viewing form below.

## Layout

```
public/photos/          The photography, WebP, with CREDITS.md alongside.
src/
  data/project.js        Every number and every photo the site states. Edit here.
  styles/index.css       Design tokens (@theme), base layer, the grain overlay.
  lib/motion.js          Smooth scroll, scrollToTop, reveal observer, scroll progress.
  components/
    Hero.jsx             The one dark section — a dusk arrival photograph.
    Figures.jsx          The jaali module — the one chapter drawn rather than shot.
    PlanDrawing.jsx      One renderer, four villa layouts, one shared scale.
    PlanExplorer.jsx     The plot-by-plot availability tool.
    Residences.jsx       The four villa cards — elevation, plan, interiors.
    Gallery.jsx          Masonry plates with a keyboard-navigable lightbox.
    BackToTop.jsx        Fixed lower-right control; the ring is read position.
    ...
```

## Notes

- `base: './'` in `vite.config.js`, so `dist/` can be served from a subpath
  (GitHub Pages project sites).
- The hero is the one section set dark rather than ivory: its photograph is a
  dusk shot, and the site's usual light scrim would have muddied it. Every
  other section stays on the warm ivory palette.
- Lenis owns the scroll position and will pull the page back if anything sets
  `scrollTop` underneath it, so every programmatic scroll goes through
  `scrollToTop` in `lib/motion.js`. It asks Lenis when Lenis is running and
  falls back to the native call when it is not.
- Under `prefers-reduced-motion`, Lenis is never loaded and reveals resolve
  immediately.
- In dev only, the Lenis instance is also exposed as `window.__lenis`, which is
  what screenshot passes drive.
