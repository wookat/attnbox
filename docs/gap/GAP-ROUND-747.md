# GAP-ROUND-747：本地采集器实弹抽查——三采集器状态判定 10/10 全对

日期：2026-08-04
驱动维度：本地采集器实弹抽查（round-736 后首次；Claude/Codex/Gemini 沙箱 fixture）

## 证据

- Claude 5/5：未解决 tool_use → waiting/approve 带预览、tool_result 解除后尾 assistant → idle、尾 user → working。
- Codex 4/4：exec_approval_request → waiting/approve 带完整命令预览（"wants to run: rm -rf build"）、task_complete → idle。
- Gemini 1/1：从不声称 waiting（working 判定）。
- 首跑 10/10 零假 FAIL；既有方法注记（attention 为字符串、Codex command 为数组、ID 取 payload.id）全部有效。
- 沙箱零残留（临时目录已删、脚本已清）。

## 结论

三采集器状态判定契约全部成立，无 P0/P1。纯文档轮，无源码/依赖/changeset 变更。
