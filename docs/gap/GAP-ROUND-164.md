# GAP-ROUND-164 — CLI 黄金路径复走（纯文档）

Round 164. Driver dimension: CLI golden-path re-walk —
doctor / `ls --waiting` / `hooks --install` three-state (first since
round-151, live org at 3,110+ sessions).

## Evidence (v0.4.8)

- `doctor`: seven lines all correct — node, claude (hooks
  authoritative), codex (hooks.json authoritative), gemini (honest
  heuristic note), devin (API reachable, key valid), github-pr and
  webhook honestly reported inactive.
- `ls --waiting`: 3.8–5.6 s over three runs at 3,110+ sessions
  (round-151: 3.0 s @3,070 — same order, cache-warmth variance);
  14 waiting rows all carrying age, question preview (`└` detail),
  session link, and PR secondary link where present.
- `hooks --install` three states:
  1. malformed `settings.json` → refuses with a fix-manually hint,
     file untouched;
  2. clean home → merges Claude hooks + Codex `hooks.json` with
     `.attnbox-bak` backups;
  3. second run → "hooks already installed" (idempotent).

## Verdict

CLI golden path fully healthy at grown scale. No P0/P1; docs-only,
no changeset.
