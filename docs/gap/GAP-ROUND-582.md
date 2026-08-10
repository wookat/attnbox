# GAP-ROUND-582：本地采集器实弹抽查——三采集器状态判定 9/9 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-571 后首次；受控沙箱 fixture，dist 构建直调 collect()）

## 实测结果（9/9 首跑全对，既有方法注记套用零假 FAIL）

- **Claude**（projects 目录构造）：pending `tool_use` → `waiting`/`approve`；追加匹配 `tool_result` 解除 waiting。3/3。
- **Codex**（`sessions/YYYY/MM/DD/` + `session_meta`）：`exec_approval_request`（command 字符串数组）→ `waiting`/`approve`，detail 带 `git push` 命令预览；`task_complete` 解除 waiting。4/4。
- **Gemini**（根目录构造，内部拼 `tmp/`）：新鲜 mtime → `working`；3 小时陈旧 → `idle`；从不声称 `waiting`。2/2。

## 清理

沙箱目录与探针脚本删除，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
