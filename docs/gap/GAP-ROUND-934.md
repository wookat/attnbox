# GAP-ROUND-934：本地采集器实弹抽查（round-923 后首次）

日期：2026-08-04（UTC）
基线：main @ 6becaa1（#967 合并后）
方法：沙箱 fixture 探针（coll934），Claude/Codex/Gemini 三采集器状态判定逐项断言

## 结论

**无 P0/P1。** 三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL，沙箱零残留。

## 走查结果（14/14 PASS）

Claude：
- 未解决 tool_use → waiting/approve，detail 带文本预览（"May I run the migration?"）
- tool_result 解除 → idle
- 尾 user 消息 → working
- 陈旧 working 封顶 idle
- 陈旧 waiting 保持 waiting

Codex：
- string[] exec 审批 → waiting/approve，带完整命令预览（"wants to run: rm -rf build"）
- string 命令诚实回退（"wants to run a command"）
- task_complete → idle
- fresh task_started → working

Gemini：
- 新鲜 → working
- 陈旧 → idle
- 从不声称 waiting

## 本地门禁

- build ✓ / lint ✓ / typecheck ✓ / test 99 ✓（Actions 降级门禁：仓库 Actions 保持禁用，验收以本地全绿为准）
