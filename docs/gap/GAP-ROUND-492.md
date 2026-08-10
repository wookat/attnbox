# GAP-ROUND-492：竞品第四十一批扫描——盯防全查 + 新进入者 gnestor/agent-inbox 入档，无 P0/P1

日期：2026-08-05
驱动维度：竞品调研（round-481 后首次；盯防名单每轮必查 + 三向新进入者扫描）

## 盯防名单核查（GitHub search/repos pushed_at + 描述，round-360 方法注记：静默仓以 pushed_at 佐证）

- Innovology/claude-dispatcher — pushed 最新（本窗口内），9★，Cockpit 驾驶舱路线继续，仍为动作最大的本地对手；Claude-only tmux。
- beknazar/agentfleet — pushed 最新，"shows you which ones are waiting" 语言不变，远程多机 fleet 控制面持续活跃。
- kookr-ai/kookr — pushed 数日内，"smart attention router" 持续迭代。
- epilande/ccmux — 120★（119→120），v1.3.0 后收尾节奏，多 runtime tmux 无云端。
- centauri-ai/coslash — pushed 数日内，"attention layer for coding agents" 仅本地。
- jedarden/trail-boss — pushed 数日内，"single-pane attention router" daemon 路线继续。
- sekera-radim/impri — 活跃且转向 SEO 内容潮（mcp-approval-server / approval-inbox-vs-slack-buttons / HITL 工具对比等发布页），审批象限营销加速，仍无 waiting/状态聚合面。
- takaaki-s/jind-ai — pushed 最新，tmux TUI 象限；jind-ai-notifier 子仓存在。
- misty-step/kelpie — pushed 数日内，herdr 生态内 phone-first triage 不变。
- shariqh/agent-inbox — pushed 数日前，硬化潮后节奏放缓，仍纯本地 MCP+SQLite。
- claude-notify 象限 — 无新跨越动向；duty-on（Live2D 桌宠）常规迭代；Revolper/HumanLoop 静默数日；switchyard 原仓无新动向。

## 新进入者三向扫描（"agent attention inbox" / "waiting on you agents" / "unified inbox coding agents"）

- 三向搜索首位命中均为 wookat/attnbox。
- 新入档：gnestor/agent-inbox（1★）——"Unified inbox for emails, Notion tasks, and Claude Code agent sessions"。unified inbox 语言首次与非 agent 源（email/Notion）混排，与我们"agent 注意力"定位同词不同象限（个人 GTD 聚合非 agent 状态语义）；纯本地、无 waiting 原因/行动链接。入档观察，若长出 agent waiting 状态面升具名盯防。
- 其余命中（claude-ops、grove、atelier、pulse-protocol 等）均为已知仓或编排/协议象限，非直接对手。

## 结论

- 核心差异化不变：local+cloud 统一聚合、显式 waiting reason/detail、行动链接、分诊/ack、诚实 source-specific 语义——仍无直接对手。
- 探针注记：无认证 GitHub API 逐仓 commits 查询本窗口撞限流；pushed_at + search 元数据足以佐证活跃度（round-360 注记复核成立）。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
