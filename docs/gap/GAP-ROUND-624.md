# GAP-ROUND-624：竞品第五十三批扫描——orbion 入档，无新直接对手，无 P0/P1

日期：2026-08-04
驱动维度：竞品调研（round-613 后首次；盯防名单每轮必查 + 三向新进入者扫描，全部 `gh api` 实查）

## 盯防名单动向

- mission-control（builderz-labs）：★5,973（+2），8-10 推送延续——控制面/编排象限不变。
- kookr（kookr-ai/kookr）：当日推送（8-10 23:09），"smart attention router" 高速迭代延续。
- coslash（centauri-ai/coslash）：当日推送（8-10 23:09），attention layer 定位不变，仅本地。
- agentmux（vijaykrishna483-cms）：8-10 推送，入档次轮即持续活跃——仍纯本地 TUI 并行运行器象限。
- ccmux(epilande)：8-8 推送 ★120 常规演进；ccmux(skzv)：8-5 后暂歇延续。
- agentfleet（beknazar）：8-9 推送，远程 fleet + blocked 可见性延续。
- trail-boss / kelpie / agent-inbox(shariqh)：8-7~8-8 推送，常规演进。
- jind-ai（takaaki-s）：8-10 推送，tmux TUI waiting-on-you 象限延续。
- claude-dispatcher：404 第四轮延续，维持消失判定。
- Steer（App Store）/Pushary：无 GitHub 面，无新可查动向。

## 新进入者

- orbion（PlainConceptsPlatform，2026-07 新建，TypeScript/Electron/Capacitor，★1）："Control plane for agentic work on GitHub … the queue waiting on you. Desktop, web and mobile. A client, not a service."——waiting-on-you 语言 + 桌面/web/移动三端野心，与 attnbox 语言重合较强；但明确自限"not a local agent orchestrator"、仅 GitHub 工作流 agent 象限、无本地 CLI 采集、README 自述 "Scaffolded and building. No product features yet."。入档观察。
- llminbox / agent-lights-communication / mailmux / salimfadhley/agent-inbox（agent 间 SQLite 邮箱）等：分别为日志邮箱、RGB 灯语、邮件 agent、agent 互发消息象限，均无"哪个 agent 在等我"聚合收件箱语义，存档。

## 差异化核验

三向搜索（"waiting on you" agent / attention inbox agents / agent inbox）首位命中仍为 attnbox；本地 CLI + 云端 agent 聚合、显式 waiting reason/detail、action URL、ack 台账、移动/PWA 的组合仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
