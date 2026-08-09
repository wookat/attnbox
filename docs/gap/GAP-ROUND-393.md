# GAP-ROUND-393 — 竞品第三十二批扫描（纯文档）

Round 393. Driver dimension: competitor research, first since
round-382 — watchlist re-check (all ten) + three-vector new
entrant scan.

## Watchlist movement (since round-382)

- `shariqh/agent-inbox` — still quiet since the 8/7 hardening
  wave (landing refresh, migration serialization, trusted
  origin for viewer mutations). Pure local, no cloud/Devin
  aggregation.
- `epilande/ccmux` — v1.3.0 docs polish only (tagline/feature
  list refresh). 119★.
- `kookr-ai/kookr` — still high-velocity: pipelineStarvation
  counters in status, cloud-metadata/link-local peer URL
  rejection (SSRF), plugin-dir contract tests.
- `Innovology/claude-dispatcher` — largest mover again:
  Products lens (honest count/keys/cursor), build-version nag,
  usage split by model family.
- `beknazar/agentfleet` — real machine-activity reporting
  ("what a machine is actually doing, not what a timer
  implies"), first real cloud E2E provision fixes.
- `jedarden/trail-boss` — license added; daemon-unreachable
  vs queue-empty status distinction.
- `takaaki-s/jind-ai` — adapter setup-state cache fix, pane
  identity merges.
- `oleg-vasilyev/claude-notify` — Telegram answer path done
  (Phase 4) plus privacy boundary (question text stays
  on-machine). Claude-only.
- `misty-step/kelpie` — desktop polish (thinking-level icons,
  focus ring) + install-to-machine docs.
- `centauri-ai/coslash` — commit-detection internals only.

## New entrant scan (three vectors)

New find worth archiving: `amajorai/ryu-approvals` — an
"approval inbox / human-in-the-loop queue" companion app for
the Ryu agent framework (created 7/18, mirror-synced from a
private monorepo, 0★). Language overlaps our approve lane, but
it is a single-framework (Ryu-only) accept/reject queue, not a
cross-agent attention aggregator; no Claude/Codex/Gemini/Devin
coverage, no waiting-reason inbox. Watch, not a direct
competitor. Other vectors: no new direct entrant; attnbox
still the only local-CLI + cloud/Devin unified inbox found.

## Verdict

Differentiation unchanged. No P0/P1; docs-only, no changeset.
