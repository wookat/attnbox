# GAP-ROUND-194 — dogfood 数据健康度复查（纯文档）

Round 194. Driver dimension: data analysis — live dogfood
waiting/ack data health + waiting-age distribution (first since
round-184).

## Evidence (v0.4.8, live daemon, full `/api/items`)

- Scale: **3,191 sessions** (waiting 30 / working 64 / idle 6 /
  done 3,091) — grown from 3,163 at round-184.
- **0 unknown statuses** — status derivation covers everything.
- **Waiting completeness: 30/30** carry both a question preview
  (`detail`) and an actionable `url` — the round-111 fetch-all
  contract holds at the largest waiting set yet measured.
- **Waiting ages**: min 0.1 / median 15.5 / max 56.3 minutes — a
  live spread, no stuck ancient item; the 56-minute head is a real
  session genuinely awaiting a decision, not staleness.
- **Ack ledger**: 0 entries, 0 orphans — clean after round-185's
  probe cleanup.
- Summary counts consistent with item-level tallies.

Probe daemon torn down; port verified clear.

## Verdict

Fourth consecutive clean data round (167 → 174 → 184 → 194). No
P0/P1; docs-only, no changeset.
