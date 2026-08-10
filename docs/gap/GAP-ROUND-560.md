# GAP-ROUND-560：本地采集器实弹抽查——10/10 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹抽查（round-549 后首次；dist 构建直调三采集器，临时 fixture 沙箱）

## 证据（10/10 PASS，首跑即全对）

```text
Claude（projects 目录构造 + hooks 目录）：
  unresolved tool_use → waiting/approve ✓
  detail 取最后 assistant text（"I want to run the test suite"）✓
  匹配 tool_result 解除 waiting → working ✓
Codex（sessions/YYYY/MM/DD rollout + session_meta）：
  exec_approval_request（command 字符串数组契约）→ waiting/approve ✓
  detail 命令预览 "wants to run: rm -rf build" ✓
  task_complete 清除审批 → idle（mtime 置旧后）✓
Gemini（root 构造，collector 自行追加 tmp/）：
  新鲜 mtime → working ✓
  从不声称 waiting ✓
  置旧 mtime → idle ✓
```

- round-549 两条方法注记（attention 为顶层字符串、Codex command 为字符串数组）本轮直接套用，零假 FAIL。
- 清理：fixture 沙箱与探针删除，零残留。

## 结论

- 三采集器状态判定全对。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
