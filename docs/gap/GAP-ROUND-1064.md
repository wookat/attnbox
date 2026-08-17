# GAP-ROUND-1064：第九十三批竞品扫描（盯防 14 项全查 + 新进入者扫描）

日期：2026-08-04（UTC）  
基线：main @ 2147490（PR #1098 合并后，99 测试绿）  
上一次竞品轮：ROUND-1053（PR #1088）

## 结论（先说重点）

1. **无 P0/P1，无新直接对手。** 三源被动聚合差异化（本地 Claude/Codex/Gemini 被动读取 + Devin 云端 + GitHub review-requested 兜底 + 等待原因/预览 + 跨设备 ack + 常驻收件箱/PWA 的组合）在本轮一手证据中仍无任何单一产品同时覆盖。
2. **新进入者 tmux-agents-inbox 入档（本轮要点）**：ctretyak/tmux-agents-inbox（2026-05-27 创建、0★）——tmux 插件形态的 "which Claude Code agents are waiting on you" 收件箱：hooks 权威状态（Notification → waiting、Stop → done）+ 被动进程树发现既有 `claude` 会话 + 状态行计数 + popup 分组列表 + 一键跳转下一个 waiting。注意力语言与 attnbox 高度同源且同为"被动读取既有会话"象限，但为 Claude Code 单源、tmux 单机、无云端/Devin/GitHub 兜底/跨设备 ack/预览详情，象限不重叠，升具名观察。
3. **DorkOS 0.60.0 后再无新发布**（registry JSON `dist-tags.latest = 0.60.0`，time 无新条目）；claude-dispatcher 稳定 v3.2.3 / 11★ 无变化。

## 盯防名单 14/14 全查（一手证据）

| 项目 | 本轮一手证据 | 变化判定 |
| --- | --- | --- |
| bohay | bohay.dev title/desc："mission control for your AI coding agents…run, watch, resume, and orchestrate Claude Code, Codex, Copilot, opencode…"；GitHub HTML RizRiyz/bohay 36★（上轮 35★） | 宿主/编排型不变，星数 +1 |
| yepanywhere | registry JSON：latest 0.7.0（2026-07-25 发布，与既档一致，无新版本） | 无变化（Claude Code 单源移动监督） |
| AgentBell | agentbell.dev title/desc："AI Agent Monitor for Your Mac Menu Bar…Cursor, Claude Code & VS Code…notifies you when they need attention" | 无结构性变化（macOS 菜单栏监控） |
| AO | aoagents.dev title/desc："Run Coding Agents in Parallel…fleet…branches, reviews, or CI failures" | 无变化（并行 fleet 编排型） |
| AgentPeek | agentpeek.app/llms.txt：0.2.83（与既档一致） | 无变化 |
| DorkOS | registry JSON：`dist-tags.latest = 0.60.0`（2026-08-17 发布），此后 time 无新条目 | 无新发布 |
| konsole-pal | PyPI JSON：1.0.1，releases {1.0.0, 1.0.1}（与既档一致） | 无变化 |
| AgentBuddy | GitHub 仓库搜索（HTML）：仅见 JosephusZhou/superproxy/ravisarma1618 等同名小仓，权威主仓仍未定位 | 沿用既档（不作缺席证据） |
| Obvious | obvious.ai title/desc："The AI Agent That Builds With You…documents, sheets, slides…" | 无变化（通用 outcome agent，非收件箱） |
| Kindship | kindship.ai title/desc："Autonomous AI Agents For Any Mission" | 无变化 |
| agent-beacon | npm registry：Not found（404） | 无变化（npm 无此包，仅证明包名缺失） |
| jigai | PyPI JSON：0.1.0（与既档一致） | 无变化 |
| Alook | GitHub HTML alookai/alook：1,144★（与 round-1053 持平），repo meta created 2026-04-03 org-owned | 动能持平 |
| Rut | tryrut.com title/desc："command center for AI coding agents…Claude Code, Codex, Gemini, Cursor, OpenCode…ticket-driven workspace…approve changes from Mac or mobile" | 宿主/工作流型不变 |

## 邻接复核（5 项）

- **claude-dispatcher**：GitHub HTML Innovology/claude-dispatcher 200 可达，11★、tags 含 v3.2.3/v3.1.2（与 round-1053 一致）。宿主型 tmux cockpit 判定维持。
- **portagent**：GitHub HTML mrizzben/portagent 200 可达、0★（与既档一致）。本地单机 TUI 判定维持。
- **Arboretum**：git-arboretum.com desc："local-first daemon…npx…web IDE to run and supervise many Claude Code sessions across git worktrees"。宿主型 + Claude 单源判定维持。
- **Codeman**：GitHub HTML Ark0N/Codeman 676★（与 round-1042 基线持平）。宿主型不变。
- **DevThrottle Director**：devthrottle.com title/desc维持 "Run every coding agent in parallel, on Windows…pings you the second any agent needs you"。宿主/编排型判定维持。

## 新进入者扫描

- GitHub 仓库搜索 `"attention inbox" coding agents`（HTML，按更新排序）：首位命中仍为 **attnbox**，其次 shariqh/agent-inbox（1★，既档）、AnkushinDaniil/grove（既档 round-657）。
- GitHub 仓库搜索 `"waiting on you" coding agents inbox`：命中 attnbox 与 **ctretyak/tmux-agents-inbox**（本轮要点，见结论 2）。
  - README 一手直读：hooks 权威状态映射（SessionStart→idle、UserPromptSubmit/PreToolUse/PostToolUse→working、Notification→waiting、Stop→done/background、SessionEnd→移除）、进程树被动发现既有会话（含 hooks 安装前已启动会话）、`prefix+g` popup 分组（Needs input/Completed/Background/Working）+ `prefix+N` 跳下一个 waiting。
  - 判定：与 attnbox 同为"被动读取 + hooks 权威 + waiting 分诊"语义，但 Claude Code 单源、tmux 单机内跳转（无 web/移动端/云端聚合/Devin/GitHub 兜底/跨设备 ack/waiting 详情预览）。升具名观察，后续盯其是否长出多源/多机面。

## 方法注记

- GitHub REST API 本轮对本机 IP 限流（rate limit exceeded），全部仓库证据改经 GitHub HTML 页面与仓库搜索 HTML 取得；限流不作任何"项目不存在/无变化"的证据。
- npm/PyPI 版本证据以 registry JSON（`dist-tags.latest` + `time` / releases）为准，沿用 round-1053 方法注记。
- 本轮一手响应留存于本机 `~/a11y/comp1064/`（不入库）。

## 收敛

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单调整：新增 tmux-agents-inbox 具名观察；其余名单与判定维持。
- attnbox 差异化（本地三采集器零侵入读取 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、常驻移动端 PWA 收件箱、诚实边界文档）在本轮所有对手一手证据下仍无重叠者。
