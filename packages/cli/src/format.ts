import type { AttentionItem } from "@attnbox/core";

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
  return `${STATUS_ICON[item.status]} ${item.status.padEnd(7)} ${item.agent.padEnd(11)} ${where.padEnd(5)}${attention} ${item.title}`;
}

export function formatList(items: readonly AttentionItem[]): string {
  if (items.length === 0) return "No agent sessions found.";
  return items.map(formatItem).join("\n");
}
