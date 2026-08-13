# GAP-ROUND-955: 分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）

日期：2026-08-04。round-944 后首次分诊 UX 轮。结论先行：**11/11 契约首跑全通 @4,624 会话（迄今最大），无假 FAIL，无 P0/P1**。台账终态 md5 与轮前逐字节一致（`6a71161233e790dfb225ce5555f060c9`），探针零残留。

## 走查结果（真实 dogfood 数据，主 daemon 4820）

| # | 契约 | 结果 | 证据 |
|---|------|------|------|
| 1 | 默认态渲染 slim 卡片 | PASS | cards=44 |
| 2 | 默认态零全量 `/api/items` fetch（slim SSE） | PASS | itemsFetches=0 |
| 3 | Needs You 计数与 API 未 ack waiting 同刻精确一致 | PASS | ui=7 == api=7 |
| 4 | 惰性搜索恰好触发 1 次全量 fetch，客户端过滤 | PASS | delta=1, hits=7 |
| 5 | 负例搜索诚实空态 | PASS | cards=0 |
| 6 | 键盘 j→e ack 台账 13→14 | PASS | 13->14 |
| 7 | API 反 ack 台账逐字节还原 | PASS | unacked devin:devin-7eae967… |
| 8 | ✓ all done 批量 ack 全部 waiting | PASS | 13->20 (+7) |
| 9 | 逐项反 ack 后台账再次逐字节还原 | PASS | removed 7 |
| 10 | ? 快捷键帮助面板 | PASS | 可见 |
| 11 | 0 页面/console 错误 | PASS | — |

## 结论

- rounds 945–954 合并面（采集器/文档/数据/CLI/a11y/PWA/安全/handoff/soak/竞品十轮）后分诊面无回归。
- 无 P0/P1；纯文档轮，无源码改动。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准，不依赖 GitHub Actions。
