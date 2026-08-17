# GAP-ROUND-1055：本地采集器实弹抽查（Claude/Codex/Gemini 沙箱 fixture 状态判定）

日期：2026-08-04（UTC）。round-1044 后首次采集器轮，基线 main @ b2f1604（#1089 合并后）。结论先行：**三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL，沙箱零残留，无 P0/P1**。

## 方法

- 隔离沙箱 HOME（`mkdtemp`）内构造三采集器 fixture，直接调用编译产物 `packages/collectors/dist/{claude,codex,gemini}.js` 的 `collect()`（与 round-824 起沿用的既定方法一致）。
- fresh = 1 分钟前，stale = 3 小时前。
- live 面同刻复核主 daemon（127.0.0.1:4820）：total=5,449（迄今最大）、waiting=20、working=38。

## 结果（14/14 PASS）

Claude（转录启发式）：
1. 未解决 tool_use → waiting/approve ✔
2. waiting detail 带最后 assistant 文本预览（"May I run the migration?"）✔
3. tool_result 解除 → idle ✔
4. 尾 user 新鲜 → working ✔
5. 陈旧 working 封顶 idle ✔
6. 陈旧未解决 tool_use 保持 waiting（设计契约）✔

Codex（rollout 事件流）：
7. exec_approval_request（string[]）→ waiting/approve ✔
8. 命令预览完整（"wants to run: rm -rf build"）✔
9. task_complete → idle ✔
10. fresh task_started → working ✔
11. string 命令诚实回退（"wants to run a command"）✔

Gemini（mtime 新鲜度）：
12. 新鲜 → working ✔
13. 陈旧 → idle ✔
14. 从不声称 waiting ✔

## 结论

- rounds 1045–1054 合并面（#1080–#1089，全为纯文档轮）无采集器回归。
- 无 P0/P1；无需产品代码变更。
- 探针沙箱已删除（/tmp 零残留），主 daemon 全程未受影响。
