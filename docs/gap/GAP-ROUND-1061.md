# GAP-ROUND-1061：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-04（UTC）。round-1050 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通 + ack/un-ack 台账逐字节还原 + webhook 冷启动对存量 12 waiting 零重放，~6 分钟窗 1 POST / 1 unique 零重复。无 P0/P1。**

## 方法

- 隔离端口 4991 起 `--host 0.0.0.0` 带 token daemon 跑门禁负例；隔离端口 4994（webhook sink 4993）起全新 daemon 跑 webhook 冷启动比对；主 daemon 4820 不受影响（轮后复核 total=5,451 / waiting=11）。

## 结果

### token 门禁（10/10）

1. 无 token 拒绝绑定 0.0.0.0（报错提及 token）。
2. 带 token 隔离 daemon 就绪。
3. items 无 token 401；4. 坏 token 401；5. query token 200；6. Bearer 200。
7. SSE 无 token 401；8. ack 无 token 401；9. 坏 body 400；10. 数字 at 400。

### ack/un-ack 往返（主 daemon）

- 真实 waiting ID ack 后台账 11→12，un-ack（`at: null`）后与轮前逐字节一致（md5 前后均 `a3a67093…`）。

### webhook 冷启动 + 观察窗

- 冷启动 30s 窗对存量 12 waiting 零重放（0 POST）。
- ~6 分钟观察窗 1 POST / 1 unique，为窗口内新进入 waiting 的真实转换即通知契约表现，零重复，非风暴。

- 隔离端口（4991/4993/4994）轮后全部释放，探针零残留。

## 对照面

- rounds 1051–1060 合并面（#1086–#1095，全为纯文档轮）无安全面/webhook 回归。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
