# GAP-ROUND-844 — 第七十三批竞品扫描（纯文档）

Round 844. 主驱动：竞品调研（round-833 后首次全查）。

## 重点盯防

- **yepanywhere**（★~470）：官网叙事定格 "All your coding agents on every
  device"，Tiered inbox（Needs Attention → Active → Recent → Unread）、
  push notifications、remote device control（Android 模拟器 WebRTC 串流）
  维持；Android app 仍开发中、iOS 之后。无新方向性动向，维持重点盯防。
- **AgentBell**：双线格局明确化——iOS "AgentBell: Code Companion"（MWM
  发行）定位 "personal trusted decision center"：统一收件箱聚合 Claude
  Code/Codex 请求、bounded responses（confirm/deny/choice/form）、执行
  回执生命周期；Mac 菜单栏版（agentbell.dev）扩展 OpenClaw 监控 + 使用
  仪表盘 + 空闲 RSS 播报。waiting/approve 面重叠度仍名单最高，但无云端
  聚合与行动链接。维持重点盯防。
- **AO**（aoagents.dev）：叙事收敛为 "Tell the orchestrator what you
  need"——每项目一个主 agent 跑 fleet、"escalates only what needs a
  human"；看板 working/needs you/in review/ready to merge 四列 +
  PR CI/review 反馈自动回路 + 25 harness + 移动 companion（LAN/
  Tailscale）。定位仍 fleet 编排。维持具名盯防。

## 具名盯防

- **AgentPeek**：26 agents 含 Devin 不变；in-notch 应答覆盖 Devin、
  Devin desktop 会话 view-only；新增 usage 读数含 Devin 本地 CLI
  session 数据库月度 token。本机路径非云聚合。无升级动向。
- **DorkOS**：叙事转向 "Intelligence doesn't scale. Coordination
  does."——scheduling/messaging/agent discovery 平台化（GitHub
  dork-labs/dorkos ★5，npm 0.57.0 @2026-08-03，Windows alpha
  installer）；cockpit 面（approve/deny from phone、schedule、
  session 记录）保留。"agent stuck waiting for you" 痛点叙事仍同源，
  维持偏具名盯防候选。
- claude-dispatcher：404 第二十三轮。

## 新进入者

- **konsole-pal**（PyPI v1.0.1）：入档观察——"tiny local-first
  attention router for terminal AI agents"：durable unread attention
  inbox + `next`/`ack` 命令 + 7 CLI 适配器（Codex/Cursor/Claude
  Code/Gemini/OpenCode/Copilot/Aider）+ 终端 tab 定位回跳（Konsole/
  Zellij/tmux/Kitty/WezTerm/Ghostty）。与 attnbox 差异：纯终端 tab
  路由、无 web/移动界面、无云端 agent、无行动链接；"attention
  inbox + ack" 语言同源度高，值得跟踪。

## 差异化核对

"attention inbox" 三向搜索首位命中仍为 attnbox；本地日志读取 + 云端
API 聚合 + 行动链接的三源组合仍未被任何对手直接复制。

## Verdict

无 P0/P1，纯文档轮，无 changeset。
