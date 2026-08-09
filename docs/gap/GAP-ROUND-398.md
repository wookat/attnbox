# GAP-ROUND-398 — CLI 黄金路径复走（纯文档）

Round 398. Driver dimension: CLI golden-path re-walk
(doctor / ls --waiting / hooks --install four states), first
since round-387. Live org @3,76x sessions.

## Evidence (v0.4.8)

doctor — all seven lines correct:

```text
✓ node / claude-code / codex / gemini / devin
– github-pr (no token, honest fallback-inactive)
– webhook (unset, honest no-push-channel)
```

ls --waiting @3,76x sessions:

```text
cold 2.9s · warm 3.8s
26/26 waiting rows with preview detail + action link
(session URL + PR secondary link)
```

hooks --install sandbox four states:

```text
fresh:      claude merged + backup · codex merged +
            codex_hooks=true + backups
idempotent: both report already installed, no rewrite
corrupt:    claude honest "could not merge — fix manually",
            codex unaffected
backups:    *.attnbox-bak written on first install
```

Sandbox removed, zero residue.

## Verdict

CLI golden paths fully healthy at the largest scale walked.
No P0/P1; docs-only, no changeset.
