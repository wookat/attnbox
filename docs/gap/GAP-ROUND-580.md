# GAP-ROUND-580：第四十九批竞品扫描——Pushary/notiformer 入档，差异化不变

日期：2026-08-10
驱动维度：竞品调研（round-569 后首次；盯防名单每轮必查 + 三向新进入者扫描）

## 盯防名单动向

- **mission-control（builderz-labs）**：升至 ~6,000★，自托管 agent 控制面（dispatch/审查/花费追踪，OpenClaw/Claude Code/Codex 多 runtime）持续演进；编排象限，无「谁在等你」分诊语义。另一同名 crshdn/mission-control 走 Autonomous Product Engine 方向（v2.5.1 Repo Setup/PR checks 恢复面板），正交。
- **Steer（ilwonyoon/steer_ai）**：iPhone inbox 叙事继续打磨（"quiet inbox"、卡片式提问+建议答案一键回）；仍是 Mac companion wrapper 侵入 + Apple 账户绑定，无云端 agent、无 web。
- **ccmux（skzv）**：高速迭代不减——OpenRouter spend/跨 agent usage、ccmux-mcp 接入 Claude Code 向导、live Claude 模型目录；编排+用量方向深化，本地 tmux 面不变。
- **kookr**：最后推送仍为 2026-07-19，静默窗口延续。
- **Claude Code agent view**：官方文档面持续完善（`claude agents` 常驻 docs），单 vendor 本地边界不变。

## 新进入者

- **Pushary**（入档观察）：手机推送审批收件箱——Claude Code/Codex/Cursor/Windsurf/MCP 多 agent 统一 inbox、锁屏一键 approve/deny/回复、Slack/webhook 路由、规则化自动放行。语言重合强（"needs a decision" 收件箱），但为托管推送服务（云中转），无本地 daemon/隐私边界、无云端 agent（Devin）聚合、无 waiting 时长/ack 分诊台账。
- **notiformer**（存档）：SDK 化 approval gate（`ask()` 阻塞审批+push/Telegram/Slack），面向代码内嵌入而非会话发现，正交。
- **AgentMail**（存档）：给 agent 配邮箱，方向正交。

## 三向搜索

"agent attention inbox waiting on you" 首位命中仍为 attnbox。跨 vendor（本地零侵入发现 + 云端 API）+ 移动 PWA + ack 分诊 + 诚实置信度语义的组合仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
