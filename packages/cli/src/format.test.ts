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
  it("renders the action URL for waiting items, with the PR as a secondary link", () => {
    const out = formatItem({
      ...item,
      url: "https://app.devin.ai/sessions/abc",
      prUrl: "https://github.com/o/r/pull/1"
    });
    expect(out).toContain("\n  └ https://app.devin.ai/sessions/abc  (PR: https://github.com/o/r/pull/1)");
    const noPr = formatItem({ ...item, url: "https://app.devin.ai/sessions/abc" });
    expect(noPr).toContain("\n  └ https://app.devin.ai/sessions/abc");
    expect(noPr).not.toContain("(PR:");
    const notWaiting = formatItem({ ...item, status: "idle", url: "https://x.test/" });
    expect(notWaiting).not.toContain("https://x.test/");
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
