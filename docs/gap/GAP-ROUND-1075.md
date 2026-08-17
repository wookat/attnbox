# GAP-ROUND-1075：第九十四批竞品扫描（盯防 14 项全查 + 新进入者扫描）

日期：2026-08-04（UTC）  
基线：main @ 10baa9a（PR #1109 合并后，99 测试绿）  
上一次竞品轮：ROUND-1064（PR #1099）

## 结论（先说重点）

1. **无 P0/P1，无新直接对手。** 三源被动聚合差异化（本地 Claude/Codex/Gemini 被动读取 + Devin 云端 + GitHub review-requested 兜底 + 等待原因/预览 + 跨设备 ack + 常驻收件箱/PWA 的组合）在本轮一手证据中仍无任何单一产品同时覆盖。
2. **AgentBuddy 权威仓终于定位（本轮要点，收口既档悬案）**：仓库搜索命中 spankyed/AgentBuddy-releases（4★，公开 releases 仓）。README 一手直读："A local-first desktop app for building and running AI agent workflows using an actor-based architecture"，macOS/Windows 安装包分发，可通过 spankyed/default-setup 定制 actions/prompts/flows。判定：**工作流构建器型**（workflow builder），非注意力收件箱，无 waiting 分诊/聚合语义，与 attnbox 无重叠。自 round-877 入档以来的"权威仓未定位"注记就此收口。
3. **DorkOS 发布 0.61.0**（registry JSON `dist-tags.latest = 0.61.0`，time 2026-08-17T13:12Z，即 0.60.0 后同日再发）。新 description："You, multiplied. Mission control for Claude Code, Codex, and OpenCode: see every session, approve what your agents do, and run them on a schedule. Self-hosted, MIT."——叙事从平台化收敛回 mission control + 审批 + 调度三件套，新增 OpenCode 纳管与 schedule 语义。仍为宿主/编排型（自己起会话、自己审批），非被动读取既有会话的聚合收件箱，象限不变但为盯防名单中动能最强者，维持重点盯防。

## 盯防名单 14/14 全查（一手证据）

| 项目 | 本轮一手证据 | 变化判定 |
| --- | --- | --- |
| bohay | bohay.dev title/desc 不变（"mission control…run, watch, resume, and orchestrate"）；GitHub HTML RizRiyz/bohay 36★（持平） | 无变化（宿主/编排型） |
| yepanywhere | registry JSON：latest 0.7.0（2026-07-25），无新版本 | 无变化 |
| AgentBell | agentbell.dev title/desc 不变（Mac 菜单栏监控 Cursor/Claude Code/VS Code） | 无变化 |
| AO | aoagents.dev title/desc 不变（并行 fleet 编排） | 无变化 |
| AgentPeek | agentpeek.app/llms.txt：0.2.83（与既档一致） | 无变化 |
| DorkOS | registry JSON：latest 0.61.0（2026-08-17T13:12Z 发布，0.60.0 后同日再发），desc 改版见结论 3 | **新发布 + 叙事收敛**（要点） |
| konsole-pal | PyPI JSON：1.0.1，releases {1.0.0, 1.0.1} | 无变化 |
| AgentBuddy | 权威仓定位：spankyed/AgentBuddy-releases（4★），README 一手判定为工作流构建器型 | **悬案收口**（要点，见结论 2） |
| Obvious | obvious.ai title/desc 不变（通用 outcome agent） | 无变化 |
| Kindship | kindship.ai title/desc 不变 | 无变化 |
| agent-beacon | npm registry：404 | 无变化（包名缺失，不作缺席证据） |
| jigai | PyPI JSON：0.1.0 | 无变化 |
| Alook | GitHub HTML alookai/alook：1,147★（上轮 1,144★，+3） | 动能缓升 |
| Rut | tryrut.com title 不变（"command center for AI coding agents"） | 无变化 |

## 邻接复核（6 项）

- **claude-dispatcher**：GitHub HTML Innovology/claude-dispatcher 200 可达、11★（持平）。宿主型 tmux cockpit 判定维持。
- **portagent**：GitHub HTML mrizzben/portagent 200 可达、0★。本地单机 TUI 判定维持。
- **Arboretum**：git-arboretum.com title "Mission control for your AI coding agents"。宿主型 + Claude 单源判定维持。
- **Codeman**：GitHub HTML Ark0N/Codeman 676★（持平）。宿主型不变。
- **DevThrottle Director**：devthrottle.com title/desc 不变（Windows 并行 + "pings you the second any agent needs you"）。宿主/编排型判定维持。
- **tmux-agents-inbox**：GitHub HTML ctretyak/tmux-agents-inbox 200 可达、0★（与 round-1064 入档一致）。Claude 单源 tmux 单机判定维持。

## 新进入者扫描

- GitHub 仓库搜索 `"attention inbox" coding agents`（HTML，按更新排序）：命中 attnbox、shariqh/agent-inbox（既档）、AnkushinDaniil/grove（既档 round-657），首位仍为 attnbox。
- GitHub 仓库搜索 `"waiting on you" coding agents inbox`：命中 attnbox 与 tmux-agents-inbox（均既档），无新进入者。
- AgentBuddy 名下搜索连带发现 spankyed/default-setup（AgentBuddy 的可定制 setup 源仓），归入 AgentBuddy 证据链，不单列。

## 方法注记

- GitHub 仓库证据经 GitHub HTML 页面（星数取 `aria-label="N users starred"`）与仓库搜索 HTML（`hl_name` 字段）取得；npm/PyPI 版本证据以 registry JSON（`dist-tags.latest` + `time` / releases）为准，沿用 round-1053/1064 方法注记。
- AgentBuddy README 原文经 raw.githubusercontent.com 直读（HTML 渲染页 richText 抽取失败，raw 直读为一手证据）。
- 本轮一手响应留存于本机 `~/a11y/comp1075/`（不入库）。

## 收敛

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单调整：AgentBuddy 判定更新为"工作流构建器型、无重叠"（权威仓已定位），保留名单内低频复核；其余名单与判定维持；DorkOS 维持重点盯防。
- attnbox 差异化（本地三采集器零侵入读取 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、常驻移动端 PWA 收件箱、诚实边界文档）在本轮所有对手一手证据下仍无重叠者。
