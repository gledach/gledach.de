# HANDOFF: gledach.de

Rewritten 2026-10-13. The landing page for the gledach organisation.

## Required reading, in order

1. `CLAUDE.md`: the design system, the content rules, and five traps already paid for
2. `README.md`: how to run it, deploy it, add a tool, and re-render the social cards
3. `index.html`: the whole site. There is no framework and no build step

## Current state

| | |
|---|---|
| Branch | `main`, with the signal section uncommitted |
| Head | `e8d9d49`, signed and pushed |
| Build | none. `index.html` plus one stylesheet and one script |
| Deploy | Cloudflare Workers static assets via `wrangler.jsonc` |
| Serving | **Not live.** See the blocker below |

Run it with `python -m http.server 8080` from the repo root. Opening `index.html` from
disk will not load the stylesheet, because asset paths are absolute.

## What changed last

**signal was promoted out of the shelf's card grid into a section of its own**, between
the hero and the shelf, and the contact column lost the personal email address.

The reason signal gets a section is written into the page and should stay the stated
reason: it is the only tool here whose subject is a list the reader writes. The other four
watch something fixed, and a card is the right size for a tool you cannot aim. The shelf
index still carries all six rows and row 01 now links up rather than down, so the page has
one inventory and says each thing once.

The section carries three claims, each with the evidence beside it: the roster is one
gitignored file and `npm test` fails if a brand leaks outside `config/`; the repository
ships `AGENTS.md`, `CLAUDE.md` and five committed skills, so an agent can install and wire
it; `npm run start` is one pass over every watcher feeding eight read-only MCP tools and
`signal://` resources. Each figure traces to `../signals`. Note that only five skills are
committed there: the working tree has nine, four of which are untracked, so the page says
five.

`assets/img/signal-compare.jpg` is new, copied from `../signals/docs/images/`. It is the
second product view the open work below used to ask for, which is why no capture is used
twice any more.

Contact is now `Creator, on LinkedIn` pointing at linkedin.com/in/apsolut, in the footer,
`llms.txt`, `index.md` and a new `Person` node in the JSON-LD graph that `Organization`
names as its founder. `request@gledach.de` stays, because that one is the org's.

Before that, two commits restructured the page around one complaint: a reader could not
tell what the tools were.

`0a0e639` **the hero shows the product, and the shelf is listed once.** The page had
been carrying two inventories of the same five tools, a rack in the hero and an index
table in the shelf section, with the cards making a third pass. The rack is gone. The
hero now carries the live preview, cropped to the convergence rows, headed by the URL
and captioned with the command that puts the same dashboard on `127.0.0.1`. The shelf
keeps the only list, as a table of what each tool watches and what it hands back. The
ladder moved below the shelf. Every card opens with the situation it addresses before
the mechanism. Same commit carried the SEO work: a drawn 1200x630 card, an
apple-touch-icon, the full meta set, and JSON-LD as a three node graph.

`411d849` **say each thing once, and say the true number.** Copy defects left behind by
the restructure. Worth reading the message if any of the shelf copy looks odd.

## What is open, in priority order

1. **The site is not deployed, and the blocker is not in this repo.** The Cloudflare
   build fails at initialisation with:

   ```
   Failed: The build token selected for this build has been deleted or rolled
   and cannot be used for this build.
   ```

   That is a Cloudflare credential, not code. Fix in the dashboard under
   **Workers & Pages, the Worker, Settings, Build, Build token**, then retry. Nothing
   in this repository will change that outcome. Build command must stay **empty**;
   deploy command is `npx wrangler deploy`.

   Check that `name` in `wrangler.jsonc` (`gledach-de`) matches the Worker that already
   exists in the dashboard, or wrangler creates a second one beside it.

2. **Fonts load from Google Fonts.** The design system asks for self-hosted woff2 with
   `font-display: swap` and the display face preloaded. Until then the page makes one
   third-party request on render, and the social cards cannot be re-rendered offline.
   Needs permission to download four font files.

3. **Battle is still uncaptured.** The hero crops the Live Feed and the signal section
   runs Compare at full width, so the two captures in the tree are two different views
   and neither repeats the other. `../signals/docs/images/dashboard-battle.jpg` is the
   third and is not used here. `signal-patterns` carries a data figure and the other
   three carry terminal output.

4. **Both captures contain em dashes.** Every convergence row reads `CONVERGENCE`, then
   U+2014, then the vendor name, and Compare's prose cells use the character too. That
   is signal's own UI, so the grep rule over this repository is unaffected, but the page
   now shows it twice: in the hero at 0.73 scale and in the signal section at 0.76.
   Fixing it means changing signal and recapturing.

   Note that this paragraph cannot quote the row verbatim, which is the rule working as
   intended. The previous draft of this file did quote it, and committed U+2014 into the
   repository in the act of describing the ban on U+2014.

