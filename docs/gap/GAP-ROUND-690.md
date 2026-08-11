# GAP-ROUND-690：第五十九批竞品扫描——switchboard/aside 入档，无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-679 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：定位持续为自托管 agent 控制面（dispatch/spend/governance），非注意力收件箱象限；社区还出现 Cyvid7/claude-mission-control（实时指挥中心，Claude-only 本地）与 ProfFroggo 变体——控制面赛道拥挤但均无跨本地+云聚合。
- AgentBell：双线（Mac 菜单栏监控 + iOS "Code Companion" 审批收件箱）持续演进，iOS 端强调 bounded 审批/执行回执/Live Activities；仍需本机连接器、无云 agent（Devin 等）聚合。
- grove（GarrickZ2）：继续向 ACP 多 agent IDE 方向分化（十内置 agent、MCP 工具化、Blitz 视图），注意力收件箱降为附属功能。
- claude-dispatcher：无新可见动向（原仓 404 延续）。
- Steer/agentmux/psts-ccmux/kookr/coslash/herdr 系：无与我们象限相关的新信号。

## 新进入者

- switchboard（HaydnG，fork 系）：Claude Code 桌面指挥中心，自带 "Attention Inbox"（优先级队列 + Focus next + 收件箱内直接 approve/deny/reply + 通知合并节流）——收件箱语言与行内行动重合迄今较强，但 Claude-only、桌面本地、无云端聚合/移动 PWA/ack 台账，入档观察。
- aside（vignesh07）：Mac 上 Claude/Codex/Pi 会话的持久 side chats + attention inbox，零 hook 发现路径与我们同源；定位是"旁路对话"而非分诊收件箱，纯本地无云端，入档观察。

"attention inbox + waiting on you" 搜索首位命中仍为 attnbox；跨本地 CLI + 云端（Devin）统一聚合 + 移动 PWA + ack 分诊的组合仍无直接对手，差异化不变。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
