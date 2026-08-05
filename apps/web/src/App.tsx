import { useEffect, useMemo, useRef, useState } from "react";
import type { AttentionItem, InboxSummary } from "attnbox-core";

interface Payload {
  items: AttentionItem[];
  summary: InboxSummary;
  acked?: Record<string, string>;
}

type Filter = "all" | "waiting" | "working" | "done";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "waiting", label: "Needs you" },
  { key: "working", label: "Working" },
  { key: "done", label: "Done" }
];

const STATUS_STYLE: Record<AttentionItem["status"], { dot: string; label: string }> = {
  waiting: { dot: "bg-amber-400 animate-pulse", label: "text-amber-300" },
  working: { dot: "bg-emerald-400", label: "text-emerald-300" },
  idle: { dot: "bg-zinc-500", label: "text-zinc-400" },
  done: { dot: "bg-sky-500", label: "text-sky-400" },
  unknown: { dot: "bg-zinc-700", label: "text-zinc-500" }
};

const AGENT_STYLE: Record<string, string> = {
  "claude-code": "bg-orange-500/15 text-orange-300 border-orange-500/20",
  codex: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  gemini: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  devin: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "github-pr": "bg-zinc-500/15 text-zinc-300 border-zinc-500/20"
};

const ATTENTION_LABEL: Record<NonNullable<AttentionItem["attention"]>, string> = {
  approve: "needs approval",
  answer: "has a question",
  review: "review requested",
  unblock: "blocked on you"
};

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${Math.floor(s)}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function matches(item: AttentionItem, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "done") return item.status === "done" || item.status === "idle";
  return item.status === filter;
}

function matchesQuery(item: AttentionItem, query: string): boolean {
  if (query === "") return true;
  const q = query.toLowerCase();
  return [item.title, item.project ?? "", item.agent].some((f) => f.toLowerCase().includes(q));
}

function notificationsSupported(): boolean {
  return typeof Notification !== "undefined";
}

