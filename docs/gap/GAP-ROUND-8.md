# GAP-ROUND-8 — production benchmark loop, round 8

Date: 2026-08-05. Reference: **one-command setup** — `ccmux setup` (installs its hook adapters into agent configs directly), `gh auth login`, `flutter doctor --android-licenses`: mature tools never make the user hand-merge JSON. Our `attnbox doctor` (round 4) diagnoses the heuristic→authoritative gap but the prescribed cure was "run `attnbox hooks` and merge the snippets yourself" — the single biggest onboarding friction left.

## Gap list

| # | Reference does | attnbox today | Priority |
|---|---|---|---|
| 1 | `ccmux setup`: writes hooks into agent configs itself, idempotently | `attnbox hooks` prints JSON/TOML snippets; user must hand-merge 3 files | **P0** |
| 2 | `gh auth login`: verifies afterwards | doctor exists but nothing points from install back to verification | P1 |

## Round-8 fix

`attnbox hooks --install`:

- merges hook entries into `~/.claude/settings.json` and `~/.codex/hooks.json`, appending alongside any existing user hooks (never replacing them); sets `codex_hooks = true` under `[features]` in `~/.codex/config.toml` (reuses an existing `[features]` section)
- idempotent: second run reports "already installed", zero writes
- safe: originals backed up as `*.attnbox-bak` before any write; a config that fails to parse (or a conflicting `codex_hooks = false`) is **refused with exit 1**, never overwritten; agents whose dirs don't exist are skipped
- success points to the verification loop: restart sessions → `attnbox doctor`
- `attnbox doctor` warnings now prescribe `attnbox hooks --install`; README/site docs lead with it (`attnbox hooks` remains for review-first users)

## Evidence

- Real machine: first run merged this machine's live `~/.claude/settings.json` (existing user hooks preserved, backup created) and `~/.codex` config; `attnbox doctor` flipped claude-code/codex from `!` heuristic to `✓` authoritative; second run: both `already installed`.
- 72 tests (5 new: skip/fresh-install+idempotence/preserve-user-config+backup/corrupt-refusal/format).

## Regression verdict

Heuristic→authoritative upgrade is now one command + restart, matching `ccmux setup`. Remaining: macOS/Windows verification; Cursor/Copilot native collectors still credential-blocked.
