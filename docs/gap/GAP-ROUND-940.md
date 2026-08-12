# GAP-ROUND-940: --host token 门禁 + waiting webhook 复测（round-929 后首次）

日期：2026-08-04 ｜ 规模：4,621 会话（迄今最大） ｜ 结论：**契约全部成立，无 P0/P1**。

## 1. --host token 门禁 10/10 首跑全通（隔离端口全新 daemon）

| # | 检查 | 结果 |
|---|---|---|
| 1 | 无 token 拒绝绑定 0.0.0.0（报错含 token） | ✅ |
| 2 | 带 token 隔离 daemon 就绪 | ✅ |
| 3–4 | items 无 token / 坏 token | ✅ 401 / 401 |
| 5–6 | items query token / Bearer | ✅ 200 / 200 |
| 7 | SSE 无 token | ✅ 401 |
| 8 | ack 无 token | ✅ 401 |
| 9 | ack 坏 body | ✅ 400 |
| 10 | ack 数字 at | ✅ 400 |

## 2. ack/un-ack 台账往返（主 daemon 真实 ID）

- ack 台账 13→14，un-ack 后**逐字节还原**。

## 3. waiting webhook 通道（隔离 daemon + 本地接收器）

- 冷启动 id 集合比对：对存量 6 waiting **零重放**（posts=0）。
- ~6 分钟观察窗：5 POST / 5 唯一 id，均为真实新转换，无风暴。

## 方法

- 探针脚本（sec/web 系列）复用 rounds 918/929 已入档方法（id 集合比对法），跑毕即删，零残留。

## 遗留

无新 P0/P1。
