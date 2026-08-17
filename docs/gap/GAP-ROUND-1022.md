# GAP-ROUND-1022: 本地采集器实弹抽查（round-1011 后首次）

日期：2026-08-17。基线：main `12321df`（#1056 合并后）。结论先行：**三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL，rounds 1012–1021 合并面无采集器回归，无 P0/P1**。

## 方法

- 临时沙箱 HOME（`mkdtemp`）内构造 Claude/Codex/Gemini 真实目录结构 fixture，直接调用 `packages/collectors/dist/{claude,codex,gemini}.js` 的 collect()，断言状态/attention/detail 契约。
- fresh = 1 分钟前，stale = 3 小时前；Gemini 陈旧性经文件 mtime 回拨构造。
- 沙箱走查后整体删除，零残留；live 面同期 5,429 会话（迄今最大，waiting 11 / working 43）。

## 结果（14/14 首跑全对）

| # | 契约 | 结果 |
|---|------|------|
| 1 | Claude 未解决 tool_use → waiting/approve | PASS |
| 2 | Claude waiting detail 带助手文本预览 | PASS（"May I run the migration?"） |
| 3 | Claude tool_result 解除 → idle | PASS |
| 4 | Claude 尾 user → working | PASS |
| 5 | Claude 陈旧 working 封顶 idle | PASS |
| 6 | Claude 陈旧未解决 tool_use 保持 waiting | PASS |
| 7 | Codex exec_approval_request(string[]) → waiting/approve | PASS |
| 8 | Codex 完整命令预览 | PASS（"wants to run: rm -rf build"） |
| 9 | Codex task_complete → idle | PASS |
| 10 | Codex fresh task_started → working | PASS |
| 11 | Codex string 命令诚实回退 | PASS（"wants to run a command"） |
| 12 | Gemini 新鲜 → working | PASS |
| 13 | Gemini 陈旧 → idle | PASS |
| 14 | Gemini 从不声称 waiting | PASS |

## 判定

rounds 1012–1021 全为纯文档轮，采集器面无回归。无 P0/P1，本轮纯文档入档。
