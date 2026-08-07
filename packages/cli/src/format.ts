import type { AttentionItem } from "attnbox-core";

const STATUS_ICON: Record<AttentionItem["status"], string> = {
  waiting: "●",
  working: "◐",
  idle: "○",
  done: "✓",
  unknown: "?"
};

/** Compact relative age, e.g. "5m", "3h", "2d". */
export function formatAge(iso: string, now = Date.now()): string {
  const s = Math.max(0, (now - Date.parse(iso)) / 1000);
  if (s < 60) return `${Math.floor(s)}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export function formatItem(item: AttentionItem): string {
  const attention = item.attention ? ` [${item.attention}]` : "";
  const where = item.location === "cloud" ? "cloud" : "local";
  // how long an item has been waiting is the triage-priority signal
  const age = item.status === "waiting" && item.lastActivityAt ? ` (${formatAge(item.lastActivityAt)})` : "";
  let line = `${STATUS_ICON[item.status]} ${item.status.padEnd(7)} ${item.agent.padEnd(11)} ${where.padEnd(5)}${attention} ${item.title}${age}`;
  if (item.detail) {
    const detail = item.detail.length > 100 ? `${item.detail.slice(0, 99)}…` : item.detail;
    line += `\n  └ ${detail}`;
  }
  if (item.status === "waiting" && item.url) {
    line += `\n  └ ${item.url}`;
    if (item.prUrl) line += `  (PR: ${item.prUrl})`;
  }
  return line;
}

export function formatList(items: readonly AttentionItem[]): string {
  if (items.length === 0) return "No agent sessions found.";
  return items.map(formatItem).join("\n");
}
