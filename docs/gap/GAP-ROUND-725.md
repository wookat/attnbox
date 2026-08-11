# GAP-ROUND-725：本地采集器实弹抽查——三采集器状态判定 9/9 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-714 后首次；Claude/Codex/Gemini 本机状态判定）

## 证据（沙箱 fixture，首跑 9/9 全对）

- Claude：未解决 tool_use → waiting/approve 且预览取 lastAssistantText（"May I run the build?"）；tool_result 解除后不再 waiting（working）；尾 assistant 文本 → idle。
- Codex：exec_approval_request → waiting/approve 带完整命令预览（"wants to run: npm run build"）；task_complete → idle；ID 取 payload.id。
- Gemini：从不声称 waiting（本轮 working），采集正常。
- 既有方法注记（构造函数位置参数、隔离 hooksDir、command 须为数组、fixture 须含 text 块）全部有效，零假 FAIL。
- 沙箱零残留（mkdtemp 临时目录已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
