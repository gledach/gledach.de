# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach). Static: five HTML
pages, `assets/site.css`, `assets/site.js`. No build step, no framework, no dependencies.

```
/                    index.html                  signal, slot 01, shelf index at the foot
/signal-patterns     signal-patterns/index.html  slot 02
/whenrun             whenrun/index.html          slot 03
/phonehome           phonehome/index.html        slot 04
/recall              recall/index.html           slot 05
```

Satellite pages are directories, not `whenrun.html`. Cloudflare would resolve either, but
`python -m http.server` has no extensionless handling and answers `/whenrun` with a 404.
A directory gets a 301 from both. Do not flatten them.

## Design

The page follows a design system held outside this repository. The rules below are the
whole of it that applies here. Follow them rather than improvising, and if something is
not covered, match what is already on the page.

**Two rules break the page loudest when missed:**

- **No em dashes.** Not in copy, not in code comments, not in commit messages. Use a
  colon, a comma, a period or a middle dot `·`. A grep for U+2014 across this
  repository should return nothing, including this line.
- **Proof over promise.** Every claim is shown as product UI, data or evidence. A card
  with an icon and a blurb is not finished. The corollary that bites: do not invent
  output. Everything inside a `.console` is either real or labelled as a convention.

### Ground

The system is **the ledger**, adopted October 2026 from the Refero "Stripe" style after a
three-way prototype comparison. The losing two are kept in `prototypes/` with their full
reasoning in each file's head comment, and `prototypes/index.html` records why this one
won. That directory is excluded from deploy by `.assetsignore`.

In one line: **weight 300 at display size, one indigo for every action, 4px corners, and
no shadows anywhere.** Depth is a background tint progression plus 1px hairlines and 96px
gaps. If you reach for a `box-shadow`, the answer is a tint step. Full token set at the
top of `assets/site.css`.

| Token | Hex | Where it may appear |
|---|---|---|
| `--indigo-ink` | `#533afd` | Every action and link, eyebrows, command names in code, the leading-watcher flag |
| `--indigo-hover` | `#7389ff` | Link hover |
| `--indigo-press` | `#4229e8` | Filled button hover |
| `--lavender` | `#b9b9f9` | Ghost button outlines, emphasised card edges, the second rank of a bar chart |
| `--lilac` | `#d6d9fc` | Dividers inside tinted sections |
| `--periwinkle` | `#e8e9ff` | The deepest tint before the indigo itself |
| `--midnight-ink` | `#061b31` | Headings and **every paragraph** |
| `--steel` | `#50617a` | Captions and helpers |
| `--slate` | `#64748d` | Cadence lines, quiet labels, the de-emphasised headline clause |

The tint progression, which is the only depth mechanism:

```
white  →  #f8fafd  →  #e5edf5  →  #e8e9ff  →  #533afd
white      mist       frost      periwinkle   indigo
```

**The indigo is doing four jobs and must not be given a fifth.** The source style
reserves it for actions and links alone. Here it also carries eyebrows, command names in
code blocks, and the leading-watcher flag. That holds because the last three are
monospace, 11px or 12px, and uppercase or in a `pre`, none of which a reader mistakes for
a link in prose. A fifth job, especially anything set in the body face at body size,
breaks the one signal a reader has.

**Muted greys never set a paragraph.** Body copy is `--midnight-ink`. Steel and slate are
for captions, labels and cadence lines only.

**Smoke `#839bc8` is in the source palette and has no permitted use here.** It scores
2.82:1 on white and fails even the large-text threshold, so it is not in the token list
above. The de-emphasised clause in a display headline uses `.quiet`, which is slate at
4.75:1.

| Pair | Ratio |
|---|---|
| midnight ink on white | 17.4:1 |
| midnight ink on frost | 14.7:1 |
| steel on white | 6.3:1 |
| indigo on white, and white on indigo fill | 6.2:1 |
| steel on mist | 6.0:1 |
| indigo on mist | 5.9:1 |
| steel on periwinkle | 5.3:1 |
| indigo on frost | 5.2:1 |
| indigo on periwinkle | 5.2:1 |
| slate on white | 4.8:1 |
| slate on mist | 4.5:1 |
| **slate on frost** | **4.0:1, fails** |
| **slate on periwinkle** | **4.0:1, fails** |

**Slate is a white and mist colour only.** It clears 4.5:1 on both and fails on the two
deeper tints. Nothing on the site breaks this today, because every slate element sits on
white or inside a mist panel, but the trap is live: `.tile-empty` and `.card-slot` are
transparent, so dropping either into a `.tint-frost` or `.tint-peri` section puts slate
on a failing ground. Use steel there, which clears 5.3:1 on both.

Check any new value against white, `#f8fafd`, `#e5edf5` and `#e8e9ff` before using it on
text. The numbers above were computed, not estimated.

### Type

| Role | Family | Use |
|---|---|---|
| Everything | Inter Tight | 300 for every heading, 400 for body, 500 for labels |
| Label and code | JetBrains Mono | Eyebrows, chips, cadence lines, table heads, all code |

