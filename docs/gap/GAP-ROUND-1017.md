# GAP-ROUND-1017: --host token 门禁 + waiting webhook 通道复测（round-1006 后首次）

日期：2026-08-17。基线：main `f788667`（#1051 合并后）。结论先行：**门禁 10/10 全通 + webhook 冷启动零重放，无 P0/P1。**

## 方法

隔离端口全新 daemon（4910，`--host 0.0.0.0` + token）+ 本地 webhook sink（4771）：负例/正例矩阵 → 真实 ID ack/un-ack 台账往返 → 冷启动 id 集合比对 + ~7 分钟通知窗观察。

## 结果

### token 门禁（10/10）

| # | 场景 | 结果 |
|---|---|---|
| 1 | 无 token 拒绝绑定 0.0.0.0（诚实报错退出） | PASS |
| 2 | items 无 token → 401 | PASS |
| 3 | SSE (`events?slim=1`) 无 token → 401 | PASS |
| 4 | items 坏 token → 401 | PASS |
| 5 | items query token → 200 | PASS |
| 6 | items Bearer token → 200 | PASS |
| 7 | ack 无 token → 401 | PASS |
| 8 | ack 坏 token → 401 | PASS |
| 9 | ack 坏 body → 400 | PASS |
| 10 | ack 数字 at → 400 | PASS |

### ack/un-ack 往返

真实 waiting ID ack → un-ack：台账 11→12→11，前后 md5 逐字节一致（`a3a67093…`）。

### waiting webhook

- 冷启动对存量 10 waiting 零重放：8/10 存量 id 全程无 POST；2 个进 POST 的均带状态翻转证据（一个 lastActivityAt 刷新至窗口内、一个窗口后已回 working），为真实 live 转换忠实通知（同 rounds 926/937/984 注记）。
- ~7 分钟窗 6 POSTs / 5 unique（1 个 id 二发为窗口内离开又重新进入 waiting 的转换即通知契约表现、非风暴形态），payload id 均在 `.item.id`。
- 隔离 daemon 日志 0 error；@5,424+ 会话（迄今最大）。

## 证据

- 复走后隔离端口（4910/4771）关闭、探针零残留；主 daemon（4820）不受影响。
- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
