# GAP-ROUND-549：本地采集器实弹抽查——三采集器状态判定 9/9 全对，无 P0/P1

日期：2026-08-10
驱动维度：本地采集器实弹（round-538 后首次；受控 fixture 直调 collectors dist 类）

## 证据

```text
Claude：tool_use → waiting/approve；detail 取最后 assistant 文本；匹配 tool_result → working（解除 waiting）
Codex：exec_approval_request(command 数组) → waiting/approve 且 detail = "wants to run: rm -rf build-r549"
       task_complete → idle（解除 waiting）
Gemini：新鲜 mtime → working；陈旧 mtime → idle；全程从不声称 waiting
9/9 PASS
```

- 首跑五项假 FAIL 复跑排除，均为探针断言形状错误而非产品缺陷：`item.attention` 是字符串（非 `{type}` 对象）、`detail` 在 item 顶层；Codex `exec_approval_request` 的 `command` 契约是字符串数组（传字符串则按契约退化为 "wants to run a command"，`describeApproval` 与 codex.test.ts 复核一致）——新注记入档。
- round-538 注记复核成立：ClaudeCollector 收 projects 目录本身、Codex fixture 落 `sessions/YYYY/MM/DD/` 且首行 `session_meta`。
- 清理：fixture 目录随探针自删、探针脚本删除，零残留。

## 结论

- 三采集器状态语义契约全部成立。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
