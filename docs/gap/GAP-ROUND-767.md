# GAP-ROUND-767：第六十六批竞品扫描

日期：2026-08-04
驱动维度：竞品调研（round-756 后首次）

## 盯防名单复查

- Astra（astra.build）：仍 macOS 私测（小批邀请制），"one inbox, seven Spaces" 语言不变；限本机 worktree 编排，无云/Devin 聚合。定位不变，维持具名盯防候选。
- yepanywhere：0.7.0 不变；macOS/Windows 签名桌面安装包已上 GitHub Releases（beta）。仍无云 agent 聚合。
- AgentBell：iOS "Code Companion" 商店文案深化——"unified inbox"+bounded confirm/deny/choice/form 响应+执行回执；Mac 菜单栏线并行。仍无云/Devin 聚合，维持具名盯防。
- Grok Build Agent Dashboard：1.0.0 后增量迭代（dashboard 行显示上轮摘要等 changelog 级更新）；仍限单一 harness（Grok Build 自家会话）。
- Acepe：attention queue 定位不变（answer needed/error/working/planning/finished 排序），仍为本机 ADE，无云聚合。
- mission-control（builderz-labs）：★5,975→6.0k，operations console 定位不变（tasks/spend/governance），非注意力收件箱。
- Agent Watch（agent-watch.com）：云 dashboard 远程控制定位不变（"waiting for input" 告警 + Slack/Teams/Discord/SMS 路由）；跨机聚合本地 CLI agent 但无云 agent（Devin）与 PR 面。
- claude-dispatcher：原盯防仓库 404 第十六轮，确认退出。

## 新进入者

- Axel（scarce/axel + rywalker 分析）：macOS 原生（SwiftUI）+ Rust CLI，"Todoist for AI coding agents"——任务队列 + 统一审批收件箱（SSE inbox），tmux/Ghostty/worktree 编排，Automerge+Supabase 跨设备同步，iOS/visionOS 端。审批收件箱语言同源且移动端布局完整，但以任务编排为主、限本机 CLI agent、无云 agent/PR 聚合。入档观察，下轮复核动向。

## 结论

首位命中仍为 attnbox（本地 CLI + 云 agent + GitHub PR 三源统一注意力收件箱）。差异化不变，无 P0/P1。纯文档轮。
