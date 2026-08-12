# GAP-ROUND-868 — 本地采集器实弹抽查（纯文档）

Round 868. 主驱动：本地采集器实弹抽查（round-857 后首次），
Claude/Codex/Gemini 沙箱 fixture 状态判定。

## 证据（14/14 首跑全对）

- Claude：未解决 tool_use → waiting/approve 带文本预览（"May I run
  the migration?"）；tool_result 解除 → idle；尾 user → working；
  陈旧 working 封顶 idle；陈旧 waiting 保持 waiting（设计契约）。
- Codex：string[] 审批 → waiting/approve 带完整命令预览（"wants to
  run: rm -rf build"）；string 命令诚实回退（"wants to run a
  command"）；task_complete → idle；fresh task_started → working。
- Gemini：新鲜 mtime → working；陈旧 → idle；从不声称 waiting。

## Verdict

无 P0/P1，三采集器状态判定 14/14 首跑全对，零假 FAIL，沙箱零残留。
纯文档轮，无 changeset。
