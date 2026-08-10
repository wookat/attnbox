# GAP-ROUND-593：本地采集器实弹抽查——三采集器状态判定 9/9 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-582 后首次；沙箱 fixture 直接调 dist 采集器）

## 实测结果（9/9）

- Claude：`tool_use` 无匹配 result → waiting/approve；detail 取最后 assistant 文本块；匹配 `tool_result` 解除 waiting。
- Codex：`exec_approval_request`（命令数组）→ waiting/approve 且 detail 带命令预览（`wants to run: git push --force`）；`task_complete` 解除 → idle。
- Gemini：新鲜 mtime → working；3 小时陈旧 → idle；从不声称 waiting。

## 探针注记（非产品缺陷）

- Claude waiting detail 来自 `lastAssistantText`（仅取 text 块）：若 assistant 消息只有 `tool_use` 块无 text 块，detail 为空属设计内。首跑 1 项假 FAIL 由此产生，fixture 补 text 块后 9/9 全对。

## 清理

沙箱 fixture 与探针脚本删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
