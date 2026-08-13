# GAP-ROUND-965: 第八十四批竞品扫描（盯防 13/13 全查 + 新进入者扫描）

日期：2026-08-04。round-954（第八十三批）后首次竞品轮。结论先行：**盯防名单 13/13 全查 + 既往入档项复核 + 新进入者扫描，无 attnbox P0/P1**。本轮三条动向入档：① AgentPeek 的 Devin 面来源级澄清（Devin CLI 会话可交互应答审批 + `devin acp` 接管、Devin desktop 会话仍 view-only）；② konsole-pal PyPI 版本面修正为 1.0.1（round-954 记录"单一 1.0.0"已漂移）；③ DorkOS npm 版本面出现晚于本轮日期的发布时间戳（registry 时间面异常，保留不确定性）。attnbox 的"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 跨设备同步"差异化不变。

## 一、盯防名单复查（13/13）

| # | 项目 | 本轮动向 | 证据 | 判定 |
|---|------|---------|------|------|
| 1 | yepanywhere | npm latest 仍 0.7.0（2026-07-25 发布），描述不变："A mobile-first supervisor for Claude Code agents"，无 Devin/GitHub review 面 | registry.npmjs.org/yepanywhere | 无三源聚合，观察 |
| 2 | AgentBell | 官网叙事进一步宠物化："Mac menu bar companion" 跟踪 Cursor/Claude Code/VS Code（宣传带 Codex/Windsurf/OpenClaw/Gemini），主打 menubar 状态 + 桌面宠物 + Dashboard 洞察 + 空闲 RSS 播报 + 角色/语音包商店（Creator Plan）；unified inbox 文案未回归，未见 Devin/GitHub 聚合或跨设备 ack | agentbell.dev | 决策收件箱路线持续弱化为 companion/monitor，观察等级可下调 |
| 3 | AO (Agent Orchestrator) | 官方文档确认为 Node.js 编排器：隔离 git worktree 并行 agent、runtime/agent/workspace/tracker/SCM/notifier/terminal 插件槽、lifecycle 状态机（waiting_input→needs_input）、reactions（send-to-agent/notify/auto-merge 保留语义） | aoagents.dev docs | 仍 fleet 编排/控制面，非被动外部三源注意力聚合 |
| 4 | AgentPeek | **Devin 面来源级澄清**（解决 round-943 "in-notch 可交互" vs 既往 "view-only" 冲突）：官方 llms.txt/agents 文档明确——Devin *CLI* 会话（读 v16 `sessions.db`）可应答 native approve/deny/feedback-deny 并以 `devin acp` 接管精确 CLI 会话；Devin *desktop* 会话走 `~/.codeium/windsurf` observer-only hooks + 轨迹快照，"IDs remain view-only"、审批留在原生宿主。支持面已扩至 26+ agents | agentpeek.app/llms.txt; agentpeek.app/docs/agents/ | 本地 macOS notch 命令中心（Apple silicon、macOS 14+）；对 Devin 的可交互面限本机 CLI 会话，无云端 Devin API 聚合、无 GitHub review 面、无跨设备 ack，重点观察 |
| 5 | DorkOS | 官网叙事不变：Claude Code/Codex/OpenCode 一舱 cockpit + Tasks/Relay（Telegram）/Mesh 平台化 + "tap Approve from your phone"；npm 描述同轨："Mission control for Claude Code, Codex, and OpenCode… approve what your agents do… self-hosted, MIT"。npm 版本面：0.57.0（2026-08-03）为本轮日期内可确证的最新，registry 另列 0.58.0/0.59.0 时间戳（2026-08-06/08-12）**晚于本轮日期**——registry 时间面异常，暂按 ≥0.57.0 记录 | dorkos.ai; registry.npmjs.org/dorkos | 编排平台化路线，采集器边界确证为自接入三 CLI（无任意外部 agent/Devin/GitHub 聚合），观察 |
| 6 | konsole-pal | **版本面修正**：PyPI 权威 JSON 显示 latest 1.0.1、releases = {1.0.0, 1.0.1}——round-954 记录"仍单一 1.0.0"已漂移，本轮订正 | pypi.org/pypi/konsole-pal/json | 本地重合最强观察项，仍无云端/GitHub 聚合 |
| 7 | AgentBuddy | README 确认：多 agent 并行状态聚合（working/done/waiting for input），hooks 支持 Claude Code/Codex/Gemini CLI/Cursor/OpenCode/Windsurf + 通用 wrapper `agentbuddy run --`；Cursor/Windsurf 无 needs-input hook 只报 working/done；桌面宠物 + 原生通知 | github.com/techgocodingnow/agentbuddy | 本地多工具 hook 状态聚合（相邻最强本地面之一），无 Devin/GitHub/跨设备 ack，观察 |
| 8 | Obvious | My Day 仍 beta：日历 + Quick Decisions（含 agent threads waiting on you，带 action buttons）+ Open Threads 直达待输入 thread | help.obvious.ai | "等你决策"UX 重叠持续，但限自有 agent 体系，非第三方聚合 |
| 9 | Kindship | Agent Workspace/跨 agent `/home/inbox` 文档维持 round-954 状态（pending asks tab 内直接行动 + Telegram 双向应答），无新动向 | kindship.ai/docs | 收件箱交互重叠最深但仅聚合自家 agent，观察 |
| 10 | agent-beacon | 同名双仓分辨维持 round-954 入档（XiaoLuoLYG 状态灯 / Asymptote OTel 遥测层），无新动向 | 两仓 README | 无聚合面，观察 |
| 11 | jigai | PyPI 仍 v0.1.0，PTY tool-agnostic waiting 检测 + LAN 手机推送叙事不变 | pypi.org/pypi/jigai/json | 侵入式通知通道，无聚合收件箱，观察 |
| 12 | Alook | 定位不变：open-source self-hosted "organization of AI agents"（Claude Code/Codex/OpenCode、层级/邮箱/Kanban/日历/共享记忆/常驻 daemon） | github.com/alookai/alook | agents-as-a-company 编排平台，非被动注意力聚合 |
| 13 | Rut | 官网确证：ticket 化 agent 工作台——multi-agent queues（Claude Code/Codex/Gemini/Cursor/OpenCode）、mobile idea capture、Review inbox/Decision inbox、signed automation、Mac+手机审批 | tryrut.com | 聚合边界确证为"经 Rut 派发的 ticket 工作流"（agent 须由 Rut 接活），非零侵入被动聚合既有会话，无 Devin/GitHub review 面，观察 |

