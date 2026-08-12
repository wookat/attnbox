# GAP-ROUND-884 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 884. 主驱动：PWA 离线快照 + SSE 断线/重连韧性——round-873 后首次，
现规模 4,550 会话（迄今最大）。

## 证据（5/5 首跑全通）

- SW 注册正常（regs=1）。
- 杀 daemon：74 卡全保留 + offline 指示出现。
- 宕机中冷刷：SW 快照恢复 74/74 卡。
- 重启 daemon：~4s 无刷新自动回 live（并列系列最快）。
- 0 JS pageerror（console 6 条均为宕机窗口网络噪音
  ERR_CONNECTION_REFUSED / ERR_INCOMPLETE_CHUNKED_ENCODING，预期断线
  表现）。
- 复走后全量爬取恢复至 4,550 会话（迄今最大）。

## 方法注记

- 无新注记；沿用既有方法（单 daemon 实例前置检查、重启后轮询回 live）。

## Verdict

无 P0/P1。探针零残留（pwa884.tmp.mjs 已删）。纯文档轮，无 changeset。
