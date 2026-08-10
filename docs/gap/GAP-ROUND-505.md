# GAP-ROUND-505：本地采集器实弹抽查——三采集器状态判定全对，无 P0/P1

日期：2026-08-05
驱动维度：本地采集器实弹（round-494 后首次；对 collectors dist 直接构造 fixture 实测，非推断）

## 探针与证据（9/9 PASS）

```text
Claude  未解决 tool_use            → waiting/approve ✔（detail 取最后 assistant 文本）
Claude  匹配 tool_result 到达      → 解除 waiting（working）✔
Codex   exec_approval_request      → waiting/approve ✔（detail 带命令预览 "wants to run: git push --force"）
Codex   task_complete + 陈旧 mtime → idle ✔
Gemini  新鲜 mtime                 → working ✔
Gemini  陈旧 mtime（30 分钟）      → idle ✔
Gemini  任何情形                   → 从不声称 waiting ✔
```

- round-428/483 方法注记复核成立：采集器构造参数为目录路径位置参数（`new ClaudeCollector(projectsDir, hooksDir)` 等）；Codex rollout fixture 需 `sessions/YYYY/MM/DD/` + `session_meta` 首行。
- 清理：fixture 临时目录与探针脚本已删除，零残留。

## 结论

- 三采集器 source-specific 状态语义全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
