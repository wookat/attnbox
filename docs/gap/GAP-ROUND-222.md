# GAP-ROUND-222 — rounds 210–221 合并回归审计（纯文档）

Round 222. Driver dimension: runtime regression audit — daemon
soak (RSS/error rate) + dual-theme smoke over the rounds 210–221
merged surface (first since round-210; that whole window was
docs-only).

## Evidence (v0.4.8, live daemon @3,263 sessions)

### 15-minute soak

```text
RSS: 120–139 MB across 15 one-minute samples (flat, no trend)
daemon log errors/unhandled/exceptions: 0
post-soak /api/items: 3,263 total · 9 waiting · 39 working (healthy)
```

Matches rounds 203/210 envelopes (128–143 MB).

### Dual-theme smoke (real Chrome)

```text
dark:  48 active cards · 0 console/page errors
light: 48 active cards · 0 console/page errors
```

Cleanup: probe daemon killed via real listener PID, port 4950
verified clear, temp script and log removed.

## Verdict

Rounds 210–221 merged surface fully green. No P0/P1; docs-only,
no changeset.
