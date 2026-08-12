# GAP-ROUND-791：本地采集器实弹抽查——三采集器状态判定 11/11 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-780 后首次）

## 实测（沙箱 fixture，dist 构建直调三采集器）

- Claude（5/5）：未解决 tool_use → waiting/approve 且 detail 带 assistant 文本预览；tool_result 解除 + 尾 assistant 文本 → idle；尾 user → working；陈旧尾 user 封顶 → idle。
- Codex（4/4）：exec 审批请求 → waiting/approve 且 detail 带完整命令（"wants to run: rm -rf build"）；task_complete → idle；task_started → working。
- Gemini（2/2）：新鲜活动 → working 且从不声称 waiting；陈旧 mtime → idle。

首跑 11/11 全对，零假 FAIL。沙箱零残留（/tmp/coll791-sandbox 已删、探针脚本已删）。

## 结论

三采集器本机状态判定契约全部成立，无 P0/P1。纯文档轮。
