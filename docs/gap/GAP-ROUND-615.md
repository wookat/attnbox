# GAP-ROUND-615：本地采集器实弹抽查——三采集器状态判定 10/10 首跑全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹抽查（round-604 后首次；dist 构建直调 + 沙箱 fixture，既有方法注记全部套用零假 FAIL）

## 实测结果（10/10 首跑全对）

- Claude（`ClaudeCollector(projectsDir, hooksDir)`）：
  1. assistant `tool_use` 无匹配 result → `waiting`；
  2. attention = `approve`；
  3. detail 取 assistant text 块（"I need to run this command:"）；
  4. 匹配 `tool_result` 出现 → waiting 解除。
- Codex（`CodexCollector(root)`，fixture 落 `sessions/YYYY/MM/DD/` 且首行 `session_meta`）：
  5. `exec_approval_request` → `waiting`；
  6. attention = `approve`；
  7. detail 带命令预览（`rm -rf dist`，command 字符串数组契约）；
  8. `task_complete` → 转 `idle`。
- Gemini（`GeminiCollector(root)`，内部自拼 `tmp/`）：
  9. 新 mtime → `working`；
  10. 旧 mtime（-3h，目录与文件均回拨）→ `idle` 且从不声称 waiting。

## 清理

三个沙箱临时目录与探针脚本全部删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
