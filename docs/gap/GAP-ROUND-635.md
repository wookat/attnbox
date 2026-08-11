# GAP-ROUND-635：竞品第五十四批扫描——Pulser/agent-notify 入档，无新直接对手

日期：2026-08-05
驱动维度：竞品调研（round-624 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★5,970（较 624 轮 5,973 微降），定位不变——self-hosted agent 控制面（dispatch/spend/审批），非 attention inbox。
- Steer（ilwonyoon/steer_ai）：iOS 1.1.0（Settings 加 Mac companion 链接）；仍为双端 wrapper 模式（`steer codex`/`steer claude` 包裹会话），与 attnbox 零侵入读日志路径不同。
- agentmux：持续高频发版（v0.49.2），仍是本地 Rust 多 agent 运行器/工作区象限，无云端聚合、无 ack 台账。
- orbion：搜索未再命中原仓库主页（信号弱化），维持观察不升级。
- coslash/ccmux/kookr、claude-notify、agentfleet、agent-inbox（salimfadhley，agent 互发消息的 SQLite mailbox，非人类 attention inbox）、pine/unterm/Pushary/MAAT/Straydeck/zka：常规演进，无象限变化。
- claude-dispatcher：404 第五轮延续。

## 新进入者

- Pulser（getpulser.app）：macOS 菜单栏 app，"agent needs you" 通知器（Claude hooks 权威 + 其余进程监测启发式）。仅通知、无统一收件箱/detail/ack/移动端/云端 agent，入档观察。
- agent-notify（npm，Go）：hooks→手机/桌面多通道（Feishu/WeCom/DingTalk/Bark/ntfy/Slack）通知器；通知管道象限，与 attnbox webhook 通道部分重合但无收件箱聚合，入档观察。
- @trygocode/notify、context-handoff/TStansel-handoff 等：通知/handoff 工具，非直接对手，存档不入盯防。

## 结论

- "waiting on you" 三向搜索首位命中仍为 attnbox；本地+云端统一 attention inbox（detail 预览 + ack 台账 + act-in-place）差异化不变。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
