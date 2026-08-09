# GAP-ROUND-318 — 竞品第二十五批扫描（纯文档）

Round 318. Driver dimension: competitor research — full
watchlist check plus new-entrant sweep, first since round-307.

## Watchlist (all checked)

- **claude-dispatcher** (Innovology) — 仍是动作最大的本地对手：
  Cockpit v3 收尾后继续快跑——repo→产品指派进驾驶舱（#21）、
  用量按模型族拆分（#22）、README 换 fixture 渲染截图（#20）。
  仍 Claude-only tmux 驾驶舱，无云端聚合。
- **ccmux** — v1.3.0（2026-08-08 正式发布）后进入文档打磨窗口
  （README tagline 刷新、relay skill 触发语扩宽）。
- **kookr** — 迭代速度依旧极高（单日 5+ merges）：pipeline
  starvation 计数入 status、协作 poller 拒绝云元数据/链路本地
  peer URL（SSRF 面持续硬化）。仍无云端 agent 聚合。
- **herdr 系** — herdr v0.8.0；kelpie 桌面 app 打磨（thinking-level
  图标、品牌 focus ring）；herdr-island 无新动作。
- **coslash** — v0.0.1 README 后小步修 commit 检测边界，仍本地。
- **agentfleet** (beknazar) — 持续真实化：“Report what a machine
  is actually doing, not what a timer implies”——远程多机 fleet
  面最接近者，但仍无本地 CLI 采集与云 vendor 状态透传。
- **trail-boss** — 已定位到 jedarden/trail-boss（具名盯防修正：
  非 dhamidi）：systemd 用户服务 ADR 落地、daemon 不可达与空队
  列区分——“single-pane attention router” daemon 语言同道，仍
  单机本地。
- **claude-notify / waiting-on-me / streamdeck-agents /
  pulse-protocol / tmux-agentwatch / jind-ai** — 无重大新动向。

## New entrants (created since 2026-07-28)

- **oleg-vasilyev/claude-notify** — “Telegram pings … when the
  agent is waiting on you — but only once you have actually
  stepped away”：presence-aware 通知的又一野生实现（我们
  round-98 P2 观察项语言完全同源）。Claude-only 单 runtime，
  不重合聚合核心——存档不盯防。
- **agent-lights-communication** — agent fleet 状态映射到 PC
  RGB 灯（ambient 外设面，streamdeck-agents 象限）——存档。

三向扫描（"waiting on you"/attention inbox/agent triage）其余
均为无关或单框架仓。waiting-on-you 语言继续扩散，本地+云统一
收件箱与零侵入发现的差异化不变。

## Verdict

无 P0/P1；纯文档，无 changeset。
