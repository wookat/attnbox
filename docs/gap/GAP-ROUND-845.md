# GAP-ROUND-845 — 分诊全流程 UX 走查（纯文档）

Round 845. 主驱动：分诊全流程 UX 走查（round-834 后首次）——搜索→过滤→
ack all→反 ack + 键盘链，live daemon @4,497 会话（迄今最大）。

## 契约核验（13/13 成立）

- 默认态 63 卡渲染，0 次全量 items fetch（slim SSE 契约）。
- Needs you 过滤 17 卡（与 waiting 计数徽章一致）。
- 惰性搜索：输入后恰好 1 次 `/api/items` 全量 fetch（隔离复测确认），
  4 命中；搜索为客户端过滤、无 `q=` 参数，属设计契约。
- 负例搜索诚实空态（0 卡 + 空态文案）。
- j/e 键盘 ack：台账 13→14。
- API 反 ack（`{id, at: null}`）：台账逐字节还原至基线。
- ✓ all done：17 waiting 全部入账（13→30），逐项反 ack 后台账
  逐字节还原。
- ? 快捷键帮助面板正常开合。
- 0 pageerror、0 console error。

## 方法注记

- 搜索 fetch 无 `q=` 参数（客户端过滤），探针按 `q=` 分类首跑 1 处
  假 FAIL，为探针假设错误，非产品缺陷；隔离复测恰好 1 次 fetch。
- 过滤标签为 button 元素而非 ARIA tab，探针选择器需用
  `getByRole('button')`。

## Verdict

无 P0/P1：分诊全链路契约在 4,497 会话规模上全部成立。纯文档轮，
无 changeset。探针零残留，台账逐字节还原。
