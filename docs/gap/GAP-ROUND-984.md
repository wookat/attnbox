# GAP-ROUND-984：--host token 门禁 + waiting webhook 复测（round-973 后首次）

日期：2026-08-04。基线 main：#1018（`87ee495`）。live daemon @5,370 会话。

## token 门禁（隔离端口，10/10 首跑全通）

- 无 token 拒绝绑定 0.0.0.0（报错提及 token）。
- ATTNBOX_TOKEN 下隔离 daemon 就绪；items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 `at` 400。

## ack/un-ack 往返（live daemon）

- 真实 waiting ID ack：台账 13→14；un-ack 后逐字节还原（前后 md5 均 `6a711612…`）。

## waiting webhook（隔离 daemon + 本地 sink）

- 冷启动 id 集合比对：对存量 30 waiting 零重放 POST。
- ~6 分钟观察：9 POSTs / 8 unique id——其中 1 个 id 出现 2 次，与"转换即通知"契约一致的解释是该会话在窗口内离开又重新进入 waiting 各触发一次；非风暴式重复（rounds 71/81 修复的抖动风暴为同 id 高频连发，与本次单次二发形态不同）。

## 结论

- rounds 974–983 合并面安全/webhook 契约无回归；无 P0/P1；探针零残留（台账终态 md5 与轮前一致）。
- 本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）；GitHub Actions 按公司政策保持禁用，以本地门禁为验收标准。
