# GAP-ROUND-714：本地采集器实弹抽查——三采集器状态判定 8/8 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-703 后首次；Claude/Codex/Gemini 沙箱 fixture）

## 证据（沙箱 fixture，首跑 8/8 全通）

- Claude：未解决 tool_use → waiting/approve 且预览取 lastAssistantText（"May I run this?"）；tool_result 解除（尾 user tool_result → working）；尾 assistant 文本 → idle。
- Codex：exec_approval_request（command 数组）→ waiting/approve，预览 "wants to run: npm run build"；task_complete → idle；ID 取 payload.id。
- Gemini：从不声称 waiting（尾 user → working）。
- 沙箱零残留（mkdtemp 目录已删）。

## 结论

- 三采集器状态判定全部符合契约，既有方法注记（attention 字符串、Codex command 数组、构造函数位置参数、hooksDir 隔离）全部有效——本轮首跑零假 FAIL。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
