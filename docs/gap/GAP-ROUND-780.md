# GAP-ROUND-780：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-769 后首次）

## 沙箱 fixture 证据（dist 构建直跑，首跑零假 FAIL）

- Claude（5/5）：未解决 tool_use → waiting/approve 且带 assistant 文本预览（"I need to run the deploy script"）；tool_result 解除 + assistant 尾 → idle；尾 user → working；陈旧（-6h）working 封顶 → idle。
- Codex（3/3）：exec_approval_request 未响应 → waiting/approve 且 detail 带完整命令（"wants to run: rm -rf build"）；task_complete → idle。
- Gemini（2/2）：logs.json 产出 item；从不声称 waiting（尾 user → working）。

## 结论

三采集器契约全部成立，10/10 首跑全对，沙箱零残留。无 P0/P1。纯文档轮。
