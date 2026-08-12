# GAP-ROUND-835：本地采集器实弹抽查（round-824 后首次）

日期：2026-08-04。主驱动：本地采集器实弹抽查（Claude/Codex/Gemini 本机状态判定）。纯文档轮，无 P0/P1。

## 方法

- rounds 825–834 合并面上，沙箱临时 HOME 内落地三采集器 fixture，直接调用 `dist/` 采集器实体（探针位于仓库外 `~/a11y/coll835.tmp.mjs`，走查后已清理，沙箱零残留）。

## 契约核验（14/14 首跑全对）

Claude（`~/.claude/projects/<proj>/*.jsonl`）：
1. 未解决 `tool_use` → waiting/approve。
2. waiting detail 取最后 assistant 文本块（"May I run the migration?"）。
3. `tool_result` 解除 → idle。
4. 尾 user 消息（fresh）→ working。
5. 陈旧 working 封顶 idle。
6. 陈旧未解决 waiting 保持 waiting（设计契约）。

Codex（`~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`）：
7. `exec_approval_request` → waiting/approve。
8. `string[]` 命令带完整预览（`wants to run: rm -rf build`）。
9. `task_complete` → idle。
10. fresh `task_started` → working。
11. string 命令诚实回退（`wants to run a command`）。

Gemini（`~/.gemini/tmp/<project>`，递归 mtime 判新旧）：
12. 新鲜 → working。
13. 陈旧 → idle。
14. 从不声称 waiting。

## 结论

- 三采集器状态/attention/detail 契约在当前合并面全部成立，无回归。
- 无产品 P0/P1。本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（99 测试）全绿。
