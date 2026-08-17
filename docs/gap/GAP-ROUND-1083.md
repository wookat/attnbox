# GAP-ROUND-1083：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-04（UTC）。round-1072 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通 + ack/un-ack 台账逐字节还原 + webhook 冷启动对存量 6 waiting 零重放（~6.5 分钟观察窗 0 POST），无 P0/P1。**

## 方法

- 门禁：隔离端口 4971 全新 daemon（`ATTNBOX_TOKEN` + `--host 0.0.0.0`），负例多面 curl 实测。
- ack 往返：主 daemon 4820 真实 waiting ID ack → un-ack，台账 `~/.attnbox/acked.json` 前后 md5 比对。
- webhook：隔离端口 4973 全新 daemon + 4972 sink，冷启动 30s 窗零重放断言 + ~6 分钟观察窗 POST id 集合比对。

## 结果

- token 门禁 10/10 首跑全通：无 token 拒绝绑定 0.0.0.0（报错提及 token）；items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400。
- 真实 ID ack/un-ack 往返：台账 19→20→19，轮前后 md5 `f7ebb960…` 逐字节一致。
- webhook 冷启动对存量 6 waiting 零重放（30s 窗 0 POST）；~6 分钟观察窗 0 POST / 0 unique（本窗无新 waiting 转换，诚实零通知）。
- 隔离端口 4971/4972/4973 全部释放、探针零残留；主 daemon 4820 全程健康（total=5,466）。

## 结论

- 无 P0/P1；纯文档轮。rounds 1073–1082 合并面无安全面/webhook 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
