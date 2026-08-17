# GAP-ROUND-1028: --host token 门禁 + waiting webhook 复测（round-1017 后首次）

日期：2026-08-17。基线：main `699ae74`（#1062 合并后）。结论先行：**门禁 10/10 + webhook 零重放全通，无 P0/P1。**

## 方法

- 隔离端口（4906 门禁 / 4907 webhook / 4981 sink）全新 daemon，主 daemon（4820）不受影响；ack 往返在主 daemon 上用真实 ID 做，前后 md5 校验。

## 结果

### token 门禁（10/10 PASS）

| # | 检查 | 结果 |
|---|---|---|
| 1 | 无 token 绑定 0.0.0.0 拒绝（提示 token） | PASS |
| 2 | 带 token 隔离 daemon 就绪 | PASS |
| 3 | items 无 token 401 | PASS |
| 4 | items 坏 token 401 | PASS |
| 5 | items query token 200 | PASS |
| 6 | items Bearer 200 | PASS |
| 7 | SSE 无 token 401 | PASS |
| 8 | ack 无 token 401 | PASS |
| 9 | ack 坏 body 400 | PASS |
| 10 | ack 数字 at 400 | PASS |

### ack/un-ack 往返

- 真实 ID ack → un-ack：台账 11→12→11，前后 md5 逐字节一致（`a3a67093…`）。

### waiting webhook 冷启动 id 集合比对

- 冷启动前主 API 存量 waiting 10 项快照；隔离 daemon（ATTNBOX_WEBHOOK_URL→本地 sink）~6.7 分钟窗：
  - **存量 10 项零重放**（POST id 集合 ∩ 存量集合 = 空）。
  - 5 POSTs / 4 unique id，均为真实新 waiting 转换（4 个 id 窗后 API 复核均为 waiting）；1 个 id 二发为窗口内离开又重新进入 waiting 的转换即通知契约表现（与 round-1017 同形态），非风暴。
  - payload 契约成立：`.item.id` / `status=waiting`。
- 隔离 daemon 日志 0 error；live 面 @5,433→5,434 会话（迄今最大）。

## 备注

- rounds 1018–1027 合并面无安全面/webhook 回归。探针零残留（4906/4907/4981 端口与临时脚本均已清理）。
- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
