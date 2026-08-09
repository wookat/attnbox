# GAP-ROUND-335 — --host token 门禁 + webhook 复测（纯文档）

Round 335. Driver dimension: security surface + webhook channel
re-test, first since round-324 — seven-face token-gate negative
sweep plus a live webhook observation window against a real
sink, at 3,606-session scale.

## Evidence (v0.4.8)

Token gate (`--host 0.0.0.0` + `ATTNBOX_TOKEN`):

```text
/api/items no token          → 401
/api/items wrong bearer      → 401
/api/items correct bearer    → 200
/api/items wrong ?token=     → 401
/api/items correct ?token=   → 200
/api/events?slim=1 no token  → 401
/api/events correct bearer   → streams data
POST /api/ack no token       → 401
static shell (/)             → 200
```

All rounds 29/84 contracts hold.

Webhook (real HTTP sink, `ATTNBOX_WEBHOOK_URL`):

```text
startup against 22 stock waiting items → no bulk storm
~4-minute window → 10 POSTs · 10 unique ids · 0 duplicates
one posted item observed leaving waiting (back to working)
```

No storm signature (a round-71-class storm re-posts the whole
stock set at once; here the 22-item stock never appeared as a
burst). Zero duplicates. This was an unusually busy org window
(many child sessions transitioning), so post volume is higher
than prior rounds' 1–5.

## Open observation (carry to next security round)

5 of the 10 posted items were already `waiting` in an
`/api/items` snapshot taken 20s–2min before their POST. Likely
benign: at 3.6k scale the Devin detail burst cap (10 uncached
queries/cycle, round-20) staggers first-full-observation across
cycles, and the notified-set guard is observation-based, not
timestamp-based — a late-first-observed waiting item is posted
once, by design. No product code changed in the merge window
(rounds 325–334 all docs-only) and round-324 measured 24 stock →
0 POSTs, so a regression is not possible; still, next security
round should capture the daemon's first-collect boundary
precisely (log collect-cycle ids) to confirm the attribution.

## Verdict

No P0/P1; docs-only, no changeset.
