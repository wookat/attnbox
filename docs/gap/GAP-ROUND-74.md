# GAP-ROUND-74 — CLI waiting 项补行动链接（P2 转正）

Round 74. Driver dimension: UX walkthrough of the terminal triage flow
at real scale (18 waiting items today).

## Found

`attnbox ls --waiting` told you *who* is waiting and *what for*, but
not *where to go act* — the web inbox has had waiting-item deep links
since round 50 (plus PR secondary links since round 63), while
terminal users had to open the web UI or fish URLs out of `--json`.
With 18 real waiting items, that round-trip is the slowest step of the
CLI flow. Long-standing P2 (in the ledger since round 63), now
promoted: the burst-heavy days make the CLI path actually used.

## Fix

`formatItem` appends the action URL under each **waiting** item, with
the PR as a secondary link when it differs:

```
● waiting devin  cloud [answer] Fix the login bug
  └ Should I use bcrypt or argon2?
  └ https://app.devin.ai/sessions/abc  (PR: https://github.com/o/r/pull/1)
```

Non-waiting items stay single-line (the list stays scannable);
`--json` unchanged. Verified on the real inbox: 18 waiting items all
show their session deep link; terminals autolink the URLs.

92 tests green. attnbox patch changeset.
