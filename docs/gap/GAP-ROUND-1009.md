# GAP-ROUND-1009: 第八十八批竞品扫描（盯防 14/14 全查 + 新进入者扫描）

日期：2026-08-17。round-998（第八十七批，2026-08-04）后首次竞品轮。结论先行：**盯防名单 14/14 全查 + Arboretum 复核 + 新进入者扫描，无 attnbox P0/P1；两条动向入档（DorkOS 时间面异常收口并确证 0.60.0、AO 叙事向 merge/review 管线倾斜），无新直接对手**。

## 一、盯防名单 14/14 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | bohay | 官网维持 blocked-on-you 状态面（"which are blocked on you"、positive-evidence working 判定）、per-project cost/context 面板 + inline 应答、`$pane` 委派、SSH 手机/notch；`◇ orch` 编排面（隔离 worktree + path leases + quality gate + 专用 worktree 合并）与 round-998 一致；支持 agent 列表 14 家不变 | bohay.dev | 无结构性新动向，重点盯防维持 |
| 2 | yepanywhere | npm 权威：latest 仍 0.7.0，无新版 | registry.npmjs.org/yepanywhere | 无新动向，重点盯防维持 |
| 3 | AgentBell | 官网维持 Mac menu bar + 桌面宠物路线（Claude Code/Cursor/Codex/Windsurf/VS Code/OpenClaw），角色/语音包商店 + Dashboard Insight + idle RSS 播报叙事 | agentbell.dev | 无结构性新动向，观察维持 |
| 4 | AO (Agent Orchestrator) | 官网主叙事现为 "Stop babysitting agents. Start merging real work."——fleet 编排看板（Pending Work / Iterating，分支/PR/CI 通过数展示）+ `brew install agentwrapper/tap/agent-orchestrator` | aoagents.dev | **动向入档**：叙事从"并行编排 + mobile companion"进一步向"branches/reviews/CI 合并管线托管"倾斜（与 bohay 编排面同象限）；仍无被动三源聚合面，盯防维持 |
| 5 | AgentPeek | 官方 llms.txt：版本仍 0.2.83；支持 26+ agents 含 Devin；应答边界自述不变（限 permission/question/plan 且需 proven transport） | agentpeek.app/llms.txt | 无新版本，盯防维持 |
| 6 | DorkOS | npm 权威时间轴（本轮日期 2026-08-17 实查）：0.58.0（2026-08-06）/0.59.0（2026-08-12）/0.60.0（2026-08-17T00:50Z）均已落入日期内，latest=0.60.0 **本轮首次可日期内确证** | registry.npmjs.org/dorkos | **动向入档**：rounds 965–998 持续四轮的"未来时间戳异常"随日期推进自然收口，0.57.0→0.60.0 发版节奏确证为约每周一版；方法注记闭环，盯防维持 |
| 7 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，无新版 | pypi.org/pypi/konsole-pal/json | 观察维持 |
| 8 | AgentBuddy | 仓库维持 macOS menu bar + 桌面宠物监控，仍 0 star | github.com/techgocodingnow/agentbuddy | 观察维持 |
| 9 | Obvious | 帮助中心仍以 Autobuild/平台面（Agents/Workbooks/Projects/Automations/Integrations）为主，无可见新动向 | help.obvious.ai | 观察维持 |
| 10 | Kindship | 文档维持 Kindship CLI 编排四家 CLI（Claude Code/Gemini CLI/Codex/OpenCode）+ Agencies 监督 + Planning System 入口，无新增结构 | kindship.ai/docs | 观察维持 |
| 11 | agent-beacon | npm 仍无同名包（HTTP 404 "Not found"，直查确认） | registry.npmjs.org/agent-beacon | 观察维持 |
| 12 | jigai | PyPI 仍 v0.1.0（releases 单一） | pypi.org/pypi/jigai/json | 观察维持 |
| 13 | Alook | 仓库定位不变：self-hosted agent workforce（email/roles/org chart），仍 1,055 star / 163 fork，无结构性变化 | github.com/alookai/alook | 观察维持 |
| 14 | Rut | 官网叙事维持 ticket 接活工作流（capture → assign → queue → review from anywhere → keep shipping），Codex/Claude Code/Gemini/OpenCode | tryrut.com | 观察维持 |

## 二、相邻项与既往入档复核

- **Arboretum**：官网仍标注 v1.6.0，导航含 Gitea 项（round-998 所见维持）；Needs attention rail + PWA/Web Push + 面板内应答 + VS Code 扩展/浏览器 IDE 面不变；仍是单 agent（Claude Code）worktree 宿主路线，无 Devin 云端/GitHub review/跨设备 ack。观察维持。来源：git-arboretum.com（arboretum.dev 本轮直查 HTTP 000 不可达，非权威来源，以 git-arboretum.com 为准）。
- **claude-dispatcher**：GitHub 仍 404（第三十八轮，直查确认）。
- **AgTower**：round-998 已经 GitHub API 确认 archived=true，退出判定维持（本轮未重复查询）。

## 三、新进入者扫描

- `AI coding agent "waiting on you" attention inbox unified dashboard` → 首位命中为 attnbox 本尊；其余前排为已入档项（AgTower 遗留页、Arboretum）。
- `"mission control" coding agents dashboard "needs attention"` → 前排命中均为已入档项（Arboretum、Codeman）。
- 无新直接对手入档。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单维持 14 项 + Arboretum 相邻观察。
- 象限信号：AO 叙事向 merge/review 管线倾斜进一步印证"宿主型编排托管收敛"趋势（bohay/AO/Alook/Kindship 同向）；该象限管理"工作模型"，与 attnbox 被动聚合"注意力模型"不重叠。
- attnbox 差异化（本地三采集器**零侵入**读取既有会话 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者。
- 方法注记：DorkOS 未来时间戳异常已随日期推进收口（0.60.0 于 2026-08-17T00:50Z 落入日期内），既往"以日期内可确证版本为准"的处理方式验证有效，注记闭环。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
