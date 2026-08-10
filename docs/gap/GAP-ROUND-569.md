# GAP-ROUND-569：第四十八批竞品扫描——Steer（iPhone agent inbox 上架 App Store）入档，差异化不变

日期：2026-08-10
驱动维度：竞品调研（round-558 后首次；盯防名单每轮必查 + 新进入者三向扫描）

## 盯防名单动向

- **mission-control（builderz-labs）**：v2.3.0 依赖安全补丁 + 工具链刷新；继续控制面/编排象限（dispatch/spend/runs），非注意力收件箱。
- **mission-control（crshdn，2,107★）**：转向 "Autonomous Product Engine"（Autensa v2.5.1），修了 task chat 的 stale waiting 指示——注意力语言出现但服务于自家 dispatch 会话，纯编排闭环。
- **Claude Code agent view**：仍 Research Preview；文档面强化 needs-your-input 通知（`preferredNotifChannel`、`Notification` hook `agent_needs_input`）；仍 Claude 单 vendor 本地无云端/ack 分诊。
- **ccmux**：迁址 skzv/ccmux（原 epilande 谱系之外的同名活跃仓，v0.1.27 高速迭代）：Telegram approve/deny 远控、ccmux-mcp MCP server、Moshi iOS 推送——本地 tmux 象限的"注意力+远程回答"深化，跨 vendor 但无云端 agent 聚合。
- **kookr**：last push 2026-07-19，静默期延续（round-536 观察一致）。

## 新进入者

- **Steer（ilwonyoon/steer_ai + App Store "Steer - Agent Inbox"）**：iPhone inbox for Mac 本地 CLI agents——agent 停下提问即成手机卡片、可回复注入原会话。**语言与形态重合迄今最强的移动端进入者**（"agent inbox" 原词、卡片分诊、quiet-until-waiting），但需 Mac companion *wrapper*（`steer codex`/`steer claude` 包裹启动，非零侵入日志读取）、双设备 Apple 生态绑定、无云端 agent、无 web/PWA。升具名盯防。
- **agent-monitor-for-claude（jens-duttke）**：Claude-only 本地桌面监视窗（working/waiting/permission/finished 分组+过滤），读本地 registry/转录——与我们本地启发式同源但单 vendor 无云端/移动/ack。存档。
- 三向搜索（"agent inbox waiting on you" / "which agent is waiting attention inbox"）首位命中均仍为 attnbox。

## 结论

- 差异化不变：本地零侵入 + 云端（Devin）聚合 + web/PWA 移动分诊 + ack 工作流仍无直接对手；移动端象限出现 Steer 需持续盯防。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
