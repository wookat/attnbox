# GAP-ROUND-826：dogfood 数据健康度复查（round-815 后首次）

日期：2026-08-04。主驱动：waiting/ack 数据健康度 + waiting 时长分布。纯文档轮，无 P0/P1。

## 实测证据（生产 daemon /api/items @4,463 会话，迄今最大）

- 4,463 条：0 重复 ID、0 未知状态、0 坏/未来时间戳（statuses: waiting 14 / working 47 / idle 6 / done 4,396）。
- `items.length == summary.total`（4,463）恒成立。
- waiting 14/14 全带 detail + url + attention（全部 `answer`），预览均为真实提问文本。
- waiting 时长中位 15.6 分钟、max 2,905.8 分钟——max 为真实长挂会话忠实透传（与 rounds 793/804/815 同一类长尾），非数据缺陷。
- ack 台账 `~/.attnbox/acked.json` 13 条（{id: timestamp} 对象），0 孤儿（全部指向存活 item id）。
- daemon stdout/stderr 指向 /dev/null，无法做日志错误率断言；健康证据基于 API 全程 200 与数据一致性。

连续第六十二个干净数据轮。探针只读，零残留。

## P0/P1 判定

无。

## 门禁

本地 `pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
