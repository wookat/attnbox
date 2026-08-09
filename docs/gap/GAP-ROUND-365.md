# GAP-ROUND-365 — CLI 黄金路径复走（纯文档）

Round 365. Driver dimension: CLI golden-path re-walk
(`doctor` / `ls --waiting` / `hooks --install` four-state
sandbox), first since round-354. Real CLI against the live org
(~3,69x sessions).

## Evidence (v0.4.8)

`doctor` — seven lines all correct: node v22.23.2, Claude
(hooks authoritative), Codex (hooks.json authoritative), Gemini
(honest heuristic boundary), Devin (API reachable, key valid);
github-pr and webhook intentionally inactive, correctly shown
as `–`.

`ls --waiting` — warm runs 2.9 / 3.0 / 3.1 s at ~3,69x
sessions; 21 waiting lines all with preview + action links (29
URLs). First cold run 8.2 s (cold cache; warm steady-state
matches rounds 343/354 at ~3.0 s).

`hooks --install` sandbox four states:

```text
fresh install:      succeeds, honest "–" when agents absent
idempotent rerun:   succeeds, no duplicate writes
existing settings:  merges hooks, preserves model:"opus",
                    writes settings.json.attnbox-bak
corrupt JSON:       refuses merge with actionable "!" message,
                    leaves file byte-identical
```

Sandboxes removed.

## Verdict

CLI golden path fully healthy. No P0/P1; docs-only, no
changeset.
