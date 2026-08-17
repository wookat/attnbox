# GAP-ROUND-1047：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1036 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting 尾行计数与 API 同刻精确一致（7/38/5439）、hooks --install 沙箱四态 6/6 首跑全通，无 P0/P1。**

## 方法

- 真实 live 面（主 daemon 4820，5,439 会话）跑 `doctor` 与 `ls --waiting`；同刻 curl `/api/items` 复核尾行计数。
- `hooks --install` 在隔离 `HOME` 沙箱（mktemp）跑四态探针（round-1036 同款，`hook1047.tmp.sh`），沙箱轮末删除零残留。

## 结果

### doctor（~0.16s）

七行全对：node ✓、claude-code hooks 权威 ✓、codex hooks.json 权威 ✓、gemini 启发式（诚实标注从不声称 waiting）✓、devin API key 有效 ✓、github-pr 无 token 诚实标注 fallback inactive、webhook 未配置诚实标注无推送通道。

### ls --waiting（热跑 ~6.1s @5,439 会话，迄今最大）

- 7 个 waiting 项全带"在等什么"预览、等待时长（9m–2d）与行动链接（session URL + PR 次级链接）。
- 尾行 `7 waiting on you · 38 working · 5439 total` 与同刻 API summary（7/38/5439）精确一致，本轮无观察竞态。

### hooks --install 沙箱四态（6/6 首跑全通）

| # | 状态 | 结果 |
|---|---|---|
| 1 | 无工具目录 | PASS 诚实 "not found" |
| 2 | 全新落地 | PASS claude/codex 均带 .attnbox-bak 备份 + hook 写入 |
| 3 | 幂等重跑 | PASS md5 逐字节不动 |
| 4 | 坏 JSON | PASS 拒绝 exit 非 0 且原文件逐字节不动 |

## 结论

- rounds 1037–1046 合并面无 CLI 回归；沙箱零残留。
- 无 P0/P1；纯文档轮。
