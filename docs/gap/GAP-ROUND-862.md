# GAP-ROUND-862 — PWA 离线快照 + SSE 韧性复走（纯文档）

Round 862. 主驱动：PWA 离线快照 + SSE 断线/重连韧性复走
（round-851 后首次），@4,511 会话（迄今最大）。

## 契约核验（5/5 全通）

- SW 注册正常（regs=1）。
- 杀 daemon 后 66 卡全保留 + offline 指示 ~1.5s 内出现。
- 宕机冷刷 SW 快照恢复 66/66 卡。
- 重启 daemon ~7s 无刷新自动回 live。
- 0 JS pageerror（7 条 console 均为宕机窗口网络噪音
  ERR_CONNECTION_REFUSED / ERR_INCOMPLETE_CHUNKED_ENCODING，
  预期断线表现）。

## 方法注记

- 首跑 offline 指示 1 处假 FAIL 为探针环境问题：机上残留了两个
  daemon 进程（前轮探针 spawn 未清理），`pgrep | head -1` 只杀掉
  其一，端口仍由另一进程服务故无 offline 态。清到单 daemon 后
  隔离复测 offline 指示 ~1.5s 出现，完整复走 5/5 全通，非产品缺陷。
- 教训入档：PWA 探针跑前先 `pgrep -af 'cli/dist/index.js'` 确认
  单实例。

## Verdict

无 P0/P1，探针零残留（复走后单 daemon 在跑、API 正常）。纯文档轮，
无 changeset。
