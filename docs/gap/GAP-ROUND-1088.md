# GAP-ROUND-1088：本地采集器实弹抽查（round-1077 后首次）

日期：2026-08-04 ｜ 基线：main 868537d（#1122 合并后，99 测试绿）｜ 规模：live 5,472 会话（迄今最大）

## 结论

1. **无 P0/P1。** 三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL。
2. rounds 1078–1087 合并面（全部纯文档轮）无采集器回归。
3. 沙箱（temp HOME）用后即删，零残留；主 daemon 4820 不受影响。

## 逐项结果（沙箱 fixture → dist 采集器直调）

| # | 契约 | 结果 |
|---|------|------|
| 1 | Claude 未解决 tool_use → waiting/approve | PASS waiting/approve |
| 2 | Claude waiting 带文本预览 | PASS "May I run the migration?" |
| 3 | Claude tool_result 解除 → idle | PASS |
| 4 | Claude 尾 user → working | PASS |
| 5 | Claude 陈旧 working 封顶 idle | PASS |
| 6 | Claude 陈旧 waiting 保持 waiting | PASS |
| 7 | Codex exec 审批 → waiting/approve | PASS |
| 8 | Codex string[] 命令完整预览 | PASS "wants to run: rm -rf build" |
| 9 | Codex string 命令诚实回退 | PASS "wants to run a command" |
| 10 | Codex task_complete → idle | PASS |
| 11 | Codex fresh task_started → working | PASS |
| 12 | Gemini 新鲜 → working | PASS |
| 13 | Gemini 陈旧 → idle | PASS |
| 14 | Gemini 从不声称 waiting | PASS |

## 方法

- 探针：`~/a11y/coll1088.tmp.mjs`（round-1077 探针沿用）。
- 沙箱：`mkdtemp` 临时 HOME 写 Claude jsonl / Codex rollout jsonl / Gemini tmp 目录 fixture，直调 `packages/collectors/dist` 三采集器 `collect()`。
- fresh=now-60s、stale=now-3h；Gemini 陈旧面通过 utimes 回拨 mtime 构造。
- 主 daemon 4820 同刻健康：`/api/items` total=5,472 且 items==summary.total。
