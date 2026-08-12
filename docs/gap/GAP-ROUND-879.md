# GAP-ROUND-879 — 本地采集器实弹抽查（纯文档）

Round 879. 主驱动：Claude/Codex/Gemini 本机状态判定实弹抽查——round-868
后首次。

## 证据（沙箱 fixture 14/14 首跑全对）

- **Claude**：未解决 tool_use → waiting/approve 带文本预览（"May I run
  the migration?"）、tool_result 解除 → idle、尾 user → working、陈旧
  working 封顶 idle、陈旧 waiting 保持 waiting。
- **Codex**：string[] 审批 → waiting/approve 带完整命令预览（"wants to
  run: rm -rf build"）、string 命令诚实回退（"wants to run a command"）、
  task_complete → idle、fresh task_started → working。
- **Gemini**：新鲜 mtime → working、陈旧 → idle、从不声称 waiting。

## 方法注记

- 无新注记；沿用既有方法（沙箱 HOME fixture、GeminiCollector 以
  ~/.gemini 根目录 + tmp/<project> mtime 判新鲜度）。

## Verdict

无 P0/P1，零假 FAIL，rounds 869–878 合并面上三采集器状态判定契约无
回归。沙箱与探针零残留（coll879.tmp.mjs 已删）。纯文档轮，无 changeset。
