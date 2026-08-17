# GAP-ROUND-1000: 本地采集器实弹抽查（round-989 后首次）

日期：2026-08-04。主驱动：Claude/Codex/Gemini 三采集器沙箱 fixture 状态判定。结论先行：**14/14 首跑全对，零假 FAIL，沙箱零残留，无 P0/P1**。

## 方法

- 临时 HOME 沙箱注入 fixture（`~/.claude/projects`、`~/.codex/sessions`、`~/.gemini/tmp`），直接调用 `packages/collectors/dist` 三采集器 `collect()`（同 round-989 脚本法，基于 main `a4814e4` 构建产物）。
- live 面对照：4820 daemon total 5,409。

## 结果（14/14 首跑全对）

| 采集器 | 契约 | 结果 |
|--------|------|------|
| Claude | 未解决 tool_use → waiting/approve | PASS |
| Claude | waiting detail 带 assistant 文本预览 | PASS（"May I run the migration?"） |
| Claude | tool_result 解除 → idle | PASS |
| Claude | 尾 user 新鲜 → working | PASS |
| Claude | 陈旧 working 封顶 idle | PASS |
| Claude | 陈旧未解决 tool_use 保持 waiting | PASS |
| Codex | exec_approval_request(string[]) → waiting/approve | PASS |
| Codex | 完整命令预览 | PASS（"wants to run: rm -rf build"） |
| Codex | task_complete → idle | PASS |
| Codex | fresh task_started → working | PASS |
| Codex | string 命令诚实回退 | PASS（"wants to run a command"） |
| Gemini | 新鲜 → working | PASS |
| Gemini | 陈旧 → idle | PASS |
| Gemini | 从不声称 waiting | PASS |

## 回归面

rounds 990–999 合并面（#1025–#1034，全为纯文档轮）无采集器回归。

## 残留清理

- 沙箱临时目录已删除，零残留；live 数据未触碰。

## 结论

无 P0/P1，无源码改动。继续循环。
