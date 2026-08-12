# GAP-ROUND-811：第七十批竞品扫描

日期：2026-08-04
驱动维度：竞品调研（round-800 后首次）

## 盯防名单复查（每轮必查）

- **yepanywhere（★498，维持重点盯防）**：叙事稳定为 "All your coding agents on every device"——Claude+Codex 双 provider、mobile approvals、E2E 加密 Public Relay、remote device control（Android 模拟器 WebRTC 串流）；Android app 仍 in development、iOS planned。本地面强，仍无云 agent（Devin 类）/PR review 聚合。
- **AO / Agent Orchestrator（aoagents.dev，升具名盯防）**：官网叙事定型——"working / needs you / in review / ready to merge" 单看板 + 25 harness + 移动 companion（LAN/Tailscale）+ CI 失败/评论回路。"needs you" 语言与我们最同源；但定位是 fleet 编排（自己 spawn/管理 worker），非跨来源 attention 聚合。
- **Axel**：双仓格局不变（txtx/axel Rust CLI + scarce/axel ★206 macOS 原生 app，"Todoist for AI coding agents"，审批收件箱 + Automerge/Supabase 同步）；scarce/axel 自 4 月后无推送，动能放缓。
- **Astra**：仍 macOS 私测（Spaces=worktree 隔离 + 单 inbox 分诊 + agent-drafted PR），无公开发布。
- **AgentBell**：双线不变（agentbell.dev 菜单栏 companion/宠物化 + npm agent-bell 音频 hooks），无云聚合。
- **Grok Build**：仍限单一 harness。mission-control（★6.0k 平台期）、Agent Cockpit、shariqh/agent-inbox（★1，仍限本机 MCP）、Solo、Acepe、Agent Watch：无实质变化。
- **claude-dispatcher**：404 第二十轮确认退出。

## 新进入者扫描

- **octomux（ShreyPaharia，★21，活跃）**：本地 dashboard——Claude/Cursor 并行 + 单一 permission inbox + kanban + in-app diff review + 手机页。入档观察（本地面重合，无云/PR 聚合）。
- **Codeman（getcodeman.com）**：tmux 持久会话 + tab 黄闪 idle/红闪 waiting + 手机 QR 登录/推送。入档观察。
- **Orbit（orbit-app.dev）**：AppKit 原生 canvas 跑 Claude/Codex fleet + 菜单栏状态。存档。
- **Clave（codika-io，★45）**：macOS 多会话管理器。存档。
- **agent-dash（Prajeevan，★0）**：Cloudflare 自托管 push+ask-and-wait inbox——"agents ask you questions; you answer on your phone"，语言同源但为 agent 主动上报协议，非采集聚合。存档观察。
- 菜单栏/指示灯长尾（Pulse、AgentLights、agent-bar 等）：均单机提示，不构成直接对手。

## 结论

首位命中仍为 attnbox（本地 CLI + 云 agent + GitHub PR 三源聚合 + ack 跨设备同步）。"needs you" 赛道继续升温（AO、Codeman、octomux），但跨来源云聚合差异化不变。无 P0/P1，纯文档轮。
