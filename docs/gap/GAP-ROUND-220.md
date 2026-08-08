# GAP-ROUND-220 — CLI 黄金路径复走（纯文档）

Round 220. Driver dimension: CLI golden paths — `doctor` /
`ls --waiting` / `hooks --install` three-state (first since
round-208, now @3,254 sessions).

## Evidence (v0.4.8)

### doctor

Seven lines, all correct: node ✓, claude-code hooks authoritative
✓, codex hooks.json authoritative ✓, gemini heuristic-honest ✓,
devin API+key ✓, github-pr fallback inactive (no token) –,
webhook not set –.

### ls --waiting

```text
8 waiting on you · 46 working · 3254 total   (2.7 s)
```

All 8 waiting items carry a "what is it asking" preview plus a
session action link; 3 also carry secondary PR links.

### hooks --install (isolated-HOME sandbox, three states)

```text
fresh:      claude merged + backup · codex merged + codex_hooks=true
idempotent: both "already installed", no rewrites
corrupt:    `{broken` settings.json → refuses merge with manual-fix
            hint, original file left byte-identical; codex unaffected
```

Sandbox removed after the run.

## Verdict

All CLI golden paths healthy at 3,254-session scale (2.7 s, ties
round-181's best). No P0/P1; docs-only, no changeset.
