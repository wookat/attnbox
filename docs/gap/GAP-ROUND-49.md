# GAP-ROUND-49 — 官网 llms.txt（AI 可发现性）

Round 49. Driver dimensions: real testing (Lighthouse), frontend/visual
analysis.

## Evidence sweep

- Post-round-46/47/48 Lighthouse on the live inbox (dogfood data):
  perf 94 / a11y 100 / bp 100 / SEO 100, CLS 0.08, TBT 0ms — no
  regression from the grouping/search work.
- Lighthouse newly flags `llms-txt`: the docs site served a 404 for
  `/llms.txt`. Given attnbox's audience is exactly the people whose AI
  assistants crawl docs (and competitors' docs are increasingly
  LLM-consumable), this is the round's actionable item.
- Remaining perf note: ~93 KiB unused JS in the inbox bundle (single
  React chunk) — honest P2, not worth code-splitting a one-page app yet.

## Fix

Docs site adds the `starlight-llms-txt` plugin (0.11.0, mature Starlight
ecosystem plugin) → build now emits `/llms.txt`, `/llms-small.txt`,
`/llms-full.txt` from the existing docs content, zero hand-maintained
duplication.

## Evidence after fix

Local site build emits all three files; `/llms.txt` lists the abridged and
complete sets with correct absolute URLs.

## Honest boundary

Effect on real LLM crawlers is not measurable from here — the file follows
the llms.txt convention; that's the claim, nothing more.
