# GAP-ROUND-1069：CLI 黄金路径复走（doctor / ls --waiting / hooks --install 四态）

日期：2026-08-04（UTC）。round-1058 后首次 CLI 轮。结论先行：**doctor 七行全对、ls --waiting @5,457 会话（迄今最大）全带预览/时长/行动链接、hooks --install 沙箱四态 4/4 首跑全通。无 P0/P1。**

## 方法

- 主 daemon `http://127.0.0.1:4820` 不动；hooks --install 在临时沙箱 HOME 中实测，用后即删零残留。
- 检查面：doctor 输出逐行核对；ls --waiting 计时 + 预览/时长/链接完整性 + 尾行计数与 API 比对；hooks --install 空目录/全新落地/幂等/坏 JSON 四态。

## 结果

- doctor 七行全对（~0.16s）：node、claude-code hooks 权威、codex hooks.json 权威、gemini 启发式诚实边界、devin key 有效、github-pr/webhook 未配置诚实提示。
- ls --waiting 热跑 ~6.2s @5,457 会话（迄今最大）：13 waiting 全带"在等什么"预览、等待时长、session 直达链接（含 PR 次级链接）。
- 尾行计数与 API 对比出现 12/35 vs 13/34 的一次差异，经 --json id 集合比对定位为真实转换（一会话 12:21 working→waiting、另一会话 12:22 waiting→done），CLI 独立采集快照比 daemon 缓存快照更新，两侧各自忠实、非缺陷（与既档观察竞态同形态）。
- hooks --install 沙箱四态 4/4 首跑全通：空 HOME 诚实 "not found" 且 exit 0；全新落地带 .attnbox-bak 备份；幂等第二跑 md5 逐字节不动；坏 JSON 拒绝 exit 非 0 且原文件逐字节不动。沙箱零残留。

## 结论

- 无 P0/P1；纯文档轮。rounds 1059–1068 合并面无 CLI 回归。
- 本地门禁（lint/typecheck/build/test）全绿后合入。
