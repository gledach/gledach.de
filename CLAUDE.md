# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach). Static: eight HTML
pages, `assets/site.css`, `assets/site.js`. No build step, no framework, no dependencies.

```
/                    index.html                  signal, slot 01, shelf index at the foot
/about               about/index.html            the org, previews, requests
/signal-patterns     signal-patterns/index.html  slot 02
/whenrun             whenrun/index.html          slot 03
/phonehome           phonehome/index.html        slot 04
/recall              recall/index.html           slot 05
/talk                talk/index.html             slot 06
/snare               snare/index.html            slot 07
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
  colon, a comma, a period or a middle dot `·`. The check is over tracked files,
  because that is what ships, and it should return nothing, including this line:

  ```bash
  git ls-files -z | xargs -0 grep -lP '\x{2014}'
  ```

  The one place U+2014 does appear is `.apsolut/`, whose templates come from
  upstream and are gitignored in full. Do not rewrite them: they are not ours, they
  never reach the site, and editing them only makes the next scaffold run diverge.
- **Proof over promise.** Every claim is shown as product UI, data or evidence. A card
  with an icon and a blurb is not finished. The corollary that bites: do not invent
  output. Everything inside a `.console` is either real or labelled as a convention,
  and every `.view-shot` is a capture of a running deployment.

  **A product capture stays a capture.** Someone deciding whether to run a tool
  needs to see the screen they will actually get, and a rebuilt facsimile does
  not prove that. The three dashboard captures on the index were briefly
  replaced with HTML panels built from the same real data; they were more
  legible and they were the wrong call, because the thing being proved is
  "this is what you get", not "here is some data".

  **Fix the prose, not the picture.** The readability problem with a dense
  capture is almost always that its explanation is competing with it. Put the
  words outside the image's frame, above it rather than below, and give them a
  ground of their own. On the index that means prose in white at 22px on the
  ink section, and the capture in a white mat beside it. They stop competing
  because they are no longer the same object. A 1519px capture is still a
  texture on a phone: the words carry the meaning there and should say so.

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

Motion has exactly two jobs here. It explains a mechanism, or it confirms that
something you did registered. Nothing else qualifies.

**Entry motion reveals once and then stays revealed.** It is not scroll-driven.
A `view()` timeline does not play, it scrubs: scroll back up and every card
fades out again, scroll down and it replays. That reads as a gimmick, and it was
the reason the hero looked right and nothing else did, since the hero was always
timed rather than scrubbed.

`assets/site.js` adds `is-pre` to anything still below the fold, watches it with
an `IntersectionObserver`, and on first intersection swaps `is-pre` for `is-in`
and unobserves. Nothing ever reverses.

| Motion | Timing | Note |
|---|---|---|
| Hero children rise 12px | 560ms, staged 70ms apart | Timed cascade, above the fold |
| Non-grid blocks rise 14px | 620ms | Heads, consoles, bands, notes |
| Grid children rise 14px | 620ms, 80ms per column | The thing that makes the page feel alive |
| Captures settle 16px and scale from 0.985 | 720ms | Reads as weight, not as a zoom |
| Lead-time bars grow | 700ms, 70ms per row | The ordering the chart is arguing for |
| The sticky nav gains its border | `scroll() 0` to `64px` | The one correctly scrubbed animation: it is a state indicator, so it should track scroll both ways |

**The hero is a timed cascade, not scroll-driven.** It is above the fold, where a
view timeline has already finished before the first paint. Children stage 70ms
apart over 560ms. This is the one place the system accepts `both` hiding content
before the animation runs, and only because it is a single paint on a static file.

**Four things here are easy to get wrong, and three of them fail silently:**

- **Remove `is-pre` at the same moment you add `is-in`.** A keyframe set with
  only a `from` takes its implicit `to` from the element's computed style, so
  leaving `is-pre` on ends the animation at opacity 0: the element fades in and
  then vanishes. The swap order in `site.js` is load-bearing.
- **Animate the children, never the container as well.** The reveal selector
  excludes every grid from the block rule for exactly this reason. Animating both
  compounds the transform and the row visibly double-moves. That exclusion list
  lives in `site.js` now as well as the stylesheet: add a new grid class to both.
- **The stagger has to come from `animation-delay`, not a scroll offset.** Items
  in one row intersect at the same instant, so without a delay the row arrives as
  a slab. `--wave` is set by column and cycles every four, so the wave repeats per
  row instead of running away across a twelve-item grid.
- **Never put `is-pre` in the markup.** The hidden state is applied by script, so
  with JavaScript blocked nothing is ever hidden and the page is simply complete.
  Elements already on screen when the script runs are skipped and never hidden,
  so there is no flash after first paint. `grep is-pre *.html` must return nothing.

**How to verify it rather than eyeball it.** `getAnimations()` on a revealed
element should report `playState: "finished"` with a `delay` of 0, 80, 160 or
240ms depending on its column. Scroll away and back: it stays `finished`. Under
`prefers-reduced-motion: reduce` the script does not run at all, so `is-pre` and
`is-in` counts are both 0, every element is at opacity 1, and the bars are at
full width.

**Confirming interaction**, 120ms to 150ms:

| Motion | Where |
|---|---|
| Colour and border ease | Buttons, links, linked cards, the copy button, the menu summary |
| Arrow nudges 2 to 3px | Buttons and linked cards, on hover, because it points somewhere |
| 1px press | Buttons and the copy button, on `:active` |
| Panel fades down 4px | The tool menu, on open |

**Three rules the interaction block depends on, in that order of importance:**

- **Only on something interactive.** A transition on a static card teaches a
  reader it is clickable when it is not. The collection tiles and the stat rows
  are the most tempting things on the page to animate and are deliberately
  excluded. Check `transition-duration` is `0s` on them before shipping a change.
- **Never transition `outline`.** A focus ring has to land the instant the key is
  pressed. Only `color`, `background-color` and `border-color` are transitioned,
  which keeps focus instant by construction.
- **120ms, not 300ms.** The first reads as the element responding to you. The
  second reads as an effect being played at you.

Everything above sits inside `prefers-reduced-motion: no-preference`. Under
`reduce` the site keeps every hover state and simply snaps to it, the nav keeps
its border, and the bars sit at full width. Verified, not assumed.

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

### The nav, on every page

`gledach │ <tool> ⋯`. The organisation, then the tool you are currently in, then
the rest of the shelf behind a disclosure. The same component on all eight pages
plus the 404, because a visitor who lands on a satellite otherwise has nothing
telling them whose tool it is.

The overflow menu is a `<details>`, not a scripted dropdown, so it opens, closes
and takes the keyboard with JavaScript off. `assets/site.js` adds only Escape and
outside-click dismissal, which are the two things `<details>` lacks. Losing the
script costs the reader nothing. Do not replace it with a click handler on a div.

The tool name beside the brand is where you are, not somewhere to go, so it is ink
and carries `aria-current="page"` rather than taking the link colour. The current
tool is also marked in the menu list.

`.nav-links` carries section anchors for the page you are on, never a list of
tools: the dots own that job now. It hides under 1000px.

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
  promising that every tool shares a stack, a licence or one interface. They do have
  interfaces, and signal has a dashboard, so "no interface" is wrong as well as
  unappealing: the claim is that they are not forced into one shape. What they share is
  the promise: free, installable, runs on the reader's machine, honest about limits.
  They also share a command prefix, and that is not a shared program. There is no
  `gledach` binary that dispatches the others.
- **Commands are `gledach-<tool>`.** The shelf word stays the product, the page, the
  folder and the repository: whenrun, phonehome, recall, signal, talk, snare. The npm
  package name and the PATH command are `gledach-whenrun`, `gledach-phonehome`,
  `gledach-recall`, `gledach-signal`, `gledach-talk`, `gledach-snare`. A clone still
  runs with `node bin/<tool>.mjs` and needs no link. Do not document a bare
  `whenrun prices`, `phonehome watch`, `recall check`, `signal`, `talk once` or
  `snare check`. Those words are already
  other people's packages or programs, or they are ordinary words the next publisher
  can take. signal-patterns has no command. signal has no bin: inside that clone the
  commands stay `npm run`.
- **Design for growth.** The shelf has seven tools today and must reflow to a dozen
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

## The notes vault

Working notes live in `.apsolut/`, scaffolded on the **davinci** profile: a
numbered notebook rather than a task tracker. It is gitignored in full, so none
of it is in the repository and none of it reaches the site. `.assetsignore`
excludes it too, which is the second lock rather than the first.

```
01-thinking/    raw capture, stream of consciousness
02-ideas/       exploration, options, comparisons
03-plan/        committed plans, broken into steps
04-library/     markdown reading room: excerpts, transcripts, snippets
05-decisions/   locked-in decisions and the reasoning
06-knowledge/   reference: concepts, glossary, learned material
07-files/       cold binaries: PDFs, audio, exports
08-screenshots/ images, split into inspiration/ (keep) and bugs/ (ephemeral)
```

Flow is `01-thinking` promotes to `02-ideas`, which commits to `03-plan` or
locks into `05-decisions`. Each folder's `000-template.md` is the shape for new
entries, named `001-kebab-case.md`.

**Do not bulk-load `07-files/` or `08-screenshots/`.** Each one's
`000-template.md` is a manifest table: read it to find the single file a task
needs, then open only that file. Pull an inspiration shot for related design
work, a bug shot only when debugging that issue. Automated and Playwright
captures are regenerated test output and do not belong in the vault at all.

Two things that are deliberately absent: there is no `fires/`, because davinci
is the creative track rather than the operations one, and there are no
un-numbered drop zones, because binaries live in the numbered folders so the
vault stays an all-numbered notebook. The pre-existing `.apsolut/screenshots/`
holds design captures from before this scaffold and is left where it is.

## Local

```bash
python -m http.server 8080
```

Absolute asset paths mean opening a page from disk will not load the stylesheet. Use a
server.
