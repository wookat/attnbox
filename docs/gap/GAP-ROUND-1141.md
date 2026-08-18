# GAP-ROUND-1141：第一百批竞品扫描（盯防 14 项全查 + 邻接复核 + 新进入者扫描）

日期：2026-08-04（UTC）  
基线：main @ 6c97fae（PR #1175 合并后，99 测试绿）  
上一次竞品轮：ROUND-1130（PR #1165）

## 结论（先说重点）

1. **无 P0/P1，无新直接对手，无结构性动向。** 三源被动聚合差异化（本地 Claude/Codex/Gemini 被动读取 + Devin 云端 + GitHub review-requested 兜底 + 等待原因/预览 + 跨设备 ack + 常驻收件箱/PWA 的组合）在本轮一手证据中仍无任何单一产品同时覆盖。
2. **连续第六个全名单静默轮**：DorkOS registry JSON 确认 0.61.0 后仍无新发布（`dist-tags.latest = 0.61.0`，time 2026-08-17T13:12Z 与既档一致；该时间戳晚于本轮日期，属既档记录的 registry 时间面异常，沿用 round-998/1009/1130 判定，不作新发布证据），desc 维持 mission control + 审批 + 调度 + OpenCode 纳管，维持重点盯防；其余 13 项盯防与 6 项邻接均无版本/叙事/形态变化。
3. **仅 bohay 星数缓升**：bohay 47★（+5，自 round-1130 的 42★）；Alook 1,152★、Codeman 678★、AgentBuddy 4★、claude-dispatcher 11★、portagent/tmux-agents-inbox 0★ 全部持平。新进入者扫描首位命中仍为 attnbox，无新进入者。

## 一、盯防名单 14 项全查

证据目录：`~/a11y/comp1141/`（原始响应逐项落盘，均为本轮一手 curl 抓取）。

| # | 项目 | 本轮证据 | 与 round-1130 基线比对 |
|---|------|----------|------------------------|
| 1 | bohay | bohay.dev 200（51,434B），title 不变 `bohay: mission control for your AI coding agents`；GitHub 47★ | 星数 +5（42→47），叙事/形态不变，缓升继续 |
| 2 | yepanywhere | npm registry：latest 0.7.0（2026-07-25T09:56Z） | 无新版本 |
| 3 | AgentBell | agentbell.dev 200，title 不变 `AgentBell — AI Agent Monitor for Your Mac Menu Bar` | 不变 |
| 4 | AO | aoagents.dev 200，title 不变 `Run Coding Agents in Parallel | Agent Orchestrator` | 不变 |
| 5 | AgentPeek | llms.txt 200，定位不变（macOS notch/menu bar 本地会话监控） | 不变 |
| 6 | DorkOS | npm registry：latest 0.61.0；time 2026-08-17T13:12Z（既档时间面异常，非新发布证据）；desc 维持 mission control + 审批 + 调度 + OpenCode 纳管 | 无新发布，维持重点盯防 |
| 7 | konsole-pal | PyPI：1.0.1，releases 仅 1.0.0/1.0.1 | 不变 |
| 8 | AgentBuddy | GitHub 4★ | 持平 |
| 9 | Obvious | obvious.ai 200，title 不变 `Obvious — The AI Agent That Builds With You` | 不变 |
| 10 | Kindship | kindship.ai 200，title 不变 `Kindship — Autonomous AI Agents For Any Mission` | 不变 |
| 11 | agent-beacon | npm registry 404（`{"error":"Not found"}`） | 照旧（自 round-1108 起持续 404） |
| 12 | jigai | PyPI：0.1.0，releases 仅 0.1.0 | 不变 |
| 13 | Alook | GitHub 1,152★ | 持平（round-1130 即 1,152★） |
| 14 | Rut | tryrut.com 200，title 不变 `Rut — The command center for AI coding agents` | 不变 |

## 二、邻接 6 项复核

| 项目 | 本轮证据 | 判定 |
|------|----------|------|
| claude-dispatcher | GitHub 11★ | 持平，形态判定维持（cockpit/命令队列，无 attention inbox 转向） |
| portagent | GitHub 0★ | 持平 |
| Arboretum | git-arboretum.com 200，title 不变 `Arboretum · Mission control for your AI coding agents` | 不变 |
| Codeman | GitHub 678★ | 持平 |
| DevThrottle Director | devthrottle.com 200，title 不变 `DevThrottle - Run every coding agent in parallel, on Windows` | 不变 |
| tmux-agents-inbox | GitHub 0★ | 持平 |

## 三、新进入者扫描

GitHub 仓库搜索（HTML，按更新排序），4 组关键词：

| 关键词 | 结果 | 判定 |
|--------|------|------|
| "attention inbox" coding agents | 首位命中 attnbox；其余 shariqh/agent-inbox、grove 均为既档 | 无新进入者 |
| "waiting on you" coding agents inbox | tmux-agents-inbox、attnbox，均为既档 | 无新进入者 |
| "agents are waiting on you" | 仅 tmux-agents-inbox（既档） | 无新进入者 |
| "which agents are waiting" | 0 结果（页面 175,301B、title 为正常搜索结果页，经字节数+title 校验为有效非限流页；首跑 429 限流后等待复跑取得） | 无新进入者 |

## 四、方法注记

- 全部证据为本轮一手 curl 抓取，原始响应落盘 `~/a11y/comp1141/`（盯防站点 HTML/registry JSON/GitHub 仓库页 HTML/搜索结果页 HTML）。
- DorkOS registry 2026-08-17 未来时间戳沿用既档"时间面异常"判定（rounds 998/1009/1130），不作新发布证据。
- GitHub 搜索 429 限流页（9,593B、title "Too many requests"）不作为 0 结果证据，等待后复跑至取得有效结果页。

## 五、处置

纯文档轮：无 P0/P1、无新动向，不产生产品代码变更。盯防名单与邻接名单维持不变，DorkOS 维持重点盯防，bohay 星数缓升继续观察。
