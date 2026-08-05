---
title: Quick start
description: Run the attnbox inbox in one command.
---

## Run it

```bash
npx attnbox        # start the daemon + web inbox at http://127.0.0.1:4820
npx attnbox ls     # one-shot list in your terminal
```

That's it. Local sessions from Claude Code (`~/.claude`), Codex CLI (`~/.codex`) and Gemini CLI (`~/.gemini`) are discovered automatically, read-only.

## Enable cloud collectors

Cloud collectors activate only when their keys are present:

```bash
DEVIN_API_KEY=...    npx attnbox   # Devin sessions (blocked => waiting on you)
GITHUB_TOKEN=...     npx attnbox   # open PRs where your review is requested
```

Use `ATTNBOX_GITHUB_TOKEN` if you want a token dedicated to attnbox.

## Install on your phone

Open the inbox in your mobile browser (e.g. via Tailscale or any tunnel to your machine) and use “Add to Home Screen” — attnbox is a PWA. Tap the bell to get a notification the moment an agent starts waiting on you.

## Options

```text
attnbox --port <n>   # default 4820 (env ATTNBOX_PORT)
attnbox hooks        # print authoritative-mode config snippets
attnbox doctor       # check which collectors are active and how to upgrade
attnbox --help
```
