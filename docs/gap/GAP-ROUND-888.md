# GAP-ROUND-888 — 第七十七批竞品扫描（纯文档）

Round 888. 主驱动：竞品调研——盯防名单每轮必查 + 新进入者扫描（round-877 后首次）。证据窗口：2026-08-04 当日 web 检索。

## 盯防名单全查

### 重点盯防

- **yepanywhere**（yepanywhere.com / kzahel/yepanywhere / npm `yepanywhere`）：npm 0.7.0（2026-07-25 更新）无新版本。定位不变：自托管浏览器/移动优先监督 Claude Code + Codex，审批、推送通知、activity/inbox 视图、follow-up 队列、搜索/recap/fork/clone，可选 E2E 加密 Public Relay，无托管账户要求。Android 仍开发中、iOS 计划中，无已发布原生 app 证据。维持重点盯防。
- **AgentBell 3.0**（agentbell.dev）：双线定位稳定——iOS "trusted decision center"（verified source/action/target/environment/risk/deadline/provenance + Human decision / Executor claim / execution receipt 三分离）+ Mac 菜单栏 companion（追踪 Claude Code/Codex/Cursor/OpenClaw/Gemini/VS Code 活动、live status、session 记录、waiting 通知）。waiting/approve 重叠仍名单最高；无云端（Devin）聚合与行动链接证据。维持重点盯防。
- **AO / Agent Orchestrator**（aoagents.dev）：reactions 引擎文档细化——`agent-stuck`/`agent-needs-input`/`agent-exited`/`all-complete`，支持 notification、send-to-agent、auto-merge、重试/优先级/summary/threshold/escalation；架构态含 working/pr_open/ci_failed/review_pending/changes_requested/approved/mergeable/merged/needs_input/stuck/errored/idle/terminated。定位仍 fleet 编排 + 工作流自动化，非注意力收件箱。维持具名盯防。

### 具名盯防

- **AgentPeek**（agentpeek.app）：macOS notch/菜单栏 command center，live sessions/用量/本地 dev server/agent files/saved commands/terminal workspaces/floating widgets/session board；多 agent 含 Claude Code/Codex/Cursor/OpenCode/Copilot/Factory Droid/Antigravity/Pi/Kiro/Devin；session 详情含最新回复/工具/prompt/权限/提问/subagent/todo/follow-up。仍是本机 Mac 软件非跨设备 daemon/web 层。无方向性动向。
- **DorkOS**（dorkos.ai / dork-labs/dorkos / npm `dorkos`）：开源 MIT 自托管 mission control（Claude Code/Codex/OpenCode），scheduling + Relay 消息 + Mesh agent discovery（为 agent 赋 identity 与通信路径）+ 浏览器/移动控制 + 多 runtime cockpit。"OS for autonomous agents" 平台化路线持续，非纯注意力收件箱。维持具名盯防。
- **AgTower**（agtower.ai / harflabs/AgTower）：最新 release v1.0.9（仓库 2026-07-03 更新）无变化。macOS 13+ Apple Silicon Rust/Tauri app，本地会话发现 + 持久本地态，waiting/running/done 分组浮出等人会话，零遥测声明。仅 Mac 本地，无跨设备/云聚合证据。
- **claude-dispatcher**：原仓 404 第二十七轮（现检索命中均为同名异物：claude-code-dispatcher issue 工厂、Slack dispatcher、skill router）。

### 观察名单

- **konsole-pal**（PyPI 1.0.0，2026-08-04 上传；daredoole/konsole-pal）：自述 "tiny local-first attention router for terminal AI agents"——真提问进单一 unread inbox 并送回正确终端 tab，不刮终端输出；pipx/uv 安装。本地注意力路由层重合最强的观察项，但证据未显示 Claude/Codex/Gemini/Devin/GitHub review 聚合面。维持观察。
- **AgentBuddy**（techgocodingnow/agentbuddy）：macOS 菜单栏 + 桌面宠物，hooks 接入 Claude Code/Codex/Cursor/Gemini CLI/OpenCode/Windsurf，working/waiting/done/idle 四态 + 等待原因/计时/project/activity，原生通知 + 聚合菜单栏指示，`agentbuddy run` 通配 wrapper。macOS-only by design。维持观察。
- **Kindship**（kindship.ai）：云端 agent workspace（Plan/live activity/Inbox/文档/视频/heartbeat），Inbox 处理 questions/approvals/choices/reports；跨 agent inbox `/home/inbox` 带 pending 徽章/过滤/深链回原 thread；report 默认信息性、ask 可行动。托管云路线与我们 local-first 相反。维持观察。
- **Obvious "My Day"**（help.obvious.ai/agents/my-day）：仍 beta（需邮件申请）。定位为每日起点页：日历 + Quick Decisions（含 "agent threads waiting on your input"，条目带行动按钮可直接响应）+ Open Threads（agent 等输入的 thread 深链）；一日三次 briefing。云端个人助理象限的注意力面，无本地 CLI agent/Devin 聚合证据。维持观察。

## 新进入者扫描

- **agent-beacon**（XiaoLuoLYG/agent-beacon）：macOS 菜单栏状态灯，显示 Codex/Claude Code/Cursor/Gemini CLI 及通用命令的 done/waiting/failed/running 态。菜单栏指示灯象限（AgentBuddy/AgTower 同象限），无收件箱/预览/行动链接证据。入档观察。
- 其余检索（"waiting on you" AI coding agents inbox 等三向搜索）首位命中仍为 attnbox；Pushary/notiformer/notyfai 等均为已入档象限（手机审批/通知通道），无新直接对手。

## Verdict

盯防全查无威胁性方向变化，新进入者仅 agent-beacon（菜单栏指示灯象限）入档观察。三源（本地 CLI + 云端 Devin + GitHub review）聚合 + 移动 web + 行动链接的差异化不变。无 P0/P1，纯文档轮，无 changeset。
