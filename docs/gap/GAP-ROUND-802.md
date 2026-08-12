# GAP-ROUND-802：本地采集器实弹抽查——三采集器状态判定 12/12 全对

日期：2026-08-05
驱动维度：本地采集器实弹抽查（round-791 后首次）

## 实测（沙箱 fixture，三采集器 dist 直调）

Claude（6/6）：
- 未解决 tool_use → waiting/approve，detail 带最后 assistant 文本预览。
- tool_result 解除 → idle；尾 user → working。
- 陈旧未解决 tool_use 仍 waiting（capStaleWorking 只封顶 working，waiting 不因陈旧封顶——设计契约，与 core 测试一致）。

Codex（3/3）：
- exec_approval_request → waiting/approve，detail 带完整命令（`wants to run: npm install left-pad`；注意 command 为 string[] 契约，字符串形式回退为通用文案）。
- task_complete → idle。

Gemini（3/3）：
- 近期活动 → working；陈旧 → idle；从不声称 waiting。

首跑 5 处假 FAIL 均为探针假设错误（attention 是 kind 字符串而非嵌套对象、detail 在 item 顶层、waiting 不陈旧封顶、Codex command 需为数组），非产品缺陷，已修正后 12/12。沙箱零残留。

## 结论

三采集器状态判定契约全部成立，无 P0/P1。纯文档轮。
