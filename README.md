# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach): free, installable
tools that turn public data into information, insight and intelligence.

Static. No build step, no framework, no dependencies. Five pages, one stylesheet and one
script.

| Path | File | What it is |
|---|---|---|
| `/` | `index.html` | signal, slot 01, and the shelf index at the foot |
| `/signal-patterns` | `signal-patterns/index.html` | slot 02, the written reasoning |
| `/whenrun` | `whenrun/index.html` | slot 03 |
| `/phonehome` | `phonehome/index.html` | slot 04 |
| `/recall` | `recall/index.html` | slot 05 |

**Satellite pages are directories, not `whenrun.html`.** Cloudflare's
`auto-trailing-slash` would resolve either, but `python -m http.server` has no
extensionless handling and answers `/whenrun` with a 404. A directory gets a 301 to
`/whenrun/` from both, so the same links work locally and in production. Do not flatten
them back.

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

Every page is hand-written HTML rather than rendered from a data file, so the content
works with JavaScript off and a crawler sees it. Adding a tool is a copy-paste of an
existing satellite page plus six edits elsewhere.

1. **Copy a satellite directory.** `recall/` is the fullest and `whenrun/` the most
   typical. Rename it to the tool, and work through the page top to bottom. Slot 01 is
   the exception: `signal` is the index itself. Promoting a different tool to the index
   is a decision about what the whole site is for, not a step in this checklist.
2. **Write the hero claim and the situation first.** The `<h1>` is what the tool does in
   one sentence, with the de-emphasised clause in `<em class="quiet">`. The section under
   it names the situation the reader is already in, before any sentence about mechanism.
   If you cannot write that without inventing a reader, the tool is not ready for a page.
3. **Put real output beside the hero.** A `<figure class="console">` carrying terminal
   output, a product capture or an MCP response. Mark the bar with
   `<span class="tag tag-quiet">real output</span>` only if it is. An icon and a
   paragraph is not finished, and neither is invented output.
4. **Every page ships its blind spots.** A `<ul class="blind">` section, in full, taken
   from the tool's own README. This is a house rule, not a nicety: the section is the
   reason the rest of the page can be believed.
5. **Figures come from the tool's README.** If the README says 128 tests, the page says
   128. Where a figure does not exist yet, write a `[BRACKETED]` placeholder rather than
   an estimate.
6. **Add the card to the index.** One more `<a class="card">` in the `#shelf` section of
   `index.html`, and one more entry in the `Elsewhere on the shelf` block on every other
   satellite page. Those blocks are the cross-links and they go stale silently.
7. **Update the slot count** in the `#shelf` eyebrow of `index.html`, and the same count
   in `index.md` and `llms.txt`. It is stated in an eyebrow rather than a headline so it
   never has to be rewritten as prose.
8. **Mirror into `index.md` and `llms.txt`.** `llms.txt` carries the full per-tool entry,
   `index.md` carries the shelf table at the foot. Both go stale silently.
9. **JSON-LD, in two places.** A `SoftwareApplication` block in the new page's own head,
   and an `Offer` under the `Organization` node in `index.html`.
10. **Add the page to `sitemap.xml`.**
11. **Re-render `assets/img/og-home.png`.** It carries the tool names and the slot count,
    so it goes stale the moment a tool ships. See "Social cards and icons" below.

Keep the empty-slot card last on the index, and keep it honest. It exists to say nothing
is shipped there yet, which is the opposite of a roadmap.

## Requests live in their own repository

[`gledach/requests`](https://github.com/gledach/requests) is the public intake queue. The
empty slot card links at its issue form, which asks the three questions that decide whether
anything is watchable at all: what the reader checks by hand, where it is published, and
whether seeing it needs an account. `request@gledach.de` is the fallback for anyone who will
not open a GitHub account, and what arrives there gets filed in the queue afterwards, so the
open issues are the whole list.

**Do not point a request link at a tool's own repository.** A request for a tool that does
not exist is not an issue in a tool that does. That was the wiring until `requests` existed,
and it sent new-tool requests into signal's tracker.

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
`document.fonts.ready` has resolved first, because both cards load their faces from
Google Fonts. Screenshot before the fonts land and you ship a card set in Georgia.

**Both sources are still set in the pre-October-2026 faces** (Bricolage Grotesque,
Instrument Serif, Geist Mono) and the oxblood accent, because the redesign to the
ledger system did not touch them. They need rewriting against the tokens at the top of
`assets/site.css` before the next render, or the card will not look like the site it
links to.

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
| `llms.txt` | Every tool in full, plus the house rules, in plain text |
| `index.md` | Markdown twin of the landing page, with the shelf table at the foot |
| JSON-LD in `index.html` | `WebSite`, `WebPage`, `SoftwareApplication` for signal, `Organization` with an `Offer` per tool, `Person` |
| JSON-LD per satellite | One `SoftwareApplication` or `TechArticle` in each page's own head |
| `sitemap.xml` | Five pages plus the two agent-readable files |

All of them are maintained by hand and all of them go stale silently. Change a page,
change its twins.

## Known gaps

- **There is no product screenshot anywhere on the site.** The ledger redesign replaced
  the hero capture with the MCP response that proves the same claim, and every satellite
  proves itself with terminal output. That satisfies the proof rule, and it also means a
  visitor never sees the dashboard. Worth deciding on deliberately rather than leaving as
  a side effect.
- **`assets/img/signal-compare.jpg` and `signal-live-feed.jpg` are both unreferenced.**
  They were the hero captures before the redesign. Still in the tree, still deployed, and
  nothing links to either. Use them or delete them. Note that Compare's prose cells
  contain U+2014, so putting that one back puts em dashes on the page as pixels.
- **The social card and the touch icon are off brand.** Both renders predate the redesign
  and carry the old faces, the oxblood accent and the headline "free tools that find
  things out". The sources need rewriting against the new tokens and both need
  re-rendering. This is the largest outstanding piece.
- **Fonts load from Google Fonts.** The design system asks for self-hosted woff2 with
  `font-display: swap` and the display face preloaded. Until that is done, the page makes a
  third-party request on render.
- **The whenrun sparkline pins its own font stack.** Block elements (U+2581 to U+2588)
  only line up if every glyph comes from one font at one advance width, so any `pre`
  containing them carries `class="blocks"`. See the note in `assets/site.css`.

## Licence

MIT. See [LICENSE](./LICENSE).
