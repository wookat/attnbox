# GAP-ROUND-1050：--host token 门禁 + waiting webhook 通道复测（round-1039 后首次）

日期：2026-08-04
基线：main 26a9216（#1084 已合并）
结论：**无 P0/P1**。token 门禁 10/10 首跑全通；ack/un-ack 往返台账逐字节还原；webhook 冷启动对存量 waiting 零重放（两次独立冷启动均 0 POST）；观察窗转换即通知契约成立、非风暴形态。

## 1. --host token 门禁（隔离端口 4967，一次性 token，不入库不打印）

10/10 首跑全通：

| # | 用例 | 期望 | 结果 |
|---|------|------|------|
| 1 | `--host 0.0.0.0` 无 token 启动 | 拒绝并提示 token | PASS |
| 2 | 带 token 隔离 daemon 就绪（轮询探活） | 200 | PASS |
| 3 | `/api/items` 无 token | 401 | PASS |
| 4 | `/api/items?token=bad` | 401 | PASS |
| 5 | `/api/items?token=<正确>` | 200 | PASS |
| 6 | `Authorization: Bearer <正确>` | 200 | PASS |
| 7 | `/api/events` 无 token | 401 | PASS |
| 8 | `/api/ack` 无 token | 401 | PASS |
| 9 | `/api/ack` 坏 body（非 JSON） | 400 | PASS |
| 10 | `/api/ack` 数字 `at` | 400 | PASS |

隔离 daemon 日志 0 error，进程/端口探后零残留。

## 2. ack/un-ack 往返（主 daemon 4820，真实 waiting ID）

- 选取台账外真实 waiting 项（devin:devin-7cce…3fa8）ack：台账 11→12。
- un-ack（`at: null`）：台账恢复至轮前**逐字节一致**（md5 a3a670…d5be 前后一致）。

## 3. waiting webhook 冷启动零重放 + 转换即通知（id 集合比对）

两次独立冷启动（隔离端口 4982 / 4984，各自受控 sink 4981 / 4983）：

- 第一次：存量 waiting=7，冷启动 30s 窗 **0 POST**；~6 分钟窗 5 POSTs / 3 unique。
- 第二次（带完整 id 集合与窗后 API 复核）：存量 waiting=9（id 全量记录），冷启动 30s 窗 **0 POST、对基线集合零重放**；~6 分钟窗 **5 POSTs / 5 unique 零重复**：
  - 4 个为窗口内新进入 waiting 的真实转换（不在基线集合、窗后 API 复核均为 waiting）；
  - 1 个基线 id（devin-41cb…36b01）为窗口内离开又重进 waiting 的转换即通知契约表现（与 rounds 1017/1028/1039 同形态），窗后仍 waiting；
  - 非风暴形态（~6 分钟 5 POSTs）。

## 4. 环境健康

- 探针结束后隔离端口（4967/4979/4981/4982/4983/4984）全部释放；
- 主 daemon 4820 全程健康（200）；
- 台账终态 md5 与轮前一致；探针零残留。

## 5. 判定

rounds 1040–1049 合并面无安全面/webhook 回归。无 P0/P1，本轮纯文档入档。
