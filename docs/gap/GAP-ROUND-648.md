# GAP-ROUND-648：本地采集器实弹抽查——三采集器状态判定 12/12 全对

日期：2026-08-05
驱动维度：本地采集器实弹抽查（round-637 后首次；Claude/Codex/Gemini 沙箱实弹）

## 证据（沙箱 fixture，首跑零假 FAIL）

- Claude（5/5）：unresolved tool_use → waiting/approve 且 detail 带助手提问；tool_result 解除 + 末尾 assistant text → idle；末尾 user message → working。
- Codex（4/4）：exec_approval_request → waiting/approve 且 detail 带命令预览（`git push --force`）；task_complete → idle；fixture 用 dated path + session_meta 起始契约成立。
- Gemini（3/3）：recent mtime → working；stale mtime（3h）→ idle；从不声称 waiting（诚实边界成立）。
- 既有方法注记全部套用（attention 为纯字符串、fixture dated path），沙箱与临时探针清理零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
