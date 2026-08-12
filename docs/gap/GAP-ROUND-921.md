# GAP-ROUND-921 — 第八十批竞品扫描（纯文档）

Round 921. 主驱动：盯防名单每轮必查 + 新进入者扫描——round-910 后首次。证据日期：2026-08-04。

## 盯防名单全查（13/13）

- **yepanywhere**：npm 0.7.0 无新版本；移动优先、端到端加密、自托管 Claude Code/Codex 远程界面定位不变，仍无三源聚合面。
- **AgentBell**：Mac companion + iOS 受信决策中心双线稳定；waiting/approve 重叠仍名单最高，定位仍是 companion/决策中心而非聚合收件箱。
- **AO（Agent Orchestrator）**：架构/reactions 文档持续细化（`spawning`→`pr_open`→`ci_failed`→`review_pending`→`mergeable` 生命周期态、send-to-agent 自动恢复 + notify 人类），仍是 git worktree fleet 编排，无跨工具收件箱面。
- **AgentPeek**：26 agents、notch 命令中心叙事不变，无方向性动向。
- **DorkOS**：平台化维持——自托管 cockpit（Claude Code/Codex/OpenCode）+ Tasks 调度 + Relay 消息 + Mesh 发现 + 移动 cockpit；仍是编排 OS 而非注意力收件箱。
- **konsole-pal**：PyPI 1.0.x 无新版本；"tiny local-first attention router" 本地重合最强观察项不变，仍无三源聚合。
- **AgTower**：macOS mission control（Claude Code/Codex 双 agent、waiting 自动浮出、live preview、键盘分诊、local-only）无版本变化；本地会话面重合强，无 Devin/GitHub 多源聚合证据。
- **AgentBuddy**：hooks 集成 6+ 工具（Claude Code/Codex/Gemini CLI/Cursor/opencode/Windsurf/generic 包裹命令）+ 桌面宠物/通知层；working/waiting/done/idle/needs-input 五态跟踪，无 lane 变化。
- **Obvious**："My Day" beta 维持——日历/邮件/待决策/agent threads waiting for input 合流 + Quick Decisions 行动按钮；仍绑定自有集成体系。
- **Kindship**：agent workspace 的 Inbox（asks/approvals/replies/reports + `/home/inbox` 跨 agent 收件箱 + deep link 回原 thread）文档细化；仍只聚合自有体系 agent，不聚合第三方。
- **agent-beacon**：macOS 菜单栏状态灯（Codex/Claude Code/Cursor/Gemini CLI/generic，done/waiting/failed/running）；"只显示可核实状态、不展示会话正文"隐私边界叙事不变。
- **jigai**：PyPI v0.1.0 无新版本（npm 无同名包）；tool-agnostic PTY 代理（pattern+timeout+cooldown 三层 idle 检测、macOS/LAN 通知、v0.2 移动 app 计划）单机通知通道，无聚合面。
- **Alook**：开源自托管 "agents as a company" 平台定位不变（email/看板/日历编排），非注意力收件箱。

claude-dispatcher 具名项 404 第三十轮。

## 新进入者扫描

- 本地注意力收件箱 lane 复核：**switchboard**（HaydnG/switchboard，Claude Code/Codex/Pi 注意力队列 + quick actions + focus-next + 后台监控）与 **aside**（vignesh07/aside，持久 side chats + fleet 会话）为 round-690 已入档项，本轮确认仍活跃、仍无云端/GitHub 聚合面，维持观察。
- 三向搜索（unified attention inbox / which agent is waiting / waiting on you）首位命中仍为 attnbox；官方面最近命中为 Claude Code agent view（round-547 已入档，单 runtime）。本轮无新直接进入者。

"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 跨设备同步"差异化不变。所有动向均为竞品自身演进，未构成 attnbox 可验证 P0/P1 缺陷或缺口。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
