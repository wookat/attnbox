# GAP-ROUND-494：本地采集器实弹抽查——三采集器状态判定全对，无 P0/P1

日期：2026-08-05
驱动维度：本地采集器实弹抽查（round-483 后首次；Claude/Codex/Gemini 隔离 fixture 直调 collectors dist）

## 探针与证据（隔离沙箱 HOME + 位置参数构造：ClaudeCollector(projectsDir, hooksDir) / CodexCollector(sessionsDir, hooksDir) / GeminiCollector(geminiDir)）

```text
claude pending tool_use   → waiting/approve，detail "I want to run rm -rf build. Approve?"
claude after tool_result  → working（waiting 解除）
codex approval pending    → waiting/approve，detail "wants to run: rm -rf build"
codex after task_complete → idle
gemini fresh mtime        → working
gemini ever waiting       → false（诚实边界成立）
```

- 方法注记复核成立：Codex rollout 落 `sessions/YYYY/MM/DD/` 且带 `session_meta`（round-428）；采集器构造为目录路径位置参数非 options 对象（round-483）；Claude detail 取最后一条 assistant 文本（round-483）。
- 清理：沙箱 HOME 整体 rmSync、探针脚本删除、零残留。

## 结论

- 三采集器源语义契约全部成立，rounds 484–493 合并面无采集器回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
