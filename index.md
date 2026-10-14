# Track anyone. Compare anyone. On your own machine.

Anyone means any company you name in one file. `signal` watches what they publish,
scores and attributes it, and answers your agent over MCP. Your machine keeps
everything it collects.

MIT licensed · no account to start · your machine is the runtime

- Live preview: <https://signal.gledach.de>
- All repositories: <https://github.com/gledach>

<https://signal.gledach.de> is a real `signal` deployment, exported to one static file.
It is a static export, read only, and nothing you click reaches a database. `npm run view`
puts the same dashboard on `127.0.0.1:5180`, pointed at your companies instead of those.

signal is slot 01 on the gledach shelf. The rest of the shelf is below.

## The shelf: same author, different shapes

A tool earns a slot here when it runs on someone else's machine, not only on mine.
They share no stack and no interface, only the promise: free, installable, and honest
about what each one cannot see.

Five of twelve slots are filled. What each one watches, and what it hands back:

| Slot | Tool | Watches | Tells you | Status |
|---|---|---|---|---|
| 01 | signal | Thirteen public sources around whichever market you name | What changed, scored and attributed, over MCP | Live preview |
| 02 | signal-patterns | Nothing. It is the written reasoning | What is watchable, what it costs, how to build it | Docs |
| 03 | whenrun | Day-ahead power prices and renewable share | The cheapest or greenest window, then starts the job in it | Shipped |
| 04 | phonehome | Every DNS query on your own network | Which device talked where, and when that changed | Shipped |
| 05 | recall | Four public registers, against a list of what you own | Which of your things has a notice, and how sure the match is | Shipped |
| 06 | [UNNAMED] | [UNDECIDED] | [UNDECIDED] | Empty |

Every row is an entry below, starting with signal. Each one also states the rung it
reaches, and the ladder further down says what the rungs are.

## signal

**Rung 04, intelligence. Live preview. Slot 01.**

You find out a competitor shipped something when a customer mentions it.

Competitive intelligence your agents can query.

Thirteen public sources are collected around one market, deduplicated and attributed,
scored for impact, then correlated into convergences: patterns that several independent
publishers corroborate. The result is exposed over MCP, so Claude Code, Codex or any
other MCP client can ask what changed this week and get structured data back rather than
a page to read. It ships tracking thirteen AI coding agents and app builders, and that
roster is configuration, not code. The dashboard is one client, not the product.

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

That runs offline on a fresh clone, on Windows, macOS or Linux. An LLM key turns on
classification, battlecards and analyst briefs. Without one, a keyword classifier runs
instead and everything else still works.

**01 · Point it at anyone.** The roster is one gitignored file, so you can pull upstream
forever without a conflict in the only file you changed. Feeds, GitHub repository
mappings, Hacker News queries and classifier collision warnings all derive from it, and
`npm test` fails if a brand name appears anywhere outside `config/`. Retargeting cannot
leave someone else's market behind in a watcher or a prompt.

```bash
cp config/companies.default.mjs config/companies.local.mjs
```

**02 · Let the agent install it.** The repository ships `AGENTS.md`, `CLAUDE.md` and five
skills, so Codex or Claude Code can clone it, migrate the database and wire itself in
without you reading the install guide first. Node 22 and git still have to be on the
machine: an agent can run the commands, it cannot conjure a runtime.

```bash
claude mcp add signal -- node /path/to/signals/mcp-server.mjs
```

**03 · Then it feeds whatever asks.** One scheduled pass runs every watcher and leaves the
day in a database file you own. Eight MCP tools and `signal://` resources serve it to an
agent, JSON endpoints serve it to anything else, briefs and battlecards come out as
markdown. All read only: the single tool that spends money ships disabled, and stays
under a ceiling shared with cron.

```bash
npm run start
```

Compare sets an anchor company against up to three rivals across positioning, target
segment, pricing, strengths and weaknesses, and marks a claim `[unverified]` where the
signal set does not support it.

- Repository: <https://github.com/gledach/signals>
- Live preview: <https://signal.gledach.de>
- Install guide: <https://github.com/gledach/signals/blob/main/docs/start.md>
- Agent surface: <https://github.com/gledach/signals/blob/main/docs/mcp.md>
- What it cannot see: <https://github.com/gledach/signals/blob/main/docs/blindspots.md>

## signal-patterns

**Reference. Docs.**

You want to build one of these, and the hard part is knowing what is watchable at
all.

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

## whenrun

**Rung 04, intelligence. Shipped.**

Power can cost three times more in the evening than it does at midday, and your
backup job does not care when it runs.

Run it when the power is cheap.

Watches day-ahead electricity prices and the renewable-share forecast, works out the
cheapest or greenest window that still meets a job's deadline, and starts the job there.
Backups, builds, an EV charger, a heat pump. The first tool here that acts on what it sees
rather than reporting it, and the only one with nothing at all to install.

| Figure | Value | Context |
|---|---|---|
| Price sources | 2 | both keyless, cross-checked against each other |
| Bidding zones | 16 | verified live in DE-LU, AT, FR, CH, NL, ES and PL |
| Runtime deps | 0 | no npm install, storage is a file on disk |
| Tests | 142 | fully offline, against fixtures captured from the real APIs |

