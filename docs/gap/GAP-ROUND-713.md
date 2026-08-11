# GAP-ROUND-713：分诊全流程 UX 走查——契约全部成立

日期：2026-08-04
驱动维度：分诊全流程 UX 走查（round-702 后首次；搜索→过滤→ack all→反 ack + 键盘链）

## 证据（@4,344+ 会话，迄今最大）

- 默认态：0 次全量 `/api/items` fetch（slim SSE 契约成立）。
- 惰性搜索：用户式单次输入恰好触发 1 次全量 fetch，3,339 命中；负例诚实空态（0 卡）。
- j/e 键盘 ack：台账 13→14。
- ✓ all done：14→31，按钮门控契约成立。
- API 反 ack（`{id, at: null}`）逐条 200，台账最终与走查前备份逐字节还原（byte-equal: true，13 条）。
- ? 帮助面板正常；0 页面错误。

## 方法注记（新增）

- ack 台账 `~/.attnbox/acked.json` 是扁平 `{“source:id”: ISO时间}` 映射，非 `{acked: [...]}` 数组——本轮探针首跑 1 处假 FAIL（"could not read newest ack id"）由此产生，改按对象键 diff 后反 ack 全部成功，非产品缺陷。

## 结论

- 分诊全流程 9 项断言中 8 项首跑 PASS，唯一 FAIL 为探针台账格式假设错误（已排除）。
- 无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
