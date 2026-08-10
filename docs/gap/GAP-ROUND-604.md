# GAP-ROUND-604：本地采集器实弹抽查——三采集器状态判定 9/9 首跑全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹抽查（round-593 后首次；dist 构建直调 + 沙箱 fixture）

## 实测结果（9/9 首跑全对，既有方法注记套用零假 FAIL）

- Claude（`ClaudeCollector(projectsDir, hooksDir)`）：
  1. assistant `tool_use` 无匹配 result → `waiting`；
  2. attention = `approve`；
  3. detail 取最后一条 assistant text 块（"I need to run this command:"）；
  4. 匹配 `tool_result` 出现 → waiting 解除（→ working）。
- Codex（`CodexCollector(root)`，fixture 落 `sessions/YYYY/MM/DD/` 且首行 `session_meta`）：
  5. `exec_approval_request` → `waiting` + `approve`；
  6. detail 带命令预览（`wants to run: rm -rf dist`，command 为字符串数组契约）；
  7. `task_complete` → waiting 解除（→ idle）。
- Gemini（`GeminiCollector(root)`，内部自拼 `tmp/`）：
  8. 新 mtime → `working`；
  9. 旧 mtime → `idle`——从不声称 waiting（mtime 启发式只支持 working/idle）。

## 清理

三个沙箱临时目录与探针脚本全部删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
