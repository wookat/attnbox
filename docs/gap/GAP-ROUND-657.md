# GAP-ROUND-657：第五十六批竞品扫描——grove/jarvis 入档，无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-646 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★5,970，持续活跃。
- agentmux（agentmuxai）：★15（+2），仓库层面 last push 2026-07-13 后无新推送——平台化后首个静默窗口，维持具名盯防；另见 fork 生态活跃（vijaykrishna483-cms 等）。
- ccmux（epilande）：★116，持续活跃；psts/ccmux（tailnet 跨端单视图）无新推送，round-646 复核项暂无进展。
- kookr（kookr-ai）：last push 2026-07-19 后静默窗口。
- Smoke Signal（smoke-signal-app/agent-plugin）：★0，README 深化（Decisions 回复 + Remote 起动手机侧），未见多 agent 聚合扩展——round-646 复核项暂无进展。
- fleetview（costajohnt）：★0，定位不变。
- trail-boss/agentfleet/orbion/jind-ai/agent-inbox/claude-notify：均存活、无 lane 变化。

## 新进入者

- AnkushinDaniil/grove：tree-of-agents 管理器（Claude/Codex/Gemini/OpenCode 递归树 + worktree），自带 "attention inbox"（hook-first "needs you" 检测 + 原生通知 + 深链）、PWA + tailscale 手机访问——"attention inbox" 语言迄今第三个直接使用者（继 attnbox、agent-inbox），且 hook 权威 + PWA + 手机路线与我们高度同构；仍纯本地 orchestrator 象限、无云端 agent（Devin）聚合与 ack 台账。升具名盯防。
- Sergey-Chernyshev/jarvis：macOS 菜单栏 mission-control（Rust+Tauri，"see, hear and reply to every agent"），Claude-only 单 runtime，入档观察。

## 差异化核验

"waiting on you" agent 与 "attention inbox" agents 两向搜索首位命中均为 attnbox（后者全部仅 3 仓：attnbox / agent-inbox / grove）；统一本地 CLI+云端聚合、ack 台账、移动 PWA 组合仍无直接对手。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 下轮竞品盯防重点：grove orchestrator/PWA 落地速度、Smoke Signal 聚合动向。
