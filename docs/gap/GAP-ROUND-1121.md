# GAP-ROUND-1121：本地采集器实弹抽查（round-1110 后首次）

日期：2026-08-04 ｜ 基线：main 1749f23（#1155 合并后，99 测试绿）｜ live 面：5,509 会话（迄今最大）

## 结论

1. **无 P0/P1。** 三采集器沙箱 fixture 14/14 首跑全对，零假 FAIL。
2. 沙箱（temp HOME）零残留，主 daemon 4820 不受影响（total=5,509，items==summary.total 成立，waiting 6）。
3. ack 台账轮前后 md5 逐字节一致（5166cdf4…），真实本地 agent 状态未触碰。

## 抽查明细（沙箱 fixture，dist 直调 collect()）

| # | 契约 | 结果 |
|---|------|------|
| 1 | Claude 未解决 tool_use → waiting/approve | PASS |
| 2 | Claude waiting 带文本预览（"May I run the migration?"） | PASS |
| 3 | Claude tool_result 解除 → idle | PASS |
| 4 | Claude 尾 user → working | PASS |
| 5 | Claude 陈旧 working 封顶 idle | PASS |
| 6 | Claude 陈旧 waiting 保持 waiting（设计契约） | PASS |
| 7 | Codex exec 审批 → waiting/approve | PASS |
| 8 | Codex string[] 命令完整预览（"rm -rf build"） | PASS |
| 9 | Codex string 命令诚实回退 | PASS |
| 10 | Codex task_complete → idle | PASS |
| 11 | Codex fresh task_started → working | PASS |
| 12 | Gemini 新鲜 → working | PASS |
| 13 | Gemini 陈旧 → idle | PASS |
| 14 | Gemini 从不声称 waiting | PASS |

## 方法

- 先 `pnpm build` 后探针本机 `~/a11y/coll1121.tmp.mjs`（不入库），temp HOME 沙箱构造 Claude/Codex/Gemini fixture 后直调各采集器 dist `collect()`。
- 沙箱前缀 `attnbox1077-*`：轮后 `/tmp` 精确核验 0 残留（`ls -d /tmp/attnbox1077-*` 空）。
- 探针为历史轮复制件，内部仍带 `ROUND-824`/`COLL1077_DONE` 陈旧标签——纯探针卫生问题，非产品缺陷；本档以实际观测为准。
- Gemini 陈旧判定依赖目录/文件 mtime，需 `utimes` 同步回拨。

## 收敛

rounds 1111–1120 合并面（全为纯文档轮）无采集器回归。三源被动聚合差异化不变，继续循环。
