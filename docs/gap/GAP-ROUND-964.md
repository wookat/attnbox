# GAP-ROUND-964: rounds 953–963 合并回归审计（soak + 双主题 smoke）

日期：2026-08-04。round-953 后首次运行时回归轮，覆盖合并面 #987–#997（全部纯文档轮）。结论先行：**隔离端口全新 daemon ~14 分钟 soak @4,628 会话（迄今最大）全绿：API 28/28 全程 200、items==summary.total 恒成立、total 全程稳定 4,628 无回落、waiting 9–12 为真实 live 转换忠实透传、daemon 日志 0 error、RSS 103–153MB 落既往 108–161MB 包络内零泄漏；双主题 smoke 各 52 卡 0 错误 4/4 全通；99 测试全绿。无 P0/P1**。

## 方法

- 隔离端口 :4917 全新 daemon（`node packages/cli/dist/index.js --port 4917`），避免干扰 :4820 常驻 dogfood 实例。
- soak 探针（`soak964.tmp.sh`）：28 次 `/api/items` 轮询、间隔 30s（~14 分钟），逐次校验 HTTP 200 + `items.length == summary.total`，跟踪 total 回落与 daemon 进程 RSS（`ps -o rss= -p $DPID` 直取 daemon PID，规避 round-953 已入档的 pgrep 包装进程假读数）。
- 双主题 smoke（`smoke964.tmp.mjs`）：Playwright `colorScheme: light/dark` 各开一个 context，`domcontentloaded` + 明确 selector + 5s 稳定窗口（SSE 长连接使 `networkidle` 永不触发，round-953 方法注记），统计卡片数与 page/console 错误。
- 本地门禁四道：lint / typecheck / build / test。

## 结果

### soak（SOAK964_DONE pass=28 fail=0）

- API 28/28 全程 200，`items==summary.total` 每次成立。
- total 全程 4,628（迄今最大），无回落（0 处 NOTE dip）。
- waiting 在 9→12 间波动，为真实 live 转换（观察竞态非缺陷，既往方法注记适用）。
- daemon 日志 0 error（`daemon_log_errors=0`）。
- RSS 103–153MB（28 样本），落既往 108–161MB 包络内（下界 103 略低于既往最低 108，方向为更优），零泄漏趋势。

### 双主题 smoke（SMOKE964_DONE pass=4 fail=0）

- light：52 卡渲染、0 page/console 错误。
- dark：52 卡渲染、0 page/console 错误。

### 本地门禁

lint=0 / typecheck=0 / build=0 / test=0，Tests 99 passed (99)。

## 遗留/注记

- 无新 P0/P1；无新观察项。
- 探针临时文件（soak964.tmp.sh / smoke964.tmp.mjs 及日志）保留在 /home/ubuntu/a11y 工作区，未入仓库。
