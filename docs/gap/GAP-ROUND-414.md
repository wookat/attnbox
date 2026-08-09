# GAP-ROUND-414 — rounds 404–413 合并回归审计（纯文档）

Round 414. Driver dimension: runtime regression audit over
the rounds 404–413 merge surface (all docs-only), first soak
since round-403. Live daemon @3,807 sessions (largest to
date).

## Evidence (v0.4.8)

Daemon soak — ~16 minutes, real node child PID sampled
every 60s:

```text
RSS 125–153 MB, flat within the historical 96–156 MB
envelope · 0 errors/unhandled/exceptions in daemon log
summary: 3,807 total · 20 waiting · 63 working
```

Dual-theme web smoke (fresh localStorage per theme):

```text
light: 85 cards · 0 console/page errors
dark:  85 cards · 0 errors on clean re-run
```

Method note: the first dark pass logged one
`Manifest: Line 1, column 1, Syntax error` — shared-browser
artifact, not product: `/manifest.webmanifest` serves valid
JSON (200) and a clean re-run with manifest request tracing
shows only 200s on the correct URL and zero errors. (The
SPA fallback serves `index.html` for unknown paths like
`/manifest.json`, so a stale tab requesting the wrong path
would see HTML — the shipped `<link rel="manifest">` points
at the correct `/manifest.webmanifest`.)

`pnpm test`: 98 passed (98). Probe daemon killed, port
clear, leftover CDP probe targets closed (48 → 11).

## Verdict

Rounds 404–413 merge surface is regression-free. No P0/P1;
docs-only, no changeset.
