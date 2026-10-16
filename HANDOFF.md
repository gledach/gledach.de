# HANDOFF: gledach.de

Rewritten 2026-10-16. The landing page for the gledach organisation.

## Required reading, in order

1. `CLAUDE.md`: the design system, the content rules, and the traps already paid for
2. `README.md`: how to run it, deploy it, add a tool, and re-render the social cards
3. `index.html`: signal's page. The other four are satellites in the same shape

## Current state

| | |
|---|---|
| Branch | `main` |
| Build | none. Five HTML pages, one stylesheet, one script |
| Deploy | Cloudflare Workers static assets, built from git on push to `main` |
| Serving | **Live at https://gledach.de.** Push is publish, about a minute end to end |

Run it with `python -m http.server 8080` from the repo root. Opening a page from disk
will not load the stylesheet, because asset paths are absolute.

**Nothing in this change has been committed or pushed.** It is a working tree. Review it
on localhost before anything reaches the live site.

## What changed last

**The whole site was redesigned and split into five pages.**

The index used to be the shelf plus a featured signal section. It is now signal's page
end to end, and the other four tools have their own pages. The design system changed with
it: the oxblood, ivory, Bricolage Grotesque and Instrument Serif system is gone, replaced
by **the ledger**, adopted from the Refero "Stripe" style after a three-way prototype
comparison.

The losing two prototypes are kept in `prototypes/`, excluded from deploy by
`.assetsignore`, with full reasoning in each file's head comment and the comparison in
`prototypes/index.html`. They are worth keeping because each one records which rules of
its source style had to be broken and why.

What the new index argues, in order: signal's claim with the MCP response that proves it,
the eleven collection surfaces as a tile grid, the lead-time chart that explains why
those eleven, the five pipeline stages walking up the tint progression, the three
consumers, the retargeting call on the indigo band, the subdomain convention, the shelf,
and the house rules.

**The collection section is the part that changed most in substance.** The old page said
"13 sources" and listed eight. The repository actually carries ten watchers plus a Gmail
inbox, so the page now names all eleven with what each one reads and how often: feeds
including Reddit, Google Alerts arriving by Gmail with its two-zone trap, certificate
transparency, sitemap and robots diffs, Hacker News through Algolia, GitHub, YouTube
captions, answer-engine visibility, model routing, Tavily and Trends. Three are flagged
as leading and tie to the top of the lead-time chart.

**Two stale numbers were caught against the tool READMEs.** whenrun's tests were listed
as 142 and are 128. phonehome's were listed as 67 and are 64. The content rule that every
number traces to a README is the reason both surfaced, and it is doing real work.

**Satellite pages are directories.** `whenrun/index.html`, not `whenrun.html`.
Cloudflare's `auto-trailing-slash` resolves either, but `python -m http.server` answers
`/whenrun` with a 404 and that broke every local preview of the new cross-links. A
directory gets a 301 from both servers. Do not flatten them.

All five pages share `assets/site.css`. `assets/site.js` is unchanged and still does one
job, the copy buttons, which the satellite install blocks use.

## What is open, in priority order

1. **The social card and the touch icon are off brand.** `assets/img/og-home.png` and
   `apple-touch-icon.png` both predate the redesign: old faces, oxblood accent, and the
   headline "free tools that find things out". Their sources are `assets/og/*.html`, which
   need rewriting against the tokens at the top of `assets/site.css` before re-rendering.
   This is the largest outstanding piece and it is what every social share currently shows.

2. **There is no product screenshot anywhere on the site.** The ledger hero carries the
   MCP response instead of the Compare capture, and every satellite proves itself with
   terminal output. That satisfies the proof rule, and it also means a visitor never sees
   the dashboard. This was a consequence of the redesign rather than a decision, so make
   it one.

3. **`assets/img/signal-compare.jpg` and `signal-live-feed.jpg` are both unreferenced**
   and still deployed. Use them or delete them. Note that Compare's prose cells contain
   U+2014, so putting that one back puts em dashes on the page as pixels. The grep rule
   over this repository is unaffected either way, because it is not text here.

4. **Confirm `request@gledach.de` actually routes.** `gledach.de` has Cloudflare Email
   Routing MX records and SPF, so the domain takes mail, but whether that specific address
   has a rule is only visible in the dashboard under **Email, Email Routing, Routing
   rules**. Every page offers it as the no-GitHub fallback and the JSON-LD publishes it as
   the organisation's email, so a missing rule is a silent dead end in six places now
   rather than two.

5. **Fonts load from Google Fonts.** Two families now rather than four, so this is
   cheaper than it was, but it is still the one third-party request the pages make.
   Self-hosting needs permission to download the woff2 files.

6. **The tool READMEs are the source of every figure and they drift.** Two were already
   stale. There is no check for this: it is a human reading five READMEs. A script that
   greps the figures out of the pages and diffs them against the READMEs would be the
   single highest-value piece of tooling this repository could have.

