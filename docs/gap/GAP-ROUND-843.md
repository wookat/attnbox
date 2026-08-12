# GAP-ROUND-843 — rounds 832–842 合并回归审计（纯文档）

Round 843. 主驱动：运行时回归审计（round-832 后首次）——rounds 832–842
合并面（深爬失败回退 P1 修复 #866 + 十轮纯文档）soak + 双主题 smoke。

## Soak（~14 分钟，28 采样 @30s，live daemon）

- 规模 4,495→4,497 会话（迄今最大）；`items == summary.total` 全程恒成立。
- API 28/28 全程 200，零错误。
- RSS 147.1–163.1 MB，包络内平稳，无泄漏趋势。
- totals 序列 4,495(×18)→4,496(×7)→4,495(×1)→4,497(×2)：一次 -1 微降
  后立即回升，幅度 1、非截断形态（round-832 P1 为 4,474→206 量级坍缩），
  与本地/GitHub 来源条目真实消长一致，判定为真实数据变化非回归。
- waiting 14–17，随真实会话状态变化。

## 双主题 smoke

- light 64 卡 / dark 63 卡（间隔期真实增减），0 pageerror、0 console error。

## 本地门禁

`pnpm build` ✓ / `pnpm lint` ✓ / `pnpm test` 99 ✓。

## Verdict

无 P0/P1：round-832 深爬失败回退修复在合并面上稳定（soak 全程无截断坍缩），
RSS/错误率/双主题渲染全绿。纯文档轮，无 changeset。探针零残留。
