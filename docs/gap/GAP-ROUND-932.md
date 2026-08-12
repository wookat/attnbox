# GAP-ROUND-932: 第八十一批竞品扫描（盯防 13/13 全查 + 新进入者扫描）

日期：2026-08-04。round-921（第八十批）后首次竞品轮。结论先行：**盯防名单 13/13 全查 + claude-dispatcher/switchboard/aside 复核 + 三向新进入者扫描，无新直接对手，无 attnbox P0/P1**。attnbox 的"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 跨设备同步"差异化不变。

## 一、盯防名单复查（13/13）

| # | 项目 | 本轮动向 | 证据 | 判定 |
|---|------|---------|------|------|
| 1 | yepanywhere | npm 仍 0.7.0 无新版本；自托管、移动优先、端到端加密的 Claude Code/Codex 远程界面 | registry.npmjs.org/yepanywhere · yepanywhere.com | 无三源聚合，观察 |
| 2 | AgentBell | Mac companion + iOS/iPad 决策中心双线稳定；"Unified Inbox for AI Coding Agents"文案 + 有界审批（confirm/deny/choice/form）；支持 Claude Code/Codex/OpenClaw/Cursor/Gemini/VS Code | agentbell.dev · mwm.ai/apps/agentbell-code-companion | 名单内 waiting/approve 重叠最高，但仍为自有 companion 生态，无 Devin/GitHub review 聚合 |
| 3 | AO (Agent Orchestrator) | reactions 面稳定（ci-failed/changes-requested/agent-stuck/agent-needs-input → send-to-agent/notify 双路径）；lifecycle 为 core 不可插拔 | aoagents.dev/docs/configuration/reactions · /docs/architecture | 仍 fleet 编排（tmux/worktree 生命周期），非注意力收件箱 |
| 4 | AgentPeek | 26-agent macOS notch/menu-bar 命令中心叙事不变；Devin 会话仍 view-only；无 GitHub review 面 | agentpeek.app/docs/agents | 本地命令中心，观察 |
| 5 | DorkOS | cockpit + Tasks/Relay/Mesh 平台化维持；跨设备 approve/deny tool calls；自托管 MIT | dorkos.ai · github.com/dork-labs/dorkos | 编排平台化路线，无三源注意力聚合 |
| 6 | konsole-pal | PyPI 1.0.1 无新版本；"tiny local-first attention router"——durable inbox + 确定性 next/ack + 7 agent 适配器 + 多终端支持；无网络/遥测 | pypi.org/project/konsole-pal/1.0.1 | 本地重合最强观察项，仍无云端/GitHub 聚合 |
| 7 | AgTower | GitHub release 仍 v1.0.9；macOS（Rust/Tauri）Claude Code/Codex mission control，零配置发现 + PTY + SQLite | agtower.ai · github.com/harflabs/AgTower | 双 agent 本地面，观察 |
| 8 | AgentBuddy | 6 工具 hooks（Claude Code/Codex/Gemini CLI/Cursor/opencode/Windsurf）+ 通用 wrapper `agentbuddy run --`（任意 CLI working/done）；Cursor/Windsurf 无 needs-input hook 诚实降级 | github.com/techgocodingnow/agentbuddy | 本地 hooks 监视器，无云端/GitHub 面 |
| 9 | Obvious | My Day 仍 beta（邮件申请制）；"agents waiting on you" 面向自有 agent 体系；To-dos/Timers 等多面 beta | help.obvious.ai/agents/my-day | 自有体系收件箱，非第三方聚合 |
| 10 | Kindship | 跨 agent inbox 文档细化：`/home/inbox` 跨 agent 分诊 + pending badges + deep links；2026-04-17 changelog "A Chat-First Inbox" | kindship.ai/docs/agents/agent-workspace · /changelog | 自有 agent 平台收件箱，不聚合第三方 coding agent |
| 11 | agent-beacon | macOS menu bar 状态灯叙事不变（completed/needs review/failed/running）；"只显示可验证状态"隐私边界不变 | github.com/XiaoLuoLYG/agent-beacon | 状态灯，无聚合面 |
| 12 | jigai | PyPI 仍 v0.1.0 无新版本；PTY 通知代理 + LAN WebSocket；mobile app 仍"coming in v0.2" | pypi.org/project/jigai | 单机通知通道，观察 |
| 13 | Alook | "Rooms for people and agents" 叙事（Discord-like 房间 + email/看板/日历编排），1,055 stars；agents-as-a-company 定位不变 | github.com/alookai/alook · alook.ai | 编排/协作平台，非注意力收件箱 |

## 二、既往入档项复核

- **claude-dispatcher**：原具名仓库仍不可得（搜索仅命中 claude-code-dispatcher/claude-dispatch 等同名异物）——404 第三十一轮。
- **switchboard**（tdody/switchboard）：仍活跃——tmux 看板 + Claude Code pane 解析 + "waiting on you" badge + 浏览器通知；纯本地 tmux 面，无云端/GitHub 聚合。另有 kkiruk-studio/SwitchBoard（macOS menu bar 同名异物）。
- **aside**：无新动向证据，维持 round-690 入档结论（本地面、无云端/GitHub 聚合）。

## 三、新进入者扫描（三向搜索）

- `unified attention inbox` → 首位命中仍为 **attnbox**；其余命中为 agent 间消息总线（meetdave3/agentmail、salimfadhley/agent-inbox——SQLite mailbox 供 agent 互发消息，非人类注意力收件箱）。
- `which agent is waiting` → Claude Code 官方 agent view（round-547 已入档）、Pushary Multi-Agent Control Panel（round-580 已入档，"which agent is waiting on me" 文案 + waiting/idle/errored 分组）、jens-duttke/agent-monitor-for-claude（**新存档**：本地桌面窗口按项目分组显示 Claude Code agent working/waiting/blocked/finished——仅 Claude 单工具单机，无聚合面）。
- `waiting on you` → attnbox 首位；Pulser（round-635 已入档）、Agent Watch（round-701 已入档）复现，均无三源聚合。

**判定：无新直接对手。** agentmail/agent-inbox 为 agent-to-agent 消息总线赛道（相邻不重叠）；agent-monitor-for-claude 为单工具本地监视器，存档不升盯防。

## 四、结论与差异化

- 无 P0/P1；纯文档轮。
- 盯防名单维持 13 项不变；下一竞品轮照常全查 + 新进入者扫描。
- attnbox 差异化（本地三采集器零侵入 + Devin 云端 API + GitHub review-requested 兜底三源聚合、act-in-place 回复、ack 跨设备同步、诚实边界文档）在本轮所有对手证据下仍无重叠者。
