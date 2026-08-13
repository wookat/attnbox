# GAP-ROUND-956: 本地采集器实弹抽查（Claude/Codex/Gemini 状态判定）

日期：2026-08-04。round-945 后首次采集器实弹轮。结论先行：**三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL，无 P0/P1**。沙箱（临时 HOME）零残留。

## 抽查结果（编译产物 dist/ 直接 collect）

| # | 契约 | 结果 |
|---|------|------|
| 1 | Claude 未解决 tool_use → waiting/approve | PASS |
| 2 | Claude waiting 带最后 assistant 文本预览（"May I run the migration?"） | PASS |
| 3 | Claude tool_result 解除 → idle | PASS |
| 4 | Claude 尾 user 新鲜 → working | PASS |
| 5 | Claude 陈旧 working 封顶 idle | PASS |
| 6 | Claude 陈旧未解决 waiting 保持 waiting（设计契约） | PASS |
| 7 | Codex exec_approval_request(string[]) → waiting/approve | PASS |
| 8 | Codex 完整命令预览（"wants to run: rm -rf build"） | PASS |
| 9 | Codex string 命令诚实回退（"wants to run a command"） | PASS |
| 10 | Codex task_complete → idle | PASS |
| 11 | Codex fresh task_started → working | PASS |
| 12 | Gemini 新鲜 mtime → working | PASS |
| 13 | Gemini 陈旧 mtime → idle | PASS |
| 14 | Gemini 从不声称 waiting | PASS |

## 结论

- rounds 946–955 合并面后三采集器状态判定无回归。
- 无 P0/P1；纯文档轮，无源码改动。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
