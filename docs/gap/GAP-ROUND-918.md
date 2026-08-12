# GAP-ROUND-918 — --host token 门禁 + waiting webhook 复测（纯文档）

Round 918. 主驱动：--host token 门禁负例多面 + waiting webhook 冷启动零重放/真实转换复测——round-907 后首次。证据日期：2026-08-04。规模 @4,582 会话（迄今最大）。

## 审计结果

- **token 门禁 10/10 首跑全通**：无 token 拒绝绑定 0.0.0.0（报错提及 token）；隔离 daemon（0.0.0.0 + token）轮询就绪后 items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 `at` 400。
- **ack/un-ack 往返**：真实 ID ack 台账 13→14，un-ack 后逐字节还原。
- **webhook 冷启动**：改良 id 集合探针（记录就绪时 16 条存量 waiting id）冷启动 30s 内 0 POST、对存量零重放；~6 分钟观察 4 POST 4 唯一，均为真实新转换，无风暴。
- **方法注记**：首跑 1 处假 FAIL 为探针只比对 POST 计数不比对 id——就绪窗口内 1 条真实新转换被误判为重放（waiting 18 存量场景），改为 id 集合比对后复测确证零重放，非产品缺陷。

隔离 daemon/探针零残留，台账终态与轮前逐字节一致。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
