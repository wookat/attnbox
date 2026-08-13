# GAP-ROUND-960: 无障碍全面复审（双主题 × 五态 axe 稳态复审）

日期：2026-08-04。round-949 后首次全面 a11y 轮。结论先行：**双主题 × 5 态共 10 态全部 0 违规首跑通过 @4,624+ 会话，连续第七十二轮无 a11y 回归，无 P0/P1**。

## 方法

稳态法（stable≥15 判据）：Done 态审前等惰性加载满载完成再跑 axe-core；探针只读，零残留。

## 结果（10/10 态 0 违规）

| 态 | light | dark |
|----|-------|------|
| default | 0 违规 | 0 违规 |
| needs-you | 0 违规 | 0 违规 |
| grouped | 0 违规 | 0 违规 |
| help（? 面板） | 0 违规 | 0 违规 |
| done 惰性满载 | 0 违规（4,576 卡） | 0 违规（4,570 卡） |

- 0 页面/console 错误（pageErrors=0，双主题）。
- Done 满载 light 4,576 / dark 4,570 卡（live 漂移导致双主题计数略异，非缺陷）。

## 结论

- rounds 950–959 合并面无 a11y 回归；纯文档轮，无源码改动。
- 按 Actions 降级门禁验收：本地 lint / typecheck / build / test 全绿即合并标准（GitHub Actions 保持禁用）。
