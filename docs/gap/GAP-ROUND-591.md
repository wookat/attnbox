# GAP-ROUND-591：第五十批竞品扫描——pine/unterm 入档，无新直接对手，无 P0/P1

日期：2026-08-10
驱动维度：竞品调研（round-580 后首次；盯防名单每轮必查 + 三向新进入者扫描）

## 盯防名单动向

- **mission-control（builderz-labs）**：~5,970★，持续活跃（最新推送 08-10）。定位不变："self-hosted control plane for AI agents: dispatch tasks, review runs, track spend"——控制面/编排象限，非 attention inbox。
- **kookr**：静默两窗口后恢复推送（08-07 三提交：pipelineStarvation 计数器、协作 peer URL 安全硬化、插件目录契约测试）。仍 "smart attention router"，本地路由无云端聚合。
- **ccmux（skzv）**：08-05 后静默（README 安装引导 + CI/fuzz 修补收尾），高速迭代期暂歇。
- **agentfleet（beknazar）**：持续推送（08-09），远程多机 fleet + blocked-waiting-on-you 面，多机本地面最接近者。
- **agent-inbox（shariqh）**：08-07 仍活跃，硬化后常规演进。
- **Steer**：GitHub 无公开仓（App Store 渠道），无新信号。
- **Pushary**：无新动向（框架 SDK 三仓 08-02 后静默）。

## 新进入者（入档观察，非直接对手）

- **batonogov/pine**（20★，08-10 活跃）：macOS 原生代码编辑器，内置 "cross-project Agent Inbox" + 私有通知——注意力面作为编辑器附属功能出现（IDE 内嵌象限），仅 macOS 本地、无云端/移动/ack 台账。
- **zhitongblog/unterm**（11★，08-10 活跃）："terminal AI agents can drive + cockpit"，带 agent Inbox、worktree fleets、diff review——ccmux/claude-dispatcher 象限的终端驾驶舱，本地-first 无云端聚合。
- salimfadhley/agent-inbox、llminbox 等为 agent 间消息邮箱/协调日志读取器，语言重合但方向正交（agent↔agent 而非 agent↔human attention），存档不盯防。

## 定位核验

- GitHub 搜索 `attnbox` 首位命中仍为 wookat/attnbox；"attention inbox agents" / "inbox for local and cloud agents" 无直接竞争命中。
- 跨 vendor（本地三采集器 + 云端 Devin + GitHub review）+ 移动 PWA + ack 分诊 + webhook 的组合差异化不变，仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
