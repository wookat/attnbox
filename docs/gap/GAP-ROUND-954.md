# GAP-ROUND-954: 第八十三批竞品扫描（盯防 13/13 全查 + 新进入者扫描）

日期：2026-08-04。round-943（第八十二批）后首次竞品轮。结论先行：**盯防名单 13/13 全查（AgTower 已于 round-943 归档退出、Rut 补位——名单实为 13 项，本轮开场播报"14 项"为口误）+ 既往入档项复核 + 新进入者扫描，无 attnbox P0/P1**。两个新进入者入档（MCP Agent Mail、ProjectDispatcher，均相邻不重叠）；agent-beacon 盯防证据补强（同名双仓分辨）。attnbox 的"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 跨设备同步"差异化不变。

## 一、盯防名单复查（13/13）

| # | 项目 | 本轮动向 | 证据 | 判定 |
|---|------|---------|------|------|
| 1 | yepanywhere | README/官网不变："mobile-first supervisor for Claude Code agents"（Claude Code/Codex、推送+审批、tiered inbox、E2E relay、无云账号无数据库），无 Devin/GitHub review 面 | github.com/mikestaub/yepanywhere | 无三源聚合，观察 |
| 2 | AgentBell | round-943 叙事转向（menu bar companion + 桌面宠物）延续，unified inbox 文案未回归；waiting/approve 重叠仍名单最高 | agentbell.dev | 收件箱叙事持续弱化，观察 |
| 3 | AO (Agent Orchestrator) | 生命周期状态机/插件槽文档稳定，无新 lane | aoagents.dev | 仍 fleet 编排，非注意力收件箱 |
| 4 | AgentPeek | in-notch 可交互面（含 Devin answers + follow-up prompts）维持 round-943 状态，无新动向 | agentpeek.app | 本地 notch 命令中心，无 GitHub review 聚合/跨设备 ack，重点观察 |
| 5 | DorkOS | cockpit（Claude Code/Codex/OpenCode 一舱）+ Tasks/Relay/Mesh 平台化叙事不变 | dorkos.ai | 编排平台化路线，无三源注意力聚合 |
| 6 | konsole-pal | PyPI 仍单一 1.0.0（round-943 版本面重置后无新版本），"tiny local-first attention router"定位不变 | pypi.org/project/konsole-pal | 本地重合最强观察项，仍无云端/GitHub 聚合 |
| 7 | AgentBuddy | "Native macOS menu bar app and desktop pet"描述不变，无新 lane | github.com/techgocodingnow/agentbuddy | 本地监视器 + 宠物化，观察 |
| 8 | Obvious | **My Day 文档细化**：beta 每日起点页——日历 + "items needing a decision" + "places where agents are waiting on you"；To-dos 亦 beta，访问仍邮件申请制（help@obvious.ai） | help.obvious.ai/agents/my-day | "等你决策"语言重叠加深，但仍面向自有 agent 体系，非第三方聚合 |
| 9 | Kindship | **Agent Workspace 文档细化**：Inbox tab（questions/approvals/choices/reports、pending asks 可 tab 内直接行动、resolved 历史、新 ask 自动展开）+ 跨 agent `/home/inbox`（pending 徽章、按 agent/urgency/status 过滤、深链回原 thread）+ Telegram 双向应答 | kindship.ai/docs/agents/agent-workspace | 跨 agent 收件箱 + ask 直接行动概念重叠最深化的一轮，但仅聚合自家 agent，不读第三方会话/Devin/GitHub |
| 10 | agent-beacon | **同名双仓分辨入档**：XiaoLuoLYG/agent-beacon（原盯防对象）为 macOS menu bar 状态灯——done/waiting/failed/running，Codex/Claude Code/Cursor/Gemini CLI + 通用 shim，只显可验证状态、不显示会话正文；另存在 Asymptote-Labs/agent-beacon——OpenTelemetry GenAI 遥测层（本地 JSONL + 只读 dashboard + SIEM 转发），审计/可观测象限非注意力分诊 | 两仓 README | 状态灯无聚合面，观察；Asymptote 仓相邻不重叠，存档 |
| 11 | jigai | PyPI 仍 v0.1.0；README 细化：PTY 包裹 + idle 模式检测的 tool-agnostic 通知（claude/codex/gemini/aider/自定义）、macOS 通知 + LAN 手机推送 + WebSocket，移动 app 计划 v0.2 | pypi.org/project/jigai; github.com/nafistiham/jigai | 本地 waiting 检测重合强但为通知通道（PTY 侵入式），无聚合收件箱/云端/ack，观察 |
| 12 | Alook | 定位细化："self-hosted, local-first platform for managing an organization of AI agents"——agent 角色/邮箱、汇报线、共享记忆、Kanban、日历、常驻 daemon（Claude Code/Codex/OpenCode） | github.com/alookai/alook | agents-as-a-company 编排平台，非被动注意力聚合 |
| 13 | Rut | Decision inbox + Mac/移动端 approve/reject/redirect 工作台叙事维持 round-943 状态，无新动向 | tryrut.com | 编排工作台（ticket 队列接活），非零侵入被动聚合，观察 |

## 二、既往入档项复核

- **switchboard**（HaydnG/switchboard）：仍活跃——Attention Inbox + Focus next + Quick Actions（inbox 内 approve/deny/reply）+ 通知合并节流 + hooks 权威检测 + session health/handoff。Claude-only 桌面指挥中心，纯本地无云端/GitHub 聚合，维持入档。
- **claude-dispatcher**：仍不可得，404 第三十三轮。

## 三、新进入者扫描（三向搜索）

- `unified inbox for coding agents waiting on you` → 首位命中仍为 **attnbox**。
- 新入档两项（均相邻不重叠）：
  - **MCP Agent Mail**（mcpagentmail.com）：agent 间协作基础设施——项目级身份、线程化收件箱、reservation 护栏、SQLite+Git、实时 dashboard + Human Overseer 直接介入。跨项目"人类统一收件箱"语言出现，但为 MCP 协作总线（agent 须接入其协议），非被动读取既有会话的聚合器，无 Devin/GitHub review 面。
  - **ProjectDispatcher**（dbarkman/ProjectDispatcher）：异步 ticket 通信层——跨项目人类统一收件箱、heartbeat 唤醒 agent、人签核列、熔断路由到 Human 列。单人本地编排系统，相邻不重叠。
- `attention inbox` 复扫：命中项均为已入档（switchboard/yepanywhere），无新直接对手。

**判定：无新直接对手；MCP Agent Mail 与 ProjectDispatcher 入档观察。**

## 四、结论与差异化

- 无 P0/P1；纯文档轮。
- 盯防名单维持 13 项不变（yepanywhere/AgentBell/AO/AgentPeek/DorkOS/konsole-pal/AgentBuddy/Obvious/Kindship/agent-beacon/jigai/Alook/Rut）。
- 本轮值得持续跟进的两条线：① **Kindship** 跨 agent `/home/inbox` + ask 直接行动 + Telegram 双向应答——收件箱交互模型与 attnbox 概念重叠最深，但封闭在自家 agent 生态；② **jigai** 的 PTY tool-agnostic waiting 检测 + LAN 手机推送——本地检测面重合，但为侵入式包裹（attnbox 零侵入读日志）且无聚合收件箱。
- attnbox 差异化（本地三采集器零侵入 + Devin 云端 API + GitHub review-requested 兜底三源聚合、act-in-place 回复、ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
