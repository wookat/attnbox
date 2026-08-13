# GAP-ROUND-947: dogfood 数据健康度复查（round-936 后首次）

日期：2026-08-04 ｜ 规模：4,622 会话（迄今最大） ｜ 结论：**7/7 首跑全对，无 P0/P1**，连续第七十三个干净数据轮。

## 检查项（只读 `GET /api/items` 快照）

| # | 检查 | 结果 |
|---|---|---|
| 1 | items == summary.total | ✅ 4,622 == 4,622 |
| 2 | 重复 ID | ✅ 0 |
| 3 | 未知状态（非 waiting/working/idle/done） | ✅ 0 |
| 4 | 坏/未来时间戳 | ✅ 0 |
| 5 | waiting 与 summary 一致 + 全带 detail/url/attention | ✅ 8/8，0 缺失 |
| 6 | waiting 时长分布 | ✅ 中位 14.3 分钟，max 4,021.4 分钟（真实长挂云会话，忠实透传，与 rounds 914/925/936 同类） |
| 7 | ack 台账健康 | ✅ 13 条，0 孤儿 |

## 方法

- 单次只读快照，Node 一次性断言脚本，无写操作、探针零残留。
- ack 孤儿定义：台账 id 不在当前 items id 集合中。

## 遗留

- 无新 P0/P1。长挂 waiting max（~2.8 天）为云端会话真实状态，非采集缺陷（历史多轮已确认同类）。

## 验收（Actions 降级门禁）

本地全绿：`pnpm lint` ✓ / `pnpm typecheck` ✓ / `pnpm build` ✓ / `pnpm test` 99 ✓。
