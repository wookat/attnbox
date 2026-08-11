# GAP-ROUND-723：第六十二批竞品扫描——yepanywhere 升具名盯防候选

日期：2026-08-04
驱动维度：竞品调研（round-712 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- **mission-control**（builderz-labs）：★~6.0k，v2 后定位稳定为 "self-hosted control plane"（dispatch/spend/governance），控制面象限不变，非注意力收件箱；出现 mc-cli agent-complete 操作面（headless/JSON/SSE），平台化持续。无 lane 变化。
- **AgentBell**：双线延续——Mac 菜单栏 companion（Cursor/Claude Code/VS Code/OpenClaw 状态提醒）+ iOS "secure approval inbox"（bounded confirm/deny/choice/form，无远程终端）。仍无云 agent（Devin）聚合与统一跨端收件箱。
- **Agent Watch / Agent Approve**：Agent Approve 主打 iPhone/Apple Watch 一键审批 + push；托管云上报路线与我们隐私优先相反。无新 lane 变化。
- **switchboard**（HaydnG）：Claude-only 桌面指挥中心，Attention Inbox + Quick Actions（approve/deny/reply）+ prompt queue + coalesced 通知，本地重合仍强；无云聚合/移动端。维持观察。另见同名 tjmisko/switchboard（Linux 进程级 waiting-on-permission 观测 daemon）与 kkiruk-studio/SwitchBoard（macOS 菜单栏），均本地单 runtime。
- **claude-dispatcher**：原仓 404 第十二轮；搜索首页已被同名无关项目（issue 派发/skill 路由）占据，退出确认趋稳。

## 新进入者

- **yepanywhere**（mikestaub / kzahel，yepanywhere.com）：自托管 mobile-first web UI，Claude Code + Codex 双 runtime——tiered inbox（Needs Attention→Active→Recent→Unread）、push 通知锁屏审批、文件上传、E2E 加密公共 relay 免配对跨端访问、复用 CLI 会话历史零新数据库。语言与形态（mobile-first、attention 通知、复用现有日志）与我们高度同源，为迄今"本地 agent 远程监督"象限最完整实现；但仍无云 agent（Devin）聚合、无 GitHub review 兜底。**升具名盯防候选，下轮复核。**

## 差异化结论

- "attention inbox AI coding agents waiting" 三向搜索首位命中仍为 attnbox。
- 核心差异化不变：本地（零侵入读日志）+ 云（Devin API）+ GitHub 兜底的统一注意力收件箱仍无直接对手；yepanywhere 侵蚀"本地远程监督"面，值得跟踪其是否扩展云聚合。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
