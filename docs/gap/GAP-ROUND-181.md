# GAP-ROUND-181 — CLI 黄金路径复走（纯文档）

Round 181. Driver dimension: CLI golden path — `doctor` /
`ls --waiting` / `hooks --install` tri-state re-walked (first since
round-164, live org ~3,135 sessions).

## Evidence (v0.4.8)

- **doctor**: all seven lines correct — node, claude-code hooks
  authoritative, codex hooks.json authoritative, gemini heuristic
  boundary stated, devin API key valid, github-pr and webhook
  correctly reported inactive.
- **ls --waiting**: 2.7 s at ~3,135 sessions (round-164 was
  3.8–5.6 s) — every waiting line carries age, detail preview,
  session URL, and PR secondary link where present.
- **hooks --install tri-state** (isolated `$HOME` sandboxes):
  1. corrupt `settings.json` → refuses with `!` and leaves the file
     byte-untouched;
  2. fresh install → merges hooks and writes
     `settings.json.attnbox-bak` backup;
  3. re-run → "hooks already installed" (idempotent, no rewrite).

## Verdict

CLI golden paths all healthy; waiting latency improved vs
round-164. No P0/P1; docs-only, no changeset.
