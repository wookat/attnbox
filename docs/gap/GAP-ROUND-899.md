# GAP-ROUND-899 — 第七十八批竞品扫描（纯文档）

Round 899. 主驱动：竞品调研（盯防名单每轮必查 + 新进入者扫描——round-888 后首次）。证据日期：2026-08-04。

## 盯防名单全查（11/11）

- **yepanywhere**：npm 0.7.0 无新版本；"mobile-first, self-hosted remote interface for Claude Code and Codex"，端到端加密、无云账号、手机监督 + 推送叙事不变（最近更新 ~07-25）。维持重点盯防。
- **AgentBell**：双线定位稳定——iOS "trusted decision center"（verified source/action/target/environment/risk/deadline + bounded approvals + 执行 receipts + unified inbox）+ Mac 菜单栏 companion（Claude Code/Codex/OpenClaw/Cursor/Gemini/VS Code，idle/run/wait/done/error 提醒、语音通知、桌面徽章）。waiting/approve 重叠仍名单最高，无新方向性动向。
- **AO（Agent Orchestrator）**：reactions 面继续细化（ci-failed/changes-requested/merge-conflicts → send-to-agent 自动恢复；agent-stuck/agent-needs-input/agent-exited → notify urgent；escalateAfter/retries 可配置；auto-merge 仍是 notify 占位）。定位仍是 fleet 编排 + 自动恢复，人类注意力只是 notify 出口，无三源聚合收件箱面。
- **AgentPeek**：macOS notch/菜单栏监控，26 agents（含 Devin）不变；sessions/prompts/usage/in-notch answers 支持面维持，无方向性动向。
- **DorkOS**："The operating system for autonomous AI agents" 平台化维持（Claude Code/Codex/OpenCode mission control + 调度 + Relay 消息 + Mesh agent discovery + 自托管），无新方向。
- **konsole-pal**：PyPI 1.0.1（patch），Python ≥3.10，"tiny local-first attention router" 定位不变——本地重合最强观察项，仍无三源（本地+云+GitHub）聚合面。
- **AgTower**：harflabs/AgTower macOS Tauri 应用叙事不变（"Monitor every agent across every repo. Respond the instant one needs you"，Claude Code/Codex 零配置发现 + attention triage + Cmd+J）。macOS-only、双 agent，无云 agent 面。
- **AgentBuddy**：macOS 菜单栏 + 桌面宠物，hooks 集成面扩至 Claude Code/Codex/Gemini CLI/Cursor/opencode/Windsurf（一键安装，精确 working/waiting/done/idle），维持观察。
- **Obvious "My Day"**：仍 beta（需邮件申请）；Quick Decisions 含 "agent threads waiting on your input" + 行动按钮 + checkmark dismiss。云端个人助理面，非编码 agent 聚合。
- **Kindship**：文档细化——agent 内 Inbox tab + `/home/inbox` 跨 agent inbox（pending badges、过滤、deep links），04-17 changelog "A Chat-First Inbox"。云平台自有 agent 体系，不聚合第三方编码 agent。
- **agent-beacon**：macOS 菜单栏状态灯（completed/needs review/failed/running；Codex/Claude/Cursor/Gemini via local shims），"不显示会话正文/文件/终端输出" 的隐私边界叙事不变。

claude-dispatcher 原仓库 404 第二十八轮（同名检索命中均为无关项目：k1e1n04/claude-code-dispatcher、manugomez95/claude-dispatcher Linear→Slack、wwadley-lucas/claude-dispatch skill router）。

## 新进入者扫描

- **jigai**（nafistiham/jigai）：tool-agnostic PTY 代理通知器——包裹任意 CLI 命令、模式匹配/超时判 idle、macOS 通知 + LAN 手机推送（无云）。"No hooks. No per-tool config" 叙事与 attnbox 零侵入读日志路线不同（须包裹命令启动），单机通知通道、无收件箱/聚合面。入档观察。
- **AgentPet**（ntd4996/agentpet）：AgentBuddy 同类桌面宠物 + 菜单栏监控，11 agents + 通用 wrapper，macOS/Windows，token 养成/排行榜。娱乐化监控，入档存档。
- **Codogotchi**：macOS 菜单栏宠物（Codex/Claude/Cursor/Copilot/Antigravity 生命周期动画）。存档。
- **ProjectDispatcher**（dbarkman）：本地 ticket 看板编排（Kanban + heartbeat 派工 + Human 列跨项目 unified inbox）。编排优先、inbox 为 ticket 停靠列，非 agent 状态聚合。存档。
- **CodeFire**：chat-first 桌面工作台（Claude Code/Codex/Gemini/Kimi/自有 agent + 跨项目 Planner + staging inbox）。工作台路线，非注意力层。存档。

三向搜索（"unified attention inbox AI coding agents waiting on you"）首位命中仍为 attnbox。

## Verdict

盯防名单无改变竞争格局的方向性动向；新进入者均为单通道通知/宠物监控/编排工作台路线，无本地 CLI + 云 agent + GitHub review 三源聚合的直接对手。差异化（local-first、waiting reason + request preview、session/PR 行动链接、ack 跨设备同步、诚实边界）不变，无 P0/P1 优先级调整。纯文档轮，无 changeset。
