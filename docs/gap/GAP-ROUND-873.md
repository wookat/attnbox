# GAP-ROUND-873 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 873. 主驱动：PWA 离线快照 + SSE 断线/重连韧性（round-862 后
首次），@4,527 会话（迄今最大）。

## 证据（5/5 首跑全通）

- SW 注册（regs=1）。
- 杀 daemon 后 64 卡全保留 + offline 指示。
- 宕机中冷刷新，SW 快照恢复 64/64 卡。
- 重启 daemon 后 ~4s 无刷新自动回 live（并列系列最快）。
- 0 JS pageerror；console 6 条均为宕机窗口网络噪音
  （ERR_CONNECTION_REFUSED / INCOMPLETE_CHUNKED_ENCODING），
  预期断线表现。
- 复走后全量爬取恢复至 4,527 会话，探针零残留，单 daemon 实例。

## Verdict

无 P0/P1。纯文档轮，无 changeset。
