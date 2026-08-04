export { ClaudeCollector, decodeProjectSlug } from "./claude.js";
export { CodexCollector, readRollout } from "./codex.js";
export { DevinCollector, mapStatus } from "./devin.js";

import { homedir } from "node:os";
import { join } from "node:path";
import type { Collector } from "@attnbox/core";
import { ClaudeCollector } from "./claude.js";
import { CodexCollector } from "./codex.js";
import { DevinCollector } from "./devin.js";

export interface CollectorOptions {
  home?: string;
  devinApiKey?: string;
}

/** Default collector set: local log readers always on, cloud collectors only when keys exist. */
export function defaultCollectors(options: CollectorOptions = {}): Collector[] {
  const home = options.home ?? homedir();
  const collectors: Collector[] = [
    new ClaudeCollector(join(home, ".claude", "projects")),
    new CodexCollector(join(home, ".codex", "sessions"))
  ];
  const devinKey = options.devinApiKey ?? process.env["DEVIN_API_KEY"];
  if (devinKey) collectors.push(new DevinCollector(devinKey));
  return collectors;
}
