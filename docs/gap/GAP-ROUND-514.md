# GAP-ROUND-514：第四十三批竞品扫描——盯防全查、新进入者 PingBack 存档，无直接对手

日期：2026-08-10
驱动维度：竞品调研（round-503 后首次；gh api 元数据 + 提交记录核证）

## 盯防名单动向

| 项目 | pushed_at | 动向 |
|---|---|---|
| Innovology/claude-dispatcher (9★) | 08-09 | 继续动作最大：Cockpit v3 re-theme + plan→act→observe→ship 链 + 结构化 dispatch 表单收尾、dispatch 分支从默认分支切、Products lens；仍 Claude-only 本地驾驶舱 |
| beknazar/agentfleet | 08-09 | 诚实哲学继续深化："stop reporting a pasted call transcript as the operator's instruction"、"report what a machine is actually doing, not what a timer implies"；首次真实云机 provision 修尾 |
| gnestor/agent-inbox (1★) | 08-09 | 继续走凭证代理/vault 方向（googleapis SA token、credential proxy 文档），GTD 混排收件箱，仍无跨 agent waiting 语义 |
| shariqh/agent-inbox (1★) | 08-07 | 硬化潮后静默（本地 MCP+SQLite 注意力收件箱） |
| jedarden/trail-boss | 08-08 | 常规迭代（single-pane attention router，daemon 化） |
| misty-step/kelpie (1★) | 08-07 | 常规（herdr 生态 phone-first 分诊台） |
| kookr-ai/kookr (3★) | 08-07 | 高速迭代节奏放缓两日 |
| epilande/ccmux (120★) | 08-08 | v1.3.0 后收尾，星数 119→120 |
| centauri-ai/coslash (3★) | 08-08 | "attention layer" 定位不变，仅本地 Claude/Codex |
| sekera-radim/impri (1★) | 08-09 | 审批 inbox 内容潮持续，仍无 waiting/状态面 |
| oleg-vasilyev/claude-notify | 08-07 | presence-aware Telegram 通道收尾 |

## 新进入者

- **vijaysai1102/PingBack**（08-08 新建，1★）：本地后台盯 Claude Code，等待 permission/input 时发桌面通知+声音（Win/macOS）。notify 象限、Claude-only、无收件箱/分诊/云聚合——存档观察，非直接对手。
- anotify 双镜像仓（v0.2.1 桌面审批 hub）：既有 anotify 象限复扫，非直接对手。
- 三向搜索（attention inbox agent / waiting on you agent / agent approval inbox）首位命中仍为 attnbox。

## 结论

- 核心差异化（本地+云统一 inbox、等待原因/行动链接、triage/ack、诚实状态语义）仍无直接对手。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 方法注记：kookr/ccmux/impri/coslash 多仓曾迁址——盯防复查用 name 搜索定位现址（kookr-ai/kookr、epilande/ccmux、centauri-ai/coslash、sekera-radim/impri），旧址 404 不代表退出。
