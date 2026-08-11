# GAP-ROUND-712：第六十一批竞品扫描——ai-agent-session-center 入档，无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-701 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★~6.0k（round-701 5,975 → 官网标 6.0k，7 日 +47 缓增）；发布 v2.0.0（feat/refactor 落地，189 commits，转向"agent operations console"），定位仍是控制面（派发/成本/审批/治理），非"谁在等你"注意力收件箱。持续盯防。
- AgentBell：双线延续（iOS 统一审批收件箱——bounded confirm/deny/choice/form；Mac 菜单栏监控 + 桌面 companion/角色包），新增 OpenClaw 活动面；仍无云 agent（Devin）聚合。无 lane 变化。
- Agent Watch（round-701 具名盯防候选）：官网叙事稳定（"know the instant an agent is stuck waiting for input"、Slack/Teams/Discord/SMS 告警、token 成本追踪），架构仍为云上报遥测（装 client 上报云端），与我们本地零侵入 + 隐私优先相反；确认升为具名盯防。
- claude-dispatcher：原仓 404 第十一轮；同名生态（claude-code-dispatcher/claude-dispatch）均为任务派发/skill 路由，非注意力收件箱。
- switchboard/grove/Steer/agentmux/psts-ccmux：搜索窗口内无新动向。
- 三向搜索（attention inbox / waiting on you / agent dashboard）首位命中仍为 attnbox。

## 新进入者

- ai-agent-session-center（coding-by-feng）：localhost 仪表盘把 Claude Code/Gemini/Codex 会话渲染成 3D 机器人，"stuck waiting for approval" 的会话闪烁告警 + prompt 队列 + 空闲自动派发 + 工作区快照。本地 hooks 只读、可逆卸载——本地面语言重合较强（"surfaces the one that needs you"），但纯本地单机、无云 agent 聚合、无移动 PWA、无 ack 分诊台账。入档观察。
- ClaudeSight：Claude 单 runtime 菜单栏成本/状态仪表盘，非聚合收件箱。存档。

## 结论

- 差异化不变：本地零侵入 + 云 agent 聚合 + 隐私优先 + 移动 PWA 分诊闭环仍无同时具备者。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
