# GAP-ROUND-1116：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-04（UTC）。round-1105 后首次安全面/webhook 轮。结论先行：**token 门禁 10/10 首跑全通（隔离端口 4954），webhook 冷启动精确 id 集合断言对存量 9 waiting 零重放（30s 窗 posts=0 replays=0），~6.5 分钟观察窗 2 POSTs / 2 unique / 存量 id 零 POST，无 P0/P1。**

## Token 门禁（隔离端口 4954，全新 daemon）

| # | 断言 | 结果 |
|---|------|------|
| 1 | 无 token 绑定 0.0.0.0 被拒（报错提及 token） | PASS |
| 2 | 带 ATTNBOX_TOKEN 隔离 daemon 就绪（轮询 200） | PASS |
| 3 | items 无 token → 401 | PASS |
| 4 | items 坏 token → 401 | PASS |
| 5 | items query token → 200 | PASS |
| 6 | items Bearer token → 200 | PASS |
| 7 | SSE 无 token → 401 | PASS |
| 8 | ack 无 token → 401 | PASS |
| 9 | ack 坏 body → 400 | PASS |
| 10 | ack 数字 at → 400 | PASS |

## Waiting webhook（隔离 daemon 4956 → 接收器 4955）

- 冷启动前存量 waiting id 集合 9 条；30s 冷启动窗 **0 POST、0 重放**（按精确 id 集合比对，遵循 round-1105 方法注记）。
- ~6.5 分钟观察窗共 2 POSTs / 2 unique id，全部不在存量集合中——为窗口内新进入 waiting 的真实转换（转换即通知契约表现）。
- 轮后直查主 daemon：一 id 仍 waiting，另一 id 已转 working（观察后合法离开 waiting 的真实 live 转换），忠实透传非缺陷。

## 清理与回归面

隔离端口 4954/4955/4956 全部释放，探针零残留（日志留档 `~/a11y/sec1116.log` / `~/a11y/web1116.log`），主 daemon 4820 全程健康（total=5,503 迄今最大）。rounds 1106–1115 合并面（#1141–#1150，全为纯文档轮）无安全面/webhook 回归。无 P0/P1。

## 门禁

本地四门禁（`pnpm lint` / `pnpm typecheck` / `pnpm build` / `pnpm test`）须全绿后方可出 PR。
