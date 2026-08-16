# GAP-ROUND-973：--host token 门禁 + waiting webhook 复测（round-962 后首次）

日期：2026-08-16。结论先行：**门禁 10/10 + 往返还原 + webhook 零重放，全通，无 P0/P1。**

## 核查面（隔离端口探针，零残留）

1. token 门禁 10/10 首跑全通：无 token 拒绝绑定 0.0.0.0；items/SSE/ack 无 token 401、坏 token 401、query+Bearer 200、坏 body 400、数字 at 400 ✓。
2. 真实 ID ack/un-ack 往返：台账 13 条，md5 前后逐字节还原（`6a71161…` → 中间态 → `6a71161…`）✓。
3. webhook 冷启动 id 集合比对：对存量 15 waiting 零重放；~6 分钟观察窗 4 POST 4 唯一，均为真实新 waiting 转换（无风暴）✓；隔离 daemon 日志 0 error。
4. 复走后主 API @5,349 会话（迄今最大）。

## 方法注记

- 探针首次统计误将 webhook body 顶层 `.id` 当作项 id（实际结构为 `{event, item:{id}}`），导致 unique 误读为 1；按 `.item.id` 重算后 4/4 唯一。属探针缺陷，非产品缺陷。

## 结论

- 无 P0/P1；纯文档轮；
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
