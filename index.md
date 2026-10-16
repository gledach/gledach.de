# signal

**Competitive intelligence your agents can query. On your own machine.**

Ten watchers and one inbox read what a market publishes. Everything they find is
typed, scored, attributed and handed to a machine as structured data rather than
a page to read.

MIT licensed · no account to start · 3 runtime dependencies · offline on a fresh
clone.

- Live preview: <https://signal.gledach.de>
- Repository: <https://github.com/gledach/signals>

This is the markdown twin of <https://gledach.de/>. The whole shelf, including
the four tools that have their own pages, is in <https://gledach.de/llms.txt>.

```
> search_signals { company: "cursor", since: "7d", minImpact: 70 }

{
  "signals": [
    {
      "hashId":      "8f2a1c…",
      "signalType":  "pricing_change",
      "impactScore":        84,
      "source":      "email-google-alert",
      "publishedAt": "2026-10-11T06:14:00Z"
    }
  ],
  "coverage": {
    "status":            "fresh",
    "lastCollectedAt":   "2026-10-16T05:30:11Z",
    "trustEmptyResult":  true,
    "warnings":          []
  }
}
```

Every signal-reporting tool returns that `coverage` block. It is how an agent
tells a quiet market apart from a watcher that stopped running.

## The collection

Eleven ways in, and three of them speak before anyone announces anything. Each
entry says what the watcher actually reads and how often it runs, not what it
promises. The three marked **leading** hear a move while it is still
infrastructure.

| # | Watcher | What it reads | Cadence |
|---|---|---|---|
| 01 | Feeds · `npm run fetch` | Around sixty RSS feeds across the roster and the whole category: Google News, Reddit, vendor blogs, GitHub releases. The list derives from the roster, so retargeting rewrites it rather than leaving it behind. | every 30 min |
| 02 | Google Alerts · `npm run watch:gmail` | Alerts arrive in a mailbox, a parser reads them, and the result fills a local inbox database. Two zones, and the second is easy to forget: nothing reaches the dashboard until `email:promote` runs. The refresh token stays on your machine and is never shipped to the scheduler. | local only |
| 03 | Certificate logs · `npm run watch:certs` | Public certificate transparency, per competitor domain. A new subdomain gets a certificate before the thing on it is announced, which makes this the earliest free view of a vertical launch there is. **Leading.** | every 6 h |
| 04 | Sitemaps, robots · `npm run watch:sites` | Fetch, diff against the last snapshot, emit on new paths, removed paths and rule changes. A page exists before anything links to it. **Leading.** | every 6 h |
| 05 | Hacker News · `npm run watch:hn` | Through the Algolia search API, filtered on points and recency. Points, comments, author and timestamps arrive as structured fields rather than prose scraped out of a feed summary. | daily |
| 06 | GitHub · `npm run watch:github` | Releases, breaking-change tags and issue complaints. Sixty requests an hour unauthenticated, five thousand with a token. | daily |
| 07 | YouTube captions · `npm run watch:youtube` | Captions over HTTP: no audio download and no transcription, which is free for roughly four videos in five. A caption-less video still gets a signal recording that captions were unavailable. | daily |
| 08 | Answer engines · `npm run watch:aeo` | Asks the shortlist question a buyer asks and records which brands each engine names back. Detection is a deterministic word-boundary match, not a model judging another model's output. | weekly |
| 09 | Model routing · `npm run watch:routing` | A public, openly licensed data API: which models the market routes its tokens to, and which applications process them. Only movement past a threshold is emitted, so a flat week is silent. **Leading.** | daily |
| 10 | Search discovery · `npm run watch:tavily` | Mention discovery past the feeds, two queries per company, guarded against a free monthly credit tier with a cooldown between runs. | daily |
| 11 | Search interest · `npm run watch:trends` | Brand queries and "alternative to" queries, batched to the eight stalest per run. The upstream limiter refuses thirty two in a row, so the full set rotates across four passes. | weekly, 4 passes |
| 12 | [UNDECIDED] | A watcher is added when a source is public, readable without an account, and says something the eleven above do not. Those three questions are the whole bar. | not built |

### Why those eleven

Infrastructure moves weeks before the press release does. The list is not long
for its own sake: it is ordered by how early each source speaks, and most
monitoring products start at the bottom of it.

