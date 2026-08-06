import type { AttentionItem, Collector, SessionStatus } from "attnbox-core";

/** Cap on uncached detail lookups per collect cycle; the rest catch up on later cycles. */
export const MAX_DETAIL_FETCHES_PER_CYCLE = 10;

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
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}/sessions?limit=100`, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });
    } catch {
      return [];
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error(`attnbox: devin collector: HTTP ${response.status} — check DEVIN_API_KEY`);
      }
      return [];
    }

    const body = (await response.json()) as { sessions?: DevinSession[] };
    const sessions = body.sessions ?? [];
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
    let fetched = 0;
    await Promise.all(
      waiting.map(async ({ item, session }) => {
        const key = session.session_id;
        const updatedAt = session.updated_at ?? "";
        const cached = this.detailCache.get(key);
        if (cached && cached.updatedAt === updatedAt) {
          if (cached.detail !== undefined) item.detail = cached.detail;
          return;
        }
        if (fetched >= MAX_DETAIL_FETCHES_PER_CYCLE) return;
        fetched++;
        const detail = await this.fetchDetail(key);
        this.detailCache.set(key, { updatedAt, detail });
        if (detail !== undefined) item.detail = detail;
      })
    );
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
