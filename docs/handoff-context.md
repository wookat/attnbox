# Handoff context — attnbox

按 Company OS 交接上下文制度维护；换会话/换负责人时先读本文档。最后更新：2026-08-07（ROUND-126）。

## 项目一句话

跨"本地 CLI agent + 云端 agent"的统一注意力收件箱：不管 agent 跑在哪里，"哪个在等我、等我做什么（审批/回答问题/审 PR）"聚合成一个视图。

## 仓库与服务

- 仓库：https://github.com/wookat/attnbox （main 分支保护，PR + CI）
- 官网：https://attnbox.zalize.com （Astro Starlight，`apps/site`，Cloudflare Pages，项目名 `attnbox`；文档 PR 合并后需 `pnpm build` + `wrangler pages deploy dist` 重建）
- npm：`attnbox`（CLI+web）、`attnbox-core`、`attnbox-collectors`、`attnbox-daemon`；当前 0.4.8 / 0.2.1 / 0.2.7 / 0.4.0（v0.4.8 Release 已建，round-125 slim SSE）
- monorepo：pnpm + changesets；`packages/{core,collectors,daemon,cli}` + `apps/{web,site}`

## 日常循环（当前运作方式）

1. 每轮（ROUND-N）轮换主驱动维度：真实测试 / UX 走查 / 前端视觉 / 竞品调研 / 用户与数据分析 / 文档新鲜度。
2. 有 P0/P1 → 修复 + focused tests + changeset（包行为变更时）；无 → 纯文档 GAP 轮。
3. 每轮产出 `docs/gap/GAP-ROUND-N.md`，独立分支 + PR，CI 绿后由总负责人合并。
4. 文档 PR 合并后重建官网；changeset 累积到值得发版时报总负责人出版本 PR。
5. 发布顺序 core→collectors→daemon→cli，逐包 `pnpm pack` + `npm publish <tarball>`；发布后干净环境回归 + GitHub Release。

## 质量门禁

`pnpm lint && pnpm typecheck && pnpm build && pnpm test`（98 测试，coverage 阈值 CI 强制）。

## 关键设计事实（容易踩的坑）

- Devin 采集：全量分页爬取（100/页，深页 10 并发批，硬上限 10,000，30s 深页缓存）；云状态权威透传，5 分钟 stale-working 上限仅本地启发式适用。
- Devin waiting 详情：一次 collect 取全（顺序批，每批 10 并发，`updated_at` 缓存）——round-111 修复，勿回退为每周期条数上限（一次性 `ls` 永不补齐）。
- a11y 审计要覆盖交互态：round-117 的激活 tab 徽章、round-119 的内联代码底色都是默认态审计漏掉的（axe/Lighthouse 只测默认 tab/白底就会漏）。
- webhook/浏览器通知：id 仅在观测到非 waiting 后才离开已通知集合（防采集器抖动风暴，rounds 71/81）。
- `--host` 必须 token（`ATTNBOX_TOKEN`），API/SSE 全面 401 门禁（rounds 29/84 负例契约）。
- doctor 的 GitHub 探活走 review-requested 搜索端点，不能用 `/user`（App token 会 403，round-94）。
- 离线快照走 localStorage（round-79 重构过写路径，勿回退为每 tick 同步写；round-125 起恢复也是惰性的——SSE 快照先到就跳过缓存解析，勿回退为启动即解析）。
- slim SSE（round-125）：web 订阅 `/api/events?slim=1`，事件不含 done 项，summary 仍全量；Done tab/搜索/分组/展开器靠 `/api/items` 惰性取 done（`summary.total - items.length` 漂移即失效重取）。改 web 视图逻辑时注意用 `allItems`（含惰性 done）而非 `data.items`。

## 已知 P2 台账（勿擅自实现，触发条件见各 GAP）

SSE delta 事件、payload 去重/归一、展开 3k 列表虚拟化、本地 agent 远程审批（零侵入约束）、presence-aware 通知（round-98 观察项）、Devin project 归组覆盖率 41.6%（受供应商字段限制）、waiting 紧急度排序/解释与交接简报（round-109 观察项，触发：dogfood waiting 多到时长排序不够用）。round-106 的性能升级触发已于 round-125 命中并落地（slim SSE，payload 瘦身）；剩余虚拟化仅在 slim 后仍可复现 perf<70 时再议。

## 资源与凭证

- `DEVIN_API_KEY`（环境已配）；GitHub 走内置认证；Cloudflare wrangler 已登录。
- cursor-agent 登录凭证仍缺（多轮资源续报中）；opencode 本机无真实数据。

## 进行中/下一步

- 无未合并 PR 时按循环继续；竞品每轮必查 kookr（迭代速度极高，round-115 示警）+ kelpie/coslash/ccmux/omnigent 动向。ccmux 已用 pane 捕获修复 Escape 陈旧 waiting（我们零侵入约束下不可用，round-72 不修决策成立，LIMITS 已注明）。
- changeset 当前无累积（v0.4.8 已清空）。
- Rounds 111–125 概要：111 detail 取全 P1（发 v0.4.6）、112/113 修复三面验证、114 文档入档、115 竞品复扫、116 键盘链全通、117 徽章对比度 P1（发 v0.4.7）、118 数据面干净、119 官网 doctor 页对比度 P1、120 交接整备、121 门禁/webhook 复测、122 竞品第五批、123 移动触控走查、124 本地采集器实弹、125 slim SSE P1（发 v0.4.8，daemon 0.4.0）。对外可见性/宣发仍是最大非工程缺口（待老板决策）。