## Decisions already made. Do not re-litigate

- **The ledger system, not oxblood.** Chosen from three prototypes. The reasoning for
  the two that lost is in `prototypes/`, and the departures each one had to make from its
  source style are in the head comments. Re-opening this means re-reading those first.
- **The indigo does four jobs and gets no fifth.** Actions, eyebrows, command names in
  code, the leading flag. It holds because the last three are small monospace. Anything
  set in the body face at body size takes the ink colour.
- **Weight 300 for every heading.** The whisper is the signature. A heading at 500 reads
  as a different website.
- **No shadows.** Depth is the tint progression and the hairline. This is not a stylistic
  preference, it is the only depth mechanism the system has, so a shadow anywhere makes
  everything else look unfinished.
- **signal is the index, the other four are satellites.** Not a reward for being the
  favourite: signal is the only tool here whose subject is a list the reader writes. The
  other four watch something fixed. If a second pointable tool ships, it gets a satellite
  page first and this gets reopened, rather than the site growing a second index.
- **Satellite pages are directories.** See above. This is a local-preview correctness
  issue, not a style choice.
- **Every tool page ships its blind spots in full**, taken from the tool's own README.
  Not a summary and not a link. It is the reason the rest of the page can be believed.
- **The empty slot stays.** Both the twelfth collection tile and slot 06 on the shelf.
  They are the page being honest about capacity, which is the argument the shelf rests on.
- **The slot count lives in an eyebrow, never in a headline.** A chip or an eyebrow does
  not have to be rewritten as prose when a tool ships.
- **No em dashes anywhere**, including code comments and commit messages. `grep` for
  U+2014 across the repo should return nothing. `CLAUDE.md` states the rule without using
  the character, deliberately.
- **`DESIGN.md` is deliberately not in this repository.** It belongs to a different
  product and is gitignored. `CLAUDE.md` carries the whole of it that applies here. Do
  not reintroduce it, and do not name that product in committed files.
- **Pages are hand-written HTML**, not rendered from JSON, so the content survives
  JavaScript being off and a crawler sees it.

## Traps: where the obvious move is wrong

`CLAUDE.md` carries all of these with the reasoning. In short:

- **`overflow: hidden` on an ancestor breaks `animation-timeline: view()`.** Use `clip`.
- **Do not animate a property that collapses the element's own box.**
- **An outlined shape cannot be a border plus a `clip-path`.** The clip cuts the border
  into fragments. Use a stroked SVG polygon.
- **`.band a { color: white }` beats `.btn-reverse`,** so a white-filled button in a
  coloured band renders white on white unless it wins its ink back explicitly.
- **Slate fails on the frost and periwinkle tints** at 4.0:1. It is a white and mist
  colour only. `.tile-empty` and `.card-slot` are transparent, so moving either into a
  tinted section is the way this breaks. Use steel there.
- **Block elements (U+2581 to U+2588) need a font that has them all.** Any `pre` with a
  sparkline carries `class="blocks"`, which pins a stack that does.

## Environment gotchas

- **Change a page, change its twins.** `index.html`, `llms.txt`, `index.md`,
  `sitemap.xml`, the JSON-LD in every page head, and the `Elsewhere on the shelf` block
  on each satellite. All of them go stale silently.
- Retyping ASCII art through a shell heredoc corrupts backslashes. Extract it from the
  file with Python instead.
- Screenshots go in `.apsolut/screenshots/`, which is gitignored. Never the repo root.
  The two PNGs that ARE in the tree are rendered assets, not screenshots of the site.
- **The 1Password SSH agent locks during long sessions.** Both commit signing and
  `git push` over SSH then fail with `failed to fill whole buffer` or
  `communication with agent failed`. Pushing has a workaround:
  `git -c credential.helper='!gh auth git-credential' push https://github.com/gledach/<repo>.git main`
  Signing does not. Unlock 1Password.
- **Browser automation:** a page has to be selected before `resize_page` takes effect,
  and the window has a minimum width, so a 390px request lands at 500px. Good enough to
  catch horizontal overflow, not good enough to judge a phone layout.
- Serving from `file://` does not work.

## Suggested first move

Read the five pages on localhost, in order, as a stranger would. The redesign is a large
change to a live site and it has not been committed, so the cheapest moment to disagree
with any of it is before the first commit.

After that, the social card is the thing most worth fixing, because it is what every
share of the new site currently shows and it advertises the old one.

If the goal is content: slots 01 to 05 are filled and slot 06 is the next empty one.
`README.md` has the eleven-step checklist for adding a tool, rewritten for the new
structure.

## Related

- `../signals` is slot 01. Its `HANDOFF.md` is unrelated to this page.
- `../signal-patterns` is slot 02.
- `../whenrun` is slot 03 and has its own `HANDOFF.md`.
- `../phonehome` is slot 04.
- `../recall` is slot 05 and has its own `HANDOFF.md`.
- `../requests` is the public intake queue.
