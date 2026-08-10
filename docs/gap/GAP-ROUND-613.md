# GAP-ROUND-613：竞品第五十二批扫描——agentmux 入档，无新直接对手，无 P0/P1

日期：2026-08-10
驱动维度：竞品调研（round-602 后首次；盯防名单每轮必查 + 三向新进入者扫描，全部 `gh api` 实查）

## 盯防名单动向

- mission-control：steipete 原仓 404，现址 builderz-labs/mission-control（★5,971，8-10 活跃）——控制面/编排象限，盯防地址更新。
- kookr（kookr-ai/kookr）：当日推送（8-10），"smart attention router" 定位延续，高速迭代恢复。
- coslash（centauri-ai/coslash）：当日推送（8-10），"attention layer for coding agents" 定位不变，仅本地。
- ccmux(epilande)：8-8 推送 ★120 常规演进；ccmux(skzv)：8-5 后暂歇。
- agentfleet（beknazar）：8-9 推送，远程多机 fleet + blocked 可见性持续打磨。
- trail-boss（jedarden）：8-8 推送，single-pane attention router 常规演进。
- kelpie（misty-step）：8-7 推送，phone-first herdr 分诊延续。
- agent-inbox（shariqh）：8-7 推送，本地 MCP+SQLite 收件箱延续。
- claude-dispatcher：404 延续（第三轮），维持消失判定。

## 新进入者

- agentmux（vijaykrishna483-cms，8-10 新建，Go TUI）："run several terminal AI agents at once and know which one is waiting on you"——waiting-on-you 语言直接重合，但终端 TUI 并行运行器象限、纯本地无云端/移动/ack 台账/action URL，入档观察。
- Codeman（Ark0N，★642）：self-hosted mission control for AI coding agents——控制面象限（mission-control 同类），非注意力收件箱，存档。
- hark / PingBack / human-slave / kajo / atm 等：单机提醒/音效/队列类，均无聚合收件箱语义，存档。

## 差异化核验

三向搜索（"waiting on you" agent / attention + coding agents / agent inbox）首位命中仍为 attnbox；本地+云端聚合、显式 waiting reason/detail、action URL、ack 台账、移动/PWA 的组合仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
