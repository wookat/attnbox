---
title: Using the inbox
description: Keyboard-first triage — search, handled state, grouping, and replying to cloud agents in place.
---

The web inbox is built for the same triage speed as a keyboard-first mail client.

## Keyboard

| Key | Action |
|---|---|
| `/` | Focus search (title, project, agent, and what the agent is asking) |
| `j` / `k` or `↓` / `↑` | Move selection |
| `Enter` | Open the selected session |
| `p` | Open the selected item's pull request (when it has one) |
| `e` | Mark the selected waiting item handled / unhandled |
| `r` | Reply to the selected Devin item without leaving the inbox |
| `Esc` | Clear search / selection, close the reply box |
| `?` | Show the shortcut help overlay |

Press `?` any time (or click *press ? for shortcuts* in the footer) for the in-app cheat sheet.

## Theme

The inbox follows your OS theme (`prefers-color-scheme`) out of the box — full light and dark palettes, both WCAG AA. The ◐ button in the header overrides it per browser: it cycles **system → light → dark**, persists across reloads with no flash, and “system” keeps reacting live to OS theme changes.

## What is it waiting for?

Waiting items show a preview of what the agent actually needs, right under the title — no context switch just to find out:

- **Devin** — the last message the agent sent (its question or report), fetched read-only from the API and cached per state change.
- **Claude Code** — the last assistant message from the local transcript.
- **Codex** — the pending approval: `wants to run: <command>` or `wants to apply a patch`.

In `attnbox ls`, the same preview appears as an indented `└` line.

## Handled ("done") state

Click `✓` (or press `e`) on a waiting item once you've dealt with it: it leaves the *Needs you* section, the tab-title count, and notifications. If that agent becomes active again later, the item automatically resurfaces — the same resurface-on-new-activity model as GitHub notifications.

Handled state is stored by the daemon in `~/.attnbox/acked.json` and synced live to every open tab and device, so your phone and desktop always agree.

## Finished sessions stay out of the way

In the default *All* view, sessions that have ended (finished cloud runs and ended local sessions) collapse behind a **Show N finished sessions** button, so the list you scan is only what's waiting on you or still running. Expand it any time; the *Done* tab, search, and the grouped view always show everything.

## Grouping

The `⊞` toggle groups the list by project. Devin sessions with a pull request are grouped by that repository (`owner/repo`); cloud sessions without one fall back to an agent bucket. Groups are ordered by how many active sessions they hold — busiest first, fallback buckets last — and group headers collapse. Collapsed groups stay collapsed across reloads (per browser), and `j`/`k` walk the list in the on-screen group order, skipping collapsed groups.

Waiting cloud items link straight to the session — the place you can actually answer — while finished or working sessions with a pull request link to the PR. When a waiting session also has a pull request, a small **PR ↗** chip in the card's metadata row opens it in a new tab without leaving the session link as the primary action.

## Reply in place (cloud agents)

Devin items that are waiting on you show a `↩` button (or press `r`): type an answer and hit `⌘↵` — the message goes straight to that session via `POST api.devin.ai/v1/session/{id}/message`, and the item is marked handled. This is the only write attnbox ever performs, and only at your explicit action.

## Notifications

The bell toggle enables browser notifications: the moment an agent starts waiting on you, you get a notification showing what the agent is asking, deep-linking to the session. Already-handled items never notify.

Notifications carry a **✓ Done** action button (browsers with service-worker notification actions — Chrome, Edge, Android): click it to mark the item handled straight from the notification, without opening the inbox. The ack is persisted by the daemon and synced to your other devices. Browsers without action support show the same notification without the button.

## Webhook (bring your own channel)

Browser notifications only fire while the inbox is open somewhere — by design there is no push server. If you want a channel that works with the inbox closed, point the daemon at your own endpoint:

```bash
ATTNBOX_WEBHOOK_URL=https://ntfy.sh/my-topic attnbox
```

Each time an agent *newly* starts waiting on you, the daemon POSTs `{ "event": "waiting", "item": { … } }` (the same item shape as `/api/items`) to that URL — wire it to ntfy, a Slack incoming webhook relay, or anything else. Fire-and-forget: webhook failures never affect the inbox, and sessions already waiting when the daemon starts don't fire.

The plain URL above shows the raw JSON as the notification text. ntfy can template it into a readable push ([message templating](https://docs.ntfy.sh/publish/#message-templating), verified end-to-end):

```bash
ATTNBOX_WEBHOOK_URL='https://ntfy.sh/my-topic?tpl=yes&title={{.item.agent}}+is+waiting:+{{.item.title}}&message={{if+.item.detail}}{{.item.detail}}{{else}}needs+your+attention{{end}}' attnbox
```

which arrives on your phone as “**devin is waiting: Fix the login bug** — Should I use bcrypt or argon2?” (`item.detail` only exists when the collector saw the actual question, hence the fallback).

## From your phone

The daemon binds `127.0.0.1` by default — nothing leaves your machine. To open the inbox from another device (e.g. install the PWA on your phone):

```bash
ATTNBOX_TOKEN=$(openssl rand -hex 24) attnbox --host 0.0.0.0
```

Then open `http://<your-machine>:4820/?token=<that token>` on the phone once — the token sticks in that browser and every `/api/*` request (SSE, acks, replies) carries it. Without `ATTNBOX_TOKEN`, `--host` refuses to start.

The token protects the API, not the transport (plain HTTP): prefer a private tailnet/VPN (e.g. Tailscale) over exposing a LAN port.