```bash
git clone https://github.com/gledach/whenrun && cd whenrun
node bin/whenrun.mjs prices
node bin/whenrun.mjs where
```

Savings are reported against the delivered bill rather than the spot price, because grid
fees and tax do not move by the hour and a spot-only figure flatters the tool.

- Repository: <https://github.com/gledach/whenrun>
- Running it for real: <https://github.com/gledach/whenrun/blob/main/docs/running-it.md>
- What it cannot do: <https://github.com/gledach/whenrun/blob/main/docs/roadmap.md>

## phonehome

**Rung 04, intelligence. Shipped.**

Nothing on your network tells you where it has been sending data, or when that
changed.

See what your devices talk to.

A local DNS resolver that records which domains every device on your network contacts,
classifies them, and tells you when one starts talking somewhere new. It does not block
anything and it does not upload anything: finding out is a different job from filtering.
If you already run Pi-hole, AdGuard Home, dnsmasq or Unbound, it reads your existing logs
instead, so you can see months of history without touching your network.

| Figure | Value | Context |
|---|---|---|
| Log formats read | 4 | dnsmasq, Pi-hole, Unbound, AdGuard Home, detected automatically |
| Categories | 11 | including one for televisions reporting what is on the screen |
| Runtime deps | 0 | a resolver and a JSONL file, nothing else |
| Tests | 67 | offline, including the DNS wire format and the forwarder |

```bash
git clone https://github.com/gledach/phonehome && cd phonehome
node bin/phonehome.mjs import /var/log/pihole.log --execute
node bin/phonehome.mjs report
```

`unknown` stays visible and is counted, because a classifier that quietly labels
everything looks better and tells you less. Encrypted DNS routes around the tool
entirely, and the report says what share of traffic did that rather than reporting a
total it cannot see.

- Repository: <https://github.com/gledach/phonehome>
- What it cannot do: <https://github.com/gledach/phonehome/blob/main/docs/roadmap.md>

## recall

**Rung 04, intelligence. Shipped.**

The notice for the thing in your kitchen was published. Nobody sent it to you.

Tell me when something I own is recalled.

Recalls are published. Nobody reads them, because they are published as a firehose about
everyone's belongings. This keeps a list of the things you actually own and checks it
against four public registers: European product alerts, German medicine shortages,
American vehicle campaigns, and software past its security support date. None of them
needs an account.

Matching a label copied off the back of an appliance against prose a regulator wrote is
not exact, so every result is graded and the grade is shown: exact on a barcode, PZN or
VIN; strong when make and model both appear; weak when only a distinctive model number
does. Weak is shown by default, because missing the one that mattered is worse than
reading one that turns out to be unrelated.

| Figure | Value | Context |
|---|---|---|
| Registers | 4 | EU, Germany, United States, and vendor support dates |
| Keys needed | 0 | no account for any of the four |
| Runtime deps | 0 | including its own CSV and XML readers |
| Tests | 98 | offline, against fixtures cut from real register downloads |

```bash
git clone https://github.com/gledach/recall && cd recall
cp config/inventory.default.mjs config/inventory.local.mjs
node bin/recall.mjs check
```

A register that could not be reached is reported as unreachable, never as clean. "Nothing
found" and "could not look" must never render the same way, because a person who reads a
quiet screen as a guarantee has been actively misled.

- Repository: <https://github.com/gledach/recall>
- What it cannot do: <https://github.com/gledach/recall/blob/main/docs/roadmap.md>

## Slot 06

**Not built.**

The shelf is built to hold a dozen. What lands here next is not decided, and the
honest version of this entry is a placeholder rather than a roadmap. Candidate
subject: `[SUBJECT]`.

Is there something you keep checking by hand that a tool could watch for you? Say
so: <request@gledach.de>. Requests that would help more people than the person
asking go to the front of the queue.

## Four rungs between raw data and an answer

The tools above do not share a stack, an interface or a release cadence. They share
a destination. Each one moves something public up this ladder, and tells you where
it stopped.

1. **Data.** What is already public: feeds, filings, certificate logs, pages that
   changed overnight. Free to anyone who goes and collects it.
2. **Information.** Collected, deduplicated, attributed. You know what was said,
   when it was said, and who said it.
3. **Insight.** Scored and correlated. You know which of it matters, and what it is
   evidence of.
4. **Intelligence.** Queryable by something other than a person. An answer to a
   question you had not thought to ask yet. `signal`, `whenrun`, `phonehome` and
   `recall` reach here.

Most monitoring products stop at rung 02 and call the result a feed. The distance
between rung 02 and rung 04 is the whole job.

## Previews

`<tool>.gledach.de`

Example: `signal.gledach.de`, a real deployment exported to a single static file.

- **Real data, not a mock.** The export asks the running viewer the same questions a
  browser asks and inlines the answers, so a preview cannot drift from the thing it
  was taken from.
- **Dated and read only.** It is a snapshot, not a live instance. Nothing you click
  reaches a database, and every number is true as of the export.
- **One per tool, replaced in place.** A re-export overwrites the preview, so what you
  are looking at is the most recent snapshot rather than an archive of every one.
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

- Creator: [Aleksandar Perisic on LinkedIn](https://www.linkedin.com/in/apsolut/)
- <request@gledach.de> to request a tool
- <https://github.com/gledach>

*gledati* (slav.): to watch. What a good analyst does before speaking.
