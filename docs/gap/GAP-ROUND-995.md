# GAP-ROUND-995：--host token 门禁 + waiting webhook 复测（round-984 后首次）

日期：2026-08-04。结论先行：**token 门禁 10/10 首跑全通、ack/un-ack 逐字节还原、webhook 冷启动对存量 24 waiting 零重放，无 P0/P1，纯文档轮。**

## 环境

- main @ #1029（ROUND-994 PWA/SSE 复走）合并后回归面（5f5fa14）；本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）。
- 实机 dogfood daemon（127.0.0.1:4820）@ 5,398 会话（迄今最大）；隔离端口探针（4904 门禁 / 4905 webhook / 4978 sink）。

## 结果

### token 门禁（隔离端口 4904，10/10 首跑全通）

- 无 token 拒绝绑定 0.0.0.0（报错含 token 提示）；带 token 启动就绪。
- items/SSE/ack 无 token 均 401；坏 token 401；query token 200；Bearer 200；ack 坏 body 400；ack 数字 at 400。

### ack/un-ack 往返（live daemon）

- 真实 waiting ID ack 后台账 11→12，un-ack 后 11 条，前后 md5 逐字节一致（a3a67093…）。

### waiting webhook 冷启动零重放（隔离端口 4905 + sink 4978）

- 启动前存量 24 waiting id 集合快照；~6 分钟观察窗口内 4 POSTs / 4 unique，全部为窗口内真实新 waiting 转换，**0 条命中存量集合（零重放）**。
- daemon 日志 0 error；探针零残留（隔离 daemon/sink 均已回收）。

## 结论

- rounds 985–994 合并面（#1020–#1029，全为纯文档轮）无安全面/webhook 回归。
- 无 P0/P1；按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
