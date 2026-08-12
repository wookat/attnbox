# GAP-ROUND-789：第六十八批竞品扫描

日期：2026-08-04
驱动维度：竞品调研（round-778 后首次）

## 盯防名单复查

- yepanywhere（kzahel/yepanywhere，重点盯防）：Public Relay 叙事定型——官网/README 均以"end-to-end encrypted public relay, sign in from any browser, no pairing/VPN/port forwarding"为主卖点（SRP-6a + TweetNaCl，MIT 开源 relay），roadmap 提及 remote executors（VM/容器跑 Claude）与通知控制强化。仍以本机 Claude Code 受控会话为中心，无 Devin/云 agent 与 PR 聚合。维持重点盯防。
- Axel（txtx/axel + axel-app）：定位不变——macOS 原生 Things 风格任务收件箱 + Rust CLI，tmux/Ghostty/worktree 编排，SSE 审批收件箱，Automerge+Supabase 同步；新增支持 Antigravity（Google）dispatch。限本机 CLI agent，无云/PR 聚合。维持具名盯防。
- Astra（astra.build）：仍 macOS 私测，"one inbox" + 每 agent 独立 worktree Space 叙事不变。定位不变。
- AgentBell：双线不变——Mac 菜单栏监控（Cursor/Claude Code/VS Code/OpenClaw/Gemini）+ iOS "Code Companion" 审批收件箱（bounded confirm/deny/choice/form）。仍无云聚合。维持具名盯防。
- Grok Build Agent Dashboard：1.0.0 后持续小版本打磨（dashboard 行摘要、审批全文展示、queue 修复），仍限单一 harness。定位不变。
- Acepe（acepe.dev）与 Agent Watch（agent-watch.com）：本轮抓取无有效新内容，定位维持上轮注记（attention queue 本机 ADE / 云 dashboard 远程控制），下轮复核。
- mission-control（builderz-labs）：★5,975 / 官网标 6.0k，平台期持平，operations console 定位不变。
- Agent Cockpit（★29）：无新推送，pixel-art control room + 风险分级审批定位不变，维持入档观察。
- shariqh/agent-inbox（★1，2026-07 新建）：复核确认——"local, cross-project, cross-tool attention inbox"（Copilot CLI + Claude Code，MCP + SQLite + Electron/浏览器 viewer，loopback-only），decision queue/plan board/live sessions 完整落地，v0.1 source-first 未上 npm。注意力收件箱语言最同源，但限本机 MCP 接入两工具、无云 agent/PR/移动面。维持入档观察。
- claude-dispatcher：404 第十八轮，退出结论不变。

## 新进入者

- Solo（soloterm.com）：agent + dev stack 一体工作区，"tells you the moment an agent needs you"、working vs waiting 判定 + 侧栏摘要 + MCP 互通。终端工作区定位（近 ccmux/Steer 系），非跨源收件箱，入档观察。
- ProjectDispatcher（dbarkman）：异步 ticket 看板编排 + 跨项目 unified inbox，人只签核需人判断的节点。编排面产品，非注意力聚合，存档。
- Rut（tryrut.com，前轮已档）：decision inbox 语言不变，无需升级。

## 结论

首位命中仍为 attnbox（"attention inbox" 搜索第一位；本地 CLI + 云 agent + GitHub PR 三源统一）。本轮无颠覆性动向：yepanywhere 维持重点盯防（remote executors roadmap 值得下轮跟进），其余盯防常规演进。无 P0/P1。纯文档轮。
