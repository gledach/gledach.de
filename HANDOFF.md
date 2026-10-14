# HANDOFF: gledach.de

Rewritten 2026-10-13. The landing page for the gledach organisation.

## Required reading, in order

1. `CLAUDE.md`: the design system, the content rules, and five traps already paid for
2. `README.md`: how to run it, deploy it, add a tool, and re-render the social cards
3. `index.html`: the whole site. There is no framework and no build step

## Current state

| | |
|---|---|
| Branch | `main`, clean |
| Head | whatever `git log -1` says. This line went stale three times, so it stopped carrying a hash |
| Build | none. `index.html` plus one stylesheet and one script |
| Deploy | Cloudflare Workers static assets, built from git on push to `main` |
| Serving | **Live at https://gledach.de.** Push is publish, about a minute end to end |

Run it with `python -m http.server 8080` from the repo root. Opening `index.html` from
disk will not load the stylesheet, because asset paths are absolute.

## What changed last

**Requests have a queue, and the GitHub side caught up with the site.**
[`gledach/requests`](https://github.com/gledach/requests) is new: no code, one issue form,
five triage labels, and a README explaining how a request is handled. The empty slot card
points at it, email stays as the no-account fallback, and the open issues are linked so
"a request that helps more people is built first" is a claim someone can check.

The GitHub org surface was the weak link and is fixed. The profile README at
github.com/gledach still carried the personal email address that was removed from the
site, called signal "our first public repo" when five had shipped, and ran seven em dashes
and three emoji. Rewritten in the site's voice, root and `profile/` copies reunited. Every
public repo now has a description, a homepage and topics, signal's description lost its em
dash, and the organisation itself has a description for the first time. `cia` and
`cia-nice` were checked and are private, so the public org is exactly the shelf plus this
repo, `.github` and `requests`.

LinkedIn is wired where it does work: `Organization.sameAs` in the JSON-LD, the footer, and
the line on the slot card saying how you hear when a slot fills. Not as a request channel:
a request sent by DM is invisible to everyone else and cannot be labelled or linked.

**The page opens on signal.** The hero's own headline is now
`Track anyone. Compare anyone. On your own machine.`, the Compare capture sits under it at
full container width, and `.signal-detail` carries the evidence below that. The shelf
follows with its own H2 and all six rows.

This replaced a hero that spent the first screen on the shelf's thesis and then sold
signal anyway with its first button and its first screenshot. Codex was consulted on the
question and picked the same option, with one correction worth keeping in mind: "anyone"
can be read as individual people, which signal does not do, so the lead's first clause
says which anyone it means. Its other recommendations, cutting the ladder, the empty slot
and the slot counter, were declined: those are decisions already recorded below.

Two defects Codex found were fixed in the same pass. The hero chip read `Live, read only`
above a caption calling the same thing a dated static export, and now reads
`Static export, read only`. The signal lead explained the page's own layout to the reader
and is gone. One it found was left alone deliberately: `Most monitoring products stop at
rung 02` is still the one unevidenced competitor claim on the page.

Structural fallout, all deliberate: `.hero-grid` and `.preview-shot` are deleted, since the
hero no longer has two columns or a cropped capture. The pinning lesson both encoded is in
`CLAUDE.md` and still applies to any future crop. `assets/img/signal-live-feed.jpg` is now
unreferenced and still in the tree. The `<title>`, the meta description and `og-home.png`
still say "free tools that find things out", which remains true of the site and is no
longer what the page opens with.

Before that, **signal was promoted out of the shelf's card grid into a section of its
own**, between the hero and the shelf, and the contact column lost the personal email
address.

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

1. **Confirm `request@gledach.de` actually routes.** `gledach.de` has Cloudflare Email
   Routing MX records and SPF, so the domain takes mail, but whether that specific address
   has a rule is only visible in the dashboard under **Email, Email Routing, Routing
   rules**. The page offers it as the no-GitHub fallback and the JSON-LD publishes it as
   the organisation's email, so a missing rule is a silent dead end in two places.

2. **Fonts load from Google Fonts.** The design system asks for self-hosted woff2 with
   `font-display: swap` and the display face preloaded. Until then the page makes one
   third-party request on render, and the social cards cannot be re-rendered offline.
   Needs permission to download four font files.

3. **`assets/img/signal-live-feed.jpg` is unreferenced and still deployed.** It was the
   hero crop before the hero became Compare. Either use it or delete it. Battle, the
   third view, has never been captured here at all:
   `../signals/docs/images/dashboard-battle.jpg`.

4. **The hero capture contains em dashes.** Compare's prose cells use the character. That
   is signal's own UI, so the grep rule over this repository is unaffected, but it is now
   the first thing a visitor sees, at 0.74 scale. Fixing it means changing signal and
   recapturing.

   Note that this paragraph cannot quote a cell verbatim, which is the rule working as
   intended. An earlier draft of this file did quote one, and committed U+2014 into the
   repository in the act of describing the ban on U+2014.

5. **The hero capture is a grey shape on a phone.** About 300px wide on a 390px viewport.
   The figcaption carries the meaning there. The alternative, cropping to one of the two
   columns being compared, disproves its own caption, so this is the lesser evil rather
   than a solved problem.

6. **The title, the meta description and `og-home.png` still say "free tools that find
   things out".** True of the site, no longer what the page opens with. Re-rendering the
   social card is the expensive half.

## Decisions already made. Do not re-litigate

- **One inventory.** The shelf table is the only list of tools on the page. Do not add a
  second one to the hero, however light. An inventory was never the hero's job. Row 01
  points up to the hero rather than down to a card, and that is correct.
- **signal is the hero, the other tools have cards.** It is not a reward for being the
  favourite, it is because signal is the only one you aim. If a second pointable tool
  ships, it gets a card first and this decision gets reopened, rather than the page
  growing a second hero by default.
- **One capture before the shelf.** The hero holds Compare and nothing else does. A
  second large capture in `.signal-detail` was removed on that principle, not by accident.
- **The ladder, the empty slot card and the `N of 12` chip stay.** Codex recommended
  cutting all three. They are the page being honest about capacity and about where each
  tool stops, which is the argument the whole shelf rests on.
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
  loses to an in-flow child, so a cropped shot has to be `position: absolute` in its
  frame. Nothing on the page is cropped today, so the machinery is gone and the rule is
  kept here and in `CLAUDE.md` for the next one.

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

The site is live and the pipeline works: Cloudflare builds from git, so a push to `main`
is the publish step and it lands in about a minute. Verify a deploy by fetching
`https://gledach.de/` and diffing it against the local `index.html`. It should match
exactly, apart from one challenge-platform script Cloudflare injects before `</body>`.
Do not run `npx wrangler deploy` by hand: it would push the working copy out of band
from the git-driven build.

If the goal is content: slots 01 to 05 are filled and slot 06 is the next empty one.
`README.md` has the eleven-step checklist for adding a tool, which now includes the
JSON-LD offer and re-rendering the social card.

## Related

- `../whenrun` is slot 03 and has its own `HANDOFF.md`.
- `../phonehome` is slot 04. Shipped and pushed, `66b156a`.
- `../recall` is slot 05. Shipped and pushed, `7048e76`, and has its own `HANDOFF.md`
  with the substantive open work.
- `../signals` is slot 01. Its `HANDOFF.md` is unrelated to this page.
