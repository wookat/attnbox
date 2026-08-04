export type AgentKind = "claude-code" | "codex" | "gemini" | "devin" | "cursor" | "copilot" | "github-pr" | "demo";

export type AgentLocation = "local" | "cloud";

export type SessionStatus = "waiting" | "working" | "idle" | "done" | "unknown";

/** What the agent is waiting on the human for. */
export type AttentionKind = "approve" | "answer" | "review" | "unblock";

/** How trustworthy the status signal is for this source. */
export type Confidence = "authoritative" | "heuristic";

export interface AttentionItem {
  /** Stable id: `<agent>:<sessionId>` */
  id: string;
  agent: AgentKind;
  location: AgentLocation;
  status: SessionStatus;
  /** Set only when status === "waiting". */
  attention?: AttentionKind;
  confidence: Confidence;
  title: string;
  /** Project directory or repository the session works in, if known. */
  project?: string;
  /** ISO timestamp of the last observed activity. */
  lastActivityAt?: string;
  /** Deep link to act on the item (console URL, PR URL, ...). */
  url?: string;
}

export interface Collector {
  readonly name: string;
  collect(): Promise<AttentionItem[]>;
}

const STATUS_RANK: Record<SessionStatus, number> = {
  waiting: 0,
  working: 1,
  idle: 2,
  done: 3,
  unknown: 4
};

/** Waiting first, then working, then most-recent activity. */
export function sortItems(items: readonly AttentionItem[]): AttentionItem[] {
  return [...items].sort((a, b) => {
    const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
    if (rank !== 0) return rank;
    const ta = a.lastActivityAt ?? "";
    const tb = b.lastActivityAt ?? "";
    return tb.localeCompare(ta);
  });
}

export interface InboxSummary {
  total: number;
  waiting: number;
  working: number;
}

export function summarize(items: readonly AttentionItem[]): InboxSummary {
  return {
    total: items.length,
    waiting: items.filter((i) => i.status === "waiting").length,
    working: items.filter((i) => i.status === "working").length
  };
}

/** A session with no activity beyond this window is capped from working to idle. */
export const WORKING_STALE_MS = 5 * 60 * 1000;

export function capStaleWorking(item: AttentionItem, now: Date = new Date()): AttentionItem {
  if (item.status !== "working" || !item.lastActivityAt) return item;
  const age = now.getTime() - new Date(item.lastActivityAt).getTime();
  if (age <= WORKING_STALE_MS) return item;
  return { ...item, status: "idle" };
}
