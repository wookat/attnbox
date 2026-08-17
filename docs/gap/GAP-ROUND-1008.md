# GAP-ROUND-1008: rounds 997–1007 合并回归审计（round-997 后首次）

日期：2026-08-18。主驱动：合并面（#1032–#1042）运行时回归 soak + 双主题 smoke。结论先行：**soak 28/28 全程 200 + RSS 包络内零泄漏 + 双主题 smoke 0 错误，无 P0/P1**。

## 结果

1. 隔离端口（4908）全新 daemon ~14 分钟 soak @5,417 会话（迄今最大）：API 28/28 全程 200；items==summary.total 恒成立（5,417==5,417 全程）；total 单调无回落；waiting 10–12 为真实 live 转换忠实透传；daemon 日志 0 error。
2. RSS 104–165MB，落既往包络（97–165MB）内，零泄漏形态。
3. 双主题 smoke：light/dark 各 59 卡渲染、0 pageerror、0 console error，2/2 全通（方法注记：SSE 长连接下 `networkidle` 永不触发，smoke 探针需用 `domcontentloaded`——与既往轮方法一致）。
4. 99 测试全绿；探针与临时文件零残留（daemon 已杀、端口已释放）。

## 结论

rounds 997–1007 合并面无运行时回归。无 P0/P1；本轮纯文档。继续循环。
