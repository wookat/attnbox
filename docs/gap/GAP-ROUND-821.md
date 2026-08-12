# GAP-ROUND-821：rounds 810–820 合并回归审计（soak + 双主题 smoke）

日期：2026-08-05。主驱动：运行时回归审计（round-810 后首次）。纯文档轮，无 P0/P1。

## 审计范围

Rounds 810–820 合并面（#844–#854，全部纯文档轮），在最新 main 上对生产 daemon 做 soak 与双主题 smoke。

## 实测证据

### daemon soak（~14 分钟，28 个 30s 采样点）

- 规模：4,449 → 4,453 会话（迄今最大），items 计数只随真实新会话单调微增，无跳变/丢失。
- RSS：109–160MB，包络内平稳（与 810 轮 121–164MB 同量级），无泄漏趋势。
- `/api/items` 全程 HTTP 200，`items.length == summary.total` 恒成立。
- 注：当前 daemon 进程 stdout/stderr 指向 /dev/null（无日志文件可查），daemon 健康以 API 全程 200 + 数据一致性为准。

### 双主题 smoke（Playwright chromium）

- light：63 卡渲染，0 页面/console 错误。
- dark：63 卡渲染，0 页面/console 错误。

## 结论

- rounds 810–820 合并面无回归；无 P0/P1。
- 本地门禁：`pnpm build` / `pnpm lint` / `pnpm test`（98 测试）全绿。
- 探针零残留（soak 脚本与 smoke 探针均在仓库外，未提交）。