| Stage | Lead time |
|---|---|
| Infrastructure | weeks ahead |
| Hiring | months, vague |
| Documentation | hours |
| Changelog | hours |
| Marketing | at launch |
| Press | after |

The reasoning, with measured precision per source, is in
[signal-patterns](https://gledach.de/signal-patterns).

## What happens to one item

Five stages between a feed entry and an answer, and the tool reports which one it
reached.

1. **Classify.** Haiku reads the item and types it: product launch, pricing
   change, funding, customer win, review complaint. With no model key a keyword
   classifier runs instead, free and less precise, and the method used is recorded
   on the row either way so you can re-run the ones that matter.
2. **Score.** Business impact from 0 to 100, re-weighted for this job rather than
   for news: a product launch outranks generic press coverage, which is the
   opposite of how a headline ranker would order the same two items.
3. **Store.** One row, keyed on a hash of its own content, so every write is
   idempotent and two operators plus a scheduler can run the same pass without
   producing duplicates. A local file by default. A hosted database only once you
   point it at one.
4. **Correlate.** Theme and count rules fire a convergence: a pattern several
   independent publishers corroborate. A launch, a hiring push and a certificate
   change all pointing at the same vertical is one finding rather than three
   unread rows. Each carries a structured citation graph back to its evidence and
   dedupes per calendar week.
5. **Synthesise, and label it.** Battlecards from Sonnet, deep research from Opus
   across a hundred and eighty days of signal, five analyst modes driven by a
   written persona, and a weekly report that uses no model at all because its
   arithmetic is deterministic. Every piece of model output is marked as model
   output, and a claim the evidence does not support is published as unverified
   rather than asserted quietly.

| Figure | Value | Note |
|---|---|---|
| Signals stored | 2,600+ | in the deployment behind the live preview |
| Companies tracked | 13 | across two segments, and it is configuration |
| Runtime deps | 3 | no build step, offline on a fresh clone |
| Monthly spend | $15 to $25 | at the shipped models. Database and search on free tiers |

## Who consumes it

Three consumers. The dashboard is only one of them.

**For agents.** Eight tools over MCP: `list_companies`, `search_signals`,
`get_convergences`, `get_battlecard`, `list_briefs`, `get_brief`, `run_analyst`,
`market_summary`, plus `signal://` resources for a battlecard or a brief. Read
only by default and not just by convention: the single tool that spends money
ships with permission withheld, and opting in binds it to a rolling daily ceiling
shared with the scheduler and the command line.
<https://github.com/gledach/signals/blob/main/docs/mcp.md>

**For people.** Eight views on localhost: Feed, Battle, Compare, Market, Intel,
Report, Briefs and Inbox. Number keys switch mode, a command palette jumps
anywhere, and Compare takes an anchor plus up to three rivals in a URL you can
share. Battlecards and briefs come out as markdown you can edit in anything, and
a regeneration never overwrites the part a person wrote.

**For the scheduler.** One entry point runs every watcher on the cadence it
deserves: the expensive passes weekly, the cheap ones every half hour. Cadence
moves the bill far more than model choice. A job making one model call per tracked
company costs four times as much on a six-hourly tier as on a daily one and the
output is no fresher. That mistake cost this deployment around two hundred dollars
a month before it was caught.
<https://github.com/gledach/signals/blob/main/docs/cost.md>

There is also a Chrome side panel that checks whatever page you are reading
against your own intel, on device. It is experimental, it needs the dashboard
running, and the test gate does not cover it. Stated here rather than discovered
later.

## Point it anywhere

Nothing in here knows which market it is watching. It ships pointed at thirteen
AI coding tools, and that is a configuration file rather than the product.

Six layers resolve identically: an environment variable, then your local file,
then the shipped default. The roster, the feeds, the deal-context axes, subdomain
scoring, the agent policy and the answer-engine prompts. Your file is ignored by
git, so you can pull upstream forever without a conflict in the one file you
changed.

The gate is mechanical rather than a promise: the test suite fails if a brand
name appears anywhere outside the configuration directory, or if the dashboard's
own labels drift from the roster. Retargeting cannot leave somebody else's market
behind in a watcher or a prompt.

```
git clone https://github.com/gledach/signals && cd signals
npm install
npm run db:migrate   # local database and demo data. no account, no key
npm run doctor       # what worked, and what each missing key unlocks
npm run view         # a populated dashboard at 127.0.0.1:5180

cp config/companies.default.mjs config/companies.local.mjs
npm run companies    # confirm what is live, and where it came from
npm test             # 15 smoke sections, 5 fixture suites, all offline
```

That runs offline on a fresh clone, on Windows, macOS or Linux. A model key turns
on classification, battlecards and briefs. Without one the keyword classifier runs
and everything else still works.

Install guide: <https://github.com/gledach/signals/blob/main/docs/start.md>

## Previews

Anything worth looking at gets its own subdomain. The convention is
`<tool>.gledach.de`, one address per tool, replaced in place.

- **Real data, not a mock.** The export asks the running viewer the same
  questions a browser asks and inlines the answers, so a preview cannot drift
  from the thing it was taken from.
- **Dated and read only.** A snapshot, not a live instance. Nothing you click
  reaches a database, and every number is true as of the export.
- **One per tool, replaced in place.** A re-export overwrites the preview, so you
  are looking at the most recent snapshot rather than an archive of all of them.
- **Generated text is labelled.** Battlecards, briefs and convergences are model
  output, not verified fact. They are a starting point for a person, which is how
  the tool itself describes them.

## The rest of the shelf

Five of twelve slots filled. Same author, different shapes. They share no stack
and no interface, only the promise: free, installable, and honest about what each
one cannot see.

| Slot | Tool | Page | What it does |
|---|---|---|---|
| 02 | signal-patterns | <https://gledach.de/signal-patterns> | The written reasoning behind all of it: what is watchable, what it costs, and eight engineering decisions that only became obvious after something broke. Nothing to install. |
| 03 | whenrun | <https://gledach.de/whenrun> | Watches day-ahead power prices and renewable share, then starts your job in the cheapest or greenest window that still meets its deadline. Zero runtime dependencies. |
| 04 | phonehome | <https://gledach.de/phonehome> | A local resolver that records which domains every device on your network contacts, and says when one starts talking somewhere new. Blocks nothing, uploads nothing. |
| 05 | recall | <https://gledach.de/recall> | Checks four public registers against a list of the things you actually own, and grades how sure each match is. A register it could not reach is reported as unreachable, never as clean. |
| 06 | [UNNAMED] | not built | The shelf holds a dozen. What lands here next is not decided, and the honest version is a placeholder rather than a roadmap. |

Is there something you keep checking by hand that a tool could watch for you?
[The queue is public](https://github.com/gledach/requests/issues), including what
was turned down and why. The form asks the three questions that decide whether
anything is watchable at all: what you check by hand, where it is published, and
whether seeing it needs an account. Without a GitHub account,
<request@gledach.de> takes the same three answers and they are filed in the queue
too, so the list stays the whole list.

## House rules

The tools vary. These six do not. They are the reason a tool gets published here
at all.

- **Free, and the source is public.** MIT unless a dependency makes that
  impossible, in which case the licence is stated on the tool's own page.
- **Your machine is the runtime.** Cloud is for sharing state between machines you
  own. It is not where your data has to live.
- **No account to start.** Clone it and see something real. Keys, hosted databases
  and schedules are opt in, later, each listed with what it buys you.
- **Honest about blind spots.** Every tool ships a written audit of what it cannot
  see, kept beside the documentation rather than buried in it.
- **Read only until you say otherwise.** Nothing spends your money because an
  agent found a button. Paid actions ship disabled and behind a ceiling.
- **Generated text is labelled.** Model output is marked as model output. A tool
  that cannot tell you what it does not know is not finished.

## Contact

- Request a tool: <https://github.com/gledach/requests/issues> (public queue)
- <request@gledach.de> if you would rather not use GitHub
- gledach on LinkedIn: <https://www.linkedin.com/company/gledach/>
- Creator: Aleksandar Perisic, <https://www.linkedin.com/in/apsolut/>
- <https://github.com/gledach>

*gledati* (slav.): to watch. What a good analyst does before speaking.

MIT licensed. Signals are gathered from public sources. Generated analysis is
model output, not verified fact.
