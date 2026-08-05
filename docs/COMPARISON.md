# 竞品对比（2026-08-04 实测）

> 方法：三个主要竞品均在本机克隆源码、构建并实际运行（证据见文末"实测记录"）；其余同类通过检索 + README/文档核对。日期：2026-08-04。

## 一、竞品清单

### 主要竞品（实测安装运行）

| 项目 | 语言/形态 | Star | 状态 | 一句话 |
|---|---|---|---|---|
| [epilande/ccmux](https://github.com/epilande/ccmux) | Bun + TS，daemon + TUI | ~113 | 活跃 | tmux 内监控哪个 agent session 需要你，功能最全 |
| [bjornjee/agent-dashboard](https://github.com/bjornjee/agent-dashboard) | Go（Bubble Tea TUI）+ PWA | ~19 | 活跃 | tmux 编排器 + 手机 PWA 远程审批 + workflow gates |
| [jeffdhooton/orch](https://github.com/jeffdhooton/orch) | Go CLI | 0 | 停更 | 多 Claude 实例编排（up/send/dash），无状态检测深度 |
| [omnigent-ai/omnigent](https://github.com/omnigent-ai/omnigent) | Python，server + web/手机/桌面端 | ~8.2k | 活跃（2026-06 新出） | 元 harness：由它启动/包装 Claude/Codex/Cursor 等，带 Inbox（"waiting on you"）、策略审批、云 sandbox（2026-08-05 实测补录，见文末） |

### 其他同类（检索核对）

| 项目 | 形态 | 说明 |
|---|---|---|
| [mwbrooks/recon](https://github.com/mwbrooks/recon) | tmux TUI | 解析 Claude Code TUI 状态栏文本（`esc to interrupt` 等）判定状态；仅 Claude Code |
| [stwalsh4118/navi](https://github.com/stwalsh4118/navi) | tmux TUI | Claude hooks 写 `~/.claude-sessions/*.json`，TUI 轮询；支持 SSH 远程聚合；仅 Claude Code |
| [johnrobinsn/claude-watch](https://github.com/johnrobinsn/claude-watch) | tmux TUI | hooks 驱动状态；仅 Claude Code |
| [xbunax/agent-tmux-notify](https://github.com/xbunax/agent-tmux-notify) | tmux popup | 需要输入时弹 curses 弹窗；仅 Claude Code |
| [pablobfonseca/claude-session-manager](https://github.com/pablobfonseca/claude-session-manager) | tmux popup | 扫描进程树 + 终端输出判态；仅 Claude Code |
| [lnds/lonko](https://github.com/lnds/lonko) | Rust TUI | 监控 + 在面板内回答权限提示；仅 Claude Code |
| [Tahasadiki/claude-tmux-status](https://github.com/Tahasadiki/claude-tmux-status) | tmux 状态栏 | 事件驱动、零轮询，状态进 tmux status bar；仅 Claude Code |
| [Omnara](https://omnara.com)（[omnara-ai/omnara](https://github.com/omnara-ai/omnara)） | 商业 SaaS + iOS/Android | 手机控制 Claude Code/Codex；**开源版已停维护**，新版闭源 SaaS、数据经其云端；仅覆盖其托管启动的会话 |
| [Vibe Kanban](https://vibekanban.com)（BloopAI，26k+ star） | 本地 Web 看板 | 任务编排/worktree/审查为中心，"由它启动 agent"才可管理；不聚合外部已运行的会话，不覆盖云端 agent |
| [Conductor / Crystal 等 worktree 管理器] | 桌面 App | 并行 worktree 运行 Claude，属"启动器"而非"聚合收件箱" |

## 二、能力矩阵

| 能力 | ccmux | agent-dashboard | orch | recon/navi 等 | Omnara | Vibe Kanban | Omnigent | **我们（AttnBox）** |
|---|---|---|---|---|---|---|---|---|
| 依赖 tmux | ✅必须 | ✅必须 | ✅必须 | ✅必须 | ❌（包装 CLI） | ❌（自己启动） | ❌（包装/启动） | **❌ 只读日志/API，不要求 tmux** |
| 需要"由它启动 agent" | ❌发现已有 | 部分 | ✅ | ❌ | ✅（omnara 命令包装） | ✅ | ✅（import 仅一次性快照） | **❌ 零侵入发现已有会话** |
| Claude Code | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Codex CLI | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Gemini CLI | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **云端 agent（Devin/Cursor Cloud/Copilot cloud agent）** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌（自建 sandbox 不算） | **✅ 核心差异化** |
| "等我干什么"分类（审批/提问/审 PR） | ✅（本地） | ✅（本地） | ❌ | 部分 | 部分 | ❌ | ✅（仅它启动的会话） | ✅ 本地+云端统一 |
| 移动端一等公民 | ❌ | ✅ PWA（局域网） | ❌ | ❌ | ✅（数据出本机） | ❌ | ✅（server 账号体系） | **✅ 响应式 Web，隐私优先默认不出本机** |
| 桌面通知/远程动作 | ✅ | ✅ | ❌ | 部分 | ✅ | ❌ | ✅ | ✅（M2） |
| 隐私（数据不出本机） | ✅ | ✅ | ✅ | ✅ | ❌云端 | ✅ | ✅可自托管 | ✅默认 |
| 无 tmux 也可用 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |

## 三、结构性缺口（全行业逐项对照）

1. **云端 agent 盲区**：上述所有工具都只覆盖"跑在本机终端里的 agent"。Devin、Cursor Cloud Agents、GitHub Copilot coding agent 都有公开 API 且状态里明确含"等用户"语义（见 docs/FEASIBILITY.md），无人聚合。开发者的注意力实际分散在 终端 + 各家 Web 控制台 + GitHub PR 页 三处。
2. **tmux 锁定**：8/10 竞品硬依赖 tmux。用 VS Code 集成终端/普通终端/多台机器的用户被排除。我们以"只读会话日志文件 + 云 API"为主信号源，tmux 仅作可选增强（跳转/贴附）。
3. **移动端**：只有 agent-dashboard（局域网 PWA）和 Omnara（数据出本机的闭源 SaaS）做了手机端。"隐私优先 + 移动一等公民"组合是空白。
4. **统一"注意力"语义**：竞品各自定义 working/waiting/idle，且只对单一 agent 品类。没有一个跨品类的统一模型（谁在等我 → 等我做什么：approve / answer / review PR / unblock）。

## 四、我们必须坚持的差异化（逐条对照结论）

| 差异化主张 | 竞品现状 | 结论 |
|---|---|---|
| 本地 + 云端统一收件箱 | 全部只做本地 | ✅ 无直接竞争，且各家 API 已可行 |
| 零侵入只读采集（ccusage 式 adapter） | ccmux/navi 已验证本地可行，但绑 tmux | ✅ 复用思路、去掉 tmux 依赖 |
| 移动端一等公民 + 数据默认不出本机 | 二者不可兼得（agent-dashboard 局域网 / Omnara 云端） | ✅ localhost 面板 + 响应式，后续可选自托管中继 |
| 现代 Web 设计语言（Tailwind + shadcn/ui） | 竞品全为 TUI 或简陋 PWA | ✅ |

## 五、实测记录（2026-08-04，Ubuntu 22.04 / Node 22 / Go 1.25 / Bun 1.3.14）

- **ccmux**：`bun install`（319 包）成功；`bun run src/index.ts status` 正常输出配置与守护进程状态；daemon 可启动。源码结构：`src/daemon/adapters/{claude,codex,cursor,copilot,opencode,...}`，claude 走 `~/.claude/projects/*.jsonl` 日志 + hooks（Notification/Stop）双通道，codex 走 `~/.codex/sessions/**/rollout-*.jsonl` 解析。
- **agent-dashboard**：`go build ./cmd/dashboard` 成功；TUI 正常启动（截获画面 "No agents found"）；需 `~/.agent-dashboard/`；adapter 依赖 Claude hooks + JSONL 转录 + `tmux capture-pane`；PWA 走 `make web`。
- **omnigent**（2026-08-05 补录，ROUND-30）：`uv tool install omnigent`（0.8.2）成功（裸 pip 3.12 下 ResolutionImpossible）；`omnigent server --background` 起 web UI（127.0.0.1:6767），侧栏含 Inbox 页（"Nothing waiting on you — when an agent needs your input…"）；`omnigent import --harness claude` 可一次性导入本地 Claude 会话（只读快照，无后续实时状态）。定位是元 harness：**只看得见由它启动的会话**，不聚合已有原生会话，也不覆盖云端 agent（Devin 等）；手机端走其 server 账号体系。详见 docs/gap/GAP-ROUND-30.md。
- **orch**：`go build ./cmd/orch` 成功；`orch init` 建库、`orch ps` 正常；无状态检测（不判 waiting），本质是 tmux 会话启动器 + 消息总线；已停更（0 star）。
