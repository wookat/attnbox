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

## 四之二、2026-08 新出现同类扫描（2026-08-06，检索 + README 核对，未实测）

一批 2026 年新项目围绕"人-agent / agent-agent 协作"出现，逐个核对后均不构成对我们核心定位（聚合**已存在的**本地会话 + 云端 agent 的注意力收件箱）的直接竞争，但验证了"human escalation queue / unified inbox"措辞正在成为行业共识：

| 项目 | 形态 | 与我们的差异 |
|---|---|---|
| [dbarkman/ProjectDispatcher](https://github.com/dbarkman/ProjectDispatcher) | 工单看板 + 心跳编排 daemon | "由它派发工单启动 agent"的编排器，Human 列即收件箱；不发现已有会话，不覆盖云端 agent |
| [Nyankoro2856/crewmail](https://github.com/Nyankoro2856/crewmail) | 文件消息总线 + MCP | agent 之间互发消息 + HUMAN 升级队列；是 agent 侧协议，不是人的聚合视图 |
| [salimfadhley/agent-inbox](https://github.com/salimfadhley/agent-inbox) | SQLite 邮箱 + HTTP/MCP | 同上（agent 互发邮件），自己诚实声明"运行中的 LLM turn 无法被外部打断" |
| [yonidavidson/agentcomm](https://github.com/yonidavidson/agentcomm) | CLI 邮箱，六种后端 | agent-agent 总线（repo 即总线），无人类注意力视图 |
| [msanchezdev/agent-bridge](https://github.com/msanchezdev/agent-bridge) | 文件群聊 skill | Claude Code 实例间群聊，按项目命名空间 |
| [solo-agent/solo](https://github.com/solo-agent/solo) | 本地 workspace（频道/任务板） | "由它协调"的工作台（Claude/Codex/OpenCode 等），非零侵入聚合，无云端 agent |

结论：新增竞争都落在 **agent-agent 通信/编排** 象限；"零侵入聚合已有本地会话 + 云端 agent、移动一等公民、隐私默认不出本机"的组合仍无直接对手。需持续监测 ProjectDispatcher/solo 是否长出"发现已有会话"能力。

## 四之三、2026-08 第二批扫描（2026-08-07，README/spec 核对，未实测）

本批发现了迄今**最接近我们定位**的新项目：

| 项目 | 形态 | 与我们的差异 |
|---|---|---|
| [Jainil-Gosalia/pulse-protocol](https://github.com/Jainil-Gosalia/pulse-protocol)（Agent Pulse，2026-07-18 建，1 star，Python） | 开放协议 + 参考实现（collector + WebSocket dashboard + 各 agent adapter） | 定位几乎同文案（"One inbox for every AI coding agent… which agent needs you right now"）；覆盖 Claude Code/OpenCode/Kilo/Codex/Cursor 本地 CLI，走 adapter 主动上报（push 协议），**不零侵入发现已有会话、不覆盖云端 agent（Devin 等）**。超出我们的能力：away-mode 远程 Allow/Deny 审批、从面板给 agent 排队 follow-up、"blocked waiting on you" 时长分析、ntfy 推送开箱即用 |
| [AnkushinDaniil/grove](https://github.com/AnkushinDaniil/grove)（2026-07-20 建，0 star，Go，beta） | 树状 agent 编排器（worktree per task）+ 内嵌 web UI | attention inbox 是其编排树的一个子功能（hook-first "needs you" 检测 + 通知 + 深链）；属"由它启动/编排"象限，不聚合外部已有会话，无云端 agent；移动 PWA 在路线图 |

结论（2026-08-07）：核心差异化（云端 agent 聚合 + 零侵入发现）仍无对手，但 **"unified attention inbox" 赛道开始有直接同文案的进入者**。pulse-protocol 的 away-mode 远程审批与注意力时长分析是值得评估的功能方向（我们对 Devin 已有 act-in-place 回复；本地 agent 的远程审批受零侵入约束，需 hook 双向通道才可行，暂记 P2）。两项目当前 star≈0/1、单人项目，威胁等级低，下轮继续监测。

## 四之四、2026-08 第三批扫描（2026-08-07 晚，README 核对，未实测）

| 项目 | 形态 | 与我们的差异 |
|---|---|---|
| [austinwilcox/tmux-agentwatch](https://github.com/austinwilcox/tmux-agentwatch)（2026-08-01 建，0 star，Shell） | tmux 插件 | hook 驱动 waiting 检测 + 桌面通知 + "跳到等最久的 pane"；作者自述动机是"不想为 herdr 之类放弃 tmux"——继续验证注意力信号需求，但绑 tmux、仅本地、无云端 agent |
| [oleg-vasilyev/claude-notify](https://github.com/oleg-vasilyev/claude-notify)（2026-08-06 建，0 star，TS/Windows） | Telegram 通知器 | 仅 Claude Code；亮点是"在座与离席"判定——人还在键盘前不推送，离开后才入队推送，并附限额窗口状态。此"presence-aware 通知"思路值得记录：我们的 webhook 通道无 presence 概念，收件箱开着也会 POST（用户端点自行去噪），暂记观察项而非 P2（零侵入下浏览器侧已有标签页可见性可利用，触发条件：用户反馈通知过噪） |

结论（第三批）：仍无"本地+云端统一收件箱"竞争者；本批两项目继续印证需求存在且碎片化（tmux 端、Telegram 端各取一角）。ccmux/pulse-protocol/grove 自上批扫描以来零注意力面新动向（pulse-protocol 停更 8 天、grove 13 天）。

## 四之五、2026-08 第四批扫描（2026-08-07 深夜，README 核对，未实测）

赛道明显升温：GitHub 搜索 "attention + coding agent" 24 小时内新推送的直接相关项目就有 5+ 个。

| 项目 | 形态 | 与我们的差异 |
|---|---|---|
| [kookr-ai/kookr](https://github.com/kookr-ai/kookr)（3 star，TS/Node≥22，带 CI/文档站/演示视频） | "smart attention router"——本批完成度最高 | hooks+转录+托管终端三通道监控 Claude/Codex 本地会话，"解释哪个最紧急并路由过去"；比我们多"紧急度排序/解释"层，但仅本地 CLI、无云端 agent，且倾向托管会话（非零侵入象限） |
| [dkomlen/kelpie](https://github.com/dkomlen/kelpie)（2 star，npm 包） | read-only attention board | 哲学与我们最像（只读、永不代答/代批），甚至同用 npx 分发；但仅 Claude Code、仅本地、无 ack/回复/云端 |
| [centauri-ai/coslash](https://github.com/centauri-ai/coslash)（0 star，Go+Node，macOS only，brew 分发） | "attention layer" | 亮点是会话上下文重建（目标/决策/文件/提交/下一步）+ 冷启动交接简报——超出我们的能力，值得记录；仅本地 Claude/Codex，无云端 |
| [zane-byte-dev/atm](https://github.com/zane-byte-dev/atm)（0 star，Go，中文） | "AI 团队管理面板" | 注意力+成本（花了多少钱）视角；本地索引，无云端 |
| [ContactEstablished/Chorus](https://github.com/ContactEstablished/Chorus)（0 star，桌面 app） | BYOK 命令中心 | "attention is the scarce resource" 同理念；由它启动/编排象限（worktree per agent + 注意力分钟数计费），不聚合已有会话，无云端 |

结论（第四批）：**核心差异化（云端 agent 聚合 + 零侵入发现已有会话 + 本地/云统一视图）仍无任何对手**，但"attention layer/inbox/router"已从零散需求变成命名明确的赛道，单日多项目进场。值得评估的方向：kookr 的紧急度排序/解释、coslash 的交接简报（均暂记观察项，触发条件：dogfood 中 waiting 项多到需要排序时转 P2）。omnara（2.7k star）与 omnigent（8.2k star）持续活跃，但象限未变（自有编排/harness）。

## 四之六、2026-08 第四批复扫（2026-08-07，commit 流核对）

升温后缩短监测间隔的首次复扫（第四批入档次日）：

- **kookr**：单日 5+ merge（PR 编号已到 #2172——迭代速度极高），方向为性能隔离/挂起任务收割（reaper + 用户否决）/共享授权治理；仍无云端 agent 迹象。**本批最需持续监测的对手**。
- **kelpie**：日更中；README 撤掉了 "read-only" 定语（新增 restart/stop 等控制面），并修了"board 藏在窗口后空白"“隔夜页面陈旧”等打磨项——从只读板向常驻 app 演化。
- **ccmux（#126）**：**修复了 Escape 陈旧 waiting（其 #117，即我们 round-72 决定不修的同类问题）**——手段是 tmux `capture-pane` 的"正面画面证据"（画面证明权限提示已消失才撤 waiting，非超时）。该信号依赖 pane 捕获，我们的零侵入只读转录约束下不可用，round-72 的不修决策仍成立，但 LIMITS 措辞已同步（ccmux 已用我们没有的信号修复）。
- coslash/atm/Chorus/pulse-protocol：无注意力面新动向。

结论：定位无变化（云端聚合仍无对手）；kookr 迭代速度值得每轮竞品扫描必查。

## 四之七、2026-08 第五批扫描（2026-08-07 晚，ROUND-122）

主要对手动向：

- **kookr**：持续高频（当日又 +2 merge：pty fd 泄漏修复、完成态历史与热路径隔离）；方向仍是自有编排 fleet 的稳定性/性能，无云端聚合迹象。
- **ccmux**：TUI 打磨（对话框样式统一）；注意力面无新动向。
- kelpie/coslash：无新动向。

新进入者（均 0 star、Python、当日索引）：

| 项目 | 定位 | 与我们的差异 |
|---|---|---|
| [davidnietzsche/david-claude-hud](https://github.com/davidnietzsche/david-claude-hud) | macOS 常驻 HUD："哪个 Claude 会话刚完成/在等你" | 单 agent（Claude）、单平台（macOS）、无云端 |
| [joshlindsey-ops/agent-inbox-dispatcher](https://github.com/joshlindsey-ops/agent-inbox-dispatcher) | "agent inbox" 派发器（AI 收件箱+关联 token） | 是 agent 间消息总线而非人的注意力面 |
| [LeslieWo/cc-office](https://github.com/LeslieWo/cc-office) | Mac 上所有 Claude Code 窗口实况："谁在干活、谁在等你、谁卡住了" | 单 agent、单平台、窗口级视角、无云端 |

观察：**"who is waiting on you" 已成为新项目 README 的标准句式**（cc-office/claude-hud 原文），赛道语言完全收敛到我们 round-1 的定位表述；但新进入者仍全部停留在"单 agent + 单平台 + 本地"，云端聚合 + 跨 agent 统一视图的差异化持续无对手。

## 四之八、2026-08 第六批扫描（2026-08-07 深夜，ROUND-131）

主要对手动向：

- **kookr**：当日 10+ merge（PR 已到 #2178）：容量吞吐判定、FAA ack-path reaper、starvation-scout 自适应冷却、pty fd 泄漏修复、共享授权 grant 清理——全部是自有编排 fleet 的内部件；仍无云端聚合迹象。每轮必查继续。
- **kelpie**：仓库已 404（round-127 发现，删库或转私有）——最接近我们只读哲学的进入者退出公开赛道。
- **ccmux**：仅 TUI 对话框/提示行样式打磨，注意力面无动向。coslash 无实质更新。

新进入者：

| 项目 | 定位 | 与我们的差异 |
|---|---|---|
| [hasannaveed/agent-deck](https://github.com/hasannaveed/agent-deck)（"Agent Switchboard"，0 star，当日建，Electron+TUI+daemon） | 本地面板：Codex/Claude/OpenCode 会话"working/waiting for you/finished but unread"，点击跳转 tmux/WezTerm/kitty/Zellij/GNOME Terminal | 迄今与我们本地面重合度最高的新进入者（多 agent、SQLite+SSE、hooks+进程发现双通道、明确反对"整个历史变收件箱"）；但仅 Linux 本地、无云端 agent、无 ack/回复，含 Electron 常驻窗与终端跳转（超出我们范围的桌面人体工学，记观察项） |

观察：新进入者已从"单 agent 单平台"演进到"多 agent 本地 + 终端跳转"，本地面竞争在加密；云端聚合 + 本地/云统一视图差异化仍无对手。agent-deck 的"点击跳转到终端会话"是值得记录的方向（我们 P2 台账已有本地行动面约束——零侵入下 URL 打不开终端，暂无对等能力）。

## 四之九、2026-08 第七批扫描（2026-08-07 深夜，ROUND-138）

主要对手动向：

- **ccmux**（116 star）：注意力面本轮有实质动作——#126 修掉了 Escape 陈旧 waiting（issue #117，用 pane 正面证据即时降级，替代其早期方案），并把"handoff"（把会话上下文移交另一 agent/pane，含投递门禁、来源 cwd 校验、pick 模式）做成了完整功能面。它在向"注意力 + 行动/移交"演进，但仍是 tmux 本地宇宙、无云端 agent。其 stale-waiting 信号依赖 `capture-pane`（侵入式读屏），零侵入约束下我们仍不可用——round-72 不修决策不变，LIMITS 已有措辞无需再改。
- **kookr**（3 star）：持续高频（PR 已到 #2181），本轮为 TUI 对话框焦点/性能序列化等内部件；仍无云端聚合。每轮必查继续。
- **agent-deck**：round-131 后继续迭代（GNOME Wayland 焦点连接器、OpenCode prompt 跟踪、新机安装文档）——单人项目在认真推进，仍 0 star、仅 Linux 本地。
- **coslash**：description 扩写为"attention layer + 会话重建 + handoff brief"（与 round-109 观察项同向），但无提交动作。**kelpie** 仍 404。

观察：两个本地对手（ccmux/coslash）都在向"注意力面之上加行动/移交"演进，验证了我们 round-109 记的 P2 观察项（waiting 交接简报）方向；但全部仍无云端聚合。核心差异化不变，无 P0/P1。

## 四之十、2026-08 第八批扫描（2026-08-08 凌晨，ROUND-144）

主要对手动向：kookr/agent-deck/ccmux/coslash 自 round-138 以来均无新推送（各自当日最后一推即 round-138 已核对的内容）；kelpie 仍 404。

新进入者：

| 项目 | 定位 | 与我们的差异 |
|---|---|---|
| [kay-ws/herdr-island](https://github.com/kay-ws/herdr-island)（Shell 插件） | herdr（25.5k★ 元 runtime）的面板过滤器："找出在等你的 agents，显示每个停下的原因" | 依附 herdr 生态：只覆盖 herdr 启动的会话，无原生/云端聚合。信号意义在于**头部 runtime 生态开始以"waiting on you"为一等过滤维度**（与 omnigent 内置 Inbox 同向） |
| [RajdeepKushwaha5/nMn](https://github.com/RajdeepKushwaha5/nMn)（PowerShell） | VS Code 内自动确认 Claude Code 权限提示，"长跑不因等你而停" | 反方向方案：消灭 waiting 而非呈现 waiting（自动批准，安全面存疑）；单 agent 单编辑器 |
| [oleg-vasilyev/claude-notify](https://github.com/oleg-vasilyev/claude-notify)（TS，与 round-98 同名项目不同作者） | Claude Code waiting 时发 Telegram，且"只在你真的离开后"才推 | presence-aware 通知的又一实现（round-98 观察项方向持续被验证）；单 agent、推送通道绑定 Telegram |

观察：本地对手动向平静；生态信号是重点——25.5k★ 的 herdr 生态出现"waiting on you"官方式插件，注意力过滤正成为 agent runtime 的标配维度。我们的差异化（跨 runtime/原生会话/云端统一聚合、零侵入）仍无对手，但"每个 runtime 自带注意力面"会蚕食单 runtime 用户的聚合需求，继续每轮盯防。无 P0/P1。

## 四之十一、2026-08 第九批扫描（2026-08-08，ROUND-153）

主要对手动向（round-144 后恢复活跃）：

- **kookr**（kookr-ai/kookr，★3）：持续高频（#2178–#2181，单日 4+ 合并）：容量/吞吐 verdict、ack-path reaper、a11y 细节（Escape 关闭+焦点陷阱）——工程质量高但仍无云端聚合迹象。
- **ccmux**（epilande/ccmux，★117）：TUI 样式统一、opencode 适配修复、**relay skill 从 dispatch 拆出**（#128）——"注意力+行动/移交"方向继续推进（round-138 示警持续成立）。
- **coslash**：小步提交（amend 检测边界修复），方向未变。
- **agent-deck**（asheone00/agent-deck）：仓库已 404（继 kelpie 后第二个退出公开赛道的盯防对象）；同名 AgentDeck 项目多为"启动器/仪表盘"（puritysb/AgentDeck ★183 实体控制器、vfarcic/dot-agent-deck ★97 终端仪表盘），非同赛道。
- **kelpie 回归**：misty-step/kelpie 复活（★1，当日活跃）——定位改为"herdr 终端工作区 agent 舰队的 phone-first 分诊台"，绑定 herdr 生态；与 round-144 的 herdr-island 同向，herdr 生态注意力面持续加厚。
- herdr-island 本体无新推送。

观察：赛道两极化——依附头部 runtime 生态（herdr 系）或单 runtime 深耕（kookr/ccmux），**跨 runtime + 原生会话 + 云端统一聚合的零侵入定位仍无对手**。ccmux relay/移交与 kelpie phone-first 都指向 round-109 交接简报观察项方向，维持 P2 不触发。无 P0/P1。

### 当日跟进（ROUND-159）

kookr 增补 operator 可调 `quotaHeadroomThreshold`（节奏不变，仍无云端）；kelpie 桌面客户端高频冲刺（15 分钟 5 提交：provider 标识/会话元数据/转录打磨），仍绑定 herdr；ccmux/coslash/herdr-island 无新推送；三日窗口新进入者扫描为空——数批以来首个安静窗口。差异化不变，P2 无触发。详见 `docs/gap/GAP-ROUND-159.md`。

### 第十一批跟进（ROUND-168）

kookr 仍极高频（单日 15+ 提交：Sweep 确认弹窗焦点陷阱、plugin dir 契约测试、task-tail 紧凑序列化），无云端迹象；ccmux 补 opencode 时间戳修复并把 relay 技能从 dispatch 拆分（移交面继续演进）；coslash 发布 v0.0.1 README（"attention layer for coding agents"定位落文档，git commit 监控向，仍仅本地）；kelpie 桌面端继续冲刺（composer 布局对齐 Codex desktop、provider/model 标识），仍绑 herdr。三日窗口新进入者扫描为空（连续第二个安静窗口）。跨 runtime+云端零侵入聚合差异化不变，P2 无触发。详见 `docs/gap/GAP-ROUND-168.md`。

### 第十二批跟进（ROUND-176）

kookr 高频持续（pipelineStarvation 计数入 status、协作 peer URL 拒绝云元数据/link-local——安全面动作，仍无云端聚合）；ccmux 自 relay 拆分后无新推送；coslash 无新推送；kelpie 发布 VISION.md——定位原话 "the operator console for a fleet of coding agents"、"the operator's scarce resource is attention, not terminal windows"（与我们 round-1 注意力定位语言完全同源），并明确单人操作者、herdr/omp 生态内、非托管服务。新进入者一个入档：Innovology/claude-dispatcher（9★，"terminal cockpit for a factory of Claude Code sessions"，tmux+多 repo 分诊 lens，仅 Claude、仅本地、由它 dispatch 的会话）。跨 runtime+原生会话+云端零侵入聚合仍无对手，P2 无触发。详见 `docs/gap/GAP-ROUND-176.md`。

### 第十三批跟进（ROUND-186）

盯防五家全活跃：kookr 高频不减（quotaHeadroomThreshold、FAA ack-path reaper、node-pty FD 泄漏修复，仍无云端）；ccmux relay 技能触发词放宽 + opencode 浮点秒时间戳修复；coslash 转向 git commit 监控细化（amend 检测、heredoc 处理）；kelpie 桌面端持续冲刺 + 键盘导航（仍绑 herdr）；claude-dispatcher 发力 Windows 支持 + cockpit 默认化（仍 Claude-only）。新进入者三个入档：beknazar/agentfleet（远程多机 fleet 控制面，每机本地算状态写 JSON、laptop 聚合按"blocked on you"排序——多机本地面最接近者，无云端 agent API）；dkomlen/waiting-on-me（Claude 技能，一条命令并发扫 PR/review/Linear/Slack/后台任务/idle 会话/记忆七源——跨源注意力聚合理念同源，但 pull 式一次性 glance 而非常驻收件箱）；chron/streamdeck-agents（Stream Deck 硬件外设化 waiting 提醒，Claude-only 单机）。赛道验证信号增强：三个新进入者全部使用 "waiting/blocked on you" 语言。跨 runtime+云端零侵入聚合+常驻移动端收件箱仍无对手，P2 无触发。详见 `docs/gap/GAP-ROUND-186.md`。

### 第十三批短窗复核（ROUND-197）

round-186 后的短窗复核（数小时窗口）：八盯防（含三个新进入者）基本平静——仅 ccmux 收紧 README 文案、agentfleet 落第一次真实云机端到端 provision 修复（确认其已从 demo 走向实用，多机本地面对手保持观察优先级）；kookr/coslash/kelpie/claude-dispatcher/waiting-on-me/streamdeck-agents 无新推送；新进入者扫描无新增。差异化不变，P2 无触发。详见 `docs/gap/GAP-ROUND-197.md`。

## 五、实测记录（2026-08-04，Ubuntu 22.04 / Node 22 / Go 1.25 / Bun 1.3.14）

- **ccmux**：`bun install`（319 包）成功；`bun run src/index.ts status` 正常输出配置与守护进程状态；daemon 可启动。源码结构：`src/daemon/adapters/{claude,codex,cursor,copilot,opencode,...}`，claude 走 `~/.claude/projects/*.jsonl` 日志 + hooks（Notification/Stop）双通道，codex 走 `~/.codex/sessions/**/rollout-*.jsonl` 解析。
- **agent-dashboard**：`go build ./cmd/dashboard` 成功；TUI 正常启动（截获画面 "No agents found"）；需 `~/.agent-dashboard/`；adapter 依赖 Claude hooks + JSONL 转录 + `tmux capture-pane`；PWA 走 `make web`。
- **omnigent**（2026-08-05 补录，ROUND-30）：`uv tool install omnigent`（0.8.2）成功（裸 pip 3.12 下 ResolutionImpossible）；`omnigent server --background` 起 web UI（127.0.0.1:6767），侧栏含 Inbox 页（"Nothing waiting on you — when an agent needs your input…"）；`omnigent import --harness claude` 可一次性导入本地 Claude 会话（只读快照，无后续实时状态）。定位是元 harness：**只看得见由它启动的会话**，不聚合已有原生会话，也不覆盖云端 agent（Devin 等）；手机端走其 server 账号体系。详见 docs/gap/GAP-ROUND-30.md。
- **orch**：`go build ./cmd/orch` 成功；`orch init` 建库、`orch ps` 正常；无状态检测（不判 waiting），本质是 tmux 会话启动器 + 消息总线；已停更（0 star）。
