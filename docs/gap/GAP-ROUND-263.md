# GAP-ROUND-263 — CLI 黄金路径复走（纯文档）

Round 263. Driver dimension: CLI golden paths — doctor /
`ls --waiting` / `hooks --install` four states, first since
round-251.

## Evidence (v0.4.8, live org @3,390 sessions)

### doctor (0.2s)

```text
✓ node / claude-code / codex / gemini / devin all healthy
– github-pr / webhook honestly inactive (env not set)
```

### ls --waiting

```text
15 waiting on you · 55 working · 3,390 total
every waiting item carries a detail preview + session link
  (PR secondary link where present)
wall time: 2.8s — within the historical 2.7–5.4s envelope
```

### hooks --install (isolated-HOME sandbox, four states)

```text
fresh:      claude merge + backup · codex merge + flag set
idempotent: both "already installed"
corrupt:    refuses merge, original file preserved verbatim
missing:    honest not-found guidance for both agents
```

All round-8/74/86 contracts hold at the largest org size yet.
Sandbox removed, no probe residue.

## Verdict

No P0/P1; docs-only, no changeset.
