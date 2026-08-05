import { describe, expect, it } from "vitest";
import type { AttentionItem } from "attnbox-core";
import { formatItem, formatList } from "./format.js";

const item: AttentionItem = {
  id: "claude-code:1",
  agent: "claude-code",
  location: "local",
  status: "waiting",
  attention: "approve",
  confidence: "heuristic",
  title: "Fix the login bug"
};

describe("formatItem", () => {
  it("renders status, agent, location, attention and title", () => {
    const line = formatItem(item);
    expect(line).toContain("waiting");
    expect(line).toContain("claude-code");
    expect(line).toContain("[approve]");
    expect(line).toContain("Fix the login bug");
  });

  it("renders the agent's question as an indented detail line, truncated", () => {
    const out = formatItem({ ...item, detail: "Should I merge the PR?" });
    expect(out).toContain("\n  └ Should I merge the PR?");
    const long = formatItem({ ...item, detail: "x".repeat(150) });
    expect(long.split("\n")[1]).toHaveLength(104);
    expect(long).toContain("…");
  });
});

describe("formatList", () => {
  it("renders an empty-state message", () => {
    expect(formatList([])).toBe("No agent sessions found.");
  });

  it("renders one line per item", () => {
    expect(formatList([item, { ...item, id: "x", status: "idle" }]).split("\n")).toHaveLength(2);
  });
});
