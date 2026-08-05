# GAP-ROUND-4 — production benchmark loop, round 4

Date: 2026-08-05. Reference this round: **setup diagnosability** in mature dev tools (`gh auth status`, `brew doctor`, `flutter doctor`) — the ability to answer "why is my inbox missing X?" in one command. Motivated directly by round-3's silent-degradation finding: attnbox activates collectors implicitly (dirs/keys present or not) and the honest confidence model (authoritative vs heuristic) depends on hook setup the user can't easily inspect.

## Gap list

| # | Mature tool does | attnbox today | Priority |
|---|---|---|---|
| 1 | `brew doctor`/`gh auth status`: one command showing what's active, what's degraded, and the exact next step | No way to see which collectors are on, whether hooks are installed, or whether the cloud key works | **P0** |
| 2 | Cloud act-in-place (reply to a blocked Devin session from the inbox) | Link-out only | P1 (needs #11's UI merged first; round 5) |

## Round-4 fix

`attnbox doctor` — checks Node version, each local collector (dir present? hooks installed → authoritative, or heuristic-only with the `attnbox hooks` upgrade hint), Devin (key set + **live API probe** distinguishing valid key / bad key / network down), and the GitHub review fallback. Aligned `✓ / ! / –` output; exit 1 when anything is degraded (scriptable). Real run on this machine:

```text
✓ node         v22.23.2
! claude-code  sessions found, heuristic only — run `attnbox hooks` to upgrade
! codex        sessions found, heuristic only — run `attnbox hooks` to upgrade
✓ gemini       found (heuristic working/idle only, never claims waiting)
✓ devin        API reachable, key valid
– github-pr    no ATTNBOX_GITHUB_TOKEN/GITHUB_TOKEN — fallback inactive
```

## Regression verdict

58 tests pass (5 new doctor cases: empty home, heuristic warn, authoritative ok, live-key probe good/bad/down, formatting). Verified against real `~/.claude`/`~/.codex`/`~/.gemini` + live Devin API. Remaining gaps carried: cloud act-in-place (round 5, after the round-2 UI merges), macOS run verification, Windows unsupported (documented).
