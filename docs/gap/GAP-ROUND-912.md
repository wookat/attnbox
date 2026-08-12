# GAP-ROUND-912 — 本地采集器实弹抽查（纯文档）

Round 912. 主驱动：Claude/Codex/Gemini 三采集器沙箱 fixture 状态判定抽查——round-901 后首次。证据日期：2026-08-04。

## 审计结果（14/14 首跑全对）

- **Claude**（5/5）：未解决 tool_use → waiting/approve 带文本预览（"May I run the migration?"）；tool_result 解除 → idle；尾 user → working；陈旧 working 封顶 idle；陈旧未解决 waiting 保持 waiting（设计契约）。
- **Codex**（6/6）：string[] exec 审批 → waiting/approve 带完整命令预览（"wants to run: rm -rf build"）；string 命令诚实回退（"wants to run a command"）；task_complete → idle；fresh task_started → working。
- **Gemini**（3/3）：新鲜 → working；陈旧 → idle；从不声称 waiting（诚实边界）。

零假 FAIL，沙箱（temp HOME fixture）零残留。

## Verdict

无 P0/P1。纯文档轮，无 changeset。本地门禁全绿（build ✓ / lint ✓ / typecheck ✓ / test 99 ✓）。
