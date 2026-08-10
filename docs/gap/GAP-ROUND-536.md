# GAP-ROUND-536：竞品第四十五批扫描——waiting-on 开环台账新进入者入档，无新直接对手

日期：2026-08-10
驱动维度：竞品调研（round-525 后首次）

## 盯防名单复查

```text
claude-dispatcher（k1e1n04/claude-code-dispatcher）：0.2.1，GitHub issue 轮询→Claude 自动出 PR 方向，与注意力收件箱正交
kookr（kookr-ai/kookr）：last push 持平（2026-07-19），静默期延续；attention router 定位不变，纯本地
ccmux（epilande/ccmux）：常规，无新版本
agentfleet：opsflowsh/agentfleet（OpenClaw 控制面）与 daomar-dev/agentfleet（任务调度 CLI）双线，均非 waiting 语义收件箱
gnestor/agent-inbox：Hammies inbox 工作区 + claude-workflow-plugin 配套，email+Notion+Claude 混排 GTD 方向不变，仍无云端 agent waiting 聚合
trail-boss / impri / coslash：静默
```

## 新进入者

```text
arkaigrowth/waiting-on（2026-07-20 建，0★，Python）：本地开环台账——email + Claude/Codex 转录 + 语音队列
  归一为 LineObservation 入 per-domain SQLite，回答"what is still waiting on you"；语言重合迄今最直接
  但纯本地、无云端 agent、无实时收件箱/SSE/action URL/ack 分诊——象限不同，入档观察
ai-ecoverse/gh-monday：gh 扩展的 GitHub 分诊排序（含本地 Claude/Codex 会话列举），非 waiting 语义收件箱，存档
```

三向搜索（"waiting on you AI agent inbox"）首位命中仍为 attnbox。

## 结论

- 差异化不变：本地+云端统一、诚实状态语义、waiting 预览+行动链接、分诊工作流。无新直接对手。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
