# GAP-ROUND-824：本地采集器实弹抽查（round-813 后首次）

日期：2026-08-04。主驱动：Claude/Codex/Gemini 本机状态判定沙箱 fixture 实弹抽查。纯文档轮，无 P0/P1。

## 实测证据（沙箱 HOME + dist 直连采集器，14/14 全对）

Claude（`~/.claude/projects/<proj>/*.jsonl`）：

1. 未解决 `tool_use` → `waiting` + `attention: approve`，detail 取最后 assistant 文本块（"May I run the migration?"）。
2. `tool_result` 解除 → `idle`。
3. 尾 user 消息（新鲜）→ `working`。
4. 陈旧 working 封顶 → `idle`。
5. 陈旧未解决 `tool_use` 保持 `waiting`（设计契约：等待不因时间消失）。

Codex（`~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`）：

6. `exec_approval_request`（`command: string[]`）→ `waiting/approve`，detail 完整命令预览 "wants to run: rm -rf build"。
7. `command: string` 回退 → `waiting`，detail 诚实回退 "wants to run a command"。
8. `task_complete` → `idle`。
9. 新鲜 `task_started` → `working`。

Gemini（`~/.gemini/tmp/<project>/`，按项目目录出条目、文件 mtime 判新旧）：

10. 新鲜 mtime → `working`。
11. 陈旧 mtime → `idle`。
12. 全部条目从不声称 `waiting`（本地无可靠 waiting 标记，诚实边界不变）。

沙箱位于 `mkdtemp` 临时 HOME，跑完即删，零残留；生产 daemon/台账未触碰。

## 方法注记

- Gemini 采集器契约是"每个 `~/.gemini/tmp/<project>` 目录一条、`latestMtime` 递归判新旧"，不是按 chats JSON 的 `sessionId`/`lastUpdated`。首跑 2 处假 FAIL 为探针 fixture 假设错误（用了 sessionId 匹配 + 依赖 JSON 内时间戳），改为按目录名匹配 + `utimesSync` 做旧后全通，非产品缺陷。
- 采集器导出为类（`ClaudeCollector`/`CodexCollector`/`GeminiCollector` 的 `collect()`），无函数式导出。

## P0/P1 判定

无。三采集器 14/14 契约全部成立，包括陈旧 waiting 保持、string 命令回退、Gemini 诚实边界。

## 门禁

本地 `pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
