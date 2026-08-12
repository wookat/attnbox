# GAP-ROUND-876 — rounds 865–875 合并回归审计（纯文档）

Round 876. 主驱动：合并面 soak（daemon RSS/错误率 + 双主题 smoke）——round-865
后首次，@4,531→4,540 会话（迄今最大）。

## 证据（全绿）

- 隔离端口 4876 全新 daemon ~14 分钟 soak，30s 采样 28 点：API `/api/items`
  28/28 全程 200；`items.length == summary.total` 恒成立；total 4,531→4,540
  单调爬升（真实数据消长，无截断回归）。
- RSS 109–164MB 包络内平稳（低点为 GC 后瞬时值），零泄漏趋势；daemon 日志
  0 error/exception。
- 双主题 smoke（li[id^="item-"] 选择器，domcontentloaded + waitForSelector）：
  light/dark 各 67 卡，0 pageerror、0 console error。
- 99 测试全通（build/lint/typecheck/test 本地门禁全绿）。

## 方法注记

- daemon 无独立 `/api/summary` 端点——summary 内嵌于 `/api/items` 响应
  （`{items, summary, acked}`）；首跑 20 tick 假 FAIL 均为该探针端点假设
  错误（返回 SPA index.html 导致 JSON 解析失败），非产品缺陷。

## Verdict

无 P0/P1，rounds 865–875 合并面（#899–#909，全部纯文档轮）无运行时回归。
探针零残留（soak daemon 已停，探针文件已删）。纯文档轮，无 changeset。
