# GAP-ROUND-837：dogfood 数据健康度复查（round-826 后首次）

日期：2026-08-04。主驱动：waiting/ack 数据健康度 + waiting 时长分布（rounds 827–836 合并面）。纯文档轮，无 P0/P1。

## 数据面（4,482 会话，迄今最大）

- `items == summary.total` 恒成立（4,482；waiting 13 / working 42 / idle 6 / done 4,421）。
- 0 重复 ID、0 未知状态、0 坏/未来时间戳。
- waiting 13/13 全带 detail + url + attention。
- waiting 时长：min 6.4 / 中位 17.0 / max 3,006.6 分钟——max 为真实长挂云会话忠实透传（LIMITS 已入档契约）。
- ack 台账 13 条：0 坏时间戳、0 孤儿（全部对应存量 item ID）。
- daemon 日志零错误。

## 方法

- 只读探针：直接 `GET /api/items` + 读取 `~/.attnbox/acked.json`（`Object.keys` 对象契约），零残留。

## 结论

- 连续第六十三个干净数据轮。无产品 P0/P1。
- 本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
