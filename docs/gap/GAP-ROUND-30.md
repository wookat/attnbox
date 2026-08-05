# GAP-ROUND-30 — production benchmark loop, round 30

Date: 2026-08-05. New-competitor scouting + deep dive: **Omnigent** (`omnigent-ai/omnigent`, Apache-2.0, Python, created 2026-06-11, ~8.2k stars) — an open-source *meta-harness* orchestrating Claude Code, Codex, Cursor, OpenCode, Hermes, Pi and custom agents, with browser/phone/desktop clients, cloud sandboxes, policies, and session sharing.

## What was actually run

- `uv tool install omnigent` → `omnigent 0.8.2` (plain `pip install` fails with `ResolutionImpossible` on Python 3.12 — their install docs push uv).
- `omnigent server --background` → web UI at `127.0.0.1:6767`.
- `omnigent import --harness claude --last 3` → imported a real local Claude session.
- Browsed the web UI: sidebar has **New session / Automations / Inbox / Projects / Sessions**.
- **Inbox page (screenshot taken)**: "Nothing waiting on you — When an agent needs your input or someone comments on a file, it will show up here."

## Findings

1. **A well-funded open-source project now ships an attention inbox with our exact framing** ("waiting on you"). The concept is validated at 8k stars; we are no longer alone in the niche.
2. **But it only sees sessions Omnigent itself runs.** It is a launcher/wrapper: agents must be started (or explicitly `import`ed, read-once, no live status) through it. Our core differentiation holds — attnbox passively aggregates *existing* native sessions (`~/.claude`, `~/.codex`, hooks) plus cloud Devin, with zero wrapping.
3. Its phone story is server-account based (login, sharing, hosted relay option) — heavier than our round-29 `--host` + token, with a different privacy trade-off.
4. Import UX detail worth copying honestly: their `import` prints per-source counts (`Imported / Already imported / Failed`).

## Action taken

Docs only: added Omnigent to `docs/COMPARISON.md` (main-competitor table + capability matrix + evidence log). No product change — no P0/P1: the inbox-overlap risk is positioning, and our zero-intrusion + cloud-agent coverage remains unmatched by it.

## Honest assessment

Omnigent's inbox, once agents run inside it, is *richer* than ours (reply, file comments, full session takeover from any device). Ours wins only when users keep their existing terminal workflows — which is exactly our bet. If the market shifts to meta-harnesses, attnbox's niche shrinks; recorded as a strategic risk, not a fixable gap.

## Carried gaps

Unchanged: Gemini key; Cursor login (requested); Copilot; macOS; heuristic FP/FN quantification.
