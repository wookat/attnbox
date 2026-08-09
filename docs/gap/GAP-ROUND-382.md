# GAP-ROUND-382 — 第三十一批竞品扫描（纯文档）

Round 382. Driver dimension: competitor scan, first since
round-371. Watchlist all ten checked (authenticated API —
unauthenticated calls hit the rate limit, standing method
note), plus three-way new-entrant searches (created >
2026-08-04).

## Watchlist (movement since round-371)

```text
claude-dispatcher  ★9  · most active again — Products lens
                        (honest count/keys/cursor), build-version
                        nag, model-family usage split, cockpit
                        repo→product assignment
jind-ai            ★1  · pane-identity fix wave (#186) — popup/
                        split provenance, --here gaps; tmux TUI
                        lane unchanged
agentfleet         ★0  · "report what a machine is actually
                        doing, not what a timer implies" — real
                        machine-state reporting deepens; remote
                        multi-machine lane
ccmux              ★119 · v1.3.0 released + docs refresh, relay
                        skill trigger broadened; local/tmux
kookr              ★3  · high-velocity continues — pipeline
                        starvation counters, peer-URL SSRF
                        rejection, quota headroom tuning
agent-inbox        ★1  · silent since the Aug-7 hardening wave
                        (trusted-origin viewer mutations, network
                        boundary, migration serialization); still
                        pure local, no cloud aggregation
trail-boss         ★0  · license added post systemd ADR; quiet
kelpie             ★1  · desktop polish (keyboard nav, icons) +
                        VISION.md pointers; herdr ecosystem
claude-notify      ★0  · post-Phase-4 boundary work ("keep
                        question text on-machine"); Claude-only
coslash            ★3  · v0.0.1 README polish; local only
```

## New entrants

Three-way searches (attention inbox / waiting-on-you / approval
inbox, plus cloud-aggregation phrasings) over repos created
after 2026-08-04: no direct competitor. Only unrelated hits
(support-triage-agent — email triage; imark — markdown reader)
and already-tracked agentfleet/claude-notify.

## Verdict

No lane change: still no competitor combining local CLI
collectors with cloud/Devin attention aggregation.
Differentiation holds. No P0/P1; docs-only, no changeset.
