# gledach.de

The landing page for [github.com/gledach](https://github.com/gledach). Static:
`index.html`, `assets/site.css`, `assets/site.js`. No build step, no framework, no
dependencies.

## Design

The page follows a design system held outside this repository. The rules below are the
whole of it that applies here. Follow them rather than improvising, and if something is
not covered, match what is already on the page.

**Two rules break the page loudest when missed:**

- **No em dashes.** Not in copy, not in code comments, not in commit messages. Use a
  colon, a comma, a period or a middle dot `·`. A grep for U+2014 across this
  repository should return nothing, including this line.
- **Proof over promise.** Every claim is shown as product UI, data or evidence. A card
  with an icon and a blurb is not finished.

### Ground

Warm ivory paper `#F6F5F1`, white surfaces, ink `#0F1115`. Everything else is ink, paper
and a grey ramp. Dark bands use `#0F1115` with `#1A1D24` panels. Full token set at the top
of `assets/site.css`.

The accent is **oxblood `#8C1D18`** with one **ember `#F0A94C`** step, and the split is a
rule rather than a convenience:

| Token | Hex | Where it may appear |
|---|---|---|
| `--g-accent` | `#8C1D18` | Everything on paper: 12px eyebrows, 11px chips, links, pill fills, rules |
| `--g-accent-hover` | `#6E1613` | Hover only |
| `--g-accent-soft` | `#F8E8E4` | Chip ground on paper |
| `--g-accent-tint` | `#F0A94C` | **Dark band only.** Eyebrows and the serif italic on `#0F1115` |
| `--g-accent-mid` | `#C2452E` | Large display and non-text only. Never small text |

**The hot colour only appears in the dark.** Ember scores 1.8:1 on ivory, so putting it on
paper is both an accessibility failure and off brand. Oxblood carries the drama through
value instead of chroma: it is near-ink, so it lands like a second printing plate rather
than a highlight, and it clears 4.5:1 with roughly double the margin at the sizes this
page actually lives at.

| Pair | Ratio |
|---|---|
| accent on paper | 8.4:1 |
| accent on white | 9.1:1 |
| white on accent fill | 9.1:1 |
| ember on `#0F1115` | 9.4:1 |
| accent on accent-soft | 7.7:1 |
| brick on paper | 4.6:1 |

Red reads as alarm only at high value; dropping it to near-ink removes that. This matters
because the brand's own principle is convergence over alerts, so an alarm-coloured brand
would contradict the copy. Check any new accent value against both `#F6F5F1` and `#FFFFFF`
before using it on text.

### Type

| Role | Family | Use |
|---|---|---|
| Display | Bricolage Grotesque 700 | H1, H2, H3, stat numbers, wordmark |
| Accent | Instrument Serif italic 400 | Exactly one phrase per headline |
| Body | Geist 400 to 600 | Everything readable |
| Label | Geist Mono 500 | Eyebrows, meta, chips, table heads, figures |

Headlines are sentence case with one serif italic phrase carrying the payoff: "Free tools
that *find things out.*" Never two accents in one headline. An eyebrow in mono uppercase
accent sits above every H2. Numbers use tabular numerals.

### Layout and motion

Container 1240px, gutter 40px (16px on mobile), 150px between sections (80px mobile).
Section header is a two-column split: H2 left, lead right, rule underneath. Cards are
white, 1px `#E4E2DA`, radius 20 to 24px, hover lifts 4px.

Motion only where it explains a mechanism. Nothing loops, so nothing needs a pause
control. What is animated, and what each one is saying:

| Motion | What it explains |
|---|---|
| Headline resolves word by word out of blur | Things coming into focus, which is the page's subject |
| Rack fills slot by slot, then a scan passes over it | A shelf with capacity, being watched |
| Ladder rung bars grow in sequence | Each rung reaches further than the one before |
| Lead-time bars cascade top to bottom | The ordering the chart is arguing for |
| Tool name types into the placeholder | The substitution the subdomain convention describes |
| Section blocks rise on entry | Ordinary reveal, the only decorative one, kept subtle |

Scroll-driven animation lives inside `@supports (animation-timeline: view())`, and the
base style is always the finished state. Animations supply a `from` keyframe only. That
is what makes `prefers-reduced-motion` and any browser without view timelines land on a
complete page rather than an empty one.

**Three traps, all paid for once already:**

- **`overflow: hidden` on an ancestor breaks `view()` timelines.** It makes that ancestor
  a scroll container, the timeline resolves against it, and since it never scrolls the
  animation never runs. Use `overflow: clip`, which clips identically without creating a
  scroll container. `.stats` is the reason this is written down.
- **Do not animate a property that collapses the element's own box.** The element is the
  timeline's subject, so animating `width` to `0` degenerates the timeline and the
  animation never advances. The type-in reveal uses `clip-path` for this reason.
- **CSS-only count-up on the stat numbers does not work here.** A registered custom
  property held at its `from` value instead of interpolating, with a literal `to` as well
  as a `var()` one. It was removed rather than shipped, because the failure mode renders
  `0` in place of the real figure. Do not re-add it without proving it counts on screen.

Anchor targets carry `scroll-margin-top: 96px` because the nav is sticky at 72px. Card
ids live on the `<article>`, not the `<h3>`, so a jump shows the whole card.

### Accessibility

Text contrast 4.5:1 minimum, `#5E6470` is the lightest permitted text colour. Real
`<button>` and `<a href>`, never handlers on divs. Visible focus rings, 2px accent at 2px
offset. 44px minimum touch targets. Colours that must be told apart also differ in
lightness.

### Deviations worth knowing

- **No pricing, no login, no "Get started".** Everything here is free and installed from
  GitHub, so the nav's right side carries repository and preview links rather than an
  auth pair.
- **Fonts load from Google Fonts** rather than self-hosted woff2. That is the one
  third-party request the page makes, and it is outstanding work.

## Content rules

- **gledach is a shelf, not a platform.** Same author, varied shapes. Do not write copy
  promising that every tool shares a stack, a licence or an interface. What they share is
  the promise: free, installable, runs on the reader's machine, honest about limits.
- **Design for growth.** The shelf has two tools today and must reflow to a dozen without
  a redesign. Adding one is a copy-paste of an `<article class="tool card">` block. Never
  introduce a layout that hardcodes the current count.
- **Every number traces to a repository README.** If a number stops being true there,
  change it here. Facts that do not exist yet are `[BRACKETED]` placeholders, which is
  honest and is also how the empty slot card is written.
- **Previews live on subdomains**, `<tool>.gledach.de`, one per tool, replaced in place. They
  are separate deployments. This repository only links to them.
- **Change the page, change all four.** `index.html`, `llms.txt`, `index.md` and the
  JSON-LD in the head are shipped twins. The last three go stale silently.

## Local

```bash
python -m http.server 8080
```

Absolute asset paths mean opening `index.html` from disk will not load the stylesheet.
Use a server.
