# GAP-ROUND-590：rounds 579–589 合并回归审计——soak/双主题 smoke 全绿，无 P0/P1

日期：2026-08-10
驱动维度：运行时回归审计（round-579 后首次；临时 daemon @ :4590，真实数据 4,117 会话——迄今最大）

## soak（~15 分钟，每分钟采样）

- RSS 139–160 MB，包络内平稳（历史包络 92–160 MB），无泄漏趋势。
- `/api/items` 全程 200。
- daemon 日志 error 计数 0。

## 双主题 smoke

- dark：68 卡，0 页面错误 0 console error。
- light：68 卡，0 页面错误 0 console error。

## 测试

- main 回归门：`Tests 98 passed (98)`。

## 清理

daemon 杀净（端口连接拒绝复测 000）、探针/日志删除，零残留。

## 结论

- rounds 579–589 合并面无运行时回归。无 P0/P1。纯文档轮：不改产品源码、不加 changeset。
