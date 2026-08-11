# GAP-ROUND-669 — 分诊全流程 UX 走查（无 P0/P1）

日期：2026-08-04。主驱动：分诊全流程 UX 走查（round-658 后首次）：搜索→过滤→ack all→反 ack + 键盘链，@4,288 会话（迄今最大；waiting 16 / working 49 / idle 6 / done 4,217）。

## 方法

- daemon：`node packages/cli/dist/index.js --port 4669`，Playwright `domcontentloaded` + `li[id^=item-]`，ack 断言取 `attnbox:acked` 台账（`Object.keys(...)` 计数）。

## 结果（8/8 全通）

| 检查 | 结果 |
| --- | --- |
| 默认态 0 全量 `/api/items` fetch（slim SSE） | PASS（fetches=0） |
| 惰性搜索恰好 1 次 fetch | PASS（fetches=1，4 命中） |
| 负例搜索诚实空态 | PASS（0 卡） |
| j/e ack 往返（相对基线法） | PASS（10→11→10） |
| ✓ all done 批量 ack | PASS（10→17，waiting>1 门控渲染） |
| API 反 ack 经 SSE 同步 | PASS |
| ? 帮助面板开/关 | PASS |
| 页面错误 | 0 |

## 事故与恢复（探针侧，非产品缺陷）

首跑探针在搜索后未移焦即发键盘事件致 j/e/? 假 FAIL（修正：`Escape` + 点击 body 移焦后 8/8）；且反 ack 还原步骤误将存量台账连同新增一并清空（探针 bug）。已从持久浏览器 profile 的 LevelDB（`Local Storage`）读回最新台账快照（13 条含原始时间戳，08-08 快照为可得最新），经 `POST /api/ack {id, at: 原时间戳}` 全量还原，`~/.attnbox/acked.json` 核实一致。方法注记：**批量反 ack 还原必须只回滚本轮新增 id（先快照基线 id 集合做差集），严禁遍历全台账**；台账灾备可从浏览器 profile LevelDB 恢复（classic-level 读 `_http://…attnbox:acked` 键）。

## 结论

产品面无 P0/P1，slim SSE 分诊契约全部成立。探针零残留（daemon 已停、临时脚本已清理、台账已还原）。
