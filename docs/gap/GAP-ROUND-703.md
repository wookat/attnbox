# GAP-ROUND-703：本地采集器实弹抽查——三采集器状态判定 11/11 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-692 后首次；Claude/Codex/Gemini 沙箱 fixture）

## 证据

沙箱 fixture 11/11 全对（复跑）：

- Claude：未解决 tool_use → waiting/approve 且带 lastAssistantText 预览；tool_result 解除 + 尾 assistant 文本 → idle；尾 user → working。
- Codex：exec_approval_request → waiting/approve，detail 带完整命令（"wants to run: npm run build"）；task_complete → idle；ID 取 session_meta payload.id。
- Gemini：正常采集且从不声称 waiting（尾 model 消息 → working/idle 面）。

方法注记（探针侧，非产品缺陷；首跑 3 处假 FAIL 为此因，已排除）：

- `AttentionItem.attention` 是字符串字面量（"approve" 等），不是 `{kind}` 对象——断言勿写 `attention.kind`。
- Codex `exec_approval_request` 的 `command` 须为字符串数组才产出完整命令预览；传字符串会诚实降级为 "wants to run a command"（此为容错行为，非缺陷）。

沙箱零残留（mkdtemp 目录已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
