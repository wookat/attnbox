# GAP-ROUND-846 — 本地采集器实弹抽查（纯文档）

Round 846. 主驱动：本地采集器实弹抽查（round-835 后首次）——Claude/
Codex/Gemini 三采集器沙箱 fixture 状态判定。

## 契约核验（13/13 全对）

### Claude（6/6）

- 未解决 `tool_use`（新鲜）→ waiting/approve，detail 取最后 assistant
  文本块作预览。
- `tool_result` 解除 → idle。
- 尾 user 消息（新鲜）→ working。
- 陈旧尾 user → working 封顶为 idle。
- 陈旧 waiting 保持 waiting（不封顶，设计契约）。

### Codex（4/4）

- `exec_approval_request`（`command: string[]`）→ waiting/approve，
  detail 带完整命令预览（"wants to run: rm -rf node_modules"）。
- `task_complete` → idle。
- fresh `task_started` → working。

### Gemini（3/3）

- 新鲜项目目录活动 → working；陈旧 → idle；从不声称 waiting
  （本地无可靠 waiting 标记，诚实边界）。

## 方法注记

- GeminiCollector 构造参数为 `~/.gemini` 根目录（内部自行拼 `tmp/`），
  探针首跑传了 `tmp/` 导致 2 处假 FAIL，为探针 fixture 假设错误，
  非产品缺陷；修正后复跑全对。

## Verdict

无 P0/P1：三采集器状态判定契约在沙箱 fixture 上全部成立。纯文档轮，
无 changeset。沙箱零残留。
