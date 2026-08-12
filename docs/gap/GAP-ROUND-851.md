# GAP-ROUND-851 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 851. 主驱动：PWA 离线快照 + SSE 断线/重连韧性复走
（round-840 后首次，现规模 4,500+ 会话）。

## 韧性核验（5/5 首跑全通）

1. Service Worker 注册正常（1 registration）。
2. 杀 daemon：57 卡全保留 + offline 指示出现。
3. 宕机中冷刷新：SW 快照恢复 57/57 卡。
4. 重启 daemon：~10s 无刷新自动回 live（offline 指示消失）。
5. 0 页面 JS 错误。

## 复测

复走后 daemon 全量爬取恢复至 4,501 会话（迄今最大），API 正常。

## Verdict

无 P0/P1：离线快照与 SSE 重连契约全部成立。探针零残留。纯文档轮，
无 changeset。
