# GAP-ROUND-769：本地采集器实弹抽查——三采集器状态判定 11/11 全对

日期：2026-08-04
驱动维度：本地采集器（round-758 后首次）

## 证据（沙箱 fixture，dist 构建直跑）

- Claude 5/5：未解决 tool_use → waiting/approve 带 assistant 文本预览；tool_result 解除 → idle；尾 user → working；陈旧 working 封顶 idle。
- Codex 4/4：exec_approval_request → waiting/approve 带完整命令预览（`wants to run: rm -rf build`）；task_complete → idle；task_started → working。
- Gemini 2/2：近期活动 → working 且从不声称 waiting（无 attention）；陈旧 → idle。
- 首跑 11/11 零假 FAIL，既有方法注记全部有效；沙箱零残留（tmp fixture 与临时脚本已删）。

## 结论

三采集器状态判定契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
