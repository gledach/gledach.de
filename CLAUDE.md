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

Warm ivory paper `#F6F5F1`, white surfaces, ink `#0F1115`. One accent, cobalt `#2B36D9`,
and it has a job: it marks the thing being pointed at. Everything else is ink, paper and
a grey ramp. Dark bands use `#0F1115` with `#1A1D24` panels. Full token set at the top of
`assets/site.css`.

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

Motion only where it explains a mechanism: the single scan pass over the rack, bar growth
on the lead-time chart, scroll reveal on section blocks. Nothing loops. Scroll-driven
animation lives inside `@supports (animation-timeline: view())` and the static state is
the finished state, so a browser without it shows a complete page.
`prefers-reduced-motion` switches all of it off.

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
