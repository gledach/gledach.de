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

## What you actually look at

Three views, running on your own machine. Every capture on the page is a real
deployment with real collected data, not a mockup. `npm run view` puts the same
dashboard on `127.0.0.1:5180`, pointed at your companies instead of these.

- **Live Feed.** Not a list of headlines. A convergence is the unit here: a
  pattern several independent publishers corroborate, scored from its own
  evidence rather than against a fixed floor, with the rule that fired it stated
  on the row. One line to read instead of forty.
- **Compare.** One company as the anchor against up to three rivals, section by
  section: positioning, segment, pricing, strengths, weaknesses. Where the
  collected evidence does not support a claim, the cell says `[unverified]`
  rather than asserting it.
- **Battle.** Call prep for one competitor: the strongest points to make and the
  objections you should expect back, ranked against the deal in front of you
  rather than dumped as a list. This is generated text, and the page says so.

On a phone a 1519px dashboard cannot be read at any scale, so the captions carry
the meaning there. The whole thing is clickable and real at
<https://signal.gledach.de>.

## Set it up

**You edit one file: the list of companies you care about.**

You do not have to be a developer. Three commands put this on your own laptop
with a real example dataset already loaded, and from there the only thing you
change is who it watches. No account, no card, and nothing you collect ever
leaves your machine.

### Step 01 · Get it running

The first command downloads it. The second builds a small database on your
machine and fills it with real collected data. The third opens the dashboard in
your browser. You can stop there and look around: everything in the three views
above is already populated.

```
git clone https://github.com/gledach/signals && cd signals
npm install
npm run db:migrate   # your own database, with example data in it
npm run view         # the dashboard, at 127.0.0.1:5180
```

What you need: a Mac, a Windows PC or a Linux machine, and Node 22. That is the
whole list. The [install
guide](https://github.com/gledach/signals/blob/main/docs/start.md) assumes you
have never used a terminal before and takes about fifteen minutes. If you have,
it is closer to two. Run `npm run doctor` at any point and it will tell you what
is working and what each thing you have not set up yet would unlock.

### Step 02 · Tell it who to watch

It arrives watching thirteen AI coding tools, because a tool that opens empty
teaches you nothing. Pointing it at your own market is one file: copy the
example, write in the companies you care about, save.

```
# copy the example, then edit your copy
cp config/companies.default.mjs config/companies.local.mjs
```

```js
export const companies = {
  acme: {
    id: 'acme', name: 'Acme', domain: 'acme.com',
    query: '"Acme Corp" OR "acme.com"',
    repos: ['acme/platform'],
    subreddits: ['acme'],
  },
  // one block like that per competitor
};
```

The one field worth a moment's thought is `query`, because a company name is
often an ordinary word. "Cursor" is also the thing blinking in a text box, so the
query is written to catch the company and not the word. The shipped file has
thirteen worked examples to copy the pattern from, each with a note on what it
collides with.

Everything else follows on its own. The news feeds it reads, the searches it
runs, the code repositories it checks and the labels down the side of the
dashboard are all rebuilt from that one list. There is no second place to keep in
sync.

### Step 03 · Leave it collecting

One command runs every watcher once and leaves the day in your database. Put it
on a schedule and you have a standing picture of the market that updates while
you are not looking at it.

```
npm run start      # one pass over every source, on whatever schedule you like
npm run brief      # a 200-word morning read of what changed
```

From there you either read the dashboard, or you point an AI assistant at it and
ask. Connecting it to Claude Code or any other MCP client is a single line, and
the assistant then answers from your collected data rather than from whatever it
remembers about the market.

### Three things that are easy to worry about

- **Updates will not overwrite your list.** Your file sits beside the shipped
  example rather than replacing it, so you can pull the latest version of the
  tool whenever you like and nothing you wrote is touched.
- **The example market cannot be left behind by accident.** The project refuses
  to build if any of the thirteen shipped names are still hiding somewhere in the
  code, or if the dashboard's own labels have drifted away from your list. That
  is a check that runs, not a promise in a readme.
- **Collecting is free.** A model key, a few dollars a month at this volume,
  turns on the written analysis: the classification, the battlecards and the
  briefs. Without one a simpler keyword classifier runs instead and everything
  else still works exactly the same.

## The rest of the shelf

Five of twelve slots filled. Same author, different shapes. They share no stack
and no codebase. Each takes whatever shape suits it, from a single command to a
dashboard, and what they share is the promise rather than the plumbing: free,
installable, and honest about what each one cannot see.

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
whether seeing it needs an account. Requests go there rather than to an inbox,
so everyone can see what was asked and what happened to it.

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
- gledach on LinkedIn: <https://www.linkedin.com/company/gledach/>
- Creator: Aleksandar Perisic, <https://www.linkedin.com/in/apsolut/>
- <https://github.com/gledach>

More about the shelf, how previews work and how requests are handled:
<https://gledach.de/about>

*gledati* (slav.): to watch. What a good analyst does before speaking.

MIT licensed. Signals are gathered from public sources. Generated analysis is
model output, not verified fact.
