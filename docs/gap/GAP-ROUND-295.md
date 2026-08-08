# GAP-ROUND-295 — CLI 黄金路径复走（纯文档）

Round 295. Driver dimension: CLI golden path — doctor /
`ls --waiting` / `hooks --install` four-state sandbox, first
since round-283, now at 3,460+ sessions.

## Evidence (v0.4.8)

`attnbox doctor` — all seven lines correct:

```text
✓ node         v22.23.2
✓ claude-code  sessions found, hooks installed (authoritative)
✓ codex        sessions found, hooks.json installed (authoritative waiting/approve)
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
– webhook     ATTNBOX_WEBHOOK_URL not set — no push channel while the inbox is closed
```

`attnbox ls --waiting`:

```text
14 waiting on you · 44 working · 3466 total
real 0m2.971s
```

All 14 waiting items carry "what it's waiting for" previews and
action links (session URL + PR secondary link). 3.0 s at 3,466
sessions is inside the historical 2.7–5.6 s envelope.

`hooks --install` isolated-HOME sandbox, four states:

1. fresh (no `~/.claude`/`~/.codex`): honest "not found"
   guidance, no dirs created;
2. idempotent re-run: same output, no duplicates;
3. existing valid config: hooks merged, backup written
   (`settings.json.attnbox-bak`), pre-existing user hook
   preserved (verified);
4. corrupt config: merge refused with manual-fix guidance, the
   broken file left untouched.

Sandbox removed after the run.

## Verdict

No P0/P1; docs-only, no changeset.
