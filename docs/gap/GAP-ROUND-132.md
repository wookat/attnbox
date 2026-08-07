# GAP-ROUND-132 — CLI 黄金路径复走（纯文档）

Round 132. Driver dimension: CLI/first-run UX — golden-path re-walk
on the published v0.4.8 (first since round-99; two releases since).

## Evidence (clean `npm install attnbox@0.4.8`)

- `doctor`: all seven lines correct — four collectors ✓ with accurate
  mode annotations (hooks authoritative / heuristic-only), Devin key
  valid, github-pr and webhook honestly marked inactive with
  actionable hints.
- `ls --waiting`: 3.1 s end to end at ~2,990-session scale
  (round-61's parallel deep-page budget holds); every waiting item
  shows agent, attention kind, wait age (33s–27m), question preview,
  and action links (session + PR secondary).
- `hooks --install` (clean fake HOME):
  - no agent dirs → both lines refuse with a clear "is X installed?"
    hint, exit 2;
  - with `~/.claude` + `~/.codex` → merges with `.attnbox-bak`
    backups, actionable restart hint, exit 0;
  - second run → idempotent "already installed", exit 0.

## Verdict

No P0/P1; the CLI golden path is fully healthy on v0.4.8. Docs-only;
no changeset.
