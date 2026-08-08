# GAP-ROUND-251 — CLI 黄金路径复走（纯文档）

Round 251. Driver dimension: CLI golden paths —
doctor / ls --waiting / hooks --install states, first since
round-240.

## Evidence (v0.4.8, live org @3,345 sessions)

### doctor

```text
✓ node / claude-code / codex / gemini / devin all healthy
– github-pr / webhook honestly inactive (env not set)
```

### ls --waiting

```text
30 waiting on you · 69 working · 3,345 total
wall time: 3.1s — within the historical 2.7–5.4s envelope
every waiting item carries preview detail + session link
  (+ PR secondary link where present)
```

### hooks --install (isolated-HOME sandbox, four states)

```text
fresh:      claude merge + backup · codex merge + flag set
idempotent: both "already installed"
corrupt:    refuses merge, original file preserved verbatim
missing:    honest not-found guidance for both agents
```

All rounds 74/86/240 contracts hold. Sandboxes removed.

## Verdict

No P0/P1; docs-only, no changeset.
