# GAP-ROUND-231 — CLI 黄金路径复走（纯文档）

Round 231. Driver dimension: CLI golden path — `doctor` /
`ls --waiting` / `hooks --install` three-state sandbox, first
since round-220.

## Evidence (v0.4.8 dist CLI, live org @3,285 sessions)

### doctor (0.2s)

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative waiting/approve)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no token — fallback inactive
– webhook      URL not set — no push channel while inbox closed
```

### ls --waiting (5.4s @3,285 sessions)

22 waiting on you · 49 working · 3,285 total. Every waiting item
carries a "what is it asking" preview line plus session action
link (and PR secondary link where present). Slower than
round-220's 2.7s at a 22-item waiting set (vs 8) — well inside
the historical 2.7–5.6s envelope, not a regression signal.

### hooks --install (isolated-HOME sandbox, three states)

```text
fresh:      claude merged + backup · codex merged + codex_hooks=true
idempotent: both report already installed, no rewrite
corrupt:    {broken settings.json → refuses merge, original preserved
```

Sandbox removed after the run.

## Verdict

All three golden paths healthy. No P0/P1; docs-only, no
changeset.
