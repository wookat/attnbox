# GAP-ROUND-910 — 第七十九批竞品扫描（纯文档）

Round 910. 主驱动：盯防名单每轮必查 + 新进入者扫描——round-899 后首次。证据日期：2026-08-04。

## 盯防名单全查（12/12）

- **yepanywhere**：npm 0.7.0 无新版本；定位不变——移动优先、端到端加密、自托管的 Claude Code/Codex 远程界面（官方 Claude Agent SDK），仍无三源聚合面。
- **AgentBell**：双线定位稳定——Mac 菜单栏 companion（Cursor/Claude Code/VS Code 等活动跟踪 + 需要注意时通知）+ iOS 受信决策中心（有界审批）；waiting/approve 重叠仍名单最高，但定位偏 companion/决策中心而非聚合收件箱。
- **AO（Agent Orchestrator）**：reactions 面持续细化（`agent-needs-input`/`agent-stuck`/`agent-exited` 默认 urgent notify、`escalateAfter`/`retries` 可配、事件→reaction 映射表成文档化契约）；状态机 17 态含 `needs_input`，但仍是 fleet 编排/生命周期驱动，无跨工具收件箱面。
- **AgentPeek**：26 agents 不变；notch 命令中心叙事深化（chat 窗口、in-notch answers、follow-up composer、Agent Board kanban、用量读数矩阵），Devin 支持面仍较深；单机 macOS 定位不变。
- **DorkOS**：平台化维持——"mission control cockpit"（Claude Code/Codex/OpenCode）+ Tasks 调度 + Relay 消息 + Mesh 发现 + Marketplace；44 releases/5 个月节奏，但方向仍是编排 OS 而非注意力收件箱。
- **konsole-pal**：PyPI 1.0.0（Python >=3.10、pipx 安装、setup/demo 子命令）；"tiny local-first attention router" 本地重合最强观察项不变，仍无三源聚合。
- **AgTower**：v1.0.9 无变化；macOS Tauri 分诊队列叙事（waiting 自动浮出、Cmd+J/Cmd+E 循环）不变，Claude Code/Codex 双 agent。
- **AgentBuddy**：hooks 集成 6 工具（Claude Code/Codex/Gemini CLI/Cursor/opencode/Windsurf）+ 菜单栏 orange 计数 + 桌面宠物；无 lane 变化。
- **Obvious**："My Day" Quick Decisions（agent threads waiting on input + Open Threads + 行动按钮）文档成熟，仍是自有 agent 体系内的决策面。
- **Kindship**：跨 agent inbox（`/home/inbox`）+ per-agent Inbox tab 文档进一步细化（asks vs reports 区分、deep link 回原 thread）；仍只聚合自有体系 agent，不聚合第三方。
- **agent-beacon**：macOS 菜单栏状态灯（completed/needs review/failed/running，本地 shim + `~/.agent-beacon/status.json`）；隐私边界叙事不变（不展示会话正文）。
- **jigai**：v0.1.0 无新版本；tool-agnostic PTY 代理（无 hooks、包裹命令、idle 三层检测）+ macOS/LAN 通知，单机通知通道无聚合面。

claude-dispatcher 具名项 404 第二十九轮（搜索仅命中同名无关项目）。

## 新进入者扫描

- **Alook**（alookai/alook）入档观察：开源自托管"agents as a company"平台——本地 agent（Claude Code/Codex/OpenCode）配邮箱/角色/看板/日历，email-native 人-agent 协作；定位是编排/协作 OS，非 waiting 注意力收件箱。
- **hey-clawd** 存档：macOS 菜单栏桌面宠物（Claude Code/Codex/Cursor 等 7 工具状态动画 + 权限提示浮出），AgentBuddy/AgentPet 同 lane。
- Solo/ProjectDispatcher 等既有存档项无方向性变化。

三向搜索首位命中仍为 attnbox；"本地三采集器 + 云端 Devin + GitHub review 三源聚合 + act-in-place + ack 同步"差异化不变。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
