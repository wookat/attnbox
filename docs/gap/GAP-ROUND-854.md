# GAP-ROUND-854 — rounds 843–853 合并回归审计（纯文档）

Round 854. 主驱动：运行时回归审计（round-843 后首次）——daemon soak
（RSS/错误率/items 稳定性）+ 双主题 smoke。

## soak（~14 分钟，28 采样 @30s）

- API 28/28 全程 200；items==summary.total 恒成立。
- items 4,503→4,506（迄今最大），一次 4505→4504 微降为真实数据消长，
  下一采样即回升，非截断回归（round-832 深爬回退契约持续成立）。
- RSS 149,752–169,748 KB，包络内平稳无单调增长，零泄漏迹象。

## 双主题 smoke

- light/dark 各 53 卡渲染，0 pageerror / 0 console error。

## 方法注记

- smoke 卡片选择器为 `li[id^="item-"]`；首跑用泛化 `.card` 选择器
  计数 0 为探针假设错误，非产品缺陷（复用 round-821 探针后全对）。

## Verdict

无 P0/P1：rounds 843–853 合并面全绿。探针零残留。纯文档轮，
无 changeset。
