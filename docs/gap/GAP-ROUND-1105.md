# GAP-ROUND-1105：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-04（UTC）。round-1094 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通 + ack/un-ack 台账逐字节还原 + webhook 冷启动对存量 waiting 零重放（精确 id 集合断言 replays=0）+ ~6.5 分钟观察窗 4 POSTs / 3 unique 全为真实转换，无 P0/P1。**

## 方法

- 门禁：隔离端口 4957 全新 daemon（`ATTNBOX_TOKEN` + `--host 0.0.0.0`），负例多面 curl 实测。
- ack 往返：主 daemon 4820 真实 waiting ID ack → un-ack，台账 `~/.attnbox/acked.json` 前后 md5 比对。
- webhook：隔离端口 4959 全新 daemon + 4958 sink。首跑探针只记 waiting 数不记 id 集合，冷启动窗出现 1 POST 报 FAIL（posts=1 existing=5）；随即以精确探针复跑——启动即捕获初始 waiting **id 集合**，冷启动 30s 窗按 id 断言零重放，再观察 ~6.5 分钟比对全部 POST id。

## 结果

- token 门禁 10/10 首跑全通：无 token 拒绝绑定 0.0.0.0（报错提及 token）；items/SSE/ack 无 token 401、坏 token 401、query token 200、Bearer 200、坏 body 400、数字 at 400。
- 真实 ID ack/un-ack 往返：台账 19→20→19，轮前后 md5 `5166cdf4…` 逐字节一致。
- webhook 精确复跑：冷启动对存量 9 waiting **零重放**（30s 窗 posts=0 replays=0 existing=9）；~6.5 分钟观察窗 4 POSTs / 3 unique / preExistingIdPosts=0——1 个 id 两条为离开又重进 waiting 的转换即通知契约表现（与 rounds 1017/1028/1039/1050/1072 同形态非风暴），三个 id 轮后直查主 daemon 均为真实 waiting。
- 首跑 FAIL 判定为**探针方法缺陷非产品缺陷**：只比对 waiting 计数无法区分「存量重放」与「就绪窗内新转换」；精确 id 集合断言下零重放成立。方法注记：webhook 冷启动断言必须捕获启动时刻的 waiting id 集合并按 id 比对，不能只看 POST 数。
- 隔离端口 4957/4958/4959 全部释放、探针零残留；主 daemon 4820 全程健康（total=5,493，迄今最大）。

## 结论

- 无 P0/P1；纯文档轮。rounds 1095–1104 合并面无安全面/webhook 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
