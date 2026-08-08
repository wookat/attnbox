# GAP-ROUND-272 — CLI 黄金路径复走（纯文档）

Round 272. Driver dimension: CLI golden path —
doctor / `ls --waiting` / `hooks --install` four states, first
since round-263, at 3,400+ sessions.

## Evidence (v0.4.8, live org)

### doctor (seven lines, all honest)

```text
✓ node / claude-code / codex / gemini / devin all healthy
– github-pr / webhook honestly inactive (env not set)
```

### ls --waiting

```text
15 waiting on you · 48 working · 3,409 total
every waiting item carries a detail preview + session link
(+ PR secondary link where present) · wall time: 3.3s
```

### hooks --install sandbox (four states)

```text
fresh:      claude merge + backup · codex merge + flag set
idempotent: both "already installed"
corrupt:    refuses merge, original file preserved verbatim
missing:    honest not-found guidance for both agents
```

All golden paths hold at the largest org size yet; wall time
within the historical envelope (2.7–5.4 s). Sandboxes removed,
zero residue.

## Verdict

No P0/P1; docs-only, no changeset.
