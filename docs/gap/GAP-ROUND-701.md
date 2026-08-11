# GAP-ROUND-701：第六十批竞品扫描——Agent Watch/Agent Approve 入档，无新直接对手

日期：2026-08-04
驱动维度：竞品调研（round-690 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- mission-control（builderz-labs）：★5,975 持平（round-679 同值），定位仍是自托管 agent 控制面（任务派发/成本/治理），非"谁在等你"注意力收件箱；无变化。
- AgentBell：双线延续（iOS 统一审批收件箱 + Mac 菜单栏监控），仍需本机连接器、无云 agent（Devin 等）聚合；无 lane 变化。
- claude-dispatcher：原仓 404 第十轮；同名生态出现 claude-code-cockpit（VSCode 只读 HUD）与 alexjbarnes/cockpit（Claude Code web UI，含 working/waiting/idle 状态灯），均单 runtime 本地面，非直接对手。
- grove/Steer/agentmux/psts-ccmux/Smoke Signal/switchboard：搜索窗口内无新动向。
- 三向搜索（attention inbox / waiting on you / agent dashboard）首位命中仍为 attnbox。

## 新进入者

- Agent Watch（agent-watch.com，托管 SaaS）：一个 dashboard 看全部 Claude Code/Codex/Gemini agent，"know the instant an agent is stuck waiting for input"、告警路由 Slack/Teams/Discord/SMS——等待告警语言重合迄今较强，但架构为云上报遥测（agent 装 client 上报云端），与我们本地零侵入读日志 + 隐私优先相反，且无云 agent（Devin）聚合、无统一收件箱分诊（ack/搜索/键盘链）。入档观察，偏具名盯防候选。
- Agent Approve（agentapprove.com，iOS/Apple Watch）：hooks 经云中转，推送审批 + 手表一键 allow/deny + 策略自动批/拒。AgentBell 象限的云中转变体，仍 approval-only 无聚合收件箱。入档观察。
- DailyBot Agent Inbox：团队协作 SaaS 内置 agent 决策队列（approve/reject/reassign），面向团队工单流，非个人开发者注意力收件箱。存档。

## 结论

- 差异化不变：本地零侵入 + 云 agent 聚合 + 隐私优先 + 移动 PWA 分诊闭环仍无同时具备者。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
