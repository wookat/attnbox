# GAP-ROUND-777：rounds 766–776 合并回归审计——soak/双主题 smoke 全绿

日期：2026-08-04
驱动维度：运行时回归审计（round-766 后首次）

## 方法

- 合并后 `main`（含 #800–#810）本地 `pnpm build` 后 `setsid nohup node packages/cli/dist/index.js --port 4777` 起真实数据 daemon。
- 每 30 秒采样一次 daemon RSS + `/api/items` 条数，共 28 次（约 14 分钟）。
- Playwright chromium 双主题（dark/light）smoke：默认态卡片数、Needs you 计数、waiting/done/grouped 切换，采集 pageerror + console error。
- 收尾按 `fuser 4777/tcp` 找真实 PID 收口，探针文件删除。

## 证据

- 真实数据规模 4,426 会话（迄今最大），soak 全程 `items` 恒定 4,426，无采集器抖动。
- RSS 132–157MB，在历史包络（106–161MB）内平稳，无单调增长趋势。
- daemon 日志 error/unhandled/exception 命中数 0。
- 双主题 smoke 默认态各 73 卡、Needs you 徽章各 15、waiting/done/grouped 切换正常，pageErrors 0。
- `pnpm build` / `pnpm lint` / `pnpm test`（98）全绿。
- 观察（非缺陷）：light 主题 waiting 列表实测 14 卡而 dark 为 15，收尾时 API `summary.waiting` 为 14——真实云会话在观察窗内自然转出 waiting，属实时数据变化的忠实透传。

## 结论

rounds 766–776 合并面无运行时回归，无 P0/P1。纯文档轮。
