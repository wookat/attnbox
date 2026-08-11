# GAP-ROUND-758：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-747 后首次）

## 证据（沙箱 fixture，dist 直调三采集器）

- Claude：未解决 tool_use → waiting/approve，detail 为最后一条 assistant 文本预览；tool_result 解除后尾 assistant → idle；尾 user → working。
- Codex：exec_approval_request → waiting/approve，detail 带完整命令预览（"wants to run: bash -c npm publish"）；task_complete → idle。
- Gemini：从不声称 waiting（本轮 fixture 判 working），会话以 project hash 聚合浮出。
- 首跑 2 处假 FAIL 均为探针假设错误（非产品缺陷），已修正复测通过：
  1. Claude waiting 的 detail 是最后 assistant 文本（`lastAssistantText`），不是 tool_use 命令本身——fixture 需含 assistant 文本；
  2. Gemini item id 为 `gemini:<projectHash>`（按项目聚合），不是 sessionId。
- 沙箱零残留（mkdtemp + rmSync，临时脚本已删）。

## 结论

三采集器契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
