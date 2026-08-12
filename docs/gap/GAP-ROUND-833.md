# GAP-ROUND-833：第七十二批竞品扫描（round-822 后首次）

日期：2026-08-04。主驱动：竞品调研（盯防名单每轮必查 + 新进入者扫描）。纯文档轮，无 P0/P1。

## 盯防名单核查（重点五家）

- **AgentBell 3.0（agentbell.app）**：维持重点盯防，无新动向。官网内容与 round-822 基线一致："One Inbox for every automation decision that needs you"、iPhone 审批、Claude 权限 + Codex 决策 skill（$claude-notify-decision）+ 非生产 release gate、fail-closed、执行回执四段时间线（Human response / Executor claim / 执行 / 结果）。仍无云端会话聚合与行动链接。
- **yepanywhere（kzahel/yepanywhere，★496，round-822 时 ★470）**：维持重点盯防，动能持续。叙事进一步定型为 mobile-first 多 agent 监督：tiered inbox + push notifications + global activity view + mid-turn steering + follow-up queues；Claude Code/Codex 双 provider 全功能（diffs/approvals/streaming），**OpenCode、Grok Build、Claude+Ollama、Gemini、pi 列为 experimental provider**（harness 面首次超出双 harness）；本地 STT/语音输入（ya-whisper/parakeet/nemo，opt-in）；signed macOS + Windows 桌面 beta 继续；Public Relay 主推免配对 E2E 通道，另维护公开竞品追踪文档 docs/competitive/all-projects.md。Android app 仍开发中，iOS planned。仍限本地 harness，无云端会话（Devin 等）聚合。
- **AO（aoagents.dev）**：维持具名盯防。官网看板列命名收敛为 Working / **Needs you** / In Review / Ready to merge（营销页另呈现 Pending Work / Iterating / In Review / Ready to merge 四列 + Archive），"needs you" 语言与我们最同源；主打 delegation（每项目一个 orchestrator agent 派发 worker 到独立 worktree）、CI 失败/review 评论自动路由回属主会话的 feedback loop、25 harness、移动 companion（LAN/Tailscale，"working / need you / mergeable" 计数直达）。定位仍是 fleet 编排 + PR 生命周期，非跨云 attention inbox。
- **AgentPeek（agentpeek.app）**：**升具名盯防**（round-822 为观察候选）。动向显著：支持 agent 数 25+ → 明确列出 26 家（含 **Devin**）；新增 kanban Agent Board（按状态分组"what needs you and what is still working"）；in-notch 权限应答明确覆盖 **Devin**（Devin desktop 会话仍 view-only）；Direct Chat 可向含 Devin 在内的会话直接发 prompt（有 resumable provider ID 时）；usage/限额窗口跟踪覆盖 20+ harness；买断制 $15（限时，原 $19）。这是盯防名单中第一个既监视又能应答 Devin 的产品——但其 Devin 覆盖走本机 app/local data 路径，非云 API 聚合，无 waiting 原因预览/ack/跨设备同步。
- **Axel**：动能放缓。txtx/axel（★21）README 重写后收窄为"portable skills + reproducible tmux workspaces"叙事，审批 inbox 描述退居 GitHub 一句话简介；scarce/axel macOS app 无新推送。维持具名盯防，观察其是否继续投入审批 inbox 面。

## 其余盯防复核

- **Astra（astra.build）**：仍 macOS 私测小批邀请，定位不变（每任务 worktree Space + 单一 inbox + 应用内 PR/merge）。维持具名盯防候选。
- octomux / AgentManager / shariqh/agent-inbox / mission-control：本轮抽查无方向性变化，维持原档位。

## 新进入者

- **DorkOS（dorkos.ai）**：开源 MIT 自托管"mission control"：Claude Code/Codex/OpenCode 一个 cockpit，卖点直接引用我们的核心痛点叙事（"Your agent is stuck waiting for you… spent forty minutes doing nothing"）；含调度器、跨渠道 Relay（agent 可给人/彼此发消息）、手机可操作 console。本地三 harness，无云聚合/ack。**入档观察偏具名盯防候选**（痛点语言同源度名单最高之一）。
- **Rut（tryrut.com）**：macOS "ticket interface for agent-driven development"：ticket/queue/review 状态机 + Agent list + **Decision inbox** + 移动端审批。偏项目管理层，入档观察。
- **ProjectDispatcher（dbarkman）**：ticket 看板 + heartbeat 派发 + Human 列统一 inbox + worktree 自动 merge。入档观察。
- Smoo agent-mail（smoo.ai）与 Naridon agent-relay：agent 间消息总线（含 idle/working/waiting 状态发布），偏 A2A 协作而非人向注意力聚合，存档。

## 结论

- 首位命中仍为 attnbox：本地 CLI（Claude/Codex/Gemini）+ 云端 Devin + GitHub PR 三源聚合、waiting 原因与预览、直达行动链接、ack 跨设备同步的组合仍无直接对手。
- 竞压趋势：①AgentPeek 把 Devin 从"监视"推进到"可应答/可发 prompt"（本机路径），"多 harness 覆盖 + 应答"竞争维度升级；②yepanywhere 以 experimental provider 扩张 harness 面并公开竞品追踪；③新进入者（DorkOS/Rut）继续向"agent 在等你"叙事收敛。均为方向性信号，非现有承诺的缺口。
- 无产品 P0/P1。本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
