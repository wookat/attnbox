# GAP-ROUND-99 — hooks --install 黄金路径与负例复测（纯文档）

Round 99. Driver dimension: real testing — the round-8 authoritative
hooks installer had not been re-exercised since it shipped (many CLI
releases ago), and it is the on-ramp to authoritative mode.

## Probed (0.4.5-equivalent build, clean fake HOMEs)

- **Clean install**: fresh `~/.claude` + `~/.codex` → both installed,
  Claude `Notification/Stop/UserPromptSubmit` hooks written, codex
  `hooks.json` + `codex_hooks = true` set, backups created.
- **Idempotency**: second run → "already installed" for both, no
  duplicate entries.
- **Broken config rejection**: `{broken json` in
  `.claude/settings.json` → warning + exit 1, original file left
  byte-identical (no destructive overwrite), codex side still
  proceeds independently.
- **User-config preservation**: settings with a custom Notification
  hook + `model: opus` → merge keeps the user hook and the model key,
  adds attnbox's hook alongside; `.attnbox-bak` matches the exact
  pre-merge content.

## Verdict

No P0/P1: install, idempotency, fail-safe rejection, merge
preservation, and backup fidelity all per round-8 contract on current
code. Docs-only; no changeset.
