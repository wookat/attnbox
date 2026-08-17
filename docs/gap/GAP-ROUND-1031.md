# GAP-ROUND-1031: 第九十批竞品扫描（盯防 14/14 全查 + 新进入者扫描）

日期：2026-08-18。round-1020（第八十九批，2026-08-17）后首次竞品轮。结论先行：**盯防名单 14/14 全查 + Arboretum/Codeman 复核 + 新进入者扫描，无 attnbox P0/P1；一条新进入者入档（DevThrottle Director——Windows 桌面"每个 agent 一块板 + waiting on you"路线，宿主/编排型，非被动三源聚合），Alook 动能上行趋缓（星数 1,136 持平），无重叠直接对手**。

## 一、盯防名单 14/14 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | bohay | 官网维持 "Next-Gen mission control for your AI agents" 叙事：workspaces、agents、编排面 + v0.7 演示可见 | bohay.dev | 无结构性新动向，重点盯防维持 |
| 2 | yepanywhere | npm 权威：latest 仍 0.7.0（2026-07-25T09:56Z 发布），无新版 | registry.npmjs.org/yepanywhere | 无新动向，重点盯防维持 |
| 3 | AgentBell | 官网维持 Mac menu bar AI agent monitor：Cursor/Claude Code/VS Code 活动追踪 + 需注意通知 + 桌面宠物形态 | agentbell.dev | 无结构性新动向，观察维持 |
| 4 | AO (Agent Orchestrator) | 官网主叙事维持 "Stop babysitting agents. Start merging real work."——fleet 运行 + 分支/review/CI 失败管理 | aoagents.dev | 无结构性新动向，盯防维持 |
| 5 | AgentPeek | 官方 llms.txt：版本仍 0.2.83；native macOS、local-first、监控/用量/控制面自述维持（Claude Code/Codex/Cursor/Devin/OpenCode/Copilot CLI/Gemini 等）；定价 $19.99/$34.99/$49.99 一次性 | agentpeek.app/llms.txt | 无新版本，盯防维持 |
| 6 | DorkOS | npm 权威：latest 仍 0.60.0（2026-08-17T00:50Z，本轮日期 2026-08-18 已完全日期内可确证），无新版 | registry.npmjs.org/dorkos | 无新版本，盯防维持 |
| 7 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，无新版 | pypi.org/pypi/konsole-pal/json | 观察维持 |
| 8 | AgentBuddy | GitHub 仓库搜索（agentbuddy in:name）仅见若干同名小仓（star ≤2：JosephusZhou/superproxy/pungggi/mengwoai/pundiranubhav 各家），未能定位既档监控对象的权威仓库，不据此下生命周期结论 | github.com/search（方法注记见下） | 观察维持（沿用 round-1009 既档：macOS menu bar + 桌面宠物） |
| 9 | Obvious | 帮助中心仍以 quickstart/Autobuild/Agents/Workbooks/Projects 平台面为主，无可见新动向 | help.obvious.ai | 观察维持 |
| 10 | Kindship | 文档维持 CLI + agent workspaces + Agencies + agent asks（planning/coding/deployment/communication 等），无新增结构 | kindship.ai/docs | 观察维持 |
| 11 | agent-beacon | npm 元数据仍无可解析 latest 版本 | registry.npmjs.org/agent-beacon | 观察维持 |
| 12 | jigai | PyPI 仍 v0.1.0（releases 单一） | pypi.org/pypi/jigai/json | 观察维持 |
| 13 | Alook | GitHub API：1,136 star / 178 fork（round-1020 为 1,136/177）、最新 push 2026-08-17T06:01Z、archived=false、描述 "Rooms for people and agents." | api.github.com repos（Alook） | 动能上行趋缓（星数持平、fork +1、持续推送）；定位未变，仍无被动三源聚合面，观察维持 |
| 14 | Rut | 官网维持 "The command center for AI coding agents"：Claude Code/Codex/Gemini/Cursor/OpenCode + workspace agents + mobile review + durable tickets + human approval | tryrut.com | 观察维持 |

