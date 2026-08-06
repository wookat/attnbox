# GAP-ROUND-33 — Lighthouse 驱动的加载体验与传输层修复

Round 33 of the production benchmark loop. Driver dimensions this round: real
testing (Lighthouse on the live daemon with 100+ real sessions), UX walkthrough
(first-load experience), and frontend visual analysis.

## Evidence

Lighthouse 13.4.1, mobile emulation, against the live daemon (real data,
~106 sessions / 13 waiting):

| Category | Before | After |
| --- | --- | --- |
| Performance | 78 | 79 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 82 | 91 (meta description fixed; robots.txt now served) |
| CLS | 0.42 | 0.37 |

## Findings and fixes

### P1 — false "No one is waiting on you 🎉" flash before data arrives (UX)

Before the first SSE snapshot arrives the header claimed "No one is waiting on
you 🎉" and the body showed the first-run onboarding card — both false for a
returning user with waiting agents. Fixed: until the first snapshot the header
shows "Checking your agents…" and the list shows a pulse skeleton; the
first-run card only renders once we *know* there are zero sessions.

### P2 — no cache headers on static assets

The daemon served every static file with no `cache-control`, so reloads
re-downloaded the full 210 KB JS bundle. Vite content-hashes everything under
`/assets/`, so those are now `public, max-age=31536000, immutable`; index.html,
sw.js and the manifest are `no-cache` (revalidate). Covered by a daemon test.

### P2 — missing meta description / robots.txt (SEO)

Added `<meta name="description">` and a permissive `robots.txt` (previously the
SPA fallback served HTML for `/robots.txt`).

## Honest remaining gap

CLS is still ~0.37 (not "good" < 0.1). Measured root cause (deterministic
across runs, `layout-shifts` audit): after the first snapshot renders, Devin
detail previews arrive on later collect cycles (round-20 burst cap of 10
uncached queries per cycle), each new detail line grows a waiting card and
pushes the large "everything else" list down. Reserving detail space on every
card would waste vertical space for the majority that never get one; a taller
skeleton experiment made CLS *worse* (0.635). This is inherent to a live inbox
that streams progressively-enriched data; recorded here rather than papered
over. Candidates if it ever matters: `min-height` only on waiting cloud cards,
or delaying the first snapshot until the detail cache warms (rejected: delays
time-to-data).

Remaining perf audits (unused JS ~92 KB of 210 KB bundle, FCP 2.0s under
simulated mobile throttling) are P2 for a localhost-served tool.
