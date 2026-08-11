# GAP-ROUND-736：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-725 后首次；Claude/Codex/Gemini 沙箱 fixture 状态判定）

## 证据（10/10 首跑全通）

- Claude：未解决 tool_use → waiting/approve 带 lastAssistantText 预览；tool_result 解除 waiting（→ working）；尾 assistant 文本 → idle。
- Codex：exec_approval_request → waiting 带完整命令预览（`wants to run: npm run build`）；task_complete → idle。
- Gemini：正常会话采集成功，从不声称 waiting。
- 既有方法注记（attention 为字符串、Codex command 须为数组、Claude 预览取 lastAssistantText）全部有效，零假 FAIL。
- 沙箱 mkdtemp 隔离，跑后即删，零残留。

## 结论

三采集器状态判定契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
