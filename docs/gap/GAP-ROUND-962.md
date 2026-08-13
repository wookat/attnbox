# GAP-ROUND-962: --host token 门禁 + waiting webhook 通道复测

日期：2026-08-04。round-951 后首次安全面轮。结论先行：**token 门禁 10/10 首跑全通、真实 ID ack/un-ack 往返台账逐字节还原、webhook 冷启动对存量 12 waiting 零重放、~6 分钟观察 0 POST 无风暴 @4,625 会话（迄今最大），无 P0/P1**。

## 1. --host token 门禁（隔离端口，10/10 首跑全通）

| # | 契约 | 结果 |
|---|------|------|
| 1 | 无 token 拒绝绑定 0.0.0.0（报错提及 token） | PASS |
| 2 | 带 token 隔离 daemon 就绪 | PASS |
| 3 | items 无 token 401 | PASS |
| 4 | items 坏 token 401 | PASS |
| 5 | items query token 200 | PASS |
| 6 | items Bearer 200 | PASS |
| 7 | SSE 无 token 401 | PASS |
| 8 | ack 无 token 401 | PASS |
| 9 | ack 坏 body 400 | PASS |
| 10 | ack 数字 at 400 | PASS |

## 2. ack/un-ack 往返（真实 ID）

- 台账 13→14→13，un-ack 后逐字节还原（md5 一致）。

## 3. waiting webhook 通道（隔离端口冷启动）

- 冷启动 id 集合比对：对存量 12 waiting 零重放 POST（posts=0）。
- ~6 分钟观察窗口：0 POST 0 唯一（无新转换、无风暴）。

## 结论

- rounds 952–961 合并面后安全面与 webhook 通道无回归；纯文档轮，无源码改动；探针零残留。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
