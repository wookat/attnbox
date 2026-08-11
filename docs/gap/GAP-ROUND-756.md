# GAP-ROUND-756：第六十五批竞品扫描——Astra 升具名盯防候选，Rut/CodeFire 入档

日期：2026-08-04
驱动维度：竞品调研（round-745 后首次；盯防名单每轮必查 + 新进入者扫描）

## 盯防名单复查

- Grok Build Agent Dashboard（xAI 官方）：Grok Build 1.0.0 发布，dashboard 已 GA——按状态分组（Needs input 置顶）、行内审批/回答（数字键）、按目录分组、peek+reply、派发新会话；仍限 Grok 单一 harness（第一方注意力面持续验证赛道）。
- yepanywhere：0.7.0（npm 周下载 ~352），macOS/Windows 签名桌面安装包上 GitHub Releases（beta）；仍无云/Devin 聚合。
- AgentBell：三线持续（menu bar 桌面宠物 + agent-bell npm 音频通知 + iOS "Secure Approval Inbox"/"Unified Inbox" 人审界面商店文案确认落地）；边界仍是本地 IDE/CLI 生命周期，无云聚合。
- Acepe：attention queue 定位不变（urgency 排序：Answer needed > Error > Working > Planning > Finished），无云/Devin 聚合。
- mission-control（builderz-labs）：控制面定位不变（dispatch/spend/review），非注意力收件箱。
- claude-dispatcher：404 第十五轮（连续消失，保留存档）。

## 新进入者

- Astra（astra.build，macOS 私测）："a fleet of coding agents, one command center… you read one inbox"——per-task git worktree Spaces + 单收件箱分诊 + agent 起草 PR 一键合并；"one inbox" 语言高度同源但限本机 Claude/Codex worktree 编排，无云/Devin/跨设备聚合。升具名盯防候选，下轮复核公测进展。
- Rut（tryrut.com）：ticket 化 agent 工作流，带 "Decision inbox" 与 "waiting for a human decision" 状态——决策收件箱语言同源但绑定其 ticket 系统。入档观察。
- CodeFire（codefire.app）：chat-first 桌面工作台（五 CLI），跨项目 Planner + staging inbox + 手机 Capture 镜像；重心在工作台/记忆而非 waiting 聚合。存档。

## 定位结论

"one inbox" 语言在本地编排象限继续收敛（Astra 为最新最直接的表达），但跨"本地 CLI + 云端 agent（Devin）+ GitHub review-requested"的统一注意力收件箱仍无直接对手；首位命中仍为 attnbox。无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
