# attnbox

Unified attention inbox for your AI coding agents — local CLI agents (Claude Code, Codex CLI, Gemini CLI) and cloud agents (Devin, PRs awaiting your review) in one view: **which agent is waiting on you, and for what**.

```bash
npx attnbox            # start the daemon + web inbox at http://127.0.0.1:4820
npx attnbox ls         # one-shot: list sessions and who is waiting on you
npx attnbox doctor     # check which collectors are active and how to upgrade
npx attnbox hooks --install   # one-command authoritative-mode setup (backups kept)
```

- **Local-first, read-only**: local agents are detected from their own session files; nothing is executed, nothing leaves your machine.
- **Authoritative vs heuristic**: hook-driven statuses are exact; file-activity guesses are labeled `~heuristic`, never overstated.
- **Cloud**: set `DEVIN_API_KEY` for Devin sessions (reply to blocked sessions right from the inbox), `GITHUB_TOKEN` for PRs awaiting your review.
- **Mobile-first web inbox** with PWA install, browser notifications, search and keyboard navigation.

Docs: https://attnbox.zalize.com — including [honest limits](https://attnbox.zalize.com/limits/) per source.
