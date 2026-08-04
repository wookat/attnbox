import { readFileSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";
import { capStaleWorking, WORKING_STALE_MS, type AttentionItem, type Collector } from "attnbox-core";

/**
 * Read-only collector for Gemini CLI.
 *
 * Gemini keeps per-project state under `~/.gemini/tmp/<project>/` (session
 * logs and chats) with the project path registered in `~/.gemini/projects.json`.
 * Local files carry no reliable "waiting for user" marker, so this collector
 * honestly reports only working/idle from recent file activity and never
 * claims a waiting state.
 */
export class GeminiCollector implements Collector {
  readonly name = "gemini";

  constructor(private readonly geminiDir: string = join(homedir(), ".gemini")) {}

  async collect(): Promise<AttentionItem[]> {
    const items: AttentionItem[] = [];
    const tmpDir = join(this.geminiDir, "tmp");
    let entries: string[];
    try {
      entries = readdirSync(tmpDir);
    } catch {
      return [];
    }
    const projects = readProjects(join(this.geminiDir, "projects.json"));
    for (const entry of entries) {
      const dir = join(tmpDir, entry);
      const last = latestMtime(dir);
      if (!last) continue;
      const projectPath = projectRoot(dir) ?? projects.get(entry);
      const recent = Date.now() - last.getTime() <= WORKING_STALE_MS;
      const item: AttentionItem = {
        id: `gemini:${entry}`,
        agent: "gemini",
        location: "local",
        status: recent ? "working" : "idle",
        confidence: "heuristic",
        title: projectPath ? basename(projectPath) : entry,
        lastActivityAt: last.toISOString(),
        ...(projectPath ? { project: projectPath } : {})
      };
      items.push(capStaleWorking(item));
    }
    return items;
  }
}

function readProjects(path: string): Map<string, string> {
  const map = new Map<string, string>();
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as { projects?: Record<string, string> };
    for (const [projectPath, name] of Object.entries(parsed.projects ?? {})) {
      map.set(name, projectPath);
    }
  } catch {
    // no registry — fall back to directory names
  }
  return map;
}

function projectRoot(dir: string): string | undefined {
  try {
    return readFileSync(join(dir, ".project_root"), "utf8").trim() || undefined;
  } catch {
    return undefined;
  }
}

function latestMtime(dir: string): Date | undefined {
  let latest: Date | undefined;
  let names: string[];
  try {
    names = readdirSync(dir);
  } catch {
    return undefined;
  }
  for (const name of names) {
    try {
      const stats = statSync(join(dir, name));
      const mtime = stats.isDirectory() ? latestMtime(join(dir, name)) : stats.mtime;
      if (mtime && (!latest || mtime > latest)) latest = mtime;
    } catch {
      // skip unreadable entries
    }
  }
  return latest;
}
