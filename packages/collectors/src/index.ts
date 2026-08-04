export { ClaudeCollector, decodeProjectSlug } from "./claude.js";
export {
  claudeHooksSettingsSnippet,
  defaultHooksDir,
  mapHookEvent,
  readClaudeHookState,
  recordClaudeHookEvent,
  type ClaudeHookInput,
  type ClaudeHookState
} from "./claudeHooks.js";
export { CodexCollector, readRollout } from "./codex.js";
export { DevinCollector, mapStatus } from "./devin.js";
export { GeminiCollector } from "./gemini.js";
export { GithubReviewCollector } from "./github.js";

import { homedir } from "node:os";
import { join } from "node:path";
import type { Collector } from "@attnbox/core";
import { ClaudeCollector } from "./claude.js";
import { CodexCollector } from "./codex.js";
import { DevinCollector } from "./devin.js";
import { GeminiCollector } from "./gemini.js";
import { GithubReviewCollector } from "./github.js";

export interface CollectorOptions {
  home?: string;
  devinApiKey?: string;
  githubToken?: string;
}

/** Default collector set: local log readers always on, cloud collectors only when keys exist. */
export function defaultCollectors(options: CollectorOptions = {}): Collector[] {
  const home = options.home ?? homedir();
  const collectors: Collector[] = [
    new ClaudeCollector(join(home, ".claude", "projects")),
    new CodexCollector(join(home, ".codex", "sessions")),
    new GeminiCollector(join(home, ".gemini"))
  ];
  const devinKey = options.devinApiKey ?? process.env["DEVIN_API_KEY"];
  if (devinKey) collectors.push(new DevinCollector(devinKey));
  const githubToken =
    options.githubToken ?? process.env["ATTNBOX_GITHUB_TOKEN"] ?? process.env["GITHUB_TOKEN"];
  if (githubToken) collectors.push(new GithubReviewCollector(githubToken));
  return collectors;
}
