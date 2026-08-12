import type { AttentionItem, Collector, SessionStatus } from "attnbox-core";

/** Uncached detail lookups run in sequential batches of this many parallel requests. */
export const DETAIL_FETCH_BATCH = 10;

const PAGE_SIZE = 100;
/** Deep pages are crawled in parallel batches of this many round-trips. */
const BATCH_PAGES = 10;
/** Hard safety cap on session pagination (≤ 10,000 sessions). */
export const MAX_SESSION_PAGES = 100;
/** Deep pages change rarely; re-crawl them at most this often to keep API traffic bounded. */
export const DEEP_REFRESH_MS = 30_000;

/**
 * Cloud collector for Devin sessions via the public API
 * (`GET https://api.devin.ai/v1/sessions`). `status_enum === "blocked"`
 * means the session is waiting on the user — an authoritative signal.
 *
 * Enabled only when a `DEVIN_API_KEY` is configured; the key never leaves
 * this machine except toward api.devin.ai.
 */
export class DevinCollector implements Collector {
  readonly name = "devin";
  private readonly detailCache = new Map<string, { updatedAt: string; detail: string | undefined }>();

  constructor(
    private readonly apiKey: string,
    private readonly baseUrl: string = "https://api.devin.ai/v1",
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  async collect(): Promise<AttentionItem[]> {
    const first = await this.fetchPage(0);
    if (first === undefined) return [];
    if (first.length < PAGE_SIZE) {
      this.deepCache = undefined;
      return this.finish(first);
    }
    // the first page is full, so older sessions live on deeper pages;
    // those change rarely — reuse the last deep crawl while it's fresh
    if (this.deepCache && Date.now() - this.deepCache.fetchedAt < DEEP_REFRESH_MS) {
      return this.finish(dedupe([...first, ...this.deepCache.sessions]));
    }
    // a full first page means the org has a deep backlog: crawl the remaining pages in
    // parallel batches until the first short or failed page — a blocked session anywhere
    // in the backlog is still waiting on the user, so the crawl must reach the end
    // (deep crawls only happen for 100+ session orgs, and at most every 30 s)
    const deep: DevinSession[] = [];
    let page = 1;
    let exhausted = false;
    let failed = false;
    while (!exhausted && page < MAX_SESSION_PAGES) {
      const count = Math.min(BATCH_PAGES, MAX_SESSION_PAGES - page);
      const batch = await Promise.all(
        Array.from({ length: count }, (_, i) => this.fetchPage((page + i) * PAGE_SIZE))
      );
      for (const pageSessions of batch) {
        if (pageSessions === undefined || pageSessions.length < PAGE_SIZE) exhausted = true;
        if (pageSessions === undefined) {
          failed = true;
          break;
        }
        deep.push(...pageSessions);
        if (pageSessions.length < PAGE_SIZE) break;
      }
      page += count;
    }
    if (failed && this.deepCache) {
      // a failed page truncates the backlog for this pass; the deep pages change
      // rarely, so the last complete crawl is a better answer than a partial one —
      // keep it (and its timestamp) so the next cycle retries the crawl
      return this.finish(dedupe([...first, ...deep, ...this.deepCache.sessions]));
    }
    if (!failed) this.deepCache = { sessions: deep, fetchedAt: Date.now() };
    return this.finish(dedupe([...first, ...deep]));
  }

  private deepCache: { sessions: DevinSession[]; fetchedAt: number } | undefined;

  private async fetchPage(offset: number): Promise<DevinSession[] | undefined> {
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}/sessions?limit=${PAGE_SIZE}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });
    } catch {
      return undefined;
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error(`attnbox: devin collector: HTTP ${response.status} — check DEVIN_API_KEY`);
      }
      return undefined;
    }
    const body = (await response.json()) as { sessions?: DevinSession[] };
    return body.sessions ?? [];
  }

  private async finish(sessions: DevinSession[]): Promise<AttentionItem[]> {
    const items = sessions.map((s) => toItem(s));
    await this.attachDetails(sessions, items);
    return items;
  }

  /** For waiting sessions, fetch what Devin is actually asking (cached by updated_at). */
  private async attachDetails(sessions: DevinSession[], items: AttentionItem[]): Promise<void> {
    const waiting = items
      .map((item, i) => ({ item, session: sessions[i] }))
      .filter((x): x is { item: AttentionItem; session: DevinSession } => x.item.status === "waiting" && x.session !== undefined);
    for (const id of [...this.detailCache.keys()]) {
      if (!waiting.some((w) => w.session.session_id === id)) this.detailCache.delete(id);
    }
    const uncached: { item: AttentionItem; session: DevinSession }[] = [];
    for (const entry of waiting) {
      const cached = this.detailCache.get(entry.session.session_id);
      if (cached && cached.updatedAt === (entry.session.updated_at ?? "")) {
        if (cached.detail !== undefined) entry.item.detail = cached.detail;
      } else {
        uncached.push(entry);
      }
    }
    // fetch every missing detail (one-shot `ls` has no later cycle to catch up in),
    // but keep the request burst bounded by batching
    for (let i = 0; i < uncached.length; i += DETAIL_FETCH_BATCH) {
      await Promise.all(
        uncached.slice(i, i + DETAIL_FETCH_BATCH).map(async ({ item, session }) => {
          const key = session.session_id;
          const detail = await this.fetchDetail(key);
          this.detailCache.set(key, { updatedAt: session.updated_at ?? "", detail });
          if (detail !== undefined) item.detail = detail;
        })
      );
    }
  }

  private async fetchDetail(sessionId: string): Promise<string | undefined> {
    try {
      const res = await this.fetchImpl(`${this.baseUrl}/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });
      if (!res.ok) return undefined;
      const body = (await res.json()) as { messages?: { type?: string; message?: string }[] };
      const last = (body.messages ?? []).filter((m) => m.type === "devin_message" && typeof m.message === "string").pop();
      if (!last?.message) return undefined;
      const text = last.message.replace(/\s+/g, " ").trim();
      return text.length > 280 ? `${text.slice(0, 279)}…` : text;
    } catch {
      return undefined;
    }
  }
}

function dedupe(sessions: DevinSession[]): DevinSession[] {
  const seen = new Set<string>();
  return sessions.filter((s) => (seen.has(s.session_id) ? false : (seen.add(s.session_id), true)));
}

interface DevinSession {
  session_id: string;
  title?: string;
  status_enum?: string | null;
  status?: string;
  updated_at?: string;
  pull_request?: { url?: string } | null;
}

function toItem(session: DevinSession): AttentionItem {
  const status = mapStatus(session.status_enum ?? session.status);
  // a waiting session needs its answer in the session itself, not on the PR
  const url = status === "waiting" ? sessionUrl(session.session_id) : (session.pull_request?.url ?? sessionUrl(session.session_id));
  const project = projectFromPrUrl(session.pull_request?.url ?? undefined);
  const item: AttentionItem = {
    id: `devin:${session.session_id}`,
    agent: "devin",
    location: "cloud",
    status,
    confidence: "authoritative",
    title: session.title ?? session.session_id,
    url,
    ...(session.pull_request?.url && session.pull_request.url !== url ? { prUrl: session.pull_request.url } : {}),
    ...(project ? { project } : {}),
    ...(session.updated_at ? { lastActivityAt: session.updated_at } : {})
  };
  if (status === "waiting") item.attention = "answer";
  return item;
}

export function mapStatus(statusEnum: string | undefined): SessionStatus {
  switch (statusEnum) {
    case "blocked":
      return "waiting";
    case "working":
    case "running":
      return "working";
    case "finished":
    case "expired":
      return "done";
    case "suspend_requested":
    case "suspend_requested_frontend":
    case "resumed":
      return "idle";
    default:
      return "unknown";
  }
}

export function projectFromPrUrl(url?: string): string | undefined {
  const match = url?.match(/^https?:\/\/[^/]+\/([^/]+\/[^/]+)\/(?:pull|merge_requests)\//);
  return match?.[1];
}

function sessionUrl(sessionId: string): string {
  return `https://app.devin.ai/sessions/${sessionId.replace(/^devin-/, "")}`;
}

export interface SendResult {
  ok: boolean;
  status?: number;
  error?: string;
}

/** Send a user message to a Devin session (act-in-place for blocked sessions). */
export async function sendDevinMessage(
  apiKey: string,
  sessionId: string,
  message: string,
  baseUrl = "https://api.devin.ai/v1",
  fetchImpl: typeof fetch = fetch
): Promise<SendResult> {
  if (!/^[\w-]+$/.test(sessionId)) return { ok: false, error: "invalid session id" };
  if (message.trim() === "") return { ok: false, error: "empty message" };
  try {
    const res = await fetchImpl(`${baseUrl}/session/${sessionId}/message`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });
    return res.ok ? { ok: true, status: res.status } : { ok: false, status: res.status, error: `HTTP ${res.status}` };
  } catch {
    return { ok: false, error: "network error" };
  }
}
