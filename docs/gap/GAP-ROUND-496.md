# GAP-ROUND-496：dogfood 数据健康度复查——3,950 会话全干净，无 P0/P1

日期：2026-08-05
驱动维度：dogfood 数据健康度（round-485 后首次；waiting/ack 数据健康度 + waiting 时长分布）

## 探针与证据（临时 daemon @ :4479 首爬后 /api/items 全量快照）

```text
total: 3950（迄今最大）
statuses: {"waiting":7,"working":41,"idle":6,"done":3896}
unknown statuses: 0
waiting: 7 · missing detail/url/attention: 0
waiting age min 0.8 · median 8.8 · max 1688.4 minutes
acked ledger: 0 · orphans: 0
```

- max 1,688.4 分钟为 round-474/485 同一真实长挂 Devin waiting 会话的延续（485 时 1,603.5 分钟，间隔一致）——vendor-authoritative 忠实透传，非 stale-status 缺陷。
- 最老 waiting 项 detail/url/attention 齐全（真实 CI 未触发提问）。
- 清理：daemon fuser -k 杀净（复测连接拒绝）、临时快照删除、零残留。

## 结论

- 连续第三十二个干净数据轮：0 未知状态、waiting 全带"在等什么"与行动链接、ack 台账零孤儿。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
