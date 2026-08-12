# GAP-ROUND-865 — rounds 854–864 合并回归审计（纯文档）

Round 865. 主驱动：合并面 soak（daemon RSS/错误率 + 双主题 smoke）——round-854
后首次，@4,515→4,519 会话（迄今最大）。

## 证据（全绿）

- daemon ~14 分钟 soak，30s 采样 28 点：API `/api/items` 28/28 全程 200；
  `items.length == summary.total` 恒成立；total 4,515→4,519 单调爬升
  （真实数据消长，无截断回归）。
- RSS 113–163MB 包络内平稳（一次 113MB 低点为 GC 后瞬时值），零泄漏趋势。
- 双主题 smoke（li[id^="item-"] 选择器）：light/dark 各 69 卡，0 pageerror、
  0 console error。
- 99 测试全通（build/lint/typecheck/test 本地门禁全绿）。

## 方法注记

- smoke 探针 `waitUntil: 'networkidle'` 在 SSE 常开页面永不满足会超时——
  改用 `domcontentloaded` + `waitForSelector('li[id^="item-"]')`。

## Verdict

无 P0/P1，rounds 854–864 合并面（#888–#898，全部纯文档轮）无运行时回归。
探针零残留（单 daemon 在跑）。纯文档轮，无 changeset。
