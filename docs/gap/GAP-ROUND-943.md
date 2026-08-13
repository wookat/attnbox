# GAP-ROUND-943: 第八十二批竞品扫描（盯防 13/13 全查 + 新进入者扫描）

日期：2026-08-04。round-932（第八十一批）后首次竞品轮。结论先行：**盯防名单 13/13 全查 + claude-dispatcher/switchboard/aside 复核 + 三向新进入者扫描，无 attnbox P0/P1**。三处名单动向入档：AgTower 仓库归档（退出）、AgentBell 官网叙事转向"menu bar companion + 桌面宠物"、konsole-pal PyPI 版本面重置为单一 1.0.0；新进入者 **Rut** 以"Decision inbox + 移动端审批"入盯防（第 14 项）。attnbox 的"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 跨设备同步"差异化不变。

## 一、盯防名单复查（13/13）

| # | 项目 | 本轮动向 | 证据 | 判定 |
|---|------|---------|------|------|
| 1 | yepanywhere | README 仍为"mobile-first supervisor for Claude Code agents"（Claude Code/Codex、推送+审批、tiered inbox、无云账号无数据库）；支持表无 Devin/GitHub review 面 | yepanywhere README | 无三源聚合，观察 |
| 2 | AgentBell | **官网叙事转向**："AI Agent Monitor for Your Mac Menu Bar / Multiple AI Agent workbench"——menu bar companion + 桌面宠物（角色/语音包商店、RSS 陪伴）为主叙事，首页未见此前"Unified Inbox for AI Coding Agents"文案；支持 Claude Code/Cursor/Codex/Windsurf/VS Code/OpenClaw | agentbell.dev | 从决策收件箱向陪伴/监视器偏移，waiting/approve 重叠仍在但收件箱叙事弱化 |
| 3 | AO (Agent Orchestrator) | 架构文档稳定：8 插件槽（Lifecycle 为 core 不可插拔）、状态机 working→pr_open→ci_failed/review_pending/changes_requested/approved→merged | aoagents.dev/docs/architecture（reactions 页本轮两次抓取失败，维持 round-932 结论） | 仍 fleet 编排，非注意力收件箱 |
| 4 | AgentPeek | 能力模型文档细化为四维（Monitoring/In-notch answers/Follow-up prompts/Usage），in-notch 审批覆盖 Claude Code/Codex/Devin 等 19 工具，Devin 已支持 in-notch answers 与 follow-up prompts | agentpeek.app/docs/agents | **Devin 面从 view-only 升级为可交互**——本地 notch 命令中心纵深加强，但仍无 GitHub review 聚合/跨设备 ack，重点观察 |
| 5 | DorkOS | cockpit 叙事不变（Claude Code/Codex/OpenCode 一舱），开源自托管 | dorkos.ai | 编排平台化路线，无三源注意力聚合 |
| 6 | konsole-pal | **PyPI 版本面重置**：今日页面版本历史仅存 1.0.0（上传于 2026-08-04），round-932 记录为 1.0.1——观察证据为当前页仅单版本；"tiny local-first attention router"定位与 7+ agent setup（codex/cursor/claude/gemini/opencode/copilot/aider）不变 | pypi.org/project/konsole-pal | 本地重合最强观察项，仍无云端/GitHub 聚合 |
| 7 | AgTower | **仓库已于 2026-07-22 归档（read-only）**，release 停在 v1.0.9 | github.com/harflabs/AgTower/releases | 退出赛道，下轮起移入已入档区 |
| 8 | AgentBuddy | 仓库描述改为"Native macOS menu bar app and desktop pet"（Claude Code/Codex/Cursor），0 star，无新 lane | github.com/techgocodingnow/agentbuddy | 本地监视器 + 宠物化，观察 |
| 9 | Obvious | My Day 仍 beta（邮件申请制），"agents waiting on you"面向自有 agent 体系 | help.obvious.ai/agents/my-day | 自有体系收件箱，非第三方聚合 |
| 10 | Kindship | changelog 最新条目仍为 2026-05（agent reports 降噪、action badges 聚焦 asks），无收件箱面新动向 | kindship.ai/changelog | 自有 agent 平台收件箱，不聚合第三方 |
| 11 | agent-beacon | macOS menu bar 状态灯叙事不变 | github.com/XiaoLuoLYG/agent-beacon | 状态灯，无聚合面 |
| 12 | jigai | PyPI 仍 v0.1.0 无新版本 | pypi.org/project/jigai | 单机通知通道，观察 |
| 13 | Alook | "Rooms for people and agents"，1,055 stars 与 round-932 持平 | github.com/alookai/alook | 编排/协作平台，非注意力收件箱 |

## 二、既往入档项复核

- **claude-dispatcher**：原具名仓库仍不可得（搜索仅命中 k1e1n04/claude-code-dispatcher——本地 issue→PR 自动化，异物）——404 第三十二轮。
- **switchboard**（tdody/switchboard）：仍活跃——三布局（Kanban/Grid/List）+ NeedsStrip + broadcast + "waiting on you" badge + 浏览器通知 + 会话模板；纯本地 tmux 面，无云端/GitHub 聚合。
- **aside**：无新动向证据，维持 round-690 入档结论。

## 三、新进入者扫描（三向搜索）

- `unified attention inbox` → 首位命中仍为 **attnbox**；agentmail（agent 间消息总线，round-932 已入档）复现。
- `which agent is waiting` → Claude Code 官方 agent view（round-547 已入档；`← N agents` footer 计数文档化细化，仍单工具官方面）。
- `waiting on you` → attnbox 首位；**Rut（tryrut.com，新升盯防）**：'The command center for AI coding agents'——ticket 化工作流（captured/queued/running/waiting for review/done）+ **Decision inbox** + Mac/移动端 approve/reject/redirect + Claude Code/Codex/Gemini/Cursor/OpenCode 多 agent lane。与 attnbox 的重叠在"decision 送到你面前 + 移动端行动"；但其为编排工作台（agent 从 Rut 的 ticket 队列接活），非零侵入读取既有会话的被动聚合，无 Devin 云端/GitHub review 面，无跨设备 ack 台账语义。

**判定：Rut 升盯防（第 14 项，decision-inbox 重叠最高的新进入者）；无直接对手。**

## 四、结论与差异化

- 无 P0/P1；纯文档轮。
- 盯防名单调整：AgTower 归档退出（移入已入档区）、**Rut 新增**——下轮名单仍 13 项全查（yepanywhere/AgentBell/AO/AgentPeek/DorkOS/konsole-pal/AgentBuddy/Obvious/Kindship/agent-beacon/jigai/Alook/Rut）。
- 方法注记：aoagents.dev/docs/configuration/reactions 本轮两次抓取失败（architecture 页正常），非结论依据缺失——lifecycle 证据由 architecture 页覆盖。
- attnbox 差异化（本地三采集器零侵入 + Devin 云端 API + GitHub review-requested 兜底三源聚合、act-in-place 回复、ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者；需持续跟进 AgentPeek 的 Devin in-notch 可交互化与 Rut 的移动端决策收件箱动向。
