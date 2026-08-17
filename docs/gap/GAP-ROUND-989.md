# GAP-ROUND-989：本地采集器实弹抽查（round-978 后首次）

日期：2026-08-04。结论先行：**三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL，无 P0/P1，纯文档轮。**

## 环境

- main @ #1023（ROUND-988 分诊走查）合并后回归面（466f6cb）；本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）。
- 实机 dogfood daemon（127.0.0.1:4820）@ 5,385 会话（迄今最大）。
- 探针：沙箱 fixture（隔离 HOME，不触真实转录），方法沿用 rounds 945/956/967/978。

## 契约与结果（14/14 首跑全对）

| # | 采集器 | Fixture | 期望 | 结果 |
|---|---|---|---|---|
| 1 | Claude | 未解决 tool_use | waiting/approve | PASS |
| 2 | Claude | waiting 详情预览 | "May I run the migration?" | PASS |
| 3 | Claude | tool_result 解除 | idle | PASS |
| 4 | Claude | 尾 user 消息 | working | PASS |
| 5 | Claude | 陈旧 working | 封顶 idle | PASS |
| 6 | Claude | 陈旧 waiting | 保持 waiting | PASS |
| 7 | Codex | string[] 审批 | waiting/approve | PASS |
| 8 | Codex | 命令预览 | "wants to run: rm -rf build" | PASS |
| 9 | Codex | task_complete | idle | PASS |
| 10 | Codex | fresh task_started | working | PASS |
| 11 | Codex | string 命令诚实回退 | waiting + "wants to run a command" | PASS |
| 12 | Gemini | 新鲜转录 | working | PASS |
| 13 | Gemini | 陈旧转录 | idle | PASS |
| 14 | Gemini | 从不声称 waiting | 无 waiting | PASS |

## 结论

- rounds 979–988 合并面（#1014–#1023，全为纯文档轮）对三采集器状态判定无回归；
- 零假 FAIL，沙箱零残留；
- 无 P0/P1；按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准。
