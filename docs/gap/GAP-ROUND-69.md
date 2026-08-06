# GAP-ROUND-69 — waiting webhook：收件箱关着时的自选通道（P1 转正）

Round 69. Driver dimension: user/data analysis + the long-standing
"notifications only work while the inbox is open" boundary (GAP-26).

## Evidence

- Dogfood this hour: waiting jumped 10 → 18 within ~35 minutes — bursts
  happen when the inbox is least likely to be open (deep work).
- The honest round-26 boundary stands: no push server, by design. But
  "no push server" ≠ "no way to hear about it": an outbound webhook to
  a **user-chosen** endpoint keeps the privacy trade-off explicit while
  enabling ntfy/Slack/automation channels that work with every browser
  closed. ccmux/Omnigent have no equivalent; this is also the first
  public extension point from the roadmap.

## Shipped

`ATTNBOX_WEBHOOK_URL` (daemon option `webhookUrl`): POST
`{ event: "waiting", item }` on each new waiting transition.

- Same "new transitions only" semantics as browser notifications —
  items already waiting at daemon startup never fire.
- Fire-and-forget with a 5 s timeout; webhook failures can never
  affect collection, SSE, or the API.
- Live-verified: a real Devin session that became blocked during the
  smoke run fired exactly one webhook with the full item payload;
  startup fired none (18 pre-existing waiting items, 0 posts).

## Honest boundaries (in LIMITS)

- No retries, no delivery guarantee, no request signing.
- One POST per item transition — a burst of N new waiting items is N
  POSTs.

minor changesets for `attnbox-daemon` + `attnbox`. 90 tests green.
