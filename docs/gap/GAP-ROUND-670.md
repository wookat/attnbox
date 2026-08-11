# GAP-ROUND-670：本地采集器实弹抽查——三采集器状态判定 13/13 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-659 后首次；Claude/Codex/Gemini 沙箱 fixtures 状态判定，dist 构建直跑）

## 证据（13/13，首跑零假 FAIL）

- Claude（5/5）：未解决 `tool_use` → waiting/approve 且带 assistant 文本预览（"May I run the build?"）；匹配 `tool_result` 解除 waiting；末尾 user 消息 → working；末尾 assistant 文本 → idle。
- Codex（5/5）：`task_started` → working 且项目 ID 取自 `session_meta.payload.id`（round-659 方法注记套用零假 FAIL）；`exec_approval_request` → waiting/approve 且命令预览 `wants to run: rm -rf build`；`apply_patch_approval_request` 预览 `wants to apply a patch`；`task_complete` → idle。
- Gemini（3/3）：新鲜 mtime → working、陈旧 mtime → idle、从不声称 waiting。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 沙箱零残留（临时 fixtures 目录与探针脚本已删除）。
