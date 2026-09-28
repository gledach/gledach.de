# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach) — free tools that turn
public noise into structured signal.

Static. No build step, no framework, no webfonts, no analytics, no dependencies. `index.html`
plus one stylesheet and one script, which is the whole thing.

## Run it locally

Any static server. Pick one:

```bash
python -m http.server 8080     # → http://127.0.0.1:8080
npx serve .                    # → whatever port it prints
```

Opening `index.html` directly from disk mostly works, but the absolute asset paths
(`/assets/site.css`) resolve against the filesystem root, so use a server.

## Deploy

Upload the repository root as-is. It is host-agnostic on purpose — no `_headers`, no
workflow, no adapter — so Cloudflare Pages, Netlify, GitHub Pages, S3 or any static host
takes it unchanged. The only host-side settings worth setting:

| Setting | Value |
|---|---|
| Build command | none |
| Output directory | `/` (repository root) |
| 404 page | `404.html` |

If you add a host-specific file later, note it here so the next person knows the page is no
longer portable.

## Add a tool

Tool cards are hand-written HTML rather than rendered from a JSON file, so the page works
with JavaScript off and a crawler sees the content. Adding one is a copy-paste:

1. Duplicate an `<article class="tool">` block in the `02 tools` section of `index.html`.
2. Set `data-kind` to `live`, `docs` or `open` — it picks the colour of the left rail and
   nothing else.
3. Give the `<h3>` an `id`, and point the card's `<nav aria-labelledby>` at it.
4. Fill the `<dl class="facts">` with four numbers you can defend. Leave it out if you
   cannot.

Keep the `not built` card last, and keep it honest — it exists to say nothing is shipped
there yet, which is the opposite of a roadmap.

## Previews live on subdomains

`<tool>-<version>.gledach.de` — one per tool, per version, never overwritten.
`signal-v1.gledach.de` is the first: a static export of a real Signal deployment, produced by
`npm run demo:html` in [gledach/signals](https://github.com/gledach/signals). Those are
separate deployments; this repository does not host them and does not know about them beyond
the links in the markup.

## Conventions worth keeping

- **Nothing third-party at render time.** The one external URL in the file is the
  `og:image`, which only social crawlers fetch. Adding a webfont or a script tag breaks a
  claim the footer makes out loud.
- **Design tokens are copied from Signal's dashboard**
  (`dashboard/viewer/viewer.css` in `gledach/signals`), so the site and the previews it links
  to look like one system. If the dashboard's palette moves, move these to match — they are
  duplicated, not shared.
- **Claims are checkable.** Every number on the page traces to a repository README. If a
  number stops being true, change it here too.

## Licence

MIT. See [LICENSE](./LICENSE).
