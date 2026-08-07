# GAP-ROUND-151 — CLI 黄金路径复走（纯文档）

Round 151. Driver dimension: CLI golden-path re-walk — doctor / ls /
hooks --install (first since round-132), on v0.4.8 against the live
org.

## Evidence

- `doctor`: all seven lines correct — node ✓, claude-code/codex
  authoritative (hooks installed), gemini heuristic-honest, devin key
  valid, github-pr and webhook correctly reported inactive.
- `ls --waiting`: 3.0 s wall clock at ~3,070 sessions; every waiting
  row shows age, question preview (`└ detail`), session URL, and PR
  secondary link where present.
- `hooks --install` three states (clean throwaway HOME):
  - missing agent dirs → clear "not installed?" guidance, no files
    created;
  - real install → merged configs + `*.attnbox-bak` backups, then
    idempotent "already installed" on rerun;
  - corrupted `settings.json` → refuses to merge with manual-fix
    guidance, original broken file preserved byte-for-byte.

## Verdict

CLI golden paths fully healthy on v0.4.8. No P0/P1; docs-only, no
changeset.
