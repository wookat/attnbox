# GAP-ROUND-658：分诊全流程 UX 走查——契约全部成立

日期：2026-08-04
驱动维度：分诊全流程 UX 走查（round-647 后首次；搜索→过滤→ack all→反 ack + 键盘链）

## 走查证据（@4,279 会话，迄今最大）

- 默认态渲染 54 卡，0 次全量 `/api/items` fetch（slim SSE 契约成立）。
- 惰性搜索恰好 1 次全量 fetch，4,273 命中；负例搜索诚实空态（0 卡）。
- j/e ack 往返：台账 10→11→10（基线相对断言，e toggle 契约成立）。
- API 反 ack 经 SSE 同步回基线（走查前后台账逐字节还原，含原始时间戳）。
- ? 帮助面板正常；0 页面错误；daemon 日志零错误。
- `✓ all done` 本轮未渲染——按契约仅在未 ack waiting > 1 时显示（`waiting.length > 1` 门控，App.tsx），本轮未 ack waiting 恰为 1，行为正确非缺陷。

## 方法注记（新）

- `attnbox:acked` 台账为对象映射 `{id: ISO时间戳}` 而非数组——探针断言须 `Object.keys(...)`，反 ack 还原须回填原始时间戳（`{id, at: 原时间戳}`）。
- daemon 台账持久化且跨端 SSE 同步：`localStorage.clear()` 后会被 SSE 重新灌回，探针断言须相对基线而非绝对零。

## 结论

- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
- 探针零残留（4658 端口 daemon 已清理，台账已还原，临时文件已删除）。
