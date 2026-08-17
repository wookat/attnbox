# GAP-ROUND-1072：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-17（UTC）。round-1061 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通、ack/un-ack 台账逐字节还原、webhook 冷启动对存量 7 waiting 零重放，~6.5 分钟窗 3 POSTs / 2 unique（1 个 id 6s 内两条为离开又重进的转换即通知契约表现，与 rounds 1017/1028/1039/1050 同形态非风暴）。无 P0/P1。**

## 方法

- 隔离端口 4992 起全新 daemon（token 轮与 webhook 轮各一次），主 daemon 4820 全程不受影响。
- token 门禁：无 token 拒绝绑定 0.0.0.0；items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400。
- ack 往返：主 daemon 上取真实未 ack waiting id，ack→台账 19→20、un-ack→台账还原，轮前后 md5 逐字节一致。
- webhook：本地 sink :4979 收 POST；冷启动存量 waiting id 集合入盘，30s 窗与 sink 记录集合比对；随后 ~6.5 分钟观察窗按 id 集合比对真实转换。

## 结果

- token 门禁 10/10 首跑全通（SEC1072 pass=10 fail=0）。
- ack/un-ack 往返 200/200，台账 md5 `f7ebb960…` 前后逐字节一致 ✓。
- 冷启动对存量 7 waiting 30s 窗 0 POST 零重放 ✓。
- ~6.5 分钟窗 3 POSTs / 2 unique id：1 个新进入 waiting 的真实转换 1 条；另 1 个 id 6s 内两条（同 lastActivityAt）为窗口内离开又重进 waiting 的转换即通知契约表现，与既往轮同形态非风暴；窗后两 id 均已离开 waiting（真实 live 转换）。
- 隔离 daemon 日志 0 error（total=5,458 迄今最大），隔离端口与 sink 全部释放、探针零残留、主 daemon 4820 全程健康。

## 结论

- 无 P0/P1；纯文档轮。rounds 1062–1071 合并面无安全面/webhook 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
