# GAP-ROUND-987: 第八十六批竞品扫描（盯防 14/14 全查 + 新进入者扫描）

日期：2026-08-04。round-976（第八十五批）后首次竞品轮，bohay 自本轮起正式纳入具名盯防（第 14 项）。结论先行：**盯防名单 14/14 全查 + 新进入者扫描，无 attnbox P0/P1；新入档一项直接相邻进入者 Arboretum（Claude 多 worktree 监督面）**。

## 一、盯防名单 14/14 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | bohay（本轮起具名） | 官网叙事维持："mission control for your AI coding agents"——单一 TUI 看 working / **blocked on you** / finished、收件箱内 inline 应答、`$pane` 委派、SSH 手机窄屏模式、bohay-notch macOS 面板可授权/应答；支持 agent 列表 14 家（Claude Code/Codex/Gemini/Aider/OpenCode/Copilot/Kimi/Qwen/Kiro/Cursor/Amp/Droid/Grok/Pi），"Live status for every one of them, zero setup" | bohay.dev | 与 round-976 入档一致，无结构性新动向；边界仍是"agent 运行在 bohay 的 panes 内"（终端宿主路线），无 Devin 云端 API、无 GitHub review-requested 面、无跨设备 ack 台账，重点盯防 |
| 2 | yepanywhere | npm 权威时间轴：latest 仍 0.7.0（2026-07-25 发布），0.7.0 后无新版 | registry.npmjs.org/yepanywhere | 无新版本；仍限本机自托管 Claude/Codex，重点盯防维持 |
| 3 | AgentBell | 官网维持 "Mac menu bar companion" 叙事：跟踪 Cursor/Claude Code/VS Code 等（列出 Claude Code/Cursor/Codex/OpenClaw/Windsurf/VS Code/Gemini），"notifies you when they need attention"、live agent status、会话记录，另有 OpenClaw 活动面（sub-agents/cron/tool calls 进 menu bar） | agentbell.dev | menu bar 通知伴侣路线，无统一跨源收件箱/云端聚合，观察维持 |
| 4 | AO (Agent Orchestrator) | 官网维持 "Stop babysitting agents" 并行编排：Pending Work/Iterating/In Review/Ready to merge 看板、CI 失败回路由到 owning session、25 harnesses、**新证据：mobile companion（LAN/Tailscale 配对，手机看 fleet、"need you" 计数、开终端、通知）** | aoagents.dev | 编排工作台 + 自有 fleet 的手机监督面；仍是"agents 跑在 AO worktrees 内"的宿主路线，非被动聚合，观察（动向入档） |
| 5 | AgentPeek | 官方 llms.txt：当前版本仍 0.2.83；支持面 26+ agents（含 Devin）；能力边界自述不变（answer 限 permission/question/plan 且需 proven transport；"A visible session does not imply that AgentPeek can answer"） | agentpeek.app/llms.txt | 与 round-976 相同版本，无新动向，盯防维持 |
| 6 | DorkOS | npm 权威时间轴复查：0.57.0（2026-08-03）为日期内可确证最新；0.58.0（2026-08-06）/0.59.0（2026-08-12）时间戳仍晚于本轮日期——registry 时间面异常第三轮持续，维持方法注记，按 0.57.0 记录 | registry.npmjs.org/dorkos | mission control for Claude Code/Codex/OpenCode（自接入三 CLI），无 Devin/GitHub review 面，盯防维持 |
| 7 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，无新版 | pypi.org/pypi/konsole-pal/json | 本地重合最强观察项之一（durable attention inbox + next/ack），无云端/GitHub 聚合，观察维持 |
| 8 | AgentBuddy | 仓库维持：macOS menu bar + 桌面宠物监控（hooks 面列 Claude Code/Codex/Gemini CLI/Cursor/opencode/Windsurf + 通用 wrapper），仍 0 star | github.com/techgocodingnow/agentbuddy | 本机 menu bar/宠物路线，无聚合收件箱，观察维持 |
| 9 | Obvious | 帮助中心仍以 Autobuild/Workbooks/Automations/Agents 平台面为主，My Day/Quick Decisions 无可见新动向 | help.obvious.ai | 自有 agent 体系决策 UX，非第三方聚合，观察维持 |
| 10 | Kindship | 文档维持 Kindship CLI 入口："orchestrating AI coding agents. Make Claude Code, Gemini CLI, Codex, and OpenCode fully autonomous"，无新增页面 | kindship.ai/docs | 收件箱交互仍限自家 agent 体系；CLI 编排属侵入式接管路线，观察维持 |
| 11 | agent-beacon | npm 仍无同名包（`registry.npmjs.org/agent-beacon` 无 dist-tags）；round-954 同名双仓判定维持 | npm registry | 观察维持 |
| 12 | jigai | PyPI 仍 v0.1.0（releases 单一）；官网叙事 "Know when your AI agent is waiting for you"——PTY wrapper（`jigai watch claude`）+ macOS 通知 + 可选 LAN 手机推送 | pypi.org/pypi/jigai/json + 官网 | 侵入式 wrapper 通知通道，无聚合收件箱，观察维持 |
| 13 | Alook | 仓库定位不变："Rooms for people and agents"，self-hosted agents-as-a-company（email/org chart/Kanban/calendar），1,055 star，BYO agent（Claude Code/Codex/OpenCode available） | github.com/alookai/alook | 编排平台，非被动注意力聚合，观察维持 |
| 14 | Rut | 官网叙事维持：ticket interface for agent-driven development——"ready, running, blocked, and waiting for a human decision"、Mac/mobile 上 approve/reject/redirect/add context | tryrut.com | ticket 工作流宿主路线，非零侵入被动聚合，观察维持 |

## 二、既往入档项复核

- **claude-dispatcher**：GitHub 仍 404（第三十六轮）。
- **theagentpm.com**（既往扫描项）：本轮实测为 Porkbun 停放域名（"A Brand New Domain!"），产品面已不可达，按退出/停摆记录。

## 三、新进入者扫描

- `AI coding agent "waiting for you" attention inbox unified dashboard` → 前排命中为已入档项（DorkOS、Pushary）。
- **新入档：Arboretum**（git-arboretum.com）——"Mission control for your AI coding agents"：跨 git worktree 并行运行多个 **Claude Code** 会话，单面板监督；busy/waiting/available 细粒度状态、**Needs attention rail**（等决策的 agent 浮顶）、PWA + Web Push（"get pinged the moment a session needs a decision"）、dashboard 内直接应答 prompt/接管全屏终端、卡片上 commit/push/promote。**属"谁在等你 + 就地应答 + 手机监督"象限的又一本地进入者**，但边界为单一 agent（Claude Code）+ 会话跑在 Arboretum 托管的 worktree 内（宿主路线），无 Devin 云端 API、无 GitHub review-requested 面、无跨设备 ack 台账。入档观察。
- 其余命中（Pushary 手机审批推送等）均为已入档项，无其他新直接对手。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单维持 14 项（bohay 本轮起具名）；Arboretum 入档观察。
- 象限信号：本轮两条动向（AO mobile companion、Arboretum PWA+Push）都指向"宿主型 mission control 补手机监督面"。attnbox 差异化（本地三采集器**零侵入**读取既有会话 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者——对手均为"agent 跑在我这儿"的宿主/编排路线或单通道通知路线。
- 方法注记（维持）：npm registry 出现晚于当前日期的发布时间戳（DorkOS 0.58/0.59）时，不得作为"当轮已验证发布"入档，以日期内可确证版本为准。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
