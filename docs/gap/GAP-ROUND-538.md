# GAP-ROUND-538：本地采集器实弹抽查——三采集器状态判定 9/9 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-527 后首次；受控 fixture 直调 collectors dist 类）

## 证据

```text
Claude：tool_use → waiting/approve；detail 取最后 assistant 文本；匹配 tool_result → working（解除 waiting）
Codex：exec_approval_request → waiting/approve 且 detail 带命令预览（"wants to run: rm -rf build"）
       task_complete → idle（解除 waiting）
Gemini：新鲜 mtime → working；陈旧 mtime → idle；全程从不声称 waiting
9/9 PASS
```

- 首跑 Claude 三项假 FAIL 复跑排除：ClaudeCollector 构造参数是 projects 目录本身（`~/.claude/projects`）非 `~/.claude` 根目录（与 GeminiCollector 收根目录相反，round-516 注记的镜像坑）——传根目录得 0 项假读数。第二参数为 hooksDir。
- Codex fixture 落 `sessions/YYYY/MM/DD/` 且首行 `session_meta`（round-428 注记复核成立）。
- 清理：fixture 目录随探针自删、探针脚本删除，零残留。

## 结论

- 三采集器状态语义契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
