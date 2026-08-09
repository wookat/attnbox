# GAP-ROUND-409 — CLI 黄金路径复走（纯文档）

Round 409. Driver dimension: CLI golden path re-walk
(doctor / `ls --waiting` / `hooks --install` four states),
first since round-398. Live org @3,78x sessions.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node v22.23.2 · ✓ claude-code hooks authoritative ·
✓ codex hooks.json authoritative · ✓ gemini honest boundary ·
✓ devin API reachable/key valid · – github-pr fallback
inactive (no token) · – webhook not set
```

`ls --waiting` — 2.8s hot run @3,78x sessions, 17 waiting,
every item with detail preview + session action link
(+ PR secondary link where present).

`hooks --install` sandbox four states:

```text
1. empty HOME     → honest not-found for both agents
2. fresh install  → merged + backups (*.attnbox-bak)
3. re-run         → idempotent "already installed"
4. corrupt config → refuses claude merge with manual
                    fallback hint; codex untouched
```

Sandbox removed, no residue.

## Verdict

All CLI golden-path contracts hold. No P0/P1; docs-only, no
changeset.
