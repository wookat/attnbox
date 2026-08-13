# GAP-ROUND-945：本地采集器实弹抽查（round-934 后首次）

日期：2026-08-04（UTC）
基线：main @ da09f04（#978 合并后）
方法：沙箱 fixture（临时 HOME，`mkdtemp` 隔离）直接驱动 `packages/collectors/dist` 三采集器，断言 status/attention/detail 契约；结束 `rmSync` 清理，零残留。

## 结论

**无 P0/P1。** 三采集器状态判定 14/14 首跑全对，零假 FAIL。

## 抽查结果（coll945 探针，14/14）

Claude（`~/.claude/projects/*/*.jsonl`）：
- PASS 未解决 tool_use → waiting/approve（带文本预览 "May I run the migration?"）
- PASS tool_result 解除 → idle
- PASS 尾 user 消息 → working
- PASS 陈旧 working 封顶 idle
- PASS 陈旧 waiting 保持 waiting

Codex（`~/.codex/sessions/YYYY/MM/DD/*.jsonl`）：
- PASS string[] exec 审批 → waiting/approve（完整命令预览 "wants to run: rm -rf build"）
- PASS string 命令诚实回退（"wants to run a command"）
- PASS task_complete → idle
- PASS fresh task_started → working

Gemini（`~/.gemini/tmp/<project>`，mtime 新鲜度）：
- PASS 新鲜 → working
- PASS 陈旧 → idle
- PASS 从不声称 waiting

## 判定

rounds 935–944 合并面对采集器无代码改动，行为与 round-934 基线一致。无新 P0/P1，纯文档入档。Actions 降级门禁：本地 build/lint/typecheck/test 全绿即为验收标准。
