# GAP-ROUND-1053：第九十二批竞品扫描（盯防 14 项全查 + 新进入者扫描）

日期：2026-08-04（UTC）  
基线：main @ d3094ae（PR #1087 合并后，99 测试绿）  
上一次竞品轮：ROUND-1042（PR #1077）

## 结论（先说重点）

1. **无 P0/P1，无新直接对手。** 三源被动聚合差异化（本地 Claude/Codex/Gemini 被动读取 + Devin 云端 + GitHub review-requested 兜底 + 等待原因/预览 + 跨设备 ack + 常驻收件箱/PWA 的组合）在本轮一手证据中仍无任何单一产品同时覆盖。
2. **DorkOS 版本证据订正**：本轮早期一手抓取（npm 渲染页）显示 0.59.0，与 round-1042 记录的 0.60.0 表面冲突。经直接查询 npm registry 元数据裁决：`dist-tags.latest = 0.60.0`（发布于 2026-08-17T00:50Z），0.59.0 为 2026-08-12 发布的既有版本。冲突根因是渲染页快照滞后，不是版本回退；round-1042 记录无误，且 0.60.0 为本轮窗口内新发布——DorkOS 保持高频活跃。
3. **claude-dispatcher 打包面扩张**：README 一手确认新增 brew/nix(flake)/winget/scoop 多平台安装通道，tmux 舰队 cockpit 定位不变（宿主型），维持具名盯防。
4. **Arboretum 首次站点深读**：自述"single pane of glass"、busy/waiting/available 三态、推送通知、手机应答——注意力语言与 attnbox 高度同源，但明确为宿主型（"runs the very same interactive claude CLI… wraps it in a managed terminal"），仅覆盖 Claude Code，无云端聚合/GitHub 兜底/跨设备 ack，象限不重叠。

## 盯防名单 14/14 全查（一手证据）

| 项目 | 本轮证据 | 状态判定 |
|---|---|---|
| bohay | bohay.dev 一手 + GitHub API：`RizRiyz/bohay`，Rust/AGPL-3.0，35★/1 fork，push 至 2026-08-17，topics 含 mission-control/terminal-multiplexer/tmux/tui | 活跃；宿主/编排型终端（"a terminal that watches your agents"），非被动聚合 |
| yepanywhere | npm registry：0.7.0，更新 2026-07-25，周下载 352 | 无结构性变化；Claude Code 单源移动监督 |
| AgentBell | agentbell.dev 一手：Mac 菜单栏监控 Cursor/Claude Code/VS Code + 通知 | 无结构性变化；macOS 本地菜单栏，无云端/兜底面 |
| AO (Agent Orchestrator) | aoagents.dev 一手：并行 fleet + 分支/评审/CI 管理，brew 安装 | 无结构性变化；宿主/编排型 |
| AgentPeek | agentpeek.app/llms.txt 一手：0.2.83，本地 macOS 监控面，支持含 Devin 的多 agent | 版本持平（round-1042 同为 0.2.83） |
| DorkOS | registry.npmjs.org 直查：latest 0.60.0（2026-08-17T00:50Z 发布），0.59.0 存在于 2026-08-12；周下载 478 | 高频活跃；自托管 mission control（宿主型）；版本证据订正见结论 2 |
| konsole-pal | PyPI JSON 直查：1.0.1（版本仅 1.0.0/1.0.1） | 版本持平；仍是最接近的同象限本地 attention-inbox 信号（durable inbox + next/ack），但无云端/Devin/GitHub 面 |
| AgentBuddy | GitHub 仓库搜索仅见 `spankyed/AgentBuddy-releases`（发布仓） | 权威主仓仍未定位；沿用既档，不作缺席证据 |
| Obvious | obvious.ai 一手 | 无结构性变化；通用 outcome agent，非监控/收件箱 |
| Kindship | kindship.ai 一手 | 无结构性变化；长期任务自主 agent，非同赛道 |
| agent-beacon | registry.npmjs.org 直查：`{"error":"Not found"}` | npm 无该包（连续多轮）；仅记录包名查询结果 |
| jigai | PyPI 一手：0.1.0，工具无关 PTY 代理通知（Claude Code/Codex/Gemini CLI/Aider），macOS 通知 + 可选局域网手机通知 | 版本持平；通知工具，无收件箱/聚合面 |
| Alook | GitHub API：`alookai/alook` 1,139→1,144★（+5）、178 fork、push 至 2026-08-17、archived=false | 缓升持续；rooms 编排定位不变，无被动三源聚合面 |
| Rut | tryrut.com 一手："command center"，聚焦想法→任务组织流 | 无结构性变化；工作流组织，非注意力收件箱 |

## 邻接/既档项目复核 5/5

- **claude-dispatcher**：仓库 200 可达（round-1042 复活后持续），README 一手确认 brew/nix/winget/scoop 多通道安装 + cockpit/products lens——打包面扩张，宿主型定位不变。
- **portagent**：`mrizzben/portagent` README 一手：手机尺寸 TUI、转录推导活动、tmux send-keys 应答——本地单机 TUI，无云端/跨设备 ack。
- **Arboretum**：git-arboretum.com 一手深读（见结论 4）——宿主型，Claude Code 单源。
- **Codeman**：搜索复核无结构性变化（tmux 宿主型 mission control，既档）。
- **DevThrottle Director**：devthrottle.com 一手："each their own lane on one board — pings you the moment one needs an answer"——Windows 宿主/编排型，既档判定不变。

## 新进入者扫描

GitHub 搜索 `"attention inbox" coding agents`（按更新排序）：首位命中为 `wookat/attnbox` 本体；其余仅 `shariqh/agent-inbox`（既档具名盯防对象，1★，MCP+SQLite+viewer 本地收件箱，push 至 2026-08-17 持续活跃）。**无新直接进入者。**

## 方法注记

1. **npm 渲染页快照可能滞后 registry 元数据**：本轮 DorkOS 渲染页显示 0.59.0 而 registry `dist-tags.latest` 已是 0.60.0。版本类证据应以 `registry.npmjs.org/<pkg>` JSON 的 `dist-tags` + `time` 为准，渲染页仅作辅助。
2. `agent-beacon` npm 404 仅证明该包名在 npm 缺席，不构成项目不存在的证据；沿用既档处理。

## 本地验证

纯文档变更（仅新增本文件）。本地门禁：`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`（99 测试）全绿后出 PR。
