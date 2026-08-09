# GAP-ROUND-431 — CLI 黄金路径复走（纯文档）

Round 431. Driver dimension: CLI golden-path re-walk
(`doctor` / `ls --waiting` / `hooks --install` four-state
sandbox), first since round-420, at 3,83x live sessions.

## Evidence (v0.4.8)

`doctor` — seven lines, all correct on this box:

```text
✓ node · ✓ claude-code (authoritative) · ✓ codex
  (authoritative) · ✓ gemini (heuristic, never waiting)
✓ devin (API reachable, key valid)
– github-pr (no token, honest inactive)
– webhook (unset, honest no-push note)
```

`ls --waiting` — warm run 2.8s @3,83x sessions, 5 waiting
items, every one with preview detail + session action link
(PR secondary links where present, 22 links total).

`hooks --install` sandbox four states:

```text
empty HOME             → honest not-found for both agents
dirs present           → merged + .attnbox-bak backups
second run             → idempotent "already installed"
corrupt settings.json  → refused with manual-merge hint,
                         codex unaffected
```

Empty-HOME `doctor` honestly reports all local collectors
inactive. Sandboxes removed, zero residue.

## Verdict

CLI golden path fully healthy at the largest-yet scale.
No P0/P1; docs-only, no changeset.