## 二、既往入档项复核

- **switchboard**（HaydnG/switchboard）：仍为 Claude-only Attention Inbox（prioritized queue + Focus next + inbox 内 approve/deny/reply + live terminals），无云端/Devin/Gemini/GitHub review 聚合，维持入档。
- **claude-dispatcher**：仍不可得，404 第三十四轮。

## 三、新进入者扫描（三向搜索）

- `unified inbox for coding agents waiting on you` → 首位命中仍为 **attnbox**。
- 新入档一项（相邻不重叠）：
  - **zka**：Kitty 原生持久终端工作区（`zmx`），收集 Codex/Claude panes 的 blocked/failed/done 并可跳转精确 pane，支持 remote attach/move 与 credential-bundle 设计；Linux/Wayland、pre-1.0。终端/工作区层注意力队列，非云端/三源聚合。
- `attention inbox` / `agent approval inbox` 复扫：其余命中均为已入档项（switchboard/yepanywhere/Rut 等），无新直接对手。

**判定：无新直接对手；zka 入档观察。**

## 四、结论与差异化

- 无 P0/P1；纯文档轮，无源码改动。
- 盯防名单维持 13 项不变（yepanywhere/AgentBell/AO/AgentPeek/DorkOS/konsole-pal/AgentBuddy/Obvious/Kindship/agent-beacon/jigai/Alook/Rut）。
- 本轮方法注记：外部 registry（npm）可能出现晚于当前日期的发布时间戳（DorkOS 0.58/0.59），此类条目不得直接作为"当轮已验证发布"的事实入档，应记录异常并以日期内可确证的版本为准。
- attnbox 差异化（本地三采集器零侵入 + Devin 云端 API + GitHub review-requested 兜底三源聚合、waiting 详情预览、行动链接、act-in-place 回复、ack/un-ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者；最接近的重叠仍是"本地多工具状态聚合"（AgentBuddy/konsole-pal/AgentPeek）与"自有生态决策收件箱"（Kindship/Obvious/Rut）两个不相交象限。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
