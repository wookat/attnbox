# GAP-ROUND-841：--host token 门禁 + waiting webhook 复测（round-830 后首次）

日期：2026-08-04。主驱动：安全面负例多面 + webhook 存量零误 POST 实弹复测 @4,485+ 会话（rounds 831–840 合并面）。纯文档轮，无 P0/P1。

## 结果（13/13 首跑全通）

### token 门禁（独立实例 0.0.0.0:4899）

1. 无 token 绑定 0.0.0.0 拒绝启动（exit 1）。✓
2. items / SSE / ack 无 token → 401（三面）。✓
3. 坏 token → 401。✓
4. query token → 200；`Authorization: Bearer` → 200。✓
5. 坏 ack body → 400；数字时间戳 → 400。✓

### ack/un-ack 往返（主 daemon 4820）

- 真实 waiting ID ack：台账 13→14；un-ack（`at: null`）：台账逐字节还原。✓

### webhook 通道

- 冷启动对存量 16 waiting 零误 POST。✓
- ~8 分钟观察窗：8 POST 6 唯一（2 处重复为真实 waiting→non-waiting→waiting 重转换重发，契约内），无风暴。✓

## 方法

- 探针 `sec841.tmp.mjs` 外置仓库外；独立实例/接收器测后清理，主 daemon 台账逐字节还原，零残留。

## 结论

- 无产品 P0/P1。
- 本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
