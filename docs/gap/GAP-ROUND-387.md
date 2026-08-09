# GAP-ROUND-387 — CLI 黄金路径复走（纯文档）

Round 387. Driver dimension: CLI golden path re-walk (doctor /
ls --waiting / hooks --install sandbox states), first since
round-376. Live org @3,74x sessions.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node · ✓ claude-code (authoritative) · ✓ codex (authoritative)
✓ gemini (heuristic, never claims waiting) · ✓ devin (key valid)
– github-pr (no token, honest inactive) · – webhook (unset, honest)
```

`attnbox ls --waiting` @3,74x sessions:

```text
cold  2.9s · warm 3.1s (timing per warm-run method note)
19/19 waiting items each with "waiting on what" preview +
session action link (PR secondary links where applicable)
```

`attnbox hooks --install` sandbox, four states:

```text
1 fresh install:     merged + backups (*.attnbox-bak)
2 idempotent rerun:  "hooks already installed", no rewrite
3 corrupt settings:  rejected with manual-merge guidance,
                     codex untouched
4 backups on disk:   settings.json.attnbox-bak present
```

Method note: an empty sandbox HOME (no ~/.claude, ~/.codex)
gets honest "not found — is it installed?" lines, not a crash.

## Verdict

All CLI golden paths healthy at the largest scale walked. No
P0/P1; docs-only, no changeset.
