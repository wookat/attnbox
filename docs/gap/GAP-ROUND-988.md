# GAP-ROUND-988: 分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）

日期：2026-08-04。round-977 后首次分诊轮，live 规模 5,374+ 会话（迄今最大）。结论先行：**契约全部成立，无 P0/P1；本轮唯一异常（Needs You UI 计数 > API 未 ack waiting 计数，稳定 +2）经源码级 + 受控探针调查判定为探针方法/残留问题，非产品缺陷**。

## 一、走查范围与结果（Playwright 契约探针 @ 127.0.0.1:4820，CLI 服务的现建 bundle）

| # | 场景 | 结果 | 证据 |
| --- | --- | --- | --- |
| 1 | 默认态 slim：加载不发全量 `/api/items` | PASS | fetches=0，slim 卡片正常渲染 |
| 2 | Needs You 计数 == API 未 ack waiting | 首查 MISMATCH → 调查后 MATCH | 详见第二节 |
| 3 | 惰性搜索：恰好 ≤1 次全量 fetch | PASS | newFetches=1 |
| 4 | 负例搜索诚实空态 | PASS | 0 卡片 |
| 5 | 键盘 j → e ack | PASS | 台账 +1 |
| 6 | API 反 ack 单项还原 | PASS | md5 一致 |
| 7 | ✓ all done 批量 ack | PASS | 全部未 ack waiting 项入台账 |
| 8 | 逐项反 ack 逐字节还原 | PASS（受控 API-only 复测） | 27 目标往返后 bytes equal: True |
| 9 | ? 帮助面板 | PASS | dialog 出现 |
| 10 | 0 页面/console 错误 | PASS | pageerr=0 consoleerr=0 |

## 二、Needs You 计数不一致的调查（"没有调查就没有发言权"）

**现象**：受控重复探针 5 次均稳定 `ui 28 vs api 26`，多出的恒为同两个 Devin 项（`devin:devin-e6dabcce…`、`devin:devin-6f8535e1…`），不能以 live 竞态解释。

**源码级事实**（apps/web/src/App.tsx）：
- Needs You 过滤 `matches(item,'waiting')` 只看 `status === 'waiting'`，**不排除已 ack 项**；已 ack 的 waiting 项按设计仍渲染在列表 `rest` 段（变暗、可反 ack）。
- 头部徽章计数才是 `waiting && !isAcked`。

**数据级事实**（SSE/API/localStorage 三方比对，EventSource 完整事件解析）：两项 `status=waiting` 且台账 `at == lastActivityAt` → `isAcked=true` → 按设计渲染在 rest 段。探针把"Needs You 视图下全部 `li[id^=item-]` 行数"当作"未 ack waiting 数"比对，把设计内的已 ack 变暗行误计为超额——**探针断言口径错误，非产品缺陷**。

**残留来源**：这两条 ack 是既往轮次 ✓ all done 探针的清理遗漏——清理只回滚"新出现的 key"，而这两项是台账中**已存在的旧 key 被 ack-all 刷新了时间戳**（旧值 → 新 lastActivityAt），按 key 过滤检测不到。已通过 `{id, at:null}` 反 ack 清除两项（台账 13→11 条）；旧时间戳在任何日志/快照中均不可恢复，无法逐字节还原至轮前 md5。**功能语义等价**：这两项旧 ack 时间戳早于其 lastActivityAt，客户端本就判 `isAcked=false`，删除与保留旧值在 UI/API 行为上一致。

**清除后复测**：`ui 28 api 28 MATCH extraUi=0 missUi=0`。

## 三、方法注记（入档）

1. Needs You 视图行数 ≠ 未 ack waiting 数：视图按设计包含已 ack 变暗行；契约探针应以头部徽章计数或 `waiting && !isAcked` 的 DOM 子集为口径。
2. ✓ all done 探针清理必须快照整份台账并逐字节回写检测，不能只按"新增 key"回滚——已存在 key 的时间戳刷新会漏检并跨轮残留。
3. SSE 事件不能按单个 stream chunk 解析（事件以 `\n\n` 分界、可跨 chunk）；浏览器侧应使用 `EventSource.onmessage` 取完整事件。

## 四、结论

- 无 P0/P1；无源码改动，纯文档轮。
- 台账终态 11 条（清除两条跨轮残留），与 live 语义一致；本轮新增 ack 全部逐字节还原。
- rounds 978–987 合并面（含 #1022）无分诊回归。
