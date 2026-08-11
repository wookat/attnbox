# GAP-ROUND-778：第六十七批竞品扫描

日期：2026-08-04
驱动维度：竞品调研（round-767 后首次）

## 盯防名单复查

- Axel（txtx/axel-app + txtx/axel，rywalker/aat.ee 分析）：定位不变——macOS 原生（SwiftUI）+ Rust CLI"Todoist for AI coding agents"，任务队列 + 统一审批收件箱（SSE inbox），tmux/Ghostty/worktree 编排，Automerge+Supabase 跨设备同步，iOS/visionOS 端；支持 Claude/Codex/OpenCode/Antigravity 等本机 agent。仍以任务编排为主、限本机 CLI agent，无云 agent/PR 聚合。维持具名盯防。
- Astra（astra.build）：仍 macOS 私测，"one inbox" + 每 agent 独立 git-worktree Space、live diffs、一键 ship 语言不变；限本机编排，无云/Devin 聚合。定位不变。
- yepanywhere（kzahel/yepanywhere，★498）：**重要动向**——官方上线 Public Relay（relay.yepanywhere.com）：手机/平板经加密 relay 远程监督本机 Claude Code/Codex，含推送通知、审批、diff、流式输出、文件上传（docs/project/remote-access.md 入档）。旧注记"桌面 beta、无远程"已过时。仍以本机受控会话为中心，无 Devin/云 agent 与 PR 聚合，但远程/移动监督面与 attnbox 重合度上升，升为重点盯防。
- AgentBell：双线确认——agentbell.dev Mac 菜单栏"AI Agent Monitor"扩至 Cursor/Claude Code/VS Code/OpenClaw/Gemini 多工具状态告警（idle/run/wait/done/error + 语音通知）；iOS "Code Companion" 商店文案维持 unified inbox + bounded confirm/deny/choice/form + 执行回执 + 30 天审批史。仍无云/Devin 聚合，维持具名盯防。
- Grok Build Agent Dashboard（docs.x.ai/build/features/dashboard）：dashboard 持续迭代（Needs input/Working/Idle/Completed 分组、inline 审批回复、目录分组、pin/rename、queue 消息），仍限单一 harness（Grok Build 自家会话）。
- Acepe（acepe.dev 200）：attention queue 定位不变，本机 ADE，无云聚合。
- mission-control（builderz-labs）：★5,975→6.0k 平台期（7 天 +47），operations console 定位不变，非注意力收件箱。
- Agent Watch（agent-watch.com 200）：云 dashboard 远程控制定位不变；跨机聚合本地 CLI agent 但无云 agent（Devin）与 PR 面。
- claude-dispatcher：原盯防仓库 404 第十七轮，退出结论不变。

## 新进入者

- Agent Cockpit（agent-cockpit.dev + GitHub org，★29，最后推送 2026-06）：本地优先"control room"——多 Claude Code/Codex 会话统一审批收件箱 + 风险分级 + 时间线/工具调用/inline diff/回放，Node 22 + SQLite 本地 daemon + 浏览器控制面。审批收件箱语言同源但限本机 agent 编排，无云/PR 聚合，且近两月无推送。入档观察。
- shariqh/agent-inbox（★1，2026-07 新建，活跃推送）："local, cross-project, cross-tool attention inbox for coding agents"（MCP + SQLite + viewer）——注意力收件箱语言最直接同源的新苗子，规模极小，入档观察下轮复核。
- shabadoo（alexj212，★1）：多机 Claude Code 自托管控制面（one dashboard across every machine），限单一工具，存档。

## 结论

首位命中仍为 attnbox（本地 CLI + 云 agent + GitHub PR 三源统一注意力收件箱）。最大动向为 yepanywhere Public Relay 落地远程/移动监督（升重点盯防），但其无跨源云 agent/PR 聚合，差异化边界不变。无 P0/P1。纯文档轮。
