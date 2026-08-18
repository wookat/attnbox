# GAP-ROUND-1138：--host token 门禁 + waiting webhook 通道复测

日期：2026-08-18（UTC）。round-1127 后首次安全面/webhook 轮。结论先行：**token 门禁 12/12 首跑全通（隔离端口 4948）；webhook 冷启动对存量 4 waiting 精确 id 集合断言零重放（30s 窗 posts=0）；~6 分钟采样观察窗 3 POSTs 全部为窗口内新进入 waiting 的真实转换即通知、存量 id 零 POST；sink 延续记录至 ~17 分钟共 9 POSTs / 7 unique，含存量 `1795f534…` 离开又重进 waiting 的合法 leave/re-enter 通知（一处 3.2s 双 POST 观察项入档，见 §2）；主 daemon 4820 全程健康、ack 台账 md5 逐字节一致。无 P0/P1。**

基线：main @ ab33462（#1172 合并后），`pnpm build` 全绿后以 `packages/cli/dist/index.js` 起隔离 daemon。

## 1. --host token 门禁（隔离端口 4948，12/12 首跑全通）

| # | 用例 | 期望 | 结果 |
|---|------|------|------|
| 1 | `--host 0.0.0.0` 无 token 启动 | 拒绝并提示 token | PASS |
| 2 | 带 `ATTNBOX_TOKEN` 启动 | 就绪（轮询 200） | PASS |
| 3 | `/api/items` 无 token | 401 | PASS |
| 4 | `/api/items?token=bad` | 401 | PASS |
| 5 | `/api/items` 坏 Bearer | 401 | PASS |
| 6 | `/api/items?token=<valid>` | 200 | PASS |
| 7 | `/api/items` 正确 Bearer | 200 | PASS |
| 8 | `/api/events` 无 token | 401 | PASS |
| 9 | `/api/events?token=<valid>` | 200（短读） | PASS |
| 10 | `/api/ack` 无授权 | 401 | PASS |
| 11 | `/api/ack` 坏 body（带 token） | 400 | PASS |
| 12 | `/api/ack` 数字 `at`（带 token） | 400 | PASS |

## 2. waiting webhook 冷启动零重放 + 观察窗（隔离端口 4950，sink 4949）

- 启动前基线（主 daemon 直查）：waiting 4 项，精确 id 集合
  `1795f534…、3d5e9849…、908e5cd0…、dae2db55…`（total=5,527）。
- 冷启动：隔离 daemon（`ATTNBOX_WEBHOOK_URL` 指向本地 sink）就绪后 30s 窗 **posts=0**，隔离面 waiting id 集合与基线四项逐项一致——**存量零重放成立**。
- 采样观察窗（05:27:10–05:33:11，13 次 30s 采样）：3 POSTs，均为窗口内**新进入 waiting** 的真实转换，存量 4 id 零 POST：
  - `c5ca6f5d…`：POST 05:27:11，05:27:40 采样起进入 waiting 集合；
  - `b7175fcd…`：POST 05:30:38，05:32:11 采样中在场（同刻 `1795f534…`/`3d5e9849…` 已离开 waiting，为真实 live 转换，未触发 POST，符合仅 enter-waiting 契约）；
  - `41cb7489…`：POST 05:33:19（末次采样后），轮后直查 status=waiting。
- sink 延续记录（至 05:43:51，共 9 POSTs / 7 unique）：采样窗后新增 `a80f13fce…`/`03588f38…`/`6da36a01…` 三个新进入 waiting id 各 1 POST；`41cb7489…` 第二次 POST（05:40:16，lastActivityAt 更新为 05:40:01）为离开又重进 waiting 的合法 leave/re-enter 通知（round-1127 方法注记同类）；存量 `1795f534…` 在 05:32:11 采样已离开 waiting，05:35:30/05:35:34 两次 POST 为重进 waiting 通知，轮后直查 status=waiting。
- **观察项（非 P0/P1）**：`1795f534…` 两次 POST 间隔仅 3.2s 且 lastActivityAt 相同（05:35:28），按 waitingSeen enter-only 语义应为两次采集周期间的快速 waiting↔非 waiting 抖动；单例、无用户面损害（webhook 消费端本就需幂等），入档待下轮安全面复测复核是否复现。

## 3. 环境保全

- 隔离端口 4948/4949/4950 全部释放（`ss -ltn` 复核零监听），sink 与隔离 daemon 逐 pid 单杀，探针零残留（`/home/ubuntu/a11y` 无 1138 残留）。
- 主 daemon 4820 全程健康（轮后 `/api/items` 200）。
- ack 台账 `~/.attnbox/acked.json`：19 条，md5 `5166cdf444b78b4bcb1fe55e7fbc8832` 轮前后逐字节一致。

## 4. 结论

rounds 1128–1137 合并面无安全面/webhook 回归。无 P0/P1；一项 webhook 3.2s 双 POST 观察项入档（§2）。
