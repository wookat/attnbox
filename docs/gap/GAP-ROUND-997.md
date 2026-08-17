# GAP-ROUND-997：rounds 986–996 合并回归审计（round-986 后首次）

日期：2026-08-04。基线 main：#1031（`c06ed71`）。合并面：#1021–#1031（全部纯文档轮）。

## 隔离端口全新 daemon soak（~14 分钟，28 探针 @30s）

- API 28/28 全程 200；`items == summary.total` 恒成立。
- total 5,405→5,407（迄今最大）单调无回落；waiting 14–22 为真实 live 转换忠实透传。
- daemon 日志 0 error；真实进程 RSS 97–160MB（上限落既往 103–165MB 包络内，下限 97MB 略低于既往为启动初期采样，非异常），零泄漏迹象。

## 双主题 smoke

- light 71 卡 / dark 72 卡渲染（差异为 live 构成自然波动），0 pageerror / 0 console error，2/2 首跑全通。

## 结论

- rounds 986–996 合并面（#1021–#1031）无运行时回归；无 P0/P1；探针零残留（隔离 daemon 已终止）。
- 本地门禁全绿（lint ✓ / typecheck ✓ / build ✓ / test 99 ✓）；GitHub Actions 按公司政策保持禁用，以本地门禁为验收标准。
