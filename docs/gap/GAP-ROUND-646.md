# GAP-ROUND-646：第五十五批竞品扫描——Smoke Signal/fleetview 入档，无新直接对手

日期：2026-08-05
驱动维度：竞品调研（round-635 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★5,974（+4），持续活跃（pushed 当日）。
- agentmux：迁址 agentmuxai/agentmux（★13，2026-03 创建），定位升级为 "Agent Operating Environment"，配套 docs 站 docs.agentmux.ai——从纯 TUI 向平台化演进，维持具名盯防；原 stefanoamorelli 路径 404。
- ccmux（epilande）：★120，持续活跃；另见同名新仓 max-listov/ccmux（自愈 tmux 会话）与 psts/ccmux（tailnet 跨端单视图——"from Mac, web, or phone" 语言首次在 ccmux 生态出现，值得下轮复核）。
- coslash：★3，持续活跃，定位文案深化（goal/decisions/files/commits/next step 重建 + handoff brief）。
- kookr（kookr-ai）：★3，"smart attention router" 定位不变，持续活跃。
- claude-dispatcher：原仓 404 第六轮延续。
- agent-inbox（shariqh）：pushed 08-07，硬化潮后低频维护。
- agentfleet（beknazar）/trail-boss（jedarden）：均低频存活。
- orbion：pushed 08-10，维持观察。
- Pulser：GitHub 检索无迹，信号弱化。

## 新进入者

- smoke-signal-app/agent-plugin（Smoke Signal，smokesignal.sh）：手机通知 + 电话内直接回答 Claude 提问（Decision tools）+ Remote tab 远程启动/跟随/打断任务——notify→answer→remote-control 三跳，claude-notify 象限的产品化最强实现；仍 Claude/Codex 双 runtime 无统一收件箱/云端 agent 聚合，入档观察（偏具名盯防候选）。
- costajohnt/fleetview：opencode/claude/copilot roster TUI（dispatch/watch/answer/attach），claude-dispatcher 象限继任者，入档观察。

## 差异化核验

三向搜索（"waiting on you" agent / attention inbox agents / 更新排序）首位命中均为 attnbox；统一本地 CLI+云端聚合、ack 台账、移动 PWA 组合仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 下轮竞品盯防重点：psts/ccmux 跨端单视图动向、Smoke Signal 是否扩展多 agent 聚合。
