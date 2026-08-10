# GAP-ROUND-623：rounds 612–622 合并回归审计——soak/双主题 smoke 全绿，无 P0/P1

日期：2026-08-04
驱动维度：运行时回归审计（round-612 后首次；临时 daemon @ :4626，真实数据 4,222 会话——迄今最大）

## 实测结果

### daemon soak（~15 分钟，每分钟采样）

- RSS 包络 105–162MB，锯齿为 GC（多次回落至 ~105–135MB），无单调上涨，无泄漏签名；
- 日志 error 计数 0；
- waiting 计数 23–29 随真实数据自然波动；
- 最后一次采样 total 短暂读到 3,406（采集周期中途快照），紧接的三次连续复读均稳定 4,222——瞬态读数非回归。

### 双主题 smoke

- light：85 卡渲染，0 页面错误 / 0 console error；
- dark：86 卡渲染，0 页面错误 / 0 console error（卡数差为真实数据变动）；
- 探针基线均 `localStorage.clear()` + reload；
- 方法注记：4.2k 规模下 SSE 长连接使 `networkidle` 永不触发——smoke 探针 goto/reload 须用 `domcontentloaded` + 定时等待。

### 单测

- `pnpm test` → Tests 98 passed (98)。

## 清理

daemon 杀净（fuser -k 4626/tcp，端口复核 CLOSED）、探针脚本与日志删除，零残留。

## 结论

- rounds 612–622 合并面（全部纯文档轮）无运行时回归。
