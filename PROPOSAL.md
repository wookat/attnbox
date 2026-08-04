# PROPOSAL — AttnBox（多 agent 注意力统一收件箱）

状态：待 CEO 审批（如无异议将按此执行）。日期：2026-08-04。

## 1. 命名核验（结论：**attnbox**）

| 候选 | npm | npm 连字符判重 | GitHub org/用户 | GitHub 同名仓库 | <name>.zalize.com | PyPI | 结论 |
|---|---|---|---|---|---|---|---|
| agentinbox | 未占用 | **❌ 与已存在的 `agent-inbox`（LangChain 生态）仅差连字符，npm 禁止发布** | — | langchain-ai/agent-inbox 存在 | — | — | 弃用 |
| agent-deck | 未占用 | ❌ 与 `agentdeck` 冲突 | — | — | — | — | 弃用 |
| agentpager | 未占用 | ✅ | ❌ github.com/agentpager 已被占 | afetmin/AgentPager 存在 | 可用 | — | 弃用 |
| **attnbox** | ✅ 未占用 | ✅ `attn-box` 也未占用，无判重冲突 | ✅ 404 可用 | ✅ 搜索零结果 | ✅ 无 DNS 记录 | ✅ 404 | **采用** |
| attnhub（备选） | ✅ | ✅ | ✅ | ✅ | ✅ | — | 备选 |
| waitdeck（备选） | ✅ | ✅ | ✅ | ✅ | ✅ | — | 备选 |

工作名 AgentInbox 因 npm 判重规则不可用，正式定名 **AttnBox**（attention inbox）。仓库建议 `wookat/attnbox`，域名 `attnbox.zalize.com`，npm 包 `attnbox`（CLI）。

## 2. 定位

**跨"本地 CLI agent + 云端 agent"的统一注意力收件箱。** 不管 agent 跑在哪里（终端里的 Claude Code/Codex/Gemini CLI，云上的 Devin/Cursor/Copilot coding agent），"哪个在等我、等我干什么（审批 / 回答问题 / 审 PR / 解除阻塞）"聚合成一个视图，手机上也能看能点。

一句话：**agent 时代的 PagerDuty 收件箱，隐私优先、零侵入。**

## 3. 差异化（对照 docs/COMPARISON.md）

1. **唯一覆盖云端 agent**：全部 10 个同类竞品只做本地终端 agent；Devin/Cursor/Copilot 的公开 API 均含"等用户"语义（docs/FEASIBILITY.md 实测/核验）。
2. **不绑 tmux**：8/10 竞品硬依赖 tmux。我们主信号源是只读会话日志（ccusage 式 adapter）+ 云 API；tmux 仅可选增强。
3. **移动端一等公民 + 数据默认不出本机**：竞品中二者不可兼得（agent-dashboard 局域网 PWA 简陋 / Omnara 闭源 SaaS 数据出本机）。
4. **统一注意力模型**：AttentionItem = {agent, 来源(local/cloud), 状态, 等待类型(approve/answer/review/unblock), 等了多久, 一键去处理}。

## 4. 架构

```
┌─ collectors（只读，不侵入）────────────┐
│ local:  ~/.claude/**  ~/.codex/sessions/**  ~/.gemini/**   (fs watch)
│ cloud:  Devin API / Cursor API / Copilot tasks API / GitHub review-requested  (poll+webhook)
└──────────────┬─────────────────────────┘
        packages/core（统一 AttentionItem 模型 + 状态机）
               │
   attnbox daemon（Node 22，localhost HTTP + SSE，零配置 `npx attnbox`）
               │
   apps/web（Vite + React + Tailwind + shadcn/ui，响应式，daemon 直接托管静态壳）
   + CLI（attnbox ls / attnbox next）
```

- pnpm workspace：`packages/core`（模型+状态机）、`packages/collectors`（每个来源一个 adapter）、`packages/daemon`（服务+SSE）、`packages/cli`、`apps/web`。
- 隐私：默认全部数据留在本机；云 API key 存本机配置（0600）；手机访问走局域网或用户自建隧道（文档给 Tailscale/cloudflared 指引），不经我们服务器。
- 技术栈按 Gate 家族标准：TypeScript strict + Node 22 + pnpm + Vitest + ESLint + GitHub Actions + Changesets + 覆盖率门禁 + SECURITY.md + docs/MATURITY.md（参照 agentgate）。

## 5. 里程碑（短周期，每个 ≤3 天）

- **M0 骨架**（0.5 天）：仓库、CI、lint/测试/覆盖率门禁、治理文件。
- **M1 可用收件箱**：Claude Code + Codex 本地采集（日志被动模式）、Devin API、GitHub review-requested 兜底；daemon + 响应式 Web 收件箱；`npx attnbox` 一条命令跑起来。验收：真实环境录屏，手机视口走查。
- **M2 信号加深**：Claude hooks 权威模式（可选安装/卸载命令）、Gemini CLI、Cursor Cloud API、Copilot tasks API、桌面/浏览器通知、"一键跳转"（终端 deep-link / 云控制台 URL）。
- **M3 打磨发布**：能力边界文档（哪些判定是启发式）、npm dry-run、README/demo GIF、MATURITY 自评，交 CEO 验收 + 对外发布准备。

## 6. 风险与诚实边界

- 本地日志格式随各 CLI 版本漂移（Omnara 开源版即死于包装 CLI）→ 我们**只读日志不包装进程**，adapter 单文件化 + 版本容错 + 测试夹具。
- Gemini "等待输入"信号弱 → UI 明示置信度，不假装精确。
- Copilot API 需 Business 订阅 → PR review-requested 兜底，文档如实标注。
- 与 ccmux 差异要守住：不做 tmux 内嵌 TUI 的军备竞赛，聚焦"跨来源收件箱 + 移动端"。

## 7. 向 CEO 申请的资源（不阻塞，桩先行）

1. 创建仓库 `wookat/attnbox`（我持有 GITHUB_PAT_REPO_CREATE，可代执行，如无异议将直接创建）。
2. Cursor API key、Copilot Business（M2 前提供即可）；可选：Anthropic/OpenAI/Gemini 测试 key 用于端到端联调。
3. `attnbox.zalize.com` DNS（M3 发布时）。
