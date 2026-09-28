# Free tools that find things out

gledach publishes small, installable tools that turn public data into information,
insight and intelligence. Clone one, run it on your own machine, point it at your
own subject, and keep everything it collects.

MIT licensed · no account to start · your machine is the runtime

- See one running: <https://signal-v1.gledach.de>
- All repositories: <https://github.com/gledach>

## The shelf

| Slot | Tool | Rung | Status |
|---|---|---|---|
| 01 | signal | Intelligence | Live preview |
| 02 | signal-patterns | Reference | Docs |
| 03 | [UNNAMED] | | Empty |
| 04 | [UNNAMED] | | Empty |

Two filled today. Same author, different shapes: what they share is the promise,
not a stack.

## Four rungs between raw data and an answer

The tools here do not share a stack, an interface or a release cadence. They share
a destination. Each one moves something public up this ladder, and tells you where
it stopped.

1. **Data.** What is already public: feeds, filings, certificate logs, pages that
   changed overnight. Free to anyone who goes and collects it.
2. **Information.** Collected, deduplicated, attributed. You know what was said,
   when it was said, and who said it.
3. **Insight.** Scored and correlated. You know which of it matters, and what it is
   evidence of.
4. **Intelligence.** Queryable by something other than a person. An answer to a
   question you had not thought to ask yet. `signal` reaches here.

Most monitoring products stop at rung 02 and call the result a feed. The distance
between rung 02 and rung 04 is the whole job.

## signal

**Rung 04, intelligence. Live preview.**

Competitive intelligence your agents can query.

Watches a market, turns public noise into scored and attributed signals, then
exposes them over MCP, so Claude Code or any MCP client can ask what changed this
week and get structured data back. It ships tracking thirteen AI coding agents and
app builders. You point it at your own market by editing one gitignored file. The
dashboard is one client, not the product.

| Figure | Value | Context |
|---|---|---|
| Sources | 13 | RSS, Hacker News, GitHub, YouTube, certificate logs, sitemaps, search, trends |
| Agent tools | 8 | over MCP, read only until a deployment opts in |
| Runtime deps | 3 | no build step, no framework, offline on a fresh clone |
| Signals stored | 2,600+ | in the deployment behind the live preview |

```bash
git clone https://github.com/gledach/signals && cd signals
npm install
npm run db:migrate
npm run view
```

That runs offline on a fresh clone. An LLM key turns on classification, battlecards
and analyst briefs. Without one, a keyword classifier runs instead.

- Repository: <https://github.com/gledach/signals>
- Live preview: <https://signal-v1.gledach.de>
- Install guide: <https://github.com/gledach/signals/blob/main/docs/start.md>
- Agent surface: <https://github.com/gledach/signals/blob/main/docs/mcp.md>
- What it cannot see: <https://github.com/gledach/signals/blob/main/docs/blindspots.md>

## signal-patterns

**Reference. Docs.**

How to build tools that watch the public web.

What is watchable, what it costs, how to build a watcher, and the engineering
decisions that only become obvious after something has broken. Nothing to install
and nothing to version, because the reasoning is the reusable part and the code
around it usually is not.

Infrastructure moves weeks before the press release does. Lead time before a move
becomes public knowledge: infrastructure (weeks), hiring (months, vague),
documentation (hours), changelog (hours), marketing (at launch), press (after).
Most tools start at the bottom of that list, which is where everyone is already
looking.

- Repository: <https://github.com/gledach/signal-patterns>
- What is watchable: <https://github.com/gledach/signal-patterns/blob/main/sources.md>
- What it costs: <https://github.com/gledach/signal-patterns/blob/main/techniques.md>
- Building a watcher: <https://github.com/gledach/signal-patterns/blob/main/building-a-watcher.md>
- Being consumable by agents: <https://github.com/gledach/signal-patterns/blob/main/agent-integration.md>

## Slot 03

**Not built.**

The shelf is built to hold a dozen. What lands here next is not decided, and the
honest version of this entry is a placeholder rather than a roadmap. Candidate
subject: `[SUBJECT]`.

## Previews

`<tool>-<version>.gledach.de`

Example: `signal-v1.gledach.de`, a real deployment exported to a single static file.

- **Real data, not a mock.** The export asks the running viewer the same questions a
  browser asks and inlines the answers, so a preview cannot drift from the thing it
  was taken from.
- **Dated and read only.** It is a snapshot, not a live instance. Nothing you click
  reaches a database, and every number is true as of the export.
- **Versioned, never overwritten.** `v1` stays at `v1`. A rebuild that changes what
  you would conclude gets a new subdomain.
- **Generated text is labelled as generated.** Battlecards, briefs and convergences
  are model output, not verified fact.

## House rules

The tools vary. These six do not.

- **Free, and the source is public.** MIT unless a dependency makes that impossible,
  in which case the licence is stated on the card.
- **Your machine is the runtime.** Cloud is for sharing state between machines you
  own. It is not where your data has to live.
- **No account to start.** Clone it and see something real. Keys, hosted databases
  and schedules are opt in, later, and each one is listed with what it buys you.
- **Honest about blind spots.** Every tool ships a written audit of what it cannot
  see, kept next to the documentation rather than buried in it.
- **Read only until you say otherwise.** Nothing spends your money because an agent
  found a button. Paid actions ship disabled and behind a spend ceiling.
- **Generated text is labelled.** Model output is marked as model output. A tool that
  cannot tell you what it does not know is not finished.

## Contact

- <hi@aleksandarperisic.com>
- <security@gledach.de>
- <https://github.com/gledach>

*gledati* (slav.): to watch. What a good analyst does before speaking.
