# GAP-ROUND-1042: 第九十一批竞品扫描（盯防 14/14 全查 + 新进入者扫描）

日期：2026-08-04（UTC）。round-1031（第九十批）后首次竞品轮。结论先行：**盯防名单 14/14 全查 + Arboretum/Codeman/DevThrottle Director 复核 + 新进入者扫描，无 attnbox P0/P1；两条要点入档：① claude-dispatcher 仓库复活（连续 41 轮 404 后 200 可达，v3.2.3 tmux 舰队 cockpit，宿主型）；② 新进入者 portagent（被动读转录 + 手机 SSH TUI + tmux 应答，象限最接近但本地单机 TUI、无云端/兜底/ack），无重叠直接对手**。

## 一、盯防名单 14/14 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | bohay | 官网 title/description："mission control for your AI coding agents——Run, watch, resume, and orchestrate Claude Code, Codex, Copilot, opencode and more from one terminal, with a live view of every agent" | bohay.dev | 无结构性新动向，重点盯防维持 |
| 2 | yepanywhere | npm 权威：latest 仍 0.7.0（2026-07-25T09:56Z 发布），无新版 | registry.npmjs.org/yepanywhere | 无新动向，重点盯防维持 |
| 3 | AgentBell | 官网维持 Mac menu bar AI agent monitor：Cursor/Claude Code/VS Code 活动追踪 + 需注意通知 | agentbell.dev | 无结构性新动向，观察维持 |
| 4 | AO (Agent Orchestrator) | 官网 title/description："Run Coding Agents in Parallel——Run a fleet of coding agents without losing track of branches, reviews, or CI failures. Free and open source under Apache 2.0" | aoagents.dev | 无结构性新动向，盯防维持 |
| 5 | AgentPeek | 官方 llms.txt：版本仍 0.2.83（August 5 2026 条目：Cursor Direct Chat 走 ACP native questions/plan approvals）；官网 description 维持 Mac notch/menu bar 监控 + 回答 prompts + 用量 + 本地 dev server 管理 | agentpeek.app、agentpeek.app/llms.txt | 无新版本，盯防维持 |
| 6 | DorkOS | npm 权威：latest 仍 0.60.0（2026-08-17T00:50Z），无新版 | registry.npmjs.org/dorkos | 无新版本，盯防维持 |
| 7 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，无新版 | pypi.org/pypi/konsole-pal/json | 观察维持 |
| 8 | AgentBuddy | GitHub 仓库搜索仅见同名小仓（star ≤4：spankyed/AgentBuddy-releases、JosephusZhou、superproxy 等），仍未能定位既档监控对象权威仓库 | github.com/search（方法注记见下） | 观察维持（沿用既档） |
| 9 | Obvious | 官网 title/description："The AI Agent That Builds With You——Documents, sheets, slides, dashboards, and apps, all in one workspace"，无 agent 注意力面新动向 | obvious.ai | 观察维持 |
| 10 | Kindship | 官网 title/description："Autonomous AI Agents For Any Mission"，无新增结构 | kindship.ai | 观察维持 |
| 11 | agent-beacon | npm 元数据仍无可解析 latest 版本 | registry.npmjs.org/agent-beacon | 观察维持 |
| 12 | jigai | PyPI 仍 v0.1.0（releases 单一） | pypi.org/pypi/jigai/json | 观察维持 |
| 13 | Alook | GitHub search API：1,139 star / 178 fork（round-1031 为 1,136/178）、最新 push 2026-08-17T07:42Z、描述 "Rooms for people and agents." | api.github.com/search（Alook） | 动能温和（+3 star、fork 持平、持续推送）；定位未变，仍无被动三源聚合面，观察维持 |
| 14 | Rut | 官网维持 "The command center for AI coding agents" | tryrut.com | 观察维持 |

## 二、相邻项与既往入档复核