There is no separate display face and no serif. **Weight 300 at 56px is the signature:
the headlines whisper rather than shout.** Never set a heading at 500 or above. Weight
400 appears at 16px and below, and 500 only on monospace labels.

Tracking tightens as size grows, and the scale is a major second (1.125). Both are
tokenised; use the `.t-*` classes rather than ad-hoc sizes. Tabular numerals are on
globally because most of this site is figures.

A mono eyebrow in indigo uppercase sits above every `H2`. Headlines are sentence case.
The one permitted flourish is a de-emphasised final clause in `<em class="quiet">`, which
renders upright in slate, not italic and never in the link colour.

### Layout and motion

Container 1320px, gutter 40px (16px on mobile), 96px between sections (64px mobile).
Section header is a two-column split: H2 left, lead right, 1px hairline underneath.
Cards are white with a 1px `#e5edf5` border and a 4px radius. Nothing lifts on hover,
because nothing has elevation to lift from: a card border goes lavender instead.

Motion only where it explains a mechanism, and there are exactly two:

| Motion | What it explains |
|---|---|
| Section blocks rise on entry | Ordinary reveal, the only decorative one, kept subtle |
| Lead-time bars grow left to right | The ordering the chart is arguing for |

Scroll-driven animation lives inside `@supports (animation-timeline: view())`, and the
base style is always the finished state. Animations supply a `from` keyframe only. That
is what makes `prefers-reduced-motion` and any browser without view timelines land on a
complete page rather than an empty one.

**Four traps, all paid for once already:**

- **`overflow: hidden` on an ancestor breaks `view()` timelines.** It makes that ancestor
  a scroll container, the timeline resolves against it, and since it never scrolls the
  animation never runs. Use `overflow: clip`, which clips identically without creating a
  scroll container.
- **Do not animate a property that collapses the element's own box.** The element is the
  timeline's subject, so animating `width` to `0` degenerates the timeline and the
  animation never advances. The bar growth works because the fill is a child of a track
  that keeps its own width.
- **An outlined shape cannot be a border plus a `clip-path`.** The clip cuts the border
  into fragments. Use a stroked SVG polygon. Paid for in prototype A.
- **A rule like `.band a { color: white }` beats `.btn-reverse`.** A white-filled button
  inside a coloured band renders white on white unless it wins its ink back explicitly.
  `assets/site.css` does that, and any new band variant has to.

Plus one that is not a design rule:

- **Block elements (U+2581 to U+2588) only line up if one font supplies them all.** A
  display face that lacks them falls back per glyph at a different advance width and the
  column alignment collapses. Any `pre` containing a sparkline carries `class="blocks"`,
  which pins a stack that has them.

Anchor targets carry `scroll-margin-top: 96px` because the nav is sticky at 69px.

### Accessibility

Text contrast 4.5:1 minimum, `#64748d` is the lightest permitted text colour. Real
`<button>` and `<a href>`, never handlers on divs. Visible focus rings, 2px indigo at 2px
offset. 44px minimum touch targets. Colours that must be told apart also differ in
lightness: the three leading watchers carry a lavender border **and** an indigo cadence
line **and** the word "leading".

### Deviations worth knowing

- **No pricing, no login, no "Get started".** Everything here is free and installed from
  GitHub, so the nav's right side carries repository and preview links rather than an
  auth pair.
- **Fonts load from Google Fonts** rather than self-hosted woff2. That is the one
  third-party request the page makes, and it is outstanding work.
- **The social card and the touch icon are still on the old system.** Both renders
  predate the redesign. `assets/og/*.html` need rewriting against these tokens.

## Content rules

- **gledach is a shelf, not a platform.** Same author, varied shapes. Do not write copy
  promising that every tool shares a stack, a licence or an interface. What they share is
  the promise: free, installable, runs on the reader's machine, honest about limits.
- **Design for growth.** The shelf has five tools today and must reflow to a dozen
  without a redesign. Adding one is a copy of a satellite directory plus one more
  `<a class="card">`. Tiles and cards are `auto-fit` grids for the same reason. Never
  introduce a layout that hardcodes the current count.
- **Every number traces to a repository README.** If a number stops being true there,
  change it here. Two were caught stale during the redesign, so this is not theoretical.
  Facts that do not exist yet are `[BRACKETED]` placeholders, which is honest and is also
  how the empty slot is written.
- **Every tool page ships its blind spots in full.** Not a summary, not a link. The
  section is the reason the rest of the page can be believed, and it is a house rule the
  tools themselves follow.
- **Previews live on subdomains**, `<tool>.gledach.de`, one per tool, replaced in place.
  They are separate deployments. This repository only links to them.
- **Change a page, change its twins.** `index.html`, `llms.txt`, `index.md`,
  `sitemap.xml`, the JSON-LD in every page head, and the `Elsewhere on the shelf` block
  on every satellite. All of them go stale silently.

## Local

```bash
python -m http.server 8080
```

Absolute asset paths mean opening a page from disk will not load the stylesheet. Use a
server.
