---
title: Using the inbox
description: Keyboard-first triage — search, handled state, grouping, and replying to cloud agents in place.
---

The web inbox is built for the same triage speed as a keyboard-first mail client.

## Keyboard

| Key | Action |
|---|---|
| `/` | Focus search (title, project, agent) |
| `j` / `k` or `↓` / `↑` | Move selection |
| `Enter` | Open the selected session |
| `e` | Mark the selected waiting item handled / unhandled |
| `r` | Reply to the selected Devin item without leaving the inbox |
| `Esc` | Clear search / selection, close the reply box |

## Handled ("done") state

Click `✓` (or press `e`) on a waiting item once you've dealt with it: it leaves the *Needs you* section, the tab-title count, and notifications. If that agent becomes active again later, the item automatically resurfaces — the same resurface-on-new-activity model as GitHub notifications.

Handled state is stored by the daemon in `~/.attnbox/acked.json` and synced live to every open tab and device, so your phone and desktop always agree.

## Grouping

The `⊞` toggle groups the list by project (falling back to agent for cloud sessions without project metadata). Group headers collapse.

## Reply in place (cloud agents)

Devin items that are waiting on you show a `↩` button (or press `r`): type an answer and hit `⌘↵` — the message goes straight to that session via `POST api.devin.ai/v1/session/{id}/message`, and the item is marked handled. This is the only write attnbox ever performs, and only at your explicit action.

## Notifications

The bell toggle enables browser notifications: the moment an agent starts waiting on you, you get a notification that deep-links to the session. Already-handled items never notify.
