# GAP-ROUND-558：第四十七批竞品扫描——盯防全查，mission-control 与 Chatdex 入档，无 P0/P1

日期：2026-08-10
驱动维度：竞品调研（round-547 后首次；盯防名单逐项核查 + 三向新进入者搜索）

## 盯防名单动向

```text
kookr（3★）        08-07 推送：pipelineStarvation 计数入 kookr status——继续高速迭代，仍本地 router 无云端
ccmux（120★）      08-08 推送：v1.3.x 收尾常规迭代，定位语已含 "jump to the one that needs you"
agentfleet（0★）   08-09 推送：collector 修复——粘贴的通话转录误报为 operator instruction；诚实上报哲学继续深化
agent-inbox（1★）  08-07 推送：常规迭代，仍纯本地 MCP+SQLite
trail-boss（0★）   08-08 推送：常规迭代，"single-pane attention router" 定位不变
kelpie（1★）       08-07 推送：phone-first herdr 分诊台常规演进
coslash（3★）      08-08 推送：goal/decisions/handoff brief 重建方向深化，仍本地
impri（1★）        08-09 推送：审批收件箱常规迭代（MCP+REST 自托管）
claude-dispatcher  原仓与备选组织名均 404——已消失/改名（round-547 已录 squadrant 转编排：tu11aa/squadrant 08-07 推送，Claude-only 编排非注意力面）
```

## 新进入者

- **builderz-labs/mission-control（5,968★）**：self-hosted AI agent 控制面（dispatch/review runs/track spend，OpenClaw+Claude Code+Codex 多 runtime）。规模最大的相邻项目，但定位是编排+运营控制面，无 "谁在等我" waiting/ack 分诊语义——象限不同，升具名盯防（星量级最大）。
- **Kakob/Chatdex（0★）**："Know when your coding agents need you"——语言与我们主叙事直接重合，但实现为 Claude Code 转录的事后失败检测/干预分析（离线分析工具），非实时收件箱。入档观察。
- 三向搜索（attention inbox / unified inbox / attention router）首位命中仍为 attnbox 象限，无新直接对手。

## 差异化结论

跨 vendor（本地三家 + Devin 云端 + GitHub PR）+ 实时 SSE + waiting reason/action URL + ack 分诊 + 移动端的组合仍无对手。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
