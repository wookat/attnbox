# GAP-ROUND-50 — waiting 会话点开要能回答（session 优先于 PR）

Round 50. Driver dimensions: dogfood data analysis, UX walkthrough.

## Evidence sweep

- Dogfood (live, 106 sessions): 7 waiting / 9 working / 6 idle / 84 done,
  all waiting fresh (<0.5h) with detail previews, 0 unknown — pipeline
  healthy.
- UX walkthrough of the answer flow: every one of the 7 real waiting Devin
  items linked to its **PR page**, because the card URL preferred
  `pull_request.url` unconditionally. But a blocked session is asking a
  question that can only be answered *in the session* — Enter/click landed
  the user somewhere they cannot act, and the in-app `r` reply is Devin-only
  and optional.

## Gap (P1)

The core promise is "who is waiting on me and where do I go to unblock
them". For the dominant real-world case (waiting Devin session with an
open PR) the primary link went to the wrong place.

## Fix

`DevinCollector.toItem`: waiting sessions always link to the session URL;
non-waiting sessions keep PR-first (a finished/working session's most
useful destination is its PR).

## Evidence after fix

Live: all 7 waiting items now link to `app.devin.ai/sessions/…`; working
sessions with PRs still link to GitHub. 85 tests green (+1).

## Honest boundary

The PR link is no longer reachable from a waiting card until the session
stops waiting — acceptable trade; showing both links is a P2.
