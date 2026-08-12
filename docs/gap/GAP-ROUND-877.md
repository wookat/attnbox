# GAP-ROUND-877 — 第七十六批竞品扫描（纯文档）

Round 877. 主驱动：竞品调研（round-866 后首次全查）。

## 重点盯防

- **yepanywhere**：npm 0.7.0（2026-07-25）无新版本，周下载 ~352；tiered
  inbox / mobile approvals / E2E relay / remote device control 叙事不变，
  Android 原生 app 仍开发中。维持重点盯防。
- **AgentBell 3.0**：双线定位确认稳定——iOS/iPadOS "personal trusted
  decision center"（One Inbox + bounded confirm/deny/choice/form +
  verified source/action/target/environment/risk/deadline + 执行
  receipts 三分离 + Live Activities）与 Mac 菜单栏 companion（Claude
  Code/Codex/OpenClaw/Cursor/Gemini/VS Code 状态感知 + 桌面宠物）并行。
  waiting/approve 决策收件箱重叠仍为名单最高。维持重点盯防。
- **AO**（aoagents.dev）：reactions 引擎文档细化——`agent-needs-input`
  / `agent-stuck` / `agent-exited` 默认 notify + urgent，`retries` /
  `escalateAfter` 控制自动恢复失败后升级到人类的阈值。"escalate only
  what needs a human" 落地为可配置策略，但定位仍是 fleet 编排（tmux/
  worktree/PR 生命周期），非跨 vendor 注意力收件箱。维持具名盯防。

## 具名盯防

- **AgentPeek**：26 agents 不变；Devin 支持面确认较深——in-notch
  answers（含 Devin）、follow-up prompts（含 Devin）、Devin 用量读数
  （本地 CLI session db 月度 token/日史）。lifetime $15/1 Mac 限时价
  维持。本机 macOS 路径非云聚合不变。维持具名盯防。
- **DorkOS**："The operating system for autonomous AI agents" 定位
  维持；Mesh（agent 发现/入网/互通）+ Relay（Telegram/webhook/浏览器，
  离线暂存重投）+ Tasks 调度稳定，Windows alpha 维持。平台化路线
  无新方向性动向。维持偏具名盯防候选。
- claude-dispatcher：404 第二十六轮（搜索仅命中同名无关项目）。

## 观察名单动向

- **konsole-pal** v1.0.1 patch 发布（PyPI）：纯终端 attention router
  定位不变，无 web/云端面。维持观察。
- **AgTower**（agtower.ai / harflabs ★4）：v1.0.9，最后 push
  2026-07-03；"triage queue, not a launcher" 叙事不变，仍限 Claude
  Code/Codex + macOS 13+ Apple Silicon 本机。维持观察。
- **Obvious "My Day"**：仍 beta（需邮件申请）；每日三次 briefing +
  Quick Decisions + Open Threads（"agents waiting on your input"）
  叙事不变，个人助理套件定位不变。维持观察。
- **Kindship**：任务执行文档细化 ask-modes（ASK_USER/CHOICE/
  CALL_TO_ACTION——"user-input modes should create asks, not
  reports"），云端托管 agent 工作台路线不变，无本地 CLI 采集面。
  维持观察。

## 新进入者

- **AgentBuddy**（techgocodingnow/agentbuddy）：入档观察——macOS 菜单
  栏 app + 桌面宠物，监控 Claude Code/Codex/Cursor working/done/
  waiting 三态（"which one is waiting for your input, stop
  tab-hunting"）。本机单面监控 + 宠物路线（与 AgentBell Mac 版同
  品类），无云端/移动/行动链接面。

## 差异化核对

"waiting on you" / unified attention inbox 搜索首位命中仍为 attnbox；
本地日志零侵入读取 + 云端 API 聚合（Devin）+ 行动链接的三源组合仍未
被任何对手直接复制。桌面监控类（AgentPeek/AgTower/AgentBuddy/
AgentBell Mac）与云端工作台类（Kindship/Obvious）继续分化，跨 vendor
本地+云聚合空位不变。

## Verdict

无 P0/P1，纯文档轮，无 changeset。
