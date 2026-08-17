# GAP-ROUND-1058：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1047 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 尾行计数与 API 同刻精确一致（7/39/5449，迄今最大）、hooks --install 沙箱四态 6/6 首跑全通。无 P0/P1。**

## 方法

- 实机直跑构建产物 `packages/cli/dist/index.js`（daemon 4820 live 面）。
- hooks --install 在 mktemp 沙箱 HOME 内走四态（无工具目录 / 全新落地 / 幂等 / 坏 JSON 拒绝），零残留。

## 结果

### doctor（~0.20s）

七行全对：node ✓ / claude-code 权威 hooks ✓ / codex hooks.json 权威 ✓ / gemini 启发式诚实边界 ✓ / devin API 可达 key 有效 ✓ / github-pr 未配置诚实 “–” / webhook 未配置诚实 “–”。

### ls --waiting（热跑 ~4.5s @5,449 会话，迄今最大）

- 7 waiting 全带预览、时长、行动链接（session URL + PR 次级链接）。
- 尾行 `7 waiting on you · 39 working · 5449 total` 与 API 同刻复核 7/39/5449 精确一致（本轮无观察竞态）。

### hooks --install 沙箱四态（6/6 首跑全通）

1. 无工具目录：诚实 "not found"。
2. 全新落地：claude/codex 均带 `.attnbox-bak` 备份且写入 attnbox hook。
3. 幂等：二次安装 md5 逐字节不动。
4. 坏 JSON：拒绝（exit 非 0）且原文件逐字节不动。

沙箱零残留。

## 对照面

- rounds 1048–1057 合并面（#1083–#1092，全为纯文档轮）无 CLI 回归。

## 结论

- 无 P0/P1；纯文档轮。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
