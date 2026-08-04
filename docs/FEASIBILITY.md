# 数据源可行性核验（2026-08-04 实测）

> 原则：诚实记录。✅=本机实测；🟡=文档核验（未实测）；❌=不可行/受限。

## 一、本地 CLI agent（只读文件采集）

### 1. Claude Code ✅（实测）

本机安装 `@anthropic-ai/claude-code` 并运行后生成：

- `~/.claude/projects/<路径slug>/<sessionId>.jsonl` — 会话转录，逐行 JSON，`type` 有 `user` / `assistant` / `attachment` / `queue-operation` / `last-prompt` 等，含 `sessionId`、`cwd`、`timestamp`、`parentUuid`。
- `~/.claude/history.jsonl` — 每次提交 prompt 一条 `{project, sessionId, timestamp}`（会话↔目录映射）。
- `~/.claude.json` — `projects` 键按目录存全局状态。

**"等待用户"判定**：
- 纯日志侧（被动）：转录尾部出现未被 resolve 的 `tool_use`（权限等待）、或 assistant 停止输出且最后为提问 → ccmux 的 status-machine 已验证此推导可行，但有陈旧态问题（需 idle 阈值兜底）。
- Hooks 侧（权威、可选安装）：Claude Code 官方 hooks `Notification`（含 `permission_prompt`/`idle_prompt` 类型）、`Stop`、`PreToolUse`。navi/claude-watch/ccmux 均用此法。**结论：waiting/working/idle 三态可判，attention 细类（审批 vs 提问）hooks 下可判。**

### 2. Codex CLI ✅（实测）

本机运行 `codex exec` 后生成 `~/.codex/sessions/YYYY/MM/DD/rollout-<ts>-<uuid>.jsonl`：
- 行类型：`session_meta`（session_id、cwd、originator）、`turn_context`、`response_item`（消息/工具调用）、`event_msg`（`task_started` / `task_complete` / `user_message`，`task_complete` 携带 error）。
- 另有 `~/.codex/state_*.sqlite`、`logs_*.sqlite`（未依赖）。

**"等待用户"判定**：`event_msg` 的 task 生命周期 + 未决 `exec_approval`/`apply_patch_approval` 请求项可判"待审批"（ccmux codex adapter 已验证同思路）。Codex ≥0.146 有 auto-approval reviewer 干扰项，需按 originator 过滤。**结论：可行。**

### 3. Gemini CLI 🟡（部分实测）

本机运行（无 Google 凭证）生成 `~/.gemini/projects.json`（目录→项目名映射）、`~/.gemini/tmp/<project>/`、`~/.gemini/history/<project>/`；带凭证后会在 `~/.gemini/tmp/<hash>/chats/` 写会话 JSON（文档与 ccmux 支持列表佐证）。**结论：会话发现可行；"等待输入"细粒度信号弱于 Claude/Codex，M1 按 working/idle 两态 + 尾部提问启发式，诚实标注置信度。**

### 4. 其他本地（Cursor CLI / OpenCode / Copilot CLI）🟡

ccmux 已有对应 adapter（`src/daemon/adapters/{cursor,opencode,copilot}`），格式同为本地日志，纳入 M2。

## 二、云端 agent（公开 API）

### 1. Devin API ✅（实测，本机 curl 验证）

`GET https://api.devin.ai/v1/sessions`（Bearer key）→ 200，返回字段含 `status_enum`（实测见 `working`；文档含 `blocked` = 等待用户输入）、`title`、`pull_request`、`structured_output`。会话详情/消息接口可拿"在等什么"。**结论：完全可行，"blocked 会话列表"即注意力项。**

### 2. Cursor Cloud Agents API 🟡（官方文档核验）

`https://cursor.com/docs/cloud-agent/api/endpoints`：v1 公开 beta，`GET /v1/agents`（列出 agent）、`GET /v1/agents/{id}`、runs 携带执行状态；v0 有 webhooks（v1 webhooks "coming soon"）。API key 从 Cursor Dashboard 生成。**结论：可行（轮询为主，v0 webhook 可选）。未实测：无 Cursor 账号 key，立项后向 CEO 申请。**

### 3. GitHub Copilot coding agent ✅/🟡（官方 REST 文档核验）

`GET /agents/repos/{owner}/{repo}/tasks`：task `state` 枚举明确含 **`waiting_for_user`**、`in_progress`、`completed`、`failed` 等，天然匹配注意力语义；需 Copilot Business/Enterprise。另外通用信号：请求本人 review 的 PR（`gh search prs --review-requested=@me`）覆盖所有"agent 交 PR 等你审"场景。**结论：API 可行；订阅门槛如实标注，PR-review 信号作为无订阅兜底。**

### 4. Jules（Google）🟡

有公开 API（jules.google/docs，sessions 带 state，含等待输入语义），M2 验证后接入。

### 5. 通用兜底 ✅

GitHub 通知/review-requested PR 列表（任何云 agent 最终都落到 PR），用用户自己的 PAT 只读拉取。**可行。**

## 三、结论矩阵

| 数据源 | 会话发现 | "等我"判定 | 等待细类 | 状态 |
|---|---|---|---|---|
| Claude Code | ✅ 日志 | ✅ 日志+hooks | ✅ hooks | M1 |
| Codex CLI | ✅ 日志 | ✅ 日志 | ✅ 审批项 | M1 |
| Gemini CLI | ✅ 日志 | 🟡 启发式 | ❌ | M1（降级标注） |
| Devin | ✅ API（实测 200） | ✅ status_enum=blocked | ✅ 消息 | M1 |
| Cursor Cloud | 🟡 API 文档 | 🟡 run status | 🟡 | M2（需 key） |
| Copilot coding agent | 🟡 API 文档 | ✅ waiting_for_user | 🟡 | M2（需订阅） |
| GitHub review-requested | ✅ | ✅ | ✅=review | M1 兜底 |

## 四、需要 CEO 提供的资源（不阻塞，先桩后换）

- Cursor API key（Dashboard→API Keys）；GitHub Copilot Business 订阅（或接受仅 PR 兜底）；测试用 Anthropic/OpenAI/Gemini key（本地 agent 端到端联调，可选）。
