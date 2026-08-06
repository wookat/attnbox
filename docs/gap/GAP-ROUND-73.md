# GAP-ROUND-73 — ntfy 黄金路径实测：原始 JSON 推送不可读 → 模板化配方（纯文档）

Round 73. Driver dimension: real testing — the documented webhook
golden path (`ATTNBOX_WEBHOOK_URL=https://ntfy.sh/...`) had never been
exercised against real ntfy.

## Found (P1 for the golden path's first impression)

End-to-end through the real daemon → real ntfy.sh → subscriber:

- Delivery works, but the phone notification body is the **raw JSON
  blob** — unreadable at a glance, which defeats the feature's whole
  point ("know who's waiting from your lock screen").

## Fix (docs recipe, verified end-to-end)

ntfy's message templating (`tpl=yes` + Go templates over the JSON
body) turns the same POST into a readable push with zero extra code:

```
title:   devin is waiting: Fix the login bug
message: Should I use bcrypt or argon2?
```

Edge case found while testing: `item.detail` is absent unless the
collector saw the actual question — a bare `{{.item.detail}}` renders
`<no value>` on ntfy. The documented recipe uses
`{{if .item.detail}}…{{else}}needs your attention{{end}}`, verified
against both a detail-bearing and a detail-less item through the real
daemon.

Kept the webhook payload as generic JSON (the extension-point
contract); rendering belongs to the receiving side.

No package behavior change; no changeset. Site redeploy after merge.
