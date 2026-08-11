# GAP-ROUND-663：无障碍复审——ack 变暗卡片对比度 P1 修复，双主题 10 态回归 0 违规

日期：2026-08-04
驱动维度：双主题 × 五态全面 axe 复审（round-652 后首次）

## 发现（P1）

首跑 axe（wcag2a/aa + wcag21a/aa）@4,279 会话在含已 ack 卡片的态上报 color-contrast 违规（dark ×21 / light ×24）：全部命中 `opacity-50` 变暗的已 ack 卡片内文本（"has a question"、agent 徽章、cloud 徽章、时间戳、detail 预览、project 行），最差 2.35:1（AA 要求 4.5:1）。

- 为何此前各轮 0 违规：往轮审计窗口内恰无已 ack 的 waiting 卡片在屏；本轮 dogfood 台账有多条已 ack waiting 项，变暗态首次进入审计视野——状态依赖发现，非往轮误报。

## 修复

`apps/web/src/App.tsx` 卡片变暗样式 `opacity-50` → `grayscale`：去饱和保留"已处理"视觉弱化语义，但 grayscale 保持亮度不变，文本对比度与未变暗态一致（AA 达标）。中间尝试 `opacity-80 grayscale` 仍余 4.16/3.5 违规，最终纯 grayscale 清零。

## 回归证据

- 双主题 × 5 态（default / Needs-you 过滤 / Done 惰性加载全量 / 分组视图 / ? 帮助面板）共 10 态全部 0 违规 @4,283 卡（迄今最大）。
- 本地门禁：build ✓ / test 98 ✓ / lint ✓。
- 探针零残留（daemon 与临时脚本已清理）。