- **Arboretum**：官网 title 维持 "Mission control for your AI coding agents"，Claude Code worktree 宿主路线不变。观察维持。来源：git-arboretum.com。
- **Codeman**：GitHub search API：676 star / 90 fork（星数与 round-1031 基线持平）、最新 push 2026-08-16T23:48Z、archived=false，描述扩展至 "run Claude Code, OpenCode, Pi, Codex, and Antigravity & Gemini CLI 24/7, from any device, watch every subagent live"。宿主型路线不变。来源：api.github.com/search。
- **DevThrottle Director**：官网 title/description 维持 "Run every coding agent in parallel, on Windows——pings you the second any agent needs you"。宿主/编排型判定维持。来源：devthrottle.com。
- **claude-dispatcher（复活，本轮要点①）**：连续 41 轮 404 后本轮 GitHub 页面 200 可达——README 一手直读：定位 "terminal cockpit for running a factory of Claude Code sessions across all your repos"，triage lens 直答 "what is blocked, claims done, or waiting on me right now?"；每个 dispatcher 是其自管 tmux 里的真实 `claude` 会话；六 lens 键盘操控 + git/gh/Linear/Azure Boards 数据面；页面暴露 v3.2.3 与 11 star。判定：注意力语言（blocked waiting on you）同源，但为宿主/编排型（会话跑在其 tmux 管理面之内）且仅 Claude Code 单 runtime，无零侵入被动读取既有会话、无 Devin 云端、无 GitHub review-requested 兜底、无跨设备 ack。恢复具名盯防（生命周期注记：曾 404 四十一轮后复活，历史退出判定按新证据修正）。来源：github.com/Innovology/claude-dispatcher。
- **AgTower**：archived=true 既档判定维持，本轮未见相反证据。

## 三、新进入者扫描

- GitHub search `agent attention inbox` → 首位命中为 attnbox 本尊；前排为已入档项（shariqh/agent-inbox、AEP mission-control、pulse-protocol、grove）。
- GitHub search `"waiting on you" coding agent` → 首位命中为 attnbox 本尊；前排已入档项（trail-boss、agentfleet、jind-ai、claude-notify、decaf）之外见两个新条目（见下）。
- npm search `coding agent inbox waiting` → 前排命中 attnbox/attnbox-collectors 本尊，无新聚合器包。
- **portagent（新进入者入档，本轮要点②）**：mrizzben/portagent（created 2026-08-15、0 star）——"phone-sized terminal UI that watches any coding agents"：**从会话转录被动读取**（最后 tool call/消息、运行时长、CPU），状态点区分 running/idle-waiting/error/finished，tmux 内 agent 可按 `i` 直接应答，面向手机 SSH（Termius/Blink）值守场景。判定：被动读取 + waiting 浮出 + 应答，为迄今象限最接近的新进入者；但为本地单机 TUI（须 SSH 进那台机器）、无云端 Devin/GitHub review 兜底、无跨设备 ack 台账、无常驻移动端 PWA 收件箱。0 star 早期项目，入档具名观察。来源：github.com/mrizzben/portagent README。
- **terminaldeck（存档）**：asadev/terminaldeck（created 2026-08-13、0 star、自述 alpha）——桌面工作台"run several Claude Code, Codex or Gemini sessions side by side, see which are waiting on you, know what they cost"。宿主型工作台路线，存档不升盯防。来源：github.com/asadev/terminaldeck README。
- 除上述外无新直接对手入档。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单调整：claude-dispatcher 复活恢复具名盯防；portagent 新增具名观察；terminaldeck 存档。
- 象限信号：claude-dispatcher/terminaldeck/DevThrottle/Codeman/Arboretum/bohay/AO 均为"宿主/编排型"路线；portagent 首次出现"被动读转录 + 应答"的同象限尝试，但为本地单机 TUI，无云端聚合与跨设备面。
- attnbox 差异化（本地三采集器**零侵入**读取既有会话 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、常驻移动端 PWA 收件箱、诚实边界文档）在本轮所有对手证据下仍无重叠者；portagent 值得后续持续盯防其是否长出多机/云端面。
- 方法注记一：GitHub repos API 本轮对本机 IP 限流（403 rate limit），星数/推送数据改经 GitHub search API 取得；两渠道字段一致性未逐项交叉验证，数值以 search API 当刻快照为准。
- 方法注记二：AgentBuddy 仍以仓库搜索替代直查，仅见同名小仓；沿用既档，不据不完全搜索下生命周期结论。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
