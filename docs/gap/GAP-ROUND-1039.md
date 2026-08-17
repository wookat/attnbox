# GAP-ROUND-1039: --host token 门禁 + waiting webhook 通道复测（round-1028 后首次）

日期：2026-08-18。基线：main `99ded42`（#1073 合并后）。结论先行：**门禁 10/10 + webhook 5/5 全通，无 P0/P1。**

## 一、--host token 门禁（隔离端口 4939，一次性测试 token，全部首跑通过）

| # | 检查 | 结果 |
|---|------|------|
| 1 | `--host 0.0.0.0` 无 token 拒绝绑定（报错提及 token） | PASS |
| 2 | 带 token 隔离 daemon 就绪（轮询探活，非固定 sleep） | PASS |
| 3 | `/api/items` 无 token → 401 | PASS |
| 4 | `/api/items?token=bad` → 401 | PASS |
| 5 | `/api/items?token=<valid>` → 200 | PASS |
| 6 | `/api/items` + `Authorization: Bearer <valid>` → 200 | PASS |
| 7 | `/api/events` 无 token → 401 | PASS |
| 8 | `/api/ack` 无 token → 401 | PASS |
| 9 | `/api/ack` 合法鉴权 + 非 JSON body → 400 | PASS |
| 10 | `/api/ack` 合法鉴权 + 数字 `at` → 400 | PASS |

隔离 daemon 日志 0 error。测试 token 为一次性随机值，未入库、未入档。

## 二、ack/un-ack 往返（主 daemon 4820，真实 waiting ID）

- 轮前台账 11 条，md5 `a3a670930a4b23fe057d219b79d6a5be`。
- 选取不在台账中的真实 waiting 项 ack：台账 11→12。
- un-ack（`at: null`）后台账逐字节还原，md5 与轮前一致。3/3 PASS。

## 三、waiting webhook（隔离 daemon 4942 + 本地 sink 4941，id 集合比对）

- 冷启动就绪时存量 waiting = 7，随后 30 秒窗 **0 POST、0 重放**（对存量 id 集合精确比对）——round-71 风暴防护契约继续成立。
- 约 6.5 分钟观察窗：**4 POSTs / 4 unique id，无重复通知**。
- 窗后 API 复核：4 个被通知 id 均为 waiting。其中 3 个不在冷启动存量集合（窗口内新进入 waiting 的真实转换）；1 个在存量集合但冷启动窗内零 POST，即其通知发生在观察窗内——为窗口内离开又重新进入 waiting 的转换即通知契约表现（与 round-1017/1028 同形态，非风暴）。
- 隔离 daemon 与 sink 均已关停，端口 4939/4942 均无监听残留；主 daemon 4820 全程健康（200）。

## 四、结论

- rounds 1029–1038 合并面无安全面/webhook 回归。
- 无 P0/P1。探针零残留。本地门禁全绿（lint / typecheck / build / test 99）。
