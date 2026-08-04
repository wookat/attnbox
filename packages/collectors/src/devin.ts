import type { AttentionItem, Collector, SessionStatus } from "attnbox-core";

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
    if (!response.ok) return [];

    const body = (await response.json()) as { sessions?: DevinSession[] };
    return (body.sessions ?? []).map((s) => toItem(s));
  }
}

interface DevinSession {
  session_id: string;
  title?: string;
  status_enum?: string;
  updated_at?: string;
  pull_request?: { url?: string } | null;
}

function toItem(session: DevinSession): AttentionItem {
  const status = mapStatus(session.status_enum);
  const url = session.pull_request?.url ?? sessionUrl(session.session_id);
  const item: AttentionItem = {
    id: `devin:${session.session_id}`,
    agent: "devin",
    location: "cloud",
    status,
    confidence: "authoritative",
    title: session.title ?? session.session_id,
    url,
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

function sessionUrl(sessionId: string): string {
  return `https://app.devin.ai/sessions/${sessionId.replace(/^devin-/, "")}`;
}
