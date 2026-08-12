# GAP-ROUND-822：第七十一批竞品扫描（round-811 后首次）

日期：2026-08-05。主驱动：竞品调研（盯防名单每轮必查 + 新进入者扫描）。纯文档轮，无 P0/P1。

## 盯防名单核查（重点五家）

- **yepanywhere（kzahel/yepanywhere，★470）**：维持重点盯防。叙事升级为"multi-provider workspace / all your coding agents on every device"；signed macOS + Windows 桌面 app 进入 beta（GitHub Releases 已可下载）；Public Relay（E2E 加密、免配对、免 VPN）继续主推；Claude Code + Codex 双 provider 均支持 approvals/diffs/streaming。仍限本地 CLI 两 harness，无云端会话（Devin 等）聚合。
- **AO（aoagents.dev）**：维持具名盯防。看板列细化为 Working / Pending / Review / Respond / Merge 五列（此前观察为四列），"Respond" 即 needs-you 语义；插件化架构成型（Agent/Runtime/Workspace/Tracker/SCM/Notifier 六槽，notifier 支持 desktop/Slack/Discord/webhook）；移动 app 经 LAN/Tailscale 配对，按紧迫度排序（Respond 优先）。定位仍是 fleet 编排 + PR 生命周期，非跨云 attention inbox。
- **Axel**：动能恢复（round-811 曾记"4 月后无推送"已过时）。双仓格局明确：txtx/axel（Rust CLI：任务队列 + tmux + worktree + 四 harness 派发）+ scarce/axel（原生 macOS app，Things 风格 UI，单一审批 inbox，Automerge CRDT + Supabase 同步）。审批 inbox 带 diff 预览与 auto-approve 规则。仍限本地 harness。
- **Astra（astra.build）**：仍 macOS 私测（小批邀请）。定位不变：每任务一个 worktree Space + 单一 inbox 分诊 + 应用内 merge。
- **AgentBell（agentbell.app）**：动向显著，升重点盯防。3.0 版定位"trusted decision center / One Inbox for every automation decision that needs you"：聚合 Claude Code 权限、Codex 选择与非生产 release gate；iPhone 移动审批；结构化上下文（source/target/environment/risk/deadline）；有界选项 + fail-closed（超时/冲突/离线绝不自动放行）；执行回执（Human response → Executor claim → 执行结果）。官方边界自述：不启动 agent、不执行目标动作、不持有目标凭证。与 attnbox 差异：AgentBell 是"决策/审批闭环"，attnbox 是"注意力聚合 + 直达行动链接"；但其移动审批 + 多源聚合与我们的 waiting/approve 面重叠度为盯防名单中最高。

## 其余盯防复核

- octomux：迁址至 ShreyPaharia/octomux（旧 steipete 路径 404）；README 新增对 vibe-kanban/Conductor/Emdash 的对比表（自称唯一"one permission inbox + monitor grid"），Claude Code + Cursor 双 harness，tailnet 手机可达。维持入档观察。
- shariqh/agent-inbox：仍 ★1，Electron + MCP + SQLite 本地方案，无云聚合，维持观察。
- mission-control（MeisnerDan）：转向"agent swarm 治理"（角色/inbox/审批/预算），与注意力聚合弱相关，维持存档。
- claude-dispatcher：404 第二十一轮。

## 新进入者

- **AgentManager（agentmgr.app）**：macOS 浮窗监视 Claude Code 会话，"needs input 即浮出"，hooks 检测，$4.99/mo。单 harness 单机，入档观察。
- **AgentPeek（agentpeek.app）**：macOS notch/菜单栏监视器，声称支持 25+ agent（含 **Devin**）——首个把 Devin 列入监视目标的竞品；本地数据、买断制。但定位是"监视/命令中心"而非 waiting 分诊 inbox，无行动链接/ack 模型。入档观察偏具名盯防候选。

## 结论

- 首位命中仍为 attnbox：本地 CLI（Claude/Codex/Gemini）+ 云端 Devin + GitHub PR 三源聚合、waiting 原因与预览、直达行动链接、ack 跨设备同步的组合仍无直接对手。
- 竞压趋势：①移动审批面（AgentBell/yepanywhere/AO）持续变强；②AgentPeek 首次把 Devin 纳入监视名单，"多 harness 覆盖广度"成为新竞争维度。均为方向性信号，非现有承诺的缺口。
- 无产品 P0/P1。本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