## 二、相邻项与既往入档复核

- **Arboretum**：渲染后取证维持——多 Claude Code 会话跨 git worktrees 的 mission control：busy/waiting/available 三态、installable PWA + Web Push、"Needs attention" rail 提升待决策 agent、卡片内 commit/push/promote、live terminal 输出 + 全屏接管、并行 worktree agents。仍是 Claude Code worktree 宿主路线，无 Devin 云端/GitHub review/跨设备 ack。观察维持。来源：git-arboretum.com（渲染后内容，静态直取仍为 JS 骨架页）。
- **Codeman**：GitHub API：676 star、最新 push 2026-08-16T23:48Z、archived=false（本轮首次记录星数基线）；官网维持 self-hosted、无遥测、tmux 持久会话宿主 mission control（Claude Code/OpenCode/Codex/Antigravity/Gemini/Pi + shell）、黄 idle/needs-you + 红 waiting-for-answer 指示、手机 QR/推送、Docker 隔离 + 远程 SSH、Node 22 + tmux 依赖。宿主型路线不变。来源：getcodeman.com、api.github.com。
- **claude-dispatcher**：GitHub 仍 404（第四十轮，直查确认）。
- **AgTower**：round-998 已经 GitHub API 确认 archived=true，退出判定维持（本轮搜索结果仍见其遗留页文案 "surfaces agents waiting on you / attention-first queue"，为归档前定位遗留，未据此改判）。

## 三、新进入者扫描

- `AI coding agent "waiting on you" attention inbox unified dashboard` → 首位命中为 attnbox 本尊；前排另见 AgTower 遗留页与 **DevThrottle Director**（新，见下）。
- `"mission control" coding agents dashboard "needs attention"` → 前排命中均为已入档项（Arboretum、Codeman/Ark0N）。
- `unified inbox terminal cloud coding agents approve answer review` → 首位命中仍为 attnbox；前排另见 Warp Agents（终端厂商自带 agent 通知/review 面，平台内生能力，非独立聚合器）与 agent-conductor（tmux supervisor/worker 编排 + 审批门，宿主型），均不构成三源被动聚合重叠。
- **DevThrottle Director（新进入者入档）**：官网一手直读（devthrottle.com、/director）——Windows 桌面应用"Every coding agent on one board"：working/needs you/done 三态板、"waiting on you" 停滞即标记（含 idle 时长）、板内直接键盘/语音应答、Gateway 后台保活、Cockpit 浏览器/手机延伸 + push、支持 Claude Code/Codex/Aider/Gemini 多实例混跑，14 天 Pro 试用付费模式。判定：与 attnbox 在"谁在等你 + 在等什么 + 板内应答"注意力语言上高度同源，但为 Windows 宿主/编排型（agents 跑在其 Gateway 管理之下），无本地日志零侵入被动读取、无 Devin 云端 API、无 GitHub review-requested 兜底、无跨设备 ack 台账。入档为具名观察项。
- 除 DevThrottle 外无新直接对手入档。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单维持 14 项 + Arboretum/Codeman 相邻观察 + 新增 DevThrottle 具名观察。
- 象限信号：DevThrottle/Codeman/Arboretum/bohay/AO/agent-conductor 均为"宿主/编排型"路线（agents 须跑在其管理面之内）；Warp 为终端平台内生通知面；attnbox 被动聚合"注意力模型"（零侵入读取既有会话日志 + 云端 API 轮询 + GitHub review 兜底），象限不重叠。
- attnbox 差异化（本地三采集器**零侵入**读取既有会话 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者。
- 方法注记一：AgentBuddy 本轮以 GitHub 仓库搜索替代直查，仅见同名小仓、未定位既档对象权威仓库；判定沿用既档证据，不据不完全搜索下任何生命周期结论。
- 方法注记二：DuckDuckGo HTML 端点本轮返回 HTTP 202 且解析不出结果标题，为不可用渠道；新进入者扫描以上述三条可解析搜索 + 一手官网直读为准，失败查询不作为"无新进入者"的证据。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
