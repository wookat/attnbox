# GAP-ROUND-1149：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-04（UTC）。round-1138 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通 + webhook 冷启动对存量 8 waiting 零重放、~6.5 分钟观察窗 2 POSTs 均为真实转换即通知，无 P0/P1。**

## token 门禁（隔离端口 4944）

| # | 断言 | 结果 |
|---|---|---|
| 1 | 无 token 拒绝绑定 0.0.0.0（报错提及 token） | PASS |
| 2 | ATTNBOX_TOKEN 下隔离 daemon 就绪（轮询） | PASS |
| 3 | items 无 token → 401 | PASS |
| 4 | items 坏 token → 401 | PASS |
| 5 | items query token → 200 | PASS |
| 6 | items Bearer → 200 | PASS |
| 7 | SSE 无 token → 401 | PASS |
| 8 | ack 无 token → 401 | PASS |
| 9 | ack 坏 body（带合法 auth）→ 400 | PASS |
| 10 | ack 数字 at（带合法 auth）→ 400 | PASS |

10/10 首跑全通（SEC1149_DONE pass=10 fail=0）。

## waiting webhook（隔离 daemon 4946 + 本地 sink 4945）

- 冷启动就绪时存量 waiting=8（精确 id 集合捕获）。
- 30s 冷启动窗：posts=0、replays=0——存量 waiting 零重放（精确 id 集合断言）。
- ~6 分钟观察窗：共 2 POSTs / 2 unique id，均不在存量集合内（preExistingIdPosts=0），为窗口内新进入 waiting 的真实转换即通知；轮后主 daemon 直查两 id 均为 waiting，属合法 live 转换。
- WEB1149_DONE pass=2 fail=0。round-1138 的 3.2s 双 POST 观察项本轮未复现，收口。

## 环境与残留核验

隔离端口 4944/4945/4946 轮后全部释放；探针零残留（全部位于仓库外 /home/ubuntu/a11y）。主 daemon 4820 全程健康（同刻 total=5537 / waiting=9 / working=30）。ack 台账只读未动（md5 5166cdf4…，19 条，轮前后逐字节一致）。

## 回归面

rounds 1139–1148 合并面（#1174–#1183，全为纯文档轮）无安全面/webhook 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
