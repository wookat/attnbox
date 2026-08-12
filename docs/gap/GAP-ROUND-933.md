# GAP-ROUND-933：分诊全流程 UX 走查（round-922 后首次，@4,618+ 会话）

日期：2026-08-04（UTC）
基线：main @ b05d822（#966 合并后）
环境：本机 daemon http://127.0.0.1:4820，dogfood 实数据（total ~4,619，waiting 12–13，ack 台账 13 条）

## 结论

**无 P0/P1。** 分诊全链（默认 slim 渲染 → Needs You 过滤 → 惰性搜索/负例空态 → j/e 键盘 ack → API 反 ack → ✓ all done → 逐项反 ack 还原 → ? 帮助面板）契约全部成立，0 页面/console 错误。两处首跑 FAIL 均确证为探针假设错误，非产品缺陷。

## 走查结果

### 首跑（triage933 探针）：9/11

- PASS default-render（53 卡）
- PASS default-slim-no-full-fetch（初始 0 次 /api/items 全量 fetch）
- FAIL needs-you-count（ui=12 vs api=11）→ 见下方分析 A
- PASS lazy-search-one-fetch（恰好 1 次全量 fetch，12 命中）
- PASS negative-search-empty（诚实空态）
- PASS j-e-ack（台账 13→14）
- PASS api-unack-restore（逐字节还原）
- PASS ack-all（13→25，+12）
- FAIL ack-all-unack-restore（removed 12 后不等）→ 见下方分析 B
- PASS help-panel
- PASS zero-errors

### 复走：10/11（仅 needs-you-count 复现），受控复测后两项均判非缺陷

## 分析 A：needs-you-count「假 FAIL」——waiting 过滤页含变暗 acked 卡（产品设计如此）

受控同刻探针（needs933b）对同一 ID `devin:devin-dfc7d921…`（PDF Suite 会话）取证：

- slim SSE、localStorage、全量 API 三处 acked[id] 与 lastActivityAt **逐字节一致**（`2026-08-12T22:36:52.332949Z`），`lastActivityAt <= at` 成立，客户端 `isAcked` 判定为已 ack；
- 但该卡仍出现在 Needs You 页——查源码确认这是**设计行为**：waiting 过滤页把未 ack waiting 渲染在主区（`waiting`），把已 ack waiting 以变暗卡渲染在 "Everything else" 区（`rest`），大标题计数 `unackedWaiting` 只数未 ack 项；
- 探针用 `main article, main li` 数了全部卡片（11 = 10 未 ack + 1 变暗 acked），与 API 未 ack 数（10）比对必然差 1×acked-waiting 数。round-922 全通是因当时 acked 台账里恰好没有 waiting 项。

**方法注记（入档）**：Needs You 计数断言应比对「大标题 unackedWaiting 数字 vs API 未 ack waiting 数」或排除变暗卡（`[class*=grayscale]`/dimmed），不能数该页全部卡片。

## 分析 B：ack-all-unack-restore「假 FAIL」——live 数据窗口内新增 waiting 项竞态

- 受控 API-only 复测（triage933b）：对同刻 12 个未 ack waiting 全部 ack（13→25）→ 按新增 id 集合逐项反 ack → 台账**逐字节还原**（byte-restore true）；
- 首跑 FAIL 是 UI ack-all 点击窗口与基线快照之间出现真实新转换 waiting 项（live 漂移，round-889/911 同类竞态），反 ack 集合与 ack 集合不同刻所致，非产品缺陷。复走同法即通过（removed 11，还原成立）。

## 本地门禁

- build ✓ / lint ✓ / typecheck ✓ / test 99 ✓（Actions 降级门禁：仓库 Actions 保持禁用，验收以本地全绿为准）

## 探针残留

- 台账终态与轮前逐字节一致；探针脚本均在 /home/ubuntu/a11y/*.tmp.mjs，未入库。
