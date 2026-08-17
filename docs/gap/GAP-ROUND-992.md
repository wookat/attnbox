# GAP-ROUND-992：CLI 黄金路径复走（round-981 后首次）

日期：2026-08-04。结论先行：**doctor 七行全对、ls --waiting 计数与 API 同刻精确一致、hooks --install 沙箱四态 6/6 首跑全通，无 P0/P1，纯文档轮。**

## 环境

- main @ #1026（ROUND-991 数据健康度）合并后回归面（03629f1）；本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）。
- 实机 dogfood daemon（127.0.0.1:4820）@ 5,390 会话（迄今最大）。
- hooks 四态在隔离 HOME 沙箱验证，不触真实配置，沙箱零残留。

## doctor（~0.17s）

七行全对：node ✓ / claude-code hooks 权威 ✓ / codex hooks.json 权威 ✓ / gemini 启发式 ✓ / devin API key 有效 ✓ / github-pr 未配置诚实 "fallback inactive" – / webhook 未配置诚实提示 –。

## ls --waiting（热跑 ~4.8s @5,390）

- 22 waiting 全带"在等什么"预览 + 等待时长 + 行动链接（session URL + PR 次级链接）；
- 尾行计数 `22 waiting on you · 63 working · 5390 total` 与 `/api/items` summary 同刻精确一致（22/63/5390 == 22/63/5390），本轮无观察竞态。

## hooks --install 沙箱四态（6/6 首跑全通）

| # | 态 | 期望 | 结果 |
|---|---|---|---|
| 1 | 无工具目录 | 诚实 "not found" | PASS |
| 2 | Claude 全新落地 | 写入 + .attnbox-bak 备份 | PASS |
| 3 | Codex 全新落地 | .attnbox-bak 备份 | PASS |
| 4 | 幂等重装 | 逐字节不动 | PASS |
| 5 | 坏 JSON | exit 非 0 拒绝 | PASS |
| 6 | 坏 JSON 原文件 | 逐字节不动 | PASS |

## 结论

- rounds 982–991 合并面（#1017–#1026，全为纯文档轮）对 CLI 面无回归；
- 无 P0/P1；按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
