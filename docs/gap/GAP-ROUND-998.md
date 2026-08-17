# GAP-ROUND-998: 第八十七批竞品扫描（盯防 14/14 全查 + 新进入者扫描）

日期：2026-08-04。round-987（第八十六批）后首次竞品轮。结论先行：**盯防名单 14/14 全查 + Arboretum 复核 + 新进入者扫描，无 attnbox P0/P1；两条动向入档（bohay 编排面、DorkOS 时间面异常延展至 0.60），无新直接对手**。

## 一、盯防名单 14/14 全查

| # | 项目 | 本轮一手证据 | 来源 | 判定 |
| --- | --- | --- | --- | --- |
| 1 | bohay | 官网除既有 blocked-on-you 收件箱/inline 应答/`$pane` 委派/SSH 手机/notch 外，**本轮新见编排面明确成型**：`◇ orch` 任务板（依赖任务 → 每任务隔离 git worktree + 专属 pane）、path leases 防重叠编辑、quality gate（测试命令过关才算 done）、完成分支经专用 worktree 合并；支持 agent 列表 14 家不变 | bohay.dev | **动向入档**：从"监督 + 应答"向"编排托管"扩张（与 AO 同象限收敛）；仍是终端宿主路线，无 Devin 云端/GitHub review 面/跨设备 ack，重点盯防 |
| 2 | yepanywhere | npm 权威：latest 仍 0.7.0，无新版 | registry.npmjs.org/yepanywhere | 无新动向，重点盯防维持 |
| 3 | AgentBell | 官网维持 Mac menu bar + 桌面宠物路线（Cursor/Claude Code/VS Code/OpenClaw 等），角色/语音包商店叙事 | agentbell.dev | 无结构性新动向，观察维持 |
| 4 | AO (Agent Orchestrator) | 官网维持并行编排看板 + mobile companion（"need you" 计数）叙事 | aoagents.dev | 与 round-987 一致，观察维持 |
| 5 | AgentPeek | 官方 llms.txt：版本仍 0.2.83；支持 26+ agents 含 Devin；应答边界自述不变（限 permission/question/plan 且需 proven transport） | agentpeek.app/llms.txt | 无新版本，盯防维持 |
| 6 | DorkOS | npm 权威时间轴：latest 标签已指向 0.60.0，但 0.58.0（2026-08-06）/0.59.0（2026-08-12）/**0.60.0（2026-08-17）** 时间戳均晚于本轮日期——registry 时间面异常第四轮持续且**延展至 0.60**；按日期内可确证 0.57.0（2026-08-03）记录 | registry.npmjs.org/dorkos | 方法注记维持：未来时间戳版本不作为"当轮已验证发布"入档；盯防维持 |
| 7 | konsole-pal | PyPI 权威 JSON：latest 1.0.1、releases = {1.0.0, 1.0.1}，无新版 | pypi.org/pypi/konsole-pal/json | 观察维持 |
| 8 | AgentBuddy | 仓库维持 macOS menu bar + 桌面宠物监控，仍 0 star | github.com/techgocodingnow/agentbuddy | 观察维持 |
| 9 | Obvious | 帮助中心仍以 Autobuild/平台面为主，无可见新动向 | help.obvious.ai | 观察维持 |
| 10 | Kindship | 文档维持 Kindship CLI 编排四家 CLI 入口，无新增页面 | kindship.ai/docs | 观察维持 |
| 11 | agent-beacon | npm 仍无同名包（"Not found"） | npm registry | 观察维持 |
| 12 | jigai | PyPI 仍 v0.1.0（releases 单一） | pypi.org/pypi/jigai/json | 观察维持 |
| 13 | Alook | 仓库定位不变："Rooms for people and agents"，1,055 star | github.com/alookai/alook | 观察维持 |
| 14 | Rut | 官网叙事维持 ticket 接活工作流（ideas → tasks → agent sessions → review） | tryrut.com | 观察维持 |

## 二、相邻项与既往入档复核

- **Arboretum**（round-987 入档）：官网现标注 **v1.6.0**，导航新见 **Gitea** 项（自托管 git 面向集成迹象）；仍是单 agent（Claude Code）worktree 宿主路线，无 Devin 云端/GitHub review/跨设备 ack。观察维持。
- **claude-dispatcher**：GitHub 仍 404（第三十七轮）。
- **AgTower**：GitHub API 确认仓库 archived=true（last push 2026-07-17），官网 agtower.ai 仍在线但产品已停止演进；round-954 归档退出判定维持。

## 三、新进入者扫描

- `AI coding agent "waiting on you" attention inbox unified dashboard` → 首位命中为 attnbox 本尊；其余前排为已入档项（AgTower 遗留页、Pushary）。
- `"mission control" coding agents dashboard "needs attention"` → 前排命中均为已入档项（Arboretum、Codeman、AgTower）。
- 无新直接对手入档。

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单维持 14 项 + Arboretum 相邻观察。
- 象限信号：bohay 编排面成型进一步印证"宿主型 mission control 向编排托管收敛"的趋势（bohay/AO/Alook/Kindship 同向）。attnbox 差异化（本地三采集器**零侵入**读取既有会话 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者。
- 方法注记（维持并更新）：DorkOS npm registry 未来时间戳异常已延展至 0.60.0（2026-08-17），继续以日期内可确证版本（0.57.0）为准。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
