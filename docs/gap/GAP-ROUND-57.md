# GAP-ROUND-57 — bundle 体积 P2 评估：判定不修（有据）

Round 57. Driver dimension: frontend visual/performance analysis.

## Question

Round-49 Lighthouse flagged ~93 KiB unused JS in the inbox bundle. Is it
worth fixing now?

## Evidence

- Production bundle: one JS asset, 217,584 bytes minified / **67,778
  bytes gzipped** (measured).
- Composition: React 19 + react-dom dominate; the app itself is a single
  page (~35 KB of the minified total). The "unused" bytes are mostly
  react-dom code paths a one-page app never executes — inherent to
  shipping React, not dead app code.
- Current Lighthouse on the inbox: perf 94–95, TBT 0 ms, CLS 0.076–0.08
  (rounds 43/49). The daemon serves the bundle from loopback/LAN with
  immutable caching (round-33), so the cost is one ~66 KB gzip transfer
  per deploy.

## Options considered

1. Code-splitting — no win: single page, no route boundaries worth
   splitting.
2. preact/compat swap — would cut ~130 KB min, but adds a compat layer
   risk across our keyboard/SSE/notification surface for a metric that
   is already green, and deviates from the mainstream-stack principle.
3. Do nothing — zero risk; revisit if the app grows real route
   boundaries (e.g. a settings page) or Lighthouse perf regresses.

## Decision

Option 3. P2 stays open with a concrete revisit trigger (new routes or
perf < 90). No code change this round.
