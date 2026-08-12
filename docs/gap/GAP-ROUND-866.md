# GAP-ROUND-866 — 第七十五批竞品扫描（纯文档）

Round 866. 主驱动：竞品调研（round-855 后首次全查）。

## 重点盯防

- **yepanywhere**（npm 0.7.0，2026-07-25 更新，周下载 ~352）：官网叙事
  升级为 "The full agent workspace, everywhere"——tiered inbox、mobile
  approvals、mid-turn steering、follow-up queues、recaps/forks/clones、
  remote device control（Android/Apple Simulator WebRTC 串流）维持；
  Android 原生 app 开发中、iOS 计划中。维持重点盯防。
- **AgentBell 3.0**：叙事收敛为 "A trusted decision center"——One
  Inbox 统一 Claude 权限/Codex 结构化决策/非生产 release gates，强调
  "Approval is not success"（Human response / Executor claim / 执行
  receipt 三分离）+ fail-closed（超时/离线/冲突从不自动放行）+
  Codex decision skill（$claude-notify-decision）。桌面宠物叙事退居次
  要，决策收件箱方向重新聚焦，威胁度回升。维持重点盯防。
- **AO**（aoagents.dev）：25 harnesses 支持 + 每项目可选 agent；四列看
  板/CI feedback loop/移动 companion 维持，无新方向性动向。维持具名盯防。

## 具名盯防

- **AgentPeek**：26 agents（含 Devin，desktop 记录 view-only）不变；
  lifetime license 定价上线（$15/1 Mac 限时，常价 $19）；Direct Chat
  21 agent 可发 prompt。本机路径非云聚合不变。维持具名盯防。
- **DorkOS**：定位再升级为 "The operating system for autonomous AI
  agents"——新增 **Mesh agent discovery**（扫描本机 agent 目录、批准
  入网、agent 间互相发消息）+ Relay 消息（Telegram/webhook/浏览器，
  离线暂存）+ Obsidian 内嵌 Console；Windows alpha 安装器。编排/协作
  平台化路线明确，cockpit 面维持。维持偏具名盯防候选。
- claude-dispatcher：404 第二十五轮（搜索仅命中同名无关项目）。

## 观察名单动向

- **konsole-pal** v1.0.0 稳定发布（PyPI）：纯终端 attention router，
  无 web/云端面不变。维持观察。
- **AgTower**：官网/功能叙事无变化（waiting 专区 + j/k 清队 + Rust
  原生），仍 Claude Code/Codex 双 agent。维持观察。

## 新进入者

- **Obvious "My Day"**（help.obvious.ai）：入档观察——日程/邮件/agent
  线程统一 briefing，"where your agents are waiting on you" 语言同源，
  但定位是个人助理套件而非编码 agent 聚合。
- **Kindship**（kindship.ai）：入档观察——per-agent Inbox（pending
  asks/approvals/replies）+ `/home/inbox` 跨 agent 分诊收件箱（badge/
  过滤/深链）。云端托管 agent 工作台路线，无本地 CLI 采集面。

## 差异化核对

"waiting on you" 收件箱搜索首位命中仍为 attnbox；本地日志零侵入读取 +
云端 API 聚合（Devin）+ 行动链接的三源组合仍未被任何对手直接复制。
Claude Code 官方 agent view（`claude agents`）继续巩固单 vendor 内置
面，跨 vendor 聚合空位不变。

## Verdict

无 P0/P1，纯文档轮，无 changeset。
