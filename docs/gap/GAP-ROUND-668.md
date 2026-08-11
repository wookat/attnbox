# GAP-ROUND-668 — 竞品第五十七批扫描（无 P0/P1）

日期：2026-08-04。主驱动：竞品调研（round-657 后首次）：盯防名单每轮必查 + 新进入者扫描。

## 盯防名单复查

| 项目 | 动向 | 评估 |
| --- | --- | --- |
| mission-control（builderz-labs） | ★5,970 持平（round-657 同值）；v2.0.0 已为基线（agent operations console 定位），无新方向变化 | 控制面/派单象限，非注意力收件箱，维持盯防 |
| agentmux（agentmuxai） | 最新 release v0.53.0（07-11），last push 07-13——平台化后静默窗口延续（round-657 首现） | Rust 本地 agent 操作环境，无云端聚合/ack 台账，维持观察 |
| grove（GarrickZ2） | 演进为 "Kanban-style TUI / ACP-native multi-agent IDE"：十个内置 agent、MCP 全 UI 动作、Blitz 实时流视图；attention inbox 语言弱化为 hooks 通知 | 从 round-657 的高同构收敛为并行运行器+IDE 象限，纯本地 tmux；具名盯防维持但方向分化 |
| Smoke Signal / psts/ccmux / claude-dispatcher | 本轮搜索无新信号（claude-dispatcher 404 第七轮延续） | 维持存档 |

## 新进入者

- **AgentBell: Code Companion**（App Store，深圳启思网络）：iPhone/iPad "unified inbox for AI coding agents"——Claude Code/Codex 审批请求的移动端 human-in-the-loop 决策中心（confirm/deny/choice/form 有界响应、执行回执、30 天台账）。移动审批语言重合迄今最强（Steer/Pushary 象限的产品化升级），但需 Mac 端连接器接入（侵入式）、无云 agent（Devin）聚合、无 waiting-reason 收件箱/键盘分诊；下载 <1k。**升具名盯防**。
- **backchannel**（unison-labs-ai，★2）：agent 间异步消息队列（"agents talking behind your back"），跨 harness 跨机——面向 agent-to-agent 协调而非 human attention，正交象限，存档。
- **GT-Office**（Laplace-bit，★14）：Tauri 桌面多 agent 工作区（Claude Code/Codex/Gemini + 终端/文件/Git + 频道通知），ccmux/agentmux 象限，纯本地桌面，存档。

## 定位核验

"agent attention inbox waiting on you" 搜索首位命中仍为 attnbox。核心差异化不变：本地零侵入日志读取 + 云端（Devin）聚合 + waiting 原因/预览 + ack 跨设备台账 + PWA 移动端，无直接对手。

## 结论

无 P0/P1。AgentBell 升具名盯防（移动审批产品化最强）；grove 方向分化注记；纯文档轮。
