# GAP-ROUND-823：分诊全流程 UX 走查（round-812 后首次）

日期：2026-08-05。主驱动：分诊全流程 UX 走查（搜索→过滤→ack all→反 ack + 键盘链）。纯文档轮，无 P0/P1。

## 实测证据（Playwright chromium，生产 daemon @4,457 会话，迄今最大）

契约全部成立（10/10）：

1. 默认态 58 卡渲染（slim SSE，无全量 fetch）。
2. waiting 过滤 12 卡。
3. 惰性搜索恰好 1 次 `/api/items` fetch、4 命中（隔离复测确认；首跑计数窗含过滤切换残留出现 1 处假 FAIL，为探针计数窗方法问题，非产品缺陷）。
4. 负例搜索诚实空态（0 卡）。
5. j/e 键盘 ack 台账 13→14。
6. API 反 ack 台账逐字节还原（1,002 bytes）。
7. ✓ all done 13→26。
8. 按基线快照 API 反 ack 全部新增项后台账逐字节还原。
9. ? 快捷键帮助面板正常。
10. 0 页面/console 错误。

方法注记（新）：ack 台账 `~/.attnbox/acked.json` 为 `{id: timestamp}` 对象而非数组，探针须用 `Object.keys` 对比（首跑 `ledger.find is not a function` 为探针假设错误，非产品缺陷）；中断后已按 added-keys 反 ack 逐字节还原基线。

## 结论

- 分诊全流程（搜索/过滤/键盘链/ack all/反 ack）在 4,457 会话规模下无回归；无 P0/P1。
- 本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
- 探针零残留（脚本在仓库外，台账逐字节还原）。
