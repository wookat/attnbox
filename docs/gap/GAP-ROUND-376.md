# GAP-ROUND-376 — CLI 黄金路径复走（纯文档）

Round 376. Driver dimension: CLI golden-path re-walk
(`doctor` / `ls --waiting` / `hooks --install` four states),
first since round-365. Live org, ~3,71x sessions.

## Evidence (v0.4.8)

`doctor` — seven lines all correct: node v22.23.2; Claude
hooks authoritative; Codex hooks.json authoritative; Gemini
honest heuristic boundary; Devin API reachable/key valid;
github-pr and webhook intentionally inactive.

`ls --waiting` — warm run 3.1 s @3,71x sessions; 23 waiting
lines, 50 action URLs; every item carries preview detail plus
session/PR links. (Timing per round-365 method note: warm runs
only.)

`hooks --install` sandbox four states:

1. fresh install — settings.json written with hooks;
2. idempotent re-run — no duplicate entries;
3. existing `{"model":"opus"}` preserved, hooks merged,
   `settings.json.attnbox-bak` backup written;
4. corrupt JSON refused — original `{broken` left untouched.

## Verdict

Golden path fully healthy. No P0/P1; docs-only, no changeset.
