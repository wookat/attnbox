# GAP-ROUND-813：本地采集器实弹抽查——三采集器状态判定 12/12 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-802 后首次）

## 实测（沙箱 fixture，dist 直调三采集器）

- Claude（5/5）：未解决 `tool_use` → waiting/approve 且 detail 带最后 assistant 文本预览；`tool_result` 解除 → idle；尾 user → working；陈旧 working 封顶 idle。
- Codex（4/4）：`exec_approval_request`（`command: string[]`）→ waiting/approve 且完整命令预览 `"wants to run: rm -rf build"`；`task_complete` → idle；`task_started` 新鲜 → working。
- Gemini（3/3）：近期活动 → working；陈旧 → idle；从不声称 waiting。

方法注记：Claude waiting 预览取的是最后一条 assistant **文本块**（`lastAssistantText`）——fixture 若只有 `tool_use` 块无 text 块则 detail 诚实为空（首跑 1 处假 FAIL 已排除，探针 fixture 假设问题，非产品缺陷）。沙箱零残留。

## 结论

三采集器状态判定契约全部成立，无 P0/P1。纯文档轮。
