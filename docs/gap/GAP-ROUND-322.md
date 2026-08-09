# GAP-ROUND-322 — CLI 黄金路径复走（纯文档）

Round 322. Driver dimension: CLI golden-path re-walk —
`doctor` / `ls --waiting` / `hooks --install` four-state sweep,
first since round-312. Real CLI against the live org.

## Evidence (v0.4.8, live org @3,576 sessions)

`attnbox doctor` — all seven lines correct: node ✓,
claude-code ✓ (hooks authoritative), codex ✓ (hooks.json
authoritative), gemini ✓ (honest heuristic-only line), devin ✓
(API reachable, key valid), github-pr – and webhook – honest
inactive lines.

`ls --waiting` — 3.0 s at 3,576-session scale; 18 waiting items,
18/18 with what-it-wants detail and action URLs.

`hooks --install` sandbox four-state sweep:

```text
state 1 missing dirs:   honest "– not found" lines, no writes
state 2 valid configs:  merged with *.attnbox-bak backups ·
                        pre-existing user hook preserved (1 hit)
state 3 idempotent:     "already installed" · settings.json
                        byte-identical on re-run
state 4 corrupt config: refuses to merge with actionable "!"
                        message · corrupt file byte-identical
```

Sandbox and temp files removed after the run.

## Verdict

No P0/P1; docs-only, no changeset.
