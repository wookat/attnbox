# GAP-ROUND-692：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-681 后首次；隔离沙箱 fixture，位置参数构造 + 隔离 hooksDir）

## 证据（沙箱 fixture 10/10）

- Claude（5/5）：尾部未解决 tool_use → waiting/approve 且带 lastAssistantText 预览；尾部 user → working；尾部 assistant 文本 → idle；tool_result 已解决 → 不再 waiting。
- Codex（4/4）：exec_approval_request → waiting/approve 且预览带命令（"wants to run: rm -rf build"）；task_started → working；task_complete → idle；ID 取 session_meta.payload.id。
- Gemini（1/1）：从不声称 waiting（仅 working/idle）。

方法注记（探针侧，非产品缺陷）：Claude waiting 预览取自 lastAssistantText——fixture 的 assistant 消息若只有 tool_use 块而无 text 块则预览为空，首跑 1 处假 FAIL 即此因；补 text 块后全通。

沙箱零残留（mkdtemp 目录已删、临时脚本已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
