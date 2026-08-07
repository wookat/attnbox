# Handoff context — attnbox

按 Company OS 交接上下文制度维护；换会话/换负责人时先读本文档。最后更新：2026-08-07（ROUND-100）。

## 项目一句话

跨"本地 CLI agent + 云端 agent"的统一注意力收件箱：不管 agent 跑在哪里，"哪个在等我、等我做什么（审批/回答问题/审 PR）"聚合成一个视图。

## 仓库与服务

- 仓库：https://github.com/wookat/attnbox （main 分支保护，PR + CI）
- 官网：https://attnbox.zalize.com （Astro Starlight，`apps/site`，Cloudflare Pages，项目名 `attnbox`；文档 PR 合并后需 `pnpm build` + `wrangler pages deploy dist` 重建）
- npm：`attnbox`（CLI+web）、`attnbox-core`、`attnbox-collectors`、`attnbox-daemon`；当前 0.4.5 / 0.2.1 / 0.2.6 / 0.3.2
- monorepo：pnpm + changesets；`packages/{core,collectors,daemon,cli}` + `apps/{web,site}`

## 日常循环（当前运作方式）

1. 每轮（ROUND-N）轮换主驱动维度：真实测试 / UX 走查 / 前端视觉 / 竞品调研 / 用户与数据分析 / 文档新鲜度。
2. 有 P0/P1 → 修复 + focused tests + changeset（包行为变更时）；无 → 纯文档 GAP 轮。
3. 每轮产出 `docs/gap/GAP-ROUND-N.md`，独立分支 + PR，CI 绿后由总负责人合并。
4. 文档 PR 合并后重建官网；changeset 累积到值得发版时报总负责人出版本 PR。
5. 发布顺序 core→collectors→daemon→cli，逐包 `pnpm pack` + `npm publish <tarball>`；发布后干净环境回归 + GitHub Release。

## 质量门禁

`pnpm lint && pnpm typecheck && pnpm build && pnpm test`（97 测试，coverage 阈值 CI 强制）。

## 关键设计事实（容易踩的坑）

- Devin 采集：全量分页爬取（100/页，深页 10 并发批，硬上限 10,000，30s 深页缓存）；云状态权威透传，5 分钟 stale-working 上限仅本地启发式适用。
- webhook/浏览器通知：id 仅在观测到非 waiting 后才离开已通知集合（防采集器抖动风暴，rounds 71/81）。
- `--host` 必须 token（`ATTNBOX_TOKEN`），API/SSE 全面 401 门禁（rounds 29/84 负例契约）。
- doctor 的 GitHub 探活走 review-requested 搜索端点，不能用 `/user`（App token 会 403，round-94）。
- 离线快照走 localStorage（round-79 重构过写路径，勿回退为每 tick 同步写）。

## 已知 P2 台账（勿擅自实现，触发条件见各 GAP）

SSE delta 事件、payload 去重/归一、展开 3k 列表虚拟化、本地 agent 远程审批（零侵入约束）、presence-aware 通知（round-98 观察项）、Devin project 归组覆盖率 41.6%（受供应商字段限制）。

## 资源与凭证

- `DEVIN_API_KEY`（环境已配）；GitHub 走内置认证；Cloudflare wrangler 已登录。
- cursor-agent 登录凭证仍缺（多轮资源续报中）；opencode 本机无真实数据。

## 进行中/下一步

- 无未合并 PR 时按循环继续；竞品重点盯 pulse-protocol/grove/ccmux 与 omnigent 审批栈动向。
