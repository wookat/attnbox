# GAP-ROUND-681：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-670 后首次；Claude/Codex/Gemini 沙箱 fixture 注入）

## 证据（10/10）

- Claude（注入 projectsDir）：尾部 tool_use → waiting/approve 且带 detail 预览（取最后 assistant 文本）；tool_result 解除后尾部 assistant 文本 → idle；尾部 user → working。4/4。
- Codex（注入 sessionsDir，ID 取 session_meta.payload.id）：exec_approval_request → waiting 且 detail 带命令预览（"wants to run: git push"）；task_complete → idle；task_started → working。4/4。
- Gemini（注入 geminiDir）：正常采集会话且从不声称 waiting（诚实边界保持）。2/2。

方法注记（新）：ClaudeCollector/CodexCollector 构造函数为位置参数（projectsDir/sessionsDir, hooksDir），GeminiCollector 为单字符串 geminiDir——不是 options 对象；沙箱探针须传第二参隔离 hooksDir 防真实 hook 状态串入。Claude waiting detail 取最后 assistant 文本块，fixture 需在 tool_use 前含 text 块（首跑 1 处假 FAIL 已排除，非产品缺陷）。

沙箱零残留（mkdtemp 目录已 rmSync，探针脚本已删）。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
