# GAP-ROUND-745：第六十四批竞品扫描——Grok Build 官方 Agent Dashboard 入档

日期：2026-08-04
驱动维度：竞品调研（round-734 后首次；盯防名单全查 + 新进入者扫描）

## 盯防名单动向

- **mission-control**（builderz-labs）：★6.0k 持平，控制面（dispatch/spend/governance）定位不变，非注意力收件箱。
- **AgentBell**：三线并行确认（Mac 菜单栏监控 + npm agent-bell 音频通知 + iOS "decision center" 收件箱）；iOS 线 "One Inbox for Claude Code, Codex" 语言重合最强，但为 App Store 托管审批面、无 Devin/云会话聚合。
- **Agent Watch**：云 dashboard 远程监控定位不变（"waiting for you" 告警 + Slack/SMS 路由），云上报遥测与我们隐私优先相反。
- **yepanywhere**：持续高频演进——tiered inbox（Needs Attention → Active → Recent → Unread）+ 桌面 beta 安装包 + Android 开发中；官方对 Anthropic Remote Control 发文对标。仍无云/Devin 聚合。本地远程监督象限最强对手不变。
- **Acepe**：attention queue 专文在档（Answer needed/Error/Working/Planning/Finished 五态排序），macOS 原生 ADE 定位不变，无云聚合。
- **claude-dispatcher**：404 第十四轮（原仓库不可及；同名 manugomez95/claude-dispatcher 为 Linear→Slack 派工工具，非同一项目，不入盯防）。

## 新进入者

- **Grok Build Agent Dashboard**（xAI 官方，2026-06）：`grok dashboard` 终端面板——waiting 置顶排序、inline 审批回复、按目录分组、派工。第三个第一方 harness 自带注意力面（继 Claude Code agent view、Codex 后），验证赛道但单一 harness 内、无跨 agent/云聚合。入档观察。
- **Agent Ops Remote**（roboticscenter.ai）：token 门禁 "decision inbox"——WAIT/BLOCK/working/done 四桶 + 一键 approve/continue，等待语言与桶模型与我们高度同源；但绑定其机器人平台生态，非通用本地聚合。入档观察。
- **code-orchestrator**（antonioromano）：web dashboard 经 PTY 生成/监控 Claude/Gemini/Codex 会话，属 spawn-and-watch 编排面，非等待收件箱。存档。

## 结论

第一方 harness 自带注意力面已成趋势（Claude Code/Codex/Grok Build），但均限单一 harness；跨 agent（本地三家 + Devin 云）+ PR 兜底的本地优先统一收件箱定位仍无直接对手，首位命中仍为 attnbox。无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
