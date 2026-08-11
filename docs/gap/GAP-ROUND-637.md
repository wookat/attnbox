# GAP-ROUND-637：本地采集器实弹抽查——三采集器状态判定 11/11 全对

日期：2026-08-05
驱动维度：本地采集器实弹抽查（round-626 后首次；Claude/Codex/Gemini 沙箱 fixture 直调 collect()）

## 证据（沙箱 fixture，首跑 11/11 全对、零假 FAIL）

- Claude（5/5）：未解决 tool_use → waiting/approve、detail 取 assistant text 块、tool_result 解除 waiting + 末尾 assistant text → idle、末尾 user 消息 → working。
- Codex（3/3）：`exec_approval_request` → waiting/approve 且命令数组转命令预览（`rm -rf build`）、追加 `task_complete` → idle（fixture 置于带日期路径且以 `session_meta` 开头）。
- Gemini（3/3）：新鲜 mtime → working、陈旧 mtime（-24h utimes）→ idle、从不声称 waiting。
- 既有方法注记全部套用（attention 为纯字符串直接比较、Codex fixture 日期路径），首跑零假 FAIL；沙箱目录已删，零残留。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
