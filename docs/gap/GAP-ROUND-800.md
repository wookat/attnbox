# GAP-ROUND-800：第六十九批竞品扫描——AO（Agent Orchestrator）入档观察，无新直接对手

日期：2026-08-05
驱动维度：竞品调研（round-789 后首次；重点四家 + 盯防全查 + 新进入者扫描）

## 重点四家

- yepanywhere（★~500，npm 0.7.0 周下载 ~352）：官网叙事继续定型——"complete multi-provider workspace"，明确对标 Claude Code Remote Control / ChatGPT 移动端一方远程能力；Public Relay（E2E 加密、免配对/VPN/端口转发）维持主打；新增 remote device control（Android/Apple Simulator WebRTC 流）；Android app in development、iOS planned。仍限本机 CLI 会话（Claude+Codex），无云 agent（Devin）聚合。维持重点盯防。
- Axel：双仓格局清晰化（scarce/axel 原生 macOS SwiftUI app + txtx/axel Rust CLI）；卖点 "Todoist for AI coding agents"——任务队列 + 统一审批收件箱 + auto-approve 规则 + Automerge CRDT+Supabase 跨设备同步；支持 Claude/Codex/OpenCode/Antigravity。仍限本机 tmux/Ghostty 编排，无云聚合。维持具名盯防。
- Astra：仍 macOS 私测（"invite in small batches"），"one inbox, seven Spaces" worktree 编排叙事不变。维持具名盯防候选。
- AgentBell：双线不变（agentbell.dev 菜单栏监控 + MWM iOS "AgentBell: Code Companion" 审批收件箱——bounded confirm/deny/choice/form、执行回执、Live Activities、30 天本地历史）。仍无云聚合。维持具名盯防。

## 其余盯防

- Grok Build：1.0.0 后 changelog 为 dashboard 打磨（行摘要、权限完整脚本展示等），仍限单一 harness。
- mission-control ★6.0k 平台期、Agent Cockpit 无新推送、shariqh/agent-inbox 无 lane 变化、Solo 无新动向。
- claude-dispatcher：原仓 404 第十九轮，确认退出。

## 新进入者

- AO（Agent Orchestrator，aoagents.dev）：fleet 编排 + 单一看板（working / needs you / in review / ready to merge）+ CI 失败回路 + 移动 app（LAN/Tailscale 配对，执行与代码留本机）；号称支持 25 harness（Claude Code/Codex/Cursor/OpenCode/Aider/Goose 等）。"needs you" 语言与移动监督重合较强，但定位是编排控制面（自动 dispatch + PR 生命周期），非零侵入注意力收件箱，且无云 agent（Devin）聚合。入档观察，偏具名盯防候选。
- Notis（getnotis.xyz）：人与 agent 的消息层（Telegram/Slack 式统一 inbox+群组），非状态聚合收件箱，存档。

## 结论

三向搜索（"attention inbox AI coding agents" 等）首位命中仍为 attnbox。零侵入 + 本地/云双源聚合 + 隐私优先差异化不变。无 P0/P1，纯文档轮。
