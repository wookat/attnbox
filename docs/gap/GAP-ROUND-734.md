# GAP-ROUND-734：第六十三批竞品扫描——Acepe 升具名盯防，无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-723 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- yepanywhere（kzahel，470★）：持续高频发版（claude-agent-sdk 0.2.111 + Opus 4.7、lifecycle webhook、Windows 会话修复、i18n 六语言）；tiered inbox（Needs Attention → Active → Recent → Unread）+ push 锁屏审批 + E2E relay 定位不变；Android 原生 app 开发中（多服务器 inbox）。仍无云 agent（Devin）聚合。维持具名盯防候选偏具名。
- mission-control（builderz-labs，★6.0k）：控制面定位不变（"self-hosted control plane"），mc-cli v2 agent-complete operations（NDJSON/SSE/profile），治理面（Aegis quality gate、审批、审计）持续加深——运营/治理象限，非注意力收件箱。
- AgentBell：双线延续；新增 MWM 应用商店上架条目，宣传"unified inbox"人审界面（verified source/action/target/risk/deadline 逐项审批）——本地审批收件箱语言首次出现在其商店文案，需下轮复核实际产品面。仍无云聚合。
- Agent Watch（agent-watch.com）：重定位为 "Remote Control Your AI Coding Agents from One Dashboard"（Claude/Codex/Gemini 三 runtime 上报云 dashboard + Slack/Teams/Discord/SMS 告警 + "stuck waiting" 即时提醒）——从监控转远程控制，托管遥测路线与我们隐私优先相反，维持具名盯防。
- claude-dispatcher：404 第十三轮。
- switchboard/agent-inbox/ccmux/kookr/coslash/herdr 系：无新动向信号。

## 新进入者

- Acepe（acepe.dev / flazouh/acepe）：macOS 原生 "Agentic Developer Environment"，2026-02-20 博文专文推出 "Attention Queue"（Input Needed / Error / Working / Planning / Needs Review / Complete 按紧迫度自动排序，收件箱内直答 agent 提问选项）——注意力队列语言与我们 round-1 定位高度同源；桌面免费，付费路线含 cloud agents / mobile app / session sync。本地 ACP 桌面象限（Claude/Codex/Cursor/OpenCode），无云 agent（Devin）聚合、无 PWA/自托管 web。升具名盯防。
- AgentPing / agent-watch.dev（AgentWatch）：生产 LLM 观测/预算治理象限，不重合，存档。

## 结论

三向搜索首位命中仍为 attnbox；核心差异化（本地+云统一聚合、Devin act-in-place、隐私优先自托管、mobile-first PWA）无直接对手。无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
