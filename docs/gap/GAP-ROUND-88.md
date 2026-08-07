# GAP-ROUND-88 — dogfood 数据审计：长时 working 云会话核实为忠实透传（纯文档）

Round 88. Driver dimension: dogfood data analysis on the live inbox
(2,885 sessions).

## Audited

- Status distribution: 2,834 done / 40 working / 6 idle / 5 waiting;
  0 `unknown`.
- Waiting quality: 5/5 waiting items carry `detail` + `url`
  (+ attention `answer`); no blanks.
- **Anomaly investigated**: 20 Devin sessions showed `working` with no
  `updated_at` movement for over an hour. Cross-checked three of them
  directly against `GET /v1/session/{id}` — the Devin API itself
  reports `status_enum: working` (orchestrator/standby sessions
  supervising children). attnbox is faithfully passing through the
  authoritative vendor status, not misreporting.
- `project` coverage: 1,196/2,879 Devin sessions have no PR URL to
  derive a repo from → land in the `devin · no project` bucket, as
  designed (round-46/53 behavior).

## Change

One honest-boundary line added to `docs/LIMITS.md`: cloud statuses are
vendor-authoritative pass-through; a Devin session can legitimately
stay `working` for hours; the 5-minute stale-`working` cap applies
only to heuristic local collectors.

## Verdict

No P0/P1 — the anomaly was verified as correct behavior at the source.
Docs-only; no changeset.