export default function App() {
  const [data, setData] = useState<Payload>({ items: [], summary: { total: 0, waiting: 0, working: 0 } });
  const [connected, setConnected] = useState(false);
  const everConnected = useRef(false);
  const [filter, setFilter] = useState<Filter>(() => {
    const saved = localStorage.getItem("attnbox:filter");
    return FILTERS.some((f) => f.key === saved) ? (saved as Filter) : "all";
  });
  const [notify, setNotify] = useState(
    () => notificationsSupported() && Notification.permission === "granted" && localStorage.getItem("attnbox:notify") !== "off"
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [acked, setAcked] = useState<Record<string, string>>(() => {
    try {
      // migration fallback: pre-daemon-persistence state lived in this browser only
      return JSON.parse(localStorage.getItem("attnbox:acked") ?? "{}") as Record<string, string>;
    } catch {
      return {};
    }
  });
  const [grouped, setGrouped] = useState(() => localStorage.getItem("attnbox:group") === "on");
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const searchRef = useRef<HTMLInputElement>(null);
  const seenWaiting = useRef<Set<string> | null>(null);

  useEffect(() => {
    const waitingIds = new Set(data.items.filter((i) => i.status === "waiting").map((i) => i.id));
    const prev = seenWaiting.current;
    seenWaiting.current = waitingIds;
    if (!prev || !notify || Notification.permission !== "granted") return;
    for (const item of data.items) {
      if (item.status !== "waiting" || prev.has(item.id) || isAcked(item)) continue;
      const label = item.attention ? ATTENTION_LABEL[item.attention] : "needs you";
      const n = new Notification(`${item.agent}: ${label}`, { body: item.title, icon: "/icon-192.png", tag: item.id });
      if (item.url) n.onclick = () => window.open(item.url, "_blank");
    }
  }, [data.items, notify]);

  async function toggleNotify(): Promise<void> {
    if (!notificationsSupported()) return;
    if (notify) {
      localStorage.setItem("attnbox:notify", "off");
      setNotify(false);
      return;
    }
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem("attnbox:notify", "on");
      setNotify(true);
    }
  }

  useEffect(() => {
    localStorage.setItem("attnbox:filter", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("attnbox:acked", JSON.stringify(acked));
  }, [acked]);

  useEffect(() => {
    if (data.acked) setAcked(data.acked);
  }, [data.acked]);

  useEffect(() => {
    localStorage.setItem("attnbox:group", grouped ? "on" : "off");
  }, [grouped]);

  function isAcked(item: AttentionItem): boolean {
    const at = acked[item.id];
    if (!at) return false;
    return !item.lastActivityAt || item.lastActivityAt <= at;
  }

  function toggleAck(item: AttentionItem): void {
    const at = isAcked(item) ? null : (item.lastActivityAt ?? new Date().toISOString());
    setAcked((prev) => {
      const next = { ...prev };
      if (at === null) delete next[item.id];
      else next[item.id] = at;
      return next;
    });
    void fetch("/api/ack", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: item.id, at })
    }).catch(() => {
      // daemon unreachable — the optimistic local state still applies in this tab
    });
  }

  const unackedWaiting = data.items.filter((i) => i.status === "waiting" && !isAcked(i)).length;

  useEffect(() => {
    document.title = unackedWaiting > 0 ? `(${unackedWaiting}) attnbox` : "attnbox — agent attention inbox";
  }, [unackedWaiting]);

  useEffect(() => {
    const source = new EventSource("/api/events");
    source.onopen = () => {
      everConnected.current = true;
      setConnected(true);
    };
    source.onerror = () => setConnected(false);
    source.onmessage = (e) => setData(JSON.parse(e.data as string) as Payload);
    return () => source.close();
  }, []);

  const visible = useMemo(
    () => data.items.filter((i) => matches(i, filter) && matchesQuery(i, query)),
    [data.items, filter, query]
  );
  const waiting = visible.filter((i) => i.status === "waiting" && !isAcked(i));
  const rest = visible.filter((i) => i.status !== "waiting" || isAcked(i));
  const ordered = useMemo(() => [...waiting, ...rest], [visible, acked]);
  const groups = useMemo(() => {
    const map = new Map<string, AttentionItem[]>();
    for (const item of rest) {
      const key = item.project ?? `(${item.agent})`;
      const list = map.get(key);
      if (list) list.push(item);
      else map.set(key, [item]);
    }
    return [...map.entries()];
  }, [visible, acked]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) return;
      if (e.target instanceof HTMLInputElement) {
        if (e.key === "Escape") {
          setQuery("");
          e.target.blur();
        }
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        setQuery("");
        setSelectedId(null);
        return;
      }
      const isDown = e.key === "j" || e.key === "ArrowDown";
      const isUp = e.key === "k" || e.key === "ArrowUp";
      if (isDown || isUp) {
        e.preventDefault();
        setSelectedId((prev) => {
          if (ordered.length === 0) return null;
          const idx = ordered.findIndex((i) => i.id === prev);
          const nextIdx =
            idx < 0 ? (isDown ? 0 : ordered.length - 1) : Math.min(Math.max(idx + (isDown ? 1 : -1), 0), ordered.length - 1);
          const id = ordered[nextIdx]!.id;
          document.getElementById(`item-${id}`)?.scrollIntoView({ block: "nearest" });
          return id;
        });
        return;
      }
      if (e.key === "Enter" && selectedId) {
        const item = ordered.find((i) => i.id === selectedId);
        if (item?.url) window.open(item.url, "_blank");
        return;
      }
      if (e.key === "e" && selectedId) {
        const item = ordered.find((i) => i.id === selectedId);
        if (item?.status === "waiting") toggleAck(item);
        return;
      }
      if (e.key === "r" && selectedId) {
        const item = ordered.find((i) => i.id === selectedId);
        if (item && canReply(item)) {
          e.preventDefault();
          setReplyingId((prev) => (prev === item.id ? null : item.id));
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ordered, selectedId, acked]);

  function rowProps(item: AttentionItem) {
    return {
      selected: item.id === selectedId,
      dimmed: isAcked(item),
      onAck: item.status === "waiting" ? () => toggleAck(item) : undefined,
      replying: replyingId === item.id,
      onReplyToggle: canReply(item)
        ? () => setReplyingId((prev) => (prev === item.id ? null : item.id))
        : undefined,
      onReplied: () => {
        if (!isAcked(item)) toggleAck(item);
      }
    };
  }

  return (
    <div className="min-h-dvh pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-zinc-950">
              @
            </span>
            <div>
              <h1 className="text-base font-semibold leading-tight tracking-tight">attnbox</h1>
              <p className="text-[11px] leading-tight text-zinc-500">agent attention inbox</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {notificationsSupported() && (
              <button
                onClick={() => void toggleNotify()}
                title={notify ? "Notifications on — click to mute" : "Notify me when an agent needs me"}
                aria-pressed={notify}
                className={`grid size-8 place-items-center rounded-full border text-sm transition-colors ${
                  notify
                    ? "border-amber-700 bg-amber-500/10 text-amber-300"
                    : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {notify ? "🔔" : "🔕"}
              </button>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
                connected ? "border-emerald-800 text-emerald-300" : "border-zinc-700 text-zinc-500"
              }`}
            >
              <span className={`size-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-zinc-600"}`} />
              {connected ? "live" : "offline"}
            </span>
          </div>
        </div>
      </header>

      {!connected && everConnected.current && (
        <div className="border-b border-amber-900/50 bg-amber-950/40 px-4 py-2 text-center text-xs text-amber-300">
          Connection to the attnbox daemon lost — showing the last known state, reconnecting…
        </div>
      )}

      <main className="mx-auto max-w-3xl px-4 py-5 sm:py-8">
        <section className="mb-5">
          <p className="text-lg font-medium sm:text-xl">
            {unackedWaiting > 0 ? (
              <>
                <span className="text-amber-300">{unackedWaiting}</span> agent
                {unackedWaiting > 1 ? "s are" : " is"} waiting on you
              </>
            ) : (
              <span className="text-zinc-300">No one is waiting on you 🎉</span>
            )}
          </p>
          <p className="text-sm text-zinc-500">
            {data.summary.working} working · {data.summary.total} sessions tracked
          </p>
        </section>

        <div className="mb-3">
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, project, agent…  ( / )"
            aria-label="Search sessions"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>

        <nav className="mb-5 flex gap-1 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
                filter === key ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {label}
              {key === "waiting" && unackedWaiting > 0 && (
                <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 text-[11px] text-amber-300">
                  {unackedWaiting}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setGrouped((g) => !g)}
            aria-pressed={grouped}
            title="Group by project"
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
              grouped ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            ⊞
          </button>
        </nav>

        {waiting.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-400">Needs you</h2>
            <ul className="space-y-2">
              {waiting.map((item) => (
                <ItemRow key={item.id} item={item} highlight {...rowProps(item)} />
              ))}
            </ul>
          </section>
        )}

        <section>
          {waiting.length > 0 && rest.length > 0 && (
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">Everything else</h2>
          )}
          {visible.length === 0 ? (
            data.items.length === 0 && filter === "all" && query === "" ? (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-8">
                <p className="text-center text-2xl">📭</p>
                <p className="mt-2 text-center text-sm text-zinc-300">No agent sessions found yet</p>
                <ul className="mx-auto mt-4 max-w-md space-y-2 text-xs text-zinc-400">
                  <li>
                    <span className="text-zinc-200">Local agents</span> — start a Claude Code, Codex CLI or Gemini
                    CLI session; it appears here automatically.
                  </li>
                  <li>
                    <span className="text-zinc-200">Cloud agents</span> — restart with{" "}
                    <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">DEVIN_API_KEY=… npx attnbox</code>{" "}
                    or <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">GITHUB_TOKEN=…</code> for PRs
                    awaiting your review.
                  </li>
                  <li>
                    <span className="text-zinc-200">Diagnose</span> — run{" "}
                    <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">npx attnbox doctor</code> to see
                    which collectors are active, and{" "}
                    <code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">npx attnbox hooks --install</code>{" "}
                    for authoritative status.
                  </li>
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-800 p-10 text-center">
                <p className="text-2xl">📭</p>
                <p className="mt-2 text-sm text-zinc-400">Nothing here</p>
                <p className="mt-1 text-xs text-zinc-600">
                  {query !== "" ? "No sessions match this search." : "No sessions match this filter."}
                </p>
              </div>
            )
          ) : grouped ? (
            <div className="space-y-4">
              {groups.map(([name, items]) => (
                <div key={name}>
                  <button
                    onClick={() =>
                      setCollapsed((prev) => {
                        const next = new Set(prev);
                        if (next.has(name)) next.delete(name);
                        else next.add(name);
                        return next;
                      })
                    }
                    className="mb-2 flex w-full items-center gap-1.5 text-left text-xs font-medium text-zinc-400 hover:text-zinc-200"
                  >
                    <span className="text-[10px]">{collapsed.has(name) ? "▸" : "▾"}</span>
                    <span className="truncate">{name}</span>
                    <span className="text-zinc-600">{items.length}</span>
                  </button>
                  {!collapsed.has(name) && (
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <ItemRow key={item.id} item={item} {...rowProps(item)} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {rest.map((item) => (
                <ItemRow key={item.id} item={item} {...rowProps(item)} />
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-10 text-center text-[11px] text-zinc-600">
          local-first · data never leaves this machine ·{" "}
          <a className="underline hover:text-zinc-400" href="https://github.com/wookat/attnbox" target="_blank" rel="noreferrer">
            github.com/wookat/attnbox
          </a>
        </footer>
      </main>
    </div>
  );
}

function canReply(item: AttentionItem): boolean {
  return item.agent === "devin" && item.status === "waiting";
}

function ReplyBox({ item, onSent, onClose }: { item: AttentionItem; onSent: () => void; onClose: () => void }) {
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function send(): Promise<void> {
    if (text.trim() === "" || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: item.id, message: text })
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (body.ok) {
        onSent();
        onClose();
        return;
      }
      setError(body.error ?? `HTTP ${res.status}`);
    } catch {
      setError("daemon unreachable");
    }
    setState("error");
  }

  return (
    <div
      className="mt-2 flex items-start gap-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <textarea
        autoFocus
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Escape") onClose();
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void send();
        }}
        placeholder="Reply to this agent… (⌘↵ to send, Esc to cancel)"
        aria-label={`Reply to ${item.title}`}
        className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950/60 px-2.5 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none"
      />
      <button
        onClick={() => void send()}
        disabled={state === "sending" || text.trim() === ""}
        className="rounded-lg border border-sky-800 bg-sky-500/10 px-2.5 py-1.5 text-xs text-sky-300 disabled:opacity-40"
      >
        {state === "sending" ? "…" : "Send"}
      </button>
      {state === "error" && <span className="mt-1.5 text-[11px] text-red-400">{error}</span>}
    </div>
  );
}

function ItemRow({
  item,
  highlight = false,
  selected = false,
  dimmed = false,
  onAck,
  replying = false,
  onReplyToggle,
  onReplied
}: {
  item: AttentionItem;
  highlight?: boolean;
  selected?: boolean;
  dimmed?: boolean;
  onAck?: (() => void) | undefined;
  replying?: boolean;
  onReplyToggle?: (() => void) | undefined;
  onReplied?: (() => void) | undefined;
}) {
  const style = STATUS_STYLE[item.status];
  const agentStyle = AGENT_STYLE[item.agent] ?? "bg-zinc-500/15 text-zinc-300 border-zinc-500/20";
  const body = (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3 transition-colors sm:p-4 ${
        highlight ? "border-amber-900/60 bg-amber-950/20" : "border-zinc-800 bg-zinc-900/40"
      } ${item.url ? "hover:border-zinc-600 active:bg-zinc-900" : ""} ${selected ? "ring-2 ring-zinc-400/70" : ""} ${
        dimmed ? "opacity-50" : ""
      }`}
    >
      <span className={`mt-1.5 size-2 shrink-0 rounded-full ${style.dot}`} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
          <span className={style.label}>{item.attention ? ATTENTION_LABEL[item.attention] : item.status}</span>
          <span className={`rounded-full border px-2 py-0.5 ${agentStyle}`}>{item.agent}</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5">{item.location}</span>
          {item.confidence === "heuristic" && (
            <span title="status inferred from local logs, not reported by the agent">~heuristic</span>
          )}
          {item.lastActivityAt && <span>{timeAgo(item.lastActivityAt)}</span>}
        </p>
        {item.detail && (
          <p className="mt-1 line-clamp-2 text-xs text-zinc-400" title={item.detail}>
            {item.detail}
          </p>
        )}
        {item.project && <p className="mt-1 truncate text-[11px] text-zinc-600">{item.project}</p>}
        {replying && onReplyToggle && (
          <ReplyBox item={item} onSent={() => onReplied?.()} onClose={onReplyToggle} />
        )}
      </div>
      {onReplyToggle && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onReplyToggle();
          }}
          title="Reply without leaving the inbox (r)"
          aria-label="Reply"
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-zinc-700 text-xs text-zinc-500 transition-colors hover:border-sky-700 hover:text-sky-300"
        >
          ↩
        </button>
      )}
      {onAck && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAck();
          }}
          title={dimmed ? "Mark as unhandled" : "Mark as handled (e)"}
          aria-label={dimmed ? "Mark as unhandled" : "Mark as handled"}
          className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-zinc-700 text-xs text-zinc-500 transition-colors hover:border-emerald-700 hover:text-emerald-300"
        >
          ✓
        </button>
      )}
      {item.url && <span className="mt-1 text-zinc-600">↗</span>}
    </div>
  );
  return (
    <li id={`item-${item.id}`}>
      {item.url ? (
        <a href={item.url} target="_blank" rel="noreferrer">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
