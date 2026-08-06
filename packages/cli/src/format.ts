import type { AttentionItem } from "attnbox-core";

const STATUS_ICON: Record<AttentionItem["status"], string> = {
  waiting: "●",
  working: "◐",
  idle: "○",
  done: "✓",
  unknown: "?"
};

export function formatItem(item: AttentionItem): string {
  const attention = item.attention ? ` [${item.attention}]` : "";
  const where = item.location === "cloud" ? "cloud" : "local";
  let line = `${STATUS_ICON[item.status]} ${item.status.padEnd(7)} ${item.agent.padEnd(11)} ${where.padEnd(5)}${attention} ${item.title}`;
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
