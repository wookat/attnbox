# GAP-ROUND-507：dogfood 数据健康度复查——3,960 会话全干净，无 P0/P1

日期：2026-08-05
驱动维度：dogfood 数据健康度（round-496 后首次；临时 daemon @ :4486，真实 org 数据 3,960 会话——迄今最大）

## 证据

```text
总量 3,960（迄今最大）→ waiting 10 / working 40 / idle 6 / done 3,904，0 未知状态
waiting 10/10 全带 detail + url + attention（0 缺失）
waiting 时长分布 → min 2.3 分钟 / 中位 21.2 分钟 / max 1,766.9 分钟
  max 为 rounds 474/485/496 同一真实长挂会话（devin:…abf699c3「基线落地批次①」）忠实透传，
  其余最老两项均 ~24 分钟内，新鲜
ack 台账 → 0 条目、0 孤儿（相对 /api/items 现存 ID 集核对）
```

- 连续第三十三个干净数据轮。
- 清理：daemon 杀净（连接拒绝复测）、日志删除、CDP 残留 0。

## 结论

- 数据面全干净。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
