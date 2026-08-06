---
"attnbox": patch
---

Eliminated the large first-load layout shift (CLS 0.37 → 0.076, Lighthouse perf 79 → 95): the list area now mounts fresh after the first snapshot instead of pushing a pre-mounted section down, and waiting cloud cards reserve their detail-preview line while it streams in.
