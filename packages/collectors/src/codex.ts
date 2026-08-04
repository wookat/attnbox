import { readdirSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { capStaleWorking, type AttentionItem, type Collector, type SessionStatus } from "attnbox-core";
import { defaultCodexHooksDir, readCodexNotifyState } from "./codexNotify.js";

/**
 * Read-only collector for Codex CLI sessions.
 *
 * Codex writes one rollout JSONL per session under
 * `~/.codex/sessions/YYYY/MM/DD/rollout-<ts>-<uuid>.jsonl`. Status is derived
 * from `event_msg` lifecycle events:
 *   - last lifecycle event is `task_started` -> working
 *   - an unresolved exec/patch approval request -> waiting (approve)
 *   - `task_complete` -> idle
 *
 * When the Codex `notify` hook is configured, its persisted turn-complete
 * state supersedes the rollout heuristic if fresher.
 */
export class CodexCollector implements Collector {
  readonly name = "codex";

  constructor(
    private readonly sessionsDir: string = join(homedir(), ".codex", "sessions"),
    private readonly hooksDir: string = defaultCodexHooksDir()
  ) {}

  async collect(): Promise<AttentionItem[]> {
    const items: AttentionItem[] = [];
    for (const path of walkJsonl(this.sessionsDir, 4)) {
      const item = readRollout(path);
      if (item) items.push(capStaleWorking(this.applyNotifyState(item)));
    }
    return items;
  }

  private applyNotifyState(item: AttentionItem): AttentionItem {
    const threadId = item.id.slice("codex:".length);
    const hook = readCodexNotifyState(threadId, this.hooksDir);
    if (!hook) return item;
    if (item.lastActivityAt && hook.updatedAt < item.lastActivityAt) return item;
    const next: AttentionItem = {
      ...item,
      status: hook.status,
      confidence: "authoritative",
      lastActivityAt: hook.updatedAt
    };
    delete next.attention;
    return next;
  }
}

interface RolloutLine {
  type?: string;
  timestamp?: string;
  payload?: Record<string, unknown>;
}

export function readRollout(path: string): AttentionItem | null {
  let lines: string[];
  try {
    lines = readFileSync(path, "utf8").split("\n").filter((l) => l.trim() !== "");
  } catch {
    return null;
  }

  let sessionId: string | undefined;
  let cwd: string | undefined;
  let prompt: string | undefined;
  let lastTs: string | undefined;
  let status: SessionStatus = "unknown";
  let pendingApproval = false;

  for (const line of lines) {
    let entry: RolloutLine;
    try {
      entry = JSON.parse(line) as RolloutLine;
    } catch {
      continue;
    }
    if (typeof entry.timestamp === "string") lastTs = entry.timestamp;
    const payload = entry.payload ?? {};

    if (entry.type === "session_meta") {
      if (typeof payload["id"] === "string") sessionId = payload["id"];
      if (typeof payload["cwd"] === "string") cwd = payload["cwd"];
    } else if (entry.type === "event_msg") {
      const kind = payload["type"];
      if (kind === "task_started") {
        status = "working";
        pendingApproval = false;
      } else if (kind === "task_complete") {
        status = "idle";
        pendingApproval = false;
      } else if (kind === "exec_approval_request" || kind === "apply_patch_approval_request") {
        pendingApproval = true;
      } else if (kind === "user_message" && prompt === undefined && typeof payload["message"] === "string") {
        prompt = truncate(payload["message"]);
      }
    }
  }

  if (!sessionId) return null;
  if (pendingApproval) status = "waiting";

  const item: AttentionItem = {
    id: `codex:${sessionId}`,
    agent: "codex",
    location: "local",
    status,
    confidence: "heuristic",
    title: prompt ?? cwd ?? sessionId,
    ...(cwd ? { project: cwd } : {}),
    ...(lastTs ? { lastActivityAt: lastTs } : {})
  };
  if (status === "waiting") item.attention = "approve";
  return item;
}

function truncate(text: string, max = 80): string {
  const t = text.trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

function walkJsonl(dir: string, depth: number): string[] {
  if (depth < 0) return [];
  let names: string[];
  try {
    names = readdirSync(dir, { withFileTypes: true }).map((d) => (d.isDirectory() ? `${d.name}/` : d.name));
  } catch {
    return [];
  }
  const out: string[] = [];
  for (const name of names) {
    if (name.endsWith("/")) {
      out.push(...walkJsonl(join(dir, name.slice(0, -1)), depth - 1));
    } else if (name.endsWith(".jsonl")) {
      out.push(join(dir, name));
    }
  }
  return out;
}
