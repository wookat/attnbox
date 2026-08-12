# GAP-ROUND-891 — 文档新鲜度走查（纯文档）

Round 891. 主驱动：文档新鲜度走查（README/官网五页/LIMITS/MATURITY 对照 rounds 881–890 证据核漂移）——round-880 后首次。证据窗口：2026-08-04。

## 走查结果

- **README**：无漂移，无需修改。
- **官网五页（quickstart/inbox/hooks/doctor/limits）**：无漂移，官网无需重建。
- **docs/LIMITS.md**：无漂移，边界表述与现行为一致。
- **docs/MATURITY.md**：唯一漂移——证据行陈旧于 round-880。已刷新至 rounds 881–890 实证：
  - live 规模 ~4,555（迄今最大）。
  - Security：round-885 11/11 sweep @4,550（numeric-`at` 400、byte-exact 13→14→13、webhook 冷启动零重放 23 存量、8 POST 7 唯一）。
  - Mobile-first UI：round-883 axe 0 违规 @4,548+，Done 满载双主题各 4,474 卡（迄今最大满载）。
  - Performance：round-887 隔离端口 soak RSS 100–167MB @4,553、API 28/28 200、items==summary.total 恒成立、日志 0 error。
  - Real-world validation：hooks 安装器复走 +882；采集器 +890 14/14 零假 FAIL；PWA +884 5/5 ~4s 74 卡全保留（并列系列最快）。

## Verdict

无 P0/P1；漂移仅 MATURITY 证据行，本 PR 已刷新。纯文档轮，无 changeset。
