# GAP-ROUND-86 — `attnbox ls` waiting 项补等待时长（CLI 分诊优先级信号）

Round 86. Driver dimension: dogfood UX — during rounds 79–85 every
"waiting data health" check needed a hand-written script to compute
waiting ages from `--json` `lastActivityAt`, because the human-readable
`ls` output had no age at all. The web inbox has shown `timeAgo` on
cards since M0; the round-85 competitor scan (pulse-protocol's
waiting-time analytics) reinforced that *how long an agent has been
blocked on you* is the triage-priority signal.

## Change

`formatItem` appends a compact age to waiting lines only:

```
● waiting devin  cloud [answer] G17：第 17 轮修复线上回归 (8s)
● waiting devin  cloud [answer] 批次二实现负责人：… (5m)
```

New exported `formatAge(iso, now)` (`30s`/`45m`/`8h`/`3d`); non-waiting
lines unchanged; items without `lastActivityAt` unchanged.

## Verification

- Unit tests: `formatAge` boundaries + waiting-only rendering
  (96 tests green).
- Real inbox: `ls --waiting` shows correct ages against the live
  Devin dataset.

attnbox patch changeset.
