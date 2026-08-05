import { readdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { capStaleWorking, type AttentionItem, type Collector, type SessionStatus } from "attnbox-core";
import { defaultHooksDir, readClaudeHookState } from "./claudeHooks.js";

/**
 * Read-only collector for Claude Code sessions.
 *
 * Claude Code writes one JSONL transcript per session under
 * `~/.claude/projects/<path-slug>/<sessionId>.jsonl`. The status is derived
 * from the transcript tail (heuristic), unless a fresher hook-recorded state
 * exists (authoritative mode — see claudeHooks.ts). Transcript heuristics:
 *   - last entry is an assistant message containing an unresolved `tool_use`
 *     -> waiting (approve)
 *   - last entry is a user/attachment entry -> working
 *   - last entry is an assistant text message -> idle
 */
export class ClaudeCollector implements Collector {
  readonly name = "claude-code";

  constructor(
    private readonly projectsDir: string = join(homedir(), ".claude", "projects"),
    private readonly hooksDir: string = defaultHooksDir()
  ) {}

  async collect(): Promise<AttentionItem[]> {
    const items: AttentionItem[] = [];
    for (const projectSlug of safeReaddir(this.projectsDir)) {
      const projectDir = join(this.projectsDir, projectSlug);
      for (const file of safeReaddir(projectDir)) {
        if (!file.endsWith(".jsonl")) continue;
        const item = this.readSession(join(projectDir, file), projectSlug, file.replace(/\.jsonl$/, ""));
        if (item) items.push(capStaleWorking(item));
      }
    }
    return items;
  }

  private readSession(path: string, projectSlug: string, sessionId: string): AttentionItem | null {
    let lines: string[];
    try {
      lines = readFileSync(path, "utf8").split("\n").filter((l) => l.trim() !== "");
    } catch {
      return null;
    }
    if (lines.length === 0) return null;

    const entries = lines.flatMap((line): TranscriptEntry[] => {
      try {
        return [JSON.parse(line) as TranscriptEntry];
      } catch {
        return [];
      }
    });
    const meaningful = entries.filter((e) => e.type === "user" || e.type === "assistant");
    const last = meaningful.at(-1);
    const { status, prompt } = deriveStatus(last, meaningful);

    const lastActivityAt = lastTimestamp(entries) ?? mtimeIso(path);
    const project = decodeProjectSlug(projectSlug);

    const item: AttentionItem = {
      id: `claude-code:${sessionId}`,
      agent: "claude-code",
      location: "local",
      status,
      confidence: "heuristic",
      title: prompt ?? project,
      project,
      ...(lastActivityAt ? { lastActivityAt } : {})
    };
    if (status === "waiting") item.attention = "approve";
    const resolved = this.applyHookState(item, sessionId);
    if (resolved.status === "waiting") {
      const detail = lastAssistantText(meaningful);
      if (detail !== undefined) resolved.detail = detail;
    }
    return resolved;
  }

  private applyHookState(item: AttentionItem, sessionId: string): AttentionItem {
    const hook = readClaudeHookState(sessionId, this.hooksDir);
    if (!hook) return item;
    if (item.lastActivityAt && hook.updatedAt < item.lastActivityAt) return item;
    const next: AttentionItem = {
      ...item,
      status: hook.status,
      confidence: "authoritative",
      lastActivityAt: hook.updatedAt
    };
    delete next.attention;
    if (hook.attention) next.attention = hook.attention;
    return next;
  }
}

interface TranscriptEntry {
  type?: string;
  timestamp?: string;
  message?: {
    role?: string;
    content?: unknown;
  };
}

function deriveStatus(
  last: TranscriptEntry | undefined,
  all: readonly TranscriptEntry[]
): { status: SessionStatus; prompt?: string } {
  const prompt = firstUserPrompt(all);
  if (!last) return prompt === undefined ? { status: "unknown" } : { status: "unknown", prompt };
  let status: SessionStatus;
  if (last.type === "user") {
    status = "working";
  } else if (last.type === "assistant") {
    status = hasToolUse(last) ? "waiting" : "idle";
  } else {
    status = "unknown";
  }
  return prompt === undefined ? { status } : { status, prompt };
}

function hasToolUse(entry: TranscriptEntry): boolean {
  const content = entry.message?.content;
  if (!Array.isArray(content)) return false;
  return content.some((block) => isRecord(block) && block["type"] === "tool_use");
}

function firstUserPrompt(entries: readonly TranscriptEntry[]): string | undefined {
  for (const entry of entries) {
    if (entry.type !== "user") continue;
    const content = entry.message?.content;
    if (typeof content === "string" && content.trim() !== "") return truncate(content.trim());
    if (Array.isArray(content)) {
      for (const block of content) {
        if (isRecord(block) && block["type"] === "text" && typeof block["text"] === "string") {
          return truncate(block["text"].trim());
        }
      }
    }
  }
  return undefined;
}

function lastAssistantText(entries: readonly TranscriptEntry[]): string | undefined {
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i];
    if (entry?.type !== "assistant") continue;
    const content = entry.message?.content;
    if (typeof content === "string" && content.trim() !== "") return truncate(collapse(content), 280);
    if (Array.isArray(content)) {
      for (const block of content) {
        if (isRecord(block) && block["type"] === "text" && typeof block["text"] === "string" && block["text"].trim() !== "") {
          return truncate(collapse(block["text"]), 280);
        }
      }
    }
  }
  return undefined;
}

function collapse(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function lastTimestamp(entries: readonly TranscriptEntry[]): string | undefined {
  for (let i = entries.length - 1; i >= 0; i--) {
    const ts = entries[i]?.timestamp;
    if (typeof ts === "string") return ts;
  }
  return undefined;
}

/** `-home-ubuntu-repos-app` -> `/home/ubuntu/repos/app` (lossy for dirs with dashes; display only). */
export function decodeProjectSlug(slug: string): string {
  return slug.replace(/-/g, "/");
}

function truncate(text: string, max = 80): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function safeReaddir(dir: string): string[] {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

function mtimeIso(path: string): string | undefined {
  try {
    return statSync(path).mtime.toISOString();
  } catch {
    return undefined;
  }
}
