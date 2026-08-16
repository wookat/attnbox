# GAP-ROUND-976: 第八十五批竞品扫描（盯防 13/13 全查 + 新进入者扫描）

日期：2026-08-04。round-965（第八十四批）后首次竞品轮。结论先行：**盯防名单 13/13 全查 + 新进入者扫描，无 attnbox P0/P1；新入档一项直接相邻进入者 bohay（升盯防候选）**。

## 一、盯防名单 13/13 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | yepanywhere | npm latest 仍 0.7.0（2026-07-25 发布，与 round-965 相同版本）；README 维持 Claude Code + Codex 双 provider、self-hosted、E2E 加密 relay、锁屏应答审批、tiered inbox（Needs Attention/Active/Recent/Unread） | registry.npmjs.org/yepanywhere | 无新版本；仍限本机自托管 Claude/Codex，无 Devin/GitHub review 面，重点盯防维持 |
| 2 | AgentBell | 官网维持 menu bar companion + 桌面宠物叙事（Cursor/Claude Code/VS Code 活动跟踪、Dashboard 专注统计、闲时 RSS 播报、角色/语音包 OTA） | agentbell.dev | 持续宠物化，unified inbox 文案未回归，观察 |
| 3 | AO (Agent Orchestrator) | 官网维持"Stop babysitting agents"并行编排 + Pending Work 队列叙事，brew 安装 | aoagents.dev | 编排工作台，非被动聚合，观察 |
| 4 | AgentPeek | 官方 llms.txt：当前版本 0.2.83；支持 agent 名单扩至 26+（含 Devin）；能力边界自述不变（answer 限 permission/question/plan 且需 proven transport；可见 ≠ 可应答） | agentpeek.app/llms.txt | 本机 notch 监控/应答面持续扩张，仍无云端聚合，盯防维持 |
| 5 | DorkOS | npm 权威时间轴：0.57.0 发布时间 2026-08-03（日期内可确证）；0.58.0（2026-08-06）/0.59.0（2026-08-12）时间戳仍晚于本轮日期——registry 时间面异常持续，维持 round-965 方法注记，按 0.57.0 记录 | registry.npmjs.org/dorkos | mission control for Claude Code/Codex/OpenCode（自接入），无 Devin/GitHub review 面，盯防维持 |
| 6 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，与 round-965 订正一致，无新版 | pypi.org/pypi/konsole-pal/json | 本地重合最强观察项之一，无云端/GitHub 聚合 |
| 7 | AgentBuddy | 仓库维持：macOS menu bar + 桌面宠物监控 Claude Code/Codex/Cursor，0 star，无结构性新动向 | github.com/techgocodingnow/agentbuddy | 观察 |
| 8 | Obvious | 帮助中心以 Autobuild/Workbooks/Automations 等平台面为主，My Day/Quick Decisions 无可见新动向 | help.obvious.ai | 自有 agent 体系决策 UX，非第三方聚合，观察 |
| 9 | Kindship | 文档新增 **Kindship CLI** 入口："Command-line interface for orchestrating AI coding agents. Make Claude Code, Gemini CLI, Codex, and OpenCode fully autonomous"——从自有 agent 平台向第三方 CLI 编排延伸（编排向，非被动聚合） | kindship.ai/docs | 收件箱交互重叠仍限自家 agent 体系；CLI 编排属侵入式接管路线，观察（动向入档） |
| 10 | agent-beacon | npm 无同名包（`registry.npmjs.org/agent-beacon` 无 dist-tags）；round-954 同名双仓判定维持，无新动向 | npm registry + 既往双仓记录 | 观察 |
| 11 | jigai | PyPI 仍 v0.1.0（releases 单一），PTY tool-agnostic waiting 检测 + LAN 手机推送叙事不变 | pypi.org/pypi/jigai/json | 侵入式通知通道，无聚合收件箱，观察 |
| 12 | Alook | 仓库定位不变："Rooms for people and agents"，self-hosted agents-as-a-company（email/org chart/dashboards），1,055 star | github.com/alookai/alook | 编排平台，非被动注意力聚合，观察 |
| 13 | Rut | 官网叙事不变：command center——idea capture → ticket → agent 派发 → 审批 | tryrut.com | ticket 工作流，非零侵入被动聚合，观察 |

## 二、既往入档项复核

- **claude-dispatcher**：GitHub 仍 404（第三十五轮）。

## 三、新进入者扫描（三向搜索）

- `unified inbox for coding agents waiting on you` → 首位命中仍为 **attnbox**。
- **新入档：bohay**（bohay.dev）——终端型 "mission control for your AI coding agents"：单一 TUI 内看哪些 agent working / **blocked on you** / finished，收件箱内 inline 应答 blocked agent、`$pane` 委派指令、resume 各 agent 本地会话（claude/codex/copilot/opencode/kimi/grok/pi）、SSH 手机窄屏模式、bohay-notch macOS 面板可授权/应答。**是迄今与"谁在等你 + 就地应答"重叠最深的本地新进入者**，但其边界为"agent 运行在 bohay 的 panes 内"（终端替代/宿主路线，非零侵入读取既有会话日志），且无 Devin 云端 API、无 GitHub review-requested 面、无跨设备 ack 台账。**升盯防候选，下轮起纳入具名盯防（第 14 项）**。
- 其余命中（MCP Agent Mail、ThinkWork/DailyBot/Surogate/Agently 等自有平台审批收件箱）均为已入档项或"自有 agent 生态 HITL 收件箱"象限，相邻不重叠。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单下轮起为 14 项（新增 bohay）。
- attnbox 差异化（本地三采集器零侵入 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者；bohay 把"blocked on you + inline 应答"做进了终端宿主象限，与 attnbox 的零侵入被动聚合 + 云端面仍分属不同象限，但属需持续紧盯的方向性信号。
- 方法注记（维持）：npm registry 出现晚于当前日期的发布时间戳（DorkOS 0.58/0.59）时，不得作为"当轮已验证发布"入档，以日期内可确证版本为准。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