## Decisions already made. Do not re-litigate

- **One inventory.** The shelf table is the only list of tools on the page. Do not add a
  second one to the hero, however light. An inventory was never the hero's job. Row 01
  points up to the signal section rather than down to a card, and that is correct.
- **signal has a section, the other tools have cards.** The section is not a reward for
  being the favourite, it is because signal is the only one you aim. If a second
  pointable tool ships, it gets a card first and this decision gets reopened, rather than
  the page growing a second section by default.
- **The shelf `<h2>` carries no number.** The `5 of 12 slots filled` chip is the single
  place the count is stated, because a chip does not have to be rewritten as prose.
- **`DESIGN.md` is deliberately not in this repository.** It belongs to a different
  product and is gitignored. `CLAUDE.md` carries the whole of it that applies here. Do
  not reintroduce it, and do not name that product in committed files.
- **No em dashes anywhere**, including code comments and commit messages. `grep` for
  U+2014 across the repo should return nothing. `CLAUDE.md` states the rule without
  using the character, deliberately.
- **Oxblood `#8C1D18` with one ember `#F0A94C` step.** The hot colour appears only on
  the dark band, where it scores 9.4:1. On paper it is 1.8:1. Contrast table is in
  `CLAUDE.md`. The favicon was still on the old cobalt until `0a0e639`.
- **gledach is a shelf, not a platform.** Same author, varied stacks.
- **Tool cards are hand-written HTML**, not rendered from JSON, so the content survives
  JavaScript being off and a crawler sees it.
- **Social cards are rendered, not drawn.** Sources are HTML in `assets/og/`, excluded
  from deploy. See README. `og-home.png` carries the tool names and the slot count, so
  it goes stale the moment a tool ships.

## Traps: where the obvious move is wrong

`CLAUDE.md` carries all five with the reasoning. In short:

- **`overflow: hidden` on an ancestor breaks `animation-timeline: view()`.** Use `clip`.
- **Do not animate a property that collapses the element's own box.**
- **Do not re-add a CSS-only count-up on the stat numbers.** It renders `0`.
- **A cropped screenshot must be pinned to an absolute size, not a percentage.**
- **A box pinned wider than its grid track needs `minmax(0, 1fr)`**, and `aspect-ratio`
  loses to an in-flow child, so the hero shot is `position: absolute` in its frame.

Plus one that is not in `CLAUDE.md` because it is not a design rule:

- **The terminal captures pin their own monospace stack.** Geist Mono has no
  block-element glyphs (U+2581 to U+2588), so the sparkline falls back per glyph to a
  font with a different advance width and the column alignment collapses.

## Environment gotchas

- **Change the page, change all four.** `index.html`, `llms.txt`, `index.md` and the
  JSON-LD in the head are shipped twins. The last three go stale silently.
- Retyping ASCII art through a shell heredoc corrupts backslashes. Extract it from the
  file with Python instead.
- Screenshots go in `.apsolut/screenshots/`, which is gitignored. Never the repo root.
  The two PNGs that ARE in the tree are rendered assets, not screenshots of the site.
- **The 1Password SSH agent locks during long sessions.** Both commit signing and
  `git push` over SSH then fail with `failed to fill whole buffer` or
  `communication with agent failed`. Pushing has a workaround:
  `git -c credential.helper='!gh auth git-credential' push https://github.com/gledach/<repo>.git main`
  Signing does not. Unlock 1Password.
- **Browser automation:** window resizing does not take effect, so use CDP viewport
  emulation for responsive checks. Screenshots of the hero intermittently time out and
  the renderer can wedge; opening a fresh page clears it.
- Serving from `file://` does not work.

## Suggested first move

Nothing here is blocked on code. If the goal is to get the site live, the Cloudflare
build token is the only thing standing in the way and it is fixed in the dashboard.

If the goal is content: slots 01 to 05 are filled and slot 06 is the next empty one.
`README.md` has the eleven-step checklist for adding a tool, which now includes the
JSON-LD offer and re-rendering the social card.

## Related

- `../whenrun` is slot 03 and has its own `HANDOFF.md`.
- `../phonehome` is slot 04. Shipped and pushed, `66b156a`.
- `../recall` is slot 05. Shipped and pushed, `7048e76`, and has its own `HANDOFF.md`
  with the substantive open work.
- `../signals` is slot 01. Its `HANDOFF.md` is unrelated to this page.
