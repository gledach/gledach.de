# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach): free, installable
tools that turn public data into information, insight and intelligence.

Static. No build step, no framework, no dependencies. `index.html` plus one stylesheet and
one script.

## Design

**[CLAUDE.md](./CLAUDE.md) is the source of truth for anything visual.** It carries the
ground, the type roles, the layout and motion rules, the accessibility bar, and every
deviation.

Two rules break the page loudest when missed: no em dashes anywhere, and every claim shown as
product UI or data rather than an icon with a blurb.

## Run it locally

```bash
python -m http.server 8080     # http://127.0.0.1:8080
npx serve .                    # whatever port it prints
```

Absolute asset paths mean opening `index.html` from disk will not load the stylesheet. Use a
server.

## Deploy

Cloudflare Workers with static assets. `wrangler.jsonc` is the whole configuration and
there is no Worker script, because nothing here runs server side.

| Worker Builds setting | Value |
|---|---|
| Build command | *(leave empty)* |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

Nothing is compiled, so an empty build command is correct rather than lazy. Every file in
the repository is already the artifact.

`wrangler.jsonc` sets `not_found_handling` to `404-page`, so an unmatched path serves
`404.html` with a real 404 status. Do not change it to `single-page-application`: this is a
multi-page static site and that setting would answer every bad URL with a 200 and the
homepage.

`.assetsignore` keeps documentation out of the deployed site. It also excludes `DESIGN.md`,
which is gitignored but does sit in this directory on a maintainer's machine, so a local
`wrangler deploy` cannot publish it by accident.

**The Worker name must match.** `wrangler.jsonc` says `gledach-de`. If the Worker in your
Cloudflare dashboard is called something else, change the name here or wrangler will create
a second Worker next to the first.

**Wrangler is not pinned.** With no `package.json`, `npx` fetches whatever wrangler is
current at build time. That keeps the repository dependency-free, and accepts that a
wrangler release could change behaviour without a commit here. Add a `package.json` with
wrangler as a devDependency if you would rather have reproducible builds.

### Other hosts

The site itself is host-agnostic: static files, absolute paths, no server. Any static host
serves the repository root unchanged, with `404.html` as the not-found page.
`wrangler.jsonc` and `.assetsignore` are the only Cloudflare-specific files and they are
inert everywhere else.

## Add a tool

Tool cards are hand-written HTML rather than rendered from a data file, so the content works
with JavaScript off and a crawler sees it. Adding one is a copy-paste:

1. Duplicate an `<article class="tool card">` block in the shelf section of `index.html`.
2. Give the `<h3>` an `id` and point the card's `<nav aria-label>` at the tool name.
3. Add a rung chip (`chip-accent`) and a status chip (`chip-good` live, `chip-neutral` docs,
   `chip-draft` unbuilt).
4. Write the `<p class="tool-problem">` first. One sentence naming the situation the reader
   is already in, before any sentence about what the tool is. If you cannot write it without
   inventing a reader, the tool is not ready for a card.
5. Fill `<dl class="stats">` with four figures you can defend, each with a context line.
   Never a number on its own.
6. Every card needs a real visual. A product screenshot in `<figure class="shot">`, a terminal
   capture in `<figure class="termshot">`, or a data figure like the lead-time chart. An icon
   and a paragraph is not finished.
7. Add a row to the `.shelf-index` table: slot number, what it watches, what it tells you,
   its status. Every `<td>` needs its `data-label`, which is what the stacked mobile layout
   reads from. This table is the only inventory on the page. Do not add a second one.
8. Update the "N of 12 slots filled" chip in `.index-head` and the count in the shelf `<h2>`.
9. Mirror the change into `llms.txt` and `index.md`. Both carry the same index table and the
   same situation line, and both go stale silently.
10. Add an `Offer` to the JSON-LD graph in the head, under the `Organization` node.
11. Re-render `assets/img/og-home.png`. It carries the tool names and the slot count, so it
    goes stale the moment a tool ships. See "Social cards and icons" below.

Keep the empty-slot card last, and keep it honest. It exists to say nothing is shipped there
yet, which is the opposite of a roadmap.

## Previews live on subdomains

`<tool>.gledach.de`, one per tool, replaced in place by the next export.
`signal.gledach.de` is the first: a static export of a real Signal deployment, produced by
`npm run demo:html` in [gledach/signals](https://github.com/gledach/signals). Those are
separate deployments. This repository does not host them and knows nothing about them beyond
the links in the markup.

## Social cards and icons

Two images in this repository are **rendered, not drawn**. Their sources are HTML in
`assets/og/`, which is excluded from deploy by `.assetsignore`, and the renders are
committed:

| Render | Source | Size |
|---|---|---|
| `assets/img/og-home.png` | `assets/og/og-home.html` | 1200x630 |
| `apple-touch-icon.png` | `assets/og/apple-touch-icon.html` | 180x180 |

To regenerate, serve the repository and screenshot each source at exactly its size.
Any headless Chrome will do:

```bash
python -m http.server 8080
npx -y puppeteer-core screenshot ...   # or DevTools, or Playwright
```

The only requirement is that the viewport matches the table above exactly and that
`document.fonts.ready` has resolved first, because both cards are set in Bricolage
Grotesque, Instrument Serif and Geist Mono loaded from Google Fonts. Screenshot
before the fonts land and you ship a card set in Georgia.

**`og-home.html` deliberately copies its tokens instead of importing `site.css`.** A
social card that silently restyles itself when the site does is worse than one that
holds still, and crawlers cache the render for weeks regardless.

**The card carries the slot count.** Adding a tool means re-rendering it, which is why
that is in the checklist above.

**The touch icon is square and full bleed.** iOS applies its own corner mask, so an
icon that arrives pre-rounded is rounded twice. `favicon.svg` keeps its 9px radius
because nothing masks that one.

## Agent-readable layer

This matters more here than on most sites, because the tools on this shelf exist to be
read by agents.

| File | Purpose |
|---|---|
| `llms.txt` | The shelf, the tools, the house rules, in plain text |
| `index.md` | Markdown twin of the landing page |
| JSON-LD in `index.html` | `Organization` plus an `Offer` per tool, price 0 |

All three are maintained by hand. Change the page, change all four.

## Known gaps

- **Fonts load from Google Fonts.** The design system asks for self-hosted woff2 with
  `font-display: swap` and the display face preloaded. Until that is done, the page makes a
  third-party request on render.
- **One product screenshot, used twice.** `signal-live-feed.jpg` is the only product capture
  in the repository. The hero shows a crop of its convergence rows and `signal`'s card shows
  the whole view, which reads as detail then context rather than repetition, but a second
  capture of a different view would be better. `signal-patterns` carries a data figure and
  the other three carry terminal output, which satisfies the rule without being product UI.

## Licence

MIT. See [LICENSE](./LICENSE).
