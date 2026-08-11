# GAP-ROUND-679：第五十八批竞品扫描——盯防全查、无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-668 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★5,975（较 round-668 的 5,970 微增），仍为控制面/编排定位（任务派发、成本、治理），非"谁在等你"注意力收件箱；无方向变化。
- AgentBell：产品面继续双线——macOS 菜单栏监控（Cursor/Claude Code/VS Code/OpenClaw 状态+提醒）+ iOS/iPad 统一审批收件箱（Claude Code/Codex bounded confirm/deny/choice/form，需连接器）。移动审批重合仍最强，但依然无云 agent（Devin 等）聚合，且以"companion/桌宠"体验为主线；盯防级别不变。
- grove（GarrickZ2）：★41，继续向 ACP 多 agent IDE 演进（Web IDE/Tauri/TUI/移动 HMAC 配对/语音），"attention inbox"叙事被 IDE 化路线稀释，方向分化延续；本地-only 不覆盖云 agent。
- agentmux（agentmuxai）：平台化叙事稳定（Agent App API、interagent 通信、Rust 后端），无 waiting-on-you 聚合新动向。
- Steer（BrendanGraham14/steer）：★130，仍是单 agent TUI/服务器方向，无收件箱化动向。
- claude-dispatcher：原仓库 404 第八轮延续，视为退出。
- psts/ccmux：★0，无进展（第三轮复核无变化）。
- Smoke Signal / fleetview / herdr 生态 / kookr / claude-notify / agent-inbox / trail-boss / jind-ai / Pulser / agent-notify / jarvis：搜索面无新版本或方向性动向。

## 新进入者扫描

- "unified attention inbox / waiting on you agent" 多向搜索首位命中仍为 attnbox 本身。
- 新出现项目均为相邻象限：backchannel（agent 间异步消息）、dispatch（Claude Code 后台 worker 扩容）、ccmanager（多 CLI 会话管理器）、claude-session-manager 系（tmux 会话切换）——均无"本地+云 agent 统一 waiting-on-you 聚合"。
- 邮件侧 "waiting on you"（Wizard/Norian/Demi）为人际邮件跟进赛道，非 agent 注意力，不入档。

## 结论

- 核心差异化（本地 CLI + 云 agent 统一注意力聚合、waiting 详情+行动链接、token 门禁自托管）仍无直接对手。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
