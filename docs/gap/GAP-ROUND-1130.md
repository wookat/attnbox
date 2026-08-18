# GAP-ROUND-1130：第九十九批竞品扫描（盯防 14 项全查 + 邻接复核 + 新进入者扫描）

日期：2026-08-04（UTC）  
基线：main @ 0137e5f（PR #1164 合并后，99 测试绿）  
上一次竞品轮：ROUND-1119（PR #1154）

## 结论（先说重点）

1. **无 P0/P1，无新直接对手，无结构性动向。** 三源被动聚合差异化（本地 Claude/Codex/Gemini 被动读取 + Devin 云端 + GitHub review-requested 兜底 + 等待原因/预览 + 跨设备 ack + 常驻收件箱/PWA 的组合）在本轮一手证据中仍无任何单一产品同时覆盖。
2. **连续第五个全名单静默轮**：DorkOS registry JSON 确认 0.61.0 后仍无新发布（`dist-tags.latest = 0.61.0`，time 2026-08-17T13:12Z 与既档一致；该时间戳晚于本轮日期，属既档记录的 registry 时间面异常，沿用 round-998/1009 判定，不作新发布证据），desc 维持 mission control + 审批 + 调度 + OpenCode 纳管，维持重点盯防；其余 13 项盯防与 6 项邻接均无版本/叙事/形态变化。
3. **仅 bohay/Alook 星数缓升**：bohay 42★（+3）、Alook 1,152★（+1）；Codeman 678★、AgentBuddy 4★、claude-dispatcher 11★、portagent/tmux-agents-inbox 0★ 全部持平。新进入者扫描首位命中仍为 attnbox，无新进入者。

## 盯防名单 14/14 全查（一手证据）

| 项目 | 本轮一手证据 | 变化判定 |
| --- | --- | --- |
| bohay | bohay.dev title 不变（"mission control for your AI coding agents"）；GitHub HTML RizRiyz/bohay 42★（+3） | 星数缓升，无产品变化（宿主/编排型） |
| yepanywhere | registry JSON：latest 0.7.0（2026-07-25），无新版本 | 无变化 |
| AgentBell | agentbell.dev title 不变（"AI Agent Monitor for Your Mac Menu Bar"） | 无变化 |
| AO | aoagents.dev title 不变（"Run Coding Agents in Parallel"） | 无变化 |
| AgentPeek | agentpeek.app/llms.txt：0.2.83（与既档一致）；changelog 首条标注 "August 5 2026"（晚于本轮日期，站方标注异常，版本号未变不作动向） | 无变化 |
| DorkOS | registry JSON：latest 0.61.0（time 2026-08-17T13:12Z，与既档一致），desc 不变 | 无新发布 |
| konsole-pal | PyPI JSON：1.0.1，releases {1.0.0, 1.0.1} | 无变化 |
| AgentBuddy | GitHub HTML spankyed/AgentBuddy-releases 4★（持平）。工作流构建器型判定维持 | 无变化 |
| Obvious | obvious.ai title 不变（"The AI Agent That Builds With You"） | 无变化 |
| Kindship | kindship.ai title 不变（"Autonomous AI Agents For Any Mission"） | 无变化 |
| agent-beacon | npm registry：404（"Not found"） | 无变化（包名缺失，不作缺席证据） |
| jigai | PyPI JSON：0.1.0，releases {0.1.0} | 无变化 |
| Alook | GitHub HTML alookai/alook：1,152★（+1） | 动能缓升维持 |
| Rut | tryrut.com title 不变（"the command center for AI coding agents"） | 无变化 |

## 邻接复核（6 项）

- **claude-dispatcher**：GitHub HTML Innovology/claude-dispatcher 200 可达、11★（持平），title 维持 "Terminal cockpit for running a fleet of Claude Code sessions"。宿主型 tmux cockpit 判定维持。
- **portagent**：GitHub HTML mrizzben/portagent 200 可达、0★（持平）。本地单机 TUI 判定维持。
- **Arboretum**：git-arboretum.com title "Mission control for your AI coding agents" 不变。宿主型 + Claude 单源判定维持。
- **Codeman**：GitHub HTML Ark0N/Codeman 678★（持平）。宿主型不变。
- **DevThrottle Director**：devthrottle.com 200 可达，title 不变。宿主/编排型判定维持。
- **tmux-agents-inbox**：GitHub HTML ctretyak/tmux-agents-inbox 200 可达、0★（持平），title 维持 "shows which Claude Code agents are waiting"。Claude 单源 tmux 单机判定维持。

## 新进入者扫描

- GitHub 仓库搜索 `"attention inbox" coding agents`（HTML，按更新排序）：命中 attnbox、shariqh/agent-inbox（既档）、AnkushinDaniil/grove（既档 round-657），无新条目。
- GitHub 仓库搜索 `"waiting on you" coding agents inbox`：命中 attnbox 与 tmux-agents-inbox（均既档）。
- GitHub 仓库搜索 `"agents are waiting on you"`：仅命中 tmux-agents-inbox（既档）。
- GitHub 仓库搜索 `"which agents are waiting"`：0 命中（结果页 175KB、title "Repository search results" 为有效结果页，非限流页）。
- 结论：无新进入者。

## 方法注记

- GitHub 仓库证据经 GitHub HTML 页面（"N users starred"）与仓库搜索 HTML（`hl_name` 字段）取得；npm/PyPI 版本证据以 registry JSON（`dist-tags.latest` + `time` / releases）为准，沿用 round-1053/1064 方法注记。
- 0 命中的搜索结果页经字节数与 title 校验确认为有效结果页（非限流页），0 结果为真实证据。
- 两处未来日期（DorkOS registry time 2026-08-17、AgentPeek changelog "August 5 2026"）均晚于本轮日期，按第三方时间面标注异常记录，不作为动向证据。
- 本轮一手响应留存于本机 `~/a11y/comp1130/`（不入库）。

## 收敛

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单与判定全部维持；DorkOS 维持重点盯防。
- attnbox 差异化（本地三采集器零侵入读取 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、常驻移动端 PWA 收件箱、诚实边界文档）在本轮所有对手一手证据下仍无重叠者。
