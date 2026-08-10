# GAP-ROUND-527：本地采集器实弹抽查——三采集器状态判定 9/9 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-516 后首次；受控 fixture @ /tmp/r527-fixtures，dist 类直调）

## 证据

```text
Claude：tool_use → waiting/approve；匹配 tool_result → working（解除 waiting）
Codex：exec_approval_request → waiting/approve 且 detail 带命令预览（"wants to run: rm -rf build"）；
       task_complete → idle（解除 waiting）
Gemini：新鲜 mtime → working；陈旧 mtime → idle；全程从不声称 waiting
9/9 PASS
```

- 方法注记复核成立：Claude agent 名 `claude-code`（round-428）；Codex rollout 落 `sessions/YYYY/MM/DD/` 且带 `session_meta`（round-428）；GeminiCollector 构造参数为 gemini 根目录（round-516）。
- 清理：fixture 目录删除、探针脚本删除，零残留。

## 结论

- 三采集器状态判定契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
