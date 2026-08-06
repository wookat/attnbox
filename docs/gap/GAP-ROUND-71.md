# GAP-ROUND-71 — webhook 抖动风暴防护（负例审计，P1）

Round 71. Driver dimension: real testing — negative-path audit of the
round-69 webhook under collector failure.

## Found (P1)

The webhook's "newly waiting" set was rebuilt from each pass's current
items. A Devin API outage (fail-soft returns no items) followed by
recovery made every waiting item look "new" again — at today's dogfood
scale that is a 26-POST storm at the user's ntfy/Slack endpoint per
flap, and flaps can repeat.

The bundled web UI has the same pass-scoped semantics for browser
notifications (`seenWaiting` in `App.tsx`), but the blast radius is
one local tab, notifications dedupe by `tag: item.id`, and the OS
coalesces them — kept as-is, documented here.

## Fix

`waitingSeen` is now transition-scoped: an id leaves the set only when
observed in a **non-waiting status**, never when merely absent from a
pass. Regression test: outage → recovery fires 0 posts; a genuine
waiting → done → waiting cycle still fires.

91 tests green. daemon patch changeset.
