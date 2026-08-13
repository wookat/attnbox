# GAP-ROUND-951: --host token 门禁 + waiting webhook 复测（round-940 后首次）

日期：2026-08-04 ｜ 规模：4,623 会话（迄今最大） ｜ 结论：**契约全部成立，无 P0/P1**。

## 1. --host token 门禁 10/10 首跑全通（隔离端口）

- 无 token 拒绝绑定 0.0.0.0（报错提及 token）✅
- 带 token 隔离 daemon 就绪 ✅
- items/SSE/ack 无 token → 401 ✅✅✅
- 坏 token → 401 ✅
- query token / Bearer → 200 ✅✅
- ack 坏 body → 400 ✅；数字 `at` → 400 ✅

## 2. ack/un-ack 往返（主 daemon @4820）

- 真实 waiting ID ack：台账 13→14 ✅
- un-ack：台账逐字节还原（前后 md5 一致）✅

## 3. waiting webhook（隔离 daemon + 本地接收器）

- 冷启动对存量 4 waiting 零重放 POST（id 集合比对）✅
- ~6 分钟观察：1 POST 1 唯一 id，均为真实新转换，无风暴 ✅

探针零残留（隔离 daemon/接收器已回收，台账 md5 与轮前一致）。

## 遗留

无新 P0/P1。

## 验收（Actions 降级门禁）

本地全绿：`pnpm lint` ✓ / `pnpm typecheck` ✓ / `pnpm build` ✓ / `pnpm test` 99 ✓。
