# GAP-ROUND-240 — CLI 黄金路径复走（纯文档）

Round 240. Driver dimension: CLI golden path — `doctor` /
`ls --waiting` / `hooks --install` three-state, first since
round-231.

## Evidence (v0.4.8, live org @3,301 sessions)

### doctor (0.2s)

```text
✓ node / claude-code (hooks authoritative) / codex (hooks.json
  authoritative waiting/approve) / gemini (heuristic, never
  claims waiting) / devin (API reachable, key valid)
– github-pr / webhook honestly reported inactive (env not set)
```

### ls --waiting (3.9s @3,301 sessions)

```text
20 waiting on you · 56 working · 3,301 total
all 20 waiting items carry preview detail + action link
(session URL, PR secondary link where present)
```

Within the historical envelope (2.7–5.4s).

### hooks --install (isolated HOME sandbox)

```text
fresh:      claude merged + backup · codex merged + codex_hooks=true
idempotent: both report already installed, no rewrite
corrupt:    {broken settings.json → refuses merge, original preserved
missing:    no ~/.claude / ~/.codex → honest "not found" guidance
```

## Verdict

All golden paths healthy. No P0/P1; docs-only, no changeset.
