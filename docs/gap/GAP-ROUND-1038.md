# GAP-ROUND-1038: PWA 离线快照 + SSE 韧性复走（round-1027 后首次）

日期：2026-08-18。基线：main `449d21d`（#1072 合并后）。结论先行：**6/6 全通，无 P0/P1。**

## 方法

- 隔离端口（4934）全新 daemon 复走，主 daemon（4820）不受影响；Playwright 捕获 pageerror/console error。
- 断线/回 live 判定改用真实断线横幅文本（"Connection to the attnbox daemon lost"）精确匹配，替代整页 innerText 含 "offline" 的词检。

## 结果（6/6 PASS）

| # | 检查 | 结果 |
|---|---|---|
| 1 | SW 注册 | PASS（regs=1） |
| 2 | 杀 daemon 后卡片全保留 | PASS（49/49） |
| 3 | offline 断线横幅出现 | PASS（真实横幅文本精确匹配） |
| 4 | 宕机冷刷 SW 快照恢复 | PASS（49/49） |
| 5 | 重启后无刷新自动回 live | PASS（~7s） |
| 6 | 全量 API 恢复 | PASS（total=5,436，迄今最大） |

## 备注

- 方法注记：整页 innerText 词检 `includes('offline')` 不可作为断线判定——live 会话卡片正文可含 "offlineShell" 等字样使词检永真（本轮首跑曾因此产生"重连超时"假 FAIL，经健康态最小探针复现后确认为探针缺陷，非产品缺陷）。应精确匹配断线横幅文本。
- 0 JS pageerror；console 7 条均为宕机窗口网络噪音（1× ERR_INCOMPLETE_CHUNKED_ENCODING + 6× ERR_CONNECTION_REFUSED），为预期断线表现，恢复后无持续错误。
- rounds 1028–1037 合并面无 PWA/SSE 回归。探针与隔离 daemon 零残留（4931–4934 均已释放，主 daemon 4820 健康）。
- 本地门禁：lint ✓ / typecheck ✓ / build ✓ / test 99 ✓。
